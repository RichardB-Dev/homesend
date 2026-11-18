import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { sendClientEmail } from "../api";
import { agent, defaultFooter, defaultIntro, limits } from "../branding";
import { matchingClients, type Client } from "../clients";
import { homeCount } from "../format";
import { rememberSent, saveTemplate, snapshotHome } from "../storage";
import type { Property } from "../types";
import { EmailPreview } from "./EmailPreview";

type Props = {
  properties: Property[];
  intro: string;
  footer: string;
  onIntro: (value: string) => void;
  onFooter: (value: string) => void;
  onClose: () => void;
  onSent: () => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const suggestLimit = 8;

type SuggestField = "name" | "email";

export function Composer({ properties, intro, footer, onIntro, onFooter, onClose, onSent }: Props) {
  const navigate = useNavigate();
  const titleId = useId();
  const listId = useId();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [suggestField, setSuggestField] = useState<SuggestField | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const suggestOpen = useRef(false);
  const [pane, setPane] = useState<"form" | "preview">("form");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ delivered: boolean; id: string; count: number; name: string } | null>(null);

  const suggestQuery = suggestField === "name" ? clientName : suggestField === "email" ? clientEmail : "";
  const suggestions = useMemo(() => {
    if (!suggestField || !suggestQuery.trim()) return [];
    return matchingClients(suggestQuery).slice(0, suggestLimit);
  }, [suggestField, suggestQuery]);
  const highlighted = Math.min(activeIndex, Math.max(suggestions.length - 1, 0));
  suggestOpen.current = suggestions.length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [suggestQuery, suggestField]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !sending && !suggestOpen.current) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, sending]);

  function chooseClient(client: Client) {
    setClientName(client.name);
    setClientEmail(client.email);
    setSuggestField(null);
    setFieldError(null);
  }

  function onSuggestKey(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && suggestions.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      suggestOpen.current = false;
      setSuggestField(null);
      return;
    }
    if (suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      chooseClient(suggestions[highlighted]);
    }
  }

  function suggestProps(field: SuggestField) {
    const open = suggestField === field && suggestions.length > 0;
    return {
      role: "combobox" as const,
      "aria-autocomplete": "list" as const,
      "aria-expanded": open,
      "aria-controls": listId,
      "aria-activedescendant": open ? `${listId}-${suggestions[highlighted]?.id}` : undefined,
      autoComplete: "off",
      onFocus: () => setSuggestField(field),
      onKeyDown: onSuggestKey,
      onBlur: () => setSuggestField(null),
    };
  }

  function resetCopy() {
    onIntro(defaultIntro);
    onFooter(defaultFooter);
    saveTemplate({ intro: defaultIntro, footer: defaultFooter });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const name = clientName.trim();
    const email = clientEmail.trim();
    if (!name) {
      setFieldError("Enter the client’s name.");
      setPane("form");
      return;
    }
    if (!emailPattern.test(email)) {
      setFieldError("Enter a valid email address.");
      setPane("form");
      return;
    }
    if (!intro.trim() || !footer.trim()) {
      setFieldError("The introduction and footer both need some text.");
      setPane("form");
      return;
    }
    setFieldError(null);
    setSending(true);
    try {
      const response = await sendClientEmail({
        clientName: name,
        clientEmail: email,
        agentName: agent.name,
        agentEmail: agent.email,
        intro: intro.trim(),
        footer: footer.trim(),
        propertyIds: properties.map((property) => property.id),
      });
      const saved = rememberSent({
        clientName: name,
        clientEmail: email,
        intro: intro.trim(),
        footer: footer.trim(),
        delivered: response.delivered,
        properties: properties.map(snapshotHome),
      });
      setResult({ delivered: response.delivered, id: saved.id, count: properties.length, name });
      onSent();
    } catch (error) {
      setFieldError(error instanceof Error ? error.message : "The email could not be sent.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !sending) onClose();
      }}
    >
      <section className="sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="sheet-head">
          <div>
            <h2 id={titleId}>{result ? "Ready" : "Send to client"}</h2>
            {result ? null : <p>{homeCount(properties.length)} in this list</p>}
          </div>
          <button type="button" className="text-button" onClick={onClose} disabled={sending}>
            Close
          </button>
        </header>

        {result ? (
          <div className="sheet-success">
            <p className="success-title">
              {result.delivered ? `${result.name} has the list.` : `The list is ready for ${result.name}.`}
            </p>
            <p>
              {result.delivered
                ? `${homeCount(result.count)} ${result.count === 1 ? "was" : "were"} sent.`
                : `${homeCount(result.count)} ${result.count === 1 ? "was" : "were"} prepared. The email was not delivered, because mailbox access is not connected yet.`}
            </p>
            <div className="success-actions">
              <button type="button" className="button" onClick={() => navigate("/sent", { state: { openId: result.id } })}>
                View sent
              </button>
              <button type="button" className="button secondary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="segments" role="tablist" aria-label="Composer">
              <button type="button" aria-pressed={pane === "form"} onClick={() => setPane("form")}>
                Form
              </button>
              <button type="button" aria-pressed={pane === "preview"} onClick={() => setPane("preview")}>
                Preview
              </button>
            </div>
            <div className="sheet-body">
              <div className="composer-grid" data-pane={pane}>
                <form className="form-pane" onSubmit={onSubmit}>
                  <label>
                    Client name
                    <span className="suggest">
                      <input
                        value={clientName}
                        maxLength={limits.clientName}
                        onChange={(event) => {
                          setClientName(event.target.value);
                          setSuggestField("name");
                        }}
                        autoFocus
                        {...suggestProps("name")}
                      />
                      {suggestField === "name" ? (
                        <SuggestList id={listId} clients={suggestions} activeIndex={highlighted} onPick={chooseClient} onHover={setActiveIndex} />
                      ) : null}
                    </span>
                  </label>
                  <label>
                    Client email
                    <span className="suggest">
                      <input
                        type="email"
                        value={clientEmail}
                        inputMode="email"
                        onChange={(event) => {
                          setClientEmail(event.target.value);
                          setSuggestField("email");
                        }}
                        {...suggestProps("email")}
                      />
                      {suggestField === "email" ? (
                        <SuggestList id={listId} clients={suggestions} activeIndex={highlighted} onPick={chooseClient} onHover={setActiveIndex} />
                      ) : null}
                    </span>
                  </label>
                  <label>
                    Introduction
                    <textarea
                      value={intro}
                      maxLength={limits.intro}
                      onChange={(event) => {
                        onIntro(event.target.value);
                        saveTemplate({ intro: event.target.value, footer });
                      }}
                    />
                  </label>
                  <label>
                    Footer
                    <textarea
                      className="footer-field"
                      value={footer}
                      maxLength={limits.footer}
                      onChange={(event) => {
                        onFooter(event.target.value);
                        saveTemplate({ intro, footer: event.target.value });
                      }}
                    />
                  </label>
                  <button type="button" className="text-button reset" onClick={resetCopy}>
                    Reset intro and footer
                  </button>
                  {fieldError ? <p className="form-error">{fieldError}</p> : null}
                  <button type="submit" className="button" disabled={sending}>
                    {sending ? "Sending…" : "Send email"}
                  </button>
                </form>
                <div className="preview-pane">
                  <EmailPreview clientName={clientName} intro={intro} footer={footer} properties={properties} />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function SuggestList({
  id,
  clients,
  activeIndex,
  onPick,
  onHover,
}: {
  id: string;
  clients: Client[];
  activeIndex: number;
  onPick: (client: Client) => void;
  onHover: (index: number) => void;
}) {
  useEffect(() => {
    const current = clients[activeIndex];
    if (!current) return;
    document.getElementById(`${id}-${current.id}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, clients, id]);

  if (clients.length === 0) return null;
  return (
    <ul className="suggest-list" id={id} role="listbox">
      {clients.map((client, index) => (
        <li key={client.id} role="presentation">
          <button
            type="button"
            role="option"
            id={`${id}-${client.id}`}
            aria-selected={index === activeIndex}
            onMouseDown={(event) => event.preventDefault()}
            onMouseEnter={() => onHover(index)}
            onClick={() => onPick(client)}
          >
            <strong>{client.name}</strong>
            <span>{client.email}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

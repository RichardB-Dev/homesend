import { useEffect, useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { sendClientEmail } from "../api";
import { agent, defaultFooter, defaultIntro, limits } from "../branding";
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

export function Composer({ properties, intro, footer, onIntro, onFooter, onClose, onSent }: Props) {
  const navigate = useNavigate();
  const titleId = useId();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [pane, setPane] = useState<"form" | "preview">("form");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ delivered: boolean; id: string; count: number; name: string } | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !sending) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, sending]);

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
                    <input
                      value={clientName}
                      maxLength={limits.clientName}
                      onChange={(event) => setClientName(event.target.value)}
                      autoComplete="name"
                      autoFocus
                    />
                  </label>
                  <label>
                    Client email
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(event) => setClientEmail(event.target.value)}
                      autoComplete="email"
                      inputMode="email"
                    />
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

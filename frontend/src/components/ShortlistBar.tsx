import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatPrice, homeCount } from "../format";
import { readTemplate, rememberListScroll, saveTemplate } from "../storage";
import type { Property } from "../types";
import { Composer } from "./Composer";

type Props = {
  properties: Property[];
  selectedIds: string[];
  limitNote: boolean;
  onToggle: (id: string) => void;
  onClear: () => void;
  onSent: () => void;
  activeId?: string;
};

export function ShortlistBar({ properties, selectedIds, limitNote, onToggle, onClear, onSent, activeId }: Props) {
  const onList = useLocation().pathname === "/select";
  const titleId = useId();
  const [viewing, setViewing] = useState(false);
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState(readTemplate);
  const selected = selectedIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is Property => Boolean(property));
  const onProperty = Boolean(activeId);
  const alreadyInList = Boolean(activeId && selectedIds.includes(activeId));
  const showBar = onProperty || selected.length > 0;
  const canViewList = selected.length > 0;

  useEffect(() => {
    if (!viewing) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewing(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewing]);

  function clearList() {
    onClear();
    setViewing(false);
  }

  return (
    <>
      {showBar ? (
        <div className={onProperty ? "selection-bar selection-bar-property" : "selection-bar"}>
          {onProperty && activeId ? (
            <button
              type="button"
              className={alreadyInList ? "button secondary selection-primary" : "button selection-primary"}
              aria-pressed={alreadyInList}
              onClick={() => onToggle(activeId)}
            >
              {alreadyInList ? "Remove from list" : "Add to list"}
            </button>
          ) : null}

          {canViewList ? (
            <button type="button" className="selection-open" onClick={() => setViewing(true)}>
              <strong>{homeCount(selected.length)}</strong>
              <span>{limitNote ? "8 is the most you can send at once." : "View shortlist"}</span>
            </button>
          ) : onProperty ? (
            <p className="selection-hint">{limitNote ? "8 is the most you can send at once." : "Build a shortlist, then send."}</p>
          ) : null}

          {!onProperty && canViewList ? (
            <button type="button" className="button" onClick={() => setOpen(true)}>
              Send to client
            </button>
          ) : null}

          {onProperty && alreadyInList ? (
            <button type="button" className="selection-send" aria-label="Send to client" onClick={() => setOpen(true)}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M3.2 10.2 16.5 3.6c.6-.3 1.2.3.9.9L10.8 16.8c-.3.6-1.2.5-1.4-.2L8.2 11.8 3.4 10.6c-.7-.2-.6-1.1-.2-.4Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M8.3 11.9 16.8 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}

      {viewing && selected.length > 0 ? (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setViewing(false);
          }}
        >
          <section className="sheet shortlist-sheet" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <header className="sheet-head">
              <div>
                <h2 id={titleId}>Shortlist</h2>
                <p>{homeCount(selected.length)}</p>
              </div>
              <button type="button" className="text-button" onClick={() => setViewing(false)}>
                Close
              </button>
            </header>
            <ul className="shortlist-rows">
              {selected.map((property) => (
                <li className="shortlist-row" key={property.id}>
                  <Link
                    className="shortlist-main"
                    to={`/property/${property.id}`}
                    onClick={() => {
                      if (onList) rememberListScroll();
                      setViewing(false);
                    }}
                  >
                    {property.imageUrl.startsWith("https://") ? (
                      <img src={property.imageUrl} alt="" />
                    ) : (
                      <span className="shortlist-fallback">{property.reference}</span>
                    )}
                    <span>
                      <strong>{property.title}</strong>
                      <span className="place">
                        {formatPrice(property.price.amount, property.price.currency)}
                        {property.municipality ? ` · ${property.municipality}` : ""}
                      </span>
                    </span>
                  </Link>
                  <div className="shortlist-side">
                    {property.sourceUrl.startsWith("https://") ? (
                      <a href={property.sourceUrl} target="_blank" rel="noreferrer">
                        Bromley Estates
                      </a>
                    ) : null}
                    <button type="button" className="text-button" onClick={() => onToggle(property.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="shortlist-foot">
              <button type="button" className="button secondary" onClick={clearList}>
                Clear shortlist
              </button>
              <button
                type="button"
                className="button"
                onClick={() => {
                  setViewing(false);
                  setOpen(true);
                }}
              >
                Send to client
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {open ? (
        <Composer
          properties={selected}
          intro={template.intro}
          footer={template.footer}
          onIntro={(intro) => setTemplate((current) => ({ ...current, intro }))}
          onFooter={(footer) => setTemplate((current) => ({ ...current, footer }))}
          onClose={() => setOpen(false)}
          onSent={() => {
            saveTemplate(template);
            onSent();
          }}
        />
      ) : null}
    </>
  );
}

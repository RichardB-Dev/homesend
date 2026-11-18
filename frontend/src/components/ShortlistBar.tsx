import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, homeCount } from "../format";
import { readTemplate, saveTemplate } from "../storage";
import type { Property } from "../types";
import { Composer } from "./Composer";

type Props = {
  properties: Property[];
  selectedIds: string[];
  limitNote: boolean;
  onToggle: (id: string) => void;
  onClear: () => void;
  onSent: () => void;
};

export function ShortlistBar({ properties, selectedIds, limitNote, onToggle, onClear, onSent }: Props) {
  const titleId = useId();
  const [viewing, setViewing] = useState(false);
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState(readTemplate);
  const selected = selectedIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is Property => Boolean(property));

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
      {selected.length > 0 ? (
        <div className="selection-bar">
          <button type="button" className="selection-open" onClick={() => setViewing(true)}>
            <strong>{homeCount(selected.length)}</strong>
            <span>{limitNote ? "8 is the most you can send at once." : "View shortlist"}</span>
          </button>
          <button type="button" className="button" onClick={() => setOpen(true)}>
            Send to client
          </button>
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
                  <Link className="shortlist-main" to={`/property/${property.id}`} onClick={() => setViewing(false)}>
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

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EmailPreview } from "../components/EmailPreview";
import { TopBar } from "../components/TopBar";
import { formatWhen, homeCount } from "../format";
import { readSent } from "../storage";
import type { SentRecord } from "../types";

export function SentPage() {
  const location = useLocation();
  const [records] = useState<SentRecord[]>(() => readSent());
  const [openId, setOpenId] = useState<string | null>(null);
  const open = records.find((record) => record.id === openId) ?? null;

  useEffect(() => {
    const state = location.state as { openId?: string } | null;
    if (state?.openId) setOpenId(state.openId);
  }, [location.state]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="app-shell">
      <TopBar />
      <main className="page">
        <header className="page-head">
          <h1>Sent</h1>
          <p>Lists George has prepared on this computer, newest first.</p>
        </header>

        {records.length === 0 ? (
          <div className="empty">
            <h2>Nothing sent yet</h2>
            <p>When you send a list, it will be kept here on this computer.</p>
            <Link className="button" to="/select">
              Select homes
            </Link>
          </div>
        ) : (
          <ul className="sent-list">
            {records.map((record) => {
              const first = record.properties[0];
              return (
                <li key={record.id}>
                  <button type="button" className="sent-row" onClick={() => setOpenId(record.id)}>
                    <span>
                      <strong>{record.clientName}</strong>
                      <span className="sent-email">{record.clientEmail}</span>
                      <span className="sent-detail">
                        {first ? first.title : "Homes"}
                        {first?.municipality ? ` · ${first.municipality}` : ""}
                      </span>
                    </span>
                    <span className="sent-side">
                      <time dateTime={record.sentAt}>{formatWhen(record.sentAt)}</time>
                      <span>{homeCount(record.properties.length)}</span>
                      {record.delivered ? null : <span className="undelivered">Not delivered</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      {open ? (
        <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && setOpenId(null)}>
          <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sent-title">
            <header className="sheet-head">
              <div>
                <h2 id="sent-title">{open.clientName}</h2>
                <p>
                  {formatWhen(open.sentAt)} · {homeCount(open.properties.length)}
                  {open.delivered ? "" : " · Not delivered"}
                </p>
              </div>
              <button type="button" className="text-button" onClick={() => setOpenId(null)}>
                Close
              </button>
            </header>
            <div className="sheet-body single">
              <EmailPreview
                clientName={open.clientName}
                intro={open.intro}
                footer={open.footer}
                properties={open.properties}
              />
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

import { useMemo, useState } from "react";
import { clients, matchingClients } from "../clients";
import { TopBar } from "../components/TopBar";

export function ClientsPage() {
  const [query, setQuery] = useState("");
  const shown = useMemo(() => matchingClients(query), [query]);
  const filtering = query.trim().length > 0;

  return (
    <div className="app-shell">
      <TopBar />
      <main className="page">
        <header className="page-head">
          <h1>Clients</h1>
          <p>Sample contacts for this demo. Start typing a name or email when you send a list, and the rest fills in.</p>
        </header>

        <div className="search-wrap">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13 13.5 17 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            className="search"
            value={query}
            placeholder="Search by name, email, or phone"
            aria-label="Search clients"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <p className="client-count">
          {filtering ? `${shown.length} of ${clients.length}` : `${clients.length} clients`}
        </p>

        {shown.length === 0 ? (
          <div className="empty">
            <h2>No matches</h2>
            <p>Try another name, email, or phone number.</p>
          </div>
        ) : (
          <ul className="client-list">
            {shown.map((client) => (
              <li key={client.id} className="client-row">
                <strong>{client.name}</strong>
                <a href={`mailto:${client.email}`}>{client.email}</a>
                {client.phone ? <a href={`tel:${client.phone.replace(/[^\d+]/g, "")}`}>{client.phone}</a> : null}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

import { useState } from "react";
import { agency, agent } from "../branding";
import { formatPrice, metaLine, shortSummary } from "../format";
import type { SentHome } from "../types";

type Props = {
  clientName: string;
  intro: string;
  footer: string;
  properties: SentHome[];
};

export function EmailPreview({ clientName, intro, footer, properties }: Props) {
  const greeting = clientName.trim() ? clientName.trim() : "there";

  return (
    <div className="letter-frame" aria-label="Email preview">
      <article className="letter">
        <header className="letter-banner">
          <img src={agency.logo} alt="" />
          <div>
            <strong>{agency.shortName}</strong>
            <span>Marbella</span>
          </div>
        </header>
        <div className="letter-body">
          <h2>Hello {greeting},</h2>
          <p className="letter-intro">{intro || "Your introduction will appear here."}</p>
          {properties.map((property) => (
            <PropertyBlock key={property.id} property={property} />
          ))}
        </div>
        <footer className="letter-foot">
          <img src={agent.portrait} alt="" />
          <p>{footer || "Your footer will appear here."}</p>
        </footer>
      </article>
    </div>
  );
}

function PropertyBlock({ property }: { property: SentHome }) {
  const [broken, setBroken] = useState(false);
  const meta = metaLine(property);
  const summary = shortSummary(property.summary);

  return (
    <section className="home-block">
      {property.imageUrl && !broken ? (
        <img src={property.imageUrl} alt="" onError={() => setBroken(true)} />
      ) : (
        <span className="photo-fallback tall">{property.reference}</span>
      )}
      <p className="letter-kicker">
        {property.reference}
        {property.municipality ? ` · ${property.municipality}` : ""}
      </p>
      <h3>{property.title}</h3>
      <p className="letter-price">{formatPrice(property.price.amount, property.price.currency)}</p>
      {meta ? <p className="letter-meta">{meta}</p> : null}
      {summary ? <p className="letter-summary">{summary}</p> : null}
      {property.sourceUrl ? (
        <a href={property.sourceUrl} target="_blank" rel="noreferrer">
          View this home
        </a>
      ) : null}
    </section>
  );
}

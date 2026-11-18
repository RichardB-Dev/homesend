import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "../api";
import { homeSend } from "../branding";
import { formatPrice, metaLine, shortSummary } from "../format";
import { readSession } from "../storage";
import type { Property } from "../types";

const sampleIds = ["bemd1888", "bemd3173", "bemv1806", "bemd1186"];

const oldWay = [
  {
    title: "Hunt on your site",
    body: "You open the catalogue and look for homes that fit the client in front of you.",
  },
  {
    title: "Gather the detail",
    body: "Another tab for more information. Another place for photographs, prices, and links.",
  },
  {
    title: "Paste up an email",
    body: "You build the message by hand—copying, pasting, checking—until it looks ready to send.",
  },
];

const steps = [
  {
    n: "01",
    title: "Choose",
    body: "Search by town, price, and size. Keep the homes that fit this client—up to eight.",
  },
  {
    n: "02",
    title: "Write",
    body: "Address them by name. Adjust the note. The email preview updates as you type.",
  },
  {
    n: "03",
    title: "Send",
    body: "They open one email: photographs, prices, and a way to see each home.",
  },
];

const sampleIntro =
  "Here are a few homes that fit what you're looking for. Tell me which ones you'd like to see, and I can arrange the viewings.";

function pickSample(list: Property[]): Property[] {
  const byId = new Map(list.map((property) => [property.id, property]));
  const chosen = sampleIds.map((id) => byId.get(id)).filter((property): property is Property => Boolean(property));
  if (chosen.length >= 3) return chosen;
  const rest = list.filter((property) => !sampleIds.includes(property.id) && property.imageUrl.startsWith("https://"));
  return [...chosen, ...rest].slice(0, 4);
}

function SampleLetter({ properties, compact = false }: { properties: Property[]; compact?: boolean }) {
  const shown = compact ? properties.slice(0, 2) : properties;
  if (properties.length === 0) {
    return <p className="home-sample-wait">A sample list will appear here when the catalogue is available.</p>;
  }
  return (
    <article className={compact ? "home-letter home-letter-compact" : "home-letter"} aria-label="Sample email">
      <header>
        <img src={homeSend.logo} alt="" />
        <strong>{homeSend.name}</strong>
      </header>
      <div className="home-letter-body">
        <h3>Hello Anna,</h3>
        <p>{sampleIntro}</p>
        {shown.map((property) => {
          const meta = metaLine(property);
          return (
            <section key={property.id}>
              <img src={property.imageUrl} alt="" />
              {property.municipality ? <p className="home-letter-kicker">{property.municipality}</p> : null}
              <h4>{property.title}</h4>
              <p className="home-letter-price">{formatPrice(property.price.amount, property.price.currency)}</p>
              {meta ? <p className="home-letter-meta">{meta}</p> : null}
              {!compact ? <p>{shortSummary(property.summary, 180)}</p> : null}
            </section>
          );
        })}
      </div>
      <footer>
        <p>Sent with {homeSend.name}</p>
      </footer>
    </article>
  );
}

export function HomePage() {
  const signedIn = Boolean(readSession());
  const [sample, setSample] = useState<Property[]>([]);

  useEffect(() => {
    let active = true;
    fetchProperties()
      .then((list) => {
        if (active) setSample(pickSample(list));
      })
      .catch(() => {
        if (active) setSample([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const next = signedIn ? "/select" : "/sign-in";
  const action = signedIn ? "Open the list" : "Send a shortlist";

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">
            <img src={homeSend.logo} alt="" />
            {homeSend.name}
          </p>
          <h1>From shortlist to inbox in one go.</h1>
          <p className="home-lead">
            Pick the homes that fit. Write a short note. Your client opens one finished email—with your name on it.
          </p>
          <div className="home-actions">
            <Link className="button" to={next}>
              {action}
            </Link>
            <a className="text-button" href="#sample">
              See the email
            </a>
          </div>
        </div>
        <div className="home-hero-visual">
          <SampleLetter properties={sample} compact />
        </div>
      </section>

      <section className="home-atmosphere" aria-hidden="true">
        <img src="/hero.jpg" alt="" />
      </section>

      <section className="home-problem" aria-labelledby="problem-title">
        <p className="home-kicker">The old way</p>
        <h2 id="problem-title">Too many tabs for one list.</h2>
        <p className="home-problem-lead">
          Agents still build client emails the slow way: hunt on the site, dig for detail elsewhere, then copy and paste until the message looks right.
        </p>
        <div className="home-points">
          {oldWay.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
        <p className="home-problem-punch">The shortlist email, without the busywork.</p>
      </section>

      <section className="home-sample" id="sample" aria-labelledby="sample-title">
        <div className="home-sample-copy">
          <p className="home-kicker">The email</p>
          <h2 id="sample-title">This is what they open.</h2>
          <p>Photographs, prices, towns, and a short note in your voice—already put together.</p>
          <Link className="button" to={next}>
            {action}
          </Link>
        </div>
        <div className="home-sample-letter">
          <SampleLetter properties={sample} />
        </div>
      </section>

      <section className="home-steps" aria-labelledby="steps-title">
        <div>
          <p className="home-kicker">How it works</p>
          <h2 id="steps-title">Three moves, then it is in their inbox.</h2>
        </div>
        <ol>
          {steps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-close">
        <img src="/hero-detail.jpg" alt="" />
        <div>
          <h2>One shortlist. One email. Done.</h2>
          <Link className="button" to={next}>
            {action}
          </Link>
        </div>
      </section>
    </div>
  );
}

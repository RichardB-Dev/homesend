import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "../api";
import { formatPrice, metaLine, shortSummary } from "../format";
import { readSession } from "../storage";
import type { Property } from "../types";

const points = [
  {
    title: "A handful of homes",
    body: "Keep up to eight. The client sees a choice, and every home is one you would show.",
  },
  {
    title: "A note in your voice",
    body: "The introduction and the close are yours. They are waiting the next time you write.",
  },
  {
    title: "A reply to you",
    body: "The message arrives from you. The client answers you.",
  },
];

const steps = [
  {
    n: "01",
    title: "Choose",
    body: "Search the catalogue by town, price, and size. Keep the homes that fit this client.",
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

export function HomePage() {
  const signedIn = Boolean(readSession());
  const [sample, setSample] = useState<Property[]>([]);

  useEffect(() => {
    let active = true;
    fetchProperties()
      .then((list) => {
        if (active) setSample(list.slice(0, 2));
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
            <img src="/homesend-icon.png" alt="" />
            Home Send
          </p>
          <h1>Send the right homes in one email.</h1>
          <p className="home-lead">
            Pick the homes that fit. Write a short note. Your client opens one email, with your name on it.
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
        <figure className="home-photo">
          <picture>
            <source media="(max-width: 800px)" srcSet="/hero-portrait.png" />
            <img src="/hero.png" alt="" />
          </picture>
          <figcaption>The email they open.</figcaption>
        </figure>
      </section>

      <section className="home-sell" aria-labelledby="offer-title">
        <p className="home-kicker">What the client receives</p>
        <h2 id="offer-title">One message, ready to forward.</h2>
        <div className="home-points">
          {points.map((point) => (
            <article key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-steps" aria-labelledby="steps-title">
        <div>
          <p className="home-kicker">How a list goes out</p>
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

      <section className="home-sample" id="sample" aria-labelledby="sample-title">
        <div className="home-sample-copy">
          <p className="home-kicker">The product</p>
          <h2 id="sample-title">This is the email.</h2>
          <p>Photographs, a price, the town, and a short note in your voice. Your name closes it.</p>
          <Link className="button" to={next}>
            {action}
          </Link>
        </div>
        <div className="home-sample-letter">
          {sample.length > 0 ? (
            <article className="home-letter" aria-label="Sample email">
              <header>
                <img src="/homesend-icon.png" alt="" />
                <strong>Home Send</strong>
              </header>
              <div className="home-letter-body">
                <h3>Hello Anna,</h3>
                <p>{sampleIntro}</p>
                {sample.map((property) => {
                  const meta = metaLine(property);
                  return (
                    <section key={property.id}>
                      <img src={property.imageUrl} alt="" />
                      {property.municipality ? <p className="home-letter-kicker">{property.municipality}</p> : null}
                      <h4>{property.title}</h4>
                      <p className="home-letter-price">{formatPrice(property.price.amount, property.price.currency)}</p>
                      {meta ? <p className="home-letter-meta">{meta}</p> : null}
                      <p>{shortSummary(property.summary, 180)}</p>
                    </section>
                  );
                })}
              </div>
              <footer>
                <p>Sent with Home Send</p>
              </footer>
            </article>
          ) : (
            <p className="home-sample-wait">A sample list will appear here when the catalogue is available.</p>
          )}
        </div>
      </section>

      <section className="home-close">
        <img src="/hero-detail.png" alt="" />
        <div>
          <h2>The next client is one list away.</h2>
          <Link className="button" to={next}>
            {action}
          </Link>
        </div>
      </section>
    </div>
  );
}

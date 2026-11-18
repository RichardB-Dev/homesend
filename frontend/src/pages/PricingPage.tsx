import { Link } from "react-router-dom";
import { homeSend, pricing } from "../branding";
import { MarketingNav } from "../components/MarketingNav";
import { readSession } from "../storage";

const agentIncludes = [
  "1 seat",
  "Your brand on the shortlist email",
  "Search, filter, send up to 8 homes",
  "Intro, footer, and sent history for you",
  "Email support",
];

const agencyIncludes = [
  `Up to ${pricing.agency.seats} seats (€${pricing.extraSeat} each after)`,
  "White-label brand for the whole desk",
  "Shared catalog",
  "Per-agent intro, footer, and sent history",
  "Priority onboarding",
];

const shared = [
  "Branded shortlist email",
  "Live preview as you write",
  "Sent history on this device",
  "Catalog search and filters",
];

export function PricingPage() {
  const signedIn = Boolean(readSession());
  const demo = signedIn ? "/select" : "/sign-in";
  const demoLabel = signedIn ? "Open the list" : "Try the demo";
  const mail = `mailto:${homeSend.contactEmail}?subject=${encodeURIComponent("Home Send pricing")}`;

  return (
    <div className="home pricing">
      <MarketingNav />
      <section className="pricing-hero">
        <h1>Priced for desks that send shortlists every week.</h1>
        <p className="home-lead">
          One finished email with your name on it—not another CRM seat you barely open.
        </p>
        <div className="home-actions">
          <a className="button" href={mail}>
            Talk to us
          </a>
          <Link className="text-button" to={demo}>
            {demoLabel}
          </Link>
        </div>
      </section>

      <section className="pricing-plans" aria-labelledby="plans-title">
        <p className="home-kicker">Plans</p>
        <h2 id="plans-title">Pick the desk that fits.</h2>
        <div className="pricing-grid">
          <article className="pricing-plan">
            <h3>Agent</h3>
            <p className="pricing-who">For the independent who sends their own lists.</p>
            <p className="pricing-price">
              <span>€{pricing.agent.monthly}</span>
              <span>/ month</span>
            </p>
            <p className="pricing-year">€{pricing.agent.yearly}/year · excludes VAT</p>
            <ul>
              {agentIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="button secondary" href={mail}>
              Talk to us
            </a>
          </article>

          <article className="pricing-plan pricing-plan-featured">
            <p className="pricing-badge">Most desks</p>
            <h3>Agency</h3>
            <p className="pricing-who">White-label for the whole team.</p>
            <p className="pricing-price">
              <span>€{pricing.agency.monthly}</span>
              <span>/ month</span>
            </p>
            <p className="pricing-year">€{pricing.agency.yearly}/year · excludes VAT</p>
            <ul>
              {agencyIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="button" href={mail}>
              Talk to us
            </a>
          </article>
        </div>
        <p className="pricing-note">
          Extra seats €{pricing.extraSeat}/month. First {pricing.founding.agencies} founding
          agencies: €{pricing.founding.monthly}/month for {pricing.founding.months} months.
        </p>
      </section>

      <section className="pricing-included" aria-labelledby="included-title">
        <p className="home-kicker">Every plan</p>
        <h2 id="included-title">What you get either way.</h2>
        <ul>
          {shared.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="home-close">
        <img src="/hero-detail.jpg" alt="" />
        <div>
          <h2>Ready for a desk that looks like yours.</h2>
          <a className="button" href={mail}>
            Talk to us
          </a>
        </div>
      </section>
    </div>
  );
}

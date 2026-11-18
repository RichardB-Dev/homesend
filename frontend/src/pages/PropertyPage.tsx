import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProperties } from "../api";
import { resalesListingUrl } from "../branding";
import { formatArea, formatPrice, titleCase } from "../format";
import { ShortlistBar } from "../components/ShortlistBar";
import { TopBar } from "../components/TopBar";
import { useShortlist } from "../useShortlist";
import type { Property } from "../types";

function paragraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function gallery(property: Property): string[] {
  const urls = [property.imageUrl, ...property.images].filter((url) => url.startsWith("https://"));
  return [...new Set(urls)];
}

export function PropertyPage() {
  const { id = "" } = useParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photo, setPhoto] = useState(0);
  const [broken, setBroken] = useState<string[]>([]);
  const shortlist = useShortlist();

  useEffect(() => {
    let active = true;
    fetchProperties()
      .then((list) => {
        if (active) setProperties(list);
      })
      .catch(() => {
        if (active) setError("This home didn’t load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPhoto(0);
    setBroken([]);
  }, [id]);

  const property = properties.find((item) => item.id === id);
  const images = property ? gallery(property).filter((url) => !broken.includes(url)) : [];
  const current = images[Math.min(photo, Math.max(images.length - 1, 0))] ?? "";
  const selected = property ? shortlist.selected.includes(property.id) : false;
  const copy = property ? paragraphs(property.description || property.summary) : [];
  const facts = property
    ? [
        property.bedrooms != null ? ["Bedrooms", String(property.bedrooms)] : null,
        property.bathrooms != null ? ["Bathrooms", String(property.bathrooms)] : null,
        property.builtAreaM2 != null ? ["Built", formatArea(property.builtAreaM2)] : null,
        property.plotAreaM2 != null ? ["Plot", formatArea(property.plotAreaM2)] : null,
        property.terraceAreaM2 != null ? ["Terrace", formatArea(property.terraceAreaM2)] : null,
        property.type ? ["Type", property.type] : null,
        property.transaction ? ["Transaction", titleCase(property.transaction)] : null,
      ].filter((item): item is [string, string] => Boolean(item))
    : [];

  return (
    <div className={shortlist.selected.length > 0 ? "app-shell has-bar" : "app-shell"}>
      <TopBar />
      <main className="page">
        <Link className="back-link" to="/select">
          All homes
        </Link>

        {loading ? <div className="property-skeleton" aria-hidden="true" /> : null}

        {error ? (
          <div className="empty">
            <h2>This home didn’t load</h2>
            <p>{error}</p>
            <Link className="button" to="/select">
              Back to homes
            </Link>
          </div>
        ) : null}

        {!loading && !error && !property ? (
          <div className="empty">
            <h2>This home isn’t in the list</h2>
            <p>It may have been removed from the catalog.</p>
            <Link className="button" to="/select">
              Back to homes
            </Link>
          </div>
        ) : null}

        {property ? (
          <>
            <div className="property-layout">
              <div className="property-gallery">
                {current ? (
                  <img
                    className="property-photo"
                    src={current}
                    alt=""
                    onError={() => setBroken((currentBroken) => [...currentBroken, current])}
                  />
                ) : (
                  <span className="photo-fallback tall">{property.reference}</span>
                )}
                {images.length > 1 ? (
                  <div className="thumbs">
                    {images.map((url, index) => (
                      <button
                        key={url}
                        type="button"
                        className={url === current ? "is-current" : undefined}
                        aria-pressed={url === current}
                        aria-label={`Photo ${index + 1}`}
                        onClick={() => setPhoto(index)}
                      >
                        <img src={url} alt="" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="property-summary">
                <p className="reference">{property.reference}</p>
                <h1>{property.title}</h1>
                <p className="property-price">{formatPrice(property.price.amount, property.price.currency)}</p>
                <p className="place">
                  {[property.municipality, property.area, property.province].filter(Boolean).join(" · ")}
                  {property.address ? ` · ${property.address}` : ""}
                </p>
                {facts.length > 0 ? (
                  <dl className="facts">
                    {facts.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <div className="property-actions">
                  <button
                    type="button"
                    className={selected ? "button secondary" : "button"}
                    aria-pressed={selected}
                    onClick={() => shortlist.toggle(property.id)}
                  >
                    {selected ? "Remove from list" : "Add to list"}
                  </button>
                </div>
                <div className="property-links">
                  {property.sourceUrl.startsWith("https://") ? (
                    <a className="button secondary" href={property.sourceUrl} target="_blank" rel="noreferrer">
                      View on Bromley Estates
                    </a>
                  ) : null}
                  <a
                    className="resales-button"
                    href={resalesListingUrl(property.reference)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Resales Online"
                  >
                    <img src="/brand/resales.svg" alt="Resales Online" />
                  </a>
                </div>
                {shortlist.limitNote && !selected ? (
                  <p className="field-error">8 is the most you can send at once.</p>
                ) : null}
              </div>
            </div>

            {copy.length > 0 ? (
              <div className="property-description">
                {copy.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {property.features.length > 0 ? (
              <section className="property-features">
                <h2>Features</h2>
                <ul className="feature-list">
                  {property.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        ) : null}
      </main>

      <ShortlistBar
        properties={properties}
        selectedIds={shortlist.selected}
        limitNote={shortlist.limitNote}
        onToggle={shortlist.toggle}
        onClear={shortlist.clear}
        onSent={shortlist.clear}
      />
    </div>
  );
}

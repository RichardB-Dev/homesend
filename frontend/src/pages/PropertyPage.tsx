import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProperties } from "../api";
import { resalesListingUrl } from "../branding";
import { FeatureIcon, groupFeatures } from "../features";
import { formatArea, formatPrice, titleCase } from "../format";
import { ShortlistBar } from "../components/ShortlistBar";
import { TopBar } from "../components/TopBar";
import { listIsNarrowed } from "../storage";
import { useShortlist } from "../useShortlist";
import type { Property } from "../types";

function paragraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function BackToList({ prominent = false }: { prominent?: boolean }) {
  const narrowed = listIsNarrowed();
  return (
    <Link className={prominent ? "button secondary back-to-list" : "button back-to-list"} to="/select">
      <span aria-hidden="true">←</span>
      {narrowed ? "Back to filtered homes" : "Back to all homes"}
    </Link>
  );
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
  const [viewer, setViewer] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
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
    setViewer(null);
    setCopied(false);
  }, [id]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const property = properties.find((item) => item.id === id);
  const images = property ? gallery(property).filter((url) => !broken.includes(url)) : [];
  const currentIndex = Math.min(photo, Math.max(images.length - 1, 0));
  const current = images[currentIndex] ?? "";
  const thumbSlots = 4;
  const morePhotos = images.length > thumbSlots;
  const shown = morePhotos ? images.slice(0, thumbSlots - 1) : images;
  function showInViewer(index: number) {
    if (images.length === 0) return;
    const next = (index + images.length) % images.length;
    setPhoto(next);
    setViewer(next);
  }

  useEffect(() => {
    if (viewer == null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewer(null);
        return;
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      showInViewer((viewer ?? 0) + (event.key === "ArrowRight" ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewer, images.length]);

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
    <div className="app-shell has-bar">
      <TopBar />
      <div className="return-bar">
        <div className="return-bar-inner">
          <BackToList prominent />
        </div>
      </div>
      <main className="page">

        {loading ? <div className="property-skeleton" aria-hidden="true" /> : null}

        {error ? (
          <div className="empty">
            <h2>This home didn’t load</h2>
            <p>{error}</p>
            <BackToList />
          </div>
        ) : null}

        {!loading && !error && !property ? (
          <div className="empty">
            <h2>This home isn’t in the list</h2>
            <p>It may have been removed from the catalog.</p>
            <BackToList />
          </div>
        ) : null}

        {property ? (
          <>
            <div className="property-layout">
              <div className="property-gallery">
                {current ? (
                  <button type="button" className="property-photo-button" aria-label="View photo larger" onClick={() => showInViewer(currentIndex)}>
                    <img
                      className="property-photo"
                      src={current}
                      alt=""
                      onError={() => setBroken((currentBroken) => [...currentBroken, current])}
                    />
                  </button>
                ) : (
                  <span className="photo-fallback tall">{property.reference}</span>
                )}
                {images.length > 1 ? (
                  <div className="thumbs" style={{ gridTemplateColumns: `repeat(${shown.length + (morePhotos ? 1 : 0)}, minmax(0, 1fr))` }}>
                    {shown.map((url) => {
                      const index = images.indexOf(url);
                      return (
                        <button
                          key={url}
                          type="button"
                          className={index === currentIndex ? "is-current" : undefined}
                          aria-pressed={index === currentIndex}
                          aria-label={`Photo ${index + 1}`}
                          onClick={() => showInViewer(index)}
                        >
                          <img src={url} alt="" onError={() => setBroken((currentBroken) => [...currentBroken, url])} />
                        </button>
                      );
                    })}
                    {morePhotos ? (
                      <button
                        type="button"
                        className={currentIndex >= shown.length ? "see-all is-current" : "see-all"}
                        aria-label="View the next photo larger"
                        onClick={() => showInViewer(shown.length)}
                      >
                        <img src={images[shown.length]} alt="" onError={() => setBroken((currentBroken) => [...currentBroken, images[shown.length]])} />
                        <span>See all</span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="property-summary">
                <p className="reference">
                  <span>{property.reference}</span>
                  <button
                    type="button"
                    className="copy-reference"
                    aria-label={copied ? "Copied" : `Copy ${property.reference}`}
                    onClick={() => {
                      const value = property.reference;
                      const done = () => setCopied(true);
                      navigator.clipboard.writeText(value).then(done).catch(() => {
                        const field = document.createElement("textarea");
                        field.value = value;
                        field.setAttribute("readonly", "");
                        field.style.position = "fixed";
                        field.style.left = "-999px";
                        document.body.append(field);
                        field.select();
                        document.execCommand("copy");
                        field.remove();
                        done();
                      });
                    }}
                  >
                    {copied ? (
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4.5 10.5 8 14l7.5-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <rect x="7" y="7" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M5 13H4.5A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5V5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </p>
                <h1>{property.title}</h1>
                {property.sold ? <p className="sold-flag">Sold</p> : null}
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
                <div className="feature-groups">
                  {groupFeatures(property.features).map((group) => (
                    <section key={group.id} className="feature-group">
                      <h3>
                        <FeatureIcon id={group.id} />
                        {group.title}
                      </h3>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </section>
            ) : null}

            {viewer != null && images[viewer] ? (
              <div
                className="lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={`Photo ${viewer + 1} of ${images.length}`}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setViewer(null);
                }}
              >
                <button type="button" className="lightbox-close" onClick={() => setViewer(null)}>
                  Close
                </button>
                {images.length > 1 ? (
                  <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={() => showInViewer(viewer - 1)}>
                    <span aria-hidden="true">←</span>
                  </button>
                ) : null}
                <img src={images[viewer]} alt="" onError={() => setBroken((currentBroken) => [...currentBroken, images[viewer]])} />
                {images.length > 1 ? (
                  <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={() => showInViewer(viewer + 1)}>
                    <span aria-hidden="true">→</span>
                  </button>
                ) : null}
                <div className="lightbox-foot">
                  {images.length > 1 ? (
                    <button type="button" className="lightbox-foot-nav" aria-label="Previous photo" onClick={() => showInViewer(viewer - 1)}>
                      <span aria-hidden="true">←</span>
                    </button>
                  ) : (
                    <span className="lightbox-foot-spacer" aria-hidden="true" />
                  )}
                  <p className="lightbox-count">
                    {viewer + 1} / {images.length}
                  </p>
                  {images.length > 1 ? (
                    <button type="button" className="lightbox-foot-nav" aria-label="Next photo" onClick={() => showInViewer(viewer + 1)}>
                      <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <span className="lightbox-foot-spacer" aria-hidden="true" />
                  )}
                </div>
              </div>
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
        activeId={property?.id}
      />
    </div>
  );
}

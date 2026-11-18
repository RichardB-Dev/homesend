import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, metaLine } from "../format";
import { rememberListScroll } from "../storage";
import type { Property } from "../types";

type Props = {
  property: Property;
  selected: boolean;
  onToggle: () => void;
};

export function PropertyCard({ property, selected, onToggle }: Props) {
  const [broken, setBroken] = useState(false);
  const meta = metaLine(property);
  const sold = property.sold;

  return (
    <article className={[selected ? "card is-selected" : "card", sold ? "is-sold" : ""].filter(Boolean).join(" ")}>
      <Link className="card-link" to={`/property/${property.id}`} onClick={rememberListScroll}>
        <span className="card-media">
          {property.imageUrl && !broken ? (
            <img src={property.imageUrl} alt="" loading="lazy" onError={() => setBroken(true)} />
          ) : (
            <span className="photo-fallback">{property.reference}</span>
          )}
          {sold ? <span className="sold-pill">Sold</span> : null}
          <span className="price-pill">{formatPrice(property.price.amount, property.price.currency)}</span>
        </span>
        <span className="card-body">
          <span className="reference">{property.reference}</span>
          <span className="card-title">{property.title}</span>
          <span className="place">
            {property.municipality}
            {property.type ? ` · ${property.type}` : ""}
          </span>
          {meta ? <span className="meta">{meta}</span> : null}
        </span>
      </Link>
      {sold ? null : (
        <button
          type="button"
          className={selected ? "card-add is-on" : "card-add"}
          aria-pressed={selected}
          aria-label={selected ? `Remove ${property.reference} from the list` : `Add ${property.reference} to the list`}
          onClick={onToggle}
        >
          {selected ? "Added" : "Add"}
        </button>
      )}
    </article>
  );
}

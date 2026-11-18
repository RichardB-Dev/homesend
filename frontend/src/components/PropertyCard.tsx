import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, metaLine } from "../format";
import type { Property } from "../types";

type Props = {
  property: Property;
  selected: boolean;
  onToggle: () => void;
};

export function PropertyCard({ property, selected, onToggle }: Props) {
  const [broken, setBroken] = useState(false);
  const meta = metaLine(property);

  return (
    <article className={selected ? "card is-selected" : "card"}>
      <Link className="card-link" to={`/property/${property.id}`}>
        <span className="card-media">
          {property.imageUrl && !broken ? (
            <img src={property.imageUrl} alt="" loading="lazy" onError={() => setBroken(true)} />
          ) : (
            <span className="photo-fallback">{property.reference}</span>
          )}
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
      <button
        type="button"
        className={selected ? "card-add is-on" : "card-add"}
        aria-pressed={selected}
        aria-label={selected ? `Remove ${property.reference} from the list` : `Add ${property.reference} to the list`}
        onClick={onToggle}
      >
        {selected ? "Added" : "Add"}
      </button>
    </article>
  );
}

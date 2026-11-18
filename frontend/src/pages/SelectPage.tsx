import { useEffect, useId, useMemo, useRef, useState } from "react";
import { fetchProperties } from "../api";
import { limits } from "../branding";
import { PropertyCard } from "../components/PropertyCard";
import { ShortlistBar } from "../components/ShortlistBar";
import { TopBar } from "../components/TopBar";
import { formatGroupedDigits, formatPrice, homeCount, parseGroupedDigits, titleCase } from "../format";
import { emptyListFilters, readListView, writeListView, type ListFilters } from "../storage";
import type { Property } from "../types";
import { useShortlist } from "../useShortlist";

type Filters = ListFilters;

const emptyFilters: Filters = emptyListFilters;

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function filterIsOn(value: string | string[]): boolean {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function matches(property: Property, query: string, filters: Filters): boolean {
  const needle = query.trim().toLowerCase();
  if (needle) {
    const haystack = [property.title, property.reference, property.address ?? "", property.municipality]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  if (filters.transaction && property.transaction !== filters.transaction) return false;
  if (filters.type && property.type !== filters.type) return false;
  if (filters.municipality.length > 0 && !filters.municipality.includes(property.municipality)) return false;
  if (filters.minBeds && (property.bedrooms ?? 0) < Number(filters.minBeds)) return false;
  if (filters.minPrice && property.price.amount < Number(filters.minPrice)) return false;
  if (filters.maxPrice && property.price.amount > Number(filters.maxPrice)) return false;
  return true;
}

export function SelectPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(() => readListView().query);
  const [filters, setFilters] = useState<Filters>(() => readListView().filters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  const placed = useRef(false);
  const shortlist = useShortlist();

  useEffect(() => {
    let active = true;
    fetchProperties()
      .then((list) => {
        if (active) setProperties(list);
      })
      .catch(() => {
        if (active) setError("The property list didn’t load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setSlowLoad(false);
      return;
    }
    const timer = window.setTimeout(() => setSlowLoad(true), 1500);
    return () => window.clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const saved = readListView();
    writeListView({ query, filters, scrollY: saved.scrollY });
  }, [query, filters]);

  useEffect(() => {
    function rememberPlace() {
      if (!placed.current) return;
      writeListView({ query, filters, scrollY: window.scrollY });
    }
    window.addEventListener("scroll", rememberPlace, { passive: true });
    return () => window.removeEventListener("scroll", rememberPlace);
  }, [query, filters]);

  useEffect(() => {
    if (loading) return;
    const scrollY = readListView().scrollY;
    const frame = requestAnimationFrame(() => {
      if (scrollY > 0) window.scrollTo(0, scrollY);
      placed.current = true;
    });
    return () => cancelAnimationFrame(frame);
  }, [loading]);

  const visible = useMemo(
    () => properties.filter((property) => matches(property, query, filters)),
    [properties, query, filters],
  );
  const filtersOn = Object.values(filters).some(filterIsOn);
  const activeFilterCount = Object.values(filters).filter(filterIsOn).length;
  const towns = useMemo(() => unique(properties.map((property) => property.municipality)), [properties]);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleTown(town: string) {
    setFilters((current) => {
      const selected = current.municipality.includes(town)
        ? current.municipality.filter((value) => value !== town)
        : [...current.municipality, town].sort((a, b) => a.localeCompare(b));
      return { ...current, municipality: selected };
    });
  }

  return (
    <div className={shortlist.selected.length > 0 ? "app-shell has-bar" : "app-shell"}>
      <TopBar />
      <main className="page">
        <header className="page-head">
          <h1>Homes</h1>
          <p>
            Open a home to see it. Add it from here, or from the home itself. Up to {limits.properties} in one email.
          </p>
        </header>

        <div className="search-row">
          <div className="search-wrap">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13.5 17 17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              className="search"
              value={query}
              placeholder="Search by name, address, or reference"
              aria-label="Search by name, address, or reference"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button
            type="button"
            className={filtersOpen || filtersOn ? "filters-toggle is-active" : "filters-toggle"}
            aria-expanded={filtersOpen}
            aria-controls="home-filters"
            onClick={() => setFiltersOpen((open) => !open)}
          >
            Filters
            {activeFilterCount > 0 ? <span className="filters-count">{activeFilterCount}</span> : null}
          </button>
        </div>

        <div id="home-filters" className={filtersOpen ? "filters is-open" : "filters"}>
          <TownFilter options={towns} selected={filters.municipality} onToggle={toggleTown} onClear={() => updateFilter("municipality", [])} />
          <label>
            Transaction
            <select value={filters.transaction} onChange={(event) => updateFilter("transaction", event.target.value)}>
              <option value="">Any</option>
              {unique(properties.map((property) => property.transaction)).map((value) => (
                <option key={value} value={value}>
                  {titleCase(value)}
                </option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
              <option value="">Any</option>
              {unique(properties.map((property) => property.type)).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label>
            Bedrooms
            <select value={filters.minBeds} onChange={(event) => updateFilter("minBeds", event.target.value)}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </label>
          <label>
            Min price
            <input
              inputMode="numeric"
              value={formatGroupedDigits(filters.minPrice)}
              placeholder="€"
              onChange={(event) => updateFilter("minPrice", parseGroupedDigits(event.target.value))}
            />
          </label>
          <label>
            Max price
            <input
              inputMode="numeric"
              value={formatGroupedDigits(filters.maxPrice)}
              placeholder="€"
              onChange={(event) => updateFilter("maxPrice", parseGroupedDigits(event.target.value))}
            />
          </label>
        </div>

        {filtersOn ? (
          <div className="chips">
            {filters.municipality.map((town) => (
              <button type="button" key={town} onClick={() => toggleTown(town)}>
                {town} <span aria-hidden="true">×</span>
              </button>
            ))}
            {filters.transaction ? (
              <button type="button" onClick={() => updateFilter("transaction", "")}>
                {titleCase(filters.transaction)} <span aria-hidden="true">×</span>
              </button>
            ) : null}
            {filters.type ? (
              <button type="button" onClick={() => updateFilter("type", "")}>
                {filters.type} <span aria-hidden="true">×</span>
              </button>
            ) : null}
            {filters.minBeds ? (
              <button type="button" onClick={() => updateFilter("minBeds", "")}>
                {filters.minBeds}+ beds <span aria-hidden="true">×</span>
              </button>
            ) : null}
            {filters.minPrice ? (
              <button type="button" onClick={() => updateFilter("minPrice", "")}>
                From {formatPrice(Number(filters.minPrice))} <span aria-hidden="true">×</span>
              </button>
            ) : null}
            {filters.maxPrice ? (
              <button type="button" onClick={() => updateFilter("maxPrice", "")}>
                Up to {formatPrice(Number(filters.maxPrice))} <span aria-hidden="true">×</span>
              </button>
            ) : null}
            <button type="button" className="text-button" onClick={() => setFilters(emptyFilters)}>
              Clear
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="loading-status" aria-live="polite" aria-busy="true">
            <p className="loading-title">Loading homes…</p>
            {slowLoad ? <p className="loading-note">This can take a moment.</p> : null}
          </div>
        ) : (
          <p className="result-count" aria-live="polite">
            {homeCount(visible.length)}
          </p>
        )}

        {loading ? (
          <div className="grid" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="skeleton" key={index} />
            ))}
          </div>
        ) : null}

        {error ? (
          <div className="empty">
            <h2>The list didn’t load</h2>
            <p>{error}</p>
            <button
              type="button"
              className="button"
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchProperties()
                  .then(setProperties)
                  .catch(() => setError("The property list didn’t load."))
                  .finally(() => setLoading(false));
              }}
            >
              Try again
            </button>
          </div>
        ) : null}

        {!loading && !error && visible.length === 0 ? (
          <div className="empty">
            <h2>No homes match</h2>
            <p>{query.trim() ? `Nothing came up for “${query.trim()}”.` : "Nothing matches these filters."}</p>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setQuery("");
                setFilters(emptyFilters);
              }}
            >
              Clear search and filters
            </button>
          </div>
        ) : null}

        {!loading && !error && visible.length > 0 ? (
          <div className="grid">
            {visible.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                selected={shortlist.selected.includes(property.id)}
                onToggle={() => shortlist.toggle(property.id)}
              />
            ))}
          </div>
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

function TownFilter({
  options,
  selected,
  onToggle,
  onClear,
}: {
  options: string[];
  selected: string[];
  onToggle: (town: string) => void;
  onClear: () => void;
}) {
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const label =
    selected.length === 0 ? "Any" : selected.length === 1 ? selected[0] : `${selected.length} towns`;

  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="town-filter" ref={root}>
      <span id={listId}>Town</span>
      <button
        type="button"
        className="town-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{label}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div className="town-menu" role="listbox" aria-multiselectable="true" aria-labelledby={listId}>
          {options.length === 0 ? <p className="town-empty">No towns yet</p> : null}
          {options.map((town) => {
            const checked = selected.includes(town);
            return (
              <label key={town} className={checked ? "is-on" : undefined}>
                <input type="checkbox" checked={checked} onChange={() => onToggle(town)} />
                <span>{town}</span>
              </label>
            );
          })}
          {selected.length > 0 ? (
            <button type="button" className="text-button town-clear" onClick={onClear}>
              Clear towns
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

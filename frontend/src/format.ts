import type { SentHome } from "./types";

export function formatPrice(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseGroupedDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatGroupedDigits(value: string): string {
  const digits = parseGroupedDigits(value);
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export function formatArea(value: number): string {
  return `${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(value)} m²`;
}

export function metaLine(property: Pick<SentHome, "bedrooms" | "bathrooms" | "builtAreaM2" | "plotAreaM2">): string {
  const parts: string[] = [];
  if (typeof property.bedrooms === "number") {
    parts.push(`${property.bedrooms} bed${property.bedrooms === 1 ? "" : "s"}`);
  }
  if (typeof property.bathrooms === "number") {
    parts.push(`${property.bathrooms} bath${property.bathrooms === 1 ? "" : "s"}`);
  }
  if (typeof property.builtAreaM2 === "number") parts.push(formatArea(property.builtAreaM2));
  else if (typeof property.plotAreaM2 === "number") parts.push(`${formatArea(property.plotAreaM2)} plot`);
  return parts.join(" · ");
}

export function shortSummary(text: string, max = 280): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 180 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function homeCount(count: number): string {
  return `${count} home${count === 1 ? "" : "s"}`;
}

export function titleCase(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

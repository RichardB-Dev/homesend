import { clearPropertiesCache } from "./api";
import { agent, defaultFooter, defaultIntro, limits, previousDefaultFooter } from "./branding";
import { exampleDrafts } from "./exampleSent";
import type { Property, SentHome, SentRecord } from "./types";
import { shortSummary } from "./format";

const sessionKey = "homesend.session";
const selectionKey = "homesend.selection";
const listKey = "homesend.list";
const listScrollRestoreKey = "homesend.list.restore";
const templateKey = `homesend.template.${agent.email}`;
const sentKey = `homesend.sent.${agent.email}`;
const sentLimit = 50;

const stringFilterKeys = ["transaction", "type", "minBeds", "minPrice", "maxPrice"] as const;

export type ListFilters = {
  municipality: string[];
} & Record<(typeof stringFilterKeys)[number], string>;

export const emptyListFilters: ListFilters = {
  municipality: [],
  transaction: "",
  type: "",
  minBeds: "",
  minPrice: "",
  maxPrice: "",
};

export type ListView = {
  query: string;
  filters: ListFilters;
  scrollY: number;
};

export type Session = { name: string; email: string };
export type Template = { intro: string; footer: string };

const previousAgentEmail = "hello@georgenayda.com";

function adoptPreviousStore(): void {
  const pairs = [
    [`homesend.template.${previousAgentEmail}`, templateKey],
    [`homesend.sent.${previousAgentEmail}`, sentKey],
  ];
  for (const [from, to] of pairs) {
    if (localStorage.getItem(to)) continue;
    const raw = localStorage.getItem(from);
    if (!raw) continue;
    localStorage.setItem(to, raw.replaceAll(previousAgentEmail, agent.email));
  }
}

export function readSession(): Session | null {
  const raw = sessionStorage.getItem(sessionKey);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Session;
    if (parsed.name !== agent.name) return null;
    if (parsed.email === previousAgentEmail) {
      const session: Session = { name: agent.name, email: agent.email };
      sessionStorage.setItem(sessionKey, JSON.stringify(session));
      adoptPreviousStore();
      return session;
    }
    if (parsed.email !== agent.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function signIn(password: string): string | null {
  if (!password.trim()) return "Enter a password to continue.";
  const session: Session = { name: agent.name, email: agent.email };
  sessionStorage.setItem(sessionKey, JSON.stringify(session));
  return null;
}

export function signOut(): void {
  sessionStorage.removeItem(sessionKey);
  sessionStorage.removeItem(selectionKey);
  sessionStorage.removeItem(listKey);
  sessionStorage.removeItem(listScrollRestoreKey);
  clearPropertiesCache();
}

export function readListView(): ListView {
  const raw = sessionStorage.getItem(listKey);
  const filters = { ...emptyListFilters };
  if (!raw) return { query: "", filters, scrollY: 0 };
  try {
    const parsed = JSON.parse(raw) as Partial<ListView>;
    if (parsed.filters && typeof parsed.filters === "object") {
      for (const key of stringFilterKeys) {
        const value = parsed.filters[key];
        if (typeof value === "string") filters[key] = value;
      }
      const towns = parsed.filters.municipality;
      if (Array.isArray(towns)) {
        filters.municipality = towns.filter((value): value is string => typeof value === "string" && value.length > 0);
      } else if (typeof towns === "string" && towns) {
        filters.municipality = [towns];
      }
    }
    const scrollY = typeof parsed.scrollY === "number" && parsed.scrollY > 0 ? parsed.scrollY : 0;
    return {
      query: typeof parsed.query === "string" ? parsed.query : "",
      filters,
      scrollY,
    };
  } catch {
    return { query: "", filters, scrollY: 0 };
  }
}

export function writeListView(view: ListView): void {
  sessionStorage.setItem(listKey, JSON.stringify(view));
}

export function rememberListScroll(): void {
  const saved = readListView();
  writeListView({ ...saved, scrollY: window.scrollY });
  sessionStorage.setItem(listScrollRestoreKey, "1");
}

/** Returns saved scroll only when returning from a property; otherwise 0. */
export function consumeListScrollRestore(): number {
  const shouldRestore = sessionStorage.getItem(listScrollRestoreKey) === "1";
  sessionStorage.removeItem(listScrollRestoreKey);
  if (!shouldRestore) return 0;
  return readListView().scrollY;
}

function filterIsOn(value: string | string[]): boolean {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

export function listIsNarrowed(view: ListView = readListView()): boolean {
  return view.query.trim().length > 0 || Object.values(view.filters).some(filterIsOn);
}

export function readSelection(): string[] {
  const raw = sessionStorage.getItem(selectionKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string").slice(0, limits.properties);
  } catch {
    return [];
  }
}

export function writeSelection(ids: string[]): void {
  sessionStorage.setItem(selectionKey, JSON.stringify(ids.slice(0, limits.properties)));
}

export function readTemplate(): Template {
  adoptPreviousStore();
  const raw = localStorage.getItem(templateKey);
  if (!raw) return { intro: defaultIntro, footer: defaultFooter };
  try {
    const parsed = JSON.parse(raw) as Partial<Template>;
    const stored = typeof parsed.footer === "string" ? parsed.footer : defaultFooter;
    const footer = stored.replaceAll(previousAgentEmail, agent.email);
    return {
      intro: typeof parsed.intro === "string" ? parsed.intro : defaultIntro,
      footer: footer.trim() === previousDefaultFooter.trim() ? defaultFooter : footer,
    };
  } catch {
    return { intro: defaultIntro, footer: defaultFooter };
  }
}

export function saveTemplate(template: Template): void {
  localStorage.setItem(templateKey, JSON.stringify(template));
}

const exampleSent: SentRecord[] = exampleDrafts.map((draft) => ({
  ...draft,
  intro: defaultIntro,
  footer: defaultFooter,
  delivered: true,
}));

function isExample(record: SentRecord): boolean {
  return record.id.startsWith("example-");
}

export function readSent(): SentRecord[] {
  adoptPreviousStore();
  const raw = localStorage.getItem(sentKey);
  let stored: SentRecord[] = [];
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as SentRecord[];
      stored = Array.isArray(parsed) ? parsed.filter((record) => !isExample(record)) : [];
    } catch {
      stored = [];
    }
  }
  const present = new Set(stored.map((record) => record.id));
  return [...stored, ...exampleSent.filter((record) => !present.has(record.id))];
}

export function snapshotHome(property: Property): SentHome {
  return {
    id: property.id,
    reference: property.reference,
    title: property.title,
    summary: shortSummary(property.summary),
    price: property.price,
    municipality: property.municipality,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    builtAreaM2: property.builtAreaM2,
    plotAreaM2: property.plotAreaM2,
    imageUrl: property.imageUrl,
    sourceUrl: property.sourceUrl,
  };
}

export function rememberSent(record: Omit<SentRecord, "id" | "sentAt">): SentRecord {
  const saved: SentRecord = {
    ...record,
    id: crypto.randomUUID(),
    sentAt: new Date().toISOString(),
  };
  const next = [saved, ...readSent().filter((record) => !record.id.startsWith("example-"))].slice(0, sentLimit);
  localStorage.setItem(sentKey, JSON.stringify(next));
  return saved;
}

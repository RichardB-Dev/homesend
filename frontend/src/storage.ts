import { agent, defaultFooter, defaultIntro, limits } from "./branding";
import type { Property, SentHome, SentRecord } from "./types";
import { shortSummary } from "./format";

const sessionKey = "homesend.session";
const selectionKey = "homesend.selection";
const templateKey = `homesend.template.${agent.email}`;
const sentKey = `homesend.sent.${agent.email}`;
const sentLimit = 50;

export type Session = { name: string; email: string };
export type Template = { intro: string; footer: string };

export function readSession(): Session | null {
  const raw = sessionStorage.getItem(sessionKey);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Session;
    if (parsed.email !== agent.email || parsed.name !== agent.name) return null;
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
  const raw = localStorage.getItem(templateKey);
  if (!raw) return { intro: defaultIntro, footer: defaultFooter };
  try {
    const parsed = JSON.parse(raw) as Partial<Template>;
    return {
      intro: typeof parsed.intro === "string" ? parsed.intro : defaultIntro,
      footer: typeof parsed.footer === "string" ? parsed.footer : defaultFooter,
    };
  } catch {
    return { intro: defaultIntro, footer: defaultFooter };
  }
}

export function saveTemplate(template: Template): void {
  localStorage.setItem(templateKey, JSON.stringify(template));
}

export function readSent(): SentRecord[] {
  const raw = localStorage.getItem(sentKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as SentRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
  const next = [saved, ...readSent()].slice(0, sentLimit);
  localStorage.setItem(sentKey, JSON.stringify(next));
  return saved;
}

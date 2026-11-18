import fs from "fs";
import path from "path";

const dir = "properties";

function short(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  const max = 180;
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return `${(last > 80 ? cut.slice(0, last) : cut).trim()}…`;
}

const rows = [];
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".json")) continue;
  const property = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  if (!String(property.imageUrl || "").startsWith("https://")) continue;
  if (!String(property.sourceUrl || "").startsWith("https://")) continue;
  if (property.type === "Restaurant") continue;
  rows.push({
    id: property.id,
    reference: property.reference,
    title: property.title,
    summary: short(property.summary),
    price: property.price,
    municipality: property.municipality,
    bedrooms: property.bedrooms ?? null,
    bathrooms: property.bathrooms ?? null,
    builtAreaM2: property.builtAreaM2 ?? null,
    plotAreaM2: property.plotAreaM2 ?? null,
    imageUrl: property.imageUrl,
    sourceUrl: property.sourceUrl,
    type: property.type,
  });
}
rows.sort((a, b) => a.reference.localeCompare(b.reference));

const used = new Set();
function pick(predicate, count) {
  const byType = new Map();
  for (const row of rows) {
    if (used.has(row.id) || !predicate(row)) continue;
    const list = byType.get(row.type) ?? [];
    list.push(row);
    byType.set(row.type, list);
  }
  for (const list of byType.values()) list.sort((a, b) => b.price.amount - a.price.amount);
  const queues = [...byType.values()];
  const homes = [];
  while (homes.length < count && queues.some((list) => list.length > 0)) {
    for (const list of queues) {
      if (homes.length >= count || list.length === 0) continue;
      const row = list.shift();
      used.add(row.id);
      const { type, ...home } = row;
      homes.push(home);
    }
  }
  if (homes.length < count) throw new Error(`Needed ${count}, found ${homes.length}`);
  return homes.sort((a, b) => b.price.amount - a.price.amount);
}

const town = (name) => (row) => row.municipality === name;
const emails = [
  {
    id: "example-amelia",
    sentAt: "2026-11-17T09:15:00.000Z",
    clientName: "Amelia Hart",
    clientEmail: "amelia.hart@example.com",
    properties: pick(town("Cala de Mijas"), 5),
  },
  {
    id: "example-james",
    sentAt: "2026-11-15T16:40:00.000Z",
    clientName: "James Whitaker",
    clientEmail: "james.whitaker@example.com",
    properties: pick(town("Nueva Andalucia"), 5),
  },
  {
    id: "example-sofia",
    sentAt: "2026-11-13T11:05:00.000Z",
    clientName: "Sofia Navarro",
    clientEmail: "sofia.navarro@example.com",
    properties: pick(town("Estepona"), 6),
  },
  {
    id: "example-henrik",
    sentAt: "2026-11-10T14:20:00.000Z",
    clientName: "Henrik Lindqvist",
    clientEmail: "henrik.lindqvist@example.com",
    properties: pick(town("Benahavis"), 4),
  },
  {
    id: "example-claire",
    sentAt: "2026-11-07T10:00:00.000Z",
    clientName: "Claire Dubois",
    clientEmail: "claire.dubois@example.com",
    properties: pick(town("El Higueron"), 5),
  },
];

const body = `import type { SentHome } from "./types";

export type ExampleDraft = {
  id: string;
  sentAt: string;
  clientName: string;
  clientEmail: string;
  properties: SentHome[];
};

export const exampleDrafts: ExampleDraft[] = ${JSON.stringify(emails, null, 2)};
`;

fs.writeFileSync("frontend/src/exampleSent.ts", body);
for (const email of emails) {
  console.log(`${email.clientName} ${email.properties.length} ${email.properties.map((home) => home.reference).join(", ")}`);
}

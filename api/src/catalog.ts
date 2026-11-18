import fs from "fs";
import path from "path";
import type { Property } from "./types";

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function propertiesDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "../properties"),
    path.resolve(process.cwd(), "data/properties"),
    path.resolve(__dirname, "../../data/properties"),
    path.resolve(__dirname, "../../../properties"),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) return dir;
  }

  throw new Error("Could not find the properties folder.");
}

function parseProperty(raw: unknown, fileName: string): Property | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const price = record.price as Record<string, unknown> | undefined;
  const amount = asNumber(price?.amount);
  const id = asString(record.id);
  const title = asString(record.title);
  if (!id || !title || amount === null) {
    console.warn(`Skipping ${fileName}: missing id, title, or price.`);
    return null;
  }

  const images = asStringList(record.images);
  const imageUrl = asString(record.imageUrl) ?? images[0] ?? "";

  return {
    id,
    reference: asString(record.reference) ?? id.toUpperCase(),
    title,
    summary: asString(record.summary) ?? "",
    description: asString(record.description) ?? "",
    transaction: asString(record.transaction) ?? "sale",
    type: asString(record.type) ?? "Home",
    price: {
      amount,
      currency: asString(price?.currency) ?? "EUR",
    },
    bedrooms: asNumber(record.bedrooms),
    bathrooms: asNumber(record.bathrooms),
    builtAreaM2: asNumber(record.builtAreaM2),
    plotAreaM2: asNumber(record.plotAreaM2),
    terraceAreaM2: asNumber(record.terraceAreaM2),
    municipality: asString(record.municipality) ?? "",
    province: asString(record.province) ?? "",
    area: asString(record.area) ?? "",
    address: asString(record.address),
    features: asStringList(record.features),
    imageUrl,
    images,
    sourceUrl: asString(record.sourceUrl) ?? "",
  };
}

export function loadProperties(): Property[] {
  const dir = propertiesDir();
  const files = fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort();
  const properties: Property[] = [];

  for (const fileName of files) {
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, fileName), "utf8")) as unknown;
      const property = parseProperty(raw, fileName);
      if (property) properties.push(property);
    } catch (error) {
      console.warn(`Skipping ${fileName}: ${error instanceof Error ? error.message : "invalid JSON"}`);
    }
  }

  properties.sort((a, b) => a.reference.localeCompare(b.reference));
  return properties;
}

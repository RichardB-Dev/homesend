import type { Property } from "./types";

let cachedProperties: Property[] | null = null;
let inflightProperties: Promise<Property[]> | null = null;

export function clearPropertiesCache(): void {
  cachedProperties = null;
  inflightProperties = null;
}

export async function fetchProperties(options?: { force?: boolean }): Promise<Property[]> {
  if (options?.force) clearPropertiesCache();
  if (cachedProperties) return cachedProperties;
  if (inflightProperties) return inflightProperties;

  inflightProperties = (async () => {
    try {
      const response = await fetch("/api/properties");
      if (!response.ok) throw new Error("The property list could not be loaded.");
      const data = (await response.json()) as { properties?: Property[] };
      cachedProperties = data.properties ?? [];
      return cachedProperties;
    } catch (error) {
      cachedProperties = null;
      throw error;
    } finally {
      inflightProperties = null;
    }
  })();

  return inflightProperties;
}

export async function sendClientEmail(payload: {
  clientName: string;
  clientEmail: string;
  agentName: string;
  agentEmail: string;
  intro: string;
  footer: string;
  propertyIds: string[];
}): Promise<{ delivered: boolean }> {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; delivered?: boolean };
  if (!response.ok || !data.ok) {
    throw new Error(data.error || "The email could not be sent.");
  }
  return { delivered: Boolean(data.delivered) };
}

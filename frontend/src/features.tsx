import type { ReactNode } from "react";

export type FeatureSectionId =
  | "views"
  | "outdoor"
  | "inside"
  | "comfort"
  | "security"
  | "nearby"
  | "condition"
  | "more";

export type FeatureGroup = {
  id: FeatureSectionId;
  title: string;
  items: string[];
};

const sections: { id: FeatureSectionId; title: string }[] = [
  { id: "views", title: "Views" },
  { id: "outdoor", title: "Outdoor" },
  { id: "inside", title: "Inside" },
  { id: "comfort", title: "Comfort" },
  { id: "security", title: "Security" },
  { id: "nearby", title: "Nearby" },
  { id: "condition", title: "Condition" },
  { id: "more", title: "More" },
];

const catalog: Record<string, { section: FeatureSectionId; label: string }> = {
  "sea view": { section: "views", label: "Sea view" },
  "views sea": { section: "views", label: "Sea view" },
  "partial sea views": { section: "views", label: "Partial sea views" },
  "panoramic view": { section: "views", label: "Panoramic view" },
  "views panoramic": { section: "views", label: "Panoramic view" },
  "garden view": { section: "views", label: "Garden view" },
  "views garden": { section: "views", label: "Garden view" },
  "pool view": { section: "views", label: "Pool view" },
  "views pool": { section: "views", label: "Pool view" },
  "golf view": { section: "views", label: "Golf view" },
  "views golf": { section: "views", label: "Golf view" },
  "mountain view": { section: "views", label: "Mountain view" },
  "views mountain": { section: "views", label: "Mountain view" },
  "country view": { section: "views", label: "Country view" },
  "views country": { section: "views", label: "Country view" },
  "lake view": { section: "views", label: "Lake view" },
  "views lake": { section: "views", label: "Lake view" },
  "marina view": { section: "views", label: "Marina view" },
  "street view": { section: "views", label: "Street view" },
  "views street": { section: "views", label: "Street view" },
  "urban view": { section: "views", label: "Urban view" },
  "beach side": { section: "views", label: "Beachside" },
  "front line beach": { section: "views", label: "Front line beach" },
  "front line golf": { section: "views", label: "Front line golf" },
  "mountainside": { section: "views", label: "Mountainside" },
  "direct sea access": { section: "views", label: "Direct sea access" },
  "inside golf resort": { section: "views", label: "Inside a golf resort" },

  balcony: { section: "outdoor", label: "Balcony" },
  "covered terrace": { section: "outdoor", label: "Covered terrace" },
  "uncovered terrace": { section: "outdoor", label: "Uncovered terrace" },
  "private terrace": { section: "outdoor", label: "Private terrace" },
  "roof terrace": { section: "outdoor", label: "Roof terrace" },
  solarium: { section: "outdoor", label: "Solarium" },
  barbecue: { section: "outdoor", label: "Barbecue" },
  "heated pool": { section: "outdoor", label: "Heated pool" },
  "pool heated": { section: "outdoor", label: "Heated pool" },
  "indoor pool": { section: "outdoor", label: "Indoor pool" },
  "pool indoor": { section: "outdoor", label: "Indoor pool" },
  "saltwater swimming pool": { section: "outdoor", label: "Saltwater pool" },
  "pool saltwater": { section: "outdoor", label: "Saltwater pool" },
  "automatic irrigation system": { section: "outdoor", label: "Automatic irrigation" },
  "mature gardens": { section: "outdoor", label: "Mature gardens" },
  "paddle tennis": { section: "outdoor", label: "Tennis and paddle" },
  "tennis paddle court": { section: "outdoor", label: "Tennis and paddle" },

  "fully fitted kitchen": { section: "inside", label: "Fully fitted kitchen" },
  "kitchen equipped": { section: "inside", label: "Fully fitted kitchen" },
  "kitchen fully fitted": { section: "inside", label: "Fully fitted kitchen" },
  "open plan kitchen": { section: "inside", label: "Open-plan kitchen" },
  "kitchen kitchen lounge": { section: "inside", label: "Open-plan kitchen" },
  "kitchen not fitted": { section: "inside", label: "Kitchen not fitted" },
  "optional furniture": { section: "inside", label: "Optional furniture" },
  "kitchen optional furniture": { section: "inside", label: "Optional furniture" },
  "dining room": { section: "inside", label: "Dining room" },
  "separate dining room": { section: "inside", label: "Dining room" },
  "living room": { section: "inside", label: "Living room" },
  fireplace: { section: "inside", label: "Fireplace" },
  "guest toilet": { section: "inside", label: "Guest toilet" },
  "guest room": { section: "inside", label: "Guest room" },
  "guest apartment": { section: "inside", label: "Guest apartment" },
  "separate apartment": { section: "inside", label: "Guest apartment" },
  "office room": { section: "inside", label: "Office" },
  "laundry room": { section: "inside", label: "Laundry room" },
  "utility room": { section: "inside", label: "Utility room" },
  "storage room": { section: "inside", label: "Storage room" },
  "wine cellar": { section: "inside", label: "Wine cellar" },
  basement: { section: "inside", label: "Basement" },
  lift: { section: "inside", label: "Lift" },
  "walk in closet": { section: "inside", label: "Walk-in closet" },
  "fitted wardrobes": { section: "inside", label: "Fitted wardrobes" },
  "cinema room": { section: "inside", label: "Cinema room" },
  "games room": { section: "inside", label: "Games room" },
  gym: { section: "inside", label: "Gym" },
  spa: { section: "inside", label: "Spa" },
  sauna: { section: "inside", label: "Sauna" },
  "steam room": { section: "inside", label: "Steam room" },
  "turkish bath": { section: "inside", label: "Turkish bath" },
  jacuzzi: { section: "inside", label: "Jacuzzi" },
  "glass doors": { section: "inside", label: "Glass doors" },
  "pets allowed": { section: "inside", label: "Pets allowed" },

  "air conditioning": { section: "comfort", label: "Air conditioning" },
  "hot a c": { section: "comfort", label: "Warm air conditioning" },
  "cold a c": { section: "comfort", label: "Cool air conditioning" },
  "ceiling cooling system": { section: "comfort", label: "Ceiling cooling" },
  "ceiling heating system": { section: "comfort", label: "Ceiling heating" },
  "central heating": { section: "comfort", label: "Central heating" },
  "u f heating": { section: "comfort", label: "Underfloor heating" },
  "underfloor heating throughout": { section: "comfort", label: "Underfloor heating" },
  "u f h bathrooms": { section: "comfort", label: "Underfloor heating in bathrooms" },
  "underfloor heating bathrooms": { section: "comfort", label: "Underfloor heating in bathrooms" },
  "underfloor heating partial": { section: "comfort", label: "Partial underfloor heating" },
  "underfloor cooling system": { section: "comfort", label: "Underfloor cooling" },
  "double glazing": { section: "comfort", label: "Double glazing" },
  "electric blinds": { section: "comfort", label: "Electric blinds" },
  "marble flooring": { section: "comfort", label: "Marble floors" },
  "marble floors": { section: "comfort", label: "Marble floors" },
  "parquet floors": { section: "comfort", label: "Parquet floors" },
  "porcelain floors": { section: "comfort", label: "Porcelain floors" },
  "wood flooring": { section: "comfort", label: "Wood floors" },
  "wooden floors": { section: "comfort", label: "Wood floors" },
  "fully furnished": { section: "comfort", label: "Fully furnished" },
  unfurnished: { section: "comfort", label: "Unfurnished" },

  alarm: { section: "security", label: "Alarm" },
  "alarm system": { section: "security", label: "Alarm" },
  "gated community": { section: "security", label: "Gated community" },
  "gated complex": { section: "security", label: "Gated community" },
  "security entrance": { section: "security", label: "Security entrance" },
  "24 hour reception": { section: "security", label: "24-hour reception" },
  "24h service": { section: "security", label: "24-hour service" },
  "security service 24h": { section: "security", label: "24-hour security" },
  doorman: { section: "security", label: "Doorman" },
  "surveillance cameras": { section: "security", label: "Surveillance cameras" },
  "video entrance": { section: "security", label: "Video entrance" },
  "security shutters": { section: "security", label: "Security shutters" },
  "smart home system": { section: "security", label: "Smart home" },
  "internet wi fi": { section: "security", label: "Wi-Fi" },
  "satellite tv": { section: "security", label: "Satellite TV" },
  "dolby stereo surround system": { section: "security", label: "Surround sound" },
  telephone: { section: "security", label: "Telephone" },
  "ev charging station": { section: "security", label: "EV charging" },
  "solar panels": { section: "security", label: "Solar panels" },
  "wheelchair accessible": { section: "security", label: "Wheelchair accessible" },

  "amenities near": { section: "nearby", label: "Amenities nearby" },
  "close to golf": { section: "nearby", label: "Close to golf" },
  "close to port": { section: "nearby", label: "Close to the port" },
  "close to restaurants": { section: "nearby", label: "Close to restaurants" },
  "close to schools": { section: "nearby", label: "Close to schools" },
  "close to sea beach": { section: "nearby", label: "Close to the beach" },
  "close to shops": { section: "nearby", label: "Close to shops" },
  "close to town": { section: "nearby", label: "Close to town" },
  "close to children playground": { section: "nearby", label: "Close to a playground" },
  "transport near": { section: "nearby", label: "Transport nearby" },

  "brand new": { section: "condition", label: "Brand new" },
  "condition new construction": { section: "condition", label: "Brand new" },
  "excellent condition": { section: "condition", label: "Excellent condition" },
  "condition excellent": { section: "condition", label: "Excellent condition" },
  "recently renovated refurbished": { section: "condition", label: "Recently renovated" },
  "condition recently renovated": { section: "condition", label: "Recently renovated" },
  "renovation needed": { section: "condition", label: "Renovation needed" },
  "condition renovation required": { section: "condition", label: "Renovation needed" },
  "orientation east": { section: "condition", label: "East facing" },
  "orientation north east": { section: "condition", label: "North-east facing" },
  "orientation south": { section: "condition", label: "South facing" },
  "orientation south east": { section: "condition", label: "South-east facing" },
  "orientation south west": { section: "condition", label: "South-west facing" },
  "orientation west": { section: "condition", label: "West facing" },
};

function normalize(feature: string): string {
  return feature
    .trim()
    .toLowerCase()
    .replace(/[:/]+/g, " ")
    .replace(/[^a-z0-9+ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function groupFeatures(features: string[]): FeatureGroup[] {
  const seen = new Set<string>();
  const buckets = new Map<FeatureSectionId, string[]>();

  for (const feature of features) {
    const known = catalog[normalize(feature)];
    const section = known?.section ?? "more";
    const label = known?.label ?? feature.trim();
    if (!label) continue;
    const key = `${section}:${label.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const items = buckets.get(section) ?? [];
    items.push(label);
    buckets.set(section, items);
  }

  return sections
    .filter((section) => buckets.has(section.id))
    .map((section) => ({
      ...section,
      items: (buckets.get(section.id) ?? []).sort((a, b) => a.localeCompare(b)),
    }));
}

function Stroke({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function FeatureIcon({ id }: { id: FeatureSectionId }) {
  if (id === "views") {
    return (
      <Stroke>
        <path d="M2.2 10S5.2 5.2 10 5.2 17.8 10 17.8 10 14.8 14.8 10 14.8 2.2 10 2.2 10Z" />
        <circle cx="10" cy="10" r="2.1" />
      </Stroke>
    );
  }
  if (id === "outdoor") {
    return (
      <Stroke>
        <circle cx="10" cy="10" r="2.6" />
        <path d="M10 2.4v2.1M10 15.5v2.1M2.4 10h2.1M15.5 10h2.1M4.6 4.6l1.5 1.5M13.9 13.9l1.5 1.5M15.4 4.6l-1.5 1.5M6.1 13.9l-1.5 1.5" />
      </Stroke>
    );
  }
  if (id === "inside") {
    return (
      <Stroke>
        <path d="M3.2 9.1 10 3.4l6.8 5.7v7.4H12v-4.2H8V16.5H3.2V9.1Z" />
      </Stroke>
    );
  }
  if (id === "comfort") {
    return (
      <Stroke>
        <path d="M10 3.2a2 2 0 0 1 2 2v5.2a3.1 3.1 0 1 1-4 0V5.2a2 2 0 0 1 2-2Z" />
        <path d="M10 11.2v2.2" />
      </Stroke>
    );
  }
  if (id === "security") {
    return (
      <Stroke>
        <path d="M10 2.6 16.2 5v4.8c0 3.3-2.3 5.6-6.2 7.2-3.9-1.6-6.2-3.9-6.2-7.2V5L10 2.6Z" />
      </Stroke>
    );
  }
  if (id === "nearby") {
    return (
      <Stroke>
        <path d="M10 17.4s4.8-4 4.8-7.7a4.8 4.8 0 1 0-9.6 0c0 3.7 4.8 7.7 4.8 7.7Z" />
        <circle cx="10" cy="9.6" r="1.5" />
      </Stroke>
    );
  }
  if (id === "condition") {
    return (
      <Stroke>
        <path d="M10 2.6 11.7 7.2l4.8.5-3.6 3.2.9 4.8L10 13.4 6.2 15.7l.9-4.8L3.5 7.7l4.8-.5L10 2.6Z" />
      </Stroke>
    );
  }
  return (
    <Stroke>
      <path d="M4 10h.01M10 10h.01M16 10h.01" />
    </Stroke>
  );
}

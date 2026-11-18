export type Property = {
  id: string;
  reference: string;
  title: string;
  summary: string;
  description: string;
  transaction: string;
  type: string;
  price: { amount: number; currency: string };
  bedrooms: number | null;
  bathrooms: number | null;
  builtAreaM2: number | null;
  plotAreaM2: number | null;
  terraceAreaM2: number | null;
  municipality: string;
  province: string;
  area: string;
  address: string | null;
  features: string[];
  imageUrl: string;
  images: string[];
  sourceUrl: string;
};

export type SentHome = {
  id: string;
  reference: string;
  title: string;
  summary: string;
  price: { amount: number; currency: string };
  municipality: string;
  bedrooms: number | null;
  bathrooms: number | null;
  builtAreaM2: number | null;
  plotAreaM2: number | null;
  imageUrl: string;
  sourceUrl: string;
};

export type SentRecord = {
  id: string;
  sentAt: string;
  clientName: string;
  clientEmail: string;
  intro: string;
  footer: string;
  delivered: boolean;
  properties: SentHome[];
};

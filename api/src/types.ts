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
  sold: boolean;
};

export type SendInput = {
  clientName?: unknown;
  clientEmail?: unknown;
  agentName?: unknown;
  agentEmail?: unknown;
  intro?: unknown;
  footer?: unknown;
  propertyIds?: unknown;
};

export type SendSuccess = {
  ok: true;
  delivered: boolean;
  previewHtml: string;
};

export type SendFailure = {
  ok: false;
  error: string;
};

export type SendResult = SendSuccess | SendFailure;

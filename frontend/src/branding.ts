export const agent = {
  name: "George Nayda",
  email: "hello@georgenayda.com",
  phone: "+34 951 870 121",
  portrait: "/brand/george.jpg",
};

export const agency = {
  name: "Bromley Estates Marbella",
  shortName: "Bromley Estates",
  tagline: "Marbella's Premier Real Estate Agency",
  logo: "/brand/logo.png",
  teal: "#0CB6B0",
};

export const defaultIntro =
  "I've selected a few homes that I think fit what you're looking for. Take a look through them, and tell me which ones you'd like to see. I can arrange viewings, share more detail, or narrow the list further.";

export const defaultFooter = `George Nayda
Bromley Estates Marbella
+34 951 870 121
hello@georgenayda.com

+34 952 939 460 · +44 208 068 7606
Urbanización el Rosario, N-340, km188
29604 Marbella, Málaga
bromleyestatesmarbella.com`;

export function resalesListingUrl(reference: string): string {
  const ref = encodeURIComponent(reference);
  return `https://auth.resales-online.com/en/login?website=resales-online.com&agencyRef=${ref}`;
}

export const limits = {
  intro: 2000,
  footer: 1500,
  clientName: 80,
  properties: 8,
};

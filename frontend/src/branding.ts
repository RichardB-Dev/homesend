export const agent = {
  name: "George Nayda",
  email: "georgenayda@bromleyestatesmarbella.com",
  phone: "+34 951 870 121",
  portrait: "/brand/george.jpg",
};

export const homeSend = {
  name: "Home Send",
  logo: "/logo_refined.svg",
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

export const previousDefaultFooter = `George Nayda
Bromley Estates Marbella
+34 951 870 121
${agent.email}

+34 952 939 460 · +44 208 068 7606
Urbanización el Rosario, N-340, km188
29604 Marbella, Málaga
bromleyestatesmarbella.com`;

export const defaultFooter = `${previousDefaultFooter}

This message is confidential and intended only for the named recipient. If you received it in error, please delete it and tell the sender.

BROMLEY ESTATES S.L. · CIF B93030716. Your contact details are used to send the homes you asked about, under the GDPR and Organic Law 3/2018. You can access, correct, or delete them, or withdraw consent, by writing to silvia@bromleyestatesmarbella.com. You may also complain to the Spanish Data Protection Agency (aepd.es). Details and prices are given in good faith and may change. This email is not a contractual offer.`;

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

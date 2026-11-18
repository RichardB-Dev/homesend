import { agency } from "./branding";
import type { Property } from "./types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textToHtml(value: string): string {
  return escapeHtml(value).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");
}

function httpsUrl(value: string): string | null {
  if (/^https:\/\/\S+$/i.test(value)) return value;
  return null;
}

function publicAsset(pathName: string): string | null {
  const base = (process.env.PUBLIC_BASE_URL ?? "").trim().replace(/\/$/, "");
  if (!base || !/^https:\/\/\S+$/i.test(base)) return null;
  return `${base}${pathName}`;
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatArea(value: number): string {
  return `${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(value)} m²`;
}

function metaLine(property: Property): string {
  const parts: string[] = [];
  if (typeof property.bedrooms === "number") {
    parts.push(`${property.bedrooms} bed${property.bedrooms === 1 ? "" : "s"}`);
  }
  if (typeof property.bathrooms === "number") {
    parts.push(`${property.bathrooms} bath${property.bathrooms === 1 ? "" : "s"}`);
  }
  if (typeof property.builtAreaM2 === "number") parts.push(formatArea(property.builtAreaM2));
  else if (typeof property.plotAreaM2 === "number") parts.push(`${formatArea(property.plotAreaM2)} plot`);
  return parts.join(" · ");
}

export function shortSummary(text: string, max = 280): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 180 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function propertyBlock(property: Property): string {
  const image = httpsUrl(property.imageUrl);
  const source = httpsUrl(property.sourceUrl);
  const meta = metaLine(property);
  const summary = shortSummary(property.summary);
  const imageRow = image
    ? `<img src="${escapeHtml(image)}" alt="" width="576" style="display:block;width:100%;max-width:576px;height:auto;border-radius:12px;border:0;">`
    : "";
  const link = source
    ? `<a href="${escapeHtml(source)}" style="color:${agency.teal};text-decoration:none;font-family:Georgia,'Times New Roman',serif;">View this home</a>`
    : "";

  return `
    <tr>
      <td style="padding:22px 0 0;">
        ${imageRow}
        <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6b645c;">${escapeHtml(property.reference)} · ${escapeHtml(property.municipality)}</p>
        <p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.25;color:#1a1714;">${escapeHtml(property.title)}</p>
        <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#1a1714;">${escapeHtml(formatPrice(property.price.amount, property.price.currency))}</p>
        ${meta ? `<p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b645c;">${escapeHtml(meta)}</p>` : ""}
        ${summary ? `<p style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:#1a1714;">${escapeHtml(summary)}</p>` : ""}
        ${link ? `<p style="margin:12px 0 0;">${link}</p>` : ""}
      </td>
    </tr>`;
}

export function renderEmail(input: {
  clientName: string;
  intro: string;
  footer: string;
  properties: Property[];
}): string {
  const logo = publicAsset("/brand/logo.png");
  const portrait = publicAsset("/brand/george.jpg");
  const logoImg = logo
    ? `<img src="${escapeHtml(logo)}" alt="" width="48" height="48" style="display:block;border-radius:8px;border:0;">`
    : "";
  const portraitImg = portrait
    ? `<img src="${escapeHtml(portrait)}" alt="George Nayda" width="64" height="64" style="display:block;border-radius:32px;border:0;object-fit:cover;">`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Homes from George Nayda</title>
</head>
<body style="margin:0;padding:0;background:#f4f0ea;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f0ea;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:100%;background:#fffcf9;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${agency.teal};padding:26px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  ${logoImg ? `<td style="padding-right:14px;">${logoImg}</td>` : ""}
                  <td>
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#ffffff;">${escapeHtml(agency.shortName)}</p>
                    <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#e7fffc;">Marbella</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.15;color:#1a1714;">Hello ${escapeHtml(input.clientName)},</p>
              <p style="margin:16px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.5;color:#1a1714;">${textToHtml(input.intro)}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${input.properties.map(propertyBlock).join("")}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  ${portraitImg ? `<td style="padding-right:14px;vertical-align:top;">${portraitImg}</td>` : ""}
                  <td style="vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#6b645c;">${textToHtml(input.footer)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderText(input: {
  clientName: string;
  intro: string;
  footer: string;
  properties: Property[];
}): string {
  const homes = input.properties
    .map((property) => {
      const lines = [
        property.reference,
        property.title,
        formatPrice(property.price.amount, property.price.currency),
        property.municipality,
        metaLine(property),
        shortSummary(property.summary),
        property.sourceUrl,
      ].filter(Boolean);
      return lines.join("\n");
    })
    .join("\n\n");

  return `Hello ${input.clientName},\n\n${input.intro}\n\n${homes}\n\n${input.footer}`;
}

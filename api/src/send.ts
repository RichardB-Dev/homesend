import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { agency, agent, limits } from "./branding.js";
import { loadProperties } from "./catalog.js";
import { renderEmail, renderText } from "./email.js";
import type { Property, SendInput, SendResult } from "./types.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readMailFile(name: string): Record<string, string> {
  const candidates = [path.join(process.cwd(), name), path.join(__dirname, "..", name)];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    try {
      return JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, string>;
    } catch {
      return {};
    }
  }
  return {};
}

const mailSettings = readMailFile("mail.settings.json");
const mailSecrets = readMailFile("mail.secrets.json");

function setting(name: string, fallback = ""): string {
  const fromEnv = text(process.env[name]);
  if (fromEnv) return fromEnv;
  const fromSecrets = text(mailSecrets[name]);
  if (fromSecrets) return fromSecrets;
  return text(mailSettings[name]) || fallback;
}

function dryRun(): boolean {
  return setting("DRY_RUN", "false") === "true";
}

export async function handleSend(input: SendInput): Promise<SendResult> {
  const clientName = text(input.clientName);
  const clientEmail = text(input.clientEmail);
  const intro = text(input.intro);
  const footer = text(input.footer);
  const rawIds = Array.isArray(input.propertyIds) ? input.propertyIds : [];
  const propertyIds = [...new Set(rawIds.filter((id): id is string => typeof id === "string" && id.trim().length > 0))];

  if (!clientName) return { ok: false, error: "Enter the client’s name." };
  if (clientName.length > limits.clientName) return { ok: false, error: "The client’s name is too long." };
  if (!emailPattern.test(clientEmail)) return { ok: false, error: "Enter a valid email address." };
  if (!intro) return { ok: false, error: "Write a short introduction." };
  if (intro.length > limits.intro) return { ok: false, error: "The introduction is too long." };
  if (!footer) return { ok: false, error: "Write a footer." };
  if (footer.length > limits.footer) return { ok: false, error: "The footer is too long." };
  if (propertyIds.length === 0) return { ok: false, error: "Choose at least one home." };
  if (propertyIds.length > limits.properties) {
    return { ok: false, error: "You can send up to 8 homes at once." };
  }

  const catalog = loadProperties();
  const byId = new Map(catalog.map((property) => [property.id, property]));
  const properties: Property[] = [];
  for (const id of propertyIds) {
    const property = byId.get(id);
    if (!property) return { ok: false, error: "One of the selected homes is no longer available." };
    properties.push(property);
  }

  const message = { clientName, intro, footer, properties };
  const html = renderEmail(message);
  const plain = renderText(message);

  if (dryRun()) {
    console.log(`Dry run: prepared ${properties.length} homes for ${clientEmail}`);
    return { ok: true, delivered: false, previewHtml: html };
  }

  const host = setting("SMTP_HOST", "smtp.gmail.com");
  const user = setting("SMTP_USER");
  const pass = setting("SMTP_PASSWORD");
  const from = setting("MAIL_FROM");
  const fromName = setting("MAIL_FROM_NAME", agent.name);
  const port = Number(setting("SMTP_PORT", "587"));

  if (!host || !user || !pass || !from) {
    return { ok: false, error: "Mailbox access is not configured." };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${fromName.replace(/"/g, "")}" <${from}>`,
      to: clientEmail,
      replyTo: from,
      subject: `Homes for ${clientName} — ${fromName}, ${agency.shortName}`,
      html,
      text: plain,
    });
  } catch (error) {
    console.error("SMTP send failed", error instanceof Error ? error.message : error);
    return { ok: false, error: "The email could not be sent. Check the mailbox settings." };
  }

  return { ok: true, delivered: true, previewHtml: html };
}

import fs from "fs";
import http from "http";
import path from "path";
import { loadProperties } from "./catalog.js";
import { handleSend } from "./send.js";
import type { SendInput } from "./types.js";

function loadLocalSettings(): void {
  const file = path.join(process.cwd(), "local.settings.json");
  if (!fs.existsSync(file)) return;
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as { Values?: Record<string, string> };
  for (const [key, value] of Object.entries(parsed.Values ?? {})) {
    if (process.env[key] === undefined) process.env[key] = String(value);
  }
}

function sendJson(res: http.ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(payload);
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

loadLocalSettings();

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    });
    res.end();
    return;
  }

  const url = new URL(req.url || "/", "http://127.0.0.1");

  try {
    if (req.method === "GET" && url.pathname === "/api/properties") {
      sendJson(res, 200, { properties: loadProperties() });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/send-email") {
      const raw = await readBody(req);
      let body: SendInput;
      try {
        body = JSON.parse(raw || "{}") as SendInput;
      } catch {
        sendJson(res, 400, { ok: false, error: "The request could not be read." });
        return;
      }
      const result = await handleSend(body);
      sendJson(res, result.ok ? 200 : 400, result);
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found." });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { ok: false, error: "Something went wrong on the server." });
  }
});

const port = 7071;
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Home Send API already listening on http://127.0.0.1:${port}`);
    setInterval(() => undefined, 60_000);
    return;
  }
  console.error(error);
  process.exit(1);
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Home Send API listening on http://127.0.0.1:${port}`);
});

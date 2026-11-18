import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { loadProperties } from "./catalog.js";
import { handleSend } from "./send.js";
import type { SendInput } from "./types.js";

app.http("properties", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "properties",
  handler: async (): Promise<HttpResponseInit> => {
    try {
      return { jsonBody: { properties: loadProperties() } };
    } catch (error) {
      console.error(error);
      return { status: 500, jsonBody: { error: "The property list could not be loaded." } };
    }
  },
});

app.http("sendEmail", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "send-email",
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    let body: SendInput;
    try {
      body = (await request.json()) as SendInput;
    } catch {
      return { status: 400, jsonBody: { ok: false, error: "The request could not be read." } };
    }

    const result = await handleSend(body);
    if (!result.ok) context.warn(result.error);
    return { status: result.ok ? 200 : 400, jsonBody: result };
  },
});

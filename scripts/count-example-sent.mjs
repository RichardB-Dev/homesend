import { exampleDrafts } from "../frontend/src/exampleSent.ts";

for (const draft of exampleDrafts) {
  console.log(`${draft.clientName}: ${draft.properties.length} — ${draft.properties.map((p) => p.reference).join(", ")}`);
}

import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, "../../properties");
const dest = path.resolve(here, "../data/properties");

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

const files = readdirSync(source).filter((name) => name.endsWith(".json"));
for (const name of files) {
  copyFileSync(path.join(source, name), path.join(dest, name));
}

console.log(`Copied ${files.length} properties into api/data/properties`);

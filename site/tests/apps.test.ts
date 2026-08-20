import { expect, test } from "bun:test";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");

test("every indexed app carries a README-sourced one-line description", async () => {
  const source = await Bun.file(join(root, "site", "src", "data", "apps.ts")).text();

  for (const phrase of [
    "deterministic forecast controls",
    "atmospheric bilingual tarot-reading application",
    "fully client-side web studio",
    "Strict TypeScript PNG-to-SVG vectorisation",
    "PNG to dense Unicode text art",
    "genuine QR matrices as dense text",
    "MIKU Is Not the Kernel; it's Userspace"
  ]) expect(source).toContain(phrase);

  expect(source.match(/description:/g)?.length ?? 0).toBe(7);
});

test("app cards render the description between name and route", async () => {
  const source = await Bun.file(join(root, "site", "src", "ui", "Apps.tsx")).text();

  expect(source).toContain("app-card__description");
  expect(source).toContain("{app.description}");
});

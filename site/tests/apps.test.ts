import { expect, test } from "bun:test";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");

test("all app descriptions are explicit static catalogue data", async () => {
  const source = await Bun.file(join(root, "site", "src", "data", "apps.ts")).text();

  for (const descriptor of [
    "FeLinE 1000X market tracking with persistent price history, deterministic OHLC candles, moving averages, RSI, Bollinger Bands and forecasts.",
    "A strongly typed TypeScript library for tarot draws, reader profiles, staged readings, handovers and structured OpenAI interpretation.",
    "A fully client-side web studio and VS Code extension for decoding, previewing and generating binary tracks for Sandsara kinetic sand tables.",
    "Converts PNG to SVG with actual vector paths, no Raster-on-a-Vector-Field false vectorisation.",
    "PNG to dense Unicode text art for Bun and the browser, with optional true-colour foreground/background cells.",
    "Unicode QR codes for Bun and TypeScript.",
    "MIKU (MIKU Is Not the Kernel; it's Userspace) is the userspace of 初音ミクOS, written mikuOS. A Unix-Based Kernel (Teto) + Userland OS 100% ran on the client side via WASM."
  ]) expect(source).toContain(descriptor);

  expect(source).not.toContain("githubRepo");
  expect(source).not.toContain("api.github.com");
  expect(source).not.toContain("loadApps");
});

test("app cards render the catalogue description between name and route", async () => {
  const source = await Bun.file(join(root, "site", "src", "ui", "Apps.tsx")).text();

  expect(source).toContain("app-card__description");
  expect(source).toContain("{app.description}");
});

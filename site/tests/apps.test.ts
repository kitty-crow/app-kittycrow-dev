import { expect, test } from "bun:test";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");

test("repository-backed app descriptions come from the shared GitHub API contract", async () => {
  const source = await Bun.file(join(root, "site", "src", "data", "apps.ts")).text();

  expect(source).toContain('import { githubRepo } from "@kittycrypto/website/github-api"');
  expect(source).toContain("await githubRepo(spec.repo.owner, spec.repo.repo)");

  for (const repo of [
    "sandsara-track-studio",
    "vectoriser",
    "unicode-art-studio",
    "unicode-qr-studio"
  ]) expect(source).toContain(`repo: "${repo}"`);
});

test("explicit app descriptors remain local when GitHub metadata is unavailable or intentionally omitted", async () => {
  const source = await Bun.file(join(root, "site", "src", "data", "apps.ts")).text();

  expect(source).toContain("FeLinE 1000X market tracking with persistent price history, deterministic OHLC candles, moving averages, RSI, Bollinger Bands and forecasts.");
  expect(source).toContain("A strongly typed TypeScript library for tarot draws, reader profiles, staged readings, handovers and structured OpenAI interpretation.");
  expect(source).toContain("MIKU (MIKU Is Not the Kernel; it's Userspace) is the userspace of 初音ミクOS, written mikuOS. A Unix-Based Kernel (Teto) + Userland OS 100% ran on the client side via WASM.");

  expect(source).not.toContain('repo: "felinebot"');
  expect(source).not.toContain('repo: "online-arcana"');
  expect(source).not.toContain('repo: "mikuOS"');
});

test("missing GitHub metadata degrades without invented copy", async () => {
  const source = await Bun.file(join(root, "site", "src", "data", "apps.ts")).text();

  expect(source).toContain('const noDescription = "No repository description provided."');
  expect(source).toContain("meta.description?.trim() || noDescription");
});

test("app cards render the resolved description between name and route", async () => {
  const source = await Bun.file(join(root, "site", "src", "ui", "Apps.tsx")).text();

  expect(source).toContain("app-card__description");
  expect(source).toContain("{app.description}");
});

import { expect, test } from "bun:test";
import { join } from "node:path";
import { loadApps } from "../src/data/apps.ts";

const root = join(import.meta.dir, "..", "..");

test("app catalogue is loaded from the server discovery endpoint", async () => {
  let requestedUrl = "";

  const apps = await loadApps(async (url) => {
    requestedUrl = url;

    return new Response(JSON.stringify({
      generatedAt: "2026-10-05T08:47:54.953Z",
      apps: [
        {
          name: "FeLinE Market Tracker",
          href: "/feline/",
          description: "ignored",
          source: "local"
        },
        {
          name: "vectoriser",
          href: "/vectoriser/",
          description: "also ignored",
          source: "github",
          repository: "kitty-crow/vectoriser"
        }
      ]
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  });

  expect(requestedUrl).toBe("https://srv.kittycrow.dev/apps");
  expect(apps).toEqual([
    {
      name: "FeLinE Market Tracker",
      href: "/feline/"
    },
    {
      name: "vectoriser",
      href: "/vectoriser/"
    }
  ]);
});

test("app catalogue rejects unsuccessful or malformed discovery responses", async () => {
  await expect(loadApps(async () => new Response("unavailable", {
    status: 503,
    statusText: "Service Unavailable"
  }))).rejects.toThrow("App discovery request failed: 503 Service Unavailable");

  await expect(loadApps(async () => new Response(JSON.stringify({ apps: [
    { name: "Broken", href: "not-an-app-route" }
  ] }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  }))).rejects.toThrow("App discovery returned an invalid app at index 0.");
});

test("app cards no longer render descriptions", async () => {
  const source = await Bun.file(join(root, "site", "src", "ui", "Apps.tsx")).text();
  const dataSource = await Bun.file(join(root, "site", "src", "data", "apps.ts")).text();

  expect(source).not.toContain("app-card__description");
  expect(source).not.toContain("app.description");
  expect(dataSource).not.toContain("description: string");
});

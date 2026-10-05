import { describe, expect, it } from "bun:test";
import { loadApps } from "../src/data/apps.ts";

const discoveredApps = [
  {
    name: "FeLinE Market Tracker",
    href: "/feline/",
    description: "Live bid and offer quoting workflow for the Fishy.gg marketplace.",
    source: "local",
  },
  {
    name: "Vectoriser",
    href: "/vectoriser/",
    description: "Convert raster images into SVG line art for plotting and laser workflows.",
    source: "github",
    repository: "kitty-crow/vectoriser",
  },
] as const;

const expectedApps = discoveredApps.map(({ name, href, description }) => ({
  name,
  href,
  description,
}));

describe("app catalogue", () => {
  it("loads the app catalogue from the discovery endpoint", async () => {
    const requests: Array<{ url: string; accept: string | null }> = [];
    const fetcher = async (input: string | URL | Request, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      requests.push({
        url: String(input),
        accept: headers.get("accept"),
      });
      return new Response(
        JSON.stringify({ generatedAt: "2026-10-05T12:00:00.000Z", apps: discoveredApps }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      );
    };

    await expect(loadApps(fetcher as typeof fetch)).resolves.toEqual(expectedApps);
    expect(requests).toEqual([
      {
        url: "https://srv.kittycrow.dev/apps",
        accept: "application/json",
      },
    ]);
  });

  it("rejects unsuccessful or malformed responses", async () => {
    const failingFetcher = async () => new Response("nope", { status: 503 });
    await expect(loadApps(failingFetcher as typeof fetch)).rejects.toThrow(
      "Failed to load apps (503).",
    );

    const malformedFetcher = async () =>
      new Response(JSON.stringify({ apps: [{ name: "Broken" }] }), { status: 200 });

    await expect(loadApps(malformedFetcher as typeof fetch)).rejects.toThrow(
      "Apps response contains malformed app entries.",
    );
  });
});

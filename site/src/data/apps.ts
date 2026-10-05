export type AppLink = Readonly<{
  name: string;
  href: string;
  description: string;
}>;

type AppsResponse = Readonly<{
  apps: readonly unknown[];
}>;

const APPS_ENDPOINT = "https://srv.kittycrow.dev/apps";

function isAppLink(value: unknown): value is AppLink {
  if (!value || typeof value !== "object") return false;

  const app = value as Record<string, unknown>;
  return (
    typeof app.name === "string" &&
    typeof app.href === "string" &&
    typeof app.description === "string"
  );
}

export async function loadApps(
  fetcher: typeof fetch = fetch,
): Promise<readonly AppLink[]> {
  const response = await fetcher(APPS_ENDPOINT, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to load apps (${response.status}).`);
  }

  const payload = (await response.json()) as AppsResponse;
  if (!payload || !Array.isArray(payload.apps)) {
    throw new Error("Apps response is malformed.");
  }

  const apps = payload.apps.filter(isAppLink);
  if (apps.length !== payload.apps.length) {
    throw new Error("Apps response contains malformed app entries.");
  }

  return apps.map(({ name, href, description }) => ({ name, href, description }));
}

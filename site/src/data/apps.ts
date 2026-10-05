export type AppLink = Readonly<{
  name: string;
  href: string;
}>;

export type AppFetcher = (url: string) => Promise<Response>;

const APP_DISCOVERY_ENDPOINT = "https://srv.kittycrow.dev/apps";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAppLink(value: unknown): value is AppLink {
  return isRecord(value)
    && typeof value.name === "string"
    && value.name.trim().length > 0
    && typeof value.href === "string"
    && value.href.startsWith("/");
}

export async function loadApps(
  fetcher: AppFetcher = (url) => fetch(url)
): Promise<readonly AppLink[]> {
  const response = await fetcher(APP_DISCOVERY_ENDPOINT);

  if (!response.ok) {
    throw new Error(`App discovery request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json() as unknown;

  if (!isRecord(payload) || !Array.isArray(payload.apps)) {
    throw new Error("App discovery returned an invalid payload.");
  }

  return payload.apps.map((value, index) => {
    if (!isAppLink(value)) {
      throw new Error(`App discovery returned an invalid app at index ${index}.`);
    }

    return {
      name: value.name,
      href: value.href
    };
  });
}

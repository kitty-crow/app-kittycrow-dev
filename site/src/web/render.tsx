import { render2Frag } from "@kittycrypto/website/static-ui";
import { Apps } from "../ui/Apps.tsx";
import { NotFound } from "../ui/NotFound.tsx";
import type { AppLink } from "../data/apps.ts";

export function renderApps(host: HTMLElement, apps: readonly AppLink[]): void {
  host.replaceChildren(render2Frag(<Apps apps={apps} />));
}

export function renderNotFound(host: HTMLElement): void {
  host.replaceChildren(render2Frag(<NotFound />));
}

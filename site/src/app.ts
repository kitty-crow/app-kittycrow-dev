import { loadApps } from "./data/apps.ts";
import { renderApps } from "./web/render.tsx";
import { initThemeBridge } from "./web/theme.ts";
import { maskHtmlExtension } from "./web/url.ts";
import { mountAppWindow } from "./web/window.ts";

maskHtmlExtension();
initThemeBridge();

function getAppsFrame(): HTMLElement {
  const frame = document.getElementById("apps-window");
  if (!(frame instanceof HTMLElement)) throw new Error("Apps window host is missing.");
  return frame;
}

const frame = getAppsFrame();

async function bootstrap(): Promise<void> {
  const apps = await loadApps();
  renderApps(frame, apps);
  mountAppWindow(frame, "apps-index", "Apps");
}

void bootstrap().catch((error: unknown) => {
  console.error("Failed to load application catalogue:", error);
  frame.textContent = "Unable to load applications.";
});

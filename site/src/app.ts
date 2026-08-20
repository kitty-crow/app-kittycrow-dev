import { loadApps } from "./data/apps.ts";
import { renderApps } from "./web/render.tsx";
import { initThemeBridge } from "./web/theme.ts";
import { maskHtmlExtension } from "./web/url.ts";
import { mountAppWindow } from "./web/window.ts";

maskHtmlExtension();
initThemeBridge();

const frame = document.getElementById("apps-window");
if (!(frame instanceof HTMLElement)) throw new Error("Apps window host is missing.");

const apps = await loadApps();
renderApps(frame, apps);
mountAppWindow(frame, "apps-index", "Apps");

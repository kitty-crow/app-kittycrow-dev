import { renderNotFound } from "./web/render.tsx";
import { initThemeBridge } from "./web/theme.ts";
import { maskHtmlExtension } from "./web/url.ts";
import { mountAppWindow } from "./web/window.ts";

maskHtmlExtension();
initThemeBridge();

const frame = document.getElementById("not-found-window");
if (!(frame instanceof HTMLElement)) throw new Error("404 window host is missing.");

renderNotFound(frame);
mountAppWindow(frame, "apps-index-404", "404");

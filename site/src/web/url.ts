export function maskHtmlExtension(): void {
  const path = window.location.pathname;
  if (!path.toLowerCase().endsWith(".html")) return;

  let clean = path.slice(0, -5);
  if (clean.endsWith("/index")) clean = clean.slice(0, -5) || "/";
  if (clean === "/index") clean = "/";

  window.history.replaceState(
    window.history.state,
    "",
    `${clean || "/"}${window.location.search}${window.location.hash}`
  );
}

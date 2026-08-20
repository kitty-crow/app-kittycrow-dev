import { expect, test } from "bun:test";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");

test("v1.0.6 keeps the app and deployed versions aligned", async () => {
  const pkg = await Bun.file(join(root, "package.json")).json() as { readonly version: string };
  const version = await Bun.file(join(root, "version.json")).json() as { readonly version: string };

  expect(pkg.version).toBe("1.0.6");
  expect(version.version).toBe("1.0.6");
});

test("window content root has a responsive app-owned inset", async () => {
  const css = await Bun.file(join(root, "site", "styles", "layout.css")).text();

  expect(css).toContain("--app-window-padding: clamp(1.25rem, 4vw, 2rem)");
  expect(css).toContain('.app-window > .window-body > [data-window-content-root="true"]');
  expect(css).toContain("padding: var(--app-window-padding) !important");
  expect(css).toContain(".app-window {\n  width: 100%;\n  max-width: 100%;\n  padding: 0;");
});

test("floating Ko-fi is placed at the lower-left", async () => {
  const css = await Bun.file(join(root, "site", "styles", "layout.css")).text();

  expect(css).toContain(".floatingchat-container-wrap");
  expect(css).toContain("top: auto !important");
  expect(css).toContain("right: auto !important");
  expect(css).toContain("bottom: calc(1rem + var(--safe-bottom)) !important");
  expect(css).toContain("left: max(1rem, env(safe-area-inset-left)) !important");
});

test("header brand and actions remain in one right-aligned row", async () => {
  const css = await Bun.file(join(root, "site", "styles", "layout.css")).text();

  expect(css).toContain("margin-inline-start: auto");
  expect(css).toContain("flex-wrap: nowrap");
  expect(css.match(/justify-content: flex-end/g)?.length ?? 0).toBeGreaterThanOrEqual(2);
  expect(css).not.toContain("flex-direction: column;\n      gap: 0.6rem");
  expect(css).not.toContain("justify-content: flex-start");
});

test("app.kittycrow.dev is not forced to uppercase", async () => {
  const css = await Bun.file(join(root, "site", "styles", "layout.css")).text();
  const html = await Bun.file(join(root, "site", "index.html")).text();

  expect(html).toContain("app.kittycrow.dev");
  expect(css).not.toContain("text-transform: uppercase");
});

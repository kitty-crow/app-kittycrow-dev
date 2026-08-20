import { expect, test } from "bun:test";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");

test("v1.0.2 keeps the app and deployed versions aligned", async () => {
  const pkg = await Bun.file(join(root, "package.json")).json() as { readonly version: string };
  const version = await Bun.file(join(root, "version.json")).json() as { readonly version: string };

  expect(pkg.version).toBe("1.0.2");
  expect(version.version).toBe("1.0.2");
});

test("window content has a responsive app-owned inset", async () => {
  const css = await Bun.file(join(root, "site", "styles", "layout.css")).text();

  expect(css).toContain("--app-window-padding: clamp(1.25rem, 4vw, 2rem)");
  expect(css).toContain("padding: var(--app-window-padding)");
});

test("floating Ko-fi is placed at the lower-left", async () => {
  const css = await Bun.file(join(root, "site", "styles", "layout.css")).text();

  expect(css).toContain(".floatingchat-container-wrap");
  expect(css).toContain("top: auto !important");
  expect(css).toContain("right: auto !important");
  expect(css).toContain("bottom: calc(1rem + var(--safe-bottom)) !important");
  expect(css).toContain("left: max(1rem, env(safe-area-inset-left)) !important");
});

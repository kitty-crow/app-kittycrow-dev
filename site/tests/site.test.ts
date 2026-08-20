import { expect, test } from "bun:test";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");
const dist = join(root, "site", "dist");

const pagesPin = "b0e7a32e71d2fe1092bb78773f816139f4f10cbb";
const websitePin = "2331a54893fed5ec7c0bdbd3d8d1c9fef51794f5";

const tree = async (path: string): Promise<string> => {
  const proc = Bun.spawn(["git", "ls-tree", "HEAD", path], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe"
  });
  const output = await new Response(proc.stdout).text();
  expect(await proc.exited).toBe(0);
  return output;
};

test("pins shared Pages and website sources", async () => {
  const modules = await Bun.file(join(root, ".gitmodules")).text();
  expect(modules).toContain("github-pages-template.git");
  expect(modules).toContain("kittyCrypto-gg/website.git");
  expect(await tree("vendor/pages")).toContain(pagesPin);
  expect(await tree("vendor/website")).toContain(websitePin);
});

test("builds the app index and 404 shell", async () => {
  for (const path of [
    "index.html",
    "404.html",
    "version.json",
    "assets/app.js",
    "assets/not-found.js",
    "assets/pages/boot.js",
    "assets/pages/runtime.js",
    "assets/pages/styles.css",
    "assets/website/styles/core/tokens.css",
    "assets/website/styles/core/theme.light.css",
    "assets/website/styles/core/theme.dark.css",
    "assets/website/styles/modules/window.css",
    "assets/website/images/miku.svg",
    "styles/styles.css",
    "styles/layout.css",
    "styles/apps.css",
    "styles/not-found.css"
  ]) {
    expect(await Bun.file(join(dist, path)).exists()).toBe(true);
  }
});

test("keeps document glue, metadata and footer contracts", async () => {
  const home = await Bun.file(join(dist, "index.html")).text();
  const notFound = await Bun.file(join(dist, "404.html")).text();

  for (const html of [home, notFound]) {
    expect(html).toContain("maximum-scale=1");
    expect(html).toContain("user-scalable=no");
    expect(html).toContain("data-theme-toggle");
    expect(html).toContain("data-version");
    expect(html).toContain("kittycrow.dev");
    expect(html).toContain("github.com/kitty-crow/app-kittycrow-dev");
  }

  expect(home).toContain('id="apps-window"');
  expect(notFound).toContain('id="not-found-window"');
});

test("resolves site assets from either deployment mount", async () => {
  const home = await Bun.file(join(dist, "index.html")).text();
  const notFound = await Bun.file(join(dist, "404.html")).text();

  for (const html of [home, notFound]) {
    expect(html).toContain('const repoBase = "/app-kittycrow-dev/"');
    expect(html.indexOf("const repoBase")).toBeLessThan(html.indexOf("assets/pages/boot.js"));
    expect(html).not.toContain('href="/assets/');
    expect(html).not.toContain('src="/assets/');
    expect(html).not.toContain('href="/styles/');
  }

  expect(home).toContain('src="assets/app.js"');
  expect(notFound).toContain('src="assets/not-found.js"');

  const windowSource = await Bun.file(join(root, "site", "src", "web", "window.ts")).text();
  expect(windowSource).toContain("document.baseURI");
  expect(windowSource).not.toContain('const launcher = "/');
});

test("builds every nginx-backed app link into the index", async () => {
  const app = await Bun.file(join(dist, "assets", "app.js")).text();
  expect(app).toContain("https://app.kittycrow.dev/");
  expect(app).not.toContain("api.github.com");
  for (const route of [
    "/feline/",
    "/tarot/",
    "/sandsara-track-studio/",
    "/vectoriser/",
    "/unicode-art-studio/",
    "/unicode-qr-studio/",
    "/mikuOS/"
  ]) expect(app).toContain(route);
});

test("404 offers routes back to the mounted index and main-site blog", async () => {
  const source = await Bun.file(join(root, "site", "src", "ui", "NotFound.tsx")).text();
  const shell = await Bun.file(join(root, "site", "404.html")).text();
  const bundle = await Bun.file(join(dist, "assets", "not-found.js")).text();

  expect(source).toContain('href="./"');
  expect(bundle).toContain("Return to Apps");
  expect(bundle).toContain("Return to Blog");
  expect(bundle).toContain("https://kittycrow.dev/");
  expect(bundle).not.toContain("https://kittycrow.dev/blog");
  expect(shell).not.toContain("https://kittycrow.dev/blog");
});

test("uses the static TSX helper without a React application runtime", async () => {
  const renderer = await Bun.file(join(root, "site", "src", "web", "render.tsx")).text();
  const sources = await Promise.all([
    "app.ts",
    "not-found.ts",
    "web/render.tsx",
    "ui/Apps.tsx",
    "ui/NotFound.tsx"
  ].map(path => Bun.file(join(root, "site", "src", path)).text()));
  const joined = sources.join("\n");

  expect(renderer).toContain("@kittycrypto/website/static-ui");
  expect(joined).not.toContain("react-dom/client");
  expect(joined).not.toContain("createRoot(");
  expect(joined).not.toContain("hydrateRoot(");
  expect(joined).not.toContain("useState(");
  expect(joined).not.toContain("useEffect(");
});

test("keeps package and deployed versions aligned", async () => {
  const pkg = await Bun.file(join(root, "package.json")).json() as { readonly version: string };
  const source = await Bun.file(join(root, "version.json")).json() as { readonly version: string };
  const built = await Bun.file(join(dist, "version.json")).json() as { readonly version: string };

  expect(source.version).toBe(pkg.version);
  expect(built.version).toBe(pkg.version);
});

import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

import { build as buildPages, load } from "../vendor/pages/src/index.ts";

const root = import.meta.dir;
const repo = join(root, "..");
const browser = join(root, "src");
const styles = join(root, "styles");
const stage = join(root, ".pages-src");
const out = join(root, "dist");
const assets = join(stage, "assets");
const websiteAssets = join(assets, "website");
const vendorWebsite = join(repo, "vendor", "website");

await rm(stage, { recursive: true, force: true });
await rm(out, { recursive: true, force: true });
await mkdir(assets, { recursive: true });

try {
  const bundle = await Bun.build({
    entrypoints: [join(browser, "app.ts"), join(browser, "not-found.ts")],
    outdir: assets,
    target: "browser",
    format: "esm",
    minify: true,
    sourcemap: "none",
    naming: "[name].js"
  });

  if (!bundle.success) {
    for (const log of bundle.logs) console.error(log);
    throw new Error("Site bundle failed.");
  }

  await cp(styles, join(stage, "styles"), { recursive: true });
  await cp(join(vendorWebsite, "styles"), join(websiteAssets, "styles"), { recursive: true });
  await mkdir(join(websiteAssets, "images"), { recursive: true });
  await cp(join(vendorWebsite, "images", "miku.svg"), join(websiteAssets, "images", "miku.svg"));

  for (const file of ["index.html", "404.html"]) {
    await cp(join(root, file), join(stage, file));
  }

  const config = await load(join(repo, "pages.config.ts"));
  await buildPages(config);
  console.log(`Built site: ${out}`);
} finally {
  await rm(stage, { recursive: true, force: true });
}

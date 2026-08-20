import { definePages } from "./vendor/pages/src/index.ts";

export default definePages({
  source: "site/.pages-src",
  out: "site/dist",
  assets: "assets/pages",
  copy: [
    { from: "version.json", to: "version.json" }
  ],
  pages: [
    { from: "index.html", route: "/" },
    { from: "404.html", route: "/404.html" }
  ],
  css: {
    files: ["kofi.css"]
  },
  runtime: {
    base: "https://app.kittycrow.dev/",
    theme: {
      key: "app-index.theme",
      colours: {
        light: "#b2ebf2",
        dark: "#004d40"
      },
      toggle: "[data-theme-toggle]",
      label: "[data-theme-label]",
      event: "app-index:theme"
    },
    kofi: {
      user: "kittycrow",
      header: ".header",
      footer: ".footer__links",
      footerText: "Buy me a coffee",
      separator: " · ",
      desktopText: "Buy me a coffee?",
      background: "#5bc0de",
      text: "#323842",
      wideAt: 721
    },
    version: {
      file: "version.json",
      selector: "[data-version]",
      prefix: "v",
      fallback: "v?"
    }
  }
});

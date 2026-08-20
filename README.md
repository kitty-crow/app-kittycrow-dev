# app.kittycrow.dev

Static index for the applications exposed through `https://app.kittycrow.dev/`.

The site deliberately keeps the same source boundaries used by Unicode QR Studio:

- `site/*.html` — page glue and document metadata
- `site/src/` — typed browser behaviour and TSX fragments
- `site/styles/` — CSS owned only by this project
- `vendor/pages/` — pinned GitHub Pages build/runtime
- `vendor/website/` — pinned kittycrow.dev UI source, static TSX helpers and window implementation

The app catalogue is rendered with `@kittycrypto/website/static-ui`; there is no React root, hydration or hook-driven application state. The real kittycrow.dev window controller is bundled from the pinned website source.

## Build

```bash
bun install
bun run site:ci
```

Generated output lives in `site/dist/` and is not committed.

## Canonical reverse proxy

The deployed Pages project sits behind `app.kittycrow.dev`. Put the App Index and 404 fallback section first inside the HTTPS `server` block, before the individual application locations.

Nginx still selects `/feline/`, `/tarot/`, `/unicode-qr-studio/`, and the other application prefixes because they are longer prefix matches than `/`.

```nginx
# =========================
# App Index -> GitHub Pages
# =========================

location = / {
  proxy_pass https://kitty-crow.github.io/app-kittycrow-dev/;

  proxy_http_version 1.1;
  proxy_set_header Host kitty-crow.github.io;
  proxy_ssl_server_name on;
  proxy_ssl_name kitty-crow.github.io;

  proxy_redirect https://kitty-crow.github.io/app-kittycrow-dev/ https://app.kittycrow.dev/;

  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto https;
}

# =========================
# App Index 404 / fallback
# =========================

location / {
  proxy_pass https://kitty-crow.github.io/app-kittycrow-dev/;

  proxy_http_version 1.1;
  proxy_set_header Host kitty-crow.github.io;
  proxy_ssl_server_name on;
  proxy_ssl_name kitty-crow.github.io;

  proxy_redirect https://kitty-crow.github.io/app-kittycrow-dev/ https://app.kittycrow.dev/;

  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto https;
}

# =========================
# FeLinE Market Tracker -> 8790
# =========================
# ...existing application locations follow here...
```

Unknown paths sent through the fallback retain GitHub Pages' 404 status and render this project's `404.html`.

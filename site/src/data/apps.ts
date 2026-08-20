export type AppLink = Readonly<{
  name: string;
  href: string;
  description: string;
}>;

export const apps: readonly AppLink[] = [
  {
    name: "FeLinE Market Tracker",
    href: "/feline/",
    description: "FeLinE 1000X market tracking with persistent price history, deterministic OHLC candles, moving averages, RSI, Bollinger Bands and forecasts."
  },
  {
    name: "Tarot",
    href: "/tarot/",
    description: "A strongly typed TypeScript library for tarot draws, reader profiles, staged readings, handovers and structured OpenAI interpretation."
  },
  {
    name: "Sandsara Track Studio",
    href: "/sandsara-track-studio/",
    description: "A fully client-side web studio and VS Code extension for decoding, previewing and generating binary tracks for Sandsara kinetic sand tables."
  },
  {
    name: "Vectoriser",
    href: "/vectoriser/",
    description: "Converts PNG to SVG with actual vector paths, no Raster-on-a-Vector-Field false vectorisation."
  },
  {
    name: "Unicode Art Studio",
    href: "/unicode-art-studio/",
    description: "PNG to dense Unicode text art for Bun and the browser, with optional true-colour foreground/background cells."
  },
  {
    name: "Unicode QR Studio",
    href: "/unicode-qr-studio/",
    description: "Unicode QR codes for Bun and TypeScript."
  },
  {
    name: "mikuOS",
    href: "/mikuOS/",
    description: "MIKU (MIKU Is Not the Kernel; it's Userspace) is the userspace of 初音ミクOS, written mikuOS. A Unix-Based Kernel (Teto) + Userland OS 100% ran on the client side via WASM."
  }
] as const;

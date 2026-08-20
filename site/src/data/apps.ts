export type AppLink = Readonly<{
  name: string;
  href: string;
  description: string;
}>;

export const apps: readonly AppLink[] = [
  {
    name: "FeLinE Market Tracker",
    href: "/feline/",
    description: "Responsive $NYA market tracker with candle cadence, MA, RSI, Bollinger and deterministic forecast controls."
  },
  {
    name: "Tarot",
    href: "/tarot/",
    description: "An atmospheric bilingual tarot-reading application with eight distinct readers, a complete 78-card deck and encrypted local reading storage."
  },
  {
    name: "Sandsara Track Studio",
    href: "/sandsara-track-studio/",
    description: "A fully client-side web studio for decoding, previewing and generating binary tracks used by Sandsara kinetic sand tables."
  },
  {
    name: "Vectoriser",
    href: "/vectoriser/",
    description: "Strict TypeScript PNG-to-SVG vectorisation for Bun and the browser, using SVG paths without embedding the source raster."
  },
  {
    name: "Unicode Art Studio",
    href: "/unicode-art-studio/",
    description: "PNG to dense Unicode text art for Bun and the browser, with optional true-colour foreground/background cells."
  },
  {
    name: "Unicode QR Studio",
    href: "/unicode-qr-studio/",
    description: "A strongly typed Bun and TypeScript utility that renders genuine QR matrices as dense text using Unicode Braille Patterns characters."
  },
  {
    name: "mikuOS",
    href: "/mikuOS/",
    description: "MIKU — MIKU Is Not the Kernel; it's Userspace — is the userspace of 初音ミクOS, written mikuOS in Latin script."
  }
] as const;

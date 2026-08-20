export type AppLink = Readonly<{
  name: string;
  href: string;
}>;

export const apps: readonly AppLink[] = [
  { name: "FeLinE Market Tracker", href: "/feline/" },
  { name: "Tarot", href: "/tarot/" },
  { name: "Sandsara Track Studio", href: "/sandsara-track-studio/" },
  { name: "Vectoriser", href: "/vectoriser/" },
  { name: "Unicode Art Studio", href: "/unicode-art-studio/" },
  { name: "Unicode QR Studio", href: "/unicode-qr-studio/" },
  { name: "mikuOS", href: "/mikuOS/" }
] as const;

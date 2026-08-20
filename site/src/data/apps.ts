import { githubRepo } from "@kittycrypto/website/github-api";

export type AppLink = Readonly<{
  name: string;
  href: string;
  description: string;
}>;

type RepoRef = Readonly<{
  owner: string;
  repo: string;
}>;

type AppSpec = Readonly<{
  name: string;
  href: string;
  repo?: RepoRef;
  description?: string;
}>;

const noDescription = "No repository description provided.";

const specs: readonly AppSpec[] = [
  { name: "FeLinE Market Tracker", href: "/feline/", repo: { owner: "kitty-crow", repo: "felinebot" } },
  {
    name: "Tarot",
    href: "/tarot/",
    description: "A strongly typed TypeScript library for tarot draws, reader profiles, staged readings, handovers and structured OpenAI interpretation."
  },
  { name: "Sandsara Track Studio", href: "/sandsara-track-studio/", repo: { owner: "kitty-crow", repo: "sandsara-track-studio" } },
  { name: "Vectoriser", href: "/vectoriser/", repo: { owner: "kitty-crow", repo: "vectoriser" } },
  { name: "Unicode Art Studio", href: "/unicode-art-studio/", repo: { owner: "kitty-crow", repo: "unicode-art-studio" } },
  { name: "Unicode QR Studio", href: "/unicode-qr-studio/", repo: { owner: "kitty-crow", repo: "unicode-qr-studio" } },
  { name: "mikuOS", href: "/mikuOS/", repo: { owner: "kitty-crow", repo: "mikuOS" } }
] as const;

async function resolve(spec: AppSpec): Promise<AppLink> {
  if (spec.description) {
    return { name: spec.name, href: spec.href, description: spec.description };
  }

  if (!spec.repo) {
    return { name: spec.name, href: spec.href, description: noDescription };
  }

  try {
    const meta = await githubRepo(spec.repo.owner, spec.repo.repo);
    const description = meta.description?.trim() || noDescription;
    return { name: spec.name, href: spec.href, description };
  } catch {
    return { name: spec.name, href: spec.href, description: noDescription };
  }
}

/** Resolve repository descriptions at page load so GitHub remains the source of truth. */
export async function loadApps(): Promise<readonly AppLink[]> {
  return Promise.all(specs.map(resolve));
}

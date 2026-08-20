import type { AppLink } from "../data/apps.ts";

type Props = Readonly<{
  apps: readonly AppLink[];
}>;

const canonical = (path: string): string => new URL(path.replace(/^\/+/, ""), "https://app.kittycrow.dev/").href;

export function Apps({ apps }: Props) {
  return (
    <div className="apps-view">
      <p className="apps-view__intro">
        An index of the tools and applications running under app.kittycrow.dev.
      </p>
      <nav className="apps-grid" aria-label="Applications">
        {apps.map((app) => (
          <a className="app-card" href={canonical(app.href)} key={app.href}>
            <span className="app-card__name">{app.name}</span>
            <span className="app-card__route">app.kittycrow.dev{app.href}</span>
            <span className="app-card__arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

import type { AppLink } from "../data/apps.ts";

type Props = Readonly<{
  apps: readonly AppLink[];
}>;

const canonical = (path: string): string =>
  new URL(path.replace(/^\/+/, ""), "https://app.kittycrow.dev/").href;

const rootStyles = {
  padding: "10px 12px 12px",
} as const;

const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
} as const;

const linkStyles = {
  display: "block",
  fontWeight: "700",
  color: "inherit",
  textDecoration: "none",
  padding: "8px 6px",
} as const;

const descriptionStyles = {
  padding: "8px 6px",
  fontSize: "12px",
  lineHeight: "1.4",
} as const;

export function Apps({ apps }: Props) {
  return (
    <div style={rootStyles}>
      <table style={tableStyles}>
        <tbody>
          {apps.map((app) => (
            <tr key={app.href}>
              <td style={{ width: "32%", borderBottom: "1px solid var(--kc-app-border)" }}>
                <a href={canonical(app.href)} style={linkStyles}>
                  {app.name}
                </a>
              </td>
              <td style={{ borderBottom: "1px solid var(--kc-app-border)", ...descriptionStyles }}>
                {app.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

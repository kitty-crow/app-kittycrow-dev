type Theme = "light" | "dark";

const cls = "dark-mode";
const eventName = "app-index:theme";

function apply(theme: Theme): void {
  document.documentElement.classList.toggle(cls, theme === "dark");
}

function current(): Theme {
  return document.documentElement.dataset["theme"] === "dark" ? "dark" : "light";
}

export function initThemeBridge(): void {
  apply(current());

  window.addEventListener(eventName, (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    if (event.detail !== "light" && event.detail !== "dark") return;
    apply(event.detail);
  });

  new MutationObserver(() => apply(current())).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
}

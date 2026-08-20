export function NotFound() {
  return (
    <div className="not-found-view">
      <p className="not-found-view__code" aria-hidden="true">404</p>
      <h1 className="not-found-view__title">That page is not here.</h1>
      <p className="not-found-view__copy">
        The address does not point to an app or page currently exposed through this index.
      </p>
      <div className="not-found-actions">
        <a href="/">Return to Apps</a>
        <a href="https://kittycrow.dev/">Return to Blog</a>
      </div>
    </div>
  );
}

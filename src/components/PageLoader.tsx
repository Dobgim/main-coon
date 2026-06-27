/** Lightweight route-transition fallback shown while a page chunk loads. */
export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-forest-200 border-t-forest"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm font-medium text-muted">Fetching the cats…</p>
    </div>
  );
}

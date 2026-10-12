/**
 * Single source of truth for resolving the runtime/build-time base path
 * from the `WEBAPP_BASE_URL` environment variable.
 *
 * Consumed by:
 *   - vite.config.ts         → sets Vite's `base` (e.g. "/admin/")
 *   - react-router.config.ts → sets React Router's `basename` (e.g. "/admin/")
 *
 * Both configs derive their value from `WEBAPP_BASE_URL` so emitted asset
 * URLs (built JS/CSS, favicon, runtime manifest) and React Router's
 * basename agree on the same prefix.
 *
 * Note: React Router's `basename` accepts both "/admin" and "/admin/",
 * and its `stripBasename` implementation explicitly handles the trailing
 * slash. Using "/admin/" in both places also satisfies React Router's
 * dev-server check that "basename must begin with base" (because
 * "/admin/" starts with "/admin/").
 *
 * Constraints:
 *   - The raw value may be empty (or unset) → site root.
 *   - Accepts loose input (`admin`, `/admin`, `admin/`, `/admin/`).
 *   - Only single-segment paths are supported (e.g. `/admin`). Multi-segment
 *     values throw so misconfigurations fail at dev/build time instead of
 *     silently producing 404s in production.
 */

/**
 * Normalize `WEBAPP_BASE_URL` into the form both Vite's `base` and React
 * Router's `basename` agree on — `"/"` for the site root, otherwise a
 * single-segment path with BOTH leading and trailing slashes
 * (e.g. `"/admin/"`).
 *
 *   undefined / ""   → "/"
 *   "/"              → "/"
 *   "/admin"         → "/admin/"
 *   "admin/"         → "/admin/"
 *   "/admin/"        → "/admin/"
 */
export function normalizeBaseUrl(raw: string | undefined): string {
  if (raw === undefined || raw === "") return "/";
  const collapsed = `/${raw.trim().replace(/^\/+|\/+$/g, "")}/`;
  if (collapsed.slice(1, -1).includes("/")) {
    throw new Error(
      `Invalid WEBAPP_BASE_URL: ${JSON.stringify(raw)}. ` +
        `Only single-segment paths are supported (e.g. "/admin"). ` +
        `Got a path with multiple segments.`,
    );
  }
  return collapsed;
}

/**
 * @deprecated Use `normalizeBaseUrl` — keeping the alias so existing
 * callers can migrate. React Router accepts the trailing-slash form.
 */
export const normalizeBasename = normalizeBaseUrl;

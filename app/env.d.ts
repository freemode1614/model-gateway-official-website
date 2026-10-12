/// <reference types="vite/client" />

/**
 * Client-visible environment variables use the `WEBAPP_` prefix (configured
 * via `envOptions.envPrefix` in `vite.config.ts`) and are exposed through
 * `import.meta.env`. See `.env.example` for the current set.
 *
 * The same variables are also read by `vite.config.ts` at dev/build time via
 * `loadEnv()`, and by `react-router.config.ts` directly from `process.env`,
 * so a single source of truth drives the generated API client, the running
 * app, and the router's basename.
 */
interface ImportMetaEnv {
  /** Base URL of the Petstore API used by the generated client (app/api/petstore.ts) */
  readonly WEBAPP_PETSTORE_BASE_URL?: string;
  /** Hosted OpenAPI spec URL used by apiCodeGenPlugin (vite.config.ts) */
  readonly WEBAPP_PETSTORE_SPEC_URL?: string;
  /**
   * Base path the SPA is hosted under (e.g. `/admin`). Empty/undefined means
   * the app is served from the site root. Read by `react-router.config.ts` at
   * build/dev time and passed to React Router as the `basename`.
   */
  readonly WEBAPP_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

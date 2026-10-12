import type { Config } from "@react-router/dev/config";

import { normalizeBaseUrl } from "./config/base-url";

const basename = normalizeBaseUrl(process.env.WEBAPP_BASE_URL);

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`.
  ssr: false,
  prerender: false,
  // The base path the SPA is hosted under. Driven by the WEBAPP_BASE_URL
  // env var (see .env.example). Empty/undefined means "site root". Must
  // match Vite's `base` (set in vite.config.ts from the same env var) so
  // asset URLs and React Router's basename agree on the prefix.
  basename,
} satisfies Config;

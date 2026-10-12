import { apiCodeGenPlugin } from "@moccona/apicodegen/vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

import { normalizeBaseUrl } from "./config/base-url";

export default defineConfig(({ mode }) => {
  // WEBAPP_-prefixed variables from .env / the process environment
  // (see .env.example). The same variables are exposed to the client
  // bundle below via `envOptions.envPrefix`.
  const env = loadEnv(mode, process.cwd(), "WEBAPP_");

  // Generated API client config (see app/api/petstore.ts).
  const petstoreApi = {
    name: "petstore",
    spec:
      env.WEBAPP_PETSTORE_SPEC_URL ??
      "https://petstore.swagger.io/v2/swagger.json",
    output: "app/api/petstore.ts",
    adaptor: "fetch" as const,
    baseURL: env.WEBAPP_PETSTORE_BASE_URL ?? "https://petstore.swagger.io/v2",
    typeCheck: false,
  };

  // Align Vite's `base` with React Router's `basename` so emitted asset
  // URLs (`/assets/…`, favicon, runtime manifest) carry the same prefix
  // the SPA is served under. The RR plugin enforces that `basename`
  // starts with this `base`, so they must be derived from the same value.
  const base = normalizeBaseUrl(process.env.WEBAPP_BASE_URL);

  return {
    plugins: [tailwindcss(), apiCodeGenPlugin([petstoreApi]), reactRouter()],
    resolve: {
      tsconfigPaths: true,
    },
    base,
    // Expose WEBAPP_-prefixed variables to the client bundle as
    // import.meta.env.WEBAPP_* (typed in app/env.d.ts).
    envOptions: {
      envPrefix: "WEBAPP_",
    },
  };
});

import { Page } from "../components/page";
import type { Route } from "./+types/docs";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Docs — React fs-routes SPA" },
    {
      name: "description",
      content:
        "Starter guide: route conventions, error handling, theming, env vars, components, testing",
    },
  ];
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">
      {children}
    </code>
  );
}

export default function Docs() {
  return (
    <Page
      title="Documentation"
      description="How this starter works — route conventions, error handling, data, theming, environment variables, components, and testing."
      backTo={{ to: "/", label: "Back to Home" }}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Route conventions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Routes are file-based via <Code>flatRoutes()</Code> from{" "}
            <Code>@react-router/fs-routes</Code> (app/routes.ts). This starter
            keeps one live page per convention — the rest are documented here
            and in AGENTS.md with example file names.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              <Code>_index.tsx</Code> — index route (maps to <Code>/</Code>)
            </li>
            <li>
              <Code>blog.$slug.tsx</Code> — dynamic param (maps to{" "}
              <Code>/blog/:slug</Code>)
            </li>
            <li>
              <Code>dashboard.tsx</Code> + <Code>dashboard.settings.tsx</Code> —
              nested routes (the parent renders <Code>&lt;Outlet /&gt;</Code> as
              a layout)
            </li>
            <li>
              <Code>products.($category).tsx</Code> — optional dynamic param (
              <Code>/products</Code> or <Code>/products/:category</Code>)
            </li>
            <li>
              <Code>admin._pathless.tsx</Code> (example name) — pathless layout:
              a layout wrapper that adds no URL segment
            </li>
            <li>
              <Code>files.$.tsx</Code> (example name) — splat segment (
              <Code>/files/*</Code>, any depth)
            </li>
            <li>
              <Code>[api-v2].tsx</Code> (example name) — square brackets escape
              reserved characters, producing the literal URL{" "}
              <Code>/api-v2</Code>
            </li>
            <li>
              <Code>$.tsx</Code> — root-level catch-all: any URL that matches no
              other route renders the 404 page
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error handling
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              <Code>ErrorBoundary</Code> is a <strong>named export</strong> of a
              route module (not a separate file). The starter’s root boundary
              lives in <Code>app/root.tsx</Code> and renders <em>inside</em> the
              root <Code>Layout</Code>, so the document shell (title, styles,
              scripts) survives an error.
            </li>
            <li>
              <Code>/boom</Code> is a route that always throws — visit it to see
              the boundary catch the error (with stack in dev mode).
            </li>
            <li>
              In SPA mode, unknown URLs render the catch-all 404 page instead of
              a 404 route error. If you later enable SSR, add{" "}
              <Code>loader → data({}, 404)</Code> to <Code>$.tsx</Code> so
              crawlers get a real status.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Data & APIs
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              SPA mode forbids server <Code>loader</Code>s on non-root routes —
              fetch data in components (see <Code>/api-demo</Code>) or use{" "}
              <Code>clientLoader</Code> / <Code>clientAction</Code> for
              route-level data.
            </li>
            <li>
              <Code>app/api/petstore.ts</Code> is generated from a hosted
              OpenAPI spec — it is committed and regenerated on every dev/build.
              Never edit it by hand.
            </li>
            <li>
              Point the plugin at your own API via{" "}
              <Code>WEBAPP_PETSTORE_SPEC_URL</Code> /{" "}
              <Code>WEBAPP_PETSTORE_BASE_URL</Code> (see .env.example).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Theming
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              Tailwind v4 with a self-hosted Inter font (
              <Code>@fontsource-variable/inter</Code>, no network dependency).
            </li>
            <li>
              Class-based dark mode (<Code>@custom-variant dark</Code> in
              app.css). The initial class is set before paint by an inline
              script in <Code>app/root.tsx</Code> (system preference, with a
              localStorage override), and <Code>&lt;ThemeToggle /&gt;</Code>{" "}
              (top-right) flips it.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Environment variables
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              Client-visible variables use the <Code>WEBAPP_</Code> prefix (
              <Code>envOptions.envPrefix</Code> in vite.config.ts) and reach the
              app as <Code>import.meta.env.WEBAPP_*</Code> — typed in{" "}
              <Code>app/env.d.ts</Code>, sampled in <Code>.env.example</Code>.
            </li>
            <li>
              vite.config.ts reads the same variables with{" "}
              <Code>loadEnv()</Code>, so one source of truth drives both the
              generated API client and the running app.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Components
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Shared, dark-mode-aware building blocks in{" "}
            <Code>app/components/</Code>: <Code>Page</Code> (page shell),{" "}
            <Code>Card</Code>, <Code>Button</Code> (+{" "}
            <Code>buttonClasses()</Code> for styling <Code>&lt;Link&gt;</Code>),{" "}
            <Code>Input</Code>, <Code>Badge</Code>, <Code>Spinner</Code>,{" "}
            <Code>ThemeToggle</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Testing
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>
              <Code>pnpm test</Code> runs Vitest + React Testing Library in
              jsdom. Tests live in <Code>app/tests/</Code>.
            </li>
            <li>
              Never put <Code>*.test.tsx</Code> under <Code>app/routes/</Code> —
              fs-routes would register them as routes.
            </li>
          </ul>
        </section>
      </div>
    </Page>
  );
}

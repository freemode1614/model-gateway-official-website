import { Link } from "react-router";
import { Page } from "../components/page";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/_index";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "React Router v8 + fs-routes SPA" },
    {
      name: "description",
      content:
        "A production-ready SPA starter built on React Router v8 + fs-routes",
    },
  ];
}

const capabilities = [
  {
    title: "Routing",
    body: "File-based (fs-routes) with nested layouts, index routes, dynamic & optional params, and a 404 catch-all. Conventions on the /docs page.",
  },
  {
    title: "Error handling",
    body: "Root ErrorBoundary in app/root.tsx — /boom is a route that always throws so you can see it catch the error.",
  },
  {
    title: "API client",
    body: "Typed client generated from a hosted OpenAPI spec by @moccona/apicodegen’s Vite plugin — pnpm api:gen.",
  },
  {
    title: "Shared components",
    body: "Page, Card, Button, Input, Badge, Spinner in app/components/, used across every page.",
  },
  {
    title: "Theming",
    body: "Tailwind v4, self-hosted Inter font, class-based dark mode with a persisted toggle (top-right).",
  },
  {
    title: "Environment config",
    body: "WEBAPP_-prefixed variables exposed to the client via import.meta.env — see .env.example.",
  },
  {
    title: "Testing",
    body: "Vitest + React Testing Library with jsdom — pnpm test.",
  },
  {
    title: "Deployment",
    body: "Docker + nginx, GitHub Actions CI, and SPA static-hosting notes in the README.",
  },
];

const pages = [
  { path: "/about", label: "About" },
  { path: "/dashboard", label: "Dashboard (nested layout)" },
  {
    path: "/dashboard/settings",
    label: "Dashboard / Settings (form + localStorage)",
  },
  { path: "/blog", label: "Blog (list + $slug detail)" },
  { path: "/products", label: "Products (optional $category)" },
  { path: "/api-demo", label: "API Demo (OpenAPI codegen → live data)" },
  { path: "/boom", label: "Error Boundary demo (always throws)" },
  { path: "/this-page-does-not-exist", label: "404 (catch-all $.tsx)" },
  { path: "/docs", label: "Route conventions & starter guide" },
];

export default function Home() {
  return (
    <Page
      title="React Router v8 + fs-routes SPA"
      description="A production-ready SPA starter — file-based routing, error handling, a codegen’d API client, dark mode, and testing. Explore the pages below, or start from what’s included."
    >
      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
          What’s in this starter
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {capabilities.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
          Pages
        </h2>
        <nav className="grid sm:grid-cols-2 gap-2">
          {pages.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
                {path}
              </span>
              <span className="block text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                {label}
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Welcome />
      </div>
    </Page>
  );
}

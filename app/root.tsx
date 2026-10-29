import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

// Legacy starter routes are dark-only. The editorial marketing shell opts into
// its own paper theme via `.ed-shell`; the `dark` class stays pinned for pages
// that have not been migrated yet.
export function meta(_: Route.MetaArgs) {
  return [
    { title: "NCS Model Gateway — The model gateway, governed" },
    {
      name: "description",
      content:
        "One gateway between your product and every model you depend on. Route by cost, latency, or quality. Enforce policy before inference. Keep the receipt.",
    },
    { name: "theme-color", content: "#eef1f6" },
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "NCS Model Gateway — The model gateway, governed",
    },
    {
      property: "og:description",
      content:
        "Your models are infrastructure. Treat them like it. Routing, policy, caching, and records for production AI.",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.BASE_URL}favicon.svg`}
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-ink text-slate-200">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="ed-shell relative flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-2xl border border-rule bg-paper p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <span className="ed-label text-accent">Runtime error</span>
          <span className="ed-label">NCS / Exception</span>
        </div>
        <h1 className="ed-display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">
          {message}
        </h1>
        <p className="ed-body mt-4 text-sm">{details}</p>
        {stack && (
          <pre className="ed-code mt-6 w-full overflow-x-auto p-4 text-[11px] leading-relaxed">
            <code>{stack}</code>
          </pre>
        )}
        <Link to="/" className="ed-btn mt-6">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

import { useState } from "react";
import { Link } from "react-router";
import { EditorialLogo } from "./logo";
import { Label, Wrap } from "./primitives";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Semantic routing", to: "/platform#routing" },
      { label: "Guardrails", to: "/platform#guardrails" },
      { label: "Semantic cache", to: "/platform#caching" },
      { label: "Observability", to: "/platform#observability" },
      { label: "Model index", to: "/platform#models" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "Quickstart", to: "/docs#quickstart" },
      { label: "API reference", to: "/docs#api" },
      { label: "SDKs & libraries", to: "/docs#sdks" },
      { label: "Status", to: "/company#security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Field notes", to: "/company#customers" },
      { label: "Careers", to: "/company#careers" },
      { label: "Contact", to: "/contact" },
      { label: "Security", to: "/company#security" },
    ],
  },
];

export function EditorialFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-rule bg-paper">
      <Wrap wide className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1.65fr] lg:gap-20">
          <div>
            <EditorialLogo />
            <p className="ed-small mt-5 max-w-xs text-graphite-soft">
              The gateway between your product and every model you depend on.
              Route, enforce, cache, and record — from one control plane.
            </p>

            <form
              className="mt-8 max-w-sm"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <Label>The Routing Table — monthly notes</Label>
              {subscribed ? (
                <p className="mt-4 border-b border-accent pb-2 text-[13px] text-accent">
                  On the list. No noise.
                </p>
              ) : (
                <div className="mt-3 flex items-end gap-3">
                  <label htmlFor="editorial-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="editorial-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="ed-input"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border-b border-graphite pb-2 text-[12px] font-medium text-graphite transition-colors hover:border-accent hover:text-accent"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>

            <div className="mt-7 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              <Label className="text-graphite">All systems operational</Label>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <Label>{column.title}</Label>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="ed-small text-graphite-soft transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Wrap>

      <div className="border-t border-rule">
        <Wrap
          wide
          className="flex flex-col gap-4 py-5 text-[11px] text-quiet sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="ed-mono">
            © 2026 Portico Systems, Inc. · SOC 2 Type II · HIPAA · GDPR
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link to="/company#security" className="hover:text-accent">
              Privacy
            </Link>
            <Link to="/company#security" className="hover:text-accent">
              Terms
            </Link>
            <Link to="/company#security" className="hover:text-accent">
              DPA
            </Link>
            <a href="https://github.com" className="hover:text-accent">
              GitHub
            </a>
            <a href="https://x.com" className="hover:text-accent">
              X
            </a>
            <a href="#top" className="hover:text-accent">
              Top ↑
            </a>
          </div>

          <p className="ed-mono">Set in Fraunces &amp; IBM Plex</p>
        </Wrap>
      </div>
    </footer>
  );
}

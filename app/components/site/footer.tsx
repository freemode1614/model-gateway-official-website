import { ArrowRight, Check, Globe, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Logo } from "./logo";
import { Container } from "./section";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Semantic routing", to: "/platform#routing" },
      { label: "Guardrails", to: "/platform#guardrails" },
      { label: "Observability", to: "/platform#observability" },
      { label: "Agent infrastructure", to: "/platform#agents" },
      { label: "Model catalog", to: "/platform#models" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "Quickstart", to: "/docs#quickstart" },
      { label: "API reference", to: "/docs#api" },
      { label: "SDKs & libraries", to: "/docs#sdks" },
      { label: "Routing policies", to: "/docs#routing" },
      { label: "Changelog", to: "/company#timeline" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Values", to: "/company#values" },
      { label: "Careers", to: "/company#careers" },
      { label: "Contact", to: "/contact" },
      { label: "Security", to: "/company#security" },
      { label: "Customers", to: "/company#customers" },
    ],
  },
];

function SocialIcon({ name }: { name: "x" | "github" | "linkedin" }) {
  if (name === "x") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.53 3H20.5l-6.49 7.42L21.65 21h-5.98l-4.68-6.12L5.63 21H2.66l6.94-7.93L2.35 3h6.13l4.23 5.59L17.53 3Zm-1.05 16.2h1.65L7.6 4.7H5.83l10.65 14.5Z" />
      </svg>
    );
  }
  if (name === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#04050a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
      />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              The enterprise model gateway. Route, protect, and observe every
              LLM request from one control plane.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
                All systems operational
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400">
                <Globe className="h-3 w-3" />
                SOC 2 · HIPAA · GDPR
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {(["x", "github", "linkedin"] as const).map((name) => (
                <a
                  key={name}
                  href={
                    name === "x"
                      ? "https://x.com"
                      : name === "github"
                        ? "https://github.com"
                        : "https://linkedin.com"
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Portico on ${name === "x" ? "X" : name === "github" ? "GitHub" : "LinkedIn"}`}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-white/25 hover:text-white"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[13.5px] text-slate-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                The routing table
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
                A monthly note on model economics, routing benchmarks, and
                production AI. No fluff.
              </p>
              {subscribed ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-acid/25 bg-acid/10 px-3 py-2 text-xs text-acid">
                  <Check className="h-3.5 w-3.5" />
                  You&apos;re on the list.
                </p>
              ) : (
                <form
                  className="mt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Work email
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1 pl-3 focus-within:border-violet-400/50">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                    <input
                      id="footer-email"
                      type="email"
                      required
                      placeholder="Work email"
                      className="h-8 min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-600"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#080a12] transition-colors hover:bg-violet-100"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 Portico Systems, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/company#security" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link to="/company#security" className="hover:text-slate-300">
              Terms
            </Link>
            <Link to="/company#security" className="hover:text-slate-300">
              Security
            </Link>
            <Link to="/company#security" className="hover:text-slate-300">
              DPA
            </Link>
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden text-center"
      >
        <span className="block translate-y-[18%] text-[18vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.025]">
          PORTICO
        </span>
      </div>
    </footer>
  );
}

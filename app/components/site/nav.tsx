import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Menu,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useScrolled } from "../../lib/hooks";
import { Logo } from "./logo";
import { Container } from "./section";
import { btnGhost, btnPrimary, btnSmall } from "./ui";

const productLinks = [
  {
    to: "/platform#routing",
    icon: Route,
    title: "Semantic routing",
    body: "Pick the best model for every request — automatically.",
  },
  {
    to: "/platform#guardrails",
    icon: ShieldCheck,
    title: "Guardrails",
    body: "Stop PII leaks, prompt injection, and policy drift.",
  },
  {
    to: "/platform#observability",
    icon: BarChart3,
    title: "Observability",
    body: "Trace every token, cost, and evaluation in real time.",
  },
  {
    to: "/platform#agents",
    icon: Workflow,
    title: "Agent infrastructure",
    body: "Govern MCP tools, memory, and multi-step workflows.",
  },
];

const navLinks = [
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
  { to: "/company", label: "Company" },
];

function ProductMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover intent only; the menu button handles keyboard interaction.
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors ${
          open ? "text-white" : "text-slate-400 hover:text-white"
        }`}
      >
        Platform
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="panel overflow-hidden rounded-2xl p-2 shadow-2xl shadow-black/60">
          <div className="grid grid-cols-2 gap-1">
            {productLinks.map(({ to, icon: Icon, title, body }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="group rounded-xl p-3.5 transition-colors hover:bg-white/[0.05]"
              >
                <span className="mb-2 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-violet-500/10 text-violet-300 transition-colors group-hover:border-violet-400/30 group-hover:text-violet-200">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="block text-sm font-medium text-white">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                  {body}
                </span>
              </Link>
            ))}
          </div>
          <Link
            to="/platform"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Explore the full platform
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SiteNav() {
  const scrolled = useScrolled(10);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname || location.hash) setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/[0.06] bg-[#05060a]">
        <Container className="flex h-9 items-center justify-center gap-2 text-center">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
          </span>
          <p className="truncate text-[11.5px] text-slate-400 sm:text-xs">
            <span className="font-medium text-slate-200">
              Model Gateway 3.0 is here
            </span>
            <span className="hidden sm:inline">
              {" "}
              — agent-aware routing, semantic cache, and MCP tool governance.
            </span>
          </p>
          <Link
            to="/platform#agents"
            className="hidden shrink-0 items-center gap-1 text-[11.5px] font-medium text-violet-300 transition-colors hover:text-violet-200 sm:inline-flex"
          >
            See what&apos;s new
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Container>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.07] bg-[#05060a]/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex">
            <ProductMenu />
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/contact"
              className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition-colors hover:text-white"
            >
              Book a demo
            </Link>
            <Link to="/docs#quickstart" className={`${btnPrimary} ${btnSmall}`}>
              Start free
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition-colors hover:bg-white/[0.07] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </Container>
      </div>

      <div
        className={`fixed inset-x-0 top-[100px] bottom-0 overflow-y-auto border-b border-white/10 bg-[#05060a]/98 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container className="py-6">
          <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Platform
          </p>
          <div className="mb-6 grid gap-1">
            {productLinks.map(({ to, icon: Icon, title, body }) => (
              <Link
                key={to}
                to={to}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-violet-500/10 text-violet-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {body}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Explore
          </p>
          <div className="mb-6 grid gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="grid gap-2 border-t border-white/10 pt-5">
            <Link
              to="/docs#quickstart"
              className={`${btnPrimary} w-full`}
              onClick={() => setMobileOpen(false)}
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className={`${btnGhost} w-full`}
              onClick={() => setMobileOpen(false)}
            >
              Book a demo
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}

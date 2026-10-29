import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { EditorialLogo } from "./logo";
import { EdButton, Label, Wrap } from "./primitives";

const links = [
  { to: "/platform", label: "Platform" },
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
  { to: "/company", label: "Company" },
];

export function EditorialNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname) setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="border-b border-rule">
        <Wrap wide className="flex h-9 items-center justify-between gap-4">
          <Label className="sm:hidden">NCS</Label>
          <Label className="hidden sm:block">NCS Model Gateway</Label>
          <div className="hidden items-center gap-7 md:flex">
            <Label>Model gateway / 2026</Label>
            <Label>San Francisco · New York</Label>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              <Label className="text-graphite">
                <span className="sm:hidden">Operational</span>
                <span className="hidden sm:inline">
                  All systems operational
                </span>
              </Label>
            </span>
            <Link
              to="/docs#quickstart"
              className="ed-label hidden text-graphite transition-colors hover:text-accent sm:inline"
            >
              Sign in
            </Link>
          </div>
        </Wrap>
      </div>

      <header className="sticky top-0 z-50 border-b border-rule bg-paper">
        <Wrap wide className="flex h-[76px] items-center justify-between gap-6">
          <EditorialLogo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {links.map((link, index) => {
              const active = location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-active={active}
                  className={`ed-nav-link ed-small transition-colors hover:text-accent ${active ? "text-graphite" : "text-graphite-soft"}`}
                >
                  <span className="ed-mono mr-1.5 text-[9px] text-quiet">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link to="/contact" className="ed-link ed-small">
              Book a walkthrough
            </Link>
            <EdButton to="/docs#quickstart">
              Start free
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </EdButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 cursor-pointer place-items-center border border-rule text-graphite transition-colors hover:border-graphite lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </Wrap>

        <div
          className={`absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-76px)] overflow-y-auto border-b border-rule bg-paper transition-all duration-300 lg:hidden ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <Wrap className="flex min-h-[calc(100dvh-80px)] flex-col py-8">
            <nav aria-label="Mobile">
              {links.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-rule py-5"
                >
                  <span className="ed-display text-[2.35rem] leading-none">
                    {link.label}
                  </span>
                  <span className="ed-mono text-[10px] text-quiet">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 grid gap-3">
              <EdButton to="/docs#quickstart" onClick={() => setOpen(false)}>
                Start free
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </EdButton>
              <EdButton
                to="/contact"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Book a walkthrough
              </EdButton>
            </div>

            <div className="mt-auto grid gap-2 pt-12">
              <Label>hello@ncs.dev</Label>
              <Label>San Francisco · New York</Label>
              <span className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                <Label className="text-graphite">All systems operational</Label>
              </span>
            </div>
          </Wrap>
        </div>
      </header>
    </>
  );
}

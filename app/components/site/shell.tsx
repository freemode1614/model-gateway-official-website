import { useEffect } from "react";
import { useLocation } from "react-router";
import { EditorialFooter } from "../editorial/footer";
import { EditorialNav } from "../editorial/nav";
import { SiteFooter } from "./footer";
import { SiteNav } from "./nav";

/**
 * Scrolls to `#hash` targets after client-side navigation. React Router's
 * ScrollRestoration handles scroll positions, but anchor links inside long
 * marketing pages need an explicit scroll (and a retry while the target mounts).
 */
function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    let cancelled = false;
    let attempts = 0;

    const scroll = () => {
      if (cancelled) return;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attempts < 30) {
        attempts += 1;
        window.setTimeout(scroll, 50);
      }
    };

    const timer = window.setTimeout(scroll, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [location]);

  return null;
}

export function SiteShell({
  children,
  variant = "ink",
}: {
  children: React.ReactNode;
  variant?: "ink" | "editorial";
}) {
  if (variant === "editorial") {
    return (
      <div id="top" className="ed-shell relative min-h-screen antialiased">
        <HashScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-graphite focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-graphite"
        >
          Skip to content
        </a>
        <EditorialNav />
        <main id="main">{children}</main>
        <EditorialFooter />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-slate-200 antialiased">
      <HashScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

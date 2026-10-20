import { Architecture } from "../components/editorial/architecture";
import { Capabilities } from "../components/editorial/capabilities";
import { CodeSection } from "../components/editorial/code-section";
import { FinalCta } from "../components/editorial/cta";
import { Faq } from "../components/editorial/faq";
import { FieldNotes } from "../components/editorial/field-notes";
import { Hero } from "../components/editorial/hero";
import { PricingTable } from "../components/editorial/pricing-table";
import { Problem } from "../components/editorial/problem";
import { Simulator } from "../components/editorial/simulator";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/_index";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Portico — The model gateway, governed" },
    {
      name: "description",
      content:
        "One gateway between your product and every model you depend on. Route by cost, latency, or quality. Enforce policy before inference. Keep the receipt.",
    },
    { name: "theme-color", content: "#f2efe7" },
  ];
}

export default function Home() {
  return (
    <SiteShell variant="editorial">
      <Hero />
      <Problem />
      <Capabilities />
      <Architecture />
      <CodeSection />
      <Simulator />
      <FieldNotes />
      <PricingTable />
      <Faq />
      <FinalCta />
    </SiteShell>
  );
}

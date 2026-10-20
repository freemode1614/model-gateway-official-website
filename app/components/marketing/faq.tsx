import { Plus } from "lucide-react";
import { Link } from "react-router";

const faqs = [
  {
    q: "Is Portico a proxy, or something I install?",
    a: "Both. The managed gateway runs on our edge in 38 regions. Enterprise customers can deploy the same control plane inside their VPC, on-prem, or fully air-gapped. It sits in the request path and adds roughly 12ms median overhead.",
  },
  {
    q: "Do I have to change my application code?",
    a: "No. Portico is OpenAI-compatible: keep your SDK, swap the base URL to https://api.portico.dev/v1, and set model to auto (or pin a specific model). Streaming, tool calls, embeddings, and vision inputs all work unchanged.",
  },
  {
    q: "Which providers and models are supported?",
    a: "120+ models across OpenAI, Anthropic, Google Vertex, Azure OpenAI, AWS Bedrock, Meta, Mistral, Cohere, DeepSeek, and self-hosted vLLM or Ollama. Bring your own keys, or use Portico-provisioned capacity.",
  },
  {
    q: "How does pricing work?",
    a: "A platform fee plus included tokens. Overage is billed at your negotiated provider rate with no token markup. You can set hard budgets per team, application, or customer, and get alerts before you hit them.",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere you don't choose. Zero data retention is the default, PII can be redacted before egress, and logs are stored in your region. BYOK, customer-managed HSM keys, and private networking are available on Scale and Enterprise.",
  },
  {
    q: "How fast is failover, really?",
    a: "Median reroute is 31ms. Portico watches provider health, rate-limit headers, and error rates per region, then retries, hedges, or fails over to your fallback list. Requests can also be mirrored to a canary model for evaluation.",
  },
  {
    q: "Can I run evaluations and A/B tests?",
    a: "Yes. Split traffic by percentage, user segment, or prompt hash. Replay production traces against a new model, score them with built-in or custom evaluators, and promote the winner with a policy change in Git.",
  },
  {
    q: "Do you offer SLAs and compliance reports?",
    a: "Scale includes a 99.9% uptime SLA; Enterprise includes 99.999%, 24/7 support, and a named solutions architect. SOC 2 Type II, HIPAA BAA, GDPR DPA, and penetration test summaries are available in the trust center.",
  },
];

export function Faq({
  title = "Questions, answered",
  description = "Everything platform, security, and finance teams ask before putting a gateway in the request path.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
          {description}
        </p>
        <p className="mt-6 text-[12.5px] text-slate-500">
          Still deciding?{" "}
          <Link
            to="/contact"
            className="font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            Talk to an engineer →
          </Link>
        </p>
      </div>

      <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[13.5px] font-medium text-slate-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
              {faq.q}
              <Plus className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-45 group-open:text-violet-300" />
            </summary>
            <p className="pb-5 pr-8 text-[12.5px] leading-relaxed text-slate-400">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

import { ArrowRight, Check, Terminal } from "lucide-react";
import { Link } from "react-router";
import { Container } from "../site/section";
import { btnGhost, btnSmall, eyebrow } from "../site/ui";
import { type CodeTab, CodeTabs } from "./code-block";
import { Reveal } from "./reveal";

const tabs: CodeTab[] = [
  {
    label: "TypeScript",
    filename: "summarize.ts",
    language: "typescript",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.portico.dev/v1",
  apiKey: process.env.PORTICO_API_KEY,
});

const stream = await client.chat.completions.create({
  model: "auto", // Portico picks the best model
  messages: [{ role: "user", content: "Summarize this contract" }],
  stream: true,
  portico: {
    policy: "cost-aware",
    fallback: ["gpt-5.2-mini", "gemini-3-flash"],
    cache: "semantic",
    guardrails: ["pii", "prompt-injection"],
  },
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`,
  },
  {
    label: "Python",
    filename: "summarize.py",
    language: "python",
    code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.portico.dev/v1",
    api_key=os.environ["PORTICO_API_KEY"],
)

stream = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Summarize this contract"}],
    stream=True,
    extra_body={
        "portico": {
            "policy": "cost-aware",
            "fallback": ["gpt-5.2-mini", "gemini-3-flash"],
            "cache": "semantic",
        }
    },
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")`,
  },
  {
    label: "cURL",
    filename: "request.sh",
    language: "bash",
    code: `curl https://api.portico.dev/v1/chat/completions \\
  -H "Authorization: Bearer $PORTICO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [
      { "role": "user", "content": "Hello, Portico" }
    ],
    "portico": {
      "policy": "balanced",
      "cache": "semantic"
    }
  }'`,
  },
  {
    label: "portico.yaml",
    filename: "portico.yaml",
    language: "yaml",
    code: `# Reviewed in Git, deployed in seconds
routes:
  - match:
      intent: support.reply
    policy: balanced
    primary: anthropic/claude-sonnet-4.8
    fallback:
      - openai/gpt-5.2-mini
      - google/gemini-3-flash
    max_cost_per_1k: 0.004
    region: us-east
    guardrails: [pii, prompt-injection, toxicity]
    cache:
      semantic: true
      ttl: 24h

budgets:
  - team: support
    monthly: 12000
    alert_at: 0.8`,
  },
];

const features = [
  "OpenAI-compatible — keep your SDK, change one URL",
  "Policies as code, versioned beside your services",
  "Typed SDKs for TypeScript, Python, Go, and Java",
];

export function CodeSection() {
  return (
    <section
      id="developers"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(124,58,237,0.08),transparent_60%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div>
              <p className={`${eyebrow} mb-4`}>Developer experience</p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
                Integrate in minutes.
                <br />
                Govern for years.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-400">
                No proxy to babysit, no new SDK to learn. Point your existing
                OpenAI client at Portico and get routing, safety, caching, and
                observability on your very next request.
              </p>

              <ul className="mt-7 grid gap-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13.5px] text-slate-400"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-acid/30 bg-acid/10">
                      <Check
                        className="h-2.5 w-2.5 text-acid"
                        strokeWidth={3}
                      />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/docs#quickstart"
                  className={`${btnGhost} ${btnSmall}`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Read the quickstart
                </Link>
                <Link
                  to="/docs#api"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
                >
                  API reference
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-9 flex items-center gap-6 border-t border-white/[0.07] pt-6">
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    4m 12s
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    median time to first request
                  </p>
                </div>
                <div className="h-9 w-px bg-white/[0.08]" />
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    0
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    code changes beyond the base URL
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(closest-side,rgba(124,58,237,0.2),transparent)] blur-2xl"
            />
            <div className="relative">
              <CodeTabs tabs={tabs} />
              <div className="absolute -bottom-4 right-6 hidden rounded-full border border-white/10 bg-[#0a0c15] px-3 py-1.5 text-[10.5px] text-slate-400 shadow-xl shadow-black/50 sm:block">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-acid" />
                OpenAI SDK, unchanged
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

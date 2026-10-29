import { type CodeSample, EditorialCode } from "./code-block";
import { FigureCaption, SectionTag, TextLink, Wrap } from "./primitives";

const samples: CodeSample[] = [
  {
    label: "TypeScript",
    filename: "gateway.ts",
    code: `import OpenAI from "openai";

const gateway = new OpenAI({
  baseURL: "https://api.ncs.dev/v1",
  apiKey: process.env.NCS_API_KEY,
});

const reply = await gateway.chat.completions.create({
  model: "ncs/auto", // route by policy, not by hand
  messages: [{ role: "user", content: "Summarize the incident." }],
  stream: true,
});`,
  },
  {
    label: "Python",
    filename: "gateway.py",
    code: `from openai import OpenAI

gateway = OpenAI(
    base_url="https://api.ncs.dev/v1",
    api_key=os.environ["NCS_API_KEY"],
)

reply = gateway.chat.completions.create(
    model="ncs/auto",  # route by policy, not by hand
    messages=[{"role": "user", "content": "Summarize the incident."}],
    stream=True,
)`,
  },
  {
    label: "cURL",
    filename: "request.sh",
    code: `curl https://api.ncs.dev/v1/chat/completions \\
  -H "Authorization: Bearer $NCS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ncs/auto",
    "messages": [{"role": "user", "content": "Summarize the incident."}],
    "stream": true
  }'`,
  },
];

const points = [
  "Drop-in OpenAI SDK",
  "Streaming, tools, and JSON mode preserved",
  "Per-key policy, not per-repo config",
  "Runs at our edge or inside your VPC",
];

export function CodeSection() {
  return (
    <section id="developers" className="border-t border-rule py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-5">
            <SectionTag index="05">Integration</SectionTag>
            <h2 className="ed-display ed-h2 mt-6">
              One URL. The SDK{" "}
              <span className="ed-display-italic">you already use.</span>
            </h2>
            <p className="ed-body mt-6 max-w-md">
              Point your existing OpenAI client at{" "}
              <span className="ed-mono text-[0.9em] text-graphite">
                api.ncs.dev
              </span>
              . Keep your prompt templates, evals, and streaming UI. The only
              thing that changes is who chooses the model.
            </p>

            <ul className="mt-8 border-t border-rule">
              {points.map((point, index) => (
                <li
                  key={point}
                  className="flex items-baseline gap-3 border-b border-rule py-3"
                >
                  <span className="ed-mono text-[9px] text-accent">
                    0{index + 1}
                  </span>
                  <span className="ed-small text-graphite-soft">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <TextLink to="/docs#quickstart">Read the quickstart</TextLink>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <EditorialCode tabs={samples} footerRight="OpenAI-compatible" />
            <FigureCaption index="Fig. 04">
              Change two lines. Keep your evals, your prompts, and your
              streaming UI.
            </FigureCaption>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

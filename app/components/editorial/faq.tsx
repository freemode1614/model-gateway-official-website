import { FaqBlock } from "./faq-block";

const questions = [
  {
    q: "Is Model Gateway a proxy or a library?",
    a: "Neither, exactly. It is a gateway process that sits in your request path. You call it with the OpenAI SDK; it authenticates, evaluates policy, picks a provider, and records the result. No sidecar and no client library required.",
  },
  {
    q: "Do you store prompts and completions?",
    a: "Not by default. The routing record contains metadata — model, tokens, latency, price, policy version — not prompt text. If you enable trace capture, payloads are encrypted per tenant and retained for the window you set.",
  },
  {
    q: "Can we run it in our VPC?",
    a: "Yes. The same binary runs on our edge, in your VPC, or on-prem. Enterprise deployments use your object storage and your keys; Model Gateway never needs a copy of your traffic.",
  },
  {
    q: "How does routing decide?",
    a: "A policy scores eligible models against live price, p95 latency, and your own eval scores. You set the weights and the hard constraints. Every decision is written down and can be replayed.",
  },
  {
    q: "What happens when a provider goes down?",
    a: "The gate fails over on the same request if the response has not started. If it has, the stream is preserved and the incident is attached to the trace. No retry storms.",
  },
  {
    q: "How do you handle model deprecations?",
    a: "Policies pin to a capability tier, not a model string. When a provider retires a version, the gate re-scores the tier and flags the change in the record before it reaches production.",
  },
];

export function Faq() {
  return (
    <FaqBlock
      index="09"
      label="Questions"
      title={
        <>
          Before the <span className="ed-display-italic">first call.</span>
        </>
      }
      intro="The short answers. For the long ones, the docs go deeper — or ask us directly."
      items={questions}
    />
  );
}

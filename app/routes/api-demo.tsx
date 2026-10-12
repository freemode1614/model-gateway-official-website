import { Activity, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type Pet,
  petFindByStatusUsingGet,
  storeInventoryUsingGet,
} from "../api/petstore";
import { Badge } from "../components/badge";
import { Card } from "../components/card";
import { Page } from "../components/page";
import { Spinner } from "../components/spinner";
import type { Route } from "./+types/api-demo";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "API Demo" },
    {
      name: "description",
      content:
        "Runtime API calls with a client generated from a hosted OpenAPI spec",
    },
  ];
}

// Overridable via .env (WEBAPP_ prefix — see .env.example).
const API_BASE =
  import.meta.env.WEBAPP_PETSTORE_BASE_URL ?? "https://petstore.swagger.io/v2";

export default function ApiDemo() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [petsResult, inventoryResult] = await Promise.allSettled([
        petFindByStatusUsingGet({ status: ["available"] }),
        storeInventoryUsingGet(),
      ]);
      if (cancelled) return;
      if (petsResult.status === "fulfilled") {
        setPets(petsResult.value);
      } else {
        const reason = petsResult.reason;
        setError(reason instanceof Error ? reason.message : String(reason));
      }
      if (inventoryResult.status === "fulfilled") {
        setInventory(
          Object.fromEntries(
            Object.entries(
              inventoryResult.value as Record<string, unknown>,
            ).map(([status, count]) => [status, Number(count) || 0]),
          ),
        );
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Page
      title="API Demo"
      description={
        <>
          The data below is fetched at runtime from{" "}
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            {API_BASE}
          </code>{" "}
          with a TypeScript client that{" "}
          <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
            @moccona/apicodegen
          </code>{" "}
          generated from a hosted OpenAPI spec (Swagger Petstore). The client is
          regenerated automatically on every <code>pnpm dev</code> /{" "}
          <code>pnpm build</code>.
        </>
      }
      backTo={{ to: "/", label: "Back to Home" }}
    >
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          How it works
        </h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm mb-4">
          <li>
            <code className="text-xs">vite.config.ts</code> —{" "}
            <code className="text-xs">apiCodeGenPlugin</code> points at a spec
            URL and an output file (both overridable via{" "}
            <code className="text-xs">WEBAPP_</code> env vars)
          </li>
          <li>
            On dev/build start the plugin fetches the spec and writes{" "}
            <code className="text-xs">app/api/petstore.ts</code> (committed, so
            builds work offline)
          </li>
          <li>
            This route imports the generated functions — fully typed, no fetch
            boilerplate
          </li>
        </ol>
        <pre className="text-xs overflow-x-auto rounded-lg bg-gray-900 text-gray-100 p-4 leading-relaxed">
          {`// vite.config.ts
const env = loadEnv(mode, process.cwd(), "WEBAPP_");
apiCodeGenPlugin([
  {
    name: "petstore",
    spec: env.WEBAPP_PETSTORE_SPEC_URL ?? "https://petstore.swagger.io/v2/swagger.json",
    output: "app/api/petstore.ts",
    adaptor: "fetch",
    baseURL: env.WEBAPP_PETSTORE_BASE_URL ?? "https://petstore.swagger.io/v2",
    typeCheck: false,
  },
])

// generated in app/api/petstore.ts
export async function petFindByStatusUsingGet({
  status,
}: {
  status: ("available" | "pending" | "sold")[];
}) {
  return fetch(
    \`https://petstore.swagger.io/v2/pet/findByStatus?status=\${status}\`,
    { method: "GET" },
  ).then(async (response) => (await response.json()) as Pet[]);
}`}
        </pre>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 inline-flex items-center gap-2">
          <Activity
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
          Live data from the Petstore API
        </h2>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Card
            tone="danger"
            title={
              <span className="inline-flex items-center gap-2">
                <TriangleAlert className="h-4 w-4" aria-hidden="true" />
                Couldn’t reach the Petstore API
              </span>
            }
          >
            <p className="font-mono text-xs break-all">{error}</p>
            <p className="mt-2 text-sm">
              Check your network — the generated client calls{" "}
              <code className="text-xs">{API_BASE}</code> directly from the
              browser.
            </p>
          </Card>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(inventory).map(([status, count]) => (
                <Badge key={status}>
                  {status}: {count}
                </Badge>
              ))}
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800 text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {pets.map((pet) => (
                    <tr key={pet.id}>
                      <td className="px-4 py-2 text-gray-900 dark:text-white">
                        {pet.name}
                      </td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                        {pet.category?.name ?? "—"}
                      </td>
                      <td className="px-4 py-2">
                        <Badge>{pet.status}</Badge>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                        {pet.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Read-only demo — generated POST/PUT calls in v0.1.1 omit the{" "}
              <code>Content-Type</code> header, so write endpoints are left out
              until that’s fixed upstream.
            </p>
          </>
        )}
      </section>
    </Page>
  );
}

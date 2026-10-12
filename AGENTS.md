# AGENTS.md — React Router v8 + fs-routes SPA

## Project Structure

```
.
├── .env.example          # WEBAPP_-prefixed env vars (copy to .env)
├── vitest.config.ts      # Standalone test config (does NOT load vite.config.ts)
├── config/
│   └── base-url.ts       # WEBAPP_BASE_URL normalizer (single source of truth)
├── Dockerfile            # Build: `docker build .` (context = repo root)
├── docker/               # Runtime + nginx templates referenced by Dockerfile
│   ├── entrypoint.sh         # Composes nginx.conf from WEBAPP_BASE_URL at start
│   ├── root.conf.template
│   └── subpath.conf.template
└── app/
    ├── root.tsx              # Root layout + root ErrorBoundary + pre-paint theme script
    ├── entry.client.tsx      # Client bootstrap (hydration, global error hooks)
    ├── env.d.ts              # ImportMetaEnv typing for WEBAPP_* variables
    ├── app.css               # Global styles (Tailwind, class-based dark mode)
    ├── routes.ts             # Route config (flatRoutes)
    ├── routes/               # All route files
    │   ├── _index.tsx
    │   ├── about.tsx
    │   ├── $.tsx               # Catch-all / 404 (maps to `*`)
    │   ├── boom.tsx            # Always throws — demos the root ErrorBoundary
    │   ├── dashboard.tsx          # Layout for /dashboard/*
    │   ├── dashboard._index.tsx   # Index of /dashboard
    │   ├── dashboard.settings.tsx # /dashboard/settings
    │   ├── blog.tsx               # Layout for /blog/*
    │   ├── blog.$slug.tsx         # /blog/:slug
    │   ├── api-demo.tsx           # /api-demo — consumes the generated API client
    │   ├── docs.tsx               # /docs — starter guide
    │   └── ...
    ├── components/          # Shared UI: Page, Button, Card, Badge, Input, Spinner, ThemeToggle
    ├── api/
    │   └── petstore.ts        # GENERATED from an OpenAPI spec — do not hand-edit
    ├── tests/               # Vitest + RTL tests
    └── welcome/              # Welcome screen (not routes)
```

> **Generated file:** `app/api/petstore.ts` is written by the
> `apiCodeGenPlugin` (see `vite.config.ts`) on every dev/build start. Never edit
> it by hand — change the spec/config and regenerate (`pnpm api:gen` or just
> restart `pnpm dev`).

## Route File Naming Conventions

All route files live in `app/routes/`. Use `flatRoutes` conventions:

### 1. Static Route

```
File: about.tsx          →  URL: /about
```

### 2. Index Route (`_index`)

```
File: _index.tsx              →  URL: /
File: dashboard._index.tsx    →  URL: /dashboard (index child)
```

Use `_index` to mark the default child of a parent route. Without it, visiting the parent URL shows nothing (empty `<Outlet />`).

### 3. Dynamic Parameter (`$param`)

```
File: blog.$slug.tsx    →  URL: /blog/:slug
File: users.$id.tsx     →  URL: /users/:id
```

The `$` prefix captures the URL segment as a param. Access via `useParams()`.

### 4. Splat / Catch-All (`$`)

```
File: files.$.tsx       →  URL: /files/* (matches any depth)
```

A lone `$` at the end catches everything after the path. Access via `useParams()["*"]`.

### 5. Nested Routes (`.` separator)

```
File: dashboard.tsx             →  Layout for /dashboard/*
File: dashboard.settings.tsx    →  /dashboard/settings
```

The parent file (before `.`) acts as a layout with `<Outlet />`. Children render inside it.

### 6. Pathless Layout (`_` prefix, not `_index`)

```
File: admin._pathless.tsx       →  Layout wrapper, no URL segment
File: admin._pathless._index.tsx →  /admin (index of pathless)
```

Starts with `_` but is NOT `_index`. Creates a layout wrapper without adding a URL segment.

### 7. Optional Segment (`()`)

```
File: products.($category).tsx  →  /products OR /products/:category
File: (optional-demo).tsx       →  /optional-demo
```

Parentheses make the segment optional. When omitted, the route still matches the parent path.

**Important:** the name inside the parens is the *literal* segment unless it starts
with `$`. `products.(category).tsx` matches only `/products` or `/products/category`
(the literal word "category") — it does **not** capture a param. To get an optional
dynamic param, use `($param)`: `products.($category).tsx` → `/products/:category?`.

### 8. Escaped Segment (`[]`)

```
File: [api-v2].tsx              →  URL: /api-v2
File: ([special]).tsx           →  URL: /special (optional + escaped)
```

Square brackets escape reserved characters (`$`, `(`, `)`, `.`). The brackets are stripped from the URL.

### 9. Folder-Based Routes (Single File Only)

```
Folder: folder/
  └── index.tsx          →  /folder (single route, no children)
```

Folders can hold a **single** route file (`index.tsx` or `route.tsx`). They do **NOT** support nested children inside the folder. If you need child routes, use flat files instead:

```
app/routes/
├── folder.tsx           →  Layout for /folder/*
└── folder.detail.tsx    →  /folder/detail
```

**Never mix** a flat file with a folder of the same name — it causes a route ID collision.

### 10. Catch-all / 404 (root-level `$`)

```
File: $.tsx                   →  * (any URL that matches no other route)
```

A lone `$.tsx` at the **root** of `app/routes/` is the catch-all route — it renders
for any URL that no other route matches (your 404 page). Unlike a nested splat
(`files.$.tsx` → `/files/*`), the root splat sits at the lowest route rank, so every
specific route wins first.

Note: `404.tsx` is **not** special in React Router v8 — it is just a literal `/404`
route. The catch-all convention is `$.tsx`. (In SSR/prerender mode, add a loader
returning `data({}, 404)` so crawlers get a real 404 status.)

## Rules

1. **Every route must export a default component.** No exceptions.
2. **Use `<Link>` for navigation**, never `<a href>`. `<Link>` does client-side routing without page reload.
3. **Parent routes with children must render `<Outlet />`.** Without it, child routes have nowhere to render.
4. **Index routes need `_index` suffix.** `dashboard.index.tsx` maps to `/dashboard/index`, NOT `/dashboard`. Use `dashboard._index.tsx` for `/dashboard`.
5. **No `<a>` tags with `href` starting with `/`.** Use `<Link to="/...">` instead.
6. **Type imports use `./+types/<filename>`.** Example: `import type { Route } from "./+types/about"`.
7. **Folder and flat file cannot coexist for the same name.** Either use `folder/route.tsx` OR `folder.tsx`, not both.
8. **`app/api/petstore.ts` is generated code.** It is rewritten by the `apiCodeGenPlugin` on every dev/build start (and by `pnpm api:gen`). Never hand-edit it — change the spec/config and regenerate.
9. **Tests live in `app/tests/` only.** Never put `*.test.tsx`/`*.test.ts` in `app/routes/` — fs-routes would register them as routes. `vitest.config.ts` is standalone; it must not load `vite.config.ts` plugins.
10. **Environment variables use the `WEBAPP_` prefix** (not `VITE_`). Exposed via `envOptions.envPrefix` in `vite.config.ts`, typed in `app/env.d.ts`, documented in `.env.example`. `WEBAPP_BASE_URL` is additionally read by `react-router.config.ts` from `process.env` at dev/build time to set the router `basename` — a full rebuild is required after changing it. Only single-segment paths are supported (e.g. `/admin`); multi-segment values throw at config time.
11. **Dark mode is class-based** (`.dark` on `<html>`). Toggle logic lives in `app/components/theme-toggle.tsx`; the pre-paint inline script in `root.tsx` must stay in sync with its `localStorage` key (`"theme"`). New styles need `dark:` variants.
12. **Reuse `app/components/`** (Page, Button, Card, Badge, Input, Spinner, ThemeToggle) instead of duplicating markup in routes. `buttonClasses(variant)` is exported for styling `<Link>`s.

## Creating a New Route

1. Create the file in `app/routes/` following the naming convention above.
2. Export a default React component.
3. Import `type { Route }` from `./+types/<filename>` for type safety.
4. Add the route to the homepage (`_index.tsx`) navigation for easy testing.
5. Run `pnpm check` to lint/format.
6. Run `pnpm build` to verify it compiles.
7. Run `pnpm dev` and visit the route to verify it renders.

## SPA Mode Notes

- `ssr: false` in `react-router.config.ts` — all rendering is client-side.
- The build generates `build/client/` — deploy this directory as static files.
- The initial HTML is a minimal shell; content appears after JS hydrates.
- Configure your static host to fallback all routes to `index.html` (SPA routing).

## Sub-path hosting (`WEBAPP_BASE_URL`)

Set `WEBAPP_BASE_URL=<segment>` to serve the SPA under a path prefix
(e.g. `/admin`). The value is read at dev/build time by three places that
must stay in sync:

1. **`react-router.config.ts`** — sets React Router's `basename` (drives
   `<Link to>` / `useNavigate()` matching; route paths are unchanged).
2. **`vite.config.ts`** — sets Vite's `base` so emitted asset URLs
   (`/admin/assets/...`), the runtime manifest URL, and the favicon all
   carry the prefix.
3. **`docker/entrypoint.sh`** — at container start, renders the active
   `nginx.conf` from `WEBAPP_BASE_URL`. Empty/unset → `docker/root.conf.template`
   verbatim. Non-empty → root template + the `docker/subpath.conf.template`
   block (prefix `location`, asset cache headers, no-cache for `index.html`)
   inserted ABOVE `location /`.

The normalizer lives at `config/base-url.ts` (imported by both config files
and re-exported for tooling). Single-segment paths only (`/admin`, `/portal`);
multi-segment values throw at config time so misconfigurations fail at
dev/build time, not silently in production. The value is normalized to
leading-slash + trailing-slash form (e.g. `/admin/`).

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (http://localhost:5173) |
| `pnpm build` | Production build → `build/client/` |
| `pnpm start` | Preview production build (http://localhost:3000) |
| `pnpm check` | Biome lint + format (auto-fix) |
| `pnpm check:ci` | Biome CI mode (fails on issues, no auto-fix) |
| `pnpm lint` | Biome lint only |
| `pnpm format` | Biome format only |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm test` | Run tests once (Vitest + RTL) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm api:gen` | Regenerate `app/api/petstore.ts` from the OpenAPI spec (CLI) |

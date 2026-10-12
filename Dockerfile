# Syntax: docker/dockerfile:1
#
# Build from the REPO ROOT:
#
#   docker build -t my-app .
#   docker build --build-arg WEBAPP_BASE_URL=/admin -t my-app .
#
# Build args:
#   WEBAPP_BASE_URL  — single-segment path prefix the SPA is served under
#                      (e.g. "/admin"). Leave empty/unset for the site root.
#                      Consumed by config/base-url.ts (via vite.config.ts
#                      and react-router.config.ts) at build time and baked
#                      into the bundle as React Router's `basename`. The
#                      nginx config is rendered from WEBAPP_BASE_URL at
#                      container start (see entrypoint.sh), so the same
#                      image serves the SPA at any prefix without rebuilding.
#
# Performance notes:
#   - Cold `docker build` is dominated by pnpm install (~100s, ~200 packages)
#     and the production client bundle (~3s). BuildKit cache mounts reuse
#     the pnpm store and Vite's dep cache across builds without baking them
#     into the image, so warm builds land in seconds.
#   - BuildKit is the default in Docker 23+. Plain `docker build` also works;
#     the cache-mount lines are then no-ops.

# ---- 1. install dependencies in isolation ----------------------------------
# This layer is the slowest part of cold builds. Cache-mount the pnpm store so
# subsequent builds only fetch what's missing, never re-download unchanged
# packages.
FROM node:24-alpine AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- 2. build the SPA bundle ------------------------------------------------
# Reuse the deps layer above so we only pay for the network calls the build
# itself makes (Vite, codegen). Source code is copied last so edits don't
# invalidate the dependency install layer.
FROM node:24-alpine AS build
ARG WEBAPP_BASE_URL
ENV WEBAPP_BASE_URL=${WEBAPP_BASE_URL}
RUN corepack enable
WORKDIR /app

# Pull dependencies from the previous stage. NODE_ENV=production skips
# devtool-only dependencies during build.
COPY --from=deps /app/node_modules /app/node_modules
COPY package.json pnpm-lock.yaml ./
COPY --link . .

# Vite/esbuild also have a dep cache worth persisting across builds.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    --mount=type=cache,id=vite,target=/app/node_modules/.vite \
    NODE_ENV=production pnpm build

# ---- 3. serve with nginx ----------------------------------------------------
# The runtime image ships nginx config templates + an entrypoint that
# composes the active nginx.conf from WEBAPP_BASE_URL at container start, so
# the same image works at any prefix.
FROM nginx:alpine
ARG WEBAPP_BASE_URL
ENV WEBAPP_BASE_URL=${WEBAPP_BASE_URL}
RUN apk add --no-cache gettext-envsubst

COPY --from=build /app/build/client /usr/share/nginx/html

# All Docker-time assets live in this directory. Paths below are relative to
# the build context (repo root).
COPY --link docker/root.conf.template    /etc/nginx/conf.d/nginx-root.conf.template
COPY --link docker/subpath.conf.template /etc/nginx/conf.d/nginx-subpath.conf.template
COPY --link docker/entrypoint.sh        /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD []
ENTRYPOINT ["/docker-entrypoint.sh"]

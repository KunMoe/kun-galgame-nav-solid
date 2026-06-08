# kun-galgame-nav — SolidStart (vinxi → Nitro node-server preset).
#
# Standalone repo (NOT a pnpm workspace). Three stages:
#   deps  → install only (native deps: esbuild / @tailwindcss/oxide / @parcel/watcher
#           are whitelisted in package.json "pnpm.onlyBuiltDependencies")
#   build → vinxi build → self-contained .output
#   run   → just Node + .output/server/index.mjs (no pnpm, no sources)
#
# The site has NO browser-facing runtime config to bake (links are literal),
# so there are no PUBLIC_* build args — unlike the infra Nuxt frontends.
ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-trixie-slim AS base
RUN corepack enable
WORKDIR /app

# ---- deps: install the full dependency graph (with lockfile) ----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- build: copy sources over the installed node_modules, then build ----
FROM deps AS build
COPY . .
RUN pnpm build

# ---- run: Node + the self-contained .output only ----
FROM node:${NODE_VERSION}-trixie-slim AS run
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
WORKDIR /app
COPY --from=build /app/.output ./.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

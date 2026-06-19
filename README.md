# Nx Express API Template

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A production-ready Node.js Express API starter with shared libraries, module boundary enforcement, and Docker support - built for teams who want structure from day one.
<!-- BEGIN: nx-cloud -->
🚀 If you haven't connected to Nx Cloud yet, [complete your setup here](https://cloud.nx.app/get-started). Get faster builds with remote caching, distributed task execution, and self-healing CI. [See how your workspace can benefit](#nx-cloud).
<!-- END: nx-cloud -->

## Quick Start

### Use this template

```sh
npx create-nx-workspace@latest my-workspace --template nrwl/express-api-template
```

### Or bootstrap from scratch

```sh
npx create-nx-workspace@latest my-api --preset=express --appName=api --docker=true --nxCloud=skip
```

### Run the API

```sh
# Install dependencies
npm install

# Start dev server (watch mode)
npx nx run @express-api-template/api:serve

# Build for production
npx nx run @express-api-template/api:build

# Run all builds
npx nx run-many -t build

# Run tests
npx nx run-many -t test

# Visualize the project graph
npx nx graph
```

API is available at `http://localhost:3333` with these routes:

| Method | Path             | Description              |
|--------|------------------|--------------------------|
| GET    | /api/health      | Health check + uptime    |
| GET    | /api/items       | List all items           |
| POST   | /api/items       | Create an item           |
| GET    | /api/items/:id   | Get one item by ID       |
| DELETE | /api/items/:id   | Delete an item by ID     |

### Docker

```sh
# Build production image (runs prune + copy-workspace-modules first)
npx nx run @express-api-template/api:docker:build

# Run the container
docker run -p 3333:3333 express-api-template:latest
```

---

## What's Inside

```
express-api-template/
- apps/
  - api/                    # Express application (scope:api, type:app)
    - src/
      - controllers/        # Route handlers (health, items)
      - routes/             # Express Router definitions
      - main.ts             # Entry point
    - Dockerfile            # Multi-stage production image
  - api-e2e/                # End-to-end tests
- packages/
  - util/                   # Shared utility library (scope:shared, type:util)
    - src/lib/util.ts       # ApiResponse type + helper fns
```

The `@express-api-template/util` library exports typed response helpers used across the API:

```ts
import { successResponse, errorResponse, notFoundResponse } from '@express-api-template/util';

res.json(successResponse({ id: 1, name: 'Widget' }));
// -> { success: true, data: { id: 1, name: 'Widget' }, timestamp: '...' }
```

---

## Featured Nx Capabilities

### Computation Cache

Nx caches every task output locally. Re-run `npx nx run @express-api-template/api:build` instantly after a clean run - it replays from cache. With Nx Cloud the cache is shared across your whole team.

### Affected Commands

Only rebuild what changed:

```sh
# Test only what's affected by your branch
npx nx affected -t test

# Lint only affected projects
npx nx affected -t lint
```

### Module Boundary Enforcement

ESLint rules in `eslint.config.mjs` enforce the dependency graph via tags:

- `type:util` libs can only depend on other `type:util` libs
- `type:app` apps can depend on any lib type
- Violations fail `nx lint` immediately, no runtime surprises

Add a new lib with tags and the rules enforce automatically:

```sh
npx nx g @nx/js:lib packages/db --bundler=tsc --tags="scope:api,type:data-access"
```

### @nx/express Plugin

- Inferred `build`, `serve`, `test`, `lint` targets from config
- `prune-lockfile` + `copy-workspace-modules` targets for lean Docker images
- Hot-reload dev server for local development

---

## Adding More Projects

```sh
# Add another Express app
npx nx g @nx/express:app apps/admin

# Add a data-access lib
npx nx g @nx/js:lib packages/db --bundler=tsc --tags="scope:api,type:data-access"

# Add a utility lib
npx nx g @nx/js:lib packages/config --bundler=tsc --tags="scope:shared,type:util"
```

---

## Nx Cloud

Nx Cloud makes CI fast and reliable.

- **Remote cache** - Every build/test result is stored in a shared cache. A PR that only touches `packages/util` won't rebuild the API app - Nx replays the cached output in milliseconds.
- **Distributed task execution (DTE)** - Large workspaces can split tasks across multiple CI agents automatically. The project graph determines what can run in parallel, and Nx Cloud orchestrates the distribution.
- **Flaky task detection** - Nx Cloud tracks task run history. When a test flakes it is flagged, automatically retried, and reported - so you know which tests need fixing vs which failures are real regressions.

Connect: `npx nx connect` -> https://cloud.nx.app

Learn more at [https://nx.dev/nx-cloud](https://nx.dev/nx-cloud).

---

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/docs/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 🔗 Learn More

- [Nx Documentation](https://nx.dev/docs)
- [Crafting Your Workspace Tutorial](https://nx.dev/docs/getting-started/tutorials/crafting-your-workspace)
- [Module Boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
- [Express Documentation](https://expressjs.com)
- [Docker Integration](https://nx.dev/docs/guides/nx-release/release-docker-images)
- [Nx Cloud](https://nx.dev/nx-cloud)

## 💬 Community

Join the Nx community:

- [Discord](https://go.nx.dev/community)
- [X (Twitter)](https://twitter.com/nxdevtools)
- [LinkedIn](https://www.linkedin.com/company/nrwl)
- [YouTube](https://www.youtube.com/@nxdevtools)
- [Blog](https://nx.dev/blog)

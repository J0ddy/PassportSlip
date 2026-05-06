# Development guide

## Requirements

- Runtime: `{{RUNTIME_VERSION}}`
- Package manager: `{{PACKAGE_MANAGER}}`
- Container runtime: `{{Docker / Podman}}`
- Database: `{{DATABASE}}`

## Setup

```bash
git clone {{REPOSITORY_URL}}
cd {{PROJECT_SLUG}}
{{PACKAGE_MANAGER}} install
cp .env.example .env.local
{{PACKAGE_MANAGER}} dev
```

## Recommended editor

Use Visual Studio Code with the recommended extensions in `.vscode/extensions.json`.

## Dev container

If this project includes `.devcontainer/`, prefer the containerised development environment.

```bash
code .
# Command palette:
# Dev Containers: Reopen in Container
```

## Common commands

| Command | Purpose |
|---|---|
| `{{PACKAGE_MANAGER}} dev` | Start development |
| `{{PACKAGE_MANAGER}} lint` | Lint source |
| `{{PACKAGE_MANAGER}} typecheck` | Type-check source |
| `{{PACKAGE_MANAGER}} test` | Run tests |
| `{{PACKAGE_MANAGER}} verify` | Run all checks |

## Package manager policy

Default to `pnpm` unless the project is explicitly Bun-first.

Rules:

- Do not mix lockfiles.
- Do not add dependencies without justification.
- Prefer standard library or existing utilities where practical.
- Pin major tooling versions through `packageManager`.

## Branching

- `main` should remain releasable.
- Use short-lived feature branches.
- Keep pull requests focused.

## Troubleshooting

| Problem | First check |
|---|---|
| dependencies fail | lockfile, package manager version |
| tests fail locally only | environment variables, database state |
| Docker fails | container logs, port conflicts |
| type errors after install | generated types, package versions |

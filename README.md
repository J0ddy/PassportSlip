# Passport Slip

> A cross-platform mobile app (iOS + Android) that connects directly to a Phomemo thermal printer over Bluetooth and prints styled boarding passes.

## Overview

{{PROJECT_NAME}} is {{SHORT_DESCRIPTION}}.

Use this README for humans. Use `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md` for coding agents.

## Status

- Stage: {{prototype | private beta | production | archived}}
- Owner: {{OWNER_OR_TEAM}}
- Main contact: {{CONTACT_EMAIL}}
- Repository: {{REPOSITORY_URL}}
- Production URL: {{PRODUCTION_URL}}
- Documentation: `docs/`

## Features

- {{FEATURE_1}}
- {{FEATURE_2}}
- {{FEATURE_3}}

## Tech stack

| Area | Choice |
|---|---|
| Runtime | {{Node.js / Bun / Python / Go / Java / etc.}} |
| Package manager | {{pnpm / bun / npm / yarn}} |
| Front end | {{Next.js / React / Vue / etc.}} |
| Back end | {{API / Workers / Rails / Spring / etc.}} |
| Database | {{PostgreSQL / SQLite / MySQL / etc.}} |
| Hosting | {{Cloudflare / Hetzner / AWS / etc.}} |

## Quick start

```bash
{{PACKAGE_MANAGER}} install
{{PACKAGE_MANAGER}} dev
```

## Verification

```bash
{{PACKAGE_MANAGER}} verify
```

`verify` should run linting, type checking, tests, and any project-specific safety checks.

## Project structure

```text
.
├─ AGENTS.md
├─ CLAUDE.md
├─ docs/
├─ .ai/
├─ .github/
└─ src/
```

## Environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Never commit real secrets.

## Common commands

| Command | Purpose |
|---|---|
| `{{PACKAGE_MANAGER}} dev` | Start local development |
| `{{PACKAGE_MANAGER}} lint` | Run linting |
| `{{PACKAGE_MANAGER}} typecheck` | Run type checking |
| `{{PACKAGE_MANAGER}} test` | Run tests |
| `{{PACKAGE_MANAGER}} verify` | Run all checks |

## Documentation map

- `docs/ARCHITECTURE.md` — system structure and major design choices
- `docs/DEVELOPMENT.md` — local setup and development workflow
- `docs/TESTING.md` — test strategy and how to run tests
- `docs/DEPLOYMENT.md` — deployment and rollback process
- `docs/RUNBOOK.md` — operational recovery steps
- `docs/SECURITY_MODEL.md` — threat model and security assumptions
- `docs/PRIVACY.md` — data handling and retention notes
- `docs/MCP.md` — allowed MCP tools and safety rules
- `docs/AI_MEMORY.md` — how AI memory is managed
- `docs/MEMPALACE.md` — MemPalace installation and project usage

## Contributing

See `CONTRIBUTING.md`.

## Security

Do not report vulnerabilities through public issues. See `SECURITY.md`.

## Licence

{{LICENCE_NAME}}. See `LICENCE` if included.

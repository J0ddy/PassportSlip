# AGENTS.md

This file is the project operating manual for coding agents.

## Project identity

- Project: `{{PROJECT_NAME}}`
- Owner: `{{OWNER_OR_TEAM}}`
- Stage: `{{prototype | private beta | production | archived}}`
- Primary stack: `{{STACK_SUMMARY}}`
- Package manager: `{{pnpm | bun | npm | yarn}}`

## First files to read

Read in this order:

1. `README.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DEVELOPMENT.md`
4. `.ai/handoff.md`, if present
5. The smallest set of source files relevant to the task

Do not scan the whole repository unless the task genuinely requires it.

## Non-negotiable safety rules

- Never read, print, edit, commit, or exfiltrate secrets.
- Never modify `.env*`, private keys, credentials, tokens, billing config, or production deployment secrets.
- Never weaken authentication, authorisation, validation, logging, rate limits, or audit trails without explicitly calling it out.
- Never run destructive commands without explicit approval.
- Never add a dependency unless the reason is clear and the risk is acceptable.
- Never make unrelated style-only rewrites while fixing a bug.

## Commands

```bash
{{PACKAGE_MANAGER}} install
{{PACKAGE_MANAGER}} dev
{{PACKAGE_MANAGER}} lint
{{PACKAGE_MANAGER}} typecheck
{{PACKAGE_MANAGER}} test
{{PACKAGE_MANAGER}} verify
```

`{{PACKAGE_MANAGER}} verify` is the default final check before claiming completion.

## Coding standards

- Prefer small, reviewable changes.
- Preserve existing architecture unless asked to refactor.
- Prefer clear names over clever abstractions.
- Add tests for behavioural changes.
- Handle errors explicitly.
- Avoid hidden network calls in tests.
- Avoid global state unless justified.
- Keep public APIs backwards compatible unless the task is a breaking change.

## Search and context rules

Before editing:

1. Run `git status --short`.
2. Use targeted search with `rg`.
3. Read only relevant files.
4. Summarise the plan briefly.
5. Edit the smallest safe surface area.
6. Run the narrowest relevant test first.
7. Run `{{PACKAGE_MANAGER}} verify`.

Do not paste or inspect large generated files, lockfiles, coverage output, build output, or vendor folders unless strictly necessary.

## Token-saving rules

Avoid loading:

- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `.turbo/`
- `coverage/`
- generated clients
- lockfiles, unless dependency resolution is the task
- binary files

Prefer:

- `git diff --stat`
- `git diff -- path/to/file`
- focused stack traces
- failing test names
- exact package versions

## MCP usage rules

Use MCP only when it provides clear value.

Allowed by default:

- Local Playwright/browser testing against development URLs
- Documentation lookup through trusted documentation MCPs
- Read-only repository inspection

Ask before:

- Opening external sites
- Submitting forms
- Authenticating into third-party services
- Creating issues, comments, pull requests, or releases
- Mutating cloud, billing, DNS, production, or database state

Never use MCP to access secrets, production credentials, private keys, payment systems, customer data, or unrelated personal files.

## AI memory rules

Durable memory belongs in `.ai/`, Obsidian, ADRs, or documented project notes.

Do not save:

- secrets
- credentials
- raw logs with personal data
- private customer data
- unverified claims as facts

Save:

- accepted decisions
- architecture notes
- recurring debugging lessons
- project conventions
- setup instructions
- handoff summaries

## Definition of done

A task is done only when:

- The requested behaviour is implemented.
- Relevant tests pass.
- Lint and type checks pass, or failures are documented.
- The diff is minimal and explainable.
- Risky changes are highlighted.
- `.ai/handoff.md` is updated for multi-step work.


## MemPalace rules

MemPalace is the default long-term local memory layer for this project.

Before using MemPalace:

- Read repository truth first where possible.
- Treat retrieved memories as context, not proof.
- Verify memories against current files, tests, commits and ADRs.
- Prefer project-scoped commands with `--wing {{PROJECT_SLUG}}`.

Allowed commands:

- `mempalace wake-up --wing {{PROJECT_SLUG}}`
- `mempalace search "{{QUERY}}" --wing {{PROJECT_SLUG}}`
- `mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff`
- `mempalace mine docs/adr/ --wing {{PROJECT_SLUG}} --room decisions`
- `mempalace mine docs/ --wing {{PROJECT_SLUG}} --room docs`

Ask before:

- mining the whole repository
- mining conversation exports
- enabling automatic hooks
- storing client data
- writing memory that may persist sensitive context

Never mine:

- `.env*`
- private keys
- credentials
- tokens
- database dumps
- payment data
- unrelated personal files

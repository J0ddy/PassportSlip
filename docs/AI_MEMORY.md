# AI memory strategy

## Goal

Keep project memory useful, small, accurate, and portable.

## Memory layers

| Layer | Location | Purpose |
|---|---|---|
| Agent rules | `AGENTS.md`, `CLAUDE.md` | always-loaded behaviour |
| Handoff | `.ai/handoff.md` | current session/project state |
| Context notes | `.ai/context/` | topic-specific memory |
| ADRs | `docs/adr/` | accepted architecture decisions |
| Obsidian | AI Memory Vault | human-curated long-term notes |
| Vector memory | Qdrant or similar | semantic retrieval |

## Always-loaded memory

Keep these short:

- `AGENTS.md`
- `CLAUDE.md`
- `.github/copilot-instructions.md`

Avoid turning them into encyclopaedias.

## On-demand memory

Use `.ai/context/` for:

- auth notes
- billing notes
- deployment notes
- Cloudflare notes
- Docker/MCP notes
- tricky debugging lessons
- framework-specific patterns

## Handoff format

Update `.ai/handoff.md` after long or interrupted work.

Include:

- goal
- current state
- files touched
- commands run
- open questions
- next safest step

## Obsidian rules

Use a dedicated AI Memory Vault, not a whole personal vault.

Allowed notes:

- project decisions
- reusable prompts
- debugging lessons
- business/project plans
- architecture notes
- release summaries

Forbidden notes:

- secrets
- credentials
- raw private customer data
- confidential logs
- private personal documents

## Memory hygiene

Review memory monthly.

Remove:

- stale decisions
- wrong assumptions
- duplicate notes
- temporary scratchpads
- outdated commands

Prefer short, dated notes with links to source files or ADRs.


## MemPalace policy

MemPalace is the preferred long-term AI memory layer for this project.

Use it for:

- semantic search over durable project notes
- recalling previous decisions
- retrieving handoff context
- searching old architecture discussions
- keeping local memory available across Claude, Codex and MCP clients

Do not treat MemPalace as proof. Retrieved memory must be verified against current repository files, tests, ADRs and commits.

Recommended project commands:

```bash
mempalace wake-up --wing {{PROJECT_SLUG}}
mempalace search "project decision" --wing {{PROJECT_SLUG}}
mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff
mempalace mine docs/adr/ --wing {{PROJECT_SLUG}} --room decisions
mempalace mine docs/ --wing {{PROJECT_SLUG}} --room docs
```

See `docs/MEMPALACE.md`.

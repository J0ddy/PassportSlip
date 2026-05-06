# CLAUDE.md

@AGENTS.md

## Claude Code project memory

Use this file for Claude-specific behaviour only. Shared project instructions belong in `AGENTS.md`.

## Working mode

For multi-file or risky tasks:

1. Start with a short plan.
2. Identify the files likely to change.
3. Explain the risk level.
4. Ask before destructive shell commands.
5. Use minimal edits.
6. Review the diff before finalising.

For simple one-file tasks, make the change directly and verify it.

## Context loading order

1. `AGENTS.md`
2. `README.md`
3. `docs/ARCHITECTURE.md`
4. `.ai/handoff.md`
5. Relevant files only

Do not load large generated files, dependency folders, build output, or unrelated documentation.

## Preferred Claude behaviours

- Use plan mode for ambiguous or high-risk changes.
- Use subagents for noisy research, dependency review, or large log analysis.
- Keep summaries short and actionable.
- Prefer appending to `.ai/handoff.md` over expanding this file.
- Do not turn this file into a giant knowledge dump.

## Permissions posture

Ask before:

- installing dependencies
- running migrations
- deleting files
- changing Git history
- pushing branches
- changing deployment config
- modifying authentication, billing, permissions, or security-sensitive code

Deny:

- reading `.env*`
- reading private keys
- printing tokens
- modifying production credentials
- running `curl | sh` or equivalent install scripts without approval

## Memory update rule

At the end of a long session, update `.ai/handoff.md` with:

- goal
- current state
- files touched
- commands run
- known failures
- next safest step


## MemPalace workflow

At the start of a long session, retrieve compact project memory:

```bash
mempalace wake-up --wing {{PROJECT_SLUG}}
```

Search only when useful:

```bash
mempalace search "{{QUERY}}" --wing {{PROJECT_SLUG}}
```

At the end of a long session:

1. Update `.ai/handoff.md`.
2. Add an ADR if a durable architecture decision was made.
3. Mine durable notes only:

```bash
mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff
mempalace mine docs/adr/ --wing {{PROJECT_SLUG}} --room decisions
```

Do not use retrieved memory as fact until verified against the repository.

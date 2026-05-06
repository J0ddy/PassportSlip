# MCP policy

## Purpose

This document defines which MCP servers may be used with this project and under what restrictions.

## Default stance

MCP tools are powerful and should be treated like executable integrations.

Use the least powerful MCP server that can complete the task.

## Approved MCP servers

| MCP | Purpose | Default permission |
|---|---|---|
| Docker MCP Gateway | profile-based local MCP runtime | allowed |
| Playwright MCP | local browser testing | allowed for localhost |
| Context7 MCP | current library documentation | allowed |
| GitHub MCP | repository/issues/PRs | read-only by default |
| Memory MCP | small durable facts | allowed with review |
| Qdrant MCP | semantic project memory | allowed with review |
| Obsidian MCP | human-curated notes | allowed only for AI Memory Vault |

## Docker MCP profile

Recommended profile:

```text
web-dev
```

Suggested servers:

- Playwright
- Context7
- GitHub, read-only where possible

## Allowed by default

- Inspect localhost web app with Playwright.
- Look up current library documentation.
- Read public repository metadata.
- Retrieve project memory that is relevant to the task.

## Ask first

- Open external websites.
- Submit forms.
- Download files.
- Authenticate into third-party services.
- Create issues, comments, pull requests, or releases.
- Mutate database, cloud, DNS, billing, or production systems.

## Never allow

- Reading `.env*`
- Reading private keys
- Accessing payment dashboards
- Mutating production infrastructure
- Accessing unrelated personal files
- Sending private customer data to external services

## Playwright MCP rules

Before using Playwright:

1. Confirm the target URL.
2. Prefer local development URLs.
3. Inspect the page before interacting.
4. Report console errors separately.
5. Do not submit destructive forms without approval.

## Memory MCP rules

Memory is for durable facts only.

Do not save:

- secrets
- credentials
- private user data
- unverified claims
- raw logs
- temporary scratchpad text

Save:

- accepted conventions
- architecture decisions
- recurring setup notes
- stable preferences
- long-lived project facts


## MemPalace MCP

MemPalace is approved for local-first project memory.

Allowed:

- project-scoped wake-up context
- memory search for previous decisions
- retrieval of handoff notes
- retrieval of architecture and ADR context
- agent diary reads/writes for durable work notes

Ask first:

- mining large folders
- mining conversation exports
- storing client/project data
- enabling automatic Claude Code hooks
- writing new memory that may include sensitive information

Never:

- mine `.env*`
- mine credentials
- mine private keys
- mine database dumps
- mine unrelated personal files
- treat memory as more authoritative than current repo files

Preferred commands:

```bash
mempalace wake-up --wing {{PROJECT_SLUG}}
mempalace search "query" --wing {{PROJECT_SLUG}}
mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff
mempalace mine docs/adr/ --wing {{PROJECT_SLUG}} --room decisions
```

See `docs/MEMPALACE.md`.

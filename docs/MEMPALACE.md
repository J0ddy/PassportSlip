# MemPalace setup

## Purpose

MemPalace is the default long-term AI memory layer for this project.

Use it for searchable, local-first project memory across Claude Code, Codex, VS Code, MCP-compatible tools, and local models.

## What MemPalace is for

Use MemPalace for:

- recalling previous project decisions
- finding old implementation context
- searching handoff notes
- locating architecture discussions
- mining project documentation
- retrieving Claude/Codex session context
- keeping durable local memory outside any single AI platform

Do not use MemPalace as the source of truth. The source of truth remains:

- repository files
- tests
- commits
- ADRs
- project documentation
- reviewed Obsidian notes, if used

## What not to store

Never mine or store:

- `.env*`
- API keys
- passwords
- private keys
- production credentials
- database dumps
- customer data without approval
- raw logs containing personal data
- payment details
- unrelated personal notes

## Requirements

- Python 3.9+
- A local Python package environment
- Disk space for the local embedding model and memory index
- Optional: Claude Code, Codex CLI, VS Code, Docker MCP Gateway

## Recommended install

Use `pipx` if available because it keeps CLI tools isolated:

```bash
pipx install mempalace
```

Official simple install:

```bash
pip install mempalace
```

Verify:

```bash
mempalace --version
mempalace status
```

If `mempalace` is not found, check your Python user scripts path or run:

```bash
python -m mempalace --help
```

## Initialise memory for a project

From inside the project:

```bash
mempalace init .
```

Or from anywhere:

```bash
mempalace init /path/to/project
```

## Mine project files

Start narrow:

```bash
mempalace mine docs/ --wing {{PROJECT_SLUG}} --room docs
mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff
mempalace mine docs/adr/ --wing {{PROJECT_SLUG}} --room decisions
```

Mine the project only after exclusions are clean:

```bash
mempalace mine . --wing {{PROJECT_SLUG}}
```

Avoid mining:

```text
node_modules/
dist/
build/
.next/
.turbo/
coverage/
.env*
*.pem
*.key
*.p12
*.pfx
*.sqlite
*.db
```

## Search memory

Search all memory:

```bash
mempalace search "why did we choose pnpm"
```

Search within this project:

```bash
mempalace search "auth decisions" --wing {{PROJECT_SLUG}}
```

Search a topic room:

```bash
mempalace search "Docker MCP Gateway" --wing {{PROJECT_SLUG}} --room docs
```

## Wake-up context

At the start of a coding session:

```bash
mempalace wake-up --wing {{PROJECT_SLUG}}
```

Suggested prompt:

```text
Read AGENTS.md, docs/ARCHITECTURE.md, .ai/handoff.md, and the MemPalace wake-up context for this project.
Then inspect only the files relevant to my task.
```

## Connect Claude Code

Recommended plugin path:

```bash
claude plugin marketplace add milla-jovovich/mempalace
claude plugin install --scope user mempalace
```

Restart Claude Code and verify:

```text
/skills
```

Manual MCP connection:

```bash
claude mcp add mempalace -- python -m mempalace.mcp_server
```

Verify:

```bash
claude mcp list
```

## Connect Codex

Add this to `.codex/config.toml`:

```toml
[mcp_servers.mempalace]
command = "python"
args = ["-m", "mempalace.mcp_server"]
startup_timeout_sec = 20
tool_timeout_sec = 60
enabled = true
```

If your installed version provides the console script, this alternative is cleaner:

```toml
[mcp_servers.mempalace]
command = "mempalace-mcp"
args = []
startup_timeout_sec = 20
tool_timeout_sec = 60
enabled = true
```

Check inside Codex:

```text
/mcp
```

## Connect VS Code

If your VS Code MCP client supports project MCP config:

```json
{
  "servers": {
    "mempalace": {
      "command": "python",
      "args": ["-m", "mempalace.mcp_server"],
      "type": "stdio"
    }
  }
}
```

Keep this separate from Docker MCP Gateway unless you deliberately package MemPalace as a container. MemPalace is personal local memory, so direct local execution is usually clearer.

## Claude auto-save hooks

If using Claude Code heavily, enable MemPalace hooks so important session state is saved before the conversation ends or compacts.

Typical hook purposes:

- save relevant session state at the end of a Claude Code session
- save emergency context before compaction
- preserve decisions, topics, quotes, and code changes

Keep hooks conservative. They should not mine secrets or unrelated files.

## Project policy

```md
## MemPalace rules

Use MemPalace for durable project memory and semantic recall.

Before using memory:
- Read repository truth first where possible.
- Treat retrieved memories as context, not proof.
- Verify against current files and tests.
- Prefer project-scoped search with `--wing {{PROJECT_SLUG}}`.

Before writing memory:
- Save only durable information.
- Prefer short decision notes.
- Include source file, date, and project name where useful.
- Do not store secrets, credentials, personal data, raw logs, or temporary speculation.

Useful commands:
- `mempalace wake-up --wing {{PROJECT_SLUG}}`
- `mempalace search "{{QUERY}}" --wing {{PROJECT_SLUG}}`
- `mempalace mine docs/ --wing {{PROJECT_SLUG}} --room docs`
- `mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff`
```

## Recommended workflow

### Start work

```bash
mempalace wake-up --wing {{PROJECT_SLUG}}
cat AGENTS.md
cat docs/ARCHITECTURE.md
cat .ai/handoff.md
```

### During work

```bash
mempalace search "previous deployment issue" --wing {{PROJECT_SLUG}}
```

### End work

Update:

```text
.ai/handoff.md
docs/adr/ if an important decision was made
CHANGELOG.md if user-visible behaviour changed
```

Then mine the durable notes:

```bash
mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff
mempalace mine docs/adr/ --wing {{PROJECT_SLUG}} --room decisions
```

## Troubleshooting

### `mempalace` command not found

```bash
python -m mempalace --help
```

### MCP server does not start

```bash
python -m mempalace.mcp_server
```

Or, if available:

```bash
mempalace-mcp
```

### Search returns stale results

- Re-mine the relevant folder.
- Narrow by wing.
- Narrow by room.
- Remove stale notes from `.ai/context/` and Obsidian.
- Prefer ADRs for final decisions.

### Memory is too noisy

Start with only:

```bash
mempalace mine docs/ --wing {{PROJECT_SLUG}} --room docs
mempalace mine .ai/ --wing {{PROJECT_SLUG}} --room handoff
```

Avoid mining the full repository until the project structure is clean.

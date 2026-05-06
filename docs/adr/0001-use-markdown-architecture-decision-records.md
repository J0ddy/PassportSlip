# ADR-0001: Use Markdown Architecture Decision Records

## Status

Accepted

## Date

1970-01-01

## Context

The project needs a lightweight way to record important technical decisions, especially decisions that affect architecture, security, deployment, data, or long-term maintainability.

Without decision records, future contributors and AI coding agents may repeat old debates or miss the reason behind existing trade-offs.

## Decision

Use Markdown ADRs stored in `docs/adr/`.

Each ADR should record:

- status
- date
- context
- decision
- options considered
- consequences
- follow-up actions

ADRs should be short and specific. If a decision changes, create a new ADR and mark the old one as superseded rather than rewriting history.

## Consequences

Positive:

- Decisions are versioned with the code.
- Future contributors can understand why the system works as it does.
- AI coding agents have durable, high-signal context.

Negative:

- The team must remember to create ADRs for important decisions.
- Poorly written ADRs can become stale or misleading.

Neutral:

- Small implementation details do not need ADRs.

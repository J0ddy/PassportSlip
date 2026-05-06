# Architecture

## Purpose

This document explains how the system is structured, why it is structured that way, and which decisions matter for future changes.

## System summary

{{PROJECT_NAME}} is composed of:

- {{COMPONENT_1}}
- {{COMPONENT_2}}
- {{COMPONENT_3}}

## Context diagram

```text
User
  ↓
{{Frontend / Client}}
  ↓
{{API / Worker / Server}}
  ↓
{{Database / External APIs}}
```

## Major components

| Component | Responsibility | Key files |
|---|---|---|
| {{COMPONENT}} | {{RESPONSIBILITY}} | `{{PATH}}` |

## Data flow

1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}

## Trust boundaries

| Boundary | Risk | Control |
|---|---|---|
| Browser → API | forged input | validation, auth, CSRF/CORS controls |
| API → database | data integrity | parameterised queries, schema constraints |
| App → external service | service failure | retries, timeouts, circuit breakers |

## Architecture decisions

Architectural decisions are recorded in `docs/adr/`.

Create a new ADR when a decision is:

- difficult to reverse
- security-sensitive
- related to scale, reliability, data model, or deployment
- likely to be questioned later

## Non-goals

- {{NON_GOAL_1}}
- {{NON_GOAL_2}}

## Known constraints

- {{CONSTRAINT_1}}
- {{CONSTRAINT_2}}

## Open questions

- [ ] {{QUESTION_1}}
- [ ] {{QUESTION_2}}

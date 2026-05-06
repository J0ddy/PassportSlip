# Data model

## Overview

This document describes the important entities, relationships, constraints, and retention rules.

## Entities

| Entity | Purpose | Owner |
|---|---|---|
| {{ENTITY}} | {{PURPOSE}} | {{OWNER}} |

## Relationships

```text
{{ENTITY_A}} 1──* {{ENTITY_B}}
```

## Key constraints

- {{CONSTRAINT_1}}
- {{CONSTRAINT_2}}

## Sensitive fields

| Field | Sensitivity | Handling |
|---|---|---|
| {{FIELD}} | {{low/medium/high}} | {{HANDLING}} |

## Retention

| Entity | Retention |
|---|---|
| {{ENTITY}} | {{RETENTION}} |

## Deletion behaviour

Describe:

- soft delete vs hard delete
- cascading behaviour
- backups
- audit logs
- user-request deletion handling

## Migration notes

- Migrations must be reviewed.
- Risky migrations need rollback or mitigation.
- Large migrations need runtime estimates.

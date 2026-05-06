# Testing strategy

## Goals

Tests should protect behaviour, security boundaries, and important integration points without making refactoring unnecessarily painful.

## Test types

| Type | Purpose | Command |
|---|---|---|
| Unit | small isolated logic | `{{PACKAGE_MANAGER}} test` |
| Integration | components working together | `{{PACKAGE_MANAGER}} test:integration` |
| E2E | critical user flows | `{{PACKAGE_MANAGER}} test:e2e` |
| Type checks | type safety | `{{PACKAGE_MANAGER}} typecheck` |
| Lint | consistency and common errors | `{{PACKAGE_MANAGER}} lint` |

## What must be tested

- authentication and authorisation
- billing/payment/webhook logic
- data validation
- migrations
- public APIs
- error handling
- permissions and roles
- critical user journeys

## What should not be tested heavily

- implementation details
- generated code
- third-party internals
- brittle snapshots unless they protect real behaviour

## Test data

- Use deterministic fixtures.
- Do not use production data.
- Do not store personal data in test fixtures.
- Do not rely on external network services in normal test runs.

## Before merging

```bash
{{PACKAGE_MANAGER}} verify
```

If a test is skipped, document why and when it should be re-enabled.

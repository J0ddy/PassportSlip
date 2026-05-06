# Security model

## Scope

This document describes the security assumptions, trust boundaries, and controls for `{{PROJECT_NAME}}`.

## Assets

| Asset | Sensitivity | Notes |
|---|---|---|
| user accounts | high | authentication and identity |
| application data | {{low/medium/high}} | {{DETAILS}} |
| secrets | critical | never stored in Git |
| logs | medium | may contain metadata |

## Actors

| Actor | Permissions |
|---|---|
| anonymous user | {{PERMISSIONS}} |
| authenticated user | {{PERMISSIONS}} |
| admin | {{PERMISSIONS}} |
| system/service account | {{PERMISSIONS}} |

## Trust boundaries

| Boundary | Risk | Control |
|---|---|---|
| client → server | malicious input | validation, auth, rate limits |
| server → database | injection/data corruption | parameterised queries, constraints |
| server → third-party API | token leakage | scoped credentials, logging hygiene |
| CI/CD → production | deployment compromise | least privilege, approvals |

## Authentication

- {{AUTH_METHOD}}
- Sessions/tokens expire after {{DURATION}}
- Passwords, if used, are hashed with {{ALGORITHM}}
- MFA: {{yes/no/planned}}

## Authorisation

- Use server-side checks.
- Do not trust client-provided roles.
- Add negative tests for permission-sensitive code.

## Input validation

- Validate at the boundary.
- Reject unknown or malformed input.
- Normalise where needed.
- Do not rely only on front-end validation.

## Logging

Do not log:

- passwords
- tokens
- private keys
- full payment details
- sensitive personal data

## Rate limiting and abuse controls

- {{RATE_LIMIT_POLICY}}
- {{CAPTCHA_OR_ABUSE_CONTROL}}
- {{BLOCKLIST_OR_REVIEW_FLOW}}

## Dependencies

- Review new dependencies before adding.
- Prefer maintained packages.
- Monitor known vulnerabilities.
- Remove unused dependencies.

## Open risks

- [ ] {{RISK_1}}
- [ ] {{RISK_2}}

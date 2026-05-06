# Security policy

## Reporting a vulnerability

Do not report security vulnerabilities through public issues, discussions, or pull requests.

Report vulnerabilities privately using:

- GitHub private vulnerability reporting, if enabled; or
- Email: `{{SECURITY_EMAIL}}`

Include as much detail as possible:

- affected component
- steps to reproduce
- impact
- proof of concept, if safe to share
- suggested mitigation, if known
- your contact details for follow-up

## Supported versions

| Version | Supported |
|---|---|
| `main` | Yes |
| latest stable release | Yes |
| older releases | Best effort |

## Response targets

These are targets, not guaranteed service-level commitments.

| Stage | Target |
|---|---|
| Acknowledge report | within 3 working days |
| Initial assessment | within 7 working days |
| Fix or mitigation plan | depends on severity |
| Public disclosure | coordinated after mitigation |

## Disclosure policy

- Please give maintainers reasonable time to investigate and fix the issue.
- Do not access, modify, or delete data that does not belong to you.
- Do not perform denial-of-service testing.
- Do not publish exploit details before a fix or mitigation is available.
- We will credit reporters where appropriate and requested.

## Security expectations for contributors

- Do not commit secrets.
- Do not weaken authentication or authorisation checks.
- Do not bypass validation to make tests pass.
- Add negative tests for permission-sensitive changes.
- Treat logs, analytics, exports, and debug output as potential data leaks.

## Secret handling

Never commit:

- `.env` files
- private keys
- API tokens
- database dumps
- production credentials
- session cookies
- OAuth client secrets

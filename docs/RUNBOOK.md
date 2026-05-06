# Runbook

This document explains what to do when something breaks.

## Incident levels

| Level | Meaning | Example |
|---|---|---|
| Low | minor issue, workaround exists | broken non-critical UI |
| Medium | degraded service | slow responses, partial outage |
| High | critical user impact | login broken, payments failing |
| Critical | data loss/security risk | breach, data corruption |

## First response checklist

1. Confirm the issue.
2. Check recent deployments.
3. Check logs and metrics.
4. Identify affected users/systems.
5. Decide whether to roll back.
6. Preserve evidence for security incidents.
7. Write a short incident note.

## Common incidents

### App unavailable

Checks:

```bash
{{HEALTHCHECK_COMMAND}}
{{LOGS_COMMAND}}
```

Possible actions:

- restart service
- roll back deployment
- check database connectivity
- check DNS/proxy/CDN

### Database issue

Checks:

- connection limits
- slow queries
- migration status
- disk usage
- backups

### Authentication issue

Checks:

- session cookie settings
- OAuth provider status
- token expiry
- recent auth-related deploys

## Post-incident review

Record:

- timeline
- root cause
- impact
- what worked
- what failed
- follow-up actions

# Observability

## Goals

Observability should help answer:

- Is the service up?
- Is it slow?
- Are users affected?
- What changed recently?
- Is there a security or abuse signal?

## Health checks

| Check | URL/Command | Expected |
|---|---|---|
| app health | `{{HEALTHCHECK}}` | `ok` |
| database | `{{DB_CHECK}}` | connected |

## Logs

Log:

- request ID
- error code
- safe metadata
- timing
- important state transitions

Do not log:

- secrets
- tokens
- passwords
- full personal data
- payment details

## Metrics

| Metric | Reason |
|---|---|
| request count | traffic |
| error rate | reliability |
| latency | performance |
| auth failures | abuse/security |
| queue depth | background work |

## Alerts

| Alert | Threshold | Action |
|---|---|---|
| high error rate | {{THRESHOLD}} | check logs, rollback if deployment-related |
| database unavailable | {{THRESHOLD}} | check provider/status, failover if available |
| auth spike | {{THRESHOLD}} | check abuse/rate limits |

## Dashboards

- {{DASHBOARD_LINK_1}}
- {{DASHBOARD_LINK_2}}

# Deployment guide

## Environments

| Environment | Purpose | URL |
|---|---|---|
| local | development | `http://localhost:{{PORT}}` |
| staging | release testing | `{{STAGING_URL}}` |
| production | live users | `{{PRODUCTION_URL}}` |

## Release checklist

- [ ] Pull request reviewed.
- [ ] `{{PACKAGE_MANAGER}} verify` passes.
- [ ] Database migrations reviewed.
- [ ] Environment variables checked.
- [ ] Rollback plan documented.
- [ ] Changelog updated.
- [ ] Monitoring checked.

## Deployment steps

```bash
{{DEPLOY_COMMAND}}
```

## Rollback

```bash
{{ROLLBACK_COMMAND}}
```

Rollback notes:

- {{ROLLBACK_NOTE_1}}
- {{ROLLBACK_NOTE_2}}

## Database migrations

Before running migrations:

- confirm backup exists
- check migration is backwards compatible where possible
- check expected runtime
- prepare rollback or mitigation

## Secrets

Production secrets must be managed through the hosting provider, secret manager, or secure CI/CD variables.

Never commit secrets to the repository.

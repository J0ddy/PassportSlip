# API documentation

## Overview

This document describes the public and internal APIs for `{{PROJECT_NAME}}`.

## Base URLs

| Environment | URL |
|---|---|
| local | `http://localhost:{{PORT}}` |
| staging | `{{STAGING_API_URL}}` |
| production | `{{PRODUCTION_API_URL}}` |

## Authentication

{{AUTH_DESCRIPTION}}

## Error format

```json
{
  "error": {
    "code": "example_error",
    "message": "Human-readable message",
    "requestId": "req_..."
  }
}
```

## Endpoints

### `GET /health`

Purpose: check service health.

Response:

```json
{
  "status": "ok"
}
```

### `{{METHOD}} {{PATH}}`

Purpose: {{PURPOSE}}

Request:

```json
{}
```

Response:

```json
{}
```

Errors:

| Code | Meaning |
|---|---|
| `400` | invalid request |
| `401` | unauthenticated |
| `403` | forbidden |
| `404` | not found |
| `429` | rate limited |
| `500` | internal error |

## Versioning

{{VERSIONING_POLICY}}

## Rate limits

{{RATE_LIMITS}}

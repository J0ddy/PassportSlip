# Contributing

Thank you for considering a contribution.

## Before you start

1. Check existing issues and pull requests.
2. Open an issue for major changes before writing code.
3. Keep changes focused.
4. Avoid unrelated formatting changes.

## Local setup

```bash
{{PACKAGE_MANAGER}} install
{{PACKAGE_MANAGER}} dev
```

## Development workflow

1. Create a branch from `main`.
2. Make a small, focused change.
3. Add or update tests.
4. Run verification.
5. Open a pull request.

```bash
{{PACKAGE_MANAGER}} lint
{{PACKAGE_MANAGER}} typecheck
{{PACKAGE_MANAGER}} test
{{PACKAGE_MANAGER}} verify
```

## Commit style

Use clear, descriptive commits.

Examples:

```text
fix: handle expired session refresh
feat: add property search filters
docs: document Docker MCP setup
test: cover invalid webhook signatures
```

## Pull request checklist

- [ ] The change is focused.
- [ ] Tests were added or updated.
- [ ] `{{PACKAGE_MANAGER}} verify` passes.
- [ ] Documentation was updated where needed.
- [ ] Security and privacy implications were considered.
- [ ] Breaking changes are clearly marked.

## Coding expectations

- Prefer simple, readable solutions.
- Match existing project patterns.
- Do not introduce unnecessary dependencies.
- Keep public APIs stable unless the change is intentionally breaking.
- Include rollback notes for risky changes.

## Security issues

Do not open public issues for vulnerabilities. See `SECURITY.md`.

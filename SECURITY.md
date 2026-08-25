# Security Policy

## Supported versions

This repository is a maintained fork of the archived [kyantech/Palmr](https://github.com/kyantech/Palmr) project.

Security updates are applied to the default branch of **this fork** only. There is no long-term support matrix beyond the latest published commits/releases here.

## Reporting a vulnerability

Please report security issues privately via GitHub Security Advisories for this repository (Bytelake/Palmr), or contact the fork maintainers through the repository’s private security contact options.

Do **not** open a public issue for vulnerabilities that could expose user data, authentication bypasses, or remote code execution.

Include:

- Affected version / commit
- Description of the issue and impact
- Reproduction steps (proof of concept if available)
- Any suggested remediation

We will acknowledge reports as soon as practical and coordinate disclosure after a fix is available.

## Hardening notes for operators

When deploying:

- Set `SECURE_SITE=true` when serving over HTTPS so auth cookies use the `Secure` flag.
- Set `APP_URL` to your public origin (used for OIDC redirect allowlisting).
- Optionally set `CORS_ORIGIN` to a comma-separated allowlist of trusted web origins.
- Do not publish ports `3333` (API) or `9379` (MinIO) on the public internet unless required; prefer reverse-proxying only the web UI (`5487`).
- Set `STORAGE_URL` for your own host when using internal storage — do not leave demo values.

## Known residual risks

The following are known limitations carried from upstream and are documented rather than fully redesigned in the current security pass:

- UI route guards are client-side; authorization must be enforced by the API (and is for authenticated routes).
- Share / reverse-share passwords may appear in query strings; password-check endpoints lack dedicated rate limiting.
- Multipart and Server Action body size limits are extremely large by design for large file transfers.
- Filesystem encryption remains disabled by default (`DISABLE_FILESYSTEM_ENCRYPTION=true`); rely on disk encryption / S3 provider controls.
- OIDC PKCE/state is stored in an in-memory map (not suitable for multi-instance without sticky sessions or shared state).
- Some transitive npm advisories (often via Next.js / Uppy tooling) may remain at low/moderate severity; Dependabot + `pnpm audit` in CI track them. High/critical findings in direct production dependencies should be cleared before release.

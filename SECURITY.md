# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of PathForward and its users very seriously.

If you discover a security vulnerability within PathForward, please send an email to security@pathforward.dev or report it via private GitHub vulnerability reporting. All security vulnerabilities will be promptly addressed.

### Security Guarantees & Safeguards in PathForward:
- **Zero API Key Leakage**: API credentials are kept strictly in local environments and excluded via `.gitignore`.
- **Input Sanitization**: All chat inputs and form fields are bounded (500 chars max) and sanitized against injection.
- **External Links**: All third-party resource links enforce `rel="noopener noreferrer"` and `HTTPS`.
- **Client-Side Document Parsing**: Resumes uploaded during intake are parsed securely within the client browser without unauthorized transmission.
- **Security Headers**: HTTP security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`) are configured.

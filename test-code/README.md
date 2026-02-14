# CodeQL Test Code

This directory contains **intentionally vulnerable code** used to validate that CodeQL scanning is working correctly on this repository.

**DO NOT use this code in production.** Every file contains deliberate security vulnerabilities designed to trigger CodeQL alerts.

## Structure

### Python (`test-code/python/`)
- `sql_injection.py` — SQL injection via string concatenation
- `command_injection.py` — OS command injection via `os.system()` and `subprocess`
- `path_traversal.py` — Path traversal via unsanitized file paths
- `unsafe_deserialization.py` — Unsafe pickle and YAML deserialization

### JavaScript (`test-code/javascript/`)
- `xss_vulnerable.js` — Cross-site scripting via unsanitized HTML output
- `command_injection.js` — OS command injection via `child_process.exec()`
- `sql_injection.js` — SQL injection via string concatenation
- `prototype_pollution.js` — Prototype pollution via unsafe object merging

## Purpose

These files serve as test fixtures for the CodeQL GitHub Action workflow (`.github/workflows/codeql.yml`). The workflow:
1. Runs CodeQL analysis on both Python and JavaScript code
2. Validates that the scan completes and detects the expected vulnerabilities
3. Reports a summary of alerts found

This enables verification that the security scanning pipeline is functioning correctly.

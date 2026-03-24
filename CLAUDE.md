# Claude Global Instructions

This repository uses modular agent instructions.

Load base agent files only when the task directly requires them. Do not read all files unconditionally.

| Trigger condition | File to load |
|---|---|
| Analyzing code, understanding structure, debugging | `agents/base/analysis.md` |
| Writing or reviewing a git commit message | `agents/base/commit.md` (**REQUIRED**: Read this file before creating any commit — no exceptions) |
| Creating or reviewing a pull request | `agents/base/pr.md` |
| Performing a release or version bump | `agents/base/release.md` |
| Unsure about the development workflow or task sequence | `agents/base/workflow.md` |
| Starting a new task or doing branch-related work | `agents/base/branch.md` |
| Writing, reviewing, or analyzing any test code | `agents/base/testing.md` |
| Performing overhaul-specific library analysis | `agents/overhaul/library-analysis.md` |

If the branch starts with `v*/`, also load the corresponding agent from `agents/overhaul/`.

---

## External Documentation Policy

When referencing library APIs, framework behavior, or any external documentation:

- Always use the **context7 MCP** to fetch the latest version of the relevant docs
- Do not rely on training knowledge for library specifics — it may be outdated
- Query context7 before implementing anything that depends on a third-party API

This policy applies to **all** of the following situations — not just implementation:

- Verifying whether a specific API, method, or assertion exists in a library
- Reviewing test code for correctness against the library's actual API
- Analyzing bugs or defects that involve third-party behavior
- Confirming that a pattern or usage is valid for the version in use

**Never report a finding about a library API without first confirming it via context7.**

---

## Duplication Check Policy

Before performing any task — adding instructions, writing tests, creating triggers, modifying configs, or any other change — always check whether equivalent content already exists.

- Search relevant agent files, config files, and documentation before adding anything new
- If an agent file references another file in its References section, do not add a redundant trigger for the referenced file; load the parent agent and follow its references
- If content already exists that covers the intent, update or extend it rather than duplicating

This applies to all work, not just documentation.

---

## Agent Priority Order

When multiple instruction sources exist, follow this priority:

1. agents/base/\*
2. agents/overhaul/\*
3. repository documentation

Overhaul agents may extend or override base workflows when necessary.

---

## Repository Workflow Rules

All development work must follow this loop:

ANALYZE
PLAN
IMPLEMENT
TEST
CREATE PR
REVIEW
MERGE
REPEAT

---

## Localization & Language Policy

- **Primary Language**: All project-related communications and artifacts must be in **English only**.
- **Prohibited**: Do not use Korean in any of the following tasks:
  - Git commit messages
  - Pull Request titles and descriptions
  - README.md updates or any documentation
  - Code comments and inline documentation

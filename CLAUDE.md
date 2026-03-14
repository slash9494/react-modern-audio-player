# Claude Global Instructions

This repository uses modular agent instructions.

Before performing any task, follow the steps below.

---

# Step 1 — Always Load Base Agents

Always read all instruction files inside:

agents/base/

These files define the core development rules for the repository and must always be followed.

---

# Step 2 — Detect Current Branch

Check the current git branch.

Different branches may activate additional agent instructions.

---

# Step 3 — Overhaul Branch Rules

If the current branch name starts with:

overhaul-

Then load the corresponding overhaul agent instructions located in:

agents/overhaul/

Example mappings:

overhaul-v2 → agents/overhaul/overhaul-v2.md  
overhaul-v3 → agents/overhaul/overhaul-v3.md  
overhaul-v4 → agents/overhaul/overhaul-v4.md

If a matching overhaul agent exists, read and follow its instructions.

---

# Agent Priority Order

When multiple instruction sources exist, follow this priority:

1. agents/base/\*
2. agents/overhaul/\*
3. repository documentation

Overhaul agents may extend or override base workflows when necessary.

---

# Repository Workflow Rules

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

# Branch Naming Conventions

main
→ stable releases

develop
→ normal development

overhaul-v*
→ large scale refactoring or architecture overhaul

feature branches should follow:

feat/*
fix/*
refactor/*
test/*
ci/*
docs/*

---

## Localization & Language Policy

- **Primary Language**: All project-related communications and artifacts must be in **English only**.
- **Prohibited**: Do not use Korean in any of the following tasks:
  - Git commit messages
  - Pull Request titles and descriptions
  - README.md updates or any documentation
  - Code comments and inline documentation

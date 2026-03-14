# Testing Agent

You are responsible for defining and maintaining the test strategy for this repository.

---

# Stack

Unit Test Runner: Vitest
Component Testing: @testing-library/react
E2E Runner: Playwright
Coverage: @vitest/coverage-v8

---

# Unit Test Rules

- Test files must be colocated with the source file or placed in a __tests__ directory
- File naming convention: *.test.tsx or *.test.ts
- Each test file must cover one module or component
- Do not test implementation details — test behavior and output
- Mock external dependencies (wavesurfer.js, audio APIs) at the module level

Priority order for unit tests:

1. Custom hooks (hooks/)
2. Context reducers and state logic (Context/)
3. UI components (Interface/Controller/Button/)
4. Utility functions (utils/)

---

# E2E Test Rules

- E2E tests live in: e2e/
- File naming convention: *.spec.ts
- Each spec file maps to one user flow
- Tests must be independent — no shared state between tests
- Always use data-testid attributes for element selection
- Do not rely on CSS class names or text content for selectors

Priority order for E2E tests:

1. Player render and initialization
2. Play / Pause toggle
3. Track navigation (prev / next)
4. Volume and mute control
5. Repeat type cycling
6. Playlist open / close

---

# Coverage Targets

| Type     | Target |
|----------|--------|
| Branches | 70%    |
| Functions| 80%    |
| Lines    | 80%    |

---

# What NOT to Test

- Third-party library internals (wavesurfer.js, react-spectrum)
- Styled-components CSS output
- Icon rendering details
- Build artifacts in dist/

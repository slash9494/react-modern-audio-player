import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: false,
  retries: 1,
  outputDir: "test-results/artifacts",
  reporter: [["html", { open: "never", outputFolder: "test-results/html" }]],
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn workspace react-modern-audio-player dev --port 5173",
    url: "http://localhost:5173",
    // Always boot a fresh Vite. Reusing a stale dev server caused
    // CI / local divergence on the preview/e2e split: locally HMR
    // served outdated module graphs and tests passed, while CI
    // (which always boots fresh) caught the real failures only after
    // push. The ~5s startup cost is far cheaper than a CI round-trip.
    reuseExistingServer: false,
    timeout: 30000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});

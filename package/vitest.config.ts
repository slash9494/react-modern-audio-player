import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    clearMocks: true,
    server: {
      deps: {
        inline: [/@react-spectrum\//],
      },
    },
    include: [
      "src/**/*.test.{ts,tsx}",
      "../test/integration/**/*.test.{ts,tsx}",
    ],
    exclude: ["node_modules", "dist"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/test/**",
        "src/index.ts",
        "src/**/*.d.ts",
        "src/styles/**",
      ],
      thresholds: {
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});

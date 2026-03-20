import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";
import libCss from "vite-plugin-libcss";

export default defineConfig({
  plugins: [react(), dts({ outDir: "dist/types", include: "src" }), libCss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-modern-audio-player",
      formats: ["es"],
      fileName: (format) =>
        format === "es" ? `index.es.js` : `index.${format}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "styled-components",
      ],
      output: {
        exports: "named",
      },
    },
    cssCodeSplit: true,
  },
});

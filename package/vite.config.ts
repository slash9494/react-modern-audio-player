import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";
import libCss from "vite-plugin-libcss";

export default defineConfig({
  plugins: [react(), dts({ outputDir: "dist/types" }), libCss()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/styles/*": path.resolve(__dirname, "./src/styles/*"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-modern-audio-player",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es" ? `index.es.js` : `index.${format}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
        exports: "named",
      },
    },
    cssCodeSplit: true,
  },
});

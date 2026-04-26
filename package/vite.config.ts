import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";
import fs from "node:fs";
import libCss from "vite-plugin-libcss";

function clientDirectivePlugin(): Plugin {
  return {
    name: "use-client-directive",
    enforce: "post",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const entry = path.join(distDir, "index.es.js");
      if (fs.existsSync(entry)) {
        const code = fs.readFileSync(entry, "utf-8");
        if (!code.startsWith('"use client"')) {
          fs.writeFileSync(entry, `"use client";\n${code}`);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({ outDir: "dist/types", include: "src" }),
    libCss(),
    clientDirectivePlugin(),
  ],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/ui": path.resolve(__dirname, "./src/ui"),
      "@/api": path.resolve(__dirname, "./src/api"),
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
      ],
      treeshake: { moduleSideEffects: false },
      output: {
        exports: "named",
      },
    },
    cssCodeSplit: true,
  },
});

import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base =
  process.env.GITHUB_PAGES === "true" && repoName ? `/${repoName}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
  root: "demo",
  resolve: {
    alias: {
      "materialui-react-time-picker": path.resolve(__dirname, "src/index.js"),
    },
  },
  build: {
    outDir: "../demo-dist",
    emptyOutDir: true,
  },
});

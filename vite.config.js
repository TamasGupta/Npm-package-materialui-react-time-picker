import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const shared = {
    plugins: [react()],
    resolve: {
      alias: {
        "materialui-react-time-picker": path.resolve(__dirname, "src/index.js"),
      },
    },
  };

  if (command === "serve") {
    return shared;
  }

  return {
    ...shared,
    build: {
      lib: {
        entry: "src/index.js",
        name: "MD3TimePicker",
        formats: ["es", "cjs"],
        cssFileName: "style",
        fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
      },
    },
  };
});

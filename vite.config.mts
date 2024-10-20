/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  clearScreen: false,
  server: {
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
  test: {
    globals: false,
    include: [
      "**/src/test/unit/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/src/test/integration/**/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
    coverage: {
      provider: "v8",
      include: ["src/utils/**"],
    },
    browser: {
      enabled: true,
      headless: true,
      name: "chromium",
      provider: "playwright",
    },
  },
});

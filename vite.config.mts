/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  test: {
    globals: true,
    include: [
      "**/src/test/unit/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/src/test/integration/**/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
    coverage: {
      provider: "v8",
    },
    browser: {
      enabled: true,
      headless: true,
      name: "chromium",
      provider: "playwright",
    },
  },
});

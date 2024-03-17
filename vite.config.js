/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
  ],
  test: {
    globals: true, 
    environment: "jsdom",
    setupFiles: "./setupTests.js"
  }
})


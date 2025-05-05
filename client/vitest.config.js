import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"], // Path to your setup file
  },
  resolve: {
    alias: {
      crypto: resolve(__dirname, "node_modules/crypto-browserify"),
    },
  },
  define: {
    global: {}, // Mock global object for Node.js compatibility
  },
});
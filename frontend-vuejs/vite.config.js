import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: "3000",
    hmr: {
      host: "localhost",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@composables": resolve(__dirname, "./src/composables"),
      "@router": resolve(__dirname, "./src/router"),
      "@store": resolve(__dirname, "./src/store"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@view": resolve(__dirname, "./src/view"),
    },
  },
  plugins: [vue()],
});

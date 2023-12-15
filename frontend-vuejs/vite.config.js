import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

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
      "~": path.resolve(__dirname, "./node_modules"),
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@filter": path.resolve(__dirname, "./src/filter"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@view": path.resolve(__dirname, "./src/view"),
    },
  },
  plugins: [vue()],
});

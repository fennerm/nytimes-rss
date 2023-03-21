import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    manifest: true,
    outDir: path.resolve("./frontend/dist"),
    assetsDir: "",
    rollupOptions: {
      input: {
        main: path.resolve("./frontend/js/index.tsx"),
      },
    },
  },
  root: path.resolve("./frontend"),
  base: "/frontend/",
  server: {
    host: "localhost",
    port: 3000,
    open: false,
    watch: {
      usePolling: true,
      disableGlobbing: false,
    },
    origin: "http://localhost:3000",
  },
});

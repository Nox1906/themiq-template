import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  resolve: {
    alias: {
      "@/design-system": fileURLToPath(
        new URL("./src/design-system", import.meta.url),
      ),
    },
  },
});

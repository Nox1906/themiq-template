import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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

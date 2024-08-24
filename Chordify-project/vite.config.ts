import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    // optional configuration for SVGR
  ],
  build: {
    outDir: "dist", // Default is 'dist', change if different
  },
});

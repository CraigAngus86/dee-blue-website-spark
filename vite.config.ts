
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// This file is only used by Lovable for development
// For production, the project uses Next.js

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configure server
  server: {
    port: 3000,
    host: true,
  },
});

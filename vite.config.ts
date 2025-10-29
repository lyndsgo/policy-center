import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/contexts": "/src/contexts",
      "@/hooks": "/src/hooks",
      "@/layouts": "/src/layouts",
      "@/mocks": "/src/mocks",
      "@/pages": "/src/pages",
      "@/routes": "/src/routes",
      "@/types": "/src/types",
      "@/utils": "/src/utils",
    },
  },
});

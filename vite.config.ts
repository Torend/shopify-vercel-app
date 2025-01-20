import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";
import react from "@vitejs/plugin-react";
import { vercelPreset } from '@vercel/remix/vite';

installGlobals();

export default defineConfig({
  plugins: [
    react(),
    remix({
      ignoredRouteFiles: ["**/.*"],
      routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          route("/", "routes/_index/route.tsx");
          route("/auth/callback", "routes/auth.callback.tsx");
          route("/webhooks/app/uninstalled", "routes/webhooks.app.uninstalled.tsx");
        });
      },
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    host: "localhost",
    hmr: {
      protocol: "ws",
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
});

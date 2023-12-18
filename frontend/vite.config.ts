import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  manifest: {
    name: "Kare rewards",
    short_name: "KareRewards",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    lang: "en",
    scope: "/",
    description:
      "An app that manages users, departments, companies, and rewards",
    icons: [
      {
        src: "icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    theme_color: "#000000",
    orientation: "portrait",
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});

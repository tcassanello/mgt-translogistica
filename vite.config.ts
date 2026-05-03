import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    // Necesario para que react-snap (Chromium 77) pueda parsear el bundle.
    // Fuerza la transpilación de ??, ?. y otras features de ES2020+.
    target: "es2019",
  },
});
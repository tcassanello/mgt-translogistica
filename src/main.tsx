import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import {
  preloadImages,
  CRITICAL_IMAGES,
  HOME_CAROUSEL_IMAGES,
} from "./utils/imagePreload";

preloadImages(CRITICAL_IMAGES).catch((error) => {
  console.warn("Error al precargar imágenes críticas:", error);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    preloadImages(HOME_CAROUSEL_IMAGES).catch(() => {});
  });
} else {
  preloadImages(HOME_CAROUSEL_IMAGES).catch(() => {});
}

const rootElement = document.getElementById("root")!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Si el root ya tiene HTML pre-renderizado (react-snap), hidratamos.
// En desarrollo o sin pre-rendering, montamos normalmente.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

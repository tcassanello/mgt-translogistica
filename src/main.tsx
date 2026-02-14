import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import {
  preloadImages,
  CRITICAL_IMAGES,
  HOME_CAROUSEL_IMAGES,
} from "./utils/imagePreload";

// Precargar imágenes críticas en paralelo cuando la app inicia
preloadImages(CRITICAL_IMAGES).catch((error) => {
  console.warn("Error al precargar imágenes críticas:", error);
});

// Precargar imágenes del home después de que la página esté lista
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    preloadImages(HOME_CAROUSEL_IMAGES).catch(() => {
      // Silent fail para no afectar la experiencia del usuario
    });
  });
} else {
  preloadImages(HOME_CAROUSEL_IMAGES).catch(() => {
    // Silent fail para no afectar la experiencia del usuario
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

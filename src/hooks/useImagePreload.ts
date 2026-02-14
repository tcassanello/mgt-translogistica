import { useEffect } from "react";
import { preloadImages, preloadImagesSequential } from "../utils/imagePreload";

interface UseImagePreloadOptions {
  /** Cargar en paralelo (recomendado para pocas imágenes) o secuencial (para muchas) */
  sequential?: boolean;
  /** Si true, loguea cuando termina */
  debug?: boolean;
}

/**
 * Hook para precargar imágenes en componentes React
 * @param imageSources - Array de URLs de imágenes a precargar
 * @param options - Opciones de precarga
 *
 * Uso:
 * useImagePreload(['/home6.jpeg', '/hom8.jpeg'])
 */
export const useImagePreload = (
  imageSources: string[],
  options: UseImagePreloadOptions = {},
) => {
  const { sequential = false, debug = false } = options;

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;

    const preloadFn = sequential ? preloadImagesSequential : preloadImages;

    preloadFn(imageSources)
      .then(() => {
        if (debug) {
          console.log("✓ Imágenes precargadas:", imageSources);
        }
      })
      .catch((error: unknown) => {
        console.warn("⚠ Error al precargar imágenes:", error);
      });
  }, [imageSources, sequential, debug]);
};

/**
 * Hook más simple para precargar imágenes de una sección específica
 * Usa precarga paralela por defecto
 */
export const useImagePreloadParallel = (imageSources: string[]) => {
  useImagePreload(imageSources, { sequential: false });
};

/**
 * Hook para precargar imágenes solo cuando el usuario interaction
 * Útil para mejorar el rendimiento inicial de la página
 */
export const useImagePreloadOnInteraction = (imageSources: string[]) => {
  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;

    let preloaded = false;

    const preloadOnInteraction = async () => {
      if (preloaded) return;
      preloaded = true;

      try {
        await preloadImages(imageSources);
        document.removeEventListener("click", preloadOnInteraction);
        document.removeEventListener("scroll", preloadOnInteraction);
      } catch (error) {
        console.warn("Error al precargar con interacción:", error);
      }
    };

    document.addEventListener("click", preloadOnInteraction, { once: true });
    document.addEventListener("scroll", preloadOnInteraction, { once: true });

    return () => {
      document.removeEventListener("click", preloadOnInteraction);
      document.removeEventListener("scroll", preloadOnInteraction);
    };
  }, [imageSources]);
};

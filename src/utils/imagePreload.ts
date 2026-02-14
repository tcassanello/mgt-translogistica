/**
 * Utility para precargar imágenes
 * Mejora el rendimiento evitando delays en la carga de imágenes críticas
 */

/**
 * Precargar una única imagen
 * @param src - URL de la imagen
 * @returns Promise que se resuelve cuando la imagen está cargada
 */
export const preloadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

/**
 * Precargar múltiples imágenes en paralelo
 * @param sources - Array de URLs de imágenes
 * @returns Promise que se resuelve cuando todas las imágenes están cargadas
 */
export const preloadImages = (sources: string[]): Promise<string[]> => {
  return Promise.all(sources.map((src) => preloadImage(src).catch(() => src)));
};

/**
 * Precargar imágenes de forma secuencial
 * Útil si no quieres sobrecargar la conexión
 * @param sources - Array de URLs de imágenes
 * @returns Promise que se resuelve cuando todas las imágenes están cargadas
 */
export const preloadImagesSequential = async (
  sources: string[],
): Promise<string[]> => {
  const loaded: string[] = [];
  for (const src of sources) {
    try {
      const result = await preloadImage(src);
      loaded.push(result);
    } catch (error) {
      console.warn(`Failed to preload: ${src}`, error);
      loaded.push(src);
    }
  }
  return loaded;
};

/**
 * Arreglos de imágenes críticas y secundarias del sitio
 * Organizar así facilita gestionar qué precargar
 */
export const CRITICAL_IMAGES = [
  "/hero.jpg", // Hero principal en Home
  "/logo.png", // Logo del sitio
];

export const EMPRESA_IMAGES = [
  "/Ford4000.jpg",
  "/claudito.jpg",
  "/RangerNieve.jpg",
  "/Saveiro1.jpeg",
];

export const HOME_CAROUSEL_IMAGES = [
  "/hom8.jpeg",
  "/home6.jpeg",
  "/Ford4000 Barco.jpg",
  "/home7.jpeg",
  "/home5.jpeg",
  "/home4.jpeg",
  "/home2.webp",
];

export const SERVICIOS_IMAGES = [
  "/pasto.jpeg",
  "/nieve.jpeg",
  "/camionBrazo.jpeg",
  "/Ford4000.jpg",
];

export const LOGO_CAROUSEL_IMAGES = [
  "empresas/4-Photoroom.png",
  "empresas/2-Photoroom.png",
  "empresas/9-Photoroom.png",
  "empresas/10-Photoroom.png",
  "empresas/6-Photoroom.png",
  "empresas/8-Photoroom.png",
  "empresas/3-Photoroom.png",
  "empresas/5-Photoroom.png",
  "empresas/brande-scaled.png",
  "empresas/7-Photoroom.png",
];

/**
 * Combinar todas las imágenes por prioridad
 */
export const ALL_IMAGES = [
  ...CRITICAL_IMAGES, // Prioridad alta
  ...HOME_CAROUSEL_IMAGES, // Prioridad media
  ...SERVICIOS_IMAGES, // Prioridad media
  ...EMPRESA_IMAGES, // Prioridad media-baja
  ...LOGO_CAROUSEL_IMAGES, // Prioridad baja
];

/**
 * Ejemplo de cómo usar la precarga de imágenes en nuevos componentes
 * Este archivo muestra las mejores prácticas
 */

// ============================================
// EJEMPLO 1: Precarga simple en un componente
// ============================================

import { useImagePreload } from "../hooks/useImagePreload";
import { Box, Typography } from "@mui/material";

function EjemploBasico() {
  const micarousel = ["/imagen1.jpg", "/imagen2.jpg", "/imagen3.jpg"];

  // Precargar las imágenes automáticamente al montar el componente
  useImagePreload(micarousel);

  return (
    <Box>
      <Typography>Las imágenes se precargaron automáticamente</Typography>
    </Box>
  );
}

// ============================================
// EJEMPLO 2: Precarga secuencial para muchas
// ============================================

function EjemploMuchasImagenes() {
  const mucharoimagenes = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img8.jpg",
  ];

  // Usar sequential: true para conexiones lentas
  useImagePreload(mucharoimagenes, { sequential: true });

  return <Box>Precargando {mucharoimagenes.length} imágenes</Box>;
}

// ============================================
// EJEMPLO 3: Precarga con interacción
// ============================================

import { useImagePreloadOnInteraction } from "../hooks/useImagePreload";

function EjemploPrecargaConInteraccion() {
  const logosPesados = [
    "empresas/logo1.png",
    "empresas/logo2.png",
    "empresas/logo3.png",
  ];

  // Se precargan solo después de que el usuario hace click o scroll
  // Perfecta para mejorar rendimiento inicial
  useImagePreloadOnInteraction(logosPesados);

  return (
    <Box>
      <Typography>
        Los logos se cargarán cuando hagas scroll o cliquees
      </Typography>
    </Box>
  );
}

// ============================================
// EJEMPLO 4: Organizar por secciones
// ============================================

// Crear arrays de imágenes por sección
const GALERIA_PRODUCCION = ["/produccion/foto1.jpg", "/produccion/foto2.jpg"];

const GALERIA_EQUIPO = ["/equipo/foto1.jpg", "/equipo/foto2.jpg"];

function GaleriasCompletas() {
  // Precargar fotos
  useImagePreload(GALERIA_PRODUCCION);

  // Precargar el equipo solo con interacción
  useImagePreloadOnInteraction(GALERIA_EQUIPO);

  return (
    <Box>
      <Typography>Galerías precargadas</Typography>
    </Box>
  );
}

// ============================================
// EJEMPLO 5: Debug
// ============================================

function EjemploConDebug() {
  const imagenes = ["/imagen1.jpg", "/imagen2.jpg"];

  // Habilitar debug para ver en consola cuándo se cargan
  useImagePreload(imagenes, { debug: true });

  return <Box>Abre DevTools para ver logs</Box>;
}

// ============================================
// EJEMPLO 6: Usar arrays centralizados
// ============================================

import { EMPRESA_IMAGES, HOME_CAROUSEL_IMAGES } from "../utils/imagePreload";

function ConArraysCentralizados() {
  // Precargar un conjunto completo predefinido
  useImagePreload(EMPRESA_IMAGES);

  // O combinar varios
  const todasLasImagenes = [...HOME_CAROUSEL_IMAGES, "/imagen-adicional.jpg"];
  useImagePreload(todasLasImagenes);

  return <Box>Usando arrays centralizados</Box>;
}

// ============================================
// EJEMPLO 7: Precarga manual (sin hook)
// ============================================

import { preloadImages } from "../utils/imagePreload";

function PrecargaManual() {
  // Si necesitas control total, puedes usar la utilidad directamente
  async function cargarImagenesAlClickar() {
    const midasImagenes = ["/imagen1.jpg", "/imagen2.jpg"];
    try {
      await preloadImages(midasImagenes);
      console.log("Imágenes cargadas!");
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  }

  return <button onClick={cargarImagenesAlClickar}>Precargar imágenes</button>;
}

// ============================================
// BEST PRACTICES
// ============================================

/*
✅ DO:
- Usar arrays organizados por sección
- Precargar solo lo necesario
- Usar sequential para muchas imágenes
- Usar OnInteraction para lo no-crítico
- Mostrar debug en desarrollo

❌ DON'T:
- Precargar TODO desde el inicio
- Usar precarga paralela con +5 imágenes
- Precargar formatos no optimizados
- Ignorar errores de precarga
- Usar directamente desde componentes (usar arrays centralizados)
*/

export {
  EjemploBasico,
  EjemploMuchasImagenes,
  EjemploPrecargaConInteraccion,
  GaleriasCompletas,
  EjemploConDebug,
  ConArraysCentralizados,
  PrecargaManual,
};

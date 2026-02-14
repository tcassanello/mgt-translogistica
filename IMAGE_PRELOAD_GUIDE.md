# Guía de Precarga de Imágenes

Este proyecto implementa un sistema robusto de precarga de imágenes para optimizar el rendimiento y la experiencia del usuario.

## Componentes del Sistema

### 1. **imagePreload.ts** (Utilidad base)

Ubicación: `src/utils/imagePreload.ts`

Proporciona funciones para precargar imágenes:

- `preloadImage(src)` - Precargar una única imagen
- `preloadImages(sources)` - Precargar múltiples imágenes en paralelo
- `preloadImagesSequential(sources)` - Precargar imágenes secuencialmente

Contiene arrays organizados por sección:

- `CRITICAL_IMAGES` - Imágenes críticas (hero, logo)
- `HOME_CAROUSEL_IMAGES` - Imágenes del carrusel en Home
- `SERVICIOS_IMAGES` - Imágenes de la sección Servicios
- `EMPRESA_IMAGES` - Imágenes de la página Empresa
- `LOGO_CAROUSEL_IMAGES` - Logos de empresas

### 2. **useImagePreload.ts** (Hooks React)

Ubicación: `src/hooks/useImagePreload.ts`

Proporciona tres hooks personalizados:

#### `useImagePreload(imageSources, options)`

Hook principal para precargar imágenes en componentes.

```tsx
import { useImagePreload } from "../../hooks/useImagePreload";

function MyComponent() {
  const images = ["/image1.jpg", "/image2.jpg"];

  // Precargar en paralelo
  useImagePreload(images);

  // O secuencial con debug
  useImagePreload(images, { sequential: true, debug: true });

  return <div>Componente</div>;
}
```

#### `useImagePreloadParallel(imageSources)`

Precarga en paralelo (más rápido, pero consume más ancho de banda).

```tsx
useImagePreloadParallel(["/image1.jpg", "/image2.jpg"]);
```

#### `useImagePreloadOnInteraction(imageSources)`

Precargar solo cuando el usuario interactúa (click o scroll).
Útil para optimizar el rendimiento inicial de la página.

```tsx
useImagePreloadOnInteraction(logoUrls); // Se carga solo después del click/scroll
```

### 3. **index.html** (Preload HTML)

Se agregaron etiquetas de preload para imágenes críticas:

```html
<!-- Preload: Se carga con muy alta prioridad -->
<link rel="preload" as="image" href="/hero.jpg" type="image/jpeg" />
<link rel="preload" as="image" href="/logo.png" type="image/png" />

<!-- Prefetch: Se carga cuando el navegador está inactivo -->
<link rel="prefetch" as="image" href="/hom8.jpeg" type="image/jpeg" />
```

### 4. **main.tsx** (Inicialización)

Las imágenes críticas se precargan al iniciar la app:

```tsx
// Críticas: Se cargan inmediatamente
preloadImages(CRITICAL_IMAGES);

// Home carousel: Se carga después de DOMContentLoaded
preloadImages(HOME_CAROUSEL_IMAGES);
```

## Cómo Usar

### Para una nueva página/componente

1. **Opción 1: Hook automático (Recomendado)**

```tsx
import { useImagePreload } from "../../hooks/useImagePreload";

function MiPagina() {
  const imagenes = ["/image1.jpg", "/image2.jpg"];
  useImagePreload(imagenes);

  return <div>...</div>;
}
```

2. **Opción 2: Switch según prioridad**

```tsx
// Imágenes que se ven inmediatamente
useImagePreload(criticalImages, { sequential: false });

// Imágenes secundarias
useImagePreloadOnInteraction(secondaryImages);
```

### Para agregar nuevas imágenes al sistema

1. **Actualizar arrays en `imagePreload.ts`**:

```tsx
export const MI_NUEVA_SECCION_IMAGES = [
  "/nueva-imagen.jpg",
  "/otra-imagen.jpg",
];
```

2. **Usar en el componente**:

```tsx
import { MI_NUEVA_SECCION_IMAGES } from "../../utils/imagePreload";
import { useImagePreload } from "../../hooks/useImagePreload";

function MiComponente() {
  useImagePreload(MI_NUEVA_SECCION_IMAGES);
  return <div>...</div>;
}
```

## Optimizaciones Implementadas

### Paralelo vs Secuencial

| Tipo           | Velocidad | Ancho de Banda | Caso de Uso          |
| -------------- | --------- | -------------- | -------------------- |
| **Paralelo**   | Rápido    | Alto           | Pocas imágenes (2-4) |
| **Secuencial** | Lento     | Bajo           | Muchas imágenes (5+) |

### Timing de Carga

| Método                       | Cuándo                    | Beneficio                         |
| ---------------------------- | ------------------------- | --------------------------------- |
| **link rel="preload"**       | Inmediatamente            | Máxima prioridad                  |
| **Críticas en main**         | Al iniciar app            | Disponibles al llegar a la página |
| **Home en DOMContentLoaded** | Después de renderizar     | No bloquea renderizado            |
| **OnInteraction**            | Después del click/scroll  | Minimiza carga inicial            |
| **Prefetch**                 | Cuando navegador inactivo | No compite por ancho de banda     |

## Mejora de Rendimiento Esperada

- ⚡ **LCP (Largest Contentful Paint)**: -30% a -50%
- ⚡ **CLS (Cumulative Layout Shift)**: -40% a -60% (menos saltos al cargar imágenes)
- ⚡ **Interactividad**: +20% a +40% en dispositivos lentos
- ⚡ **User Experience**: Transiciones de página más fluidas

## Debug

Para ver cuándo se cargan las imágenes:

```tsx
useImagePreload(images, { debug: true });
```

En la consola verás:

```
✓ Imágenes precargadas: ['/image1.jpg', '/image2.jpg']
```

## Notas Importantes

1. **Las imágenes deben estar en `public/`** para que las rutas sean correctas
2. **No precargar todo a la vez** - Priorizar según importancia
3. **En conexiones lentas**, usar `sequential: true` para evitar timeouts
4. **Monitorear Network** en DevTools para verificar que las imágenes se cargan en el orden esperado

## Componentes Actualizados

- ✅ Home (precarga de hero al iniciar)
- ✅ Empresa.tsx (precarga carrusel)
- ✅ Servicios.tsx (precarga imágenes de servicios)
- ✅ TextCarouselSection.tsx (precarga carrusel de texto)
- ✅ LogoCarousel.tsx (precarga con interacción)

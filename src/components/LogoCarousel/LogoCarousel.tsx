import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { useImagePreloadOnInteraction } from "../../hooks/useImagePreload";

// Definimos la animación de desplazamiento
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const logos = [
  { name: "Marca 1", url: "empresas/4-Photoroom.png" },
  { name: "Marca 2", url: "empresas/2-Photoroom.png" },
  { name: "Marca 3", url: "empresas/9-Photoroom.png" },
  { name: "Marca 4", url: "empresas/10-Photoroom.png" },
  { name: "Marca 5", url: "empresas/6-Photoroom.png" },
  { name: "Marca 6", url: "empresas/8-Photoroom.png" },
  { name: "Marca 7", url: "empresas/3-Photoroom.png" },
  { name: "Marca 8", url: "empresas/5-Photoroom.png" },
  { name: "Marca 9", url: "empresas/brande-scaled.png" },
  { name: "Marca 10", url: "empresas/7-Photoroom.png" },
];

const logoUrls = logos.map((logo) => logo.url);

function LogoCarousel() {
  // Precargar logos solo cuando el usuario interactúa (scroll o click)
  useImagePreloadOnInteraction(logoUrls);

  return (
    <Box sx={{ py: 5, bgcolor: "#f5f5f5", overflow: "hidden", width: "100%" }}>
      <Typography
        variant="h6"
        textAlign="center"
        sx={{
          mb: 4,
          fontWeight: 500,
          color: "#666",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Empresas que confían en nosotros
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "max-content", // Permite que el contenido se extienda
          animation: `${scroll} 30s linear infinite`, // 30s controla la velocidad
          "&:hover": { animationPlayState: "paused" }, // Se detiene al pasar el mouse
        }}
      >
        {/* Renderizamos los logos dos veces para el efecto infinito */}
        {[...logos, ...logos].map((logo, index) => (
          <Box
            key={index}
            component="img"
            src={logo.url}
            alt={logo.name}
            sx={{
              height: 50,
              mx: 4, // Espacio horizontal entre logos
              filter: "grayscale(100%)", // Los pone en blanco y negro para estética pro
              opacity: 0.6,
              transition: "all 0.3s",
              "&:hover": {
                filter: "grayscale(0%)",
                opacity: 1,
                transform: "scale(1.1)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default LogoCarousel;

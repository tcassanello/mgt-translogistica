import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useImagePreload } from "../../hooks/useImagePreload";

const carouselImages = [
  "/hom8.jpeg",
  "/home6.jpeg",
  "/Ford4000 Barco.jpg",
  "/home7.jpeg",
  "/home5.jpeg",
  "/home4.jpeg",
  "/home2.webp",
];

function TextCarouselSection() {
  const [activeStep, setActiveStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Precargar todas las imágenes del carrusel
  useImagePreload(carouselImages, { sequential: true });

  // Función para reiniciar el timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % carouselImages.length);
    resetTimer();
  };

  const handleBack = () => {
    setActiveStep(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
    resetTimer();
  };

  // Auto-play (5 segundos) con timer que se reinicia al cambiar imagen
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: "#fff" }}>
      <Container maxWidth={false} disableGutters>
        <Grid container>
          {/* COLUMNA IZQUIERDA: TEXTO */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                p: { xs: 6, md: 7 },
                width: "100%",
                maxWidth: "800px", // Para que el texto no se estire infinito en monitores ultra-wide
                ml: "auto", // Lo empuja hacia el centro pero mantiene el fondo pegado a la izquierda
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "#0b3b7a", fontWeight: 800, letterSpacing: 2 }}
              >
                Eficiencia en Movimiento
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: "#3F3E3A",
                  mt: 2,
                  mb: 3,
                  lineHeight: 1.1,
                }}
              >
                Gestión integral de Logística y Transporte
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontSize: "1.2rem",
                  lineHeight: 1.8,
                  mb: 5,
                }}
              >
                Coordinamos y ejecutamos operaciones de transporte y
                distribución con enfoque en la puntualidad, la seguridad y la
                eficiencia operativa. Brindamos soporte a empresas industriales
                y operaciones de comercio exterior, asegurando que cada carga
                llegue a destino en tiempo y forma.
              </Typography>
            </Box>
          </Grid>

          {/* COLUMNA DERECHA: CARRUSEL */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "400px", md: "650px" }, // Altura fija para el impacto visual
                bgcolor: "#eee",
              }}
            >
              <Box
                component="img"
                src={carouselImages[activeStep]}
                alt="Logística MGT"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "opacity 0.5s ease-in-out",
                }}
              />

              {/* Controles del Carrusel */}
              <IconButton
                onClick={handleBack}
                sx={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              {/* Indicadores (Puntos) */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  position: "absolute",
                  bottom: 30,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {carouselImages.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor:
                        i === activeStep ? "#0b3b7a" : "rgba(255,255,255,0.5)",
                      transition: "0.3s",
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TextCarouselSection;

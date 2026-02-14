// src/components/pages/Empresa.tsx
import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MainLayout from "../layaouts/MainLayout";
import { useImagePreload } from "../../hooks/useImagePreload";

const images = [
  "/Ford4000.jpg",
  "/claudito.jpg",
  "/RangerNieve.jpg",
  "/Saveiro1.jpeg",
];

function Empresa() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  // Precargar todas las imágenes del carrusel
  useImagePreload(images);

  const handleNext = () => setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () =>
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  return (
    <MainLayout>
      {/* SECCIÓN SUPERIOR: Quiénes Somos */}
      {/* Usamos la imagen actual con blur como fondo */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 8, md: 12 },
          pb: { xs: 15, md: 20 },
          // Pseudo-elemento para el fondo con blur
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${images[activeStep]})`, // La misma imagen del carrusel
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.6)", // Blur + oscurecimiento para legibilidad
            zIndex: 0,
            transform: "scale(1.1)", // Evita bordes blancos
            transition: "background-image 0.5s ease-in-out",
          },
        }}
      >
        {/* Contenido sobre el fondo blur */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Carrusel */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={8} // Más sombra para que resalte del fondo
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: { xs: 300, md: 400 },
                  bgcolor: "#000", // Fondo negro por si la imagen tarda en cargar
                }}
              >
                <Box
                  component="img"
                  src={images[activeStep]}
                  alt="Instalaciones MGT"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e: any) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=MGT+Logistica";
                  }}
                />
                <IconButton
                  onClick={handleBack}
                  sx={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>

            {/* Texto (ahora en blanco para contraste) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, color: "#fff", mb: 3 }}
              >
                QUIÉNES SOMOS
              </Typography>
              <Divider sx={{ width: 60, height: 4, bgcolor: "#fff", mb: 3 }} />
              <Typography
                variant="body1"
                sx={{ color: "#f0f0f0", lineHeight: 1.8, mb: 2 }}
              >
                Somos una empresa de transporte y logística con más de 35 años
                de trayectoria. Nacimos como una empresa familiar y, a lo largo
                del tiempo, hemos crecido de manera sostenida, manteniendo
                intactos nuestros valores.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#f0f0f0", lineHeight: 1.8 }}
              >
                Nos especializamos en brindar soluciones integrales a empresas
                de los sectores petrolero, marítimo y eólico, gestionando
                operaciones con profesionalismo y responsabilidad.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SECCIÓN INFERIOR: El Rectángulo de Misión, Visión y Flota */}
      <Container
        maxWidth="lg"
        sx={{ mt: -10, position: "relative", zIndex: 2 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            bgcolor: "#fff",
          }}
        >
          <Grid container spacing={6}>
            {/* Visión */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#0b3b7a", mb: 2 }}
              >
                Visión
              </Typography>
              <Divider
                sx={{ width: 40, height: 3, bgcolor: "#0b3b7a", mb: 2 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#666", lineHeight: 1.7 }}
              >
                Brindar soluciones de transporte y logística con eficiencia,
                seguridad y compromiso, acompañando a nuestros clientes en cada
                etapa de su operación.{" "}
              </Typography>
            </Grid>

            {/* Misión */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#0b3b7a", mb: 2 }}
              >
                Misión
              </Typography>
              <Divider
                sx={{ width: 40, height: 3, bgcolor: "#0b3b7a", mb: 2 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#666", lineHeight: 1.7 }}
              >
                Ser referentes en el sector logístico, creciendo de manera
                sostenible e incorporando innovación y mejora continua en
                nuestros procesos.{" "}
              </Typography>
            </Grid>

            {/* Nuestra Flota */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#0b3b7a", mb: 2 }}
              >
                Nuestra flota
              </Typography>
              <Divider
                sx={{ width: 40, height: 3, bgcolor: "#0b3b7a", mb: 2 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#666", lineHeight: 1.7 }}
              >
                Contamos con una flota propia y moderna de camiones y camionetas
                adaptadas para realizar envíos de manera rápida, segura y bajo
                normas estrictas de calidad.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </MainLayout>
  );
}

export default Empresa;

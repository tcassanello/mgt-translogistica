// src/components/pages/Servicios.tsx
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Avatar,
  Paper,
  Button,
  CardMedia,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Link } from "react-router-dom";
import MainLayout from "../layaouts/MainLayout";
import { useEffect } from "react";
import { useImagePreload } from "../../hooks/useImagePreload";

const serviciosData = [
  {
    title: "Cargas generales",
    desc: "Transporte seguro y eficiente para mercadería general con trazabilidad completa.",
    icon: <LocalShippingIcon sx={{ fontSize: 35, color: "#0b3b7a" }} />,
    image: "/pasto.jpeg", // Ruta a tus imágenes en public/
  },
  {
    title: "Corta y larga distancia",
    desc: "Cobertura regional y nacional con una flota moderna y tiempos optimizados.",
    icon: <AltRouteIcon sx={{ fontSize: 35, color: "#0b3b7a" }} />,
    image: "/nieve.jpeg",
  },
  {
    title: "Maquinaria y cargas especiales",
    desc: "Movimientos industriales con equipos especializados y personal experto.",
    icon: (
      <PrecisionManufacturingIcon sx={{ fontSize: 35, color: "#0b3b7a" }} />
    ),
    image: "/camionBrazo.jpeg",
  },
  {
    title: "Contenedores 20/40",
    desc: "Operaciones logísticas integrales en las principales terminales portuarias del país.",
    icon: <ViewInArIcon sx={{ fontSize: 35, color: "#0b3b7a" }} />,
    image: "/Ford4000.jpg",
  },
];

function Servicios() {
  useEffect(() => {
    document.title = "MGT Translogística | Servicios";
  }, []);

  // Precargar todas las imágenes de servicios
  const servicioImages = serviciosData.map((s) => s.image);
  useImagePreload(servicioImages);

  return (
    <MainLayout>
      {/* Cabecera con fondo neutro oscuro */}
      <Box
        sx={{ bgcolor: "#3F3E3A", py: 10, color: "#fff", textAlign: "center" }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ letterSpacing: 3, fontWeight: 700, color: "#D4D0C4" }}
          >
            Nuestras Soluciones
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Soluciones Integrales en Transporte y Logística
          </Typography>
          <Divider
            sx={{ width: 80, height: 4, bgcolor: "#fff", mx: "auto", mb: 4 }}
          />
        </Container>
      </Box>

      {/* Grid de Servicios con Estilo Premium e Imágenes */}
      <Box sx={{ bgcolor: "#fdfdfd", py: 12, mt: -5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {serviciosData.map((s, index) => (
              <Grid key={s.title} size={{ xs: 12 }}>
                {" "}
                {/* Usamos el ancho completo de la línea para el efecto horizontal */}
                <Card
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: index % 2 === 0 ? "row" : "row-reverse",
                    }, // Alterna imagen izquierda/derecha
                    border: "1px solid #D4D0C4",
                    borderTop: "6px solid #0b3b7a",
                    borderRadius: "12px",
                    overflow: "hidden",
                    height: { md: "350px" }, // ALTURA CONTROLADA en escritorio
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 12px 40px rgba(63, 62, 58, 0.15)",
                    },
                  }}
                >
                  {/* Área de Imagen */}
                  <CardMedia
                    component="img"
                    image={s.image}
                    alt={s.title}
                    sx={{
                      width: { xs: "100%", md: "50%" },
                      height: { xs: "200px", md: "100%" },
                      objectFit: "cover",
                    }}
                  />

                  {/* Área de Texto */}
                  <CardContent
                    sx={{
                      p: 6,
                      width: { xs: "100%", md: "50%" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#D4D0C4",
                        width: 60,
                        height: 60,
                        mb: 2,
                      }}
                    >
                      {s.icon}
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: "#3F3E3A",
                        mb: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      {s.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        lineHeight: 1.8,
                        fontSize: "1.1rem",
                      }}
                    >
                      {s.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Banner de Compromiso al final */}
          <Paper
            elevation={0}
            sx={{
              mt: 10,
              p: 6,
              bgcolor: "#D4D0C4",
              borderRadius: "24px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 900, color: "#3F3E3A", mb: 1 }}
              >
                ¿Necesitás una cotización a medida?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#3F3E3A", opacity: 0.8 }}
              >
                Contamos con la experiencia necesaria para adaptar nuestra
                logística a tus requerimientos específicos.
              </Typography>
            </Box>
            <Button
              component={Link as any}
              to="/contacto"
              variant="contained"
              sx={{
                bgcolor: "#0b3b7a",
                px: 5,
                py: 2,
                borderRadius: "10px",
                fontWeight: 800,
                "&:hover": { bgcolor: "#082d5e" },
              }}
            >
              Contactar Ahora
            </Button>
          </Paper>
        </Container>
      </Box>
    </MainLayout>
  );
}

export default Servicios;

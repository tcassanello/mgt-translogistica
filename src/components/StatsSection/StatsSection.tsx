import { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShieldIcon from "@mui/icons-material/Shield";
import PublicIcon from "@mui/icons-material/Public";

// 1. Componente que maneja la lógica del contador
const CounterAnimated = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLSpanElement>(null);

  // Detectar cuando el elemento entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    ); // Se activa cuando se ve el 50% de la sección

    if (domRef.current) observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  // Lógica del incremento
  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    let totalMiliseconds = duration;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={domRef}>{count}</span>;
};

const stats = [
  {
    label: "Años de Trayectoria",
    value: 30,
    suffix: "+",
    icon: <AccessTimeIcon />,
  },
  {
    label: "Unidades en Flota",
    value: 10,
    suffix: "+",
    icon: <LocalShippingIcon />,
  },
  { label: "Entregas Seguras", 
    value: 100, 
    suffix: "%", 
    icon: <ShieldIcon /> },
  {
    label: "Cobertura Nacional",
    value: 24,
    suffix: "hs",
    icon: <PublicIcon />,
  },
];

function StatsSection() {
  return (
    <Box sx={{ bgcolor: "#3F3E3A", py: { xs: 8, md: 5 }, color: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Stack
                direction="column"
                alignItems="center"
                spacing={1}
                sx={{ textAlign: "center" }}
              >
                {/* Icono con color Arena de tu paleta */}
                <Box sx={{ color: "#D4D0C4", mb: 1, fontSize: 20 }}>
                  {/* Ajustamos el tamaño del icono directamente aquí */}
                  {stat.icon}
                </Box>

                <Typography
                    variant="h3"
                    sx={{ fontWeight: 900, color: "#fff" }}
                    >
                    {/* Renderizado condicional: adelante solo si es "+" */}
                    {stat.suffix === "+" && stat.suffix}

                    <CounterAnimated target={stat.value} />

                    {/* Renderizado condicional: atrás si es cualquier otra cosa (como %) */}
                    {stat.suffix !== "+" && stat.suffix}
                </Typography>

                <Typography
                  variant="overline"
                  sx={{
                    color: "#D4D0C4",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default StatsSection;

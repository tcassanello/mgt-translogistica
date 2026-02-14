// src/components/pages/Home.tsx
import { Link } from "react-router-dom";
import { Button, Box, Typography, Container } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MainLayout from "../layaouts/MainLayout";
import Hero from "../Hero/Hero";
import LogoCarousel from "../LogoCarousel/LogoCarousel";
import EmailIcon from '@mui/icons-material/Email';
import StatsSection from "../StatsSection/StatsSection.tsx";
import TextCarouselSection from "../TextCarouselSection/TextCarouselSection.tsx";

function Home() {
  return (
    <MainLayout>
      <Hero
        backgroundImage="/hero.jpg"
        title="Movemos lo que impulsa tu industria"
        subtitle="Logística eficiente para sectores petroleros, marítimos y eólicos."
        showLogo
        actions={
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 2 }}>
            {/* Botón Servicios: Tamaño normal y hover de color */}
            <Button
              component={Link}
              to="/servicios"
              variant="contained"
              size="large" 
              startIcon={<LocalShippingIcon />}
              sx={{
                backgroundColor: '#fff',
                color: '#111',
                fontWeight: '700',
                borderRadius: '8px',
                px: 4, // Padding estándar
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#e0e0e0', // Efecto de rellenado por cambio de tono
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                  // Se eliminó el transform: scale
                },
                transition: 'background-color 0.3s ease-in-out',
              }}
            >
              Servicios
            </Button>

            {/* Botón Depósito: Efecto de rellenado completo al pasar el mouse */}
            <Button
              component={Link}
              to="/contacto"
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              sx={{
                borderColor: '#fff',
                color: '#fff',
                borderWidth: '2px',
                fontWeight: '700',
                borderRadius: '8px',
                px: 4,
                '&:hover': {
                  backgroundColor: '#fff', // Se rellena de blanco
                  color: '#111',           // El texto pasa a oscuro
                  borderColor: '#fff',
                  borderWidth: '2px',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Contacto
            </Button>
          </Box>
        }
      />
      <TextCarouselSection/>
      <StatsSection /> 

      <Box component="section" sx={{ py: 10, bgcolor: '#fff' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: '2.2rem', 
              fontWeight: 800, 
              color: '#111', 
              mb: 2,
              textAlign: 'center'
            }}
          >
            Servicios principales
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 700, 
              color: '#444', 
              lineHeight: 1.7, 
              mb: 5,
              textAlign: 'center'
            }}
          >
            Operaciones planificadas, flota preparada y foco en seguridad y tiempos.
          </Typography>

          <Button
            component={Link}
            to="/servicios"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#0b3b7a',
              color: '#fff',
              px: 6,
              fontWeight: '700',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#082d5e',
              },
            }}
          >
            Ver todos los servicios
          </Button>
        </Container>
      </Box>
      <LogoCarousel />
    </MainLayout>
  );
}

export default Home;
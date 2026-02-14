// src/components/Hero/Hero.tsx
import { Box, Typography, Container } from '@mui/material';

type HeroProps = {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  actions?: React.ReactNode;
};

function Hero({ backgroundImage, title, subtitle, showLogo = false, actions }: HeroProps) {
  return (
    <Box 
      component="header" 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '85vh', // Un poco más alto para que el efecto se note mejor
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#111' 
      }}
    >
      {/* Capa de fondo con efecto Parallax */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // <--- ESTO crea el efecto "tapado"
          zIndex: 0,
          // Overlay oscuro para que el texto resalte
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
          }
        }}
        aria-hidden="true"
      />

      {/* Contenido centrado */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1, 
          textAlign: 'center', 
          color: '#fff',
          py: 8 
        }}
      >
        {showLogo && (
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ 
              width: 200, // Tamaño reducido como pediste antes
              height: 'auto', 
              mb: 3,
              mx: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
            }}
          />
        )}

        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '1.5rem', md: '3.5rem' }, 
            fontWeight: 900, 
            textTransform: 'uppercase',
            lineHeight: 1.1,
            mb: 2,
            textShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.1rem', md: '1.4rem' }, 
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: 750,
              mx: 'auto',
              mb: 5,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            {subtitle}
          </Typography>
        )}

        {actions && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {actions}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Hero;
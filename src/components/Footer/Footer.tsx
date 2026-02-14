// src/components/Footer/Footer.tsx
import { Box, Typography, Container, Stack } from '@mui/material';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'rgb(63, 62, 58)', 
        color: '#fff', 
        py: 6, // Padding vertical
        mt: 10, // Margen superior para separarlo del contenido
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          spacing={1} 
          alignItems="center" 
          textAlign="center"
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.9rem', 
              opacity: 0.8,
              fontWeight: 500 
            }}
          >
            © {new Date().getFullYear()} MGT Translogistica Cassanello
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.9rem', 
              opacity: 0.6,
              letterSpacing: '0.02em'
            }}
          >
            Avellaneda, Buenos Aires · mgtcassanello@gmail.com
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
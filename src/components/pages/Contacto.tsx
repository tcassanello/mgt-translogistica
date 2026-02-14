import React, { useRef, useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Grid, Paper, Snackbar, Alert, CircularProgress 
} from '@mui/material';
import emailjs from '@emailjs/browser';
import MainLayout from '../layaouts/MainLayout';
import SendIcon from '@mui/icons-material/Send';

function Contacto() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ open: boolean, type: 'success' | 'error', msg: string }>({
    open: false, type: 'success', msg: ''
  });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos que el formulario exista
    if (!form.current) return;

    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus({ 
        open: true, 
        type: 'success', 
        msg: '¡Mensaje enviado con éxito! Nos contactaremos pronto.' 
      });
      form.current?.reset(); // Limpia el formulario
    })
    .catch((error) => {
      console.error(error);
      setStatus({ 
        open: true, 
        type: 'error', 
        msg: 'Hubo un error al enviar el mensaje. Intente nuevamente.' 
      });
    })
    .finally(() => setLoading(false));
  };

  return (
    <MainLayout>
      <Box sx={{ bgcolor: '#f5f5f5', py: 10 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, borderRadius: '16px' }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#3F3E3A', mb: 2, textAlign: 'center' }}>
              Contacto
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 4, textAlign: 'center' }}>
              Complete el formulario y nuestro equipo de logística se pondrá en contacto a la brevedad.
            </Typography>

            {/* El atributo 'name' en cada input debe coincidir con las variables de tu template en EmailJS */}
            <form ref={form} onSubmit={sendEmail}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth label="Nombre Completo" name="user_name" 
                    required variant="outlined" disabled={loading}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField 
                    fullWidth label="Correo Electrónico" name="user_email" 
                    type="email" required variant="outlined" disabled={loading}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField 
                    fullWidth label="Asunto" name="subject" 
                    variant="outlined" disabled={loading}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField 
                    fullWidth label="Mensaje" name="message" 
                    multiline rows={4} required variant="outlined" disabled={loading}
                  />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    sx={{ 
                      bgcolor: '#0b3b7a', 
                      px: 6, py: 1.5, 
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#082d5e' }
                    }}
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* Alerta de confirmación */}
      <Snackbar 
        open={status.open} 
        autoHideDuration={6000} 
        onClose={() => setStatus({ ...status, open: false })}
      >
        <Alert severity={status.type} variant="filled" sx={{ width: '100%' }}>
          {status.msg}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}

export default Contacto;
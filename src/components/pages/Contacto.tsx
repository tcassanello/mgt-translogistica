import { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button,
  Grid, Paper, Snackbar, Alert, CircularProgress
} from '@mui/material';
import MainLayout from '../layaouts/MainLayout';
import SendIcon from '@mui/icons-material/Send';

const RATE_LIMIT_MS = 60_000;

function Contacto() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ open: boolean; type: 'success' | 'error'; msg: string }>({
    open: false, type: 'success', msg: ''
  });

  const sendEmail = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();

    const lastSent = Number(localStorage.getItem('contact_last_sent') ?? 0);
    if (Date.now() - lastSent < RATE_LIMIT_MS) {
      setStatus({ open: true, type: 'error', msg: 'Espera un momento antes de enviar otro mensaje.' });
      return;
    }

    const form = e.currentTarget;
    const data = {
      user_name:  (form.elements.namedItem('user_name')  as HTMLInputElement).value,
      user_email: (form.elements.namedItem('user_email') as HTMLInputElement).value,
      subject:    (form.elements.namedItem('subject')    as HTMLInputElement).value,
      message:    (form.elements.namedItem('message')    as HTMLTextAreaElement).value,
    };

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(error);
      }

      localStorage.setItem('contact_last_sent', String(Date.now()));
      setStatus({ open: true, type: 'success', msg: '¡Mensaje enviado con éxito! Nos contactaremos pronto.' });
      form.reset();
    } catch (error) {
      setStatus({
        open: true,
        type: 'error',
        msg: error instanceof Error ? error.message : 'Hubo un error al enviar el mensaje. Intente nuevamente.',
      });
    } finally {
      setLoading(false);
    }
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

            <form onSubmit={sendEmail}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth label="Nombre Completo" name="user_name"
                    required variant="outlined" disabled={loading}
                    inputProps={{ maxLength: 100 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth label="Correo Electrónico" name="user_email"
                    type="email" required variant="outlined" disabled={loading}
                    inputProps={{ maxLength: 200 }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth label="Asunto" name="subject"
                    variant="outlined" disabled={loading}
                    inputProps={{ maxLength: 200 }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth label="Mensaje" name="message"
                    multiline rows={4} required variant="outlined" disabled={loading}
                    inputProps={{ maxLength: 2000 }}
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

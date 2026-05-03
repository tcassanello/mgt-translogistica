import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitize = (value: unknown, maxLength = 500): string =>
  String(value ?? '').trim().slice(0, maxLength);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const user_name  = sanitize(req.body?.user_name, 100);
  const user_email = sanitize(req.body?.user_email, 200);
  const subject    = sanitize(req.body?.subject,    200) || '(Sin asunto)';
  const message    = sanitize(req.body?.message,    2000);

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (!EMAIL_REGEX.test(user_email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } = process.env;

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.error('Faltan variables de entorno de EmailJS');
    return res.status(500).json({ error: 'Error de configuración del servidor' });
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id:      EMAILJS_SERVICE_ID,
        template_id:     EMAILJS_TEMPLATE_ID,
        user_id:         EMAILJS_PUBLIC_KEY,
        template_params: { user_name, user_email, subject, message },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('EmailJS error:', response.status, text);
      return res.status(502).json({ error: 'Error al enviar el mensaje' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error inesperado:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

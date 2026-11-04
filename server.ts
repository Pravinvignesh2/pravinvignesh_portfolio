import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser with payload limit
app.use(express.json({ limit: '50kb' }));

// Input sanitization helper to strip HTML tags
function sanitize(input: string): string {
  return input.replace(/<[^>]*>?/gm, '').trim();
}

// GET /api/health - Diagnostic endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'pravinvignesh-portfolio-api' });
});

// POST /api/contact - Secure server-side validation & email delivery
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message, _gotcha } = req.body;

    // 1. Honeypot check for spam protection
    if (_gotcha) {
      res.status(400).json({
        success: false,
        message: 'Spam submission detected.',
      });
      return;
    }

    // 2. Presence & Type validation
    if (!name || typeof name !== 'string') {
      res.status(400).json({ success: false, field: 'name', message: 'Full name is required.' });
      return;
    }
    if (!email || typeof email !== 'string') {
      res.status(400).json({ success: false, field: 'email', message: 'Email address is required.' });
      return;
    }
    if (!subject || typeof subject !== 'string') {
      res.status(400).json({ success: false, field: 'subject', message: 'Subject is required.' });
      return;
    }
    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, field: 'message', message: 'Message content is required.' });
      return;
    }

    // 3. Sanitization
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanSubject = sanitize(subject);
    const cleanMessage = sanitize(message);

    // 4. Boundary & Format validations
    if (cleanName.length < 2 || cleanName.length > 100) {
      res.status(400).json({
        success: false,
        field: 'name',
        message: 'Name must be between 2 and 100 characters.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 120) {
      res.status(400).json({
        success: false,
        field: 'email',
        message: 'Please provide a valid email address.',
      });
      return;
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 150) {
      res.status(400).json({
        success: false,
        field: 'subject',
        message: 'Subject must be between 3 and 150 characters.',
      });
      return;
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      res.status(400).json({
        success: false,
        field: 'message',
        message: 'Message must be between 10 and 3,000 characters.',
      });
      return;
    }

    // 5. Email Dispatch via Resend API (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'pravinvignesh2502@gmail.com';
    const senderEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey) {
      // Never pretend an email was sent if provider key is missing
      res.status(200).json({
        success: false,
        configured: false,
        message:
          'Email delivery provider is awaiting configuration (RESEND_API_KEY not set). Your message was validated successfully.',
        directEmailFallback: recipientEmail,
      });
      return;
    }

    // Dispatch via Resend REST endpoint
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Pravinvignesh Portfolio <${senderEmail}>`,
        to: [recipientEmail],
        reply_to: cleanEmail,
        subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
        text: `From: ${cleanName} (${cleanEmail})\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}\n\nSent via Pravinvignesh P. Portfolio Contact Form`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Resend delivery error:', errorData);
      res.status(502).json({
        success: false,
        configured: true,
        message: 'Email delivery provider returned an error. Please try direct email.',
        directEmailFallback: recipientEmail,
      });
      return;
    }

    res.status(200).json({
      success: true,
      configured: true,
      message: 'Thank you! Your message has been delivered to Pravinvignesh P.',
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing your message.',
    });
  }
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (isProd: ${isProd})`);
  });
}

startServer();

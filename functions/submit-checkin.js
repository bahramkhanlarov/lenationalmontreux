const ALLOWED_ORIGIN = 'https://lenationalmontreux.ch';
const RECIPIENT_EMAIL = 'info@lenationalmontreux.ch';
const FROM_EMAIL = 'checkin@lenationalmontreux.ch';

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowed =
    origin === ALLOWED_ORIGIN || origin === 'https://www.lenationalmontreux.ch'
      ? origin
      : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

async function sendEmail(apiKey, { guestName, guestEmail, apartment, arrival, departure, fileName, pdfBase64 }) {
  const subject = `New Check-in: ${guestName} — Apt ${apartment || 'N/A'}`;
  const html = `
    <h2 style="color:#1a1a2e;">New Guest Check-in Submitted</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Guest:</strong></td><td>${guestName}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${guestEmail || '—'}</td></tr>
      <tr><td><strong>Apartment:</strong></td><td>${apartment || '—'}</td></tr>
      <tr><td><strong>Arrival:</strong></td><td>${arrival || '—'}</td></tr>
      <tr><td><strong>Departure:</strong></td><td>${departure || '—'}</td></tr>
    </table>
    <p style="margin-top:16px;color:#555;">The signed check-in documents are attached as a PDF.</p>
  `;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      subject,
      html,
      attachments: [{ filename: fileName, content: pdfBase64 }],
    }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(`Resend API ${resp.status}: ${JSON.stringify(err)}`);
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const resendApiKey = env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    return new Response(JSON.stringify({ error: 'Email service unavailable.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { pdfBase64, fileName, guestName, guestEmail, apartment, arrival, departure } = body;

  if (!pdfBase64 || !fileName || !guestName) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendEmail(resendApiKey, { guestName, guestEmail, apartment, arrival, departure, fileName, pdfBase64 });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email send failed:', { message: err.message });
    return new Response(JSON.stringify({ error: 'Failed to send email. Please try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

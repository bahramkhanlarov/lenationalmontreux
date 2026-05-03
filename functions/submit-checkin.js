import { EmailMessage } from 'cloudflare:email';

const ALLOWED_ORIGIN = 'https://lenationalmontreux.ch';
const FROM_EMAIL = 'checkin@lenationalmontreux.ch';
const TO_EMAIL = 'info@lenationalmontreux.ch';

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

function chunkBase64(str) {
  const chunks = [];
  for (let i = 0; i < str.length; i += 76) chunks.push(str.slice(i, i + 76));
  return chunks.join('\r\n');
}

function buildMimeRaw({ subject, html, pdfBase64, pdfFilename }) {
  const boundary = `bound_${Date.now().toString(16)}`;
  return [
    'MIME-Version: 1.0',
    `From: Le National Check-in <${FROM_EMAIL}>`,
    `To: ${TO_EMAIL}`,
    `Subject: ${subject}`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
    '',
    `--${boundary}`,
    `Content-Type: application/pdf; name="${pdfFilename}"`,
    `Content-Disposition: attachment; filename="${pdfFilename}"`,
    'Content-Transfer-Encoding: base64',
    '',
    chunkBase64(pdfBase64),
    '',
    `--${boundary}--`,
  ].join('\r\n');
}

export async function handleSubmitCheckin(request, env) {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
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

  const subject = `New Check-in: ${guestName} — Apt ${apartment || 'N/A'}`;
  const html = `
    <h2 style="color:#1a1a2e;">New Guest Check-in</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Guest:</strong></td><td>${guestName}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${guestEmail || '—'}</td></tr>
      <tr><td><strong>Apartment:</strong></td><td>${apartment || '—'}</td></tr>
      <tr><td><strong>Arrival:</strong></td><td>${arrival || '—'}</td></tr>
      <tr><td><strong>Departure:</strong></td><td>${departure || '—'}</td></tr>
    </table>
    <p style="color:#555;">Signed check-in documents attached as PDF.</p>
  `;

  try {
    const raw = buildMimeRaw({ subject, html, pdfBase64, pdfFilename: fileName });
    const message = new EmailMessage(FROM_EMAIL, TO_EMAIL, raw);
    await env.EMAIL.send(message);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email send failed:', { message: err.message });
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

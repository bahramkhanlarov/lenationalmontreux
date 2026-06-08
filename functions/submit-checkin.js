/**
 * Receives the completed guest check-in (form fields + a base64-encoded PDF
 * generated client-side) and emails it to reception as a PDF attachment
 * via the Resend API.
 *
 * Required env secret: RESEND_API_KEY
 * Optional env vars:    RECEPTION_EMAIL (default: info@lenationalmontreux.ch)
 *                       CHECKIN_FROM_EMAIL (default: checkin@lenationalmontreux.ch)
 */

const ALLOWED_ORIGIN = 'https://lenationalmontreux.ch';
const DEFAULT_RECEPTION_EMAIL = 'info@lenationalmontreux.ch';
const DEFAULT_FROM_EMAIL = 'checkin@lenationalmontreux.ch';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_ATTEMPTS = 3;

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowed = origin === ALLOWED_ORIGIN || origin === 'https://www.lenationalmontreux.ch' ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function jsonResponse(payload, status, corsHeaders) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value) {
  return String(value || '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml(data) {
  const row = (label, value) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:bold;">${escapeHtml(label)}</td>` +
    `<td style="padding:4px 0;color:#222;">${escapeHtml(value)}</td></tr>`;

  return (
    `<div style="font-family:Georgia,serif;color:#1a1a2e;">` +
    `<h2 style="color:#1a1a2e;margin-bottom:4px;">Le National de Montreux</h2>` +
    `<p style="color:#b8960c;margin-top:0;font-style:italic;">New Guest Check-in</p>` +
    `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">` +
    row('Name', data.name) +
    row('Apartment', data.apt) +
    row('Arrival', data.arrival) +
    row('Departure', data.departure) +
    row('Email', data.email) +
    row('Passport Nr', data.passport) +
    row('Date of Birth', data.dob) +
    row('Nationality', data.nationality) +
    row('Guests', `${data.adults || '1'} adults, ${data.kids || '0'} children`) +
    row('Address', `${data.street || '—'}, ${data.city || '—'}`) +
    `</table>` +
    `<p style="color:#666;font-size:13px;margin-top:16px;">The signed check-in summary is attached as a PDF.</p>` +
    `</div>`
  );
}

async function sendViaResend(apiKey, message) {
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const resp = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const result = await resp.json();
      if (!resp.ok) {
        lastError = new Error(`Resend error ${resp.status}: ${result?.message || JSON.stringify(result)}`);
        console.warn('Resend send attempt failed', { attempt, status: resp.status, message: result?.message });
        continue;
      }
      return result;
    } catch (err) {
      lastError = err;
      console.warn('Resend request threw', { attempt, message: err.message });
    }
  }
  throw lastError || new Error('Resend send failed for unknown reason');
}

export async function handleSubmitCheckin(request, env) {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return jsonResponse({ error: 'Email service unavailable.' }, 500, corsHeaders);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400, corsHeaders);
  }

  const { data, pdfBase64, fileName } = body;
  if (!data || typeof data !== 'object') {
    return jsonResponse({ error: 'Missing check-in data' }, 400, corsHeaders);
  }
  if (!pdfBase64 || typeof pdfBase64 !== 'string') {
    return jsonResponse({ error: 'Missing PDF attachment' }, 400, corsHeaders);
  }

  const receptionEmail = env.RECEPTION_EMAIL || DEFAULT_RECEPTION_EMAIL;
  const fromEmail = env.CHECKIN_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const guestName = String(data.name || 'Guest');
  const apartment = data.apt ? String(data.apt) : 'N/A';

  const message = {
    from: `Le National Check-in <${fromEmail}>`,
    to: [receptionEmail],
    subject: `New Check-in: ${guestName} — Apt ${apartment}`,
    html: buildEmailHtml(data),
    attachments: [
      {
        filename: typeof fileName === 'string' && fileName.endsWith('.pdf') ? fileName : 'check-in.pdf',
        content: pdfBase64,
      },
    ],
  };

  if (data.email) {
    message.reply_to = String(data.email);
  }

  try {
    const result = await sendViaResend(apiKey, message);
    return jsonResponse({ success: true, id: result.id }, 200, corsHeaders);
  } catch (err) {
    console.error('Check-in email failed', { guest: guestName, message: err.message });
    return jsonResponse({ error: 'Could not send check-in email.' }, 502, corsHeaders);
  }
}

export async function onRequest(context) {
  return handleSubmitCheckin(context.request, context.env);
}

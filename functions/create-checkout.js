function formatDateReadable(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function buildQueryString(params) {
  return Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
}

const ALLOWED_ORIGIN = 'https://lenationalmontreux.ch';

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

export async function handleCreateCheckout(request, env) {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const instance = env.PAYREXX_INSTANCE;
  const apiKey   = env.PAYREXX_API_SECRET;
  const siteUrl  = 'https://lenationalmontreux.ch';

  if (!instance || !apiKey) {
    console.error('Payrexx env vars not configured');
    return new Response(JSON.stringify({ error: 'Payment service unavailable.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const { checkIn, checkOut, guests, nights, totalAmount, guestName, guestEmail } = body;

  if (!checkIn || !checkOut || !nights || !totalAmount || !guestEmail) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const amountInCents = String(Math.round(totalAmount * 100));
  const description = `Le National Montreux — ${nights} night(s) · Check-in: ${formatDateReadable(checkIn)} · Check-out: ${formatDateReadable(checkOut)} · ${guests} guest(s) · Cleaning fee included`;

  const [forename, ...surnameParts] = (guestName || '').trim().split(' ');
  const surname = surnameParts.join(' ') || forename;

  const params = {
    amount: amountInCents,
    currency: 'CHF',
    'fields[forename][value]': forename || '',
    'fields[surname][value]': surname || '',
    'fields[email][value]': guestEmail,
    referenceId: `${checkIn}_${checkOut}_${guestEmail}`,
    successRedirectUrl: `${siteUrl}/checkin.html?booking=success&checkin=${checkIn}&checkout=${checkOut}`,
    failedRedirectUrl: `${siteUrl}/#booking`,
    cancelRedirectUrl: `${siteUrl}/#booking`,
    'basket[0][name]': description,
    'basket[0][quantity]': '1',
    'basket[0][amount]': amountInCents,
  };

  try {
    const resp = await fetch(
      `https://api.payrexx.com/v1.14/Gateway/?instance=${encodeURIComponent(instance)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-API-KEY': apiKey },
        body: buildQueryString(params),
      }
    );

    const result = await resp.json();

    if (result.status !== 'success' || !result.data?.[0]) {
      return new Response(JSON.stringify({ error: result.message || 'Payrexx gateway creation failed' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: result.data[0].link }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Payrexx request error:', err.message);
    return new Response(JSON.stringify({ error: 'Payment gateway error. Please try again.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Cloudflare Pages Functions compat
export async function onRequest(context) {
  return handleCreateCheckout(context.request, context.env);
}

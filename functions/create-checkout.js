function formatDateReadable(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function appendParam(params, key, value) {
  if (value !== undefined && value !== null && value !== '') {
    params.append(key, String(value));
  }
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

  const stripeSecretKey = env.STRIPE_SECRET_KEY;
  const siteUrl = env.SITE_URL || 'https://lenationalmontreux.ch';

  if (!stripeSecretKey) {
    console.error('Stripe env vars not configured');
    return new Response(JSON.stringify({ error: 'Payment service unavailable.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const { checkIn, checkOut, guests, nights, totalAmount, guestName, guestEmail } = body;

  if (!checkIn || !checkOut || !nights || !totalAmount || !guestEmail) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const amountInCents = Math.round(Number(totalAmount) * 100);
  if (!Number.isFinite(amountInCents) || amountInCents <= 0) {
    return new Response(JSON.stringify({ error: 'Invalid booking amount' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const description = `${nights} night(s) · Check-in: ${formatDateReadable(checkIn)} · Check-out: ${formatDateReadable(checkOut)} · ${guests} guest(s) · Cleaning fee included`;
  const successUrl = `${siteUrl}/checkin.html?booking=success&checkin=${encodeURIComponent(checkIn)}&checkout=${encodeURIComponent(checkOut)}&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${siteUrl}/#booking`;

  const params = new URLSearchParams();
  appendParam(params, 'mode', 'payment');
  appendParam(params, 'success_url', successUrl);
  appendParam(params, 'cancel_url', cancelUrl);
  appendParam(params, 'customer_email', guestEmail);
  appendParam(params, 'billing_address_collection', 'auto');
  appendParam(params, 'line_items[0][quantity]', 1);
  appendParam(params, 'line_items[0][price_data][currency]', 'chf');
  appendParam(params, 'line_items[0][price_data][unit_amount]', amountInCents);
  appendParam(params, 'line_items[0][price_data][product_data][name]', 'Le National Montreux stay');
  appendParam(params, 'line_items[0][price_data][product_data][description]', description);
  appendParam(params, 'metadata[check_in]', checkIn);
  appendParam(params, 'metadata[check_out]', checkOut);
  appendParam(params, 'metadata[guest_name]', guestName || '');
  appendParam(params, 'metadata[guest_email]', guestEmail);
  appendParam(params, 'metadata[guests]', guests || '');
  appendParam(params, 'metadata[nights]', nights);
  appendParam(params, 'payment_intent_data[description]', `Le National Montreux booking for ${guestEmail}`);
  appendParam(params, 'payment_intent_data[metadata][check_in]', checkIn);
  appendParam(params, 'payment_intent_data[metadata][check_out]', checkOut);
  appendParam(params, 'payment_intent_data[metadata][guest_email]', guestEmail);

  try {
    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
    });

    const result = await resp.json();

    if (!resp.ok || !result.url) {
      console.error('Stripe checkout creation failed', result);
      return new Response(JSON.stringify({ error: result.error?.message || 'Stripe checkout creation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: result.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Stripe request error:', err.message);
    return new Response(JSON.stringify({ error: 'Payment gateway error. Please try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequest(context) {
  return handleCreateCheckout(context.request, context.env);
}

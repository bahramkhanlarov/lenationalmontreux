const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const RATES = { peak: 650, default: 480 };
const CLEANING_FEE = 150;
const CITY_TAX_PER_ADULT_NIGHT = 6;
const MIN_NIGHTS = 3;

function getRateForDate(date) {
  const m = date.getMonth();
  if (m >= 4 && m <= 8) return RATES.peak; // May 1 – September 30
  return RATES.default;
}

function calcTotal(checkIn, checkOut, adults) {
  let accommodation = 0;
  const nights = Math.round((checkOut - checkIn) / 86400000);
  const cur = new Date(checkIn);
  for (let i = 0; i < nights; i++) {
    accommodation += getRateForDate(cur);
    cur.setDate(cur.getDate() + 1);
  }
  const cityTax = CITY_TAX_PER_ADULT_NIGHT * adults * nights;
  return { nights, accommodation, cityTax, total: accommodation + cityTax + CLEANING_FEE };
}

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

  const { checkIn, checkOut, adults: adultsRaw, children: childrenRaw, guestName, guestEmail } = body;
  const adults = Math.max(1, parseInt(adultsRaw, 10) || 1);
  const children = Math.max(0, parseInt(childrenRaw, 10) || 0);

  if (!checkIn || !checkOut || !guestEmail) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
    return new Response(JSON.stringify({ error: 'Invalid date format' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  if (isNaN(checkInDate) || isNaN(checkOutDate) || checkOutDate <= checkInDate) {
    return new Response(JSON.stringify({ error: 'Invalid date range' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const { nights, accommodation, cityTax, total } = calcTotal(checkInDate, checkOutDate, adults);
  if (nights < MIN_NIGHTS) {
    return new Response(JSON.stringify({ error: `Minimum stay is ${MIN_NIGHTS} nights` }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const amountInCents = Math.round(total * 100);

  const description = `${nights} night(s) · Check-in: ${formatDateReadable(checkIn)} · Check-out: ${formatDateReadable(checkOut)} · ${adults} adult(s), ${children} child(ren) · City tax CHF ${cityTax} · Cleaning fee CHF ${CLEANING_FEE}`;
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
  appendParam(params, 'metadata[adults]', String(adults));
  appendParam(params, 'metadata[children]', String(children));
  appendParam(params, 'metadata[nights]', String(nights));
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

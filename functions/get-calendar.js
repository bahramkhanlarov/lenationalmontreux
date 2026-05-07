function parseBlockedDates(ical) {
  const blocked = new Set();
  const events = ical.split('BEGIN:VEVENT');
  events.shift();

  for (const event of events) {
    const startMatch = event.match(/DTSTART[;:][^\r\n]*:?(\d{8})/);
    const endMatch   = event.match(/DTEND[;:][^\r\n]*:?(\d{8})/);
    if (!startMatch || !endMatch) continue;

    const parseCompact = (s) => {
      const y = parseInt(s.slice(0, 4), 10);
      const m = parseInt(s.slice(4, 6), 10) - 1;
      const d = parseInt(s.slice(6, 8), 10);
      return new Date(y, m, d);
    };

    const start = parseCompact(startMatch[1]);
    const end   = parseCompact(endMatch[1]);
    const cur   = new Date(start);

    while (cur < end) {
      blocked.add(cur.toISOString().split('T')[0]);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return Array.from(blocked).sort();
}

const ALLOWED_ORIGIN = 'https://lenationalmontreux.ch';

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowed = origin === ALLOWED_ORIGIN || origin === 'https://www.lenationalmontreux.ch' ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

async function fetchBlockedDates(name, url) {
  if (!url) return [];
  if (!url.startsWith('https://')) {
    console.error(`${name} must use https://`);
    return [];
  }
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`${name} fetch failed: ${resp.status}`);
  const ical = await resp.text();
  return parseBlockedDates(ical);
}

export async function handleGetCalendar(request, env) {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const [airbnbDates, vrboDates] = await Promise.all([
      fetchBlockedDates('AIRBNB_ICAL_URL', env.AIRBNB_ICAL_URL),
      fetchBlockedDates('VRBO_ICAL_URL', env.VRBO_ICAL_URL),
    ]);

    const blockedDates = Array.from(new Set([...airbnbDates, ...vrboDates])).sort();

    return new Response(JSON.stringify({ blockedDates }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
    });
  } catch (err) {
    console.error('Calendar fetch error:', err.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch calendar' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Cloudflare Pages Functions compat
export async function onRequest(context) {
  return handleGetCalendar(context.request, context.env);
}

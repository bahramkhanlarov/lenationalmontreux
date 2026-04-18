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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function handleGetCalendar(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const icalUrl = env.AIRBNB_ICAL_URL;

  if (!icalUrl) {
    return new Response(JSON.stringify({ blockedDates: [], warning: 'AIRBNB_ICAL_URL not configured' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const resp = await fetch(icalUrl);
    if (!resp.ok) throw new Error(`iCal fetch failed: ${resp.status}`);
    const ical = await resp.text();
    const blockedDates = parseBlockedDates(ical);

    return new Response(JSON.stringify({ blockedDates }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch calendar', detail: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Cloudflare Pages Functions compat
export async function onRequest(context) {
  return handleGetCalendar(context.request, context.env);
}

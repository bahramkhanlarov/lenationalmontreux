function toICalDate(dateStr) {
  return dateStr.replace(/-/g, '');
}

function escapeIcal(str) {
  return (str || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function dtstamp() {
  return new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
}

export async function handleIcal(request, env) {
  if (!env.BOOKINGS_KV) {
    return new Response('KV not configured', { status: 500 });
  }

  const listed = await env.BOOKINGS_KV.list({ prefix: 'booking:' });

  const bookings = [];
  for (const { name } of listed.keys) {
    const raw = await env.BOOKINGS_KV.get(name);
    if (!raw) continue;
    try { bookings.push(JSON.parse(raw)); } catch { /* skip malformed */ }
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Le National Montreux//Direct Bookings//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Le National Montreux – Direct Bookings',
    'X-WR-TIMEZONE:Europe/Zurich',
  ];

  for (const b of bookings) {
    const uid = `${b.sessionId || b.checkIn + b.checkOut}@lenationalmontreux.ch`;
    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTART;VALUE=DATE:${toICalDate(b.checkIn)}`,
      `DTEND;VALUE=DATE:${toICalDate(b.checkOut)}`,
      `SUMMARY:${escapeIcal('Direct booking – ' + (b.guestName || 'Guest'))}`,
      `DTSTAMP:${dtstamp()}`,
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');

  return new Response(lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="le-national-direct.ics"',
      'Cache-Control': 'no-cache, no-store',
    },
  });
}

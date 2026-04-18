/**
 * Netlify Function: get-calendar
 *
 * Fetches the Airbnb iCal export and returns blocked dates as JSON.
 * Set the environment variable AIRBNB_ICAL_URL in your Netlify dashboard.
 *
 * Response: { blockedDates: ["2026-07-10", "2026-07-11", ...] }
 */

const https = require('https');
const http = require('http');

/**
 * @param {string} url
 * @returns {Promise<string>}
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Parse iCal VEVENT blocks and return occupied date strings (YYYY-MM-DD).
 * Each VEVENT with DTSTART/DTEND marks blocked nights.
 * @param {string} ical
 * @returns {string[]}
 */
function parseBlockedDates(ical) {
  const blocked = new Set();
  const events = ical.split('BEGIN:VEVENT');
  events.shift(); // remove header before first VEVENT

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

    // Block all nights from start up to (not including) end
    while (cur < end) {
      blocked.add(cur.toISOString().split('T')[0]);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return Array.from(blocked).sort();
}

exports.handler = async function(event, context) {
  const icalUrl = process.env.AIRBNB_ICAL_URL;

  if (!icalUrl) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ blockedDates: [], warning: 'AIRBNB_ICAL_URL not configured' })
    };
  }

  try {
    const ical = await fetchUrl(icalUrl);
    const blockedDates = parseBlockedDates(ical);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      },
      body: JSON.stringify({ blockedDates })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to fetch calendar', detail: err.message })
    };
  }
};

/**
 * Netlify Function: create-checkout
 *
 * Creates a Payrexx Gateway (hosted checkout) for a direct apartment booking.
 * Required environment variables (set in Netlify dashboard):
 *   PAYREXX_INSTANCE   — your Payrexx instance name (e.g. "lenational")
 *   PAYREXX_API_SECRET — your Payrexx API secret key
 *
 * Request body (JSON):
 *   checkIn      string   "YYYY-MM-DD"
 *   checkOut     string   "YYYY-MM-DD"
 *   guests       string   "2"
 *   nights       number   5
 *   totalAmount  number   total in CHF (including cleaning fee)
 *   guestName    string   "Jane Doe"
 *   guestEmail   string   "jane@example.com"
 *
 * Response: { url: "https://<instance>.payrexx.com/?payment=..." }
 */

const https = require('https');

/**
 * @param {string} dateStr  "YYYY-MM-DD"
 * @returns {string}        "15 Jul 2026"
 */
function formatDateReadable(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Build query string keeping bracket keys unencoded (e.g. fields[email][value])
 * but encoding values — required by Payrexx form POST format.
 * @param {Record<string, string>} params
 * @returns {string}
 */
function buildQueryString(params) {
  return Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
}

/**
 * POST to Payrexx REST API using X-API-KEY header authentication.
 * @param {string} instance
 * @param {string} apiKey
 * @param {Record<string, string>} params
 * @returns {Promise<object>}
 */
function postToPayrexx(instance, apiKey, params) {
  const postData = buildQueryString(params);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.payrexx.com',
        path: `/v1.14/Gateway/?instance=${encodeURIComponent(instance)}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
          'X-API-KEY': apiKey
        }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Invalid JSON from Payrexx: ${data}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const instance = process.env.PAYREXX_INSTANCE;
  const apiSecret = process.env.PAYREXX_API_SECRET;
  const siteUrl = process.env.URL || 'https://lenationalmontreux.ch';

  if (!instance || !apiSecret) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Payrexx not configured. Set PAYREXX_INSTANCE and PAYREXX_API_SECRET in Netlify environment variables.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const { checkIn, checkOut, guests, nights, totalAmount, guestName, guestEmail } = body;

  if (!checkIn || !checkOut || !nights || !totalAmount || !guestEmail) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing required fields' })
    };
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
    'basket[0][amount]': amountInCents
  };

  try {
    const result = await postToPayrexx(instance, apiSecret, params);

    if (result.status !== 'success' || !result.data || !result.data[0]) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: result.message || 'Payrexx gateway creation failed' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ url: result.data[0].link })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};

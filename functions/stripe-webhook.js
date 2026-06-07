async function verifyStripeSignature(rawBody, sigHeader, secret) {
  const parts = sigHeader.split(',').reduce((acc, part) => {
    const [k, v] = part.split('=');
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});

  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) return false;

  const payload = `${timestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const computed = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return computed === signature;
}

function formatDateReadable(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function buildEmailHtml(booking) {
  const {
    guestName, checkIn, checkOut, nights, adults, children,
    amountTotal, currency, sessionId
  } = booking;

  const total = amountTotal ? `CHF ${(amountTotal / 100).toLocaleString('en-CH', { minimumFractionDigits: 2 })}` : '—';
  const childrenNum = parseInt(children, 10) || 0;
  const guestsLine = childrenNum > 0
    ? `${adults} adult${adults > 1 ? 's' : ''}, ${childrenNum} child${childrenNum > 1 ? 'ren' : ''}`
    : `${adults} adult${adults > 1 ? 's' : ''}`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e0d9cc;">

        <!-- Header -->
        <tr>
          <td style="background:#0d0d11;padding:36px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c9a84c;">Le National</p>
            <h1 style="margin:0;font-size:26px;font-weight:300;color:#f0e8d8;letter-spacing:2px;">Montreux</h1>
            <div style="width:40px;height:1px;background:#c9a84c;margin:16px auto 0;"></div>
          </td>
        </tr>

        <!-- Confirmation badge -->
        <tr>
          <td style="padding:36px 40px 0;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Booking Confirmed</p>
            <h2 style="margin:0;font-size:22px;font-weight:400;color:#1a1a1a;">Thank you, ${guestName ? guestName.split(' ')[0] : 'dear guest'}.</h2>
            <p style="margin:12px 0 0;font-size:15px;color:#666;line-height:1.7;">Your reservation at Le National Montreux is confirmed.<br>We look forward to welcoming you.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:28px 40px 0;"><div style="height:1px;background:#e0d9cc;"></div></td></tr>

        <!-- Booking details -->
        <tr>
          <td style="padding:28px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;">
                  <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Check-in</span><br>
                  <span style="font-size:16px;color:#1a1a1a;margin-top:4px;display:block;">${formatDateReadable(checkIn)}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;text-align:right;">
                  <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Check-out</span><br>
                  <span style="font-size:16px;color:#1a1a1a;margin-top:4px;display:block;">${formatDateReadable(checkOut)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;">
                  <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Duration</span><br>
                  <span style="font-size:16px;color:#1a1a1a;margin-top:4px;display:block;">${nights} night${nights > 1 ? 's' : ''}</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;text-align:right;">
                  <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Guests</span><br>
                  <span style="font-size:16px;color:#1a1a1a;margin-top:4px;display:block;">${guestsLine}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;" colspan="2">
                  <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Total Paid</span><br>
                  <span style="font-size:20px;color:#c9a84c;font-weight:400;margin-top:4px;display:block;">${total}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Address block -->
        <tr>
          <td style="padding:0 40px 28px;">
            <div style="background:#f9f7f3;border:1px solid #e0d9cc;padding:20px 24px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;">Property Address</p>
              <p style="margin:0;font-size:15px;color:#1a1a1a;line-height:1.6;">
                Le National Montreux<br>
                Grand-Rue 1, 1820 Montreux<br>
                Switzerland
              </p>
            </div>
          </td>
        </tr>

        <!-- Note -->
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0;font-size:14px;color:#888;line-height:1.7;text-align:center;">
              Questions? Email us at <a href="mailto:info@lenationalmontreux.ch" style="color:#c9a84c;text-decoration:none;">info@lenationalmontreux.ch</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d0d11;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(240,232,216,0.3);">
              Le National Montreux · Ref: ${sessionId ? sessionId.slice(-8).toUpperCase() : '—'}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendConfirmationEmail(booking, resendApiKey) {
  if (!booking.guestEmail) return;

  const html = buildEmailHtml(booking);
  const firstName = booking.guestName ? booking.guestName.split(' ')[0] : 'Guest';

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Le National Montreux <bookings@lenationalmontreux.ch>',
      to: [booking.guestEmail],
      subject: `Booking Confirmed – Le National Montreux · ${formatDateReadable(booking.checkIn)}`,
      html,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error('Resend email failed:', err);
  } else {
    console.log('Confirmation email sent to', booking.guestEmail);
  }
}

export async function handleStripeWebhook(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const rawBody = await request.text();
  const sigHeader = request.headers.get('stripe-signature');

  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return new Response('Webhook not configured', { status: 500 });
  }

  if (!sigHeader) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  const valid = await verifyStripeSignature(rawBody, sigHeader, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    console.error('Stripe webhook signature verification failed');
    return new Response('Invalid signature', { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta = session.metadata || {};
    const { check_in, check_out, guest_name, guest_email, adults, children, nights } = meta;

    if (check_in && check_out) {
      const booking = {
        checkIn: check_in,
        checkOut: check_out,
        guestName: guest_name || '',
        guestEmail: guest_email || '',
        adults: adults || '1',
        children: children || '0',
        nights: nights || '',
        sessionId: session.id,
        amountTotal: session.amount_total,
        currency: session.currency,
        createdAt: new Date().toISOString(),
      };

      const key = `booking:${check_in}:${check_out}:${session.id}`;
      await env.BOOKINGS_KV.put(key, JSON.stringify(booking));
      console.log('Booking stored:', key);

      if (env.RESEND_API_KEY) {
        await sendConfirmationEmail(booking, env.RESEND_API_KEY);
      } else {
        console.warn('RESEND_API_KEY not set — skipping confirmation email');
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

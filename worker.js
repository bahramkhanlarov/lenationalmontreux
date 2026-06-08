/**
 * Cloudflare Worker entry point
 * Routes /get-calendar and /create-checkout to handlers.
 * All other requests fall through to static assets.
 */

import { handleGetCalendar } from './functions/get-calendar.js';
import { handleCreateCheckout } from './functions/create-checkout.js';
import { handleIcal } from './functions/ical.js';
import { handleStripeWebhook } from './functions/stripe-webhook.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.hostname.startsWith('www.')) {
      const canonical = new URL(request.url);
      canonical.hostname = canonical.hostname.slice(4);
      return Response.redirect(canonical.toString(), 301);
    }

    if (url.pathname === '/get-calendar') {
      return handleGetCalendar(request, env);
    }

    if (url.pathname === '/create-checkout') {
      return handleCreateCheckout(request, env);
    }

    if (url.pathname === '/ical') {
      return handleIcal(request, env);
    }

    if (url.pathname === '/stripe-webhook') {
      return handleStripeWebhook(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

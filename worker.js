/**
 * Cloudflare Worker entry point
 * Routes /get-calendar and /create-checkout to handlers.
 * All other requests fall through to static assets.
 */

import { handleGetCalendar } from './functions/get-calendar.js';
import { handleCreateCheckout } from './functions/create-checkout.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/get-calendar') {
      return handleGetCalendar(request, env);
    }

    if (url.pathname === '/create-checkout') {
      return handleCreateCheckout(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

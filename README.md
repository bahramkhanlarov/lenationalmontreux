# Le National Montreux

## Stripe checkout setup

This project uses Stripe Checkout through the server-side `/create-checkout` endpoint.

Required environment variables:

- `STRIPE_SECRET_KEY`
  Use a Stripe secret key such as `sk_test_...` or `sk_live_...`.
  This is required for the Cloudflare deployment.

Optional environment variables:

- `SITE_URL`
  Used by the Cloudflare function for checkout success and cancel redirects.
  Default: `https://lenationalmontreux.ch`

## Where to set the variables

Cloudflare Pages / Workers:

- Settings
- Variables and Secrets
- Add secret `STRIPE_SECRET_KEY`
- Optionally add `SITE_URL`

## Security

Do not commit Stripe keys to the repository.

The previously shared test secret key should be rotated in Stripe and replaced in deployment settings before going live.

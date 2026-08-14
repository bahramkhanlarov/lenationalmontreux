# SEO Audit — lenationalmontreux.ch

**Date**: 2026-08-14
**Business type**: Local Service / Vacation Rental (single luxury apartment, Montreux, Switzerland)
**Pages assessed**: `/` (index.html, primary indexable page), `/checkin.html` (password-gated guest tool, correctly excluded from indexing via robots.txt)
**Method**: Direct inspection of live site (headers, HTML, schema) + local repo source (`index.html`, `main.js`, `translations.js`, `robots.txt`, `sitemap.xml`, `photos/`). No PageSpeed Insights data — Google's public quota for this key was exhausted at audit time (429); performance findings below are derived from asset inspection and rendering-path analysis instead of lab CWV numbers.

## SEO Health Score: 64 / 100 — Needs Improvement

| Category | Score | Weight |
|---|---|---|
| Technical SEO | 70/100 | 22% |
| Content Quality | 65/100 | 23% |
| On-Page SEO | 75/100 | 20% |
| Schema / Structured Data | 65/100 | 10% |
| Performance (CWV, estimated) | 40/100 | 10% |
| AI Search Readiness | 65/100 | 10% |
| Images | 50/100 | 5% |

## Top 4 Critical Issues

1. **HTTP does not redirect to HTTPS.** `http://lenationalmontreux.ch/` and `http://www.lenationalmontreux.ch/` both return `200` and serve the full page over plain HTTP instead of a `301` to `https://`. The `Strict-Transport-Security` header is sent on the HTTPS response, but it's meaningless if the HTTP endpoint never forces the upgrade — browsers only honor HSTS after they've already seen it once over HTTPS, and any user, bot, or old bookmark hitting the bare `http://` URL first gets unencrypted content indexed and served. **Fix in Cloudflare**: SSL/TLS → Edge Certificates → enable "Always Use HTTPS" (or add a redirect rule).

2. **NAP (address) mismatch between structured data and visible page content.** The `LodgingBusiness` schema declares `"streetAddress": "Grand-Rue 1"`, but the page itself (Contact section and footer) displays **"Avenue du Casino 10, 1820 Montreux"** twice. This is a real trust/local-SEO problem — Google cross-checks schema against on-page content and against Google Business Profile data; a mismatch can suppress rich results or hurt local pack visibility, and it's confusing for actual guests. **Needs a decision from you**: which address is correct? I did not change either value — flagging for you to confirm and fix.

3. **Hero slideshow is invisible to the initial HTML and now serving oversized images.** `#heroSlides` is an empty `<div>` in the HTML; all 5 hero images are injected by JavaScript as CSS `background-image`s only after `main.js` runs, so the browser's preloader can't discover the LCP (Largest Contentful Paint) image early — this alone delays LCP on every visit. Compounding it: the current `HERO_PHOTOS` array (from this session's spa-photo removal) points at 5 raw iPhone JPGs weighing **2.1–2.4 MB each** (vs. 20–40 KB for the AVIF photos used elsewhere on the site) — roughly **11 MB** requested immediately on page load, all fighting for bandwidth with the actual LCP paint. This is the single biggest performance regression on the site right now, and it's one I introduced when swapping out the removed spa/pool hero photos — recommend fixing immediately (see Action Plan).

4. **Duplicate, non-standard `<meta name="description">` tag.** Two `<meta name="description">` tags exist — the second carries a `lang="fr"` attribute, but `lang` doesn't scope a meta description per-locale on a single URL; search engines read the first tag only. The French description is currently dead weight and its presence could read as a minor markup error during automated audits.

## Top 4 Quick Wins

1. Enable Cloudflare's "Always Use HTTPS" — a one-toggle fix for issue #1.
2. Swap `HERO_PHOTOS` in `main.js` back to already-optimized AVIF/WebP files (several exist in `photos/` unused, ~20–40 KB each) instead of the raw JPGs — cuts ~10 MB off first paint immediately.
3. Remove the second, non-functional `<meta name="description" lang="fr">` tag from `index.html`.
4. Add descriptive `alt` text to the 43 gallery photos (currently all read "Apartment photo 1", "Apartment photo 2", etc. — generic, injected by `main.js`) — even short room labels ("Living room with lake view", "Master bedroom") help image search and accessibility.

---

## Technical SEO — 70/100

**Working well:**
- Strong security header set: CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS with `preload` + `includeSubDomains`.
- `robots.txt` is thoughtfully configured: allows all major crawlers, explicitly blocks scraper bots (Bytespider, CCBot, Amazonbot, meta-externalagent), and explicitly *allows* AI crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`) — a deliberate, forward-looking choice for AI Overviews / ChatGPT / Claude citability.
- `sitemap.xml` is valid and referenced from `robots.txt`; single-URL sitemap is appropriate for a single-page marketing site.
- `checkin.html` is correctly disallowed from crawling in `robots.txt`.
- Canonical tag present and points to the correct apex `https://lenationalmontreux.ch`.

**Issues:**
- **Critical**: HTTP → HTTPS redirect missing (see above).
- **High**: Both `lenationalmontreux.ch` and `www.lenationalmontreux.ch` serve identical `200` content with no redirect between them — currently relying solely on the canonical tag to avoid duplicate-content treatment. A `301` from `www` → apex (or vice versa) is the more robust fix and saves crawl budget.
- **Medium**: `checkin.html` is blocked in `robots.txt` (crawling) but has no `noindex` meta tag or `X-Robots-Tag` header — if the URL is ever discovered another way (e.g. linked from an email, backlink), Google could still index the bare URL with no snippet. Belt-and-suspenders: add `<meta name="robots" content="noindex,nofollow">` to `checkin.html`.

## Content Quality — 65/100

**Working well:**
- ~4,500 words of rendered text (including UI chrome) across a single page with real specificity: amenities, location details (walking times to landmarks), 6 real guest testimonials with names/dates.
- Clear value proposition and audience targeting (luxury travelers, Jazz Festival visitors).
- RivieraHost / KhanAnalytics attribution and Google review CTA in the check-in flow support E-E-A-T (real property manager, verifiable footprint).

**Issues:**
- **Critical**: NAP mismatch (see above) undermines trust signals for both users and Google.
- **Low**: No FAQ-style content (e.g., "What's included," "How does check-in work," "Is parking included") — this is the easiest lever to pull for AI Overviews/ChatGPT citability and for capturing longer-tail search queries, and there's no FAQPage schema either.

## On-Page SEO — 75/100

**Working well:**
- Title tag: 64 characters — within safe display limits.
- Meta description: 137 characters — good length.
- Single `<h1>` ("Luxury Apartment... Montreux... Sanctuary Above Lake Geneva"), logical `<h2>`/`<h3>` hierarchy per section, no heading-level skips.
- `viewport` meta present, charset declared, `lang="en"` set on `<html>`.

**Issues:**
- **Low**: Duplicate/invalid second `<meta name="description">` tag (see above) — remove it.
- **Medium**: Site offers a 6-language UI toggle (EN/FR/DE/RU/AR/ZH) entirely client-side via `translations.js`, with no separate URLs and no `hreflang` alternates. Search engines will only ever index the single English DOM state — French-speaking searchers (a meaningfully large share of Montreux/Swiss traffic) get no localized snippet in results. Not urgent to re-architect, but worth knowing: this is a ceiling on how much of your bilingual audience search can reach organically.

## Schema / Structured Data — 60/100

**Working well:**
- Rich `LodgingBusiness` + `VacationRental` typed schema: address, geo coordinates, occupancy, price range, check-in/out times, `containedInPlace` hierarchy (City → Country), and a full `AggregateRating` + 6 individual `Review` entries with author/rating/date — all of which are eligible for rich results if valid.

**Issues:**
- **Critical**: Address mismatch vs. visible content (see above) — this is the kind of inconsistency Google's structured data guidelines flag, and can suppress rich-result eligibility.
- **Low**: `"telephone": ""` — empty string field; either populate a real number or remove the field entirely (an empty string is worse than omission).

## Performance (estimated, no live CWV) — 40/100

**Working well:**
- Cloudflare edge caching (`cf-cache-status: HIT`), `zstd` compression on HTML.
- Gallery images use `loading="lazy"` and are mostly modern AVIF/WebP format, averaging 20–40 KB each — excellent for a gallery of 40+ photos.
- Google Fonts loaded with `preconnect` hints.

**Issues:**
- **Critical**: Hero slideshow LCP path (see above) — no HTML-level image, no `preload`/`fetchpriority`, and (currently) 5 unoptimized JPGs totaling ~11 MB requested immediately on load.
- **High**: No `srcset`/responsive image sizing anywhere on the site — every visitor downloads full-resolution images regardless of viewport.
- **Medium**: 13 raw JPGs remain in `photos/` at 1.5–3 MB each (mixed in with well-optimized AVIF/WebP files) — worth an AVIF conversion pass across the board, not just the hero set.

## Images — 50/100

**Working well:**
- The two static `<img>` tags in the HTML (`about-img`, lightbox placeholder) have descriptive/appropriate `alt` text.
- Consistent `loading="lazy"` on all gallery images.

**Issues:**
- **Medium**: All 40+ gallery images get generic, non-descriptive `alt="Apartment photo N"` text (`main.js:66`) — a missed opportunity for image search and accessibility (screen reader users get no useful information).
- **Critical** (shared with Performance): unoptimized raw JPGs, especially the 5 currently used as hero images.

## AI Search Readiness — 65/100

**Working well:**
- `robots.txt` explicitly welcomes `GPTBot`, `ClaudeBot`, `Google-Extended`, and `Applebot-Extended` — most sites don't think about this at all; this one does.
- Rich structured data (reviews, amenities, geo) gives AI answer engines concrete facts to cite.

**Issues:**
- **Low**: No `llms.txt` (an emerging, not-yet-standardized convention some AI crawlers look for) — low priority, optional.
- **Medium**: Content is marketing-toned rather than answer-first; no FAQ section/schema means AI Overviews and chat assistants have fewer discrete, quotable facts to pull from beyond the review snippets.

---

## Not Assessed (tooling unavailable at audit time)
- **Core Web Vitals field data**: PageSpeed Insights API quota exhausted (429) — no live LCP/INP/CLS numbers. Performance section above is derived from static asset/markup analysis, which reliably predicts a poor LCP given the hero-image findings, but exact millisecond figures aren't available.
- **Search Console / GA4 data**: no credentials configured in this environment — indexation status and real organic traffic/query data aren't included.
- **Backlink profile**: no Moz/Bing Webmaster credentials configured.
- **Screenshots / visual/mobile rendering check**: no Playwright available in this environment.

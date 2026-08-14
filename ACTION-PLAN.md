# Action Plan — lenationalmontreux.ch

Prioritized fixes from the [Full Audit Report](FULL-AUDIT-REPORT.md). Effort estimates assume the existing Cloudflare Workers/Wrangler deploy flow already in use for this project.

## Critical (fix immediately)

| # | Issue | Fix | Effort | Owner |
|---|---|---|---|---|
| 1 | HTTP doesn't redirect to HTTPS | Cloudflare dashboard → SSL/TLS → Edge Certificates → enable "Always Use HTTPS" | 2 min | You (dashboard access needed) |
| 2 | NAP mismatch: schema says "Grand-Rue 1", page says "Avenue du Casino 10" | Confirm the correct address, then update either `index.html`'s JSON-LD `streetAddress` or the two visible `contactAddress`/footer instances to match | 5 min once confirmed | You to confirm, I can apply |
| 3 | Hero slideshow loads ~11 MB of raw JPGs with no preload | Swap `HERO_PHOTOS` in `main.js` to existing unused AVIF/WebP files; add a `<link rel="preload" as="image">` for the first hero image in `index.html` | 15–20 min | I can do this now if you'd like |

## High (fix within 1 week)

| # | Issue | Fix | Effort |
|---|---|---|---|
| 4 | `www` and apex both serve `200` with no redirect | Add a Cloudflare redirect rule: `www.lenationalmontreux.ch/*` → `https://lenationalmontreux.ch/$1` (301) | 5 min |
| 5 | No responsive images (`srcset`/`sizes`) | Generate 2–3 sizes per gallery photo and add `srcset`; biggest win on mobile data usage | 1–2 hrs (needs an image pipeline) |

## Medium (fix within 1 month)

| # | Issue | Fix | Effort |
|---|---|---|---|
| 6 | Stale `"Private Spa"`/`"Swimming Pool"` in JSON-LD `amenityFeature` | Remove those two entries from the schema block in `index.html` | 2 min |
| 7 | Generic gallery `alt` text ("Apartment photo N") | Add a per-photo caption/alt array in `main.js` (mirrors the room-labeled comments already in `PHOTOS`) | 30–45 min |
| 8 | `checkin.html` has no `noindex` meta tag | Add `<meta name="robots" content="noindex,nofollow">` to `checkin.html` `<head>` | 2 min |
| 9 | Duplicate/invalid second `<meta name="description" lang="fr">` | Delete that tag from `index.html` | 2 min |
| 10 | 13 remaining raw JPGs in `photos/` (1.5–3 MB each) | Batch-convert to AVIF (e.g. via `sharp`/`avifenc`) at ~80–90% quality | 30–60 min |
| 11 | No FAQ content/schema | Add a short FAQ section (check-in process, parking, cancellation policy) with `FAQPage` schema | 1–2 hrs |

## Low (backlog)

| # | Issue | Fix |
|---|---|---|
| 12 | Empty `"telephone": ""` in schema | Populate a real number or remove the field |
| 13 | No `hreflang` alternates for the 6-language UI toggle | Would require server-rendered per-language URLs — architectural change, not a quick fix; only worth it if French/German organic traffic is a stated goal |
| 14 | No `llms.txt` | Optional, emerging convention; add a short one if desired |

---

## Suggested immediate next step

Items **#3** (hero image weight) and **#6** (stale schema) are quick, low-risk fixes I can apply and deploy right now if you'd like — #3 in particular undoes a regression from this session's spa-photo removal. Item **#2** (NAP mismatch) needs your confirmation of the correct address before I touch it, since I don't know which one is right. Item **#1** requires your Cloudflare dashboard access, not something I can toggle via the tools available here.

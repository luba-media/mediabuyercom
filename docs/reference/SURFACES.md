# SURFACES — spy-tool.vercel.app reference

Captured 2026-05-08. Public surfaces only — `/search`, `/spy`, app routes redirect home (auth-walled).

## Public surfaces

### `/` — landing
- Hero: "Native Ad Intelligence. Powered by AI." subhead "The spy tool that doesn't just show you what's working — it tells you WHY and helps you CREATE better."
- Stat strip: "7.4M+ ads tracked", "Hourly updates", "Taboola + Outbrain"
- CTAs: "Get Started" (primary, dark), "See it in action" (secondary, ghost)
- Section: "AI-First Intelligence" — six AI tool cards (LP Cloner, Hook Classifier, Trend Predictor, Niche Intelligence, plus 2 more)
- Section: "From spy to campaign in 3 minutes" — 4 numbered steps
- Section: "Why affiliates switch from Anstrex & AdPlexity" — comparison table
- Pricing teaser (Starter $49, Pro $99 most-popular, Agency $199)
- Trust strip: "7.4M+ Native ads tracked / <60min Data freshness / 200+ Day ad history"
- Final CTA: "The AI era of native ads is here"
- Layout: dark theme by default (system), gradient accents, lots of vertical sections each centered max-w-6xl.

### `/pricing`
- Two-tab toggle: Monthly | Annual (Save 20%)
- Three plan cards in a row, middle = "MOST POPULAR" highlighted
- Plan: name, blurb, price/mo, "Get Started" button, bullet feature list
- "Feature comparison" expandable
- FAQ accordion: ~10 Q&As
- Layout: same dark theme, max-w-6xl center.

### `/login` (CTA target)
- Sign in with Google — auth-walled.

### Routes that redirect / 404
- `/search` → redirects to `/` (auth-walled app shell)
- `/spy` → 404 ("This ad might have been more elusive than we thought.")
- `/ad/<id>` → likely auth-walled
- `/networks`, `/verticals`, `/collections`, `/trends` — likely all auth-walled

## App-surface inference (from spy-tool landing copy + sister site mediabuyer.site nav)

The mediabuyer.site app (already modelled on spy-tool by user) has this nav:
- **Discover** (home for logged-in)
- **Spy** (browse ads)
- **Trends** (keyword + creative trend lines)
- **Insights** (AI-style analysis surface — we will SKIP this per mandate)
- **Pulse** (live activity feed)
- **Saved / Yours / Compare**
- **Reference**: Networks, Affiliate networks, Tools, Glossary

We will mirror this navigation chrome in mediabuyercom (minus AI Insights, minus Offers, minus Times-seen).

## Inferred app surfaces to implement

| Surface | URL | Source data |
|---|---|---|
| Home (marketing landing) | `/` | static copy |
| Browse ads | `/spy` | `ads-page-N.json` (paginated client-side) |
| Ad detail | `/ad/[id]` | look up id in ads pages |
| Trends | `/trends` | aggregate days_active / first_seen distributions |
| Networks list | `/networks` | `networks.json` |
| Network detail | `/networks/[slug]` | `by-network/<slug>.json` + `by-network-detail-<slug>.json` |
| Verticals list | `/verticals` | `verticals.json` |
| Vertical detail | `/verticals/[slug]` | filter ads by vertical |
| Countries | `/countries`, `/countries/[cc]` | `countries.json`, `by-country/<cc>.json` |
| Advertisers | `/advertisers`, `/advertisers/[slug]` | `advertisers.json`, `by-advertiser/<slug>.json` |
| Pricing | `/pricing` | static copy |
| Glossary | `/glossary` | static copy |

## Filters (browse page)
- Search (title contains)
- Network: taboola / outbrain / mgid / revcontent (multi)
- Vertical: general / health / tech / auto / finance / ecom / travel / home / legal (multi)
- Country: 2-letter ISO (multi)
- Ad type: text / image / video (multi)
- Days active range: e.g. 1-7, 8-30, 31+
- Sort: newest / oldest / longest-running

## Hard exclusions (do NOT add anywhere)
- Times-seen counter / impression counter / `total_observations`
- Offers / OfferVault / oDigger / "Find Offer"
- AI Analysis section
- Any mention of "Eyal" / "Rosenthal"

## Layout / chrome
- Top bar: logo (mediabuyer wordmark), nav links, search box, theme toggle, "Sign in" CTA
- Sidebar (desktop ≥1024px): vertical nav with same sections
- Bottom nav (mobile ≤640px): icons for primary sections
- Footer: minimal — copyright, links to /pricing, /glossary, /networks

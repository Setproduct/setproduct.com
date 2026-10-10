# SEO baseline — Wave 1 results

**Snapshot date:** 2026-10-10
**Type:** Post-Wave-1 measurement (results checkpoint)
**GSC compare window:** last 6 months vs previous 6 months (approx Apr 2026 to Oct 2026 vs Oct 2025 to Apr 2026)
**GSC detail window:** last 3 months (2026-07-07 → 2026-10-06)
**GA4 window:** 2026-07-12 → 2026-10-09
**Previous baselines:** [`seo-baseline-2026-05-28.md`](seo-baseline-2026-05-28.md) (Wave 1 starting point), [`seo-baseline-pillar-launch-2026-06-05.md`](seo-baseline-pillar-launch-2026-06-05.md) (dashboard pillar)
**Raw records:** [`plans/gsc-2026-10-10-raw-record.md`](../plans/gsc-2026-10-10-raw-record.md), [`plans/ga4-2026-10-10-raw-record.md`](../plans/ga4-2026-10-10-raw-record.md)

This file measures the effect of Wave 1 (title and meta description
optimization on 15 component posts, deployed May 2026) and captures the
state of the blog as the new reference point for later waves. Do not
modify the data tables. To record new measurements, create a new file
`seo-baseline-YYYY-MM-DD.md`.

---

## 1. Headline numbers

Six-month compare (GSC, last 6 months vs previous 6 months):

| Metric | Previous 6 mo | Last 6 mo | Change |
|---|---|---|---|
| Clicks | 13,205 | 18,711 | +41.7% |
| Impressions | 2,715,799 | 3,300,641 | +21.5% |
| Average CTR | 0.5% | 0.6% | +0.1 pp |
| Average position | 14.0 | 11.9 | +2.1 (better) |

Three-month detail window (2026-07-07 → 2026-10-06): 11.4K clicks,
1.33M impressions, 0.9% CTR, position 12.1.

Note on windows: the 2026-05-28 baseline (13,800 clicks, 3.28M
impressions, 0.4% CTR, position 13.4) covered Dec 2025 to May 2026, so it
is not directly comparable row for row. Use the compare columns above for
the true before/after, and the May baseline only as a directional
reference.

**Direction:** clicks grew faster than impressions, CTR rose modestly,
and average position improved. The blog now ranks closer to page 1, but
CTR is still far below the 2 to 4 percent industry band for positions 5 to 15.

---

## 2. Wave 1 success criteria (from 2026-05-28 baseline)

| Criterion | Target | Result on 2026-10-10 | Verdict |
|---|---|---|---|
| Site average CTR across top posts | 0.4% → 1.0% | Site CTR 0.6% (6 mo), 0.9% (3 mo) | Partially met |
| At least 5 of tier-1 posts double CTR | 5 posts | Not met: several optimized posts declined | Not met |
| empty-state-ui-design CTR | 0.10% → 0.8% | Not extracted in this pull | Unknown |
| dashboard-best-practices CTR | 0.022% → 0.5% | URL 301-redirected to pillar in June; absent from compare | Replaced by pillar |
| No measurable drop in average position | hold | 13.4 → 11.9 (better) | Met |

Reading: the site-level goal was reached (traffic up, position up), but
the per-post goal was not. Some posts improved a lot (tabs), others moved
backward (notifications, dropdown, button). Wave 1 was not a clean
uniform win, which is the single most important finding of this snapshot.

---

## 3. Wave 1 posts, before and after (6-month compare)

Posts that received new title and description in Wave 1:

| Slug | Clicks prev 6 mo | Clicks last 6 mo | Direction |
|---|---|---|---|
| tabs-ui-design | 771 | 1,211 | Up (+57%) |
| pagination-ui-design | 4 | 46 | Up (small base) |
| notifications-ui-design | 679 | 235 | Down (−65%) |
| dropdown-ui-design | 628 | 472 | Down (−25%) |
| button-ui-design | 233 | 71 | Down (−70%) |
| filter-ui-design | not extracted | not extracted | Needs column pull |
| chip-ui-design | not extracted | not extracted | Needs column pull |
| toggle-switch-ui-design | not extracted | not extracted | Needs column pull |
| tooltip-ui-design | not extracted | not extracted | Needs column pull |
| carousel-ui-design | not extracted | not extracted | Needs column pull |
| breadcrumbs-ui-design | not extracted | not extracted | Needs column pull |
| settings-ui-design | not extracted | not extracted | Needs column pull |
| slider-ui-design | not extracted | not extracted | Needs column pull |
| checkbox-ui-design | not extracted | not extracted | Needs column pull |
| empty-state-ui-design | not extracted | not extracted | Needs column pull |

The remaining rows require a full column-by-column read of
[`plans/compare 6 months - Страницы.csv`](../plans/compare%206%20months%20-%20Страницы.csv).
Only the rows above had both-period values confirmed in the raw record.

Position context: `/blog/tabs-ui-design` now holds 194,601 impressions
(prev 96,491) at position 8.51 (prev 8.3). The post is the strongest
single component post.

---

## 4. What grew (new winners)

New pages that produced clicks from a near-zero base:

| URL | Clicks last 6 mo | Clicks prev 6 mo |
|---|---|---|
| /freebies/m3e-canvas | 1,354 | 0 |
| /blog/liquid-glass-vs-glassmorphism | 660 | 0 |
| /blog/claymorphism-design-guide | 603 | 0 |
| /blog/data-table-ui-design | 578 | 0 |
| /blog/pay-for-claude-pro-with-usdt | 537 | 0 |
| /blog/submit-a-guest-post | 678 | 433 |
| /blog/guest-posting-opportunities | 634 | 258 |
| /blog/venice-ai-tool-private-uncensored | 625 | 337 |
| /blog/steps-ui-design | 559 | 347 |

New queries that produced clicks from a near-zero base:

| Query | Clicks last 6 mo | Clicks prev 6 mo |
|---|---|---|
| m3e canvas | 1,222 | 0 |
| looksmax ai | 113 | 0 |
| claymorphism | 108 | 0 |
| m3e-canvas | 99 | 0 |
| claymorphism ui | 84 | 0 |
| glassmorphism vs liquid glass | 68 | 0 |
| pagination ui | 46 | 4 |
| venice ai nsfw | 46 | 10 |

The growth engine is non-brand: trend topics (claymorphism, liquid glass
vs glassmorphism), freebie product pages (m3e-canvas), guest-posting
cluster, and the Venice AI post. Brand query `setproduct` held steady
(426 vs 447 at CTR about 53%).

---

## 5. What declined

Pages:

| URL | Clicks last 6 mo | Clicks prev 6 mo | Note |
|---|---|---|---|
| / | 687 | 925 | Homepage dropped, position 23.65 vs 17.9 |
| /blog/notifications-ui-design | 235 | 679 | Wave 1 optimized, still fell |
| /blog/dropdown-ui-design | 472 | 628 | Wave 1 optimized, still fell |
| /blog/button-ui-design | 71 | 233 | Wave 1 optimized, still fell |
| /blog/stepper-ui-design | 69 | 227 | Not in Wave 1 |
| /templates/orion | 134 | 302 | Product page |
| /dashboards | 106 | 234 | Category page |
| /pricing-ui-design | 51 | 160 | |
| /mobile | 49 | 164 | Category page |
| /bundle | 41 | 108 | |
| /blog/optimizing-digital-marketing | 0 | 4 | 2,017 impressions, 0 clicks |
| /blog/benefits-of-dashboards | 0 | 9 | 2,320 impressions |
| /blog/figma-auto-layout-debate | 0 | 6 | 1,808 impressions |

Queries with a collapse in impressions and zero clicks this period:

| Query | Prev 6 mo signals |
|---|---|
| setgpt | 133 clicks (brand misspelling) |
| setgbt | 20 clicks (brand misspelling) |
| setgtp | 18 clicks (brand misspelling) |
| material ui | 32,074 impressions |
| white label seo platform | 15,960 impressions |
| seo reseller | 12,941 impressions |
| best seo reseller | 10,277 impressions |
| category management dashboard | 9,361 impressions |
| white label seo tools | 8,117 impressions |
| uploadarticle guest posting | 6,926 / 7,240 impressions |
| best ui kits for designers | 5,047 impressions |
| guest blogging seo | 3,627 impressions |
| thorswap swap | 2,903 impressions |

Two separate things to read here. First, three brand misspellings
(setgpt, setgbt, setgtp) together delivered roughly 171 clicks in the
previous period and are now at zero. That is real lost branded traffic.
Second, a large block of impressions landed with no clicks at all
(material ui, white-label SEO terms, category management dashboard). Those
are visibility without capture, not necessarily lost rank.

Search appearance change: product description snippets fell from 1,342 to
340 clicks and from 132,201 to 46,004 impressions. Translated results grew
from 63 to 205 clicks. The product-description loss is on template
product cards, not on blog posts.

---

## 6. Devices and countries (6-month compare)

Devices:

| Device | Clicks last | Clicks prev | Impressions last | Impressions prev | CTR last | CTR prev |
|---|---|---|---|---|---|---|
| Desktop | 15,375 | 11,436 | 2,924,565 | 2,129,683 | 0.53% | 0.54% |
| Mobile | 3,256 | 1,720 | 368,878 | 546,811 | 0.88% | 0.31% |
| Tablet | 80 | 49 | 7,198 | 39,305 | 1.11% | 0.12% |

Mobile CTR nearly tripled on a smaller impression base. Mobile clicks
almost doubled. Tablet impressions fell from 39,305 to 7,198.

Countries, top 15 by last-period clicks:

| Country | Clicks last | Clicks prev | CTR last | CTR prev | Pos last | Pos prev |
|---|---|---|---|---|---|---|
| India | 3,736 | 2,681 | 1.37% | 1.05% | 10.44 | 9.17 |
| United States | 3,683 | 2,981 | 0.21% | 0.23% | 11.06 | 14.61 |
| Pakistan | 1,444 | 641 | | | | |
| United Kingdom | 633 | 575 | | | | |
| Germany | 552 | 449 | | | | |
| Canada | 398 | 335 | | | | |
| Indonesia | 352 | 168 | | | | |
| Australia | 347 | 220 | | | | |
| Brazil | 336 | 175 | | | | |
| Vietnam | 292 | 141 | | | | |
| Russia | 285 | 185 | | | | |
| France | 259 | 271 | | | | |
| Netherlands | 230 | 197 | | | | |
| Mexico | 225 | 60 | | | | |
| Spain | 212 | 201 | | | | |

The United States holds over half of all impressions (1,787,739 of
3,300,641) at the lowest CTR in the top group (0.21%), but its position
improved from 14.61 to 11.06. India is the best converter in the top
group (1.37%). Full 243-row table is in the raw record.

---

## 7. Anchor-fragment URLs with impressions and zero clicks

Google indexes in-page anchors as separate URLs. Many of them accumulate
impressions and produce no clicks:

| URL | Clicks | Impressions |
|---|---|---|
| /blog/tabs-ui-design#tabs-theming | 0 | 15,819 |
| /blog/tabs-ui-design#tabs-states | 0 | 15,186 |
| /blog/why-landing-page-optimization-is-essential | 0 | 14,272 |
| /blog/steps-ui-design#usability-tips | 0 | 9,161 |
| /blog/guest-posts-vs-niche-edits#... | 0 | 7,515 |
| /blog/guest-posts-vs-niche-edits#... | 0 | 7,511 |
| /blog/ai-chat-interface-ui-design#... | 0 | 4,569 |

Same pattern across anchors on claymorphism, chip-ui-design,
filter-ui-design, settings-ui-design, pagination-ui-design, breadcrumbs,
toggle-switch, notifications, checkbox, badge, tooltip, input,
radio-button, button-ui-design. This is a technical SERP issue, not a
content issue, and it is the largest untapped impression pool on the site.

The 3-month detail record also lists app, react, angular and publish
subdomains (documentation pages and component UUIDs) with near-zero clicks.

---

## 8. Indexing health (GSC, 3-month)

| Reason | Pages |
|---|---|
| noindex | 1,948 |
| Variant canonical | 1,675 |
| Crawled, not indexed | 3,481 |
| Blocked 4xx | 210 |
| Duplicate, Google chose another canonical | 67 |
| 404 | 50 |
| Redirect page | 34 |
| Soft 404 | 28 |
| Blocked by robots.txt | 7 |
| Discovered, not indexed | 4 |
| Canonical mismatch | 1 |
| 5xx | 0 |

Indexing trend since 2026-07-12: not-indexed rose from 7,083 to about
7,505, while indexed pages fell from 3,332 to 2,827. Indexed pages are
shrinking. This runs opposite to the traffic trend and needs a separate
technical investigation.

---

## 9. Traffic beyond Google (GA4, 2026-07-12 → 2026-10-09)

Session totals: page_view 60,355 (39,621 users), session_start 51,157,
first_visit 38,949, user_engagement 34,508, scroll 9,331, click 5,045.

Key events: search_form_on_categories_submit 1,444, get_started_gumroad
1,041, contact_us_link_click 890, click_get_a_quote 522, form_submit 428,
buy_button_gumroad 2. Revenue is 0 everywhere (ecommerce not configured).

Sessions by channel, top:

| Channel | Sessions | Users | Key events | Key-event rate |
|---|---|---|---|---|
| (direct)/(none) | 24,123 | 20,403 | 178 | 0.0058 |
| google/organic | 22,298 | 15,890 | 161 | 0.0060 |
| chatgpt.com/ai-assistant | 1,285 | 994 | 50 | 0.0280 |
| bing/organic | 629 | | 8 | |
| Pinterest/organic | 414 | | | |
| kamushken.medium.com/referral | 326 | | | |
| tilda.education/referral | 291 | | | |
| gemini.google.com/ai-assistant | 239 | | 4 | |
| duckduckgo/organic | 180 | | | |
| claude.ai/ai-assistant | 110 | 58 | 2 | 0.0182 |
| perplexity.ai/ai-assistant | 61 | | 3 | |
| venice.ai/referral | 24 | | 5 | 0.1667 |

Confirmed again: direct plus Google organic are only about 90 percent of
sessions combined, and the rest is a long mix of referrals, social and AI
assistants. AI-assistant channels (chatgpt, gemini, claude, perplexity,
grok, copilot, plus Vertex AI grounding) together bring well over 1,700
sessions, and they convert to key events at roughly five times the Google
organic rate.

Highest-conversion landing page by rate: `/search` (46 sessions, 29 key
events, rate 0.5). It is followed by `/templates/orion` (1,452 sessions,
26 key events) and `/mobile` (225 sessions, 18 key events).

Top landing pages: `/` 5,671; `(not set)` 5,450; `/freebies/m3e-canvas`
2,437; `/blog/data-table-ui-design` 2,417; `/blog/liquid-glass-vs-glassmorphism`
1,988; `/blog/ai-chat-interface-ui-design` 1,578; `/blog/tabs-ui-design`
1,456; `/templates/orion` 1,452; `/blog/claymorphism-design-guide` 1,221;
`/blog/dropdown-ui-design` 884.

Top pages by views: `/` 7,017; `/freebies/m3e-canvas` 3,004;
`/blog/data-table-ui-design` 2,783; `/blog/liquid-glass-vs-glassmorphism`
2,373; `/templates/orion` 1,942; `/blog/ai-chat-interface-ui-design` 1,739;
`/blog` 1,671; `/blog/tabs-ui-design` 1,590; `/blog/claymorphism-design-guide`
1,467; `/all` 1,154.

Geography (active users): United States 7,918 (engagement share 0.389),
Singapore 5,315 (0.145), India 4,841 (0.457), Pakistan 1,534 (0.656),
Netherlands 1,272, China 1,192, Germany 1,085, Brazil 1,032, United
Kingdom 897, Russia 576, Vietnam 568, Australia 500, France 448.

Internal site search: about 295 events, desktop 289, mobile 6. Top terms
dashboard 7, calendar 6, material 5, then roughly 200 single-use terms
including claymorphism, glassmorphism, liquid glass, tabs, accordion,
breadcrumbs (with misspellings). Mobile search is effectively unused,
which repeats the 2026-05-28 finding.

---

## 10. Retention and return rate (GA4)

Weekly new users (weeks 0000 to 0012): 2,170 to 4,163 at the week-0008
peak, ending at 3,545. Returning users in the same weeks: 388 to 646
(peak also week 0008), ending at 513. Returning is roughly 13 to 17
percent of new each week.

Cohort retention rates (Day 1, Day 7, Day 30): Day 1 about 2 to 3
percent, Day 7 about 0.2 to 1 percent, Day 30 about 0 to 0.5 percent. The
120-day cohort block is still all zeros because the cohorts have not
matured.

Stickiness ratios: DAU/MAU about 0.9 to 9 percent, WAU/MAU about 17 to 33
percent.

The week-0008 spikes in both new and returning users line up with the
2026-09-08 GSC click spike (598 clicks, 17,280 impressions, position 9.1),
so that day is a shared external event across both tools, not a slow
organic build.

Data caution: [`plans/Обзор_активности_посетителей.csv`](../plans/Обзор_активности_посетителей.csv)
shows page_view 3,830, far below the full 3-month total of 60,355, so it
appears to be a narrower filtered view. Do not mix it with the totals
above until its date scope is confirmed.

Audience export `/Аудитории_Название_аудитории.csv` reports All Users
1,385 users / 3,141 sessions / 121.44s average session. This is a small
subset, likely a filtered audience, and should not be used as a site
total.

---

## 11. External signal (Ahrefs organic keywords history)

Source: `plans/www.setproduct.com-organic-keywords-history-s_2026-10-10_12-08-51.csv`
(window 2026-09-10 → 2026-10-10, 31 days).

| Keyword position band | 2026-09-10 | 2026-10-10 | Trend |
|---|---|---|---|
| Positions 1 to 3 | 72 | 82 | Up |
| Positions 4 to 10 | 260 | 248 | Flat to slightly down |
| Positions 11 to 20 | 30 | 18 | Down |
| Positions 21 to 50 | 0 | 0 | None |
| Positions 51+ | 0 | 0 | None |

Top-3 positions are growing while the 11-to-20 band shrinks. This matches
the GSC picture: the site is consolidating a narrower set of strong
rankings instead of spreading across page 2. The 21-to-50 band being zero
is unusual and worth verifying against the Ahrefs account settings before
trusting it.

---

## 12. Dashboard pillar check (launched 2026-06-05)

From [`seo-baseline-pillar-launch-2026-06-05.md`](seo-baseline-pillar-launch-2026-06-05.md)
the 30-day goals were: pillar reaches 500+ impressions, old catastrophic
URL transfers over 50 percent of impressions, `/dashboards` stays stable.

Current evidence:
- `/blog/dashboard-ui-design` (pillar): 66 clicks, 21,499 impressions in
  the 3-month window, position 8.89. It cleared the impression goal.
- The old URL `dashboard-design-best-practices-...` no longer appears in
  the compare table, consistent with the 301 redirect being in place.
- `/dashboards` category page declined from 234 to 106 clicks in the
  6-month compare, so the conversion-funnel goal of "stable or growing" is
  not met on clicks.
- GA4 shows dashboard-related landing traffic split across several posts
  (dashboard-ui-design 616 sessions) with no single dominant hub.

Verdict: the pillar ranks and replaced the broken URL, but it did not
lift the `/dashboards` product page as hoped. This needs a dedicated
30-day-plus evaluation rather than a quick pass.

---

## 13. Methodology notes

- GSC compare numbers come from CSV exports of the same screen
  (`compare 6 months - *.csv`), filters: search type Web, date last 6
  months. Device split sums to the screenshot headline (18,711 clicks,
  3,300,641 impressions), so the export is trusted.
- GSC 3-month detail comes from the existing `plans/*.csv` exports plus
  5 screenshots.
- GA4 comes from 11 CSVs plus 1 screenshot, window 2026-07-12 → 2026-10-09.
- The Ahrefs keyword-history CSV is a third-party signal, not GSC. Treat
  its absolute bands as directional.
- Rows marked "not extracted" in section 3 were not confirmed with both
  periods in this pass and must be pulled directly from the compare CSV
  before any per-post conclusion.

---

## 14. Open questions

1. Full per-post before/after for all 15 Wave 1 posts (section 3) so the
   Wave 1 verdict is complete, not partial.
2. Why three brand misspellings (setgpt, setgbt, setgtp) went to zero.
   Branded demand may have shifted to the correct spelling or to direct.
3. Why the anchor-fragment URL mass has zero clicks despite tens of
   thousands of impressions, and whether canonical or fragment handling
   can consolidate it.
4. Why indexed pages are falling (3,332 to 2,827) while clicks rise.
5. Confirm the date scope of `Обзор_активности_посетителей.csv` and
   `Аудитории_Название_аудитории.csv` before using them as totals.

---

## 15. What this file is not

It is not a plan and not a set of priorities. It is a measurement
snapshot. Follow-up work (benchmark updates, content strategy changes,
technical fixes) is tracked separately and confirmed with the author
before any file is edited.

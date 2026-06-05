# SEO baseline — dashboard pillar launch
**Snapshot date:** 2026-06-05
**Type:** Launch checkpoint for Dashboard pillar (Phase 5)
**Previous baseline:** .ai/seo-baseline-2026-05-28.md (Wave 1)

## What changed since Wave 1 launch
- Wave 1 (CTR Recovery for 28 posts) — launched 2026-05-28
- Dashboard pillar project — Phases 1-4 completed
- 4 D-posts deprecated with 301 redirects
- 10 cluster posts linked to new pillar
- 1 new pillar page: /blog/dashboard-ui-design
- Total 14-post cluster now operating as hub-and-spoke structure

## Posts to track post-launch
| Slug | Pre-launch metric | Post-launch target | Check date |
|---|---|---|---|
| /blog/dashboard-ui-design (NEW) | n/a | 1000+ impressions in 30 days | 2026-07-05 |
| /blog/dashboard-design-best-practices-... (redirected) | 40,449 imp / 0.022% CTR | Impressions transfer to pillar within 21 days | 2026-06-26 |
| /blog/marketing-dashboard-ui-design-guide (consolidation target) | 9,379 imp / 0.15% CTR | +30% impressions from absorbed sibling | 2026-07-05 |
| /blog/top-dashboard-design-examples-ideas | (no baseline) | Engagement should improve from cluster linking | 2026-07-05 |
| /blog/saas-dashboard-examples | (no baseline) | Same | 2026-07-05 |

## Success criteria for dashboard pillar
Phase considered successful if:
- Pillar achieves 500+ impressions in GSC within 14 days
- Old catastrophic URL impressions transfer to pillar (>50% within 21 days)
- No measurable drop in cluster posts' aggregate traffic
- /dashboards conversions remain stable or grow (since pillar funnels to it)

Phase considered insufficient if:
- Pillar gets <100 impressions in 30 days (need to investigate indexing)
- Old URL keeps getting impressions (redirect not working properly)
- Cluster posts lose impressions (cannibalization in wrong direction)

## Pre-launch verification
- [x] All 4 D-post files deleted
- [x] 4 redirects in next.config.js
- [x] 10 cluster posts have pillar callout
- [x] Pillar dashboard-ui-design.mdx content-complete
- [x] npm run lint: 0 errors
- [x] npm run build: 246 pages, 0 errors
- [x] Sitemap excludes D-slugs, includes pillar

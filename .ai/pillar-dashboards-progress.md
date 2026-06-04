# Phase 3A progress — pillar cluster linking

Связываем 10 cluster-постов с pillar-постом
[`dashboard-ui-design`](../content/blog/dashboard-ui-design.mdx) (Фаза 2).
В каждом посте ровно три изменения: pillar callout в начале тела,
обновлённые `relatedSlugs` (pillar первым + 2 тематических соседа),
`category` приведена к "UI Design". Тело и остальной frontmatter не тронуты.

Pillar title (используется в callout): **Dashboard UI design: From KPIs to
layouts that convert**.

Callout (одинаковый во всех 10):
> **Part of:** [Dashboard UI design: From KPIs to layouts that convert](/blog/dashboard-ui-design) — the complete reference to dashboard design on Setproduct.

## Status
- [x] Batch 1 (posts 1-3) — committed
- [x] Batch 2 (posts 4-6) — committed
- [x] Batch 3 / C-batch (posts 7-10) — committed

## relatedSlugs choices applied

| Post slug | relatedSlugs (1 = pillar, затем 2 соседа) | Логика соседства |
|---|---|---|
| how-to-study-saas-dashboard-in-the-ai-era | dashboard-ui-design, saas-dashboard-examples, top-dashboard-design-examples-ideas | SaaS + examples |
| types-of-dashboards-main-categories | dashboard-ui-design, effective-dashboard-design-principles, figma-tables-data-grid-design | theoretical/structural + data display |
| marketing-dashboard-ui-design-guide | dashboard-ui-design, campaign-marketing-dashboards-guide, effective-dashboard-design-principles | marketing domain + design principles |
| figma-tables-data-grid-design | dashboard-ui-design, effective-dashboard-design-principles, types-of-dashboards-main-categories | data display + component patterns |
| saas-dashboard-examples | dashboard-ui-design, best-analytics-dashboard-examples, e-commerce-dashboard-examples | industry examples cluster |
| best-analytics-dashboard-examples | dashboard-ui-design, saas-dashboard-examples, e-commerce-dashboard-examples | industry examples cluster |
| e-commerce-dashboard-examples | dashboard-ui-design, saas-dashboard-examples, best-analytics-dashboard-examples | industry examples cluster |
| campaign-marketing-dashboards-guide | dashboard-ui-design, marketing-dashboard-ui-design-guide, best-analytics-dashboard-examples | marketing domain + audience analytics |
| effective-dashboard-design-principles | dashboard-ui-design, types-of-dashboards-main-categories, figma-tables-data-grid-design | theoretical/structural + data display |
| top-dashboard-design-examples-ideas | dashboard-ui-design, saas-dashboard-examples, how-to-study-saas-dashboard-in-the-ai-era | examples cluster (reciprocal с how-to-study) |

## Category changes applied

| Post slug | Старая category | Новая category |
|---|---|---|
| how-to-study-saas-dashboard-in-the-ai-era | Inspiration | UI Design |
| types-of-dashboards-main-categories | Resources | UI Design |
| marketing-dashboard-ui-design-guide | Inspiration | UI Design |
| figma-tables-data-grid-design | UI Design | UI Design (без изменений) |
| saas-dashboard-examples | Inspiration | UI Design |
| best-analytics-dashboard-examples | Inspiration | UI Design |
| e-commerce-dashboard-examples | Inspiration | UI Design |
| campaign-marketing-dashboards-guide | Research | UI Design |
| effective-dashboard-design-principles | UI Design | UI Design (без изменений) |
| top-dashboard-design-examples-ideas | Inspiration | UI Design |

## Skipped or anomalies

- **figma-tables-data-grid-design** и **effective-dashboard-design-principles**:
  `category` уже была "UI Design" — по правилу задачи не трогали, в этих двух
  постах фактически по 2 изменения (callout + relatedSlugs), а не 3.
- **effective-dashboard-design-principles**: в старых `relatedSlugs` был
  D-пост `dashboard-design-best-practices-top-dashboard-ui-design-tips`
  (под deprecate в Фазе 4). При полной замене списка он удалён — ссылок на
  D-посты в обновлённых relatedSlugs нет нигде.
- **Группировка по коммитам.** Файлы закоммичены строго по исходной
  нумерации задачи: B-batch 1 = посты 1-3, B-batch 2 = посты 4-6,
  C-batch = посты 7-10. (В процессе редактирования порядок обработки
  e-commerce #7 и figma-tables #4 был переставлен, но на содержимое и
  итоговую группировку коммитов это не повлияло.)
- D-посты (`dashboard-design-best-practices-...`, `why-are-dashboards-important`,
  `benefits-of-dashboards`, `marketing-dashboard-examples-templates`) не
  трогали — они в Фазе 4.
- Pillar `dashboard-ui-design.mdx` не трогали (Фаза 2 закончена).
- `next.config.js` не трогали (redirects — Фаза 4).

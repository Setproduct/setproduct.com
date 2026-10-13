# Guest-posts кластер: фикс сравнения + развод каннибализации (октябрь 2026)

Окно данных: 3 месяца (2026-07-07 → 2026-10-06) для per-page выгрузок,
6 месяцев для `plans/compare 6 months - Страницы.csv`.
Источник per-page: `plans/gsc-queries-<slug>.zip` → `Запросы.csv`, `Страницы.csv`.
Предыдущий разбор: [`plans/money-pages-intent-map-2026-10.md`](plans/money-pages-intent-map-2026-10.md).

## Итог одной строкой

У страницы сравнения переписан первый экран (лид, TL;DR, decision-таблица,
FAQ) и снята дублирующая старая таблица. У двух сателлитов разведены title и
description под свои интенты. Четвёртая страница получила входящие ссылки.
Merge не делался, четыре страницы остались.

## Почему именно эти правки

Из разбора кластера: головные сравнения на `guest-posts-vs-niche-edits`
сидят на позиции 3.44 и 4.10 при 0 кликов, а сниппет и тело не отвечали на
«что выбрать». Каннибализация подтверждена: 399 запросов пересекаются между
страницами, сравнительные фразы текут на все три.

## Страница 1 — guest-posts-vs-niche-edits (body + frontmatter)

### Frontmatter

| Поле | Было | Стало | Len |
|---|---|---|---|
| title | Guest posts vs niche edits for stronger backlinks in 2026 | Guest posts vs niche edits, which link type to buy in 2026 | 58 |
| description | Guest posts or niche edits? Compare cost, speed, risk, and SEO impact side by side, then use a decision checklist to pick the right link-building tactic. (139) | Guest post or niche edit? Compare cost, speed to link, and risk, then use a four-option decision table to choose the right link type for your budget. | 149 |
| metaTitle | Guest posts vs niche edits for stronger backlinks in 2026 - Setproduct | Guest posts vs niche edits, which link type to buy in 2026 | 58 |

### Что добавлено в тело

1. **Answer-first лид** (53 слова) вместо старого вводного абзаца. Прямо
   отвечает «guest post или niche edit и когда».
2. **TL;DR** из 3 пунктов под лидом.
3. **Decision-таблица** сразу под TL;DR, 4 строки (guest post, niche edit,
   link insertion, HARO/digital PR), колонки: approach, cost, time to link,
   risk, when to take it, when to skip it.
4. **FAQ переписан** под сравнение: 4 вопроса (отличие, безопасность,
   стоимость, комбинирование), ответы 40-60 слов.
5. **Снята дублирующая старая таблица** `Factor | Guest posts | Niche edits`
   (была на месте бывшего раздела 142), чтобы не было двух сравнительных
   таблиц на странице. Тело ниже раздела сравнения не переписывалось.

### Первые 200 слов нового верха

```
Pick niche edits when you need a relevant link inside a page that already
ranks, and you want it live this month on a small budget. Pick guest posts
when you want editorial control, a new asset you can point to, and links that
keep earning citations for years. Most campaigns run both.

## TL;DR

- A guest post buys control, brand authority, and a durable link that keeps
  earning citations for years.

- A niche edit buys speed and low cost, because the host page already ranks
  and is indexed.

- Budget and deadline decide the tactic, more than either label suggests.
  Not sure where to pitch once you pick? Start with 35 guest posting
  opportunities.

| Approach | Cost | Time to link | Risk | When to take it | When to skip it |
|---|---|---|---|---|---|
| Guest post | $200 to $2,000 per placement | 2 to 6 weeks | Low on vetted sites | You want a new asset, anchor control, and brand exposure | You need a link this week on a tight budget |
| Niche edit | $50 to $400 per link | 3 to 10 days | Medium, you do not own the page | The target page already ranks and pulls steady traffic | The page is link-heavy or the owner edits posts often |
| Link insertion | $80 to $500 per link | 1 to 2 weeks | Medium, placement quality varies | You want a contextual link in fresh, topically matched content | The site has no editorial review or clear owner |
| HARO or digital PR | $0 to $1,500 per campaign | 2 to 12 weeks | Low, but coverage is not guaranteed | You can offer real expertise or original data | You need a guaranteed do-follow link for a landing page |
```

### Перелинковка (3 исходящие)

- лид → benefits-of-guest-blogging («links that keep earning citations»)
- TL;DR → guest-posting-opportunities («35 guest posting opportunities»)
- финал → submit-a-guest-post («guest post guidelines»)
- снята ссылка на opportunities на месте старого раздела «How to find guest
  posting opportunities» (была на месте 259), чтобы не дублировать.

## Страница 2 — benefits-of-guest-blogging (только frontmatter + ссылка)

| Поле | Было (len) | Стало (len) |
|---|---|---|
| title | 9 real benefits of guest blogging in 2026 (traffic data + AI Overview case studies) (88) | Guest blogging benefits for SEO, backed by real traffic data (60) |
| description | «What guest blogging delivers in 2026…7-point site checklist.» (142) | Nine guest blogging benefits measured against real traffic data, plus three cases where a paid placement wastes budget and a checklist to vet a site first. (155) |
| metaTitle | 9 real benefits of guest blogging in 2026 (traffic data + AI Overview case studies) | Guest blogging benefits for SEO, backed by real traffic data |

Интент: «benefits / why / seo guest post». Голова страницы — «guest blogging
for seo» (4 453 показа), теперь отражена в title.

Перелинковка: 2 исходящие.
- → guest-posts-vs-niche-edits (раздел 5, «Niche edits are faster…»)
- → submit-a-guest-post (финальный абзац, «submission guidelines»)
- снята ссылка на opportunities на месте 58, чтобы уложиться в 3 и не
  каннибализировать площадочный интент.

## Страница 3 — guest-posting-opportunities (frontmatter + снятие дублей)

| Поле | Было (len) | Стало (len) |
|---|---|---|
| title | 35 guest posting opportunities that actually publish in 2026 (sorted by niche + DR) (82) | Where to guest post in 2026, 35 sites that accept pitches (57) |
| description | «A hand-checked list… Updated September 2026.» (207) | A hand-checked list of tech, SaaS, and marketing blogs accepting guest posts in 2026, grouped by niche and DR, with submission links and free or paid status. (157) |
| metaTitle | 35 guest posting opportunities (sorted by niche + DR, 2026) | Where to guest post in 2026, 35 sites that accept pitches |

Интент: «opportunities / placement / where to post». Вынесен в начало title
(«Where to guest post»), чтобы развести с benefits.

Дополнительно: H2 `Free vs paid guest posts: which one moves rankings` →
`Free vs paid guest posts and which one moves rankings` (двоеточие в H2 —
нарушение правила, снял в зоне своей правки).

Перелинковка: 2 исходящие.
- → guest-posts-vs-niche-edits («which one moves rankings», раздел про free/paid)
- → submit-a-guest-post («Where to go next»)
- сняты: ссылка на benefits (была на месте 170) и дубль на submit из FAQ
  (место 176), чтобы развести интенты.

## Страница 4 — submit-a-guest-post

Title не тронут: лучший CTR кластера, 3.56%. Body не тронут.

Входящие ссылки обеспечены (2 контекстные):
- из guest-posts-vs-niche-edits (финальный абзац, «guest post guidelines»)
- из benefits-of-guest-blogging (финальный абзац, «submission guidelines»)

## Self-check

| Файл | title len | desc len | двоеточие в title | H2/H3 с двоеточием | em-dash |
|---|---|---|---|---|---|
| guest-posts-vs-niche-edits | 58 | 149 | нет | 0 | 1 |
| benefits-of-guest-blogging | 60 | 155 | нет | 0 | 2 |
| guest-posting-opportunities | 57 | 157 | нет | 0 | 0 |
| submit-a-guest-post | 42 | 143 | нет | 0 | 1 |

Все title ≤ 60 без двоеточия, sentence case. Все description 143-157.
Заголовков с двоеточием не осталось. em-dash: на странице 1 убран один вместе
со старой таблицей (остался 1, таблица с «Higher — content plus outreach»
удалена); на opportunities 0; лимит ≤2 на статью соблюдён везде.

`npm run lint` (tsc --noEmit) — чисто.

## Коммиты (без push)

| Страница | Хэш | Сообщение |
|---|---|---|
| guest-posts-vs-niche-edits | 04faa96 | content: add decision block and rewrite snippet for guest posts vs niche edits |
| benefits-of-guest-blogging | 0d28caa | seo: retarget title and description for guest blogging benefits |
| guest-posting-opportunities | 16c2aff | seo: retarget title and description for guest posting opportunities |
| submit-a-guest-post | без коммита | правок в самой странице нет, входящие ссылки добавлены в страницах 1-3 |

Примечание: по page 4 изменений в файле нет, поэтому отдельный коммит не
создавался. Требование «2-3 входящие ссылки» выполнено правками в страницах
1, 2 и 3.

## Что НЕ делалось

- merge страниц не выполнялся, четыре страницы остались;
- тело benefits, opportunities и submit не переписывалось (только link-правки);
- body сравнения ниже блока сравнения не переписывался;
- slug, canonical, author, cover, relatedSlugs не менялись;
- content/ вне этих четырёх страниц не трогался;
- push не выполнялся.

## Замер

Контрольная точка — не ранее 2026-10-25. Смотреть CTR по каждой странице и
позиции головных сравнений («guest posting vs niche edits», «guest posts vs
niche edits»), а также разведение каннибализации: показы «seo guest post»
должны концентрироваться на benefits, «guest posting opportunities» — на
opportunities.

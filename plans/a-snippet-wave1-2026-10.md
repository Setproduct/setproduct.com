# A-snippet Wave 1 — title и description по 6 страницам (октябрь 2026)

## Итог одной строкой

Переписаны `title`, `description` и `metaTitle` у 6 страниц. Тело не тронуто.
Реальные запросы из выгрузок разошлись с гипотезой на трёх страницах из шести
(empty-state, retro-brutalist, blueprint-grid): по ним сниппет-правка слепая,
и это отражено ниже.

## Источник целей

Целевые запросы брались из `plans/gsc-queries-<slug>.zip` (распакованы через
Python, cp437 в cp866, семь CSV на архив). Фильтр отбора: показы >= 300,
позиция <= 15, CTR < 2%. Гипотеза из брифа использовалась только для
перекрёстной проверки.

| Страница | Целей по фильтру | Покрытие показов страницы выгрузкой |
|---|---|---|
| empty-state-ui-design | 0 | 4.7% |
| retro-brutalist-ui-design-2026 | 2 | 6.6% |
| complete-guide-to-blueprint-grid-design | 0 | 4.7% |
| claymorphism-design-guide | 3 | 63% |
| chip-ui-design | 5 | 13% |
| toggle-switch-ui-design | 8 | 22.7% |

## Найденные цели (показы >= 300, позиция <= 15, CTR < 2%)

**claymorphism-design-guide**
- `claymorphism` — 15 425 показов, CTR 0.72%, позиция 3.75
- `clay morphism` — 769 показов, CTR 0.65%, позиция 3.98
- `claymorphism design` — 621 показ, CTR 1.45%, позиция 4.29

**chip-ui-design**
- `chips ui` — 700 показов, CTR 0%
- `chip ui` — 549 показов, CTR 0%
- `chips ui design` — 452 показа, CTR 0%
- `ui chips` — 428 показов, CTR 0%
- `chip ui design` — 322 показа, CTR 0%

**toggle-switch-ui-design**
- `toggle switch ui` — 1543 показа, CTR 0%
- `toggle ui` — 1427 показов, CTR 0%
- `toggle button ui` — 788 показов, CTR 0%
- `ui toggle switch` — 703 показа, CTR 0%
- `toggle ui design` — 438 показов, CTR 0%
- `switch ui` — 400 показов, CTR 0%
- `ui design switch` — 370 показов, CTR 0%
- `ui ux toggle` — 327 показов, CTR 0%

**retro-brutalist-ui-design-2026**
- `industrial-brutalist-ui` — 525 показов, CTR 0.57%, позиция 7.07
- `industrial brutalist ui` — 324 показа, CTR 0.31%, позиция 6.98

**empty-state-ui-design** — целей нет. Показы страницы формируют запросы
AI-контекста и чужого бренда (Nielsen Norman Group), без токена «empty».
Значительная часть — нулевые клики (около 88.8% показов).
Подтверждает `plans/empty-state-anomaly-analysis.md`: примерно 20 757 из 21 208
показов (3 мес) приходят не от «empty»-запросов.

**complete-guide-to-blueprint-grid-design** — целей нет. Ближайший по смыслу
`blueprint grid` имеет лишь 237 показов (ниже порога 300). Верх выгрузки —
брендовые «vercel»-запросы и названия чужих дизайн-систем.

## Расхождения гипотезы и реальности

| Страница | Гипотеза | Реальность из выгрузки | Вывод |
|---|---|---|---|
| empty-state | demand, компонент (`empty state ui design`…) | 0 целей, запросы AI и чужого бренда | сильное расхождение |
| retro-brutalist | demand, тренд (`retro brutalist ui design`…) | цель = `industrial-brutalist-ui` (чужая компонентная библиотека) | расхождение |
| blueprint grid | demand, стиль (`blueprint grid design`, `blueprint grid figma`) | 0 целей, верх — «vercel»-бренд | расхождение |
| claymorphism | demand, стиль (`claymorphism`, `clay ui design`) | совпадает (`claymorphism` — крупнейшая цель) | совпадение |
| chip | demand, компонент (`chip ui design`, `chips ui`…) | совпадает | совпадение |
| toggle switch | demand, компонент (`toggle switch ui design`, `toggle ui`) | совпадает, 8 целей | совпадение |

## Таблица before / after

| slug | old title (len) | new title (len) | old description (len) | new description (len) |
|---|---|---|---|---|
| empty-state-ui-design | Empty state UI design and how to turn blank screens into action (63) | Empty state UI design that keeps users from bouncing (52) | The empty state is the first screen many users ever see. Learn how to turn blank screens into guidance that drives the next action, with real examples. (151) | Learn how empty states work across five screens, with usability tips, message patterns, accessibility notes, a plain-language FAQ and a pre-launch checklist. (157) |
| retro-brutalist-ui-design-2026 | Retro and brutalist UI design: a 2026 field guide (49) | Retro, brutalist and Y2K UI design trends that work in 2026 (59) | Retro, brutalist, and Y2K aesthetics are taking over indie web in 2026. See real production examples, a comparison table, and when each style helps or kills your product. (170) | Three retro aesthetics compared (brutalist, Y2K and OS-inspired), with real production examples, a comparison table, a quick decision framework and a FAQ. (154) |
| complete-guide-to-blueprint-grid-design | Vercel aesthetic: a complete guide to Blueprint Grid design (59) | Blueprint grid design and the Vercel aesthetic, explained (57) | Everything you need to know about the technical grid design trend. From psychology to Figma setup and CSS code for engineering grid backgrounds. (144) | The psychology behind the Vercel grid, a step-by-step Figma and CSS walkthrough, where the design style works or fails, six common mistakes and a FAQ. (150) |
| claymorphism-design-guide | Claymorphism UI design: soft depth, pastel palettes, AI recipes (63) | Claymorphism UI design with a copy-paste CSS recipe (51) | Claymorphism is a soft, clay-like UI style built on chunky radii, dual shadows, and pastel depth. Get the anatomy, a CSS recipe, and AI agent guidelines. (153) | Claymorphism in practice, with real examples, chunky radii, dual shadows, a copy-paste 30-line CSS recipe, AI agent guidelines and a FAQ for product teams. (155) |
| chip-ui-design | Chip UI design and how chips really differ from tags and badges (63) | Chip UI design and how chips differ from tags and badges (56) | Chips look like tags and badges but solve different problems. A practical guide to chip anatomy, states, customization, and seven real use cases. (145) | Chips look like tags and badges but solve different problems. Chip anatomy, five states, styling options and seven real use cases from filters to tagging. (154) |
| toggle-switch-ui-design | Toggle switch UI design: When to use it and when not to (55) | Toggle switch UI design and when to use it, not a checkbox (58) | A toggle isn't always the right control. Learn when toggle switches beat checkboxes, plus anatomy, states, accessibility, and mobile-specific patterns. (151) | A toggle is not always the right control. See when it beats a checkbox, plus anatomy, states, accessibility, mobile behavior and a developer checklist. (151) |

Изменены только `title`, `description` и `metaTitle`. Все три поля теперь
синхронизированы на новое значение title. Особые случаи:
- у `complete-guide-to-blueprint-grid-design` поля `metaTitle` в HEAD не было —
  добавлено;
- у `claymorphism-design-guide` старый `metaTitle` отличался от title
  (`Claymorphism UI design: recipe, examples, AI guidelines`, 55) — заменён на новый.

Поля `slug`, тело поста и остальной frontmatter не затронуты.
Все новые title: 51-59 символов, без двоеточия, sentence case.
Все новые description: 150-157 символов.

## Что обещано в сниппете и подтверждено ли телом

| Страница | Заявленная выгода | Подтверждено телом |
|---|---|---|
| empty-state | пять экранов, usability tips, паттерны сообщений, доступность, FAQ, чеклист перед запуском | да — разбор пяти экранов, FAQ-блок, чеклист в теле |
| retro-brutalist | три эстетики, продакшн-примеры, таблица сравнения, decision-фреймворк, FAQ | да — таблица сравнения, фреймворк, FAQ в теле |
| blueprint grid | психология грида, walkthrough в Figma и CSS, где стиль работает или падает, шесть ошибок, FAQ | да — секции Figma, CSS, ошибки, FAQ |
| claymorphism | реальные примеры, крупные радиусы, двойные тени, CSS-рецепт на 30 строк, AI-гайдлайны, FAQ | да — CSS-рецепт (~30 строк), секция AI-агентов, FAQ |
| chip | анатомия, пять состояний, стилизация, семь use case | да — 7 use case, состояния, FAQ |
| toggle switch | сравнение с чекбоксом, анатомия, состояния, доступность, мобайл, чеклист разработчика | да — чеклист, FAQ, разбор состояний |

Проверка на обещания, которых нет в теле: `five screens` (empty-state) —
тело действительно разбирает пять экранов; `30-line CSS recipe` (claymorphism) —
рецепт в теле около 30 строк; `six common mistakes` (blueprint) — секция ошибок
в теле присутствует. Обещаний сверх содержимого в новые сниппеты не добавлено.

## 2-3 страницы, где title может НЕ вылечить CTR

1. **empty-state-ui-design.** Нет ни одной цели в выгрузке. Показы идут от
   AI-контекстных и «nielsen norman»-запросов, без токена «empty», при 88.8%
   нулевых кликов. Сниппет-правка здесь, скорее всего, не влияет на CTR:
   проблема в составе запросов и типе SERP (справка или AI-ответ), а не в тексте
   сниппета. См. `plans/empty-state-anomaly-analysis.md`.
2. **retro-brutalist-ui-design-2026.** Единственные цели —
   `industrial-brutalist-ui` и `industrial brutalist ui`. Это чужая компонентная
   библиотека: пользователь ищет конкретный продукт, а попадает на статью.
   Даже точный заголовок вряд ли конвертирует такой запрос в клик.
3. **complete-guide-to-blueprint-grid-design.** Нет целей по фильтру; верх
   выгрузки — брендовый «vercel» и чужие дизайн-системы. Клик по брендовому
   интенту зависит от SERP-фич (сайт-линки, знаниевая панель), а не от title.

Для этих трёх страниц следующий шаг — не сниппет, а проверка SERP-фич и
состава запросов перед повторным замером.

## Замер

Контрольная точка — не раньше 2026-10-25 (2-4 недели после правки).
Сравнивать CTR по каждой странице и по каждой цели из списка выше в окне GSC,
а не site-wide.

## Коммиты (по одному на страницу, без push)

| Страница | Хэш | Сообщение |
|---|---|---|
| empty-state-ui-design | 557b8ec | seo: rewrite title and description for empty state post |
| retro-brutalist-ui-design-2026 | fea91d9 | seo: rewrite title and description for retro brutalist post |
| complete-guide-to-blueprint-grid-design | d2810a3 | seo: rewrite title and description for blueprint grid post |
| claymorphism-design-guide | c306423 | seo: rewrite title and description for claymorphism post |
| chip-ui-design | 5f32144 | seo: rewrite title and description for chip post |
| toggle-switch-ui-design | 63ef7b4 | seo: rewrite title and description for toggle switch post |

## Что НЕ делалось

- тело постов, лид-абзацы, TL;DR — не трогались (следующая волна);
- slug и остальной frontmatter — не менялись;
- страницы adobe и dashboard-ui-design — не трогались;
- страницы класса «?» (jupiter-solana, top-real-estate) — не трогались;
- push не выполнялся.

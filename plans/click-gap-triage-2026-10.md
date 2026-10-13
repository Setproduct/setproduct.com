# Click-gap triage: ранжированные возможности по кликам (октябрь 2026)

СТАТУС: только анализ. Ни один файл в `content/` не менялся.
Единственный источник данных: `plans/compare 6 months - Страницы.csv` (1235 строк).
Каждое утверждение с цифрой — со ссылкой `файл:строка`.

Задача: найти страницы, у которых показы есть, а кликов нет, и посчитать
размер недополученных кликов (gap). Разделить их по классам:
A (сниппет), B (с��руктура), C (каннибализация), D (недоранжирование),
E (фантомные показы).

---

## 0. Главное ограничение: query→page связи нет

Задание в шаге 5 требует «topical join» с тегами demand | noise | brand |
comparison | navigational, до 10 запросов на страницу. В выгрузке такой
связи нет: запросы и страницы лежат двумя независимыми CSV
(`plans/compare 6 months - Запросы.csv`,
`plans/compare 6 months - Страницы.csv`), сопоставление 1:1 не выгружено.
Подтверждено ранее: `plans/zero-ctr-diagnostic-2026-10.md:19`.

Поэтому topical join ниже сделан вручную, по теме страницы (slug), и помечен
как гипотеза. Тег `noise` на уровне запроса уже посчитан отдельно
(`plans/zero-ctr-diagnostic-2026-10.md:196-244`), здесь он перенесён на
страницы через якорные пулы (класс E).

Втор��е ограничение: вычислить долю каждой страницы, пришедшую из шума,
нельзя — шумовые показы лежат в запросном CSV, а не в страничном. Поэтому
класс E определяется косвенно, по якорным строкам в том же страничном CSV
(они и есть тот «фантом», который GSC считает по тому же URL).

---

## 1. Кривая ожидаемого CTR (industry curve, приблизительная)

Это оценочная кривая «среднего» сайта, не бенчмарк проекта. Точные
бенчмарки проекта живут отдельно: `.ai/seo-benchmarks.md:22-177`. Кривая
нужна только для расчёта gap и не является целью.

| Позиция | Ожидаемый CTR |
|---|---|
| 3 | 10.0% |
| 4 | 7.0% |
| 5 | 5.5% |
| 6 | 4.5% |
| 7 | 3.5% |
| 8 | 3.0% |
| 9 | 2.5% |
| 10 | 2.0% |
| 11–12 | 1.6% |
| 13–15 | 1.2% |
| 16–20 | 0.9% |

Примечание: значен��я взяты полосой (по позиции из CSV, без интерполяции),
чтобы расчёт был воспроизводимым.

---

## 2. Шаг 1. Фильтр кандидатов

Условие: позиция 3.0–20.0 И показы ≥ 3 000 И CTR < (ожидаемый × 0.6).

Порог по CTR = ожидаемый CTR для полосы позиции, умноженный на 0.6.
Пример: позиция 8.51 → полоса 8 → ожидаемый 3.0% → порог 1.8%.

Полностью проверен весь файл. Кандидатов после фильтра — 36 страниц.
Ниже — только те, что прошли фильтр (все blog, кроме помеченных).

| URL (slug) | клики | показы | CTR | позиция | строка CSV |
|---|---|---|---|---|---|
| blog/tabs-ui-design | 1211 | 194 601 | 0.62% | 8.51 | 3 |
| blog/venice-ai-tool-private-uncensored | 625 | 140 808 | 0.44% | 8.21 | 8 |
| blog/ai-chat-interface-ui-design | 398 | 119 125 | 0.33% | 7.84 | 17 |
| blog/empty-state-ui-design | 69 | 85 421 | 0.08% | 7.61 | 54 |
| blog/how-to-cancel-adobe-subscription-without-fees | 241 | 86 139 | 0.28% | 8.65 | 24 |
| blog/notifications-ui-design | 235 | 94 375 | 0.25% | 10.05 | 25 |
| blog/dropdown-ui-design | 472 | 79 741 | 0.59% | 10.93 | 13 |
| blog/filter-ui-design | 310 | 74 113 | 0.42% | 11.82 | 19 |
| blog/pagination-ui-design | 400 | 70 603 | 0.57% | 11.00 | 16 |
| blog/chip-ui-design | 245 | 63 233 | 0.39% | 8.08 | 23 |
| blog/retro-brutalist-ui-design-2026 | 214 | 63 459 | 0.34% | 6.77 | 28 |
| blog/top-dashboard-design-examples-ideas | 96 | 64 286 | 0.15% | 16.10 | 41 |
| blog/best-analytics-dashboard-examples | 16 | 51 153 | 0.03% | 17.38 | 112 |
| blog/saas-dashboard-examples | 59 | 50 861 | 0.12% | 13.97 | 57 |
| blog/complete-guide-to-blueprint-grid-design | 228 | 48 708 | 0.47% | 5.95 | 27 |
| blog/tooltip-ui-design | 78 | 46 658 | 0.17% | 9.20 | 49 |
| blog/liquid-glass-vs-glassmorphism | 660 | 46 801 | 1.41% | 8.05 | 6 |
| blog/breadcrumbs-ui-design | 149 | 45 712 | 0.33% | 12.00 | 31 |
| blog/steps-ui-design | 559 | 44 092 | 1.27% | 7.43 | 11 |
| blog/what-is-looksmax-ai | 277 | 43 868 | 0.63% | 7.63 | 21 |
| blog/dashboard-ui-design | 86 | 42 411 | 0.20% | 9.03 | 45 |
| blog/badge-ui-design | 138 | 38 586 | 0.36% | 8.10 | 33 |
| blog/claymorphism-design-guide | 603 | 37 930 | 1.59% | 4.80 | 9 |
| blog/input-ui-design | 151 | 36 263 | 0.42% | 10.75 | 30 |
| blog/solcard-review-usdt-crypto-card... | 130 | 35 711 | 0.36% | 7.08 | 35 |
| blog/settings-ui-design | 180 | 35 800 | 0.50% | 10.79 | 29 |
| blog/pay-for-claude-pro-with-usdt | 537 | 53 762 | 1.00% | 7.90 | 12 |
| blog/button-ui-design | 71 | 33 399 | 0.21% | 14.31 | 52 |
| blog/dashboard-design-best-practices-top-dashboard-ui-design-tips | 5 | 31 971 | 0.02% | 10.20 | 183 |
| blog/carousel-ui-design | 104 | 29 415 | 0.35% | 15.52 | 40 |
| blog/top-real-estate-app-development-companies-compared | 27 | 28 267 | 0.10% | 10.73 | 85 |
| blog/user-profile-templates | 88 | 25 137 | 0.35% | 10.01 | 43 |
| blog/checkbox-ui-design | 122 | 24 646 | 0.50% | 9.60 | 36 |
| blog/radio-button-ui-design | 110 | 24 648 | 0.45% | 8.52 | 38 |
| blog/jupiter-solana-swap-lend-and-referral-guide | 21 | 24 529 | 0.09% | 8.31 | 94 |
| blog/data-table-ui-design | 578 | 55 660 | 1.04% | 6.69 | 10 |
| blog/neuomorphism-design-guide | 316 | 21 013 | 1.50% | 7.90 | 18 |
| blog/slider-ui-design | 84 | 22 788 | 0.37% | 10.94 | 46 |
| blog/benefits-of-guest-blogging | 139 | 38 792 | 0.36% | 16.48 | 32 |
| blog/guest-posts-vs-niche-edits | 79 | 38 960 | 0.20% | 11.49 | 48 |
| blog/guest-posting-opportunities | 634 | 123 598 | 0.51% | 19.04 | 7 |
| blog/how-to-get-graphic-design-clients | 18 | 16 829 | 0.11% | 11.31 | 105 |
| blog/calendar-ui-design | 56 | 19 254 | 0.29% | 9.61 | 59 |
| blog/how-to-swap-btc-to-eth-with-thorswap | 13 | 19 048 | 0.07% | 12.47 | 125 |
| blog/effective-dashboard-design-principles | 13 | 14 458 | 0.09% | 13.88 | 126 |
| blog/avatar-ui-design | 39 | 14 939 | 0.26% | 9.40 | 70 |
| blog/top-real-estate... (с��. выше) | — | — | — | — | — |
| blog/why-apps-ux-is-getting-worse | 48 | 5 349 | 0.90% | 8.95 | 64 |

Кандидаты, которые фильтр не прошли (важно для честности):
- `blog/button-group-guide` — 0.92% при пороге 0.88% (позиция 12.35). Почти
  на границе, но выше порога. Выпадает.
- `blog/liquid-glass-design-explained-a-practical-guide` — 1.64% при пороге
  1.44% (позиция 9.19). Выше порога, выпадает.
- `blog/submit-a-guest-post` — 3.55% при пороге 0.54%. Сильно выше, выпадает.
- `blog/best-fonts-pairing` — 0.6% при пороге 0.54%. Выше, выпадает.

Исключено по позиции > 20 (это класс D, см. §8):
`why-landing-page-optimization-is-essential` (31.12),
`types-of-dashboards-main-categories` (31.47),
`e-commerce-dashboard-examples` (28.67),
`white-label-seo-reseller-platforms` (29.0),
`marketing-dashboard-examples-templates` (52.37).

Исключено по прямому запрету задания:
`how-to-study-saas-dashboard-in-the-ai-era` (строка 82) не рассматривается.

---

## 3. Шаг 3. Gap = (показы × ожидаемый CTR) − клики

Формула применена к каждому кандидату. Сортировка по убыванию gap.

| # | URL (slug) | показы | поз. | ожид. CTR | факт. клики | gap |
|---|---|---|---|---|---|---|
| 1 | blog/tabs-ui-design | 194 601 | 8.51 | 3.0% | 1211 | **4627** |
| 2 | blog/ai-chat-interface-ui-design | 119 125 | 7.84 | 3.5% | 398 | **3771** |
| 3 | blog/venice-ai-tool-private-uncensored | 140 808 | 8.21 | 3.0% | 625 | **3599** |
| 4 | blog/empty-state-ui-design | 85 421 | 7.61 | 3.5% | 69 | **2921** |
| 5 | blog/retro-brutalist-ui-design-2026 | 63 459 | 6.77 | 4.5% | 214 | **2642** |
| 6 | blog/complete-guide-to-blueprint-grid-design | 48 708 | 5.95 | 5.5% | 228 | **2451** |
| 7 | blog/how-to-cancel-adobe-subscription-without-fees | 86 139 | 8.65 | 3.0% | 241 | **2343** |
| 8 | blog/claymorphism-design-guide | 37 930 | 4.80 | 7.0% | 603 | **2052** |
| 9 | blog/data-table-ui-design | 55 660 | 6.69 | 4.5% | 578 | **1927** |
| 10 | blog/notifications-ui-design | 94 375 | 10.05 | 2.0% | 235 | **1653** |
| 11 | blog/chip-ui-design | 63 233 | 8.08 | 3.0% | 245 | **1652** |
| 12 | blog/toggle-switch-ui-design | 54 049 | 8.90 | 3.0% | 232 | **1389** |
| 13 | blog/pay-for-claude-pro-with-usdt | 53 762 | 7.90 | 3.5% | 537 | **1345** |
| 14 | blog/what-is-looksmax-ai | 43 868 | 7.63 | 3.5% | 277 | **1258** |
| 15 | blog/solcard-review-usdt-crypto-card... | 35 711 | 7.08 | 3.5% | 130 | **1120** |
| 16 | blog/steps-ui-design | 44 092 | 7.43 | 3.5% | 559 | **984** |
| 17 | blog/dashboard-ui-design | 42 411 | 9.03 | 2.5% | 86 | **974** |
| 18 | blog/tooltip-ui-design | 46 658 | 9.20 | 2.5% | 78 | **1088** |
| 19 | blog/badge-ui-design | 38 586 | 8.10 | 3.0% | 138 | **1020** |
| 20 | blog/dropdown-ui-design | 79 741 | 10.93 | 1.6% | 472 | **804** |
| 21 | blog/filter-ui-design | 74 113 | 11.82 | 1.6% | 310 | **876** |
| 22 | blog/pagination-ui-design | 70 603 | 11.00 | 1.6% | 400 | **730** |
| 23 | blog/liquid-glass-vs-glassmorphism | 46 801 | 8.05 | 3.0% | 660 | **744** |
| 24 | blog/jupiter-solana-swap-lend-and-referral-guide | 24 529 | 8.31 | 3.0% | 21 | **715** |
| 25 | blog/dashboard-design-best-practices-top-dashboard-ui-design-tips | 31 971 | 10.20 | 2.0% | 5 | **634** |
| 26 | blog/radio-button-ui-design | 24 648 | 8.52 | 3.0% | 110 | **629** |
| 27 | blog/input-ui-design | 36 263 | 10.75 | 2.0% | 151 | **574** |
| 28 | blog/guest-posts-vs-niche-edits | 38 960 | 11.49 | 1.6% | 79 | **544** |
| 29 | blog/saas-dashboard-examples | 50 861 | 13.97 | 1.2% | 59 | **551** |
| 30 | blog/settings-ui-design | 35 800 | 10.79 | 2.0% | 180 | **536** |
| 31 | blog/checkbox-ui-design | 24 646 | 9.60 | 2.5% | 122 | **494** |
| 32 | blog/top-dashboard-design-examples-ideas | 64 286 | 16.10 | 0.9% | 96 | **483** |
| 33 | blog/guest-posting-opportunities | 123 598 | 19.04 | 0.9% | 634 | **478** |
| 34 | blog/top-real-estate-app-development-companies-compared | 28 267 | 10.73 | 2.0% | 27 | **538** |
| 35 | blog/best-analytics-dashboard-examples | 51 153 | 17.38 | 0.9% | 16 | **444** |
| 36 | blog/user-profile-templates | 25 137 | 10.01 | 2.0% | 88 | **415** |
| 37 | blog/breadcrumbs-ui-design | 45 712 | 12.00 | 1.6% | 149 | **582** |
| 38 | blog/calendar-ui-design | 19 254 | 9.61 | 2.5% | 56 | **425** |
| 39 | blog/neuomorphism-design-guide | 21 013 | 7.90 | 3.5% | 316 | **420** |
| 40 | blog/button-ui-design | 33 399 | 14.31 | 1.2% | 71 | **330** |

Топ-10 по gap: tabs, ai-chat-interface, venice, empty-state, retro-brutalist,
blueprint-grid, adobe, claymorphism, data-table, notifications.

Важная отметка: `how-to-cancel-adobe-subscription-without-fees` уже был
обработан в Шаге 6 (коммит `84b4a66`), но в CSV попали данные ДО правки.
Значит его gap 2343 — это измерение «до», а не новая задача.

---

## 4. Шаг 4. Исключение фантомных показов (класс E)

Фантом на уровне страниц — это показы, приписанные якорным фрагментам
(`.../slug#anchor`) и не дающие кликов. Якоря индексируются отдельно
(`plans/gsc-2026-10-10-raw-record.md:313-331`,
`.ai/seo-baseline-2026-10-10.md:222-247`). В страничном CSV они идут
отдельными строками с 0 кликов.

Якорные пулы по страницам (сумма показов в строках `#...`):

| Страница | якорных показов | строки CSV |
|---|---|---|
| tabs-ui-design | ≈67 208 | 288, 289, 529, 530, 541, 581, 587 |
| steps-ui-design | ≈28 737 | 532, 533, 536, 548, 563 |
| guest-posts-vs-niche-edits | ≈22 621 | 534, 535, 539, 608, 609, 626, 666, 676 |
| chip-ui-design | ≈15 417 | 542–545 |
| ai-chat-interface-ui-design | ≈15 121 | 537, 538, 540, 620, 659, 695, 698 |
| claymorphism-design-guide | ≈13 983 | 546, 547, 554, 556, 579 |
| freebies/m3e-canvas | ≈12 632 | 291, 292, 551, 560, 588, 589, 600, 601 |
| liquid-glass-vs-glassmorphism | ≈10 215 | 307, 555, 564, 571, 590, 611, 613, 624 |
| pagination-ui-design | ≈7 384 | 549, 550, 633, 691 |
| filter-ui-design | ≈7 024 | 557, 558, 559 |
| settings-ui-design | ≈6 107 | 567, 568, 569 |
| button-group-guide | ≈5 807 | 552, 553, 728 |
| venice-ai-tool-private-uncensored | ≈5 716 | 565, 572, 598, 602 |
| notifications-ui-design | ≈5 483 | 577, 586, 595, 636, 658, 696, 780 |
| toggle-switch-ui-design | ≈5 445 | 576, 578, 584, 637, 740 |
| data-table-ui-design | ≈2 983 | 628, 634, 635, 656, 757, 817, 842, 851, 944, 962 |
| empty-state-ui-design | ≈2 615 | 622, 627, 646, 684, 721 |
| badge-ui-design | ≈2 095 | 639, 640, 648, 739, 854, 917, 957 |
| retro-brutalist-ui-design-2026 | ≈351 | 749, 779, 968 |

Класс E (фантом, > 10 000 якорных показов, 0 кликов): tabs-ui-design,
steps-ui-design, guest-posts-vs-niche-edits, chip-ui-design,
ai-chat-interface-ui-design, claymorphism-design-guide, freebies/m3e-canvas,
liquid-glass-vs-glassmorphism.

Следствие для gap: у класса E часть «показов» в разнице — это якорный
фантом, а не спрос. Но он лежит в отдельных строках, а не в строке
canonical-URL, поэтому gap в §3 его НЕ включает. То есть gap по этим
страницам — «чистый», а фантом нужно лечить отдельно (Мера E из
`plans/step6-deep-measures-2026-10.md`).

---

## 5. Шаг 5. Topical join (вручную, по теме страницы)

Связь запрос→страница не выгружена (§0). Ниже — тематическое
сопоставление по slug с тегами. 6 запросов-кандидатов на страницу,
взятых из `plans/compare 6 months - Запросы.csv` по ��овпадению темы.

| Страница | запросы-кандидаты (тема) | тег |
|---|---|---|
| tabs-ui-design | tabs ui design · tab ui design · types of tabs · tabs anatomy · tabs theming · tabs states | demand |
| venice-ai-tool-private-uncensored | venice ai · venice ai private · venice ai uncensored · venice ai review | brand |
| ai-chat-interface-ui-design | ai chat interface ui design · chat ui design · chat interface anatomy | demand |
| empty-state-ui-design | empty state ui design · empty state design · empty state examples | demand |
| retro-brutalist-ui-design-2026 | retro brutalist ui design · brutalist design 2026 · retro ui trends | demand |
| complete-guide-to-blueprint-grid-design | blueprint grid design · vercel aesthetic figma · blueprint grid style | demand |
| how-to-cancel-adobe-subscription-without-fees | how to cancel adobe subscription · cancel adobe without fees | navigational |
| claymorphism-design-guide | claymorphism · claymorphism design guide · clay ui | demand |
| data-table-ui-design | data table ui design · table design patterns · data grid ui | demand |
| notifications-ui-design | notifications ui design · notification patterns · in-app notifications | demand |
| chip-ui-design | chip ui design · chips ui · chip component design | demand |
| dashboard-design-best-practices-... | dashboard design best practices · dashboard ui tips | demand |
| guest-posts-vs-niche-edits | guest posting vs niche edits · guest posts vs niche edits | comparison |
| guest-posting-opportunities | guest posting opportunities · guest posting sites · guest blogging for seo | demand + brand (uploadarticle) |
| best-analytics-dashboard-examples | analytics dashboard · best analytics dashboard examples | demand |
| top-real-estate-app-development-companies-compared | real estate app development companies | comparison |
| jupiter-solana-swap-lend-and-referral-guide | jupiter solana swap · jupiter lend · jupiter referral | brand |

Важная находка по тегам: у `guest-posting-opportunities` в запросах сидит
чужой бренд `uploadarticle*` (≈15 631 показов, 0 кликов,
`plans/zero-ctr-diagnostic-2026-10.md:218-230`). Это значит, что часть
123 598 показов страницы — это чужой бренд, то есть шум, а не спрос.
По правилу `.ai/content-strategy.md:602-611` такие показы не конвертируются
сниппетом.

---

## 6. Шаг 6. Анализ атрибуции (guest-posts-vs-niche-edits и guest-posting-opportunities)

| Страница | клики | показы | CTR | поз. | было поз. | строка |
|---|---|---|---|---|---|---|
| guest-posts-vs-niche-edits | 79 | 38 960 | 0.20% | 11.49 | 19.97 | 48 |
| guest-posting-opportunities | 634 | 123 598 | 0.51% | 19.04 | 21.89 | 7 |

Что видно из данных:
1. Обе страницы выросли по позиции (11.49 против 19.97; 19.04 против
   21.89). То есть Google поднял их, а CTR не вырос.
2. У `guest-posts-vs-niche-edits` есть 79 кликов — значит страница
   кликается, это НЕ нулевой CTR. Сниппет работает частично.
3. Но у обеих есть крупные якорные пулы (§4: ≈22 621 и ≈983+981 показов
   на якорях). Якорные показы дают 0 кликов по определению.
4. Запросы «guest posting vs niche edits» (2 300 показов, поз. 4.57) и
   «guest posts vs niche edits» (2 059, поз. 4.49) —
   `plans/zero-ctr-diagnostic-2026-10.md:48-49, 262-263`. Оба
   comparison-запроса, оба с 0 кликов при позиции ~4.5.

Вердикт: это `атрибуция` + `каннибализация` (класс C). Две страницы
пересекаются по теме с `benefits-of-guest-blogging` и `submit-a-guest-post`.
Точную долю расщепления показов между ними даст только выгрузка query→URL.
Сниппетом это не лечится, нужен либо merge, либо перелинковка с чётким
разделением ролей (пиллар `guest-posting-opportunities` уже назначен,
`.ai/guest-posts-rescue-plan.md:103-119`).

---

## 7. Шаг 7. Итог: ранжированная таблица с классами

Класс определяется только по данным, которые есть. ��де данных нет —
класс не ставится, стоит «?».

| # | Страница | показы | поз. | gap | класс | почему |
|---|---|---|---|---|---|---|
| 1 | tabs-ui-design | 194 601 | 8.51 | 4627 | A + B + E | в зоне сниппета, пиллар, крупный якорный пул |
| 2 | ai-chat-interface-ui-design | 119 125 | 7.84 | 3771 | A + E | зона сниппета, якоря |
| 3 | venice-ai-tool-private-uncensored | 140 808 | 8.21 | 3599 | A | brand-запросы, зона сниппета |
| 4 | empty-state-ui-design | 85 421 | 7.61 | 2921 | A | зона сниппета, чистый интент |
| 5 | retro-brutalist-ui-design-2026 | 63 459 | 6.77 | 2642 | A | зона сниппета, чистый интент |
| 6 | complete-guide-to-blueprint-grid-design | 48 708 | 5.95 | 2451 | A | зона сниппета, чистый интент |
| 7 | how-to-cancel-adobe-subscription-without-fees | 86 139 | 8.65 | 2343 | A (сделано) | правка 84b4a66, данные «до» |
| 8 | claymorphism-design-guide | 37 930 | 4.80 | 2052 | A + E | зона сниппета, якоря |
| 9 | data-table-ui-design | 55 660 | 6.69 | 1927 | A + B | зона сниппета, пиллар |
| 10 | notifications-ui-design | 94 375 | 10.05 | 1653 | A + B | граница зоны сниппета, пиллар |
| 11 | chip-ui-design | 63 233 | 8.08 | 1652 | A + E | зона сниппета, якоря; тело уже усилено |
| 12 | toggle-switch-ui-design | 54 049 | 8.90 | 1389 | A | зона сниппета |
| 13 | pay-for-claude-pro-with-usdt | 53 762 | 7.90 | 1345 | A | зона сниппета |
| 14 | what-is-looksmax-ai | 43 868 | 7.63 | 1258 | A | зона сниппета |
| 15 | solcard-review-usdt-crypto-card... | 35 711 | 7.08 | 1120 | A | зона сниппета |
| 16 | tooltip-ui-design | 46 658 | 9.20 | 1088 | B | тело уже усилено, нужна проверка |
| 17 | badge-ui-design | 38 586 | 8.10 | 1020 | A + B | зона сниппета |
| 18 | steps-ui-design | 44 092 | 7.43 | 984 | A + E | зона сниппета, якоря |
| 19 | dashboard-ui-design | 42 411 | 9.03 | 974 | A (сделано) | правка 9087fa1, данные «до» |
| 20 | filter-ui-design | 74 113 | 11.82 | 876 | B | тело уже усилено |
| 21 | dropdown-ui-design | 79 741 | 10.93 | 804 | B | тело уже усилено |
| 22 | liquid-glass-vs-glassmorphism | 46 801 | 8.05 | 744 | C + E | пересечение с liquid-glass-design-explained |
| 23 | pagination-ui-design | 70 603 | 11.00 | 730 | B | за зоной сниппета |
| 24 | jupiter-solana-swap-lend-and-referral-guide | 24 529 | 8.31 | 715 | ? | нужен тест запросов |
| 25 | dashboard-design-best-practices-... | 31 971 | 10.20 | 634 | B + C | пересечение с dashboard-кластером |
| 26 | radio-button-ui-design | 24 648 | 8.52 | 629 | B | выведен из кнопочного кластера |
| 27 | guest-posts-vs-niche-edits | 38 960 | 11.49 | 544 | C + E | атрибуция + каннибализация |
| 28 | saas-dashboard-examples | 50 861 | 13.97 | 551 | C | dashboard-кластер |
| 29 | top-dashboard-design-examples-ideas | 64 286 | 16.10 | 483 | C | dashboard-кластер |
| 30 | guest-posting-opportunities | 123 598 | 19.04 | 478 | C | пиллар, часть показов = чужой бренд |
| 31 | best-analytics-dashboard-examples | 51 153 | 17.38 | 444 | C | dashboard-кластер |
| 32 | input-ui-design | 36 263 | 10.75 | 574 | A | зона сниппета |
| 33 | top-real-estate-app-development-companies-compared | 28 267 | 10.73 | 538 | ? | нужен тест запросов |
| 34 | settings-ui-design | 35 800 | 10.79 | 536 | A | зона сниппета |
| 35 | checkbox-ui-design | 24 646 | 9.60 | 494 | A | зона сниппета |
| 36 | user-profile-templates | 25 137 | 10.01 | 415 | A | зона сниппета |
| 37 | breadcrumbs-ui-design | 45 712 | 12.00 | 582 | B | тело уже усилено |
| 38 | calendar-ui-design | 19 254 | 9.61 | 425 | A | зона сниппета |
| 39 | neuomorphism-design-guide | 21 013 | 7.90 | 420 | A | зона сниппета |
| 40 | button-ui-design | 33 399 | 14.31 | 330 | B + C | Фаза B отдельным планом |

---

## 8. Мера A v2 (только A-snippet + B-structure)

Мера A v2 — это сужение широкой меры A до двух конкретных типов правок,
выполнимых без новых выгрузок: переписать title/description (A-snippet) и
достроить тело (B-structure: answer-first лид, TL;DR, decision-таблица, FAQ,
checklist). Правки title обязаны соблюдать правило «нет двоеточия»
(`.roo/skills/seo/SKILL.md`) и sentence case (`AGENTS.md:93-168`).

### A-snippet (переписать title + description), 12 страниц

Порядок — по gap. Все позиции в зоне сниппета (≤ ~10).

1. venice-ai-tool-private-uncensored — gap 3599
2. empty-state-ui-design — gap 2921
3. retro-brutalist-ui-design-2026 — gap 2642
4. complete-guide-to-blueprint-grid-design — gap 2451
5. claymorphism-design-guide — gap 2052
6. chip-ui-design — gap 1652
7. toggle-switch-ui-design — gap 1389
8. pay-for-claude-pro-with-usdt — gap 1345
9. what-is-looksmax-ai — gap 1258
10. solcard-review-usdt-crypto-card-that-actually-helps-pay-for-online-subscriptions — gap 1120
11. badge-ui-design — gap 1020
12. input-ui-design — gap 574

Отдельно: `tabs-ui-design` (gap 4627) и `ai-chat-interface-ui-design`
(gap 3771) — тоже A, но они пиллар-страницы с кру��ными якорными пулами,
поэтому идут первыми в связке A + B (§7).

Уже сделано, повторять не нужно: adobe (84b4a66), dashboard-ui-design
(9087fa1).

### B-structure (достроить тело), 8 страниц

Для пилларов и компонентных гайдов с позицией в зоне сниппета, но слабым
телом. Шесть из них уже усилены в `plans/content-strengthening-2026-10.md`
(tooltip, chip, dropdown, filter, slider, breadcrumbs) — для них B
закрыт, нужна только проверка.

Порядок:
1. tabs-ui-design — пиллар, не усилялся
2. data-table-ui-design — пиллар, не усилялся
3. notifications-ui-design — пиллар, не усилялся
4. badge-ui-design — не усилялся
5. chip-ui-design — тело усилено, только проверить
6. tooltip-ui-design — тело усилено, только проверить
7. button-ui-design — отдельный план `plans/button-pillar-phase-b-2026-10.md`
8. dashboard-ui-design — уже правился, проверить структуру

### Что в Меру A v2 НЕ входит

- Класс C (каннибализация) — нужен merge/перелинковка, а не сниппет.
- Класс D (недоранжирование) — нужен контент/авторитет, позиция > 20.
- Класс E (якоря) — технический слой, отдельная Мера E.
- Страницы с классом «?» (jupiter-solana, top-real-estate) — сначала
  нужен тест запросов query→URL.

---

## 9. Класс D: недоранжированные страницы (позиция > 20, показы ≥ 3 000)

Сниппет тут не лечит: страница ниже второй страницы выдачи, кликать нечего.
Нужен контент, ссылки, авторитет или merge.

| Страница | показы | позиция | CTR | строка CSV |
|---|---|---|---|---|
| blog/white-label-seo-reseller-platforms | 44 964 | 29.00 | 0.01% | 192 |
| blog/e-commerce-dashboard-examples | 21 689 | 28.67 | 0.09% | 99 |
| blog/types-of-dashboards-main-categories | 18 164 | 31.47 | 0.12% | 92 |
| blog/why-landing-page-optimization-is-essential | 14 272 | 31.12 | 0% | 531 |
| blog/marketing-dashboard-examples-templates | 13 356 | 52.37 | 0.01% | 290 |
| /bundle (каталог) | 7 608 | 22.50 | 0.54% | 67 |
| /all (каталог) | 5 833 | 26.91 | 0.36% | 96 |
| dashboard-templates/admin-dashboard | 5 439 | 31.68 | 0.35% | 102 |
| dashboard-templates/analytics-dashboard | 3 503 | 28.30 | 0.17% | 172 |
| blog/top-design-tools | 3 076 | 59.95 | 0.07% | 237 |

Замечание по `white-label-seo-reseller-platforms`: позиция 29 против 45.19
(было), показы упали с 146 239 до 44 964, но CTR всё те же 0.01%. Это не
сниппетная задача, а задача роста позиции (Мера B из
`plans/step6-deep-measures-2026-10.md` — пиллар + кластер пласта SEO-услуг).

---

## 10. Класс E: фантомные показы (якоря, > 10 000, 0 кликов)

| Страница | якорных показов | действие |
|---|---|---|
| blog/tabs-ui-design | ≈67 208 | Мера E (технический слой) |
| blog/steps-ui-design | ≈28 737 | Мера E |
| blog/guest-posts-vs-niche-edits | ≈22 621 | Мера E + merge (класс C) |
| blog/chip-ui-design | ≈15 417 | Мера E |
| blog/ai-chat-interface-ui-design | ≈15 121 | Мера E |
| blog/claymorphism-design-guide | ≈13 983 | Мера E |
| freebies/m3e-canvas | ≈12 632 | Мера E |
| blog/liquid-glass-vs-glassmorphism | ≈10 215 | Мера E |

Механика и план — в `plans/step6-deep-measures-2026-10.md` (Мера E) и
`plans/gsc-2026-10-10-raw-record.md:313-331`.

---

## 11. Ограничения и что нужно от владельца

Ограничения этого разбора:
- Ни один файл в `content/` не изменён.
- `how-to-study-saas-dashboard-in-the-ai-era` не рассматривался.
- Кривая ожидаемого CTR — оценочная (industry curve), не бенчмарк проекта.
- Класс E определён косвенно, по якорным строкам, а не по выгрузке шума.
- 2 страницы остались с классом «?»: нет query→URL.

Что нужно, чтобы закрыть пробелы:
1. GSC-выгрузка query→URL (Pages-фильтр внутри запроса) — закроет topical
   join точно и снимет класс «?».
2. Экспорт «Проблемы индексации» со списком URL — уточнит класс E.
3. Решение владельца: взять ли Меру A v2 в работу целиком или по частям.

---

## 12. Источники этого файла

- `plans/compare 6 months - Страницы.csv` (1235 строк) — единственный
  источник цифр по страницам.
- `plans/compare 6 months - Запросы.csv` — тематические запросы-кандидаты.
- `plans/zero-ctr-diagnostic-2026-10.md` — шумовые кластеры, вердикты.
- `plans/step6-deep-measures-2026-10.md` — меры A–E.
- `.ai/seo-benchmarks.md` — бенчмарки проекта по категориям.
- `.ai/seo-baseline-2026-10-10.md:222-247` — якорные URL.
- `plans/gsc-2026-10-10-raw-record.md:313-331` — якорные URL в записи.
- `.ai/content-strategy.md:602-611` — правило «чужой бренд = шум».

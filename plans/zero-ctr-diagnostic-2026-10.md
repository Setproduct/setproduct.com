# Диагностика нулевого CTR — октябрь 2026

СТАТУС: только анализ. Ни один файл в `content/` не менялся.
Артефакт: этот файл. Все утверждения с цифрой — со ссылкой `файл:строка`.

Гипотеза, которую проверяем: 0.00% CTR на позиции 4–20 при тысячах показов —
это не сниппет. Причины в порядке убывания: (а) атрибуция/canonical,
(б) тип SERP (AIO/PAA/паки), (в) девайс/гео-скос, (г) сниппет/интент.

---

## 0. Что есть и чего нет в выгрузках (главное ограничение)

Из шести шагов задания пять требуют данных, которых в CSV нет. Ниже честная
карта: что посчитано, что отсутствует.

| Шаг задания | Данные есть? | Источник |
|---|---|---|
| 1. query→URL (фильтр Pages по запросу) | ❌ нет | отдельные файлы для запросов и страниц, связи нет |
| 2. Девайс-сплит per-pool | ❌ нет | есть только site-wide |
| 3. Гео-сплит per-pool | ❌ нет | есть только site-wide |
| 4. SERP-тип (AIO/PAA) | ❌ нет | снимков выдачи нет вообще |
| 5. Проверка canonical per-pool | ⚠️ частично | бакеты site-wide, URL-уровня нет |
| 6. Data hygiene | ✅ да | запросные CSV |

Выгрузки, которые есть: `plans/compare 6 months - Запросы.csv` (1750 строк),
`plans/compare 6 months - Страницы.csv` (1235 строк),
`plans/compare 6 months - Устройства.csv`, `plans/compare 6 months - Страны.csv`,
`plans/gsc-2026-10-10-raw-record.md`, `.ai/seo-baseline-2026-10-10.md`.

Формат запросного CSV: `query, clicks_last, clicks_prev, impr_last, impr_prev,
CTR_last, CTR_prev, pos_last, pos_prev`
(`plans/compare 6 months - Запросы.csv:1`).
Формат страничного CSV — тот же по колонкам (`plans/compare 6 months - Страницы.csv:1`).

Вывод раздела: шаги 1, 2, 3, 4 в текущих данных невыполнимы без новых выгрузок.
Ниже по каждому шагу — что удалось, и что именно требуется.

---

## 1. Выборка

Обязательный список из задания плюс верх класса B. Показы и позиции —
текущий период 6-мес сравнения.

| # | query | показы | позиция | было | CTR | строка |
|---|---|---|---|---|---|---|
| 1 | guest posting vs niche edits | 2 300 | 4.57 | 4.28 | 0% | Запросы:1039 |
| 2 | guest posts vs niche edits | 2 059 | 4.49 | 4.28 | 0% | Запросы:1512 |
| 3 | uploadarticle guest posting | 6 926 | 8.67 | 7.48 | 0% | Запросы:1468 |
| 4 | how to cancel adobe subscription | 41 558 | 9.8 | 4.06 | 0% | Запросы:267 |
| 5 | landing page optimization | 6 149 | 29.41 | 68.77 | 0% | Запросы:1485 |
| 6 | white label seo platform | 7 148 | 15.22 | 30.13 | 0% | Запросы:1464 |
| 7 | white label seo reseller | 3 808 | 13.99 | 55.08 | 0.05% | Запросы:268 |
| 8 | category management dashboard | 9 361 | 49.51 | 60.71 | 0% | Запросы:1471 |
| 9 | benefits of guest blogging | 937 | 10.61 | 27.17 | 0% | Запросы:1554 |

Расширение (верх класса B, из плана `step6-deep-measures`):

| # | query | показы | позиция | CTR | строка |
|---|---|---|---|---|---|
| 10 | uploadarticleguestposting. com | 3 192 | 3.3 | 0% | Запросы:1648 |
| 11 | uploadarticleguestposting .com | 3 143 | 3.37 | 0% | Запросы:1638 |
| 12 | uploadarticleguestposting.com | 2 370 | 2.13 | 0% | Запросы:1508 |
| 13 | guest blogging seo | 3 516 | 12.04 | 0% | Запросы:1473 |
| 14 | guest blogging for seo | 4 462 | 10.77 | 0% | Запросы:1482 |
| 15 | white label seo tools | 3 850 | 31.5 | 0% | Запросы:1467 |
| 16 | best seo reseller | 1 286 | 10.61 | 0% | Запросы:1466 |
| 17 | landing page optimisation | 1 826 | 35.09 | 0% | Запросы:1594 |
| 18 | analytics dashboard | 2 791 | 46.58 | 0% | Запросы:1483 |
| 19 | best client dashboard design saas analytics 2024 2025 | 2 658 | 5.56 | 0% | Запросы:1531 |
| 20 | event management operator dashboard ui design best practices | 3 400 | 7.79 | 0% | Запросы:1586 |

---

## 2. Шаг 1. query→URL mapping — НЕТ ДАННЫХ

Задание требует точный ранжирующийся URL по каждому запросу (фильтр Pages
внутри запроса). В выгрузках такой связи нет: запросы и страницы лежат в
двух независимых CSV (`plans/compare 6 months - Запросы.csv`,
`plans/compare 6 months - Страницы.csv`). Сопоставить 1:1 невозможно.

Косвенно, по совпадению тем, ожидаемые страницы такие:
- #1, #2 → `guest-posts-vs-niche-edits` ИЛИ `guest-posting-opportunities` (не проверено)
- #3, #10–12 → внешний домен `uploadarticle.com` (чужой бренд)
- #4 → `how-to-cancel-adobe-subscription-without-fees`
- #5, #17 → `why-landing-page-optimization-is-essential`
- #6, #7, #15, #16 → `white-label-seo-reseller-platforms`
- #8, #13, #14 → пласт guest posting / dashboard, страница не определена
- #9 → `benefits-of-guest-blogging`
- #18–20 → каталог `/dashboards` или `best-analytics-dashboard-examples`

Это гипотезы, не факты. Точный URL даст только выгрузка Pages-фильтра.

Отдельно: в 3-месячной записи виден якорный паттерн — показы по
`guest-posts-vs-niche-edits#...` (0 кликов, 7 515 и 7 511 показов),
`.ai/seo-baseline-2026-10-10.md:233-234`. То есть для запросов #1 и #2
часть показов приписана якорным фрагментам, а не самой странице. Это
аргумент в пользу причины (а) — атрибуция — но подтвердить можно только
query→URL.

---

## 3. Шаг 2. Девайс-сплит — только site-wide, per-pool НЕТ

Per-query девайс-разбивки в выгрузках нет. Доступен только site-wide срез
(`plans/compare 6 months - Устройства.csv:2-4`):

| Устройство | Клики | Показы | CTR тек. | CTR пред. | Позиция тек. | Позиция пред. |
|---|---|---|---|---|---|---|
| ПК | 15 375 | 2 924 565 | 0.53% | 0.54% | 11.81 | 14.04 |
| Мобильный | 3 256 | 368 878 | 0.88% | 0.31% | 12.32 | 14.43 |
| Планшет | 80 | 7 198 | 1.11% | 0.12% | 14.10 | 8.83 |

Что это даёт: мобильная позиция (12.32) ненамного хуже десктопной (11.81),
а мобильный CTR выше десктопного (0.88% против 0.53%). Значит девайс-скос
как объяснение нулевого CTR на пулах не выдерживает: планшет и мобильный
конвертят ЛУЧШЕ десктопа. Блендированная позиция пулов не переобъясняется
девайсом.

Прецедент: у владельца уже есть такие выгрузки по кластерам —
`plans/button ui Устройства.csv`, `plans/btn group Фильтры.csv`,
`plans/radio Фильтры.csv`. Значит per-pool девайс-сплит технически возможен,
нужна отдельная выгрузка по пулам.

---

## 4. Шаг 3. Гео-сплит — только site-wide, per-pool НЕТ

Per-query гео в выгрузках нет. Доступен site-wide
(`plans/compare 6 months - Страны.csv:2-5`):

| Страна | Клики | Показы | CTR тек. | Позиция тек. |
|---|---|---|---|---|
| Индия | 3 736 | 272 709 | 1.37% | 10.44 |
| США | 3 683 | 1 787 739 | 0.21% | 11.06 |
| Пакистан | 1 444 | 40 300 | 3.58% | 15.47 |
| Великобритания | 633 | 101 053 | 0.63% | 15.99 |
| Бразилия | 336 | 57 126 | 0.59% | 11 |

Ключевой факт: США дают 1 787 739 из 3 300 641 показов (54% всего сайта)
при самом низком CTR в топе (0.21%) и позиции 11.06. Это сильнейший
кандидат в объяснение общесайтового низкого CTR. Но применить его к
конкретным 20 пулам нельзя: неизвестно распределение их показов по странам.
Гипотеза «девайс/гео-скос» остаётся непроверенной на уровне пула.

---

## 5. Шаг 4. Тип SERP (AIO/PAA/паки) — НЕТ ДАННЫХ

Снимков поисковой выдачи нет ни в одном файле. Определить, отвечает ли
AI Overview на запрос и перехватывает ли он клик, по CSV невозможно.

Косвенно можно предположить, что на запросах «how to cancel adobe
subscription», «benefits of guest blogging», «landing page optimization»
AIO и официальный сайт Adobe/Google почти наверняка присутствуют. Но это
предположение, не факт. Без ручных снимков выдачи шаг не закрывается.

---

## 6. Шаг 5. Проверка canonical — частично

URL-уровня canonical нет. Есть бакеты по всему сайту
(`plans/gsc-2026-10-10-raw-record.md:26-39`,
`.ai/seo-baseline-2026-10-10.md:248-263`):

| Причина | Страниц |
|---|---|
| noindex | 1 948 |
| Вариант canonical | 1 675 |
| Просканировано, но не проиндексировано | 3 481 |
| Дубликат, Google выбрал другой canonical | 67 |
| Canonical не совпадает | 1 |

Сопоставить конкретный пул с бакетом нельзя: в выгрузке нет списка URL по
бакетам. Что известно точно:
- якорные URL подтверждены как отдельно индексируемые
  (`plans/gsc-2026-10-10-raw-record.md:313-331`) — это и есть механика
  причины (а);
- якоря концентрируются на tabs, steps, guest-posts-vs-niche-edits,
  ai-chat-interface, плюс длинный хвост компонентных постов
  (`.ai/seo-baseline-2026-10-10.md:329-331`);
- индексируемые страницы сократились с 3 332 до 2 827
  (`plans/gsc-2026-10-10-raw-record.md:46-47`).

Для точного ответа по шагу нужен экспорт «Проблемы индексации» со списком URL,
а не только со счётчиками.

---

## 7. Шаг 6. Data hygiene — ЕСТЬ НАХОДКИ

Здесь данные есть, и находки серьёзные. Значительная часть показов в пулах —
не человеческий спрос, а строки краулера/агента.

### 7.1. Кластер доменных строк (dashboard/SEO-услуги)

Запросы вида «<домен> product features reporting dashboards analytics
insights data visualization» — это не поисковые запросы людей, а строки,
похожие на автоматический сбор данных. Все с 0% CTR:

| Запрос | Показы | Позиция | Строка |
|---|---|---|---|
| loopfront product features reporting dashboards... | 6 761 | 7.29 | Запросы:1548 |
| setle.app product features reporting dashboards... | 5 691 | 7.05 | Запросы:1542 |
| loopfront.com product features reporting dashboards... | 4 803 | 9.17 | Запросы:1500 |
| shapelets.io analytics dashboards | 1 812 | 10.37 | Запросы:1486 |
| saasframe dashboard design examples | 1 751 | 9.44 | Запросы:1493 |
| palats.io product features reporting dashboards... | 1 605 | 9.17 | Запросы:1519 |
| avallone.io product pages reporting dashboards... | 654 | 10.24 | Запросы:1488 |

Сумма ≈ 23 077 показов, 0 кликов. В 3-месячной записи добавляются
`authenticateis.com product features` (5 392) и `vibbio product features
dashboards` (3 111), `plans/gsc-2026-10-10-raw-record.md:82,87`. Похоже на
один источник автоматических запросов. Это шум, а не интент. Сниппет тут
не при чём.

### 7.2. Кластер uploadarticle (чужой домен)

Варианты написания одного внешнего домена, все 0% CTR:

| Запрос | Показы | Позиция | Строка |
|---|---|---|---|
| uploadarticle guest posting | 6 926 | 8.67 | Запросы:1468 |
| uploadarticleguestposting. com | 3 192 | 3.3 | Запросы:1648 |
| uploadarticleguestposting .com | 3 143 | 3.37 | Запросы:1638 |
| uploadarticleguestposting.com | 2 370 | 2.13 | Запросы:1508 |

Сумма ≈ 15 631 показов, 0 кликов. Запрос содержит чужой бренд. По правилу
из `.ai/content-strategy.md:602-611` это шум: сниппет не поможет.

### 7.3. Скрапленные предложения как «запросы»

Строки, которые вообще не являются запросами:

| Запрос | Показы | Строка |
|---|---|---|
| select any theme you like from the drop-down and click to apply. | 1 851 | Запросы:1490 |
| best practices user uploaded images stories integration | 2 486 | Запросы:1478 |
| best practices user uploaded images stories integration (пред.) | — | Запросы:1478 |
| checkbox on right side usability advantages | 1 808 | Запросы:1492 |

Это query expansion: Google показывает сайт по фрагментам текста, не по
спросу. Показы инфлейтятся, клики нулевые по определению.

### 7.4. Вывод по hygiene

Порог округления не виноват: 0 — реальный ноль, а не артефакт (в CSV есть
строки с CTR 0.02%, 0.05% — значит точность записи выше нуля,
`plans/compare 6 months - Запросы.csv:531,268`). Но часть «нулевых» пулов —
это не спрос, а query expansion и краулерские строки. Их надо вычесть из
выборки прежде, чем считать их CTR-проблемой.

---

## 8. Главная таблица отчёта

Колонки, которых нет в данных, помечены «н/д».

| query | показы | поз. desktop | поз. mobile | country top | AIO/PAA | ranking URL | canonical OK? | вердикт |
|---|---|---|---|---|---|---|---|---|
| guest posting vs niche edits | 2 300 | н/д | н/д | н/д | н/д | не подтверждён (гипотеза: 2 страницы) | н/д | атрибуция |
| guest posts vs niche edits | 2 059 | н/д | н/д | н/д | н/д | якорные `#...` дают 7 515+7 511 показов | н/д | атрибуция |
| uploadarticle guest posting | 6 926 | н/д | н/д | н/д | н/д | внешний домен uploadarticle.com | не применимо | шум |
| how to cancel adobe subscription | 41 558 | н/д | н/д | н/д | н/д | `how-to-cancel-adobe-subscription-without-fees` | н/д | SERP-тип (гипотеза) |
| landing page optimization | 6 149 | н/д | н/д | н/д | н/д | `why-landing-page-optimization-is-essential` | н/д | позиция вне зоны сниппета |
| white label seo platform | 7 148 | н/д | н/д | н/д | н/д | `white-label-seo-reseller-platforms` | н/д | не определяется без выгрузки |
| white label seo reseller | 3 808 | н/д | н/д | н/д | н/д | `white-label-seo-reseller-platforms` | н/д | не определяется без выгрузки |
| category management dashboard | 9 361 | н/д | н/д | н/д | н/д | не определён | н/д | позиция вне зоны сниппета |
| benefits of guest blogging | 937 | н/д | н/д | н/д | н/д | `benefits-of-guest-blogging` | н/д | SERP-тип (гипотеза) |
| uploadarticleguestposting. com | 3 192 | н/д | н/д | н/д | н/д | внешний домен | не применимо | шум |
| guest blogging seo | 3 516 | н/д | н/д | н/д | н/д | пласт guest posting | н/д | не определяется |
| guest blogging for seo | 4 462 | н/д | н/д | н/д | н/д | пласт guest posting | н/д | не определяется |
| best seo reseller | 1 286 | н/д | н/д | н/д | н/д | `white-label-seo-reseller-platforms` | н/д | не определяется |
| landing page optimisation | 1 826 | н/д | н/д | н/д | н/д | `why-landing-page-optimization-is-essential` | н/д | позиция вне зоны сниппета |
| analytics dashboard | 2 791 | н/д | н/д | н/д | н/д | каталог /dashboards | н/д | позиция вне зоны сниппета |
| best client dashboard design saas analytics 2024 2025 | 2 658 | н/д | н/д | н/д | н/д | не определён | н/д | не определяется |

Прямое следствие: по трём из четырёх альтернативных причин (девайс, гео,
SERP-тип) вердикт поставить нельзя — данных нет. Ставлю вердикт только там,
где данные есть: шум, атрибуция, позиция вне зоны сниппета. Остальное —
«не определяется без выгрузки», и это честный результат диагностики.

---

## 9. Сводка вердиктов

Пул = 20 запросов из выборки.

| Вердикт | Кол-во | Пулы |
|---|---|---|
| шум | 4 | uploadarticle guest posting, uploadarticleguestposting. com, .com-вариант, (кластер доменных строк 7.1 — отдельно) |
| атрибуция | 2 | guest posting vs niche edits, guest posts vs niche edits |
| позиция вне зоны сниппета | 4 | landing page optimization, landing page optimisation, category management dashboard, analytics dashboard |
| SERP-тип (гипотеза, нужен снимок) | 2 | how to cancel adobe subscription, benefits of guest blogging |
| не определяется без выгрузки | 8 | white label seo platform, white label seo reseller, white label seo tools, best seo reseller, guest blogging seo, guest blogging for seo, best client dashboard design saas analytics 2024 2025, event management operator dashboard ui design best practices |

Дополнительно, вне таблицы 20: кластер доменных строк (§7.1, ≈23 077 показов)
и скрапленные предложения (§7.3, ≈6 145 показов) — тоже шум.

---

## 10. Пулы, которые ПЕРЕСТАЮТ быть кандидатами на сниппет-правку

Это пулы с вердиктом атрибуция / шум / позиция вне зоны сниппета. Их нельзя
лечить через title/description меры A.

1. uploadarticle guest posting — шум (чужой домен)
2. uploadarticleguestposting. com — шум
3. uploadarticleguestposting .com — шум
4. uploadarticleguestposting.com — шум
5. guest posting vs niche edits — атрибуция (якоря + возможная каннибализация)
6. guest posts vs niche edits — атрибуция (якоря)
7. landing page optimization — позиция 29.41, сниппет не в зоне видимости
8. landing page optimisation — позиция 35.09, то же
9. category management dashboard — позиция 49.51
10. analytics dashboard — позиция 46.58
11. кластер доменных строк (loopfront, setle.app, shapelets.io, palss, palats.io, avallone.io, saasframe) — шум/query expansion
12. скрапленные предложения (select any theme..., checkbox on right side...) — шум

Условно остаются кандидатами (нужна выгрузка): how to cancel adobe subscription,
benefits of guest blogging, white label seo platform, white label seo reseller,
white label seo tools, best seo reseller, guest blogging seo, guest blogging for seo,
best client dashboard design saas analytics 2024 2025, event management operator
dashboard ui design best practices.

---

## 11. Что нужно от владельца

1. **GSC-выгрузка query→URL.** Экспорт отчёта «Запросы» с включённой
   разбивкой по страницам (Pages-фильтр внутри запроса) — или наоборот,
   «Страницы» с разбивкой по запросам. Закрывает шаги 1 и 5.
2. **Девайс- и гео-сплит по пулам.** У владельца уже есть такие файлы по
   кластерам (`plans/button ui Устройства.csv`, `plans/btn group Фильтры.csv`).
   Нужны такие же по 20 пулам. Закрывает шаги 2 и 3.
3. **Снимки выдачи по 10 флагманским запросам.** Вручную, на десктопе и
   мобильном, с фиксацией AIO/PAA/image-pack/video и топ-1 источника.
   Закрывает шаг 4. Без этого «SERP-тип» остаётся гипотезой.
4. **Экспорт «Проблемы индексации» со списком URL** (не только счётчики) —
   чтобы сопоставить пулы с бакетами variant canonical / duplicate.
5. **Доступ к GSC API** (если есть) — убирёт ручные выгрузки и даст
   query+page+device+country одним запросом.

---

## 12. Ограничения этого разбора

- Ни один файл в `content/` не изменён.
- `how-to-study-saas-dashboard-in-the-ai-era` не рассматривался.
- 8 из 20 пулов остались без вердикта: данных в CSV не хватает.
- Гипотеза (в) девайс/гео по site-wide данным не подтверждается:
  мобильный и планшетный CTR выше десктопного
  (`plans/compare 6 months - Устройства.csv:2-4`).

# GSC raw record, окно 2026-07-07 → 2026-10-06

Рабочая запись. Это сырые факты из Google Search Console, собранные из
5 скриншотов и 11 CSV в `plans/`. Выводы и приоритеты НЕ здесь, они
появятся после данных GA4. Файл нужен, чтобы не перечитывать CSV заново.

## 1. Источник и окно

- Тип поиска: Веб. Период: последние 3 месяца.
- Точное окно по `plans/Диаграмма.csv`: 2026-07-07 → 2026-10-06 (93 дня).
- Ресурс покрывает всё семейство `*.setproduct.com`, не только `www`.
- Предыдущий baseline: `.ai/seo-baseline-2026-05-28.md` (окно дек 2025 → май 2026).

## 2. Итоги по сайту (за 3 месяца)

| Метрика | Значение |
|---|---|
| Клики | 11.4K (по скриншоту сравнения: +57%) |
| Показы | 1.33M (по скриншоту сравнения: −32%) |
| CTR | 0.9% |
| Средняя позиция | 12.1 |
| Доля небрендового трафика | ~97% |

## 3. Индексируемость (`plans/Критические проблемы.csv`)

| Причина | Страниц |
|---|---|
| noindex | 1948 |
| Вариант canonical | 1675 |
| Просканировано, но не проиндексировано | 3481 |
| Заблокировано 4xx | 210 |
| Дубликат, Google выбрал другой canonical | 67 |
| 404 | 50 |
| Страница с редиректом | 34 |
| Мягкая 404 | 28 |
| Заблокировано robots.txt | 7 |
| Обнаружено, но не проиндексировано | 4 |
| Дубликат, canonical не совпадает | 1 |
| 5xx | 0 |

`plans/Незначительные проблемы.csv`: одна строка (проиндексировано
несмотря на robots.txt), 0 страниц.

Динамика индексации (`plans/Диаграмма 2.csv`, с 2026-07-12):

- Не проиндексировано: колеблется 7083 → 7505 (последние строки ~7505).
- Проиндексировано: 3332 → 2827 (снижение за период).

## 4. Топ запросов по кликам (`plans/Запросы.csv`)

| Запрос | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| m3e canvas | 1222 | 7233 | 16.89% | 3.61 |
| setproduct (бренд) | 197 | 362 | 54.42% | 1.06 |
| looksmax ai | 113 | 14722 | 0.77% | 7.87 |
| claymorphism | 102 | 13591 | 0.75% | 3.52 |
| m3e-canvas | 99 | 1080 | 9.17% | 3.60 |
| claymorphism ui | 76 | 2784 | 2.73% | 3.97 |
| glassmorphism vs liquid glass | 59 | 405 | 14.57% | 1.54 |
| pagination ui | 31 | 1601 | 1.94% | 3.33 |
| uncensored ai tools | 24 | 403 | 5.96% | 22.27 |
| how to cancel adobe subscription without fee | 22 | 3324 | 0.66% | 7.92 |

Наблюдаемые кластеры (факт, не вывод):

- m3e canvas: очень много вариантов (`m3e-canvas`, `m3e cavas`, `mc3 canvas`, `m3e画布`, `m3e canva github`, `m3e??`).
- looksmax ai: `looksmax ai`, `lookmax ai`, `looksmaxer`, `looksmaxing`, `what is looksmax ai`, `chatgpt looksmax`, `looksmaxx report` и др.
- guest posting: десятки формулировок (`guest posting`, `guest blogging`, `niche edits vs guest posts`, `submit a guest post`, `write for us`, `saas "submit guest post"`).
- venice / uncensored AI: `uncensored ai like venice`, `can venice ai do nsfw`, `venice ai image generator nsfw`, `venice uncensored free`.
- crypto / no-KYC: `no kyc crypto card`, `crypto visa card no kyc`, `how to pay claude ai`, `claude usdt`, `non kyc crypto card`.
- Adobe отмена подписки: `how to cancel adobe subscription`, `cancel adobe subscription without cancellation fee`, `get out of adobe cancellation fee`, `cheap creative cloud subscription`.

## 5. Запросы с показами без кликов (0% CTR)

Отсортировано по показам. Это сырьё для будущего разбора, не выводы.

| Запрос | Клики | Показы | Позиция |
|---|---|---|---|
| how to cancel adobe subscription | 1 | 34800 | 9.88 |
| uploadarticle guest posting.com | 0 | 5887 | 10.26 |
| "loopfront product features reporting dashboards..." | 0 | 5717 | 6.65 |
| "authenticateis.com product features..." | 0 | 5392 | 8.01 |
| category management dashboard | 0 | 4303 | 50.33 |
| guest blogging for seo | 0 | 3985 | 10.00 |
| "setle.app product features..." | 0 | 3773 | 8.30 |
| landing page optimization | 0 | 3559 | 25.32 |
| vibbio product features dashboards | 0 | 3111 | 8.26 |
| guest blogging seo | 0 | 2845 | 10.24 |
| event management operator dashboard ui design... | 0 | 2699 | 7.73 |
| tab design | 1 | 2307 | 9.x |
| guest posting vs niche edits | 0 | 1337 | 3.83 |
| analytics dashboard | 0 | 1685 | 44.67 |
| how do i get clients as a freelance graphic designer? | 0 | 1176 | 9.70 |
| site:www.setproduct.com | 0 | 890 | 14.71 |

Плюс длинный хвост (строки 842–1007) из 1–3 показов на запрос с около
нулевым CTR, во многом по guest posting, niche edits, dashboard и ui kit.

## 6. Топ страниц по кликам (`plans/Страницы.csv`)

| Страница | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| /freebies/m3e-canvas | 1354 | 9600 | 14.10% | 4.40 |
| /blog/tabs-ui-design | 599 | 73639 | 0.81% | 7.87 |
| /blog/liquid-glass-vs-glassmorphism | 599 | 33069 | 1.81% | 5.22 |
| /blog/claymorphism-design-guide | 558 | 34206 | 1.63% | 4.28 |
| /blog/data-table-ui-design | 540 | 39467 | 1.37% | 6.59 |
| /blog/guest-posting-opportunities | 473 | 64201 | 0.74% | 16.09 |
| /blog/submit-a-guest-post | 460 | 13809 | 3.33% | 18.55 |
| /blog/ai-chat-interface-ui-design | 310 | 61716 | 0.50% | 7.95 |
| /blog/what-is-looksmax-ai | 274 | 43176 | 0.63% | 7.63 |
| /blog/venice-ai-tool-private-uncensored | 253 | 26132 | 0.97% | 8.49 |
| /blog/how-to-cancel-adobe-subscription-without-fees | 84 | 51863 | 0.16% | 9.36 |
| /blog/notifications-ui-design | 78 | 24709 | 0.32% | 9.90 |
| /blog/dashboard-ui-design | 66 | 21499 | 0.31% | 8.89 |

## 7. Страницы с высокими показами и нулём кликов

Два разных типа:

1. Якорные URL (прокрутка внутри статьи), все 0 кликов:
   - tabs-ui-design#tabs-theming | 0 | 9228
   - steps-ui-design#usability-tips | 0 | 5020
   - guest-posts-vs-niche-edits#* | 0 | 4275
   - freebies/m3e-canvas#material-3-expressive | 0 | 2934
   - плюс множество `#anchor` по dashboard-ui-design, carousel-ui-design, user-profile-templates, retro-brutalist и др.
2. URL поддоменов приложения, 0 кликов, показы по 12–70 каждая в длинном хвосте:
   - app.setproduct.com/components/... (button, dropdown, calendar, table, tag, input, toggle, dialog, search, badge и др.)
   - app.setproduct.com/tag/... , app.setproduct.com/patterns/... , app.setproduct.com/sections/...
   - react.setproduct.com/docs/... , angular.setproduct.com/components/...
   - publish.setproduct.com/login
   - часть ссылок с `?utm_source=setproduct.com&utm_medium=navbar&utm_campaign=inspiration`

## 8. География (`plans/Страны.csv`, 236 строк)

| Страна | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| Индия | 2416 | 156756 | 1.54% | 10.75 |
| США | 2046 | 613002 | 0.33% | 11.08 |
| Пакистан | 1007 | 22314 | 4.51% | 14.44 |
| Великобритания | 345 | 49116 | 0.70% | 14.17 |
| Германия | 323 | 22501 | 1.44% | 8.93 |
| Канада | 241 | н/д в выгрузке | | |

Хвост: строки 170–236 содержат страны с 0 кликов и малым числом показов.

## 9. Устройства (`plans/Устройства.csv`)

| Устройство | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| ПК | 9190 | 1115206 | 0.82% | 12.41 |
| Мобильный | 2200 | 214089 | 1.03% | 10.72 |
| Планшет | 52 | 4128 | 1.26% | 11.55 |

## 10. Динамика по дням (`plans/Диаграмма.csv`, 93 дня)

- Пик: 2026-09-08 = 598 кликов / 17280 показов / 3.46% / позиция 9.1.
- Соседние дни: 2026-09-07 = 297, 2026-09-09 = 304.
- Октябрь: стабильно ~130–160 кликов в день, CTR ~1.2–1.6%, позиция ~8.4.

## 11. Появление в поиске (`plans/Вид в поиске.csv`)

| Тип результата | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| Переведённые результаты поиска | 116 | 11785 | 0.98% | 7.87 |
| Описания товара | 80 | 14790 | 0.54% | 20.87 |

`plans/Метаданные.csv`: Sitemap, все обработанные страницы (значение в поле одно).
`plans/Фильтры.csv`: Тип поиска = Веб; Дата = за последние 3 месяца.

## 12. Сравнение периодов за 6 месяцев (эффект Wave 1)

Режим GSC «Сравнить», переключатель «6 месяцев». Значения со скриншота
(«Обновлено 38,5 часа назад»), период 2 = последние 6 месяцев,
период 1 = предыдущие 6 месяцев.

Итоги по сайту:

| Метрика | Последние 6 мес | Предыдущие 6 мес | Изменение |
|---|---|---|---|
| Клики | 18.7 тыс. | 13.2 тыс. | примерно +42% |
| Показы | 3.3 млн | 2.72 млн | примерно +21% |
| Средний CTR | 0.6% | 0.5% | +0.1 п.п. |
| Средняя позиция | 11.9 | 14 | улучшение на 2.1 |

Обрати внимание: это окно за 6 месяцев (~2026-04 → 2026-10), оно шире
основного окна в разделе 2 (3 месяца, 11.4K кликов). Цифры не путать.

Точные построчные числа получены CSV-экспортом того же экрана (оба периода).
Фильтры выгрузки (`compare 6 months - Фильтры.csv`): Тип поиска = Веб,
Дата = за последние 6 месяцев.

### 12.1. Сверка итогов со скриншотом

Сумма по разбивке «Устройства»: клики 18 711 (было 13 205), показы
3 300 641 (было 2 715 799). Совпадает с округлением скриншота
(18.7 тыс. / 3.3 млн) — выгрузка валидна.

### 12.2. Устройства (`compare 6 months - Устройства.csv`)

| Устройство | Клики тек. | Клики пред. | Показы тек. | Показы пред. | CTR тек. | CTR пред. | Поз. тек. | Поз. пред. |
|---|---|---|---|---|---|---|---|---|
| ПК | 15 375 | 11 436 | 2 924 565 | 2 129 683 | 0.53% | 0.54% | 11.81 | 14.04 |
| Мобильный | 3 256 | 1 720 | 368 878 | 546 811 | 0.88% | 0.31% | 12.32 | 14.43 |
| Планшет | 80 | 49 | 7 198 | 39 305 | 1.11% | 0.12% | 14.10 | 8.83 |

Два сигнала: мобильный CTR вырос почти втрое (0.31% → 0.88%),
а планшетные показы обвалились (39 305 → 7 198).

### 12.3. Страны (`compare 6 months - Страны.csv`, 243 строки)

| Страна | Клики тек. | Клики пред. | Показы тек. | Показы пред. | CTR тек. | CTR пред. | Поз. тек. | Поз. пред. |
|---|---|---|---|---|---|---|---|---|
| Индия | 3 736 | 2 681 | 272 709 | 256 170 | 1.37% | 1.05% | 10.44 | 9.17 |
| США | 3 683 | 2 981 | 1 787 739 | 1 312 844 | 0.21% | 0.23% | 11.06 | 14.61 |
| Пакистан | 1 444 | 641 | — | — | — | — | — | — |
| Великобритания | 633 | 575 | — | — | — | — | — | — |
| Германия | 552 | 449 | — | — | — | — | — | — |
| Канада | 398 | 335 | — | — | — | — | — | — |
| Индонезия | 352 | 168 | — | — | — | — | — | — |
| Австралия | 347 | 220 | — | — | — | — | — | — |
| Бразилия | 336 | 175 | — | — | — | — | — | — |
| Вьетнам | 292 | 141 | — | — | — | — | — | — |
| Россия | 285 | 185 | — | — | — | — | — | — |
| Франция | 259 | 271 | — | — | — | — | — | — |
| Нидерланды | 230 | 197 | — | — | — | — | — | — |
| Мексика | 225 | 60 | — | — | — | — | — | — |
| Испания | 212 | 201 | — | — | — | — | — | — |

США держат больше половины всех показов (1.79 млн из 3.3 млн), но CTR там
самый низкий в топе (0.21%). Дальше 40+ стран вплоть до нулевых территорий.

### 12.4. Вид в поиске (`compare 6 months - Вид в поиске.csv`)

| Тип результата | Клики тек. | Клики пред. | Показы тек. | Показы пред. | CTR тек. | CTR пред. | Поз. тек. | Поз. пред. |
|---|---|---|---|---|---|---|---|---|
| Описания товара | 340 | 1 342 | 46 004 | 132 201 | 0.74% | 1.02% | 17.88 | 17.58 |
| Переведённые результаты поиска | 205 | 63 | 21 767 | 7 744 | 0.94% | 0.81% | 8.02 | 9.97 |
| Фрагмент отзыва | 5 | 18 | 211 | 812 | — | — | — | — |
| Данные о товарах продавца | 1 | 1 | 14 252 | 4 921 | — | — | — | — |

Главная потеря периода — «Описания товара»: минус 1 002 клика и минус
86 197 показов. Это не блог, это товарные карточки шаблонов.

### 12.5. Запросы — победители (`compare 6 months - Запросы.csv`, 1750 строк)

| Запрос | Клики тек. | Клики пред. | Показы тек. | CTR тек. | Поз. тек. |
|---|---|---|---|---|---|
| m3e canvas | 1 222 | 0 | 7 503 | 16.89% | 3.61 |
| setproduct | 426 | 447 | — | 52.59% | 1.05 |
| looksmax ai | 113 | 0 | 19 112 | — | — |
| claymorphism | 108 | 0 | — | — | — |
| m3e-canvas | 99 | 0 | — | — | — |
| claymorphism ui | 84 | 0 | — | — | — |
| glassmorphism vs liquid glass | 68 | 0 | — | — | — |
| pagination ui | 46 | 4 | — | — | — |
| venice ai nsfw | 46 | 10 | — | — | — |
| how to cancel adobe subscription without fee | 51 | 58 | — | — | — |

Рост целиком из новых небрендовых тем: m3e canvas, looksmax ai, claymorphism,
glassmorphism vs liquid glass. Брендовый `setproduct` держится (426 → 447).

### 12.6. Запросы — потери и обвал брендовых опечаток

- `setgpt` — 0 кликов за период, но 133 клика в предыдущем (67 показов).
- `setgbt` — 0 кликов, 20 в предыдущем.
- `setgtp` — 0 кликов, 18 в предыдущем.
  Три опечатки бренда вместе давали ~171 клик и обнулились.
- `dropdown ui` 6 кликов (2 104 показа тек. / 626 пред.).
- `notifications ui`, `button ui`, `stepper ui` — все в минусе (см. 12.8).
- `material ui` — 0 кликов при 32 074 показах в предыдущем периоде.
- `white label seo platform` (пред. 15 960 показов), `seo reseller` (12 941),
  `best seo reseller` (10 277), `white label seo tools` (8 117),
  `category management dashboard` (9 361), `best ui kits for designers` (5 047),
  `guest blogging seo` (3 627), `thorswap swap` (2 903) — весь этот пласт
  имеет 0 кликов за период при былых показах.

### 12.7. Страницы — победители (`compare 6 months - Страницы.csv`, 1235 строк)

| URL | Клики тек. | Клики пред. | Показы тек. | Показы пред. |
|---|---|---|---|---|
| /freebies/m3e-canvas | 1 354 | 0 | — | — |
| /blog/tabs-ui-design | 1 211 | 771 | 194 601 | 96 491 |
| /blog/submit-a-guest-post | 678 | 433 | — | — |
| /blog/liquid-glass-vs-glassmorphism | 660 | 0 | — | — |
| /blog/guest-posting-opportunities | 634 | 258 | — | — |
| /blog/venice-ai-tool-private-uncensored | 625 | 337 | — | — |
| /blog/claymorphism-design-guide | 603 | 0 | — | — |
| /blog/data-table-ui-design | 578 | 0 | — | — |
| /blog/steps-ui-design | 559 | 347 | — | — |
| /blog/pay-for-claude-pro-with-usdt | 537 | 0 | — | — |

Отдельно: главная `/` 687 против 925 — просадка, позиция ухудшилась
(23.65 против 17.9).

### 12.8. Страницы — потери

| URL | Клики тек. | Клики пред. |
|---|---|---|
| /blog/dropdown-ui-design | 472 | 628 |
| /blog/notifications-ui-design | 235 | 679 |
| /blog/button-ui-design | 71 | 233 |
| /blog/stepper-ui-design | 69 | 227 |
| /templates/orion | 134 | 302 |
| /dashboards | 106 | 234 |
| /pricing-ui-design | 51 | 160 |
| /mobile | 49 | 164 |
| /bundle | 41 | 108 |
| /blog/optimizing-digital-marketing | 0 | 4 (2 017 показов) |
| /blog/benefits-of-dashboards | — | 9 (2 320 показов) |
| /blog/figma-auto-layout-debate | 0 | 6 (1 808 показов) |

### 12.9. Высокие показы и ноль кликов — якорные URL

Огромный пласт: URL с якорями (`#anchor`) на популярных постах получают
десятки тысяч показов и ноль кликов. Это техническая проблема выдачи
(Google индексирует якорные фрагменты как отдельные URL).

| URL | Клики | Показы |
|---|---|---|
| /blog/tabs-ui-design#tabs-theming | 0 | 15 819 |
| /blog/tabs-ui-design#tabs-states | 0 | 15 186 |
| /blog/why-landing-page-optimization-is-essential | 0 | 14 272 |
| /blog/steps-ui-design#usability-tips | 0 | 9 161 |
| /blog/guest-posts-vs-niche-edits#... | 0 | 7 515 |
| /blog/guest-posts-vs-niche-edits#... | 0 | 7 511 |
| /blog/ai-chat-interface-ui-design#... | 0 | 4 569 |

Тот же паттерн у якорей claymorphism, chip-ui-design, filter-ui-design,
settings-ui-design, pagination-ui-design, breadcrumbs, toggle-switch,
notifications, checkbox, badge, tooltip, input, radio-button, button-ui-design.

Далее в файле (строки 1004–1235): поддомены `react.` / `angular.` /
`publish.` (документация, почти везде 0 кликов) и хвост UUID-URL
`app.setproduct.com` (~1 показ на URL).

## 13. GA4 — получено (следующее сообщение)

GA4-выгрузка пришла и обработана отдельно: см.
`plans/ga4-2026-10-10-raw-record.md` (каналы, первый источник, целевые
страницы, страницы и экраны, события, демография, внутренний поиск,
а также удержание и возвращаемость в разделе 10а).

## 14. Что ещё понадобится позже

- Решение по `.ai/seo-baseline-2026-10-10.md` (создаём на основе этой записи + GA4).
- Закрытие TBD-категорий в `.ai/seo-benchmarks.md`.
- Проверка статуса rescue-планов (tabs, notifications, guest-posts) в `content/blog/`.
- Оценка dashboard-пиллара за 30 дней.
- (Опционально) GA4 «Удержание» по блогу — как вытащить, описано в ответе.

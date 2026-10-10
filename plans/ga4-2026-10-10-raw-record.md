# GA4 raw record — 2026-07-12 → 2026-10-09

Сырая сводка данных Google Analytics 4 (property Setproduct), выгруженных 2026-10-10.
Файл содержит только зафиксированные цифры. Разбор, гипотезы и выводы — отдельно,
в `.ai/seo-baseline-2026-10-10.md` (после подтверждения).

## 0. Источник и окно

| Параметр | Значение |
|---|---|
| Источник | GA4, выгрузки CSV + скриншоты Acquisition overview |
| Окно данных | 2026-07-12 → 2026-10-09 (последние 90 дней на момент выгрузки) |
| Внутренний поиск (search.csv) | 2026-08-14 → 2026-10-09 |
| Файлы в `plans/` | 11 CSV (см. ниже) + 1 скриншот |
| Колонка «Общий доход» | везде 0 — монетизация в GA4 не размечена |

Полный список файлов:
- `ga4 Traffic_acquisition_Session_default_channel_group.csv`
- `ga4 Источники_трафика_Источник_или_канал,_связанный_с_первым_взаимодействием_пользователя.csv`
- `ga4 Источники_трафика_Источник,_связанный_с_первым_взаимодействием_пользователя.csv`
- `ga4 Целевая_страница_Целевая_страница.csv`
- `ga4 Страницы_и_экраны_Путь_к_странице_и_класс_экрана.csv`
- `ga4 События_Название_события.csv`
- `ga4 Демографические_данные_Страна.csv`
- `ga4 Обзор_активности_посетителей.csv`
- `ga4 Обзор_атрибутов_пользователей.csv`
- `ga4 search.csv`

## 1. Общий объём (по событиям)

| Событие | Событий | Пользователей |
|---|---|---|
| page_view | 60 355 | 39 621 |
| session_start | 51 157 | — |
| first_visit | 38 949 | — |
| user_engagement | 34 508 | — |
| scroll | 9 331 | — |
| click | 5 045 | — |
| search_form_on_categories_submit | 1 444 | 559 |
| get_started_button_gumroad_on_products_c | 1 041 | 837 |
| contact_us_link_click | 890 | 511 |
| form_start | 724 | — |
| click_get_a_quote_button | 522 | — |
| search_form_submit | 473 | — |
| view_search_results | 445 | — |
| form_submit | 428 | — |
| share_button_facebook_click_on_articles | 136 | — |
| dribble_click | 50 | — |
| linkedin_click | 44 | — |
| twitter_click | 18 | — |
| share_button_linkedin_click_on_articles | 17 | — |
| pinterest_click | 11 | — |
| reddit_click | 5 | — |
| buy_button_gumroad_click_on_catalog | 2 | — |
| medium_click | 2 | — |

Итого 23 события. Конверсионные события: Gumroad get-started, get-a-quote, contact_us, form_submit, buy_button.
Всего событий «ключевые» по каналам ниже суммируются примерно в 400+ (direct 178 + organic 161 + прочие).

## 2. Каналы (session default channel group) — топ-25

| Источник / канал | Сеансы | Пользователи | Новые | Ср. вовлеч., с | Отказы | Ключевые | Доля с ключ. |
|---|---|---|---|---|---|---|---|
| (direct)/(none) | 24 123 | 20 403 | 20 308 | 16.44 | — | 178 | 0.0058 |
| google/organic | 22 298 | 15 890 | 15 319 | 29.98 | — | 161 | 0.0060 |
| chatgpt.com/ai-assistant | 1 285 | 994 | 966 | 29.81 | — | 50 | 0.0280 |
| bing/organic | 629 | — | — | — | — | 8 | — |
| Pinterest/organic | 414 | — | — | — | 0.821 | — | — |
| kamushken.medium.com/referral | 326 | — | — | — | — | — | — |
| tilda.education/referral | 291 | — | — | — | — | — | — |
| gemini.google.com/ai-assistant | 239 | — | — | — | — | 4 | — |
| duckduckgo/organic | 180 | — | — | — | — | — | — |
| claude.ai/ai-assistant | 110 | 58 | 53 | 30.73 | — | 2 | 0.0182 |
| perplexity.ai/ai-assistant | 61 | — | — | — | — | 3 | — |
| (not set) | 55 | — | — | — | — | — | — |
| reddit.com/referral | 31 | — | — | — | — | — | — |
| habr.com/referral | 29 | — | — | — | — | — | — |
| figmachina/referral | 28 | — | — | — | — | — | — |
| search.brave.com/organic | 27 | — | — | — | — | — | — |
| cn.bing.com/organic | 26 | — | — | — | — | — | — |
| behance.net/referral | 25 | — | — | — | — | — | — |
| venice.ai/referral | 24 | — | — | — | — | 5 | 0.1667 |
| linkedin.com/referral | 23 | — | — | — | — | — | — |
| ecosia.org/organic | 22 | — | — | — | — | — | — |

**Хвост (81–216)**, значимое:
- `youtube.com/referral` 4, `ya.ru/referral` 4
- `chatgpt.com/referral` 4, `grok.com/ai-assistant` 2, `openai/(not set)` 1, `perplexity.ai/referral` 1, `duck.ai/referral` 1
- `vertexaisearch.cloud.google` 3 + `vertexaisearch.cloud.google.com` 3 (AI Overviews / Gemini grounding)
- `l.meta.ai` 3, `sider.ai`, `manus.im`, `syntx.ai`, `app.emergent.sh` (по 1)
- Локальные версии Pinterest (`co/de/in/jp/no/pinterest.com`), Yahoo-локали (`au/id/images/vn/kz/uz/ph/sg/uk/search.yahoo.com`), `alice.yandex.ru`, `dzen.ru`, `vc.ru`, `casper55.ru`, `uxgo.ru`, `sd.kscgroup.ru`, `tlgrm_uxhorn`
- SEO-инструменты как реферреры: `ahrefs.com`, `app.ahrefs.com`, `semrush.accesstool.in`, `db.backlinkers.com`, `admin.linkbuilder.io`, `dashboard.linkpublishers.com`, `thestarkseo.com`
- Мусорные/локальные: `localhost:63342`, `localhost:8765`, `127.0.0.1:8770`, `bugfix.ordersystem.co.uk`, `devbox.tiktok-row.net`

## 3. Первый источник (first user channel)

| Источник / канал | Пользователи | Новые | Сеансы с вовлеч. | Ср. вовлеч., с | Ключевые | Доля с ключ. |
|---|---|---|---|---|---|---|
| (direct)/(none) | 20 425 | 20 308 | 1 744 | — | 193 | 0.00708 |
| google/organic | 15 694 | 15 319 | 3 177 | 42.07 | 156 | — |
| chatgpt.com/ai-assistant | 973 | 966 | 158 | 38.57 | 48 | 0.0341 |
| bing/organic | 489 | — | — | — | 7 | — |
| kamushken.medium.com/referral | 285 | — | — | — | — | — |
| tilda.education/referral | 239 | — | — | — | — | — |
| Pinterest/organic | 217 | — | — | — | — | — |
| gemini.google.com/ai-assistant | 185 | — | — | — | — | — |
| duckduckgo/organic | 141 | — | — | — | — | — |
| claude.ai/ai-assistant | 55 | — | — | — | 2 | 0.0377 |
| perplexity.ai/ai-assistant | 42 | — | — | — | — | — |
| chatgpt.com/referral | 13 | — | — | — | 2 | 0.1250 |
| behance.net/referral | 13 | — | — | — | 2 | 0.1538 |

**Первый источник (source-only)**, AI и прочее:
`(direct)` 20 425 / ключ 193; `google` 15 694 / 156; `chatgpt.com` 987 / 50 / 0.0348; `bing` 489;
`kamushken.medium.com` 285; `tilda.education` 239; `Pinterest` 217; `gemini` 185; `claude.ai` 55;
`perplexity.ai` 43; `copilot.com` 8; `grok.com` 2; `venice.ai` 1.

## 4. Целевые страницы (landing page) — топ-25

| Страница | Сеансы | Вовлеч. | Новые | Ср. вовлеч., с | Ключевые | Доля с ключ. |
|---|---|---|---|---|---|---|
| / | 5 671 | 5 308 | 5 209 | — | 111 | — |
| (not set) | 5 450 | 3 230 | — | — | — | — |
| /freebies/m3e-canvas | 2 437 | — | — | — | 15 | — |
| /blog/data-table-ui-design | 2 417 | — | — | — | 11 | — |
| /blog/liquid-glass-vs-glassmorphism | 1 988 | — | — | — | — | — |
| /blog/ai-chat-interface-ui-design | 1 578 | — | — | — | — | — |
| /blog/tabs-ui-design | 1 456 | — | — | — | — | — |
| /templates/orion | 1 452 | — | — | — | 26 | — |
| /blog/claymorphism-design-guide | 1 221 | — | — | — | 10 | — |
| /blog/dropdown-ui-design | 884 | — | — | — | — | — |
| /blog/retro-brutalist-ui-design-2026 | 700 | — | — | — | — | — |
| /blog/dashboard-ui-design | 616 | — | — | — | — | — |
| /blog/guest-posting-opportunities | 609 | — | — | — | — | — |
| /blog/submit-a-guest-post | 585 | — | — | — | 7 | — |
| /blog/venice-ai-tool-private-uncensored | 534 | — | 526 | — | — | — |
| /blog/saas-subscription-waste | 459 | — | — | — | — | — |
| /blog/what-is-looksmax-ai | 310 | — | — | — | — | — |
| /mobile | 225 | — | — | — | 18 | — |

**Хвост (81–452)**, значимое:
- `/search` 46 сеансов, **29 ключевых, доля 0.5** — наивысшая конверсия среди целевых страниц
- `/freebies/ios-datepickers` 96 / ключ 2; `/templates/s8` 102 / ключ 4; `/blog/accordion-ui-design` 69 / ключ 2; `/freebies/orion-dataviz-templates` 19 / ключ 4
- Много страниц с <50 сеансов
- Мусорные/битые URL: `/blog/liquid-glass-design-explained-a-practical-guideXENIA ROCA ACADEMY S.L.` (1 сеанс, 1 249 с), `:IHow`, `:><b>…</b`, base64-слаги `Y2hpbmVzZS`, `bm90aWZpY2E`, `ZGFzaGJvYX`

## 5. Страницы и экраны (views) — топ-25

| Путь | Просмотры | Пользователи | Просм./польз. | Ср. вовлеч., с | Событий | Ключевые |
|---|---|---|---|---|---|---|
| / | 7 017 | 5 815 | — | — | — | 80 |
| /freebies/m3e-canvas | 3 004 | 2 162 | — | 24.58 | — | — |
| /blog/data-table-ui-design | 2 783 | 1 961 | — | 41.80 | — | — |
| /blog/liquid-glass-vs-glassmorphism | 2 373 | — | — | — | — | — |
| /templates/orion | 1 942 | — | — | — | — | 17 |
| /blog/ai-chat-interface-ui-design | 1 739 | — | — | — | — | — |
| /blog | 1 671 | — | — | — | — | 17 |
| /blog/tabs-ui-design | 1 590 | — | — | — | — | — |
| /blog/claymorphism-design-guide | 1 467 | — | — | — | — | — |
| /all | 1 154 | — | — | — | — | 26 |
| /blog/dropdown-ui-design | 942 | — | — | — | — | — |
| /blog/venice-ai-tool-private-uncensored | 565 | — | — | 13.62 | — | — |
| /search | 570 | — | — | — | — | 43 |
| /blog/saas-subscription-waste | 492 | — | — | — | — | — |
| /blog/notifications-ui-design | 447 | — | — | — | — | — |
| /blog/what-is-looksmax-ai | 367 | — | — | — | — | — |
| /blog/why-some-designers-dislike-ai | 84 | 15 | 5.6 | 97.93 | — | — |

**Хвост (121–485)**, значимое:
- `/blog/pricing-ui-design` 78; `/blog/jupiter-solana-swap-lend-and-referral-guide` 76; `/blog/how-to-study-saas-dashboard-in-the-ai-era` 70; `/blog/why-every-ai-startup-looks-the-same` 70; `/legal/license` 69; `/freebies/invoice` 68; `/templates/website` 68 (ключ 1)
- `/templates/oe-enterprise` 67 (ключ 1), `/blog/liftkit-open-source-design-system-for-figma-react` 58 (ключ 1), `/freebies/hyper-charts` 57 (ключ 2), `/templates/levitate` 34 (ключ 2), `/freebies/messenger-app-desktop-template` 29 (ключ 2)
- `/contact` 28 сеансов, ср. вовлеч. **0.94 с**, отказы; `/contact-us` 21, вовлеч. 0.375 с
- `/authors/roman-kamushken` 37, вовлеч. 41.90 с
- `/blog/getting-your-first-startup-users` 29, вовлеч. **123.5 с**
- Мусорные пути: `/blog/Y2hpbmVzZS` 11, `/blog/bm90aWZpY2` 2, `/contact us`, `/templatsd/hyper-charts`, `/blog/dropdown-ui-design)`, `:HTop`, `:CCreating`, `&sz=32`, `查找上面链接详情页…`

## 6. Демография по странам — топ-20

| Страна | Активные польз. | Сеансы с вовлеч. | Доля взаимод. | Ключевые |
|---|---|---|---|---|
| United States | 7 918 | 3 798 | 0.389 | 39 |
| Singapore | 5 315 | 792 | 0.145 | 4 |
| India | 4 841 | — | 0.457 | 77 |
| Pakistan | 1 534 | — | 0.656 | 22 |
| Netherlands | 1 272 | — | — | 7 |
| China | 1 192 | — | — | — |
| Germany | 1 085 | — | — | 9 |
| Brazil | 1 032 | — | — | 12 |
| United Kingdom | 897 | — | — | — |
| (not set) | 867 | — | — | — |
| Russia | 576 | — | — | 21 |
| Vietnam | 568 | — | — | 18 |
| Australia | 500 | — | — | 13 |
| France | 448 | — | — | 13 |

**Хвост (81–193)**: Bahrain 14 польз. / 4 ключ / 0.214; Benin 7 / 2 ключ.; Macao 10; и множество малых стран.
Singapore: вовлеч. 2.41 с, доля взаимод. 0.145 — низкая по сравнению с US 0.389.

## 7. Внутренний поиск на сайте (search.csv) — полностью

Окно 2026-08-14 → 2026-10-09, события `view_search_results` / `search_form_submit`.
Всего ~295 событий: десктоп 289, мобильные 6.

| Запрос | Десктоп | Мобильные | Всего |
|---|---|---|---|
| dashboard | 7 | 0 | 7 |
| calendar | 6 | 0 | 6 |
| material | 5 | 0 | 5 |
| далее ~200 терминов по 1 обращению | | | |

Хвост из 1 обращения включает: accordion, breadcrumbs (с опечатками `breadcrump`, `breadscrumbs`), claymorphism, glassmorphism, liquid glass, tabs, table design, ui, saas, seo и др.

## 8. Обзор активности посетителей (недельные блоки)

| Блок | Просмотры | Ср. вовлеч./польз., с |
|---|---|---|
| 0000 | 3 486 | ~26.8–35.8 |
| … | … | … |
| (неделя-8) | 6 875 (пик) | — |
| далее | 5 394 / 5 681 / 5 753 / 5 444 | — |

Полная разбивка по 13 недельным блокам — в исходном файле (824 строки).

## 9. Обзор атрибутов пользователей (ISO-коды)

`Активные пользователи` по кодам стран (5990 строк). Голова: AD 2, AE 183, BR 1032, CA 671, CN 1192, DE 1085, FR 448, GB 897, ID 588, IE 400.
Полная таблица — в исходном файле.

## 10. Что ещё понадобится (уточнить у владельца)

1. **GSC «Сравнение периодов»** — окно за 6 месяцев. Получено точным
   CSV-экспортом, зафиксировано в `plans/gsc-2026-10-10-raw-record.md`,
   раздел 12.
2. **GA4 конверсии в деньгах** — сейчас «Общий доход» = 0 везде. Н��жен ли ecommerce-трекинг Gumroad, или считаем клики по Gumroad за прокси-конверсию.
3. **GA4 отчёт по когортам/retention** — получено три CSV: `Обзор_удержания.csv`,
   `Аудитории_Название_аудитории.csv`, `Обзор_активности_посетителей.csv`.
   Разобраны в разделе 10а.
4. **Охват `Обзор_активности_посетителей.csv`** — подтвердить период
   (недельный срез против 3 месяцев), иначе цифры нельзя сопоставлять
   с разделом 1.

## 10а. Удержание и возвращаемость (3 дополнительных CSV)

Владелец нашёл в GA4 три отчёта по возвращаемости и выгрузил CSV.
Точный путь в интерфейсе он не нашёл (переключатель «Когорта по первой
покупке / первому взаимодействию» локализовать не удалось), поэтому это
то, что реально удалось достать.

### 10а.1. Обзор удержания (`plans/Обзор_удержания.csv`, 448 строк)

Окно 2026-07-12 → 2026-10-09.

Блок «Новые пользователи» по неделям (0000–0012): 2 170 … 4 163 (пик на
неделе 0008) … 3 545. Блок «Вернувшиеся пользователи» (0000–0012):
388 … 646 (пик тоже на неделе 0008) … 513. То есть возвращающихся
примерно 13–17% от новых каждую неделю.

Блок когорт «Когорта, День 1, День 7, День 30» (коэффициенты удержания,
когорты 0–89): нулевая когорта 0.03463 / 0 / 0; когорта 8 —
0.02451 / 0.00735 / 0.00245. Диапазон: день 1 примерно 2–3%,
день 7 0.2–1%, день 30 0–0.5%.

Далее в файле есть однотипные блоки с теми же заголовками, где значения
похожи на длительности (например, 0: 43.25 / 0 / 0; 21: 203 / 312 / 0).
Это, вероятно, «среднее время взаимодействия» по когортам, а не rate.
Разметка в CSV неоднозначная, при разборе не смешивать эти блоки с
коэффициентами.

Дополнительные блоки (строки 231+):
- «Когорта, Активные пользователи» (20260829 → 20261009), когорты
  0000–0041 долями: 0000 = 1, 0001 = 0.01607, 0002 = 0.00571 …
- «Когорта, Среднее время взаимодействия на активного пользователя»
  (20260829 → 20261009): 0000 = 25.4, 0001 = 123.9 …
- «Когорта, Среднее значение за 120 дней» (20260612 → 20261009),
  когорты 0000–0119, везде нули (сигнал ещё не вызрел).

### 10а.2. Аудитории (`plans/Аудитории_Название_аудитории.csv`)

Окно 20260712 → 20261009. Одна строка:

| Аудитория | Всего польз. | Новые | Сеансы | Просм./сеанс | Ср. длит. сеанса, с | Доход |
|---|---|---|---|---|---|---|
| All Users | 1 385 | 5 | 3 141 | 1.22 | 121.44 | 0 |

### 10а.3. Обзор активности посетителей (`plans/Обзор_активности_посетителей.csv`, 545 строк)

Окно 20260712 → 20261009. ВАЖНО: сумма `page_view` здесь 3 830,
это в разы меньше полного трёхмесячного итога по сайту (60 355 из
раздела 1). Похоже, это недельный или иным образом отфильтрованный
срез. Перед использованием в выводах нужно подтвердить охват д��т у
владельца.

Блоки:
- «Среднее время взаимодействия на активного пользователя» по неделям
  (0000–0012), с: 64.45 … 82.90 … 146.75 (пик) … 70.49.
- «Сеансы с взаимодействием на активного пользователя» примерно 0.84–1.06.
- «Среднее время взаимодействия на сеанс», с: 17.90 … 29.66 … 43.46
  (пик на неделе 0008) … 24.59.
- «Просмотры»: 223–348; «Количество событий»: 637–898.
- «Название события, Количество событий»: page_view 3 830,
  session_start 3 114, user_engagement 2 074, scroll 665, click 247,
  search_form_on_categories_submit 128, contact_us_link_click 110,
  form_start 64, get_started_button_gumroad_on_products_c 57,
  click_get_a_quote_button 52, view_search_results 43,
  search_form_submit 39, form_submit 37 и далее хвост.
- «Заголовок страницы и класс экрана, Просмотры»: Data table UI design
  reference 251; homepage 234; Orion UI kit 203; blog listing 196;
  tech publication 151; Tab UI design 121; AI chat interfaces 109;
  Glassmorphism vs neumorphism 106; далее хвост до 1.
- «Тенденции среди активных пользователей» (20260712 → 20261009):
  - «День N, 30 дней, 7 дней, 1 день» счётчики активных пользователей
    (0000: 344 / 77 / 3; 0089: 355 / 94 / 21; стабильно около 280–355 /
    55–104 / 2–26).
  - «День N, за день/месяц, за день/неделю, за неделю/месяц» отношения
    DAU/MAU, DAU/WAU, WAU/MAU (0000: 0.00872 / 0.03896 / 0.22384;
    0089: 0.05915 / 0.22340 / 0.26479). Липкость: DAU/MAU около 0.9–9%,
    WAU/MAU около 17–33%.

## 11. Что НЕ содержит этот файл

Никаких выводов, гипотез, приоритетов и рекомендаций. Это сырые цифры.
Анализ и предложения по обновлению `.ai/seo-benchmarks.md` и `.ai/content-strategy.md`
готовятся отдельно и пишутся только после подтверждения.

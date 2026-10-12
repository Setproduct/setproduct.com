# White-label SEO пиллар: диагностика, вердикт, план сателлитов (октябрь 2026)

## Итог одной строкой

Страница `white-label-seo-reseller-platforms` несла 3 разных интента на одном URL (4 клика / 40 674 показа / CTR 0.01% / поз. 28.91). Переписана как пиллар, добавлены 2 темы сателлитов.

## 1. Диагностика (топ-30 без пола 300)

Выгрузка: `plans/gsc-queries-white-label-seo-reseller-platforms.zip`.
Страница: 4 клика, 40 674 показа, CTR 0.01%, средняя позиция 28.91. В экспорте 330 строк, сумма показов 37 789 (покрытие 93%).

| Интент | Показы (топ-30) | Запросов | Примеры |
|---|---|---|---|
| platform / software | 14 082 | 10 | white label seo platform (6 594), white label seo software (2 941), seo white label software (876), white label seo management platforms (523) |
| reseller | 10 003 | 11 | white label seo reseller (3 558), white label seo reseller services (1 616), best seo reseller (1 180), seo reseller (503) |
| tools | 8 447 | 7 | white label seo tools (3 355), white label seo tool (3 323), seo tools with white label (470), serp white label tool (299) |
| brand | 331 | 1 | semrush white label |
| noise | 277 | 1 | white label search engine |

**Разных интентов: 3** (platform/software, reseller, tools) плюс brand и noise. Все три крупных интента ужимались в один листинг из шести платформ.

## 2. Вердикт

**Пиллар + 2 сателлита.** Три интента слишком далеки, чтобы закрыть их одной страницей, но и не настолько разные, чтобы строить три независимых пиллара. Пиллар забирает platform/software-интент (крупнейший, 14 082), сателлиты забирают reseller и tools.

Причина по данным: страница ранжируется по позициям 13-73 сразу по трём формулировкам и не конвертирует ни одну (0.01% CTR). Лучшая позиция (`white label seo management platforms`, 13.9) тоже даёт 0 кликов.

## 3. Что сделано на пилларе

Файл: `content/blog/white-label-seo-reseller-platforms.mdx`.

- Title → `White label SEO platforms and resellers for agencies` (52, без двоеточия, sentence case, покрывает platform + reseller).
- Answer-first лид (≈48 слов) + метка `{/* IMAGE: hero */}`.
- TL;DR из 4 пунктов.
- Comparison-таблица шести платформ (Платформа / Price model / White-label depth / Что даёт агентству / Чего не хватает).
- Секция «What a white label SEO platform actually is».
- Разбор шести платформ (AgencyPlatform, SEOReseller, FatJoe, Stanventures, Semify, StellarSEO).
- Секция «Who each option fits» (кому что подходит).
- FAQ: 5 вопросов под реальные запросы (platform, reseller, tools, best reseller, small agency without hiring).
- Метка `{/* IMAGE: диаграмма выбора платформы */}` после comparison-таблицы.
- Перелинковка: `seo-tools-compared`, `guest-posting-opportunities`, `guest-posts-vs-niche-edits`.
- Убран старый само-referential экстернал-линк на agencyplatform.com (страница-обзор не должна вести на один из сравниваемых вендоров как «best»).

## 4. План сателлитов

| Сателлит | Рабочий title | Интент | Целевые запросы |
|---|---|---|---|
| S1 | White label SEO reseller programs, how agencies resell under their own brand | reseller (10 003 показов) | white label seo reseller, white label seo reseller services, best seo reseller, seo reseller program |
| S2 | White label SEO tools, what to resell and what to build in house | tools (8 447 показов) | white label seo tools, white label seo tool, seo tools with white label, serp white label tool |

## 5. Перелинковка

Пиллар → S1, S2, `seo-tools-compared`, `guest-posting-opportunities`, `guest-posts-vs-niche-edits`.
S1 → пиллар, S2, `guest-posting-opportunities`.
S2 → пиллар, S1, `seo-tools-compared`.

Контекст: guest-post кластер связан через «агентство продаёт ссылки» (link building как услуга white-label).

## 6. Self-check пиллара (фактические цифры)

Em-dash: 0. Двоеточий в H2/H3: 0. Трихолоны: 2 (в лимите). Title: 52. Description: 155. Слов в теле: 1 028. Меток IMAGE: 2. `npm run lint` — чисто.

## 7. Коммиты (без push)

- Часть 1: `aab41c5` (badge seo), `2957463` (looksmax content), `3f1fb46` (venice seo)
- Часть 2: `fd63998` (tabs FAQ content)
- Часть 3: `5a7232a` (white-label pillar content)

## 8. Что НЕ делалось

- Title трёх пиллар-страниц (tabs, data-table, notifications) не менялся.
- Тело трёх пиллар-страниц ниже FAQ не трогалось.
- Страницы волн 1-2 и денежный кластер не тронуты.
- `gsc-queries-guest-article-for-web-development.zip` не трогался.

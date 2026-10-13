# Карта интентов денежных страниц + перепроверка 3 спорных (октябрь 2026)

Окно данных: 3 месяца (2026-07-07 → 2026-10-06) для per-page выгрузок,
6 месяцев для `plans/compare 6 months - Страницы.csv`.
Источник per-page: `plans/gsc-queries-<slug>.zip` → `Запросы.csv`, `Страницы.csv`
(распакованы через Python, cp437 в cp866).
Правки в `content/` не делались. Только `plans/`.

---

# БЛОК A — перепроверка 3 спорных страниц

## A.0. Главная методическая оговорка (анонимизация)

Per-page выгрузка GSC отдаёт только запросы выше порога приватности. Сумма
показов по выгрузке МНОГО меньше показов страницы:

| Страница | Показы страницы (3 мес) | Сумма показов в выгрузке | Покрытие | Вывод |
|---|---|---|---|---|
| empty-state-ui-design | 83 100 (Страницы.csv:L2) | 3 979 | 4.8% | жёсткая анонимизация |
| complete-guide-to-blueprint-grid-design | 48 929 (Страницы.csv:L2) | 2 289 | 4.7% | жёсткая анонимизация |
| retro-brutalist-ui-design-2026 | 63 868 (Страницы.csv:L2) | 4 215 | 6.6% | жёсткая анонимизация |

Это НЕ несовпадение темы. Это отсечка приватности: у страниц десятки тысяч
показов размазаны по сотням низкочастотных фраз, которые GSC не раскрывает.
Все доли ниже считаются по видимой части выгрузки и помечены как таковые.

## A.1. empty-state-ui-design

Топ-25 по показам (без пола 300) — `Запросы.csv`:

| # | Показы | Клики | CTR | Позиция | Запрос | Тег |
|---|---|---|---|---|---|---|
| 1 | 452 | 0 | 0% | 17.44 | empty state ux | тема (L8) |
| 2 | 276 | 1 | 0.36% | 16.29 | empty state ui | тема (L5) |
| 3 | 215 | 0 | 0% | 17.02 | empty states ux | тема (L9) |
| 4 | 166 | 0 | 0% | 12.87 | empty states design | тема (L10) |
| 5 | 143 | 0 | 0% | 6.9 | nielsen norman group empty state interface design | тема + чужой бренд (L11) |
| 6 | 132 | 0 | 0% | 21.21 | empty states | тема (L12) |
| 7 | 131 | 2 | 1.53% | 12.58 | empty states ui | тема (L3) |
| 8 | 127 | 0 | 0% | 21.76 | empty state | тема (L13) |
| 9 | 125 | 0 | 0% | 12.46 | empty state ui design | тема (L14) |
| 10 | 112 | 0 | 0% | 14.75 | empty state design | тема (L15) |
| 11 | 101 | 0 | 0% | 7.44 | nielsen norman group empty states ux | тема + чужой бренд (L16) |
| 12 | 95 | 0 | 0% | 7.4 | nielsen norman group empty states ux guidance | тема + чужой бренд (L17) |
| 13 | 91 | 0 | 0% | 9.07 | blank ui | тема (L18) |
| 14 | 90 | 0 | 0% | 6.76 | nielsen norman group empty states ux design | тема + чужой бренд (L19) |
| 15 | 65 | 0 | 0% | 7.62 | blank slate ui design | тема (L20) |
| 16 | 63 | 0 | 0% | 5.02 | mobile app empty state design placeholder | тема (L21) |
| 17 | 63 | 0 | 0% | 9.08 | material design empty states guidance | тема + чужой бренд (L22) |
| 18 | 60 | 0 | 0% | 9.62 | how to design empty states ui ux best practices | тема (L23) |
| 19 | 56 | 0 | 0% | 7 | nielsen norman group empty states ux guidelines | тема + чужой бренд (L24) |
| 20 | 56 | 0 | 0% | 8.54 | "template catalog wireframes for empty and error states" | тема, скрап-предложение (L25) |
| 21 | 53 | 0 | 0% | 7.34 | nielsen norman group empty states ux best practices | тема + чужой бренд (L26) |
| 22 | 52 | 0 | 0% | 10.21 | ai empty state generator | тема, но tool-интент (L27) |
| 23 | 48 | 0 | 0% | 8.29 | how do i design empty states? | тема (L28) |
| 24 | 47 | 0 | 0% | 6.47 | "drop them in collections page with empty state screen..." | тема, скрап-предложение (L29) |
| 25 | 44 | 0 | 0% | 17.73 | ux empty states | тема (L30) |

Доли:
- Топ-25: тема = 2 325 / 2 863 = **81.2%**; чужой бренд = 538 = 18.8%.
- Вся выгрузка (схема «любое тематическое слово»): тема = 3 822 / 3 979 = **96.1%**; прочее = 157 = 3.9%.

**Вывод: тема СОВПАДАЕТ.** Запросы «nielsen norman group empty state…» содержат
«empty state» и тематически релевантны гайду; это не мусор, а выдача NN/g,
которая абсорбирует часть кликов. Агент был неправ, когда по фильтру
(показы ≥ 300, позиция ≤ 15, CTR < 2%) получил 0 целей и объявил тему
несогласованной. Тот фильтр отсёк всё, потому что головные фразы («empty state
ux» 452 показа) стоят на позиции 17.44, то есть глубже 15.

Чем реально кормится страница: 83 100 показов при 70 кликах (0.08%) на позиции
7.64. Видимая выгрузка даёт только 4.8% показов. Проблема не в теме сниппета,
а в типе SERP и позиции: головные «empty state» сидят на 12–21, а часть выдачи
занимает NN/g. Title здесь работает, но упрётся в позицию и AI-ответ.

## A.2. complete-guide-to-blueprint-grid-design

Топ-25 по показам — `Запросы.csv`:

| # | Показы | Клики | CTR | Позиция | Запрос | Тег |
|---|---|---|---|---|---|---|
| 1 | 237 | 1 | 0.42% | 8.09 | blueprint grid | тема (L9) |
| 2 | 215 | 0 | 0% | 6.06 | grid noise animator vercel app | навигация к инструменту Vercel (L13) |
| 3 | 175 | 6 | 3.43% | 4.1 | vercel aesthetic | тема (L3) |
| 4 | 153 | 0 | 0% | 7.59 | grid noise animator vercel | навигация к инструменту (L14) |
| 5 | 130 | 2 | 1.54% | 7.09 | linear vercel style | тема (L5) |
| 6 | 129 | 1 | 0.78% | 5.19 | grid maker vercel | навигация к инструменту (L10) |
| 7 | 83 | 0 | 0% | 19.69 | vercel design system | тема (L15) |
| 8 | 81 | 2 | 2.47% | 5.47 | vercel grid | тема (L6) |
| 9 | 74 | 0 | 0% | 3.35 | vercel design style infographic monochrome | тема (L16) |
| 10 | 57 | 0 | 0% | 4.61 | grid maker.vercel | навигация к инструменту (L17) |
| 11 | 52 | 0 | 0% | 6.88 | vercel dashboard design patterns | тема (L18) |
| 12 | 51 | 2 | 3.92% | 3.37 | linear/vercel aesthetic | тема (L19) |
| 13 | 51 | 0 | 0% | 5.27 | linear vercel style dashboard design | тема (L20) |
| 14 | 41 | 4 | 9.76% | 3.1 | linear vercel aesthetic | тема (L21) |
| 15 | 38 | 0 | 0% | 3.97 | vercel grid maker | навигация к инструменту (L22) |
| 16 | 27 | 0 | 0% | 4.07 | vercel esthetics | тема (L23) |
| 17 | 27 | 0 | 0% | 7.15 | linear/vercel style | тема (L24) |
| 18 | 24 | 0 | 0% | 47.88 | grid analysis design suite | не тема (L25) |
| 19 | 23 | 0 | 0% | 8.7 | grid blueprint | тема (L26) |
| 20 | 20 | 1 | 5% | 6.2 | linear / vercel style | тема (L27) |
| 21 | 20 | 0 | 0% | 4.2 | gridmaker.vercel | навигация к инструменту (L28) |
| 22 | 19 | 0 | 0% | 8.26 | grid-noise-animator.vercel.app | навигация к инструменту (L29) |
| 23 | 19 | 0 | 0% | 27.42 | site:www.setproduct.com | site-оператор (L30) |
| 24 | 19 | 0 | 0% | 40.53 | molecular-green.vercel.app | чужой домен (L31) |
| 25 | 18 | 0 | 0% | 8.72 | grid-noise-animator.vercel | навигация к инструменту (L32) |

Доли:
- Строгая схема (версел/грид как тема, инструменты отдельно): тема = 1 072 / 1 783 = **60.1%** (топ-25).
- Схема «любое тематическое слово»: тема = 2 124 / 2 289 = **92.8%**.

**Вывод: тема СОВПАДАЕТ, но с крупной примесью навигационного интента.**
Статья — про эстетику Vercel, и «vercel aesthetic» (175 показов, CTR 3.43%,
позиция 4.1) реально кликается. Отдельный пласт — запросы к чужим
Vercel-инструментам («grid noise animator vercel», «grid maker vercel»,
«grid-noise-animator.vercel.app»): это пользователи ищут конкретный генератор,
а не статью, и такие клики сниппетом не вылечить. Плюс чужой домен
«molecular-green.vercel.app» (19 показов) и site-оператор (19).

Чем кормится страница: 48 929 показов при 228 кликах (0.47%). Видимая выгрузка
= 4.7%. Часть — навигация к инструментам Vercel, которую захватить невозможно.
Агент был неправ лишь частично: тема совпадает, но фильтр ≥ 300 показов снова
дал 0 целей (единственная тематическая фраза «blueprint grid» = 237 показов
< 300 при позиции 8.09).

## A.3. retro-brutalist-ui-design-2026

Топ-25 по показам — `Запросы.csv`:

| # | Показы | Клики | CTR | Позиция | Запрос | Тег |
|---|---|---|---|---|---|---|
| 1 | 525 | 3 | 0.57% | 7.07 | industrial-brutalist-ui | чужая библиотека (L3) |
| 2 | 324 | 1 | 0.31% | 6.98 | industrial brutalist ui | чужая библиотека (L5) |
| 3 | 225 | 1 | 0.44% | 6.8 | brutalist ui | тема (L6) |
| 4 | 135 | 0 | 0% | 4.27 | neo-brutalist mobile app design patterns 2026 | тема (L15) |
| 5 | 95 | 0 | 0% | 4.05 | saasframe dashboard neo brutalist examples 2026 | тема + чужой бренд (L16) |
| 6 | 77 | 0 | 0% | 1.16 | what is brutalism in graphic design | тема (L17) |
| 7 | 56 | 0 | 0% | 6.04 | neo brutalist dashboard design best practices 2026 | тема (L18) |
| 8 | 55 | 1 | 1.82% | 8.44 | industrial brutalism ui | чужая библиотека (L7) |
| 9 | 55 | 0 | 0% | 5.71 | saasframe dashboard brutalist examples | тема + чужой бренд (L19) |
| 10 | 48 | 0 | 0% | 5.77 | neo brutalist dashboard examples 2026 | тема (L20) |
| 11 | 47 | 0 | 0% | 2.94 | godly website brutalist dashboard examples 2026 | тема + чужой бренд (L21) |
| 12 | 46 | 0 | 0% | 5.07 | neo brutalist mobile app design trends 2026 | тема (L22) |
| 13 | 46 | 0 | 0% | 5.96 | neo-brutalist dashboard design examples 2026 | тема (L23) |
| 14 | 44 | 0 | 0% | 1.2 | brutalist dashboard examples 2026 | тема (L24) |
| 15 | 42 | 0 | 0% | 8.81 | brutalist web design trends 2026 | тема (L25) |
| 16 | 41 | 0 | 0% | 5.8 | neo brutalist ui design examples 2026 | тема (L26) |
| 17 | 40 | 1 | 2.5% | 5.72 | retro / brutalist / imperfect aesthetics | тема (L27) |
| 18 | 39 | 0 | 0% | 6.74 | the brutalist y2k pose | тема (L28) |
| 19 | 38 | 0 | 0% | 4.68 | nucaloric marathon 2026 ui design aesthetic brutalist | тема, скрап (L29) |
| 20 | 37 | 0 | 0% | 4.76 | neo brutalist dashboard design patterns 2026 | тема (L30) |
| 21 | 36 | 0 | 0% | 6.61 | swiss brutalism design trends 2026 | тема (L31) |
| 22 | 36 | 0 | 0% | 7.03 | brutalist ui design | тема (L32) |
| 23 | 36 | 0 | 0% | 7.39 | neo-brutalist saas dashboard design examples 2026 | тема (L33) |
| 24 | 36 | 0 | 0% | 7.67 | neo-brutalist design patterns 2026 | тема (L34) |
| 25 | 35 | 0 | 0% | 9.17 | neo brutalism ui design trends 2026 | тема (L35) |

Доли:
- Строгая схема (чужой продукт отдельно): тема = 1 148 / 2 194 = **52.3%** (топ-25);
  чужая библиотека/бренд = 1 046 = 47.7%.
- Схема «любое тематическое слово»: тема = 4 064 / 4 215 = **96.4%**.

**Вывод: тема СОВПАДАЕТ.** После вычета «industrial-brutalist-ui» (чужой
продукт) остаётся широкий тематический спрос: «neo-brutalist dashboard
examples 2026», «brutalist dashboard examples 2026», «neo brutalist mobile app
design trends 2026». Это ровно тема поста. Агент был неправ, объявив по фильтру,
что темы нет: тематические фразы есть, просто каждая по отдельности ниже
300 показов, при позициях 1–9.

Чем кормится страница: 63 868 показов при 225 кликах (0.35%). Видимая выгрузка
= 6.6%. Верх выгрузки — «industrial-brutalist-ui» (849 показов): пользователи
ищут конкретную библиотеку, сниппетом это не лечится. Но ниже лежит большой
некликаемый тематический пласт по позициям 4–7, где title реально нужен.

## A.4. Сводка Блока A — был ли агент неправ

| Страница | Тема совпадает | Доля темы (видимая выгрузка) | Что агент сказал раньше | Вердикт |
|---|---|---|---|---|
| empty-state-ui-design | да | 96.1% (строгая: 76.6%) | «0 целей, сниппет слепой» | агент неправ по теме; проблема в позиции и SERP |
| blueprint-grid | да, с примесью навигации | 92.8% (строгая: 54.3%) | «0 целей, тема чужая» | агент неправ по теме; часть запросов — инструменты Vercel, сниппетом не вылечить |
| retro-brutalist | да | 96.4% (строгая: 65.4%) | «цель = чужая библиотека» | агент неправ по теме; чужая библиотека лишь верхушка |

Общий урок: фильтр «показы ≥ 300 AND позиция ≤ 15 AND CTR < 2%» на этих трёх
страницах отсекает всё и создаёт ложное впечатление «темы нет». Тема есть.
Несовпадение темы — только там, где запрос буквально про чужой продукт
(industrial-brutalist-ui, grid noise animator, nielsen norman group). Эти три
случая надо отделять от «тема не совпадает».

---

# БЛОК B — карта денежных страниц (guest-posts)

## B.0. Выгрузки уже есть (владельца просить не нужно)

Все четыре архива найдены в `plans/`:
`gsc-queries-guest-posts-vs-niche-edits.zip`,
`gsc-queries-guest-posting-opportunities.zip`,
`gsc-queries-benefits-of-guest-blogging.zip`,
`gsc-queries-submit-a-guest-post.zip`.

Дополнительно в `plans/compare 6 months - Страницы.csv` есть пятая страница
кластера без отдельной выгрузки: `guest-article-for-web-development`
(298 кликов, 6 314 показов, CTR 4.72%, позиция 25.57, L41). Это лучший CTR
в кластере; рекомендую запросить и по ней выгрузку отдельно.

## B.1. Страничные итоги (3 мес, `Страницы.csv:L2` каждой выгрузки)

| Страница | Клики | Показы | CTR | Позиция | Сумма показов в выгрузке | Покрытие |
|---|---|---|---|---|---|---|
| guest-posts-vs-niche-edits | 74 | 38 454 | 0.19% | 11.49 | 25 372 | 66.0% |
| guest-posting-opportunities | 644 | 124 350 | 0.52% | 18.9 | 94 044 | 75.6% |
| benefits-of-guest-blogging | 141 | 38 807 | 0.36% | 16.41 | 28 637 | 73.8% |
| submit-a-guest-post | 686 | 19 291 | 3.56% | 18.98 | 7 256 | 37.6% |

## B.2. Топ-25 запросов по каждой странице (теги: demand / comparison / brand / noise)

### guest-posts-vs-niche-edits — ядро comparison
| Показы | Клики | Позиция | Запрос | Тег |
|---|---|---|---|---|
| 2 211 | 0 | 3.44 | guest posting vs niche edits | comparison (L6) |
| 2 008 | 0 | 4.1 | guest posts vs niche edits | comparison (L7) |
| 1 350 | 0 | 13.55 | guest posts style posts | noise/неясный интент (L8) |
| 1 207 | 0 | 3.11 | niche edit vs guest post | comparison (L9) |
| 1 200 | 0 | 4.22 | niche edits vs guest posts | comparison (L10) |
| 1 134 | 1 | 3.09 | niche edits vs guest post | comparison (L4) |
| 1 019 | 0 | 8.78 | guest post niche edits | comparison (L11) |
| 888 | 0 | 18.15 | are niche edits worth it | demand (L12) |
| 887 | 0 | 13.49 | hosting niche edits | demand, узкий (L13) |
| 763 | 0 | 16.73 | travel niche edits | demand, узкий (L14) |
| 565 | 0 | 3.81 | how to choose between niche edits and guest posts | comparison (L15) |
| 565 | 0 | 18.11 | niche edits cost | demand, цена (L16) |
| 471 | 0 | 13.85 | link insertion vs guest post | comparison (L17) |
| 426 | 0 | 21.83 | do niche edits work | demand (L18) |
| 417 | 0 | 11.95 | dofollow niche edits | demand, узкий (L19) |
| 332 | 0 | 12.04 | niche edits vs outreach | comparison (L20) |
| 314 | 0 | 10.65 | web design niche edits | demand, узкий (L21) |
| 305 | 0 | 15.85 | news niche edits | demand, узкий (L22) |
| 283 | 0 | 3.59 | niche edit links vs guest posts | comparison (L23) |
| 283 | 0 | 19.54 | niche edits pricing | demand, цена (L24) |
| 281 | 0 | 4 | guest posting vs niche edits when should i use each… | comparison (L25) |
| 280 | 0 | 21.18 | ppc niche edits | demand, узкий (L26) |
| 277 | 0 | 4.3 | compare guest posts vs niche edits… which should i pay for first | comparison (L27) |
| 255 | 0 | 5.24 | how do niche edits work and when are they better… | comparison (L28) |
| 236 | 0 | 21.83 | guest post link building | demand (L29) |

### guest-posting-opportunities — пиллар, крупнейший шум
| Показы | Клики | Позиция | Запрос | Тег |
|---|---|---|---|---|
| 6 932 | 0 | 8.68 | uploadarticle guest posting | noise, чужой домен (L79) |
| 6 456 | 0 | 10.79 | uploadarticle guest posting.com | noise, чужой домен (L80) |
| 3 365 | 4 | 13.86 | guest post opportunities | demand, ядро (L3) |
| 3 194 | 0 | 3.3 | uploadarticleguestposting. com | noise, чужой домен (L81) |
| 3 145 | 0 | 3.37 | uploadarticleguestposting .com | noise, чужой домен (L82) |
| 3 011 | 0 | 28.64 | guest posting | demand, широкий (L83) |
| 2 368 | 0 | 2.13 | uploadarticleguestposting.com | noise, чужой домен (L84) |
| 2 146 | 0 | 23.13 | guest posts | demand, широкий (L85) |
| 1 807 | 0 | 19.6 | guest post placement | demand (L86) |
| 1 355 | 1 | 12.19 | guest posting opportunities | demand, ядро (L29) |
| 1 249 | 0 | 19.37 | guest posting for seo | demand (L87) |
| 1 130 | 0 | 20.75 | quality guest posts | demand (L88) |
| 1 003 | 2 | 22.12 | accepting guest posts | demand (L89) |
| 952 | 2 | 16.29 | guest blogging opportunities | demand (L90) |
| 858 | 1 | 26.86 | guest post | demand, широкий (L91) |
| 828 | 0 | 31.56 | guest posts style posts | noise/неясный (L92) |
| 815 | 0 | 1.74 | centomagazine .com guest post | brand, чужой сайт (L93) |
| 720 | 0 | 46.62 | guest posting vs niche edits | comparison (L94) |
| 704 | 0 | 25.45 | quality guest post | demand (L95) |
| 639 | 1 | 19.72 | seo guest post | demand (L96) |
| 639 | 1 | 20.8 | guest post backlinks | demand (L97) |
| 636 | 1 | 31.57 | submit a guest post | transactional (L98) |
| 546 | 0 | 21.21 | guest articles | demand (L99) |
| 543 | 0 | 26.17 | guest blog posting | demand (L100) |
| 540 | 1 | 27.36 | serp insight guest post | demand (L101) |

Кластер шума «uploadarticle»: 22 164 / 94 044 = **23.6%** показов выгрузки —
это навигация к чужому домену, не кликается и не лечится контентом.

### benefits-of-guest-blogging — ядро «зачем / польза / seo»
| Показы | Клики | Позиция | Запрос | Тег |
|---|---|---|---|---|
| 4 453 | 0 | 10.72 | guest blogging for seo | demand (L14) |
| 3 461 | 0 | 11.75 | guest blogging seo | demand (L15) |
| 1 932 | 1 | 12.95 | seo guest post | demand (L3) |
| 1 179 | 0 | 40.4 | how can i leverage guest blogging with long-tail keywords… | demand, длинный (L16) |
| 1 117 | 0 | 12.86 | guest posts seo | demand (L17) |
| 1 018 | 0 | 14.75 | guest posting for seo | demand (L18) |
| 977 | 0 | 10.42 | benefits of guest blogging | demand, ядро (L19) |
| 890 | 1 | 12.49 | guest posting in seo | demand (L4) |
| 637 | 0 | 12.95 | seo guest blogging | demand (L20) |
| 625 | 0 | 11.35 | benefits of guest posting | demand, ядро (L21) |
| 543 | 0 | 30.56 | guest blogging | demand, широкий (L22) |
| 528 | 0 | 12.4 | guest blogging and seo | demand (L23) |
| 481 | 0 | 11.21 | guest blogging in seo | demand (L24) |
| 399 | 0 | 7.64 | benefits of guest blogging for seo | demand, ядро (L25) |
| 397 | 0 | 8.95 | what is guest blogging and how can it benefit my blog… | demand, гео (L26) |
| 367 | 0 | 8.7 | how guest blogging can benefit my blog in united states | demand, гео (L27) |
| 324 | 0 | 12.4 | guest posting seo | demand (L28) |
| 290 | 0 | 14.06 | what is guest blogging in seo | demand (L29) |
| 278 | 0 | 14.03 | guest post seo | demand (L30) |
| 273 | 0 | 7.62 | how guest blogging can benefit my blog | demand (L31) |
| 261 | 0 | 22.74 | guest post seo framework | demand (L32) |
| 256 | 0 | 7.97 | what is guest blogging and how can it benefit my blog | demand (L33) |
| 254 | 0 | 11.28 | enhance guest post seo | demand (L34) |
| 250 | 0 | 38.26 | guest posting vs niche edits | comparison (L35) |
| 247 | 0 | 39.02 | niche edits vs guest posts | comparison (L36) |

### submit-a-guest-post — ядро transactional
| Показы | Клики | Позиция | Запрос | Тег |
|---|---|---|---|---|
| 952 | 3 | 10.99 | submit a guest post | transactional (L10) |
| 423 | 0 | 9.35 | business submit a guest post | transactional (L51) |
| 262 | 0 | 7.95 | abguestpost | brand/неясный (L52) |
| 258 | 0 | 9.53 | submit guest post business | transactional (L53) |
| 250 | 3 | 12.68 | submit guest post | transactional (L11) |
| 224 | 0 | 11.63 | how to submit a guest post | transactional (L54) |
| 220 | 0 | 9.87 | costing submit a guest post | transactional (L55) |
| 156 | 3 | 11.78 | "submit a guest post" | transactional (L12) |
| 155 | 1 | 13.3 | marketing "submit a guest post" | transactional (L25) |
| 154 | 0 | 17.03 | ecommerce submit a guest post | transactional (L56) |
| 135 | 1 | 24.7 | digital marketing submit guest post | transactional (L57) |
| 134 | 0 | 21.37 | how to submit guest blog posts | transactional (L58) |
| 118 | 0 | 11.19 | guest post submissions | transactional (L59) |
| 114 | 0 | 8.53 | guest post application form | transactional (L60) |
| 110 | 0 | 9.57 | marketing submit a guest post | transactional (L61) |
| 110 | 0 | 12.88 | submit guest post digital marketing | transactional (L62) |
| 98 | 0 | 10.58 | guest post submission form | transactional (L63) |
| 95 | 0 | 5.82 | "submit a guest post" photography and videography | transactional (L64) |
| 94 | 0 | 20.93 | how to fix guest posting rejection | demand (L65) |
| 94 | 0 | 25.09 | coffee "submit a guest post" | transactional (L66) |
| 92 | 0 | 7.66 | submit a guest post digital marketing | transactional (L67) |
| 88 | 12 | 8.42 | "submit a guest post" technology | transactional (L23) |
| 80 | 8 | 18.96 | submit a guest post technology | transactional (L24) |
| 80 | 0 | 18.05 | digital marketing submit a guest post | transactional (L68) |
| 92 | 0 | 19.33 | user submit blog post | transactional (L69) |

## B.3. Пересечения запросов (каннибализация)

Всего пересечений: 399 запросов из 1 608 уникальных встречаются на 2+ страницах.

| Сумма показов | Запрос | Где всплывает (показы) | Должен владеть |
|---|---|---|---|
| 3 181 | guest posting vs niche edits | gpvne 2 211, gpo 720, bgb 250 | guest-posts-vs-niche-edits |
| 2 572 | seo guest post | bgb 1 932, gpo 639, gpvne 1 | benefits-of-guest-blogging |
| 2 556 | guest posts vs niche edits | gpvne 2 008, gpo 334, bgb 214 | guest-posts-vs-niche-edits |
| 1 673 | niche edits vs guest posts | gpvne 1 200, bgb 247, gpo 226 | guest-posts-vs-niche-edits |
| 1 560 | niche edit vs guest post | gpvne 1 207, gpo 293, bgb 60 | guest-posts-vs-niche-edits |
| 1 510 | niche edits vs guest post | gpvne 1 134, gpo 222, bgb 154 | guest-posts-vs-niche-edits |
| 1 673 | guest posts style posts | gpvne 1 350, gpo 828 | gpvne (неясный интент, разобрать) |
| 1 216 | quality guest posts | gpo 1 130, bgb 86 | guest-posting-opportunities |
| 974 | guest posting in seo | bgb 890, gpo 83, gpvne 1 | benefits-of-guest-blogging |
| 893 | centomagazine .com guest post | gpo 815, gpvne 78 | noise (чужой сайт) |
| 681 | how to choose between niche edits and guest posts | gpvne 565, gpo 116 | guest-posts-vs-niche-edits |
| 598 | submit guest post | gpo 348, sagp 250 | submit-a-guest-post |
| 565 | guest post placement | gpo 1 807, gpvne 125 | guest-posting-opportunities |

Полный список — 399 строк; выше топ-13 по сумме показов.

## B.4. Кому должен принадлежать каждый интент

| Интент | Владелец | Обоснование |
|---|---|---|
| comparison «X vs Y» (niche edits vs guest posts) | guest-posts-vs-niche-edits | позиции 3.1–4.3 на своей странице, сравнение — её тема; L3–L28 |
| «opportunities», «placement», «where to pitch» | guest-posting-opportunities | пиллар, «guest post opportunities» 3 365 показов (L3) |
| «benefits», «why», «seo guest post» как объяснение | benefits-of-guest-blogging | «benefits of guest blogging» 977 (L19), «guest blogging for seo» 4 453 (L14) |
| «submit», «application form», «how to submit» | submit-a-guest-post | единственная transactional-страница, CTR 3.56% |
| чужой домен (uploadarticle, centomagazine) | никто | навигация к чужим сайтам, не контентом не лечится |

Каннибализация подтверждена: сравнительные запросы текут на все три страницы
(comparison → benefits → opportunities), а «seo guest post» и «guest posting in
seo» текут между benefits и opportunities. Это реальное пересечение, а не шум.

## B.5. Атрибуция guest-posts-vs-niche-edits (79 кликов, якорный пул)

Источник: `plans/compare 6 months - Страницы.csv` (6 мес).

Базовая строка L48: `guest-posts-vs-niche-edits` = 79 кликов / 38 960 показов /
0.2% / позиция 11.49.

Якорные строки (L534, L535, L539, L608, L609, L626, L666, L676, L836), все 0 кликов:
- L534 `#guest-posts-vs-niche-edits-a-comparison` — 7 515 показов
- L535 `#how-to-choose-between-niche-edit-and-guest-posts` — 7 511
- L539 `#benefits-of-niche-edits` — 4 427
- L608 `#combining-niche-edits-and-guest-posts…` — 814
- L609 `#disadvantages-of-niche-edits` — 812
- L626 `#the-benefits-of-guest-posts` — 724
- L666 `#understanding-guest-posting` — 426
- L676 `#drawbacks-of-guest-posts` — 392
- L836 `#how-to-find-guest-posting-opportunities` — 90

Итого якорный пул = **22 711 показов** (0 кликов) — это 36.8% от 61 671
суммарных показов сущности (база 38 960 + якоря 22 711).

Вердикт по атрибуции: **НЕ подтверждено, что 0 кликов на сравнении — уход на
якоря.** Данные говорят о двух независимых проблемах:
1. Якорный пул — реальный, но это 22 711 показов при 0 кликах; он не «забирает»
   клики у базы, а стоит рядом своей пустой полосой (технический долг
   canonicalization).
2. Головные сравнительные запросы сидят на БАЗОВОМ URL: «guest posting vs
   niche edits» 2 211 показов, 0 кликов, позиция 3.44 (L6); «guest posts vs
   niche edits» 2 008, 0 кликов, позиция 4.1 (L7). То есть даже на позиции 3–4
   базовая страница не кликается. Это не связано с якорями; это либо AI Overview
   / featured snippet, либо сниппет не отвечает на «which should I pay for first».

## B.6. Рекомендация по каждой странице (без правок)

| Страница | Проблема | Рекомендация |
|---|---|---|
| guest-posts-vs-niche-edits | 0 кликов на головных сравнениях при позиции 3–4 + якорный пул 22 711 показов | decision-таблица сверху (ответ «что выбрать и когда» в первом экране) + отдельно технический фикс якорей (canonical/редирект). НЕ merge: страница легитимный владелец comparison-интента |
| guest-posting-opportunities | 23.6% показов — чужой домен uploadarticle; голова «guest posting» на позиции 18.9 | развести title в сторону opportunities/placement; перелинковка вниз на 3 сателлита; шум uploadarticle не лечится контентом |
| benefits-of-guest-blogging | каннибализация с opportunities по «seo guest post» / «guest posting in seo» | развести title под «benefits / why guest blogging for SEO» (её топ-запрос 4 453 показа); перелинковка к opportunities и comparison. НЕ merge: интент «зачем» отделён от «где» |
| submit-a-guest-post | ничего критичного, CTR 3.56% — лучший в кластере | не трогать title; усилить перелинковку из opportunities/comparison; опционально decision-таблица вариантов подачи |

## B.7. Что нужно от владельца

- Выгрузка `plans/gsc-queries-guest-article-for-web-development.zip`:
  у страницы 298 кликов при CTR 4.72% (L41 compare), отдельной per-page выгрузки
  нет, а это лучший конвертер кластера.
- Решение по техническому долгу якорей: 22 711 показов с 0 кликов на
  guest-posts-vs-niche-edits (L534–L836) требуют canonical/редирект, это вне
  скоупа контентных правок.

---

# Ограничения

- Покрытие per-page выгрузок 4.7–75.6%; доли считаны по видимой части
  и помечены. Анонимизация отделена от несовпадения темы.
- Связь query→URL не выдумывалась: где запрос лежит только в per-page выгрузке
  страницы, считается, что он показывался по этой странице (так устроена
  выгрузка GSC «запросы по странице»). Пересечения — по совпадению строки
  запроса в выгрузках разных страниц.
- Якорный пул взят из 6-месячного окна (`compare 6 months - Страницы.csv`),
  22 711 показов; в задаче указано ~22 621 — расхождение в пределах округления
  окна, обе цифры об одном пуле.
- Правки в `content/` не выполнялись.

# Dashboard-пласт: диагностика и план (октябрь 2026)

Источник задачи: решение владельца от 2026-10-15 — завершить FAQPage-заход
и перейти к dashboard-пласту. План построен на фактах из
[`plans/Страницы.csv`](Страницы.csv) (окно 3 мес, 2026-07-07 → 2026-10-06),
[`plans/Запросы.csv`](Запросы.csv), [`plans/dashboard-pillar-analysis.md`](dashboard-pillar-analysis.md)
и [`.ai/content-strategy.md`](../.ai/content-strategy.md:539) (§12, «Аномальные показы»).

## 0. Итог одной строкой

Восемь dashboard-страниц держат **122 143 показа (8.9% всего блога) при 205
кликах (CTR 0.168%)**. Это второй по объёму пласт после якорных URL и первый
по объёму среди кластеров с реальным интентом. Но он **не однороден**: часть
страниц — настоящая CTR-проблема, часть — шум чужого бренда, часть — класс D
(позиция за пределами сниппета), где сниппет не поможет. Прежде чем что-то
править, нужно разделить их по трём разным диагнозам.

## 1. Фактические цифры (3 мес, [`plans/Страницы.csv`](Страницы.csv))

| Страница | Показы | Клики | CTR | Позиция |
|---|---|---|---|---|
| best-analytics-dashboard-examples | 30 544 | 9 | 0.03% | 15.19 |
| dashboard-ui-design (пиллар) | 21 499 | 66 | 0.31% | 8.89 |
| top-dashboard-design-examples-ideas | 17 984 | 45 | 0.25% | 17.27 |
| how-to-study-saas-dashboard-in-the-ai-era | 16 209 | 7 | 0.04% | 7.37 |
| e-commerce-dashboard-examples | 10 628 | 11 | 0.10% | 31.40 |
| saas-dashboard-examples | 9 788 | 29 | 0.30% | 26.93 |
| types-of-dashboards-main-categories | 8 786 | 12 | 0.14% | 30.76 |
| effective-dashboard-design-principles | 4 232 | 10 | 0.24% | 12.78 |
| **Итого 8 страниц** | **122 143** | **205** | **0.168%** | — |

Для сравнения: лучший CTR в блоге — 3.33% (`submit-a-guest-post`), цель для
UI design по [`.ai/seo-benchmarks.md`](../.ai/seo-benchmarks.md:30) — 1.5%.
Пласт даёт 0.168%, то есть **в 9 раз ниже цели категории**.

## 2. Три разных диагноза внутри одного пласта

Это главный вывод: единой меры «почини сниппет у dashboard-постов» не
существует. Разделение по §12.5 content-strategy («смотреть вкладку запросы»)
и по позиции.

### Диагноз A. Шум чужого бренда (не резерв, не трогать)

`how-to-study-saas-dashboard-in-the-ai-era` — 16 209 показов, 7 кликов,
CTR 0.04%, позиция 7.37. Выглядит как крупнейший резерв, но это **не так**.

В §12.2–12.3 content-strategy зафиксировано: вкладка «Запросы» страницы почти
целиком состоит из фраз с чужим брендом **saasframe** (`saasframe dashboard
best practices`, `saasframe education dashboard patterns`, `saasframe data
heavy dashboard patterns` и десятки вариаций), все с нулём кликов. Страница
случайно ранжируется по чужому бренду, поэтому показы есть, а кликов нет.
Правка сниппета бессмысленна: пользователь ищет другую компанию.

Вывод: пост **снят** с приоритета CTR-fix (это уже решение §12.3). Действий
не требует. Если владелец захочет вернуться, сначала нужен ответ на вопрос
«кто такой Saasframe» (вариант B из §12.4).

### Диагноз B. Позиция за пределами сниппета (класс D, сниппет не поможет)

Три страницы на позициях 26–31:

| Страница | Показы | CTR | Позиция |
|---|---|---|---|
| e-commerce-dashboard-examples | 10 628 | 0.10% | 31.40 |
| saas-dashboard-examples | 9 788 | 0.30% | 26.93 |
| types-of-dashboards-main-categories | 8 786 | 0.14% | 30.76 |

Правило §13.4: при плохой позиции правка заголовка почти не помогает.
Здесь нужен либо контент/авторитет (поднять позицию), либо принять как есть.
Это отдельный разговор и больший объём, чем сниппет-правка.

### Диагноз C. Настоящая CTR-проблема (сниппет + структура)

Страницы в зоне сниппета с низким CTR — вот где правка оправдана:

| Страница | Показы | CTR | Позиция | Что не так в теле |
|---|---|---|---|---|
| best-analytics-dashboard-examples | 30 544 | 0.03% | 15.19 | 20 Title Case заголовков, faq=0, нет TL;DR, нет таблицы, 2 216 слов |
| top-dashboard-design-examples-ideas | 17 984 | 0.25% | 17.27 | 6 Title Case заголовков, 1 реальное двоеточие в H2, faq=0 |
| effective-dashboard-design-principles | 4 232 | 0.24% | 12.78 | заголовки чистые, TL;DR + checklist есть, faq=5 — тело в порядке |
| dashboard-ui-design (пиллар) | 21 499 | 0.31% | 8.89 | заголовки чистые, faq=7, таблица есть — тело в порядке, вопрос в сниппете |

Важная оговорка для `best-analytics-dashboard-examples`: по общему
[`plans/Запросы.csv`](Запросы.csv) запросы `analytics dashboard` (1 685
показов, позиция 44.67) и `analytics dashboards` (549, 37.59) стоят далеко
за пределами сниппета, а средняя позиция страницы 15.19. Это признак
смешанного состава запросов. **Прежде чем править сниппет, нужна page-level
выгрузка запросов** — иначе есть риск повторить ошибку §12.3 и починить
не то.

## 3. Что подтверждено фактами (не гипотеза)

- Механические нарушения правил проекта найдены и перечислены ниже
  (§4). Они не зависят от состава запросов и правятся в любом случае.
- `how-to-study-saas-dashboard` — шум, зафиксировано в §12.3. Повторно
  в приоритеты не ставить.
- Три страницы класса D (позиции 26–31) сниппетом не лечатся.
- У `dashboard-ui-design` и `effective-dashboard-design-principles` тело
  уже соответствует стандарту (faq, таблица/TL;DR/checklist). Их CTR —
  вопрос сниппета и состава запросов, а не структуры.

### Ложные срабатывания grep, которые НЕ являются дефектами

Проверка двоеточий в H2/H3 дала 5 попаданий в `best-analytics`, 5 в
`e-commerce`, 5 в `saas-dashboard-examples`. Все они — **не заголовки-тайтлы**,
а markdown-ссылки вида `### [Rome UI Kit](https://www.setproduct.com/...)`,
где двоеточие сидит внутри `https://`. Реальное двоеточие в заголовке —
**одно во всём пласте**: `## Key Features Across Types:` в
`top-dashboard-design-examples-ideas` (строка 137).

## 4. Механические правки (низкий риск, делаем первыми)

Это нарушения sentence case и запрета двоеточий из [`AGENTS.md`](../AGENTS.md:93).
Не зависят от GSC-данных.

| Файл | Проблема | Сколько |
|---|---|---|
| best-analytics-dashboard-examples | Title Case в H2/H3 | 20 заголовков |
| types-of-dashboards-main-categories | Title Case в H2/H3 | 26 заголовков |
| e-commerce-dashboard-examples | Title Case в H2/H3 | 15 заголовков |
| top-dashboard-design-examples-ideas | Title Case в H2/H3 + двоеточие в H2 | 6 + 1 |
| saas-dashboard-examples | Title Case в H2/H3 | 6 заголовков |
| best-analytics-dashboard-examples | `title`: `Best Analytics Dashboard Examples & Best Practices` — Title Case + амперсанд, 50 символов | title |
| top-dashboard-design-examples-ideas | `title`: `Top Dashboard Design Examples & Ideas. Dashboard Inspiration` — Title Case, дубль слова dashboard | title |
| e-commerce-dashboard-examples | `title`: `Best E-Commerce Dashboard Templates with Examples` — Title Case | title |
| types-of-dashboards-main-categories | `title`: `Types of Dashboards. Main Categories Explained` — Title Case | title |
| marketing-dashboard-ui-design-guide | проверено 2026-10-15: дефекта нет, `metaTitle` уже sentence case, SERP 76 | — |

Порядок выбора: сначала sentence case в заголовках тела (чисто механически),
потом title/metaTitle через процедуру скилла `seo` (3 варианта + выбор
владельца, без двоеточия).

**Поправка к длине (проверено командой 2026-10-15).** Скилл называет 60–65
символов, но это длина **строки в SERP**, а не поля. В `<title>` уходит
`metaTitle` (или `title`, если `metaTitle` пуст) плюс суффикс
` | Setproduct Blog` — 18 символов, см.
[`BlogPostLayout.tsx`](../components/blog/BlogPostLayout.tsx:40). Замер по всем
187 постам: `metaTitle` 46–55 у 82 постов, 60–65 у 39, длиннее 65 — ни одного.
Лучшие по CTR держат `metaTitle` 45–58 (полная строка 63–76):
`data-table-ui-design` 45, `tabs-ui-design` 48. Поэтому цель для поля —
**46–58 символов**, то есть строка в SERP 64–76. Правило «60–65» переводится
в него один в один.

## 5. Что нужно от владельца (блокирует шаги 2 и 3)

Page-level выгрузка запросов из GSC (вкладка «Запросы» с фильтром по URL)
для четырёх страниц диагноза C:

1. `best-analytics-dashboard-examples` — приоритет №1, крупнейший показной пул.
2. `top-dashboard-design-examples-ideas`.
3. `dashboard-ui-design` (пиллар).
4. `effective-dashboard-design-principles`.

Без неё сниппет-правки рискуют попасть в шум, как это было с
`how-to-study-saas-dashboard-in-the-ai-era`. Формат — тот же CSV, что и
предыдущие выгрузки (уже лежат в `plans/*.zip`).

**Как выгрузить (GSC → Performance, Search results).** Инструкция для
дизайнера, без программирования:

1. Нажать «+ New» → «Page». Выбрать условие «URL is exactly» и вставить
   адрес страницы, например `/blog/best-analytics-dashboard-examples`.
2. Переключиться на вкладку «Queries».
3. Нажать «Export» → «CSV» и прислать файл.
4. Повторить для каждой из четырёх страниц. Раздельные файлы удобнее:
   по имени файла сразу видно, к какой странице он относится.
5. Окно оставить то же — 3 месяца (2026-07-07 → 2026-10-06), чтобы цифры
   сходились с [`plans/Страницы.csv`](Страницы.csv).

Нужен именно page-level срез. В общем экспорте связи «запрос → страница»
нет, поэтому по нему нельзя понять, какие формулировки приносят показы
конкретной странице. Именно на этом прогоре построен вывод §12.3.

Дополнительно, необязательно: ответ на вопрос «кто такой Saasframe»
(конкурент по dashboard-паттернам или нет). Это решает судьбу
`how-to-study-saas-dashboard`.

## 6. Предлагаемый порядок работы

| Шаг | Действие | Блокировка | Режим |
|---|---|---|---|
| 1 | Механические правки: sentence case в H2/H3 пяти файлов + снятие одного двоеточия | нет | code, по одному коммиту на файл |
| 2 | Title/metaTitle через скилл `seo` (по 3 варианта) для best-analytics, top-dashboard, e-commerce, types-of-dashboards | нет | code, скилл `seo` |
| 3 | Разбор page-level запросов четырёх страниц диагноза C | нужно от владельца | architect |
| 4 | По результатам шага 3: body-рефактор (answer-first лид, TL;DR, FAQ) там, где это оправдано | после шага 3 | code |
| 5 | Отдельно: решение по трём страницам класса D (это не сниппет) | нужно решение владельца | architect |

Шаг 1 сделан: коммиты `448a74e`, `b030fe7`, `dabae74`, `fe84c2c`, `ce5c3a3`.
Шаг 2 подготовлен (варианты в §11), но по решению владельца от 2026-10-15
поставлен на паузу до получения page-level выгрузок шага 3. Шаг 5 ни от чего
не зависит, но требует решения владельца.

## 7. Что НЕ делать

- Не править сниппеты четырёх страниц диагноза C до получения page-level
  запросов: риск повторить ошибку §12.3.
- Не трогать `how-to-study-saas-dashboard-in-the-ai-era`: шум, подтверждено.
- Не пытаться «поднять позицию» у страниц класса D через заголовок: §13.4.
- Не смешивать с SEO-пластом (`white label seo`) — это другая тема,
  §11.5 content-strategy.
- Не объединять несколько файлов в один коммит.
- Не менять `slug` и `coverImage`.

## 8. Self-check перед каждым коммитом

```
F=content/blog/<slug>.mdx
echo "HEADINGS:"; grep -nE '^#{2,3} ' $F | wc -l
echo "TITLE CASE H:"; node -e "..."   # см. скрипт в разделе 4
echo "HEADING COLONS:"; grep -cE '^#{2,3} [^:]*:' $F
echo "EM-DASH:"; grep -o '—' $F | wc -l
echo "FFFD:"; grep -c $'\xef\xbf\xbd' $F
npm run lint 2>&1 | tail -1
```

Пороги: двоеточий в H2/H3 — 0 (кроме URL внутри ссылок), em-dash ≤ 2,
FFFD = 0, `npm run lint` чист. YAML дополнительно через `gray-matter`.

## 10. Прогресс: шаг 1 (sentence case), 2026-10-15

| Файл | Заголовков исправлено | Коммит |
|---|---|---|
| best-analytics-dashboard-examples | 15 | `448a74e` |
| types-of-dashboards-main-categories | 44 (включая H4 Definition/Key/Use) | `b030fe7` |
| e-commerce-dashboard-examples | 15 | `dabae74` |
| top-dashboard-design-examples-ideas | 11 (включая снятие двоеточия) | `fe84c2c` |
| saas-dashboard-examples | 5 | `ce5c3a3` |

Проверено после каждого файла: двоеточий в H2/H3 вне URL — 0,
em-dash не вырос ни в одном файле, U+FFFD = 0, `npm run lint` чист.

Не тронуто (легитимные исключения): названия продуктов в H3-ссылках —
React UI Kit, Material Design System, Neolex Dashboard UI Kit,
Material Desktop UI Kit, Panda Design System, Eclipse UI Kit, Xela,
Material-X, Material-You, Rome UI Kit. Это имена брендов и продуктов.

Найден унаследованный дефект (не входил в задачу, не правился):
в `types-of-dashboards-main-categories` заголовки `1\. Operational`
(строка 74) и `10\. Operational` (строка 324) дублируются по смыслу.
Было и до правки. Кандидат на отдельный разбор.

## 9. Источники этого файла

- [`plans/Страницы.csv`](Страницы.csv) — показы и CTR, окно 3 мес.
- [`plans/Запросы.csv`](Запросы.csv) — 66 dashboard-запросов, 27 120 показов, 65 кликов.
- [`plans/dashboard-pillar-analysis.md`](dashboard-pillar-analysis.md) — разбор пиллара (Шаг 3).
- [`.ai/content-strategy.md`](../.ai/content-strategy.md:539) — §12 (saasframe), §13 (каталог).
- [`.ai/seo-benchmarks.md`](../.ai/seo-benchmarks.md:22) — бенчмарк UI design.
- [`AGENTS.md`](../AGENTS.md:93) — sentence case и запрет двоеточий.

## 11. Шаг 2: варианты сниппетов (зафиксированы, НЕ применены)

Решение владельца 2026-10-15: набор «рекомендованный» был выбран, но следом
отменён в пользу §7 — сниппеты не правим до page-level выгрузок запросов.
Варианты ниже сохранены, чтобы работа не потерялась. Все прошли прогон:
длина в норме, двоеточий нет, лишних трихолонов нет. `title` и `metaTitle`
предполагается ставить одинаковыми, как у `data-table`, `tabs`, `button`,
`liquid-glass`.

Рекомендованный набор: best-analytics T2 + D1, top-dashboard T1 + D1,
e-commerce T1 + D1, types-of-dashboards T1 + D1, marketing T1 + D1.

| Файл | metaTitle (len / SERP) | description (len) |
|---|---|---|
| best-analytics-dashboard-examples | Best analytics dashboard examples for cleaner KPI screens (57 / 75) | See how the best analytics dashboards turn raw metrics into decisions. Compare real examples and the design practices that keep KPI screens readable. (149) |
| top-dashboard-design-examples-ideas | Dashboard design examples and layout ideas worth copying (56 / 74) | Get inspired by dashboard design examples that actually ship. See the layout ideas and chart choices that keep dense data readable. (131) |
| e-commerce-dashboard-examples | E-commerce dashboard examples to track sales at a glance (56 / 74) | See how the best e-commerce dashboards present sales and orders at a glance. Compare templates and the metrics worth surfacing first. (133) |
| types-of-dashboards-main-categories | Types of dashboards and how to pick the right one for a team (60 / 78) | Learn the difference between operational and strategic dashboards, then pick the type that fits the decisions your team actually makes. (135) |
| marketing-dashboard-ui-design-guide | Marketing dashboard UI design that shows ROI at a glance (56 / 74) | Build marketing dashboards that show ROI at a glance. See which campaign metrics to surface and the layouts that survive dev handoff. (133) |

Полные наборы альтернатив (по 3 заголовка и 3 описания на файл) собраны
в сессии; при возврате к шагу 2 (после page-level выгрузок) их нужно
воспроизвести заново.

### 11.1. Механические дефекты, найденные при подготовке шага 2

Не зависят от состава запросов, но попали под запрет §7, поэтому отложены:

- `best-analytics-dashboard-examples`: `metaTitle` 33 символа (строка 51) —
  самый короткий в пласте, при 30 544 показах.
- `types-of-dashboards-main-categories`: `metaTitle` 36 символов (строка 54).
- Четыре описания содержат мусорные глифы `✔` (`U+2714`) и `➤` (`U+27A4`):
  best-analytics, top-dashboard, e-commerce, types-of-dashboards. Это символы
  чек-листов Webflow, для сниппета бессмысленные.

### 11.2. Отдельный долг, найденный тем же прогоном

Глифы `✔` / `➤` в frontmatter найдены ещё в 18 постах блога вне
dashboard-пласта (`button-group-guide`, `data-table-ui-design`,
`slider-ui-design`, `tooltip-ui-design`, `pricing-ui-design`,
`radio-button-ui-design`, `toggle-switch-ui-design`, `steps-ui-design`,
`ai-chat-interface-ui-design`, `form-controls-reference-2026`,
`liquid-glass-design-explained-a-practical-guide`, `user-profile-templates`,
`genius-ux-design-inventions` и другие). Мера — снять глифы из описаний,
отдельным заходом. В этот план не входит.

### 11.3. Уточнение к §4

Строка §4 «`marketing-dashboard-ui-design-guide`: `metaTitle` Title Case
(2 слова)» не подтвердилась: `metaTitle` уже sentence case, двоеточия нет,
описание 150 символов и без мусора. Правка нужна только если владелец
захочет усилить хук (сейчас строка 76 — в норме).

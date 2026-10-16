# Content strategy — Setproduct blog

**Последнее обновление:** октябрь 2026 (после Wave 1; добавлен раздел 16 про white label пиллар и два сателлита)
**Источники данных:** GSC (6-мес сравнение и 3-мес детали к 2026-10-06), GA4 (2026-07-12 → 2026-10-09), on-site search, Ahrefs keyword history
**Применять при:** написании нового поста, обновлении существующего, планировании контент-волн, обсуждении приоритетов

## 1. Базовые метрики

### Текущие показатели (GSC, октябрь 2026) — после Wave 1
- Всего кликов: 18,711 (было 13,205 в предыдущем 6-мес окне, около +42%)
- Всего показов: 3,300,641 (было 2,715,799, около +21%)
- Средний CTR: 0.6% (целевой бенчмарк индустрии: 2-3%)
- Средняя позиция: 11.9 (было 14.0, улучшение на 2.1)
- Детали, разбивки и вердикт по Wave 1: `.ai/seo-baseline-2026-10-10.md`

### Майский снимок (исторический, до Wave 1)
- Всего кликов: 13,800
- Всего показов: 3,280,000
- Средний CTR: 0.4%
- Средняя позиция: 13.4 (большая часть на странице 2 Google)

### Самый успешный пост (GA4, октябрь 2026)
- /blog/data-table-ui-design — 2,783 просмотра, CTR 1.37% в GSC, лучший CTR в UI design
- /blog/liquid-glass-vs-glassmorphism — 2,373 просмотра, CTR 1.81% в GSC, лучший CTR в Design trends
- /freebies/m3e-canvas — 3,004 просмотра (продуктовая страница, не блог)

### Самый успешный пост (GA4, майский снимок — исторический)
- /blog/liquid-glass-design-explained-a-practical-guide
- 8,259 просмотров, 5,690 активных пользователей
- 36 секунд engagement

### Эталон-бенчмарк качественного контента
- /blog/steps-ui-design
- CTR в GSC: 1.06% (лучший среди UI guide постов)
- Engagement в GA4: 21 секунда
- Формула: живой голос автора, FAQ-блок в конце, чек-лист "before you ship", отсутствие выдуманной статистики

### Антибенчмарк
- /blog/dashboard-design-best-practices-top-dashboard-ui-design-tips
- CTR в GSC: 0.022% (катастрофа)
- URL длиной 64 символа с двойным keyword stuffing
- Слабый title/description делают пост невидимым в SERP

## 2. Стратегические принципы из данных

### Validated: companion-post методология работает

Первый пост по обновлённой методологии — liquid-glass-vs-glassmorphism (опубликован 9 июня 2026). Подтверждает:
- Answer-first структура с TL;DR на 5 строк
- Сравнительная таблица 11×5 как центральный SEO-актив
- FAQ из 8 вопросов с самодостаточными ответами
- Голос автора в closing thoughts вместо нейтральной энциклопедии
- 6 внутренних ссылок + интеграция с собственным Gumroad-продуктом
- Только первичные источники в outbound links (WCAG, Apple HIG, Microsoft Fluent)
- Конкретные alt-тексты для каждой картинки

Эта формула должна применяться ко всем новым постам в Tier 1.

### Принцип 1. Большая часть трафика идёт не из Google
Сравнение GSC и GA4 показывает: 50-95% трафика на популярные посты идёт из источников помимо Google поиска. Главные каналы: прямые заходы, рефералы, социалки, AI-инструменты (Claude/ChatGPT/Perplexity), newsletters. SEO — лишь один из каналов.

Следствие: оптимизация под AI-инструменты и social shareability — не теория, а реальный канал, который уже работает.

### Принцип 2. Liquid glass паттерн подтверждён тройной валидацией
- GA4: пост #1 по просмотрам (8,259)
- On-site search: 28 поисков по теме (8% от всех запросов)
- Качественный сигнал: пост опубликован в нужный момент тренда (после WWDC 2025)

Формула: trendy + practical + first-mover. Применять серийно.

### Принцип 3. Foundation tutorial — главный конвертер в продукты
- /blog/how-to-design-a-ui-kit-foundation — 2,482 просмотра, 40 секунд engagement
- Top-of-funnel контент: designers читают → покупают UI kits
- Серийный потенциал: "How to design a SaaS dashboard foundation", "How to design an AI app foundation"

### Принцип 4. Короткие opinionated посты конвертят рекордно
- /blog/strikethrough-text-deserves-more-love-in-ui — 44 просмотра, 9 key events = 20% конверсия
- /blog/guest-article-for-web-development — 99 просмотров, 7%
- Узкая ниша + сильное мнение + один CTA = мотивированный читатель идёт в продукт

### Принцип 5. Visual-decision контент конвертит без engagement
- /blog/pricing-ui-design — 6 секунд engagement, но 7.8% конверсия в key events
- Пользователь приходит смотреть примеры, кликает CTA, уходит. Низкий engagement здесь — это норма, не проблема.

### Принцип 6. Content cannibalization — реальная проблема
До pillar page для дашбордов: 8 постов про дашборды конкурировали друг с другом. После создания pillar page — трафик пошёл, методология подтверждена.

Применить тот же подход к другим темам.

### Принцип 7. Steps post — формула качественного UI guide
Из всех 26+ постов про UI компоненты Steps имеет лучший CTR (1.06% против среднего 0.4%). Отличия:
- Живой авторский голос ("Done poorly, it confuses. Done well, it leads"; "Clarity beats speed")
- FAQ-блок в конце (5-6 вопросов и ответов)
- Чек-лист "before you ship"
- Никаких выдуманных статистик
- Чёткая структура заголовков

Это эталон. Применять к новым постам и к refactor'у старых.

### Принцип 8. Liquid glass cluster — топ-1 интент аудитории
- 28 поисков из 356 (8%) — liquid glass + glass + liquid
- Аудитория активно ждёт продолжения

### Принцип 9. Retro/brutalist — uncovered high-intent ниша
- 11 поисков (3.1%): retro (5), brutalism (3), RETRO OS UI (3)
- Ноль контента в блоге
- Ноль канонических гайдов в индустрии
- Восходящий тренд 2025-2026
- Идеальная "вторая liquid glass" возможность

### Принцип 10. "Design like X" — востребованный формат
- "notion style ui" (3), "airbnb" (3) в on-site search
- Запрос на практические гайды "как делать в стиле известного продукта"
- Идеален для AI-цитирования

### Принцип 11. AI как поисковый запрос — недооценён на сайте
Только 2 поиска по "AI" на сайте, при том что AI-related посты получают сотни просмотров (Venice 681, Claude 480). Вывод: AI-аудитория приходит через Google и AI-tools, не через on-site discoverability. AI-content стратегия должна фокусироваться на внешнем SEO и AI-tool цитировании.

### Принцип 12. Мобильный поиск сломан (UX, не контент)
353 desktop / 2 mobile поисков. Мобильный поиск явно спрятан или неудобен. Это вопрос для Волны 6 (UX improvements), а не для контент-волн.

### Принцип 13. Wave 1 дал смешанный результат на уровне постов (октябрь 2026)
Итоги сайта выросли (клики около +42%, позиция 14.0 → 11.9), но не все 15 оптимизированных постов выиграли. tabs-ui-design вырос (771 → 1 211), а notifications-ui-design (679 → 235), dropdown-ui-design (628 → 472) и button-ui-design (233 → 71) упали.

Следствие: перед новым батчем правок title/description нужен построчный замер по каждому посту, а не общий вывод «волна сработала». Правку заголовков больше не делать вслепую пачкой.

### Принцип 14. Мобильный CTR — главный выигрыш периода
Мобильный CTR вырос с 0.31% до 0.88% (почти втрое), клики с 1 720 до 3 256. Мобильный трафик становится реальным, но показы на планшетах обвалились (39 305 → 7 198).

Следствие: мобильные сниппеты работают, и это стоит закреплять. Одновременно проверить, что не сломалось на планшетах.

### Принцип 15. Якорные URL — крупнейший неиспользованный пул показов
Google индексирует якоря внутри статей как отдельные URL. `/blog/tabs-ui-design#tabs-theming` — 15 819 показов и ноль кликов, тот же паттерн у десятков якорей (steps, why-landing-page, guest-posts, claymorphism, notifications, checkbox и др.).

Следствие: это техническая задача (canonical или консолидация фрагментов), а не контентная. Потенциал больше, чем у любого нового поста.

### Принцип 16. AI-каналы конвертят в разы лучше Google
GA4: chatgpt, gemini, claude, perplexity и другие AI-ассистенты вместе дают больше 1 700 сеансов, а доля ключевых событий у них примерно в пять раз выше, чем у google/organic (0.028 у ChatGPT против 0.006 у Google). Venice referral — 0.1667.

Следствие: правила раздела 4 (answer-first, проверяемая конкретика, сравнимые таблицы, первоисточники) — не теория, а подтверждённый канал. Их нужно применять по умолчанию.

## 3. Контент-паттерны (формулы, которые работают)

### Pattern A — Trend deep-guide
- **Длина:** 2000-3000 слов
- **Структура:** TL;DR → context → 3-4 sub-aesthetics/styles → comparison table → examples gallery → decision framework → implementation → FAQ → opinion-closing
- **Когда применять:** новый design trend появляется (Apple/Google/Microsoft анонс, новый Awwwards winner pattern, viral aesthetic из социалок)
- **ROI:** очень высокий при правильном тайминге (4-8 недель после появления тренда)
- **Риск:** короткий lifespan если тренд умирает
- **Эталон:** liquid-glass-design-explained-a-practical-guide

### Pattern B — Foundation tutorial
- **Длина:** 2000-3000 слов
- **Структура:** definition → why it matters → step-by-step framework → real examples → common mistakes → conclusion
- **Когда применять:** для core тем дизайн-системы (UI kit, dashboard, design tokens, design system)
- **ROI:** высокий, evergreen, прямая конверсия в UI kits
- **Эталон:** how-to-design-a-ui-kit-foundation

### Pattern C — Niche opinion-short
- **Длина:** 600-900 слов
- **Структура:** strong opinion lead → 3-4 supporting points → one specific recommendation → single CTA
- **Когда применять:** есть конкретное мнение об узкой UI-детали, можно написать за 1-2 часа
- **ROI:** низкий трафик per post, но 7-20% конверсия + хорошо цитируется AI-tools
- **Эталон:** strikethrough-text-deserves-more-love-in-ui

### Pattern D — Visual-decision
- **Длина:** 1500-2000 слов
- **Структура:** intro → 10-20 examples с короткими подписями → comparison table → quick decision guide
- **Когда применять:** для тем "examples of X", "best X gallery"
- **ROI:** высокий conversion despite низкого engagement
- **Эталон:** pricing-ui-design

### Pattern E — Component-anatomy (существующий шаблон)
- **Длина:** 2000-3500 слов
- **Структура:** intro → anatomy → types → states → theming → use cases → UX tips → (опционально) FAQ + checklist
- **Когда применять:** для новых component-guide постов
- **ROI:** baseline SEO traffic, ниже engagement чем другие паттерны
- **Статус:** 26+ постов уже написано, фокус — оптимизация не создание новых (за исключением подтверждённых пробелов)
- **Эталон качества:** steps-ui-design

## 4. Правила для AI-tool трафика

AI-инструменты (Claude, ChatGPT, Perplexity, Google AI Overviews) становятся всё более значимым источником трафика. Чтобы быть процитированным:

### 4.1. Answer-first структура
- Первый параграф под H1 = прямой ответ на главный вопрос (40-80 слов)
- Первый параграф под каждым H2 = прямой ответ на подвопрос
- НИКАКИХ "Welcome to this guide", "Let's dive in" — сразу ценность

### 4.2. Проверяемая конкретика
- ❌ "58% reduction in support tickets" без источника
- ❌ "Spring physics (damping: 0.7, stiffness: 150)" out-of-context
- ✅ "WCAG 2.2 requires 44×44px minimum touch target"
- ✅ "Material Design 3 specifies dialog max-width as 560dp"

Это критично — AI-инструменты сверяют факты с другими источниками и исключают сайты с выдуманной статистикой из цитирования.

### 4.3. Сравнительные таблицы
В каждом новом посте обязательна минимум одна comparison-таблица (X vs Y vs Z, when to use what). AI-tools цитируют таблицы целиком.

### 4.4. FAQ schema
- FAQ-блок в конце каждого нового поста (5-7 Q&A)
- В будущем — генерация FAQPage JSON-LD (Волна 5)

### 4.5. Первичные источники
Линковать на:
- ✅ W3C, WCAG, ARIA spec
- ✅ Material Design, Apple HIG, Microsoft Fluent docs
- ✅ Nielsen Norman Group research
- ❌ Не Dribbble для авторитета (только для визуальных примеров)
- ❌ Не Codepen для авторитета

### 4.6. Freshness signals
- date в frontmatter
- lastUpdated в frontmatter (для Волны 5)
- В тексте по возможности: "As of 2026..."

## 5. Подтверждённые контент-пробелы

### Tier 1 — высокий приоритет (нет контента + явный спрос)

| Тема | Источник сигнала | Спрос |
|---|---|---|
| Retro/brutalist UI design 2026 | On-site search | ✅ опубликован |
| Liquid glass companion (vs glassmorphism etc.) | On-site search + GA4 | ✅ опубликован, CTR 1.81% |
| Data table UI design | On-site search + GSC gap | ✅ опубликован, лучший CTR в UI design |
| Date picker UI design | On-site search + GSC gap | ещё не написан |
| AI chat interface UI design | Тренд индустрии + экспертиза | ✅ опубликован, 1 739 просмотров |

### Tier 2 — средний приоритет (есть контент, но плохо работает)

| Тема | Существующий пост | Проблема |
|---|---|---|
| Modal & Dialog | /blog/how-to-design-dialogs | 127 просмотров, 19 сек engagement |
| Button group | /blog/button-group-guide | 418 просмотров, 23 сек engagement |
| Avatar | /blog/avatar-ui-design | 9 сек engagement |
| Badge | /blog/badge-ui-design | 14 сек engagement |
| Stepper | /blog/stepper-ui-design | клики упали 227 → 69 в 6-мес сравнении |
| Empty state | /blog/empty-state-ui-design | 13 сек engagement |
| Dropdown | /blog/dropdown-ui-design | клики упали 628 → 472 после Wave 1 |
| Notifications | /blog/notifications-ui-design | клики упали 679 → 235 после Wave 1 |
| Button | /blog/button-ui-design | клики упали 233 → 71 после Wave 1 |
| Dashboard best practices | dashboard-design-best-practices-... | 301-редирект на pillar, статус закрыт |

### Tier 3 — потенциал, не подтверждено (write later)

- Sign in / Sign up UI design
- Onboarding UI design
- Form validation UI design
- Skeleton screens UI design
- Bento grid layouts
- Streaming text UI design
- Sidebar / Navigation drawer

## 6. Engagement check по постам (сверено 2026-10-10)

**Старая заметка о «2 сек engagement» у `effective-dashboard-design-principles`
опровергнута.** GA4 за окно 2026-07-12 → 2026-10-09 даёт 29.6 секунды
среднего времени, 195 просмотров, 685 событий. Технического сбоя нет.

Сверка всех постов, что раньше стояли в списке «urgent rescue», по GA4:

| Пост | Старая заметка | Факт (GA4) | Вывод |
|---|---|---|---|
| effective-dashboard-design-principles | 2 сек | 29.6 сек | заметка устарела, снять |
| avatar-ui-design | 9 сек | 18.4 сек | заметка устарела, снять |
| stepper-ui-design | 13 сек | 14.6 сек | норма для гайда |
| empty-state-ui-design | 13 сек | 24.5 сек | норма |
| badge-ui-design | 14 сек | 24.8 сек | норма |
| dashboard-design-best-practices-… | CTR 0.022% | URL удалён (301 → dashboard-ui-design) | поста нет |

Итог: **списка «urgent rescue» больше нет**. Все шесть постов либо имеют
нормальный engagement, либо уже не существуют. Единственная метрика, что
осталась низкой у части постов, — CTR, и она разобрана в разделе 10 и в
[`plans/empty-state-anomaly-analysis.md`](../plans/empty-state-anomaly-analysis.md).

Что делать (не срочно):
- Не переписывать посты из-за engagement: причины нет.
- Правки тела вести только по триггерам из разделов 10 и 18–19 (когда есть
  данные page-level GSC).

## 7. Content cannibalization map (сверено 2026-10-10)

Все цифры ниже — окно 3 месяца (июл–окт 2026), источник
`plans/Страницы.csv`, плюс `plans/compare 6 months - Страницы.csv`.

### Уже решено
- Dashboard cluster (8 постов) → pillar page. Старые D-посты 301-редиректят
  в `/blog/dashboard-ui-design` (см. [`next.config.js`](../next.config.js:68)).

### Подтверждённая каннибализация: button cluster

Три поста конкурируют за один интент. Данные 6-месячного сравнения:

| Пост | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| button-group-guide | 270 (было 347) | 29 285 | 0.92% | 12.35 (было 9.27) |
| button-ui-design | 71 (было 233) | 33 399 | 0.21% | 14.31 (было 10.22) |
| radio-button-ui-design | 110 (новый) | 24 648 | 0.45% | 8.52 |

`button-ui-design` держит больше показов, но худшую позицию и CTR в 4.4 раза
ниже, чем `button-group-guide`. `radio-button-ui-design` забрал часть показов
при появлении. Похожий паттерн у запросов: `button ui design` (125 показов),
`ui button group` (67), `group button ui` (44) — три URL на один запрос.

**Решение:** button cluster требует pillar-page, как было у dashboard.
Порядок: пиллар «Button patterns UI reference» → компонентные посты
превращаются в кластер, `radio-button` получает свою нишу.

### Кластеры, где каннибализации НЕТ (проверено)

**Form controls** (разные интенты, каждый ранжируется по своему компоненту):
input 151 клик / поз. 10.75; checkbox 122 / 9.6; dropdown 472 / 10.93;
slider 84 / 10.94; toggle-switch 232 / 8.9; stepper 69 / 12.72;
chip 245 / 8.08. Пиллар нужен для перелинковки, не для разведения.

**Feedback patterns** (не конкурируют): notifications 235 кликов / поз. 10.05;
tooltip 78 / 9.2; badge 138 / 8.1; empty-state 69 / 7.61. Общая проблема —
низкий CTR при нормальной позиции, а не каннибализация. Разбор — в
[`plans/empty-state-anomaly-analysis.md`](../plans/empty-state-anomaly-analysis.md).

**Navigation patterns** (не конкурируют): tabs 1 211 кликов / поз. 8.51;
breadcrumbs 149 / 12; pagination 400 / 11; dropdown 472 / 10.93;
appbar 31 / 14.91.

### Кандидаты на pillar+cluster (обновлено)

| Кластер | Pillar | Статус |
|---|---|---|
| Button | «Button patterns UI reference» | конкуренция подтверждена, делать первым |
| Form controls | «Form controls UI reference 2026» | конкуренции нет, пиллар для перелинковки |
| Feedback | «Feedback patterns UI reference» | конкуренции нет, приоритет ниже |
| Navigation | «Navigation patterns UI reference» | конкуренции нет, приоритет ниже |

Замечание: `form-controls-reference-2026.mdx` уже существует как пост —
проверить перед созданием Form-пиллара, возможно, он и есть пиллар.

## 8. Roadmap волн оптимизации

### Wave 1. CTR recovery — ЗАВЕРШЕНА, РЕЗУЛЬТАТ СМЕШАННЫЙ
- Переписывание title/description для 15 постов (май 2026)
- Status: измерено в `.ai/seo-baseline-2026-10-10.md`. Итоги сайта выросли (клики около +42%, позиция 11.9 против 14.0), но часть постов просела. Требуется построчный разбор перед батчем 2

### Wave 2. Featured snippets
- Добавление 40-60 слово answer-first блоков в топ-5 постов
- HowTo schema для постов с чек-листами
- Status: запланировано после результатов Wave 1

### Wave 3. Pillar pages + topical clusters
- Dashboard pillar — ✅ ГОТОВО
- Form controls pillar — запланировано
- Feedback patterns pillar — запланировано
- Navigation pillar — запланировано

### Wave 4. Fake stats cleanup
- Удаление выдуманной статистики (особенно tabs-ui-design)
- Защита от Helpful Content Update
- Status: запланировано

### Wave 5. Technical SEO
- Image alt texts + filenames
- Heading hierarchy (bold → H3/H4)
- lastUpdated infrastructure
- FAQ + HowTo schema
- Status: запланировано

### Wave 6. UX improvements (не контент)
- Починить мобильный поиск
- Header CTA уже улучшен ранее
- Status: запланировано, низкий приоритет

## 9. Рекомендованный план новых постов

### В течение 30 дней
1. **Retro/brutalist 2026** — ПУБЛИКОВАН
2. **Liquid glass companion (vs glassmorphism vs frosted UI)** — ПУБЛИКОВАН

### В течение 60 дней
3. **Data table UI design** — ПУБЛИКОВАН, лучший CTR в UI design (1.37%)
4. **AI chat interface UI design** — ПУБЛИКОВАН, 1 739 просмотров
5. **First niche-opinion experiment** — Pattern C, 600 слов, проверить формулу strikethrough-text

### В течение 90 дней
6. **Date picker UI design** — Pattern E, ещё не написан
7. **"Anatomy of Notion" — Design like X пилот** — новый Pattern, ещё не написан
8. **Foundation tutorial #2** (e.g., "How to design an AI app foundation") — Pattern B, ещё не написан

### Новое по данным октября 2026
9. **Guest posting cluster** — подтверждённый спрос, лучший CTR на сайте у submit-a-guest-post (3.33%). Развивать кластер, а не отдельные посты
10. **Unconverted impression pools** — why-landing-page-optimization-is-essential (14 272 показа, 0 кликов) и how-to-cancel-adobe-subscription (51 863 показа, CTR 0.16%): сначала CTR-fix, потом новый контент

## 10. План усиления содержимого (после Wave 1)

Источник: [`plans/wave1-losses-analysis.md`](../plans/wave1-losses-analysis.md).
Разбор Wave 1 показал, что у 14 из 15 постов одновременно упала позиция
(в среднем на 1.7 пункта), а CTR упал как следствие. Заголовки тут не при
чём, поэтому усиление идёт через содержимое, а не через title/description.

Правило: правки заголовков применяем только там, где CTR низкий, а позиция
стабильна. Там, где упала позиция, обновляем содержимое и свежесть.

### Шаг 10.1. Dropdown UI design

- Клики: 472 против 628. Позиция: 10.93 против 8.13 (−2.8). Показы стабильны.
- Просадка из-за позиции, спрос не падает.
- Задача: обновить содержимое, добавить актуальные примеры и FAQ, свежесть.

### Шаг 10.2. Filter UI design

- Клики: 310 против 465. Позиция: 11.82 против 10.72. Показы: 74 113 против 82 946.
- Задача: усилить раздел про типы фильтров и мобильные паттерны.

### Шаг 10.3. Chip UI design

- Клики: 245 против 328. Показы выросли (43 721 → 63 233), CTR упал (0.75% → 0.39%).
- Позиция почти не изменилась (−0.5), значит показы идут по более широким запросам.
- Задача: уточнить соответствие сниппета интенту, усилить раздел про выбор чипов.

### Шаг 10.4. Tooltip UI design

- Клики: 78 против 152. CTR: 0.17% против 0.35% (худший CTR в кластере).
- Позиция: 9.20 против 7.65 при выросших показах (43 170 → 46 658).
- Задача: это классический случай «позиция терпимая, CTR плохой» — можно
  проверить и заголовок, и первый абзац. Приоритетный кандидат.

### Шаг 10.5. Breadcrumbs UI design

- Клики: 149 против 179. Позиция: 12.00 против 10.93. Показы выросли (38 517 → 45 712).
- Задача: обновить содержимое, добавить сравнение с альтернативами навигации.

### Шаг 10.6. Slider UI design

- Клики: 84 против 95. Позиция: 10.94 против 8.47 (−2.5). Показы стабильны.
- Задача: усилить раздел про ввод значений и доступность.

### Вне этих шагов (требуют отдельного разбора)

- `notifications`, `carousel`, `button` — просели сильно, но сначала нужна
  проверка каннибализации (рядом есть button-group-guide, тоже просел).
- `empty-state` — аномалия сниппета (показы x2, CTR /3, позиция та же),
  сначала разбор запросов в GSC, потом правки.

### Порядок работы

1. Tooltip — самый явный случай CTR при терпимой позиции.
2. Chip — несоответствие сниппета.
3. Dropdown, filter, slider, breadcrumbs — обновление содержимого.
4. Затем возврат к notifications, carousel, button после проверки каннибализации.

## 11. Пласт SEO-услуг (найдено в разборе пиллара)

Источник: [`plans/dashboard-pillar-analysis.md`](../plans/dashboard-pillar-analysis.md)
и [`plans/compare 6 months - Запросы.csv`](../plans/compare%206%20months%20-%20Запросы.csv).

Это не про дизайн и не про дашборды. Это отдельный крупный интент про
SEO-агентства и реселлеров. У сайта есть несколько SEO-постов, но нет
пиллара, и они почти не собирают клики при большом объёме показов.

### 11.1. Существующие посты по теме

| Пост | Клики тек. | Клики пред. | Показы тек. | Показы пред. | CTR тек. | Поз. тек. | Поз. пред. |
|---|---|---|---|---|---|---|---|
| white-label-seo-reseller-platforms | 4 | 9 | **44 964** | 146 239 | **0.01%** | 29.00 | 45.19 |
| link-building-for-startups | 8 | 22 | 3 676 | 26 807 | 0.22% | 12.17 | 33.10 |
| seo-strategies-to-make-your-graphic-design-business-stand-out | 2 | 4 | 3 911 | 9 683 | 0.05% | 21.36 | 30.54 |
| seo-tools-compared | 4 | 4 | 2 351 | 5 414 | 0.17% | 12.11 | 40.15 |
| how-much-does-guest-post-cost-2026 | 12 | 0 (новый) | 2 942 | 0 | 0.41% | 7.77 | — |
| google-news-guest-posts | 3 | 0 (новый) | 226 | 0 | 1.33% | 13.65 | — |

Главная находка: `white-label-seo-reseller-platforms` держал 44 964 показа
за 6 месяцев при CTR 0.01% на позиции 29. Позиция улучшилась (45.19 → 29),
но страница всё ещё на третьей странице выдачи, и кликабельность почти
нулевая. Оговорка по окну: в окне 3 месяца показов уже 3 967, то есть объём
схлопывается (см. §11.4). Поэтому «крупнейшим нереализованным резервом»
этот пост называть нельзя — в актуальном окне он им не является.

### 11.2. Запросы пласта (все 0 кликов)

Сгруппировано по темам, показания текущего периода:

**White label SEO:**
- white label seo platform — 7 148 (пред. 15 960)
- white label seo tools — 3 850 (8 117)
- white label seo tool — 3 812 (6 470)
- white label seo software — 3 417 (6 000)
- best white label seo software — 503 (2 717)
- seo white label software — 1 004 (1 412)
- white label seo reseller program — 463 (1 691)
- white label seo management platforms — 584 (1 607)
- white label seo resellers — 523 (1 578)
- best white label seo tool — 354 (1 576)
- плюс: best white label seo, white label seo solutions, white label seo software for agencies

**SEO reseller:**
- best seo reseller — 1 286 (10 277)
- seo reseller — 544 (12 941)
- seo reseller software — 727 (1 383)
- seo reseller white label — 919 (1 535)
- private label seo reseller — 487 (1 319)
- seo reseller services — 123 (1 323)
- best seo reseller program — 124 (1 718)
- плюс: resell seo, seo reseller programs, seo reseller hub, top seo resellers, seo reseller agency, seo reseller pricing

**SEO для дизайнеров:**
- seo keywords for graphic design — 1 243 (1 912)
- keywords for graphic design website — 147 (1 302)
- seo for designers — 531 (1 298)

Суммарно десятки запросов, каждый с показами и нулём кликов. Падение показов
к текущему периоду (в скобках — прошлый период) говорит, что тема не растёт
сама, но объём всё равно крупный.

### 11.3. Что это значит

- Контент есть, но он не цепляет: у головного поста CTR 0.01%.
- Нет пиллара. Шесть SEO-постов разбросаны по разным категориям
  (`SEO`, `Growth Hacking`, `Research`) и не связаны в структуру.
- Запросы почти все коммерческие (`reseller`, `white label`, `software`),
  то есть это аудитория, которая выбирает подрядчика, а не читает ликбез.

Следствие: это кандидат на **pillar + cluster в Wave 3**, а не на точечные
правки. Пиллар под интент «white label SEO» или «SEO reseller», вокруг него
существующие посты как кластер.

### 11.4. Быстрая победа, отдельно от волны

Цифры этого раздела — окно 6 месяцев
([`plans/compare 6 months - Страницы.csv`](../plans/compare%206%20months%20-%20Страницы.csv)).
В окне 3 месяца ([`plans/Страницы.csv`](../plans/Страницы.csv)) у
`white-label-seo-reseller-platforms` всего 3 967 показов при CTR 0.03% и
позиции 29.65. Разница не в ошибке, а в окнах, но важнее сам тренд: показы
обвалились 146 239 (прошлые 6 мес) → 44 964 (последние 6 мес) → 3 967
(последние 3 мес). Это не резерв, который недополучает клики, а страница,
теряющая показы.

Вывод: быстрая победа через сниппет сомнительна. Сначала нужно понять, куда
ушли показы; правка title/description сама по себе показов не вернёт.

Порядок (если браться): сверить потери по запросам в GSC, затем решить,
это сниппет или потеря позиций.

### 11.5. Чего НЕ делать

- Не смешивать с dashboard-кластером. `category management dashboard`
  (9 361 показ) — это дашборды, не SEO-услуги.
- Не писать новый ликбез «что такое SEO». Интент коммерческий, аудитория
  уже знает, что это, и выбирает исполнителя.

## 12. Аномальные показы: бренд-несоответствие

### 12.1. Случай how-to-study-saas-dashboard-in-the-ai-era

Данные GSC по этой странице (окно «последние 3 месяца», тип поиска Веб,
сравнение с предыдущими 3 месяцами):

| Метрика | Последние 3 мес | Предыдущие 3 мес |
|---|---|---|
| Клики | 7 | 7 |
| Показы | 16 200 | 28 000 |
| CTR | 0% | 0% |
| Средняя позиция | 7.4 | 8 |

Показы упали почти вдвое, клики не изменились вовсе, позиция даже улучшилась.
Профиль не похож на обычную CTR-проблему.

### 12.2. Причина: чужой бренд saasframe

Вкладка «Запросы» почти целиком состоит из фраз с брендом **saasframe**
(сторонний продукт или компания, публикующая паттерны dashboard-дизайна):

- saasframe dashboard best practices 2025 — 192 показа, 0 кликов
- saasframe dashboard best practices — 192, 0
- saasframe education dashboard patterns — 189, 0
- saasframe data heavy dashboard patterns — 149, 0
- saasframe data heavy dashboard patterns — 148, 0
- saasframe design patterns 2025 — 113, 0
- saasframe saas dashboard design patterns — 97, 0
- saasframe dashboard patterns data dense — 93, 0
- saasframe ai dashboard ui patterns — 89, 0
- saasframe dashboard ui patterns — 88, 0
- … и десятки похожих вариантов, все с нулём кликов

Единственные запросы с реальными кликами: `ai saas dashboard ui` (2 клика,
11 показов). Плюс висит один аномальный длинный запрос-вопрос на 50 показов
(«we are building a saas dashboard and need an out-of-the-box saas navigation…»).

Страница случайно ранжируется по чужому бренду: пользователи ищут Saasframe,
а не наш пост, поэтому не кликают.

### 12.3. Вывод: это не резерв, а шум

В разборе пиллара я вынес этот пост в приоритет CTR-fix по цифре «56 937
показов при 29 кликах» из 6-месячного сравнения. Это была неверная
интерпретация. Правки title/description здесь бессмысленны: сниппет не
изменит то, что человек ищет другой бренд. Реального упущенного трафика
почти нет.

Корректировка: пост **снимается** с приоритета CTR-fix.

### 12.4. Что делаем

| Вариант | Что даёт | Кто делает |
|---|---|---|
| A. Оставить как есть | Ничего не теряем, такие показы безвредны | По умолчанию |
| B. Понять, кто такой Saasframe | Конкурент, платформа или наш продукт? | Владелец, 1 минута |
| C. Если Saasframe конкурирует по dashboard-паттернам | Возможен легитимный пост или сравнение | Только после B |
| D. Усилить тему AI × dashboard | 2 клика сейчас, но ниша растущая | Кандидат в Wave 3 |

Базовое решение: оставить как есть. К варианту C возвращаться только если
B покажет, что Saasframe это релевантный конкурент.

### 12.5. Правило на будущее

Большой объём показов при нуле кликов не всегда означает резерв. Прежде чем
вносить страницу в CTR-fix, смотрим вкладку «Запросы»:

- Топ запросов совпадает с темой страницы — настоящая CTR-проблема, чиним сниппет.
- Топ запросов содержит чужой бренд или несовпадающий интент — это шум, а не резерв, сниппет не поможет.

Правило применяем ко всем будущим аномалиям, включая `empty-state-ui-design`.

## 13. Каталог /dashboards: два интента на одной странице

Источник: GSC, окно 3 месяца, фильтр по странице. Плюс
[`plans/compare 6 months - Страницы.csv`](../plans/compare%206%20months%20-%20Страницы.csv).

### 13.1. Цифры

| Показатель | 3 мес, фильтр по странице | 6-мес сравнение, тек. | 6-мес сравнение, пред. |
|---|---|---|---|
| Клики | 106 | 106 | 234 |
| Показы | 11.8 тыс. | 11 810 | 27 812 |
| CTR | 0.9% | 0.90% | 0.84% |
| Средняя позиция | 15.3 | 15.27 | 10.52 |

Позиция упала с 10.52 до 15.27, показы почти вдвое. Это страница 2 выдачи.

### 13.2. Что работает

Головной запрос конвертит нормально:

| Запрос | Клики | Показы | CTR |
|---|---|---|---|
| dashboard ui kit | 22 | 1 051 | 2.09% |
| ui kit dashboard | 9 | 84 | 10.7% |
| figma dashboard ui kit | 2 | 807 | 0.25% |

Интент «набор компонентов для дашборда» совпадает со страницей.

### 13.3. Что не работает

Крупный блок запросов с нулём кликов, суммарно больше 2 500 показов:

- figma dashboard template — 1 029 показов, 0 кликов
- product dashboard — 141, 0
- dashboard templates — 95, 0
- figma dashboard — 91, 0
- where can i find dashboard design templates? — 76, 0
- dashboard ui kit figma — 75, 0
- dashboard ui kits — 72, 0
- best figma saas dashboard ui kits template — 69, 0
- и далее длинный хвост

Интент «шаблон дашборда в Figma» страница закрывает плохо: это каталог
китов, а не шаблонов, и он стоит на позиции 15.

### 13.4. Диагноз

Ключевое: здесь проблема не в сниппете, а в позиции и совпадении интента.
Правило из раздела 12.5 работает в обратную сторону. Если позиция плохая,
правка заголовка почти не поможет, сколько бы показов ни было.

Дополнительный контекст: падение позиции на 4.75 совпадает по направлению
с провалом 14 из 15 компонентных постов из Шага 2 (там в среднем 1.7).
Это указывает на общий сдвиг выдачи для сайта, а не на локальную поломку
каталога.

### 13.5. Каннибализация проверена

Выгрузка по запросу `dashboard templa...` без фильтра по странице (окно
16 месяцев): 1 клик, 287 показов, CTR 0.3%, средняя позиция 37.2.

| Страница | Клики | Показы |
|---|---|---|
| /dashboards | 1 | 121 |
| /dashboard-templates/admin-dashboard | 0 | 155 |
| /dashboard-templates/analytics-dashboard | 0 | 4 |
| /blog/why-are-dashboards-important | 0 | 2 |
| остальные | 0 | 1 каждая |

Интент раздроблен между каталогом и страницей admin-dashboard, но объём
ничтожный: 287 показов за 16 месяцев и один клик. Это не резерв.

### 13.6. Решение: каталог и Figma-интент закрыты

Решение владельца: за позициями по Figma и UI-китам не охотимся, тема
UI kits умерла. Варианты B, C и D из прежней версии этого раздела закрыты.

Остаётся вариант A: каталог оставляем как есть, on-page под
`figma dashboard template` не правим.

Что сохраняет силу:
- Пиллар `dashboard-ui-design` остаётся в Шаге 6 на CTR-fix
  (42 411 показов, CTR 0.20%, позиция 9.03). Это не Figma и не каталог.
- Если каталог когда-нибудь понадобится поднимать, начинать надо с позиции
  (15.3 это вторая страница), а не со сниппета.

## 14. Далёкий шаг: захват брендового трафика saasframe

Контекст: Saasframe это сторонний продукт с партнёрской программой
(saasframe.lemonsqueezy.com/affiliates). Его брендовые запросы
(`saasframe dashboard patterns` и десятки вариантов) сейчас попадают на наш
пост `how-to-study-saas-dashboard-in-the-ai-era` и дают ноль кликов.

Идея: написать или переработать пост, который честно описывает ресурс
Saasframe и его паттерны, и поставить партнёрскую ссылку. Цель — занять
позицию по брендовым запросам и монетизировать переходы.

Условия:
- Только далёкий шаг, не сейчас. Приоритет ниже CTR-fix и rescue-планов.
- Обязательно раскрыть партнёрство по правилам из
  [`.ai/affiliate-integration-plan.md`](../.ai/affiliate-integration-plan.md):
  disclosure в голосе проекта, без скрытой рекламы.
- Сначала проверить условия программы: выплаты, cookie-окно, разрешён ли
  обзорный контент.

Куда положить: в Wave 6 или в отдельный экспериментальный список.

## 15. Guest posting cluster: rescue-план выполнен

Источник: [`.ai/guest-posts-rescue-plan.md`](../.ai/guest-posts-rescue-plan.md)
(от 1 июля 2026), сверенный с фактическим состоянием постов в
[`content/blog/`](../content/blog).

### 15.1. Что уже сделано (план выполнен, не нужно повторять)

Метаданные приведены в sentence case по всем пяти постам:

- `guest-posts-vs-niche-edits` — «Guest posts vs niche edits for stronger backlinks in 2026»
- `guest-posting-opportunities` — «35 guest posting opportunities that actually publish in 2026»
- `benefits-of-guest-blogging` — «9 real benefits of guest blogging in 2026»
- `submit-a-guest-post` — «Submit a guest post to the Setproduct blog»
- `guest-article-for-web-development` — «Guest posting for web development companies»

Плюс созданы три новых поста кластера, которых не было в плане:

- `how-much-does-guest-post-cost-2026` (6 сентября)
- `google-news-guest-posts` (7 сентября)
- `red-flags-in-guest-post-outreach` (8 сентября)

Перелинковка замкнута: `relatedSlugs` внутри кластера, контекстные ссылки
pillar↔spokes↔conversion в теле. Категории: `guest-posting-opportunities` и
`benefits-of-guest-blogging` теперь `SEO` (были `Research`),
`guest-posts-vs-niche-edits` осталась `Research`.

Результат по GSC это подтверждает: `submit-a-guest-post` вырос 433 → 678
кликов, `guest-posting-opportunities` 258 → 634. Кластер работает.

### 15.2. Что осталось (остаточные дефекты)

**1. Title Case в H2/H3 двух постов.** План требовал привести заголовки к
sentence case в зоне правок, но в теле остались старые заголовки:

- `guest-posts-vs-niche-edits`: `## Understanding Guest Posting`,
  `## The Benefits of Guest Posts`, `### Cost Considerations`,
  `## How To Acquire Niche Edit and Guest Post Links?`, `## Final Thoughts`
- `guest-article-for-web-development`: `## The Efficiency of Guest Posting`,
  `## Identifying Guest Posting Opportunities`,
  `## Get Your Guest Posts Accepted Faster`, `### Improve Your Google Rank`

Это прямое нарушение правила sentence case из [`AGENTS.md`](../AGENTS.md:69).

**2. `guest-article-for-web-development` всё ещё короткий** — 3 min read.
План требовал нишевого углубления (типы площадок, примеры тем, шаблон питча
для web-dev). Не сделано.

**3. Соседние SEO-посты устарели и нарушают правила:**

| Пост | Проблема |
|---|---|
| link-building-for-startups | Title Case + «2025» + двоеточие в title |
| white-label-seo-reseller-platforms | metaTitle с двоеточием + «2025» |
| seo-strategies-to-make-your-graphic-design-business-stand-out | Title Case в title |

### 15.3. Что делать

| Приоритет | Действие | Режим |
|---|---|---|
| 1 | Привести H2/H3 к sentence case в `guest-posts-vs-niche-edits` и `guest-article-for-web-development` | code |
| 2 | Обновить title/metaTitle у трёх устаревших SEO-постов (§15.2.3) | code, скилл `seo` |
| 3 | Углубить `guest-article-for-web-development` до 8+ min read | code |
| 4 | Свежесть: обновить `lastUpdated` после контентных правок | code |

Пункты 1 и 2 — быстрые и низкорисковые. Пункт 3 требует больше работы,
его можно совместить с усилением из раздела 10.

### 15.4. Что НЕ нужно

- Не переписывать метаданные пяти постов заново: они уже в порядке.
- Не трогать `relatedSlugs`: перелинковка замкнута корректно.
- Не создавать новые посты кластера: три уже добавлены в сентябре.

## 16. White label SEO pillar: два сателлита (октябрь 2026)

Источник: [`plans/pillar-c-white-label-2026-10.md`](../plans/pillar-c-white-label-2026-10.md),
разбор Search Console по пиллару (октябрь 2026). Пиллар переписан коммитом
`5a7232a`; диагностика ниже — из той же работы.

### 16.1. Почему два сателлита

Диагностика топ-30 запросов без пола показала три сопоставимых по объёму
интента на одной странице. Одна страница не может закрыть их все: у каждого
своя форма вопроса в SERP.

| Интент | Показы | Запросов | Примеры запросов |
|---|---|---|---|
| platform / software | 14 082 | 10 | white label seo platform, white label seo software |
| reseller | 10 003 | 11 | white label seo reseller, reseller seo program |
| tools | 8 447 | 7 | white label seo tools, white label reporting |
| brand | 331 | 1 | прямые брендовые |
| noise | 277 | 1 | скрапленные предложения, отброшены |

Вердикт: пиллар `white-label-seo-reseller-platforms` ловит интент platform
и сравнение; два сателлита разводят интенты reseller и tools.

### 16.2. S1 — интент reseller (~10k показов)

- slug: `white-label-seo-reseller-programs`
- title: под запросы `white label seo reseller`, `reseller seo program`
  (≤60 символов, без двоеточия, sentence case)
- суть: как агентства реселлят SEO под своим брендом — модель, маржа,
  что отдавать на аутсорс, риски
- category: `SEO`

### 16.3. S2 — интент tools (~8.4k показов)

- slug: `white-label-seo-tools`
- title: под запросы `white label seo tools`, `white label reporting`
  (≤60 символов, без двоеточия, sentence case)
- суть: какие SEO-инструменты реселлить под своим брендом, а какие
  строить in-house
- category: `SEO`

### 16.4. Обязательная структура обоих сателлитов

`answer-first лид (40-70 слов)` → `{/* IMAGE: hero */}` → `## TL;DR` (3-4 пункта)
→ тело → `## FAQ` (4-5 вопросов, ответы 40-60 слов, под реальные запросы)
→ финальный CTA.

### 16.5. Перелинковка

Каждый сателлит линкуется на:

- пиллар `white-label-seo-reseller-platforms`
- 2 поста guest-post кластера: comparison (`guest-posts-vs-niche-edits`)
  и opportunities (`guest-posting-opportunities`)

Пиллар получает обратные ссылки. Править пиллар для этого не нужно, если
ссылки уже стоят; если нет — добавить.

### 16.6. Что НЕ делать

- Не писать новый ликбез «что такое SEO»: интент коммерческий, аудитория
  выбирает исполнителя, а не читает основы.
- Не менять slug пиллара и не трогать его тело ниже FAQ-зоны.
- Не смешивать кластер с dashboard-темой.

## 17. Update protocol

Этот файл — источник истины. Когда приходят новые данные:

### При обновлении этого файла
- Сохрани прошлую версию как .ai/content-strategy-archive-{YYYY-MM}.md
  (октябрьское обновление 2026 опирается на git-историю: прошлая версия
  доступна через `git log`/`git show` по файлу)
- Обнови раздел "Последнее обновление"
- В разделе 2 (принципы) добавь новые принципы внизу, не удаляй старые
- В разделе 5 (пробелы) обнови статусы (что уже написано)
- В разделе 8 (roadmap) обнови статусы волн
- Сверяй цифры с актуальным `.ai/seo-baseline-{YYYY-MM-DD}.md`,
  а бенчмарки категорий — с `.ai/seo-benchmarks.md`

### При создании нового baseline-снимка
- Создать .ai/seo-baseline-{YYYY-MM-DD}.md с текущими цифрами
- Не перезаписывать предыдущие — это история

### При написании нового поста
- Проверить, какой Pattern применять
- Проверить, какие принципы (4.1-4.6) применять для AI-tool оптимизации
- Проверить, есть ли пост в списке "next content" (раздел 9)
- После публикации — обновить раздел 5 (gaps) и раздел 9 (roadmap)

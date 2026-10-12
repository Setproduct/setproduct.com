# Pillar B: answer-first верх и FAQ для 3 пиллар-страниц (октябрь 2026)

## Итог одной строкой

Три пиллар-страницы получили недостающие элементы answer-first структуры (лид, элементы decision-таблиц, «когда НЕ уведомлять», доп. FAQ, метки IMAGE, перелинковка). Title, slug и тело ниже зоны правки не тронуты.

## Что уже было и что добавлено

| Страница | Gap | Было | Добавлено |
|---|---|---|---|
| tabs-ui-design | 4627 | TL;DR, decision-таблица, FAQ (7 вопросов) | Answer-first лид, колонка `Nav` в decision-таблицу, 2 FAQ-вопроса (types, states/theming), 3 метки IMAGE, 1 перелинков��а на data-table |
| data-table-ui-design | 1927 | Answer-first лид, TL;DR, FAQ (8 вопросов) | Строка `Grid` в decision-таблицу (table vs list vs cards vs grid), раздел «When to virtualize a table», 3 метки IMAGE, перелинковка tabs/pagination/filter |
| notifications-ui-design | 1653 | Answer-first лид, TL;DR, channel-таблица, FAQ (7 вопросов) | Строка `Email` в channel-таблицу, блок «когда НЕ уведомлять», 1 FAQ-вопрос, 3 метки IMAGE, перелинковка empty-state/badge |

## Правило «не дублировать»

- TL;DR уже был на всех трёх — новых TL;DR-блоков не создавалось.
- FAQ уже был на всех трёх — новые вопросы добавлялись только там, где запроса страницы не было в существующих вопросах.
- Decision-таблица уже была у tabs и notifications — не переписывал, а достраивал недостающие колонку/строку.

## Что именно доб��влено в тело

### tabs-ui-design
- Лид заменён на answer-first (≈60 слов), без «в современном мире».
- Decision-таблица: добавлена колонка `Nav` и строка `Changes the URL`. Трихолон в строке «Best for» убран («2–4 mutually exclusive options»).
- После таблицы: 1 перелинковка на `/blog/data-table-ui-design` (таблица с вкладками) + метка `IMAGE: диаграмма-развилка`.
- FAQ: добавлены «What are the main types of tabs?» и «What states do tabs need, and how should I theme them?» (запросы types of tabs, tabs states, tabs theming) + метка `IMAGE: иллюстрация частого кейса`.
- Починено предсуществующее двоеточие в H2: `## Before you ship: tabs checklist` → `## Before you ship, tabs checklist`.

### data-table-ui-design
- Лид не менялся (уже answer-first).
- Добавлена decision-таблица table vs list vs cards vs grid (4 строки) перед разделом «When to use a table vs cards or a list» + метка `IMAGE: диаграмма-развилка`.
- Добавлен раздел `## When to virtualize a table` (срабатывает: rows > low thousands, fixed row height, continuous scroll; не срабатывает: paging, expandable rows, короткая таблица) + метка `IMAGE: диаграмма-развилка`.
- Метка `IMAGE: иллюстрация частого кейса` в FAQ.
- Перелинковка: tabs, pagination-ui-design, filter-ui-design (были в relatedSlugs, добавлены контекстно в тело).

### notifications-ui-design
- Лид заменён на answer-first (≈45 слов) вместо `<span class="blog_big-paragraph">`.
- Channel-таблица: добавлена строка `Email`.
- После таблицы добавлен абзац «When should you hold back?» (когда НЕ уведомлять) + метка `IMAGE: диаграмма-развилка`.
- FAQ: добавлен «When should you not send a notification?» + метка `IMAGE: иллюстрация частого кейса`.
- Перелинковка: empty-state-ui-design, badge-ui-design (контекстно в FAQ).
- Починено предсуществующее двоеточие в H2: `## Before you ship: notification checklist` → `## Before you ship, notification checklist`.

## Метки IMAGE (владелец генерит отдельно)

После лида: `{/* IMAGE: hero */}` — на всех трёх страницах.
После decision-таблицы: `{/* IMAGE: диаграмма-развил��а выбора компонента */}` — tabs (1), data-table (2), notifications (1).
В FAQ: `{/* IMAGE: иллюстрация частого кейса */}` — на всех трёх страницах.

## Перелинковка (не более 3 на страницу)

| Страница | Ссылки в теле |
|---|---|
| tabs | data-table-ui-design, steps-ui-design, dropdown-ui-design |
| data-table | tabs-ui-design, pagination-ui-design, filter-ui-design |
| notifications | empty-state-ui-design, badge-ui-design |

## Self-check (фактические цифры прогона)

| Файл | Em-dash | Двоеточия в H2/H3 | IMAGE-метки | Title |
|---|---|---|---|---|
| tabs-ui-design | 2 | 0 | 3 | 54 (не менялся) |
| data-table-ui-design | 0 | 0 | 3 | 42 (не менялся) |
| notifications-ui-design | 2 | 0 | 3 | 58 (не менялся) |

`npm run lint` (`tsc --noEmit`) — чисто на всех трёх. Трихолоны в новых фрагментах: не вводились (в таблице tabs один убран). Запрещённые конструкции («Not X, but Y», «Whether you're X or Y», «From X to Y») в новых фрагментах не используются. Sentence case в новых заголовках соблюдён.

## Коммиты (без push)

- tabs-ui-design — `content:`
- data-table-ui-design — `content:`
- notifications-ui-design — `content:`

## Что НЕ делалось

- Title не менялся (отдельная волна, уже замеряется).
- Slug не менялся.
- Тело ниже зоны правки не переписывалось.
- Страницы волн 1-2 и денежный кластер не тронуты.
- Существующие TL;DR и FAQ не дублировались.

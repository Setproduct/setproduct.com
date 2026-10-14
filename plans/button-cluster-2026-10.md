# Кнопочный кластер: роли, заголовки, перелинковка (октябрь 2026)

**Дата:** 2026-10-11. **Режим:** code. Правки применены 2026-10-11
(коммиты `6d01e2c`, `8096e1e` и `docs:`), затем ветка
`seo/button-cluster-2026-10` смержена в `main` (merge `b3997bb`).
**Источники:** `.ai/content-strategy.md` (раздел 7, блок «Подтверждённая
каннибализация: button cluster»), `plans/compare 6 months - Страницы.csv`,
`plans/compare 6 months - Запросы.csv`, `plans/title-colon-cleanup-2026-10.md`,
`plans/dashboard-pillar-analysis.md` (эталон разбора),
`plans/content-strengthening-2026-10.md` (эталон формата),
`next.config.js` (раздел redirects), коммиты `2fc6311` / `dea89a6`
(образец перелинковки на form-controls пиллар).

---

## Итог одной строкой

**Обновлено 2026-10-11 после данных «запрос → страница» из GSC:**
каннибализация между пилларом и сателлитом **НЕ подтвердилась** (см.
раздел 12). Интенты разделены чисто: `button-group-guide` единолично
держит «group» (5 660 показов против 1 у пиллара), `button-ui-design`
держит «button ui / типы кнопок», `radio-button-ui-design` держит только
«radio» (в «button»-запросах без radio всего 10 осмысленных показов).
Четвёртый пост, `figma-to-react-buttons`, дублировал пиллар и ушёл в 301.
Реальная проблема кластера — не борьба страниц, а нулевой CTR на
собственных топ-запросах (потолок сниппета).

Изменения этой задачи: роли страниц, заголовки, перелинковка, 301.
Переписывание тела пиллара в reference-style выносится отдельным шагом
с отдельным OK (см. «Фаза B»).

---

## 1. Цифры кластера (сверено с CSV)

Окно 6 месяцев, источник `plans/compare 6 months - Страницы.csv`. Порядок
колонок: последние 6 мес. клики, предыдущие 6 мес. клики, последние
показы, предыдущие показы, последние CTR, предыдущие CTR, последняя
позиция, предыдущая позиция.

| Пост | Клики | Было | Показы | Было | CTR | Было CTR | Позиция | Было |
|---|---|---|---|---|---|---|---|---|
| `button-group-guide` | 270 | 347 | 29 285 | 36 411 | 0.92% | 0.95% | 12.35 | 9.27 |
| `radio-button-ui-design` | 110 | 0 (новый) | 24 648 | 0 | 0.45% | 0% | 8.52 | — |
| `button-ui-design` | 71 | 233 | 33 399 | 48 082 | 0.21% | 0.48% | 14.31 | 10.22 |
| `figma-to-react-buttons` | вне топа | — | — | — | — | — | — | — |

Дополнение из вкладки «Запросы» (окно 6 месяцев):

| Запрос | Клики | Показы | CTR | Позиция | Комментарий |
|---|---|---|---|---|---|
| `button group` | 2 | 802 | 0.25% | 10.25 | было 3 028 показов при 0 кликов |
| `button group ui` | 7 | 528 | 1.33% | 5.96 | ядро интента группы |
| `button group design` | 8 | 121 | 6.61% | 6.83 | лучший CTR кластера |
| `button ui design` | 4 | 125 | 3.20% | 16.20 | было 23.55, позиция выросла (меньше = лучше) |
| `button group ui design` | 5 | 69 | 7.25% | 3.43 | топ-3 |
| `button group examples` | 3 | 44 | 6.82% | 7.64 | — |

**Вывод по данным.** Показы «button group» обвалились в 3.8 раза
(3 028 → 802) при почти нулевом CTR, а `button group design` / `button
group ui design` держат CTR 6–7% на позициях 3–7. То есть страница
`button-group-guide` правильно ранжируется по «group», но теряет
видимость, а `button-ui-design` сидит на позиции 16 по своему
собственному запросу. Это два разных интента, они не мешают друг другу
напрямую, но размывают общий кластер и не собраны в структуру.

**Аномалия, которую видно отдельно.** Якорные URL внутри этих постов
(`#use-cases-of-button-group` 2 804 показа, `#the-anatomy-of-button-group-ui-design`
2 775, `#buttons-size` 371, `#buttons-anatomy` 366 и другие) дают тысячи
показов и ноль кликов. Это тот же паттерн, что в разделе 15 стратегии
(«якорные URL — крупнейший неиспользованный пул»). Это техническая задача
(отдельный разбор), не часть текущего плана, но её надо держать в виду.

---

## 2. Роли страниц

### 2.1. Пиллар: `button-ui-design`

- Файл: `content/blog/button-ui-design.mdx` (278 строк, не > 500 → правки
  тела возможны, но в этой задаче тело не трогаем).
- Роль: **точка сбора кнопочного кластера**, канонический гайд «кнопка как
  компонент» (анатомия, состояния, размеры, темизация, приоритеты).
- Почему он: держит больше всего показов (33 399) против 29 285 у
  `button-group-guide`, и при этом худший CTR (0.21%) и позицию (14.31) —
  максимальный нереализованный резерв внутри темы «кнопка». Дата 2023-01-31.
- Что меняем в этой задаче: заголовок (см. раздел 3), категория
  `Inspiration` → `UI Design` (это компонентный гайд, место в UI Design,
  см. раздел 2.5), перелинковка на сателлит.
- Что НЕ меняем в этой задаче: тело. Переписывание в reference-style
  (TL;DR с стрелками, decision-таблица, FAQ, чек-лист) — Фаза B.

### 2.2. Сателлит: `button-group-guide`

- Файл: `content/blog/button-group-guide.mdx` (205 строк).
- Роль: **отдельный пост под собственный интент** «button group / группа
  кнопок». Не мержим, не редиректим.
- Почему оставляем: у него свой подтверждённый спрос (`button group design`
  6.61% CTR, `button group ui design` 7.25% на позиции 3.43), тема
  «группа кнопок» в пилларе раскрывается одной секцией, а пост раскрывает
  её полноценно (use cases, usability-типсы).
- Что меняем: заголовок (Title Case → sentence case, снять слабый
  «guide»-хвост, см. раздел 3), перелинковка на пиллар.

### 2.3. Выведен из кластера: `radio-button-ui-design`

- Файл: `content/blog/radio-button-ui-design.mdx` (346 строк).
- Роль: **сателлит form-controls кластера, не кнопочного**. Radio это
  form control (один выбор из группы), а не кнопка-действие. Он уже
  получил бэклинк на `form-controls-reference-2026` в коммите `2fc6311`.
- Решение: **по теме не трогаем**, заголовок чистый (sentence case, без
  двоеточия, 52 символа), дата 2026-06-16. В стратегии прямо сказано:
  «`radio-button` получает свою нишу».
- Единственное, что нужно: НЕ вешать на него ссылку-пиллар кнопочного
  кластера, чтобы не путать тематику.

### 2.4. 301-редирект: `figma-to-react-buttons`

- Файл: `content/blog/figma-to-react-buttons.mdx` (83 строки, 2 min read,
  2019-01-19, категория `Inspiration`).
- Проблема: тонкий старый пост на тему «кнопки Material Design во
  Figma → React», которая дублирует пиллар и секцию Material-кнопок
  внутри `button-ui-design`. Собственного спроса не показывает (вне топа
  по кликам).
- Решение: **301-редирект на `/blog/button-ui-design`** (по образцу
  dashboard-редиректов в `next.config.js`), файл `.mdx` удалить, чтобы
  роут не генерировался.
- Ограничение: удаляем только MDX-файл. Обложку и thumbs в `public/`
  не трогаем (задача не про картинки, а `find-unused-images` потом
  подскажет).

### 2.5. Категория пиллара: `Inspiration` → `UI Design`

`button-ui-design` сейчас в `Inspiration`, хотя это компонентный гайд.
В стратегии (раздел 4) `UI Design` — это гайды по компонентам, а
`Inspiration` — подборки и тренды. Кнопочный пиллар должен жить в
`UI Design`, рядом с `button-group-guide` (уже `UI Design`). Правка
категории влияет на листинги и related-подбор, поэтому идёт вместе с
заголовками отдельным коммитом и требует подтверждения.

---

## 3. План заголовков

Правила: sentence case, без двоеточия, ≤ 65 символов, с психологическим
хуком (benefit / specificity / curiosity). По процедуре скилла `seo` —
по 3 варианта на пост, выбор делает владелец.

### 3.1. `button-ui-design`

Текущий: `Button UI design: Every detail that makes a button work`
(двоеточие + Title Case). Текущий metaTitle совпадает с title.

| № | Вариант | Символов | Хук | Целевые запросы |
|---|---|---|---|---|
| 1 | `Button UI design, every detail that makes a button work` | 55 | benefit | button ui design, button anatomy |
| 2 | `Button UI design done right, states and anatomy for 2026` | 55 | specificity | button ui design, button size ui |
| 3 | `Button UI design, anatomy and states that actually work` | 53 | curiosity | button ui design, buttons ui design |

Рекомендация: вариант 1 (минимальная правка относительно текущего,
снимает двоеточие и Title Case, сохраняет формулировку-хук).
Двоеточие уходит из `title` и `metaTitle` синхронно.

### 3.2. `button-group-guide`

Текущий: `Button Group UI design guide` (Title Case; «Guide» без хука —
слабый хвост по скиллу). Текущий metaTitle длинный с двоеточием:
`Button Group UI Design Guide: Tips & Best Practices - Setproduct`.

| № | Вариант | Символов | Хук | Целевые запросы |
|---|---|---|---|---|
| 1 | `Button group UI design, grouping that stays scannable` | 50 | benefit | button group ui design |
| 2 | `Button group UI design with real product examples` | 46 | specificity | button group examples |
| 3 | `How to design button groups users scan in seconds` | 45 | curiosity | button group design, ui button group |

Рекомендация: вариант 2 (сохраняет keyword-фразу в начале, добавляет
обещание конкретики, попадает в `button group examples`).
`metaTitle` чистим: снять двоеточие, снять хвост `- Setproduct`
(Next.js добавляет суффикс сам).

### 3.3. `figma-to-react-buttons`

Если владелец выберет **оставить** пост вместо 301 (см. раздел 2.4),
заголовок правится так (текущий: `From Figma to React: material design
buttons` — двоеточие + Title Case по metaTitle):

| № | Вариант | Символов | Хук |
|---|---|---|---|
| 1 | `From Figma to React, styled Material Design buttons` | 47 | benefit |
| 2 | `Material Design buttons from Figma to React components` | 47 | specificity |
| 3 | `Designing Material buttons in Figma for React` | 44 | specificity |

При выборе 301 заголовок не правится: файл удаляется.

### 3.4. `radio-button-ui-design`

Не трогаем. Заголовок уже в норме: `Radio button UI design, from anatomy
to accessible groups` (52 символа, sentence case, без двоеточия).

---

## 4. План перелинковки

Образец: коммит `2fc6311` (8 сателлитов → одна живая ссылка в тексте на
пиллар `form-controls-reference-2026`) плюс `dea89a6` (зачистка
трихолонов в этих вставках). Паттерн: одна честная контекстная ссылка в
теле, не в блоке «Related links», отдельным коммитом `content:`.

### Вставки в этом кластере

1. **`button-group-guide` → `button-ui-design`.** Одна фраза в разделе
   «Buttons Group in code» или в начале: группа кнопок строится из
   отдельных кнопок, базовая логика анатомии и состояний разобрана в
   материнском гайде `button-ui-design`.
2. **`button-ui-design` → `button-group-guide`.** Обратная ссылка в
   секции «Button Group» (строка 256): раскрыть, что группа кнопок как
   самостоятельный компонент разобран в отдельном гайде.
3. **`radio-button-ui-design`** — НЕ трогаем (уже выведен, ссылка на
   form-controls пиллар стоит).

Итог: два поста, две вставки. Вставки минимальные (1 предложение), без
трихолонов, без em-dash сверх лимита, sentence case.

### Зачем

Связать кластер в структуру «пиллар ↔ сателлит», как это уже сделано
для form-controls. Это также ускоряет переезд авторитета, если позже
будет Фаза B (усиление тела пиллара).

---

## 5. План редиректов и мержа

По образцу dashboard-блока в `next.config.js` (строки 67–88), куда уже
сведены 4 старых D-поста.

1. Добавить правило:
   `{ source: "/blog/figma-to-react-buttons", destination: "/blog/button-ui-design", permanent: true }`
   в секцию «Deprecated … merged into the pillar».
2. Удалить `content/blog/figma-to-react-buttons.mdx` (иначе роут
   продолжит генерироваться и редирект не сработает).
3. Проверить, что нет внутренних ссылок на `/blog/figma-to-react-buttons`
   в других MDX и в `data/` (grep перед коммитом; если есть — перевести
   на пиллар).
4. `radio-button-ui-design` и `button-group-guide` не редиректятся.

Этот коммит идёт третьим, отдельно от заголовков и перелинковки.

---

## 6. Фаза B (вне текущей задачи, отдельный OK)

Пиллар `button-ui-design` в нынешнем виде не пиллар: у него лид-абзац
`Welcome to the world of buttons UI design!` (банклише), устаревшая
структура («Button of the Month»), нет TL;DR, нет decision-таблицы, нет
FAQ, нет чек-листа. Чтобы кластер реально консолидировался, нужен
рефактор тела в reference-style по образцу `data-table-ui-design` и
`form-controls-reference-2026`.

Предлагаемый объём Фазы B (только после отдельного подтверждения):

- Лид answer-first (40–80 слов) вместо «Welcome…».
- TL;DR с 4–5 стрелками.
- Decision-таблица «кнопка vs ссылка vs чип vs иконка-кнопка».
- Секция accessibility по WCAG 2.2 (target size, focus-visible).
- FAQ (5–6 вопросов).
- Чек-лист «before you ship».
- Снять выдуманные/несогласованные усилители, оставить проверяемые ссылки.

**План Фазы B готов отдельным файлом:** [`plans/button-pillar-phase-b-2026-10.md`](button-pillar-phase-b-2026-10.md)
(структура, лид, TL;DR, decision-таблица, WCAG 2.2, FAQ, чек-лист, снятие
дефектов, image-плейсхолдеры). Ждёт отдельного OK. Секция `## Button Group`
по итогам раздела 12 сохраняется (каннибализация не подтвердилась).

---

## 7. План измерения

Контрольная точка: 2–4 недели после деплоя (как в
`content-strengthening-2026-10.md`).

Baseline (6 мес., зафиксировать до правок):

| Пост | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| `button-ui-design` | 71 | 33 399 | 0.21% | 14.31 |
| `button-group-guide` | 270 | 29 285 | 0.92% | 12.35 |
| `figma-to-react-buttons` (после 301) | — | — | — | — |

Что смотрим:
- `button-ui-design`: CTR и позиция по `button ui design` (сейчас 16.20).
  Цель — CTR выше 0.5%, позиция в топ-10 (было 23.55, то есть рост).
- `button-group-guide`: показы и позиция по `button group` (сейчас 802
  показа, 0.25% CTR, позиция 10.25). Цель — вернуть видимость.
- `figma-to-react-buttons`: убедиться, что 301 работает и трафик (если
  был) переехал на пиллар, без потери кликов у `button-ui-design`.
- Общий эффект кластера: суммарные клики трёх URL (кнопочный кластер)
  до и после.

Не измеряем: `radio-button-ui-design` (не часть кластера).

---

## 8. Порядок работы (отдельные коммиты)

Только после явного OK владельца. Все правки MDX — через `apply_diff`
(ни один файл кластера не превышает 500 строк, но правило соблюдаем).

1. **Коммит `seo:`** — заголовки: `button-ui-design`,
   `button-group-guide` (и `figma-to-react-buttons`, если решено оставить).
   Плюс категория `button-ui-design` → `UI Design`. Самопроверка каждого
   файла обязательной командой из AGENTS.md, затем `npm run lint`.
2. **Коммит `content:`** — перелинковка: `button-group-guide` →
   `button-ui-design`, `button-ui-design` → `button-group-guide`.
   Самопроверка, `npm run lint`.
3. **Коммит `chore:`** (или `seo:`) — 301 `figma-to-react-buttons`
   в `next.config.js` + удаление MDX. Проверка `npm run build`.

Каждый шаг — отдельный отчёт, ожидание OK перед следующим.

---

## 9. Что НЕ делать

- Не менять `slug` ни у одного поста: URL остаются прежними (кроме
  удаляемого `figma-to-react-buttons` через 301).
- Не трогать тело `button-ui-design` в этом заходе (это Фаза B).
- Не трогать `radio-button-ui-design` по теме (только не вешать на него
  кнопочную ссылку).
- Не трогать остальные 43 поста с двоеточиями в `title` (это отдельная
  задача `plans/title-colon-cleanup-2026-10.md`).
- Не менять `vercel.json`, `emails/`, `scripts/`, `tsconfig.json`,
  `package.json`, `.eslintrc`.
- Не запускать `check_images.js`, `fix_images.js`, `convert-*.js`,
  `update-references.js`.
- Не удалять обложки и thumbs в `public/` при 301.
- Не делать `git push`.

---

## 10. Что нужно от владельца

1. **OK на план** целиком (или правки по любому пункту).
2. **Выбор заголовков** по каждому посту (раздел 3): номер варианта.
3. **Решение по `figma-to-react-buttons`**: 301 в пиллар (рекомендация)
   или оставить и править заголовок.
4. **Решение по категории** `button-ui-design`: переносить в `UI Design`
   или оставить `Inspiration`.
5. **Решение по Фазе B**: берём ли рефактор тела пиллара отдельной
   задачей сразу после этого кластера или откладываем.

До получения ответов ни один MDX не меняется.

---

## 11. Решения по аудиту (2026-10-11)

- Триколон в интро `button-group-guide` снят (коммит `6d01e2c`).
- Заголовки пиллара и группы заменены (коммит `8096e1e`).
- Якорь `#the-usability-tips` изменён на `#button-group-usability-tips`,
  трафика не имел (в GSC не фигурировал), восстановление не требуется.
- Редирект `permanent: true` в Next.js отдаёт 308, для Google это
  эквивалент 301, менять не нужно.
- Данные «запрос → страница» получены 2026-10-11 и разобраны (раздел 12).

Пункты 1–3 раздела 10 закрыты владельцем.

---

## 12. Анализ GSC «запрос → страница» (2026-10-11)

Источники (окно 6 месяцев, выгрузки по каждой странице отдельно):
`plans/button-ui-design-setproduct.com-Performance-on-Search-2026-10-11/button ui Запросы.csv`,
`plans/button-group-setproduct.com-Performance-on-Search-2026-10-11/btn group Запросы.csv`,
`plans/radio-button-setproduct.com-Performance-on-Search-2026-10-11/radio Запросы.csv`.

### 12.1. Топ-15 запросов по показам (a)

`button-ui-design` (578 строк):

| Запрос | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| button ui templates | 0 | 620 | 0% | 14.33 |
| ui buttons | 0 | 266 | 0% | 15.58 |
| button ui | 0 | 265 | 0% | 17.90 |
| ui button | 0 | 177 | 0% | 17.41 |
| icon button ui | 0 | 141 | 0% | 2.70 |
| button ui design | 4 | 124 | 3.23% | 16.23 |
| buttons ui | 2 | 120 | 1.67% | 17.51 |
| button types ui | 0 | 119 | 0% | 2.05 |
| types of buttons ui | 0 | 118 | 0% | 9.25 |
| what are ui buttons | 0 | 109 | 0% | 9.59 |
| ui buttons meaning | 0 | 105 | 0% | 9.75 |
| ui button design | 0 | 95 | 0% | 21.24 |
| button design best practices ui ux | 0 | 92 | 0% | 15.57 |
| user interface buttons | 0 | 76 | 0% | 16.36 |
| ui interface with interactable buttons | 0 | 72 | 0% | 5.39 |

`button-group-guide` (365 строк):

| Запрос | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| button group | 2 | 741 | 0.27% | 10.55 |
| button group ui | 7 | 531 | 1.32% | 5.97 |
| button group component | 0 | 168 | 0% | 14.15 |
| group button | 0 | 162 | 0% | 5.70 |
| button groups | 2 | 142 | 1.41% | 8.07 |
| fast angular button group | 0 | 129 | 0% | 19.02 |
| button group design | 8 | 121 | 6.61% | 6.83 |
| best terminology for buttons moz | 0 | 114 | 0% | 17.84 |
| group ui | 0 | 105 | 0% | 8.10 |
| javascript button group with rich ui | 0 | 99 | 0% | 7.53 |
| javascript button group design | 0 | 97 | 0% | 7.51 |
| high performance angular button group | 0 | 88 | 0% | 13.17 |
| angular button group with rich ui | 0 | 86 | 0% | 10.98 |
| multiple buttons ui design | 2 | 79 | 2.53% | 5.04 |
| best javascript button group | 0 | 78 | 0% | 15.12 |

`radio-button-ui-design` (252 строки):

| Запрос | Клики | Показы | CTR | Позиция |
|---|---|---|---|---|
| radio button ui | 0 | 704 | 0% | 7.69 |
| radio button design inspiration | 0 | 227 | 0% | 8.12 |
| radio button ui design | 0 | 171 | 0% | 6.80 |
| ui radio button | 0 | 166 | 0% | 8.14 |
| radio card ui | 0 | 153 | 0% | 5.27 |
| radio buttons ui | 0 | 152 | 0% | 7.62 |
| radio button design | 1 | 128 | 0.78% | 9.74 |
| radio button states | 0 | 97 | 0% | 5.00 |
| radio cards ui | 3 | 89 | 3.37% | 5.09 |
| radio button cards | 1 | 88 | 1.14% | 6.90 |
| radio ui design | 0 | 67 | 0% | 5.78 |
| radio group ui | 0 | 65 | 0% | 5.12 |
| radio button card | 1 | 51 | 1.96% | 7.45 |
| radio box ui | 0 | 51 | 0% | 7.76 |
| what does a radio button look like | 0 | 48 | 0% | 8.62 |

### 12.2. Пересечения запросов между страницами (b)

В сырых данных 87 пересечений (запрос показан двум и более страницам),
53 из них с заметным объёмом. Ключевые (формат: показы/клики/позиция):

| Запрос | button-ui-design | button-group-guide | radio-button-ui-design |
|---|---|---|---|
| button group | — | 741 / 2 / 10.55 | 1 / 0 / 10 |
| button ui templates | 620 / 0 / 14.33 | — | 3 / 0 / 9 |
| ui buttons | 266 / 0 / 15.58 | 1 / 0 / 3 | — |
| ui radio button | 1 / 0 / 5 | — | 166 / 0 / 8.14 |
| button types ui | 119 / 0 / 2.05 | 3 / 0 / 1 | — |
| types of buttons ui | 118 / 0 / 9.25 | 1 / 0 / 50 | — |
| ui buttons meaning | 105 / 0 / 9.75 | 1 / 0 / 2 | — |
| button design best practices ui ux | 92 / 0 / 15.57 | 3 / 0 / 11 | — |
| multiple buttons ui design | 2 / 0 / 41 | 79 / 2 / 5.04 | — |
| button | 64 / 0 / 1.80 | 14 / 0 / 39.14 | — |
| ui button types | 51 / 0 / 13.55 | 5 / 0 / 37 | — |
| button design | 46 / 0 / 43.02 | 1 / 0 / 13 | — |
| type of button ui | 45 / 0 / 13.07 | 4 / 0 / 48 | — |
| button ui ux choices | 44 / 0 / 18.18 | 22 / 0 / 14.77 | 2 / 0 / 4.5 |
| button hierarchy ui | 3 / 0 / 30.67 | 42 / 0 / 3.55 | — |
| type of buttons ui | 40 / 0 / 7.12 | 3 / 0 / 42.33 | — |
| best practices for designing effective ui buttons ux design | 4 / 0 / 15.5 | 39 / 0 / 8.9 | — |
| javascript split button with rich ui | 1 / 0 / 97 | 34 / 0 / 29.38 | — |
| best javascript split button in the market | 1 / 0 / 90 | 29 / 0 / 39.86 | — |
| multiple button ui | 1 / 0 / 39 | 21 / 0 / 9 | — |
| multi action button ui | 1 / 0 / 39 | 13 / 0 / 8.31 | — |
| how to design effective ui buttons best practices | 5 / 0 / 15 | 11 / 0 / 8.82 | — |
| multiple action buttons ux | 3 / 0 / 42 | 10 / 0 / 12.6 | — |
| select button ui | 9 / 0 / 23.89 | 6 / 0 / 14.83 | — |
| double button ui | 1 / 0 / 16 | 8 / 0 / 11.62 | — |
| button guide | 6 / 0 / 9.33 | 2 / 0 / 5.5 | — |
| button selection | 1 / 0 / 3 | 6 / 0 / 13.33 | — |
| button hierarchy | 1 / 0 / 75 | 6 / 0 / 14.33 | — |

Строгое «плечо к плечу» (обе страницы ≥5 показов по одному запросу) —
всего 5 запросов:

| Запрос | button-ui-design | button-group-guide | Выше |
|---|---|---|---|
| button | 64 / 1.80 | 14 / 39.14 | пиллар |
| ui button types | 51 / 13.55 | 5 / 37 | пиллар |
| button ui ux choices | 44 / 18.18 | 22 / 14.77 | сателлит |
| select button ui | 9 / 23.89 | 6 / 14.83 | сателлит |
| how to design effective ui buttons best practices | 5 / 15 | 11 / 8.82 | сателлит |

### 12.3. Ответы J1 и J2 (c)

**J1. Показы `button-ui-design` по запросам со словом «group»:** практически
нет. Единственное совпадение — `swiftui button group` (показ 1, клики 0,
позиция 2). Суммарные показы по всем «group»-запросам: пиллар **1**,
сателлит **5 660**, radio **101**. Интент «button group» полностью у сателлита.

**J2. Показы `radio-button-ui-design` по «button…» без «radio»:** практически
нет. Суммарно 43 показа по 14 запросам, и это в основном омонимы «radio»:
`radial buttons` (15), `radial button` (9), `radial button ui`, `radial dial
button`, `radial selection button`, `stereo buttons`. Собственно кнопочных
без radio всего четыре и все микроскопические: `option button ui` (4, поз. 1.75),
`button ui templates` (3, поз. 9), `button ui ux choices` (2, поз. 4.5),
`accessible buttons` (1, поз. 1). Конкуренции пиллару нет.

### 12.4. Вывод (d)

**Каннибализация НЕ подтверждена.** Интенты разделены чисто:
`button-group-guide` единолично держит «group» (5 660 против 1 показа у
пиллара), `button-ui-design` держит «button ui / типы кнопок» (по `button`,
`ui buttons`, `button types ui`, `ui button types` он первый с позициями
1.8–9.25 против провальных 37–50 у сателлита), `radio-button-ui-design`
держит только «radio». Пересечение ограничено 5 запросами, где у каждой
страницы свой набор сильных запросов. Канонический владелец спорных
запросов: `button` и `ui button types` — пиллар `button-ui-design`;
`button ui ux choices`, `select button ui`, `how to design effective ui
buttons best practices` — сателлит `button-group-guide`. Реальная проблема
кластера — нулевой CTR на собственных топ-запросах (`button ui templates`
620 показов / 0 кликов; `radio button ui` 704 / 0; `button group` 741 / 2),
то есть потолок сниппета, а не борьба страниц.

### 12.5. Что меняем

Каннибализация не подтвердилась, поэтому секцию `## Button Group` в
пилларе **не сокращаем** — по «group»-запросам пиллар не показывается,
вреда нет. Предложение (жду OK, без правок MDX):

1. **Усилить перелинковку** (список D3 аудита): по одной контекстной ссылке
   на пиллар из `how-to-design-dialogs`, `pricing-ui-design`,
   `chip-ui-design`, `toggle-switch-ui-design`. Отдельный коммит `content:`.
2. **Сниппет-фикс в рамках Фазы B**: answer-first лид, TL;DR и
   decision-таблица бьют ровно в нулевой CTR по `button ui templates` /
   `ui buttons` (позиции 14–17 при 0 кликов).
3. **Сателлиту** `button-group-guide` — отдельная задача по сниппету под
   `button group` (741 показ, позиция 10.55, CTR 0.27%) вне объёма Фазы B.

# Кнопочный кластер: роли, заголовки, перелинковка (октябрь 2026)

**Дата:** 2026-10-11. **Режим:** code. Код пока не менялся.
**Ветка:** `seo/button-cluster-2026-10` (не main), рабочее дерево чистое.
**Источники:** `.ai/content-strategy.md` (раздел 7, блок «Подтверждённая
каннибализация: button cluster»), `plans/compare 6 months - Страницы.csv`,
`plans/compare 6 months - Запросы.csv`, `plans/title-colon-cleanup-2026-10.md`,
`plans/dashboard-pillar-analysis.md` (эталон разбора),
`plans/content-strengthening-2026-10.md` (эталон формата),
`next.config.js` (раздел redirects), коммиты `2fc6311` / `dea89a6`
(образец перелинковки на form-controls пиллар).

---

## Итог одной строкой

Каннибализация подтверждена не «тремя постами на один интент», а точнее:
**два разных интента смешаны в одной выдаче**. `button-group-guide` держит
интент «button group» (группа кнопок), `button-ui-design` держит интент
«button ui design / анатомия кнопки». Третий «конкурент»,
`radio-button-ui-design`, к кнопке-действию отношения не имеет, это radio
как form control, и он уже ушёл в form-controls кластер. Четвёртый пост,
`figma-to-react-buttons`, дублирует пиллар по теме «кнопки в Figma и React»
и подлежит 301.

Изменения этой задачи: роли страниц, заголовки, перелинковка, 301.
Переписывание тел�� пиллара в reference-style выносится отдельным шагом
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
| `button ui design` | 4 | 125 | 3.20% | 16.20 | было 23.55, позиция просела |
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
  см. раздел 2.5), перелинковка н�� сателлит.
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
  роут не г��нерировался.
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

Пр�� выборе 301 загол��вок не правится: файл удаляется.

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

Это отдельная задача на отдельном OK. В текущий заход не входит.

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
- `button-ui-design`: CTR и позици�� по `button ui design` (сейчас 16.20).
  Цель — CTR выше 0.5%, позиция в топ-10.
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
5. **Решение по Фазе B**: берём ли рефактор тела пиллара от��ельной
   задачей сразу после этого кластера или откладываем.

До получения ответов ни один MDX не меняется.

# Третий визуал — hidden-minutes-slowing-your-business-down: «15 минут в день»

## 1. Какую мысль закрывает картинка

Обложка даёт эмоцию, [`img-1`](public/blog/assets/hidden-minutes-slowing-your-business-down/img-1.webp) показывает карту дня с шестью утечками, [`img-2`](public/blog/assets/hidden-minutes-slowing-your-business-down/img-2.webp) объясняет метод аудита (карта трения одного процесса, шаги value/required). Общего у статьи не хватало одного: **наглядно показать, что маленькая ежедневная экономия не «мелочь»**.

Тезис звучит в закрывающем абзаце [`The objective is to reserve human attention…`](content/blog/hidden-minutes-slowing-your-business-down.mdx:155): «Added together, those minutes can become one of the most valuable productivity improvements a business makes». Идея «минуты складываются» произносится словами, но нигде не показана числом. Задача третьего визуала — превратить абстрактное «складываются» в конкретную арифметику: **15 минут в день → 75 минут в неделю → около 5 часов в месяц → около 65 часов в год**.

Почему берём именно 15 минут: это минимальная, почти незаметная единица, которую легко обесценить («ну, четверть часа»). Контраст между «безобидными 15 минутами» и «полутора рабочими неделями за год» — самый сильный аргумент всей статьи, и он лучше всего удерживается визуально, а не фразой.

### Арифметика (единая для всех трёх версий)

- 15 минут в день.
- 5 рабочих дней в неделю → 75 минут в неделю.
- ~21 рабочий день в месяц → ~315 минут ≈ 5,25 часа в месяц.
- ~250 рабочих дней в год → ~3 750 минут = **~62,5 часа ≈ 65 часов в год**, это **больше полутора рабочих недель** (при 40-часовой неделе).

Числа в промптах округлены до читаемых (15 / 75 / 5 часов / 65 часов), чтобы инфографика не выглядела калькуляцией.

---

## 2. Общая дизайн-система для всех трёх версий

- **Фон: строго белый `#ffffff`**, без градиентов, теней, текстур, шума.
- Палитра: акцент Setproduct `#7c4dff`, нейтральный текст и иконки `#19181b`, волосяные линии и нейтральные плитки `#e5e7eb`, белый `#ffffff` для текста внутри цветных чипов.
- Стиль: плоский вектор, штрих 1.5px, радиус 8px, много воздуха, без фотореализма, без 3D, без лиц и людей, без стоковых офисных сцен.
- Типографика: геометрический sans для подписей-фраз, **monospace для всех чисел, единиц и счётчиков**.
- Цветовая кодировка не конфликтует с img-2: там `#22c55e` = «ценный шаг», `#ef4444` = «трение». Здесь ни зелёный, ни красный **не используются** — третий визуал строится только на фиолетовом акценте и нейтрали, чтобы не вводить новых смыслов в ту же палитру.
- Никаких брендов, логотипов и названий продуктов.
- Внутри картинки только короткие метки и числа, вся аргументация остаётся в тексте статьи.

---

## 3. Три версии (промпты для генерации)

### Версия 1 — «Компаундная лестница»: 15 минут растут в год

**Тип:** accumulation staircase, four rising steps with a period baseline. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Minimal flat-vector infographic on a strictly pure white background, no gradients, no shadows, no textures, no photorealism. The composition reads as an ascending staircase of four rounded rectangle steps rising left to right, each step taller than the one before. The lowest and shortest step is labeled in monospace: 15 MIN A DAY. The second step, roughly twice as tall, reads 75 MIN A WEEK. The third step reads ABOUT 5 HOURS A MONTH. The fourth and tallest step, a solid purple #7c4dff block, reads ABOUT 65 HOURS A YEAR, and beside its top edge sits a bold rounded chip in near-black #19181b with white monospace text reading MORE THAN A WEEK AND A HALF OF WORK. A thin light grey #e5e7eb baseline runs beneath the whole staircase, marked with four small tick labels in monospace: DAY, WEEK, MONTH, YEAR. On the far left, a single small tile shows one fifteen-minute block as a quarter of a clock face, drawn with a thin purple #7c4dff arc, to anchor the starting unit visually. Keep the upper third calm and airy, the staircase centered, and the lower third holding the baseline with its four period labels. Palette strictly purple #7c4dff for the growth blocks and the arc, near-black #19181b for text and the summary chip, light grey #e5e7eb for connectors, baseline and hairlines. Flat vector, 16:9, thin 1.5px strokes, rounded corners, generous negative space, monospace for every number and step label, geometric sans for the small headline reading small minutes, large total. No people, no 3D, no photorealism, no brand logos.
```

### Версия 2 — «Одна четверть часа, размноженная»: плитка, повторённая в сетку

**Тип:** single unit multiplied into a grid, growing saturation. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Flat technical infographic on a pure white background showing one small unit repeated into a large count, no gradients, no shadows, no textures, no photorealism. In the upper left, a single isolated rounded square tile is drawn larger and more detailed, containing a thin purple #7c4dff clock arc marking one quarter of an hour, with a monospace label beneath reading 15 MIN. A thin light grey #e5e7eb arrow leads right from this detailed tile into a wide grid of many small identical tiles, arranged in neat rows and columns, each a light grey #e5e7eb rounded square with a tiny purple dot in its center. The grid visibly grows denser and turns progressively more purple as it fills toward the right, so the final column is fully saturated, suggesting accumulation across a working year. Above the grid, a single monospace counter reads WORKING DAYS 250. Along the bottom of the grid a bold rounded chip in purple #7c4dff carries white monospace text reading 65 HOURS A YEAR, and a small outline chip beside it reads ONE AND A HALF WORK WEEKS. Beneath everything, one short line in geometric sans reads fifteen minutes, counted honestly. Keep white margins generous and the grid as the visual center. Palette strictly purple #7c4dff accents, light grey #e5e7eb tiles, near-black #19181b for text and the counter. Flat vector, 16:9, thin 1.5px strokes, rounded corners, monospace for numbers and labels, geometric sans for the caption, no people, no 3D, no photorealism, no brand logos.
```

### Версия 3 — «Год как календарь-сетка»: честный год из плиток

**Тип:** full-year block calendar with a compact bar summary. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Minimal flat-vector calendar infographic on a strictly pure white background, no gradients, no shadows, no textures, no photorealism. The frame shows a full working year as a grid of small squares grouped into twelve vertical columns, one per month, each column labeled beneath in monospace from JAN through DEC. Every square stands for one working day and carries a faint purple tint because it saved fifteen minutes. A small number of squares across different weeks are left empty and outlined in light grey #e5e7eb to mark days with no saving, so the grid reads as honest rather than perfect. In the top right corner, a compact vertical bar chart summarizes the climb: four short purple #7c4dff bars labeled MONTH 1, MONTH 3, MONTH 6, YEAR, rising gently left to right, each ending in a white monospace figure. Across the bottom, a single bold rounded chip in near-black #19181b carries white monospace text reading YEAR TOTAL 65 HOURS, and beside it a small outline chip in purple #7c4dff reads ONE EXTRA WORK WEEK AND A HALF. A short caption in geometric sans sits above the grid reading fifteen minutes a day, filled in quietly. Keep the left two thirds for the calendar grid and the right third for the bar summary, with the caption spanning the top. Palette strictly purple #7c4dff accents, light grey #e5e7eb for the empty squares and hairlines, near-black #19181b for text and the summary chip. Flat vector, 16:9, thin 1.5px strokes, rounded corners, monospace for months, numbers and totals, geometric sans for the caption, no people, no 3D, no photorealism, no brand logos.
```

---

## 4. Рекомендованное размещение в статье

Все три версии визуализируют один тезис, поэтому слот у них общий.

| Версия | Куда вставлять | Зачем |
|---|---|---|
| Версия 1 (компаундная лестница) | Сразу после закрывающего абзаца [`The objective is to reserve human attention…`](content/blog/hidden-minutes-slowing-your-business-down.mdx:155), перед `## Frequently asked questions` | Абзац произносит тезис «минуты складываются», лестница тут же его считает. Самый простой и однозначный слот |
| Версия 2 (плитка, размноженная) | Там же | Показывает ту же арифметику через «одна единица → много единиц», чуть абстрактнее, но меньше похожа на график |
| Версия 3 (год-календарь) | Там же | Самая «честная»: видно, что год состоит из дней, часть без экономии. Тяжелее и детальнее остальных |

Рекомендация: **Версия 1**. Она читается с одного взгляда, держит ровно четыре числа и не конкурирует по плотности с img-2, который тоже насыщен подписями. Версия 2 — если хочется меньше «отчётности». Версия 3 уместна, только если статья вырастет в отдельный лонгрид про экономию времени.

Итог по визуальному ритму: статья получает картинку на входе (обложка + img-1), объясняющую середину (img-2) и цифровой финал перед FAQ. Закрывающий абзац перестаёт быть длинным текстовым прогоном без опоры.

---

## 5. Что НЕ делать

- Не смешивать тёмный и светлый фон: визуал строго на белом `#ffffff`.
- Не использовать зелёный `#22c55e` и красный `#ef4444` — они закреплены за img-2 (value / friction), здесь это внесёт путаницу.
- Не показывать «идеальный» год без пропусков: часть дней должна быть пустой, иначе цифра читается как реклама.
- Не добавлять фотореалистичных людей, 3D-рендеры, офисные стоковые сцены и лица.
- Не использовать градиенты, тени, текстуры: только плоский вектор и волосяные линии.
- Не рисовать часы-«будильники», денежные знаки и графики вверх-вправо «до небес» — это банклише роста.
- Не перегружать подписями: не больше четырёх ключевых чисел на картинку (15 / 75 / 5 / 65).
- Не вставлять названия компаний, логотипы и продукты.

---

## 6. Что обновить после генерации

1. Положить выбранную версию в [`public/blog/assets/hidden-minutes-slowing-your-business-down/img-3.webp`](public/blog/assets/hidden-minutes-slowing-your-business-down/) (сначала полный размер, затем оптимизировать до 1600×900 webp).
2. Вставить в статью после абзаца [`The objective is to reserve human attention…`](content/blog/hidden-minutes-slowing-your-business-down.mdx:155) с alt-текстом вида: «Small bars showing fifteen minutes a day growing into seventy-five minutes a week, five hours a month and about sixty-five hours a year, more than a week and a half of work».
3. Проверить ритм: на странице будут три смысловые картинки плюс обложка, следить, чтобы img-2 и новый визуал не стояли рядом в одном разделе.
4. Прогнать self-check MDX (`grep` em-dash, заголовочные двоеточия, длина title/description) и `npm run lint`.

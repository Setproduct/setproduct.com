# Визуализация самого сложного момента — where-to-launch-startup-2026

## 1. Самый сложный для понимания момент

**Скоринговая система: 6 платформ × 5 критериев + сквозная идея «half-life».**

Это единственное место в статье, где на читателя разом обрушивается плотный массив данных, а не текст:

- Определение пяти критериев — узкая таблица в [`where-to-launch-startup-2026.mdx:54`](content/blog/where-to-launch-startup-2026.mdx:54).
- Сам scorecard — широкая таблица 6×5 (30 ячеек) в [`:64`](content/blog/where-to-launch-startup-2026.mdx:64).
- Абстрактный критерий «Half-life» повторяется потом ещё четыре раза текстом, без единой визуальной опоры: PH badge живёт годами, но апвоуты не конвертят ([`:81`](content/blog/where-to-launch-startup-2026.mdx:81)), HN-тред умирает за 24-48 часов ([`:111`](content/blog/where-to-launch-startup-2026.mdx:111)), Reddit-тред живёт в Google годами ([`:68`](content/blog/where-to-launch-startup-2026.mdx:68)), X даёт спайк и тишину ([`:69`](content/blog/where-to-launch-startup-2026.mdx:69)).
- Инструкция «Read rows instead of totals» ([`:73`](content/blog/where-to-launch-startup-2026.mdx:73)) требует от читателя самостоятельно построить в голове паттерн, который проще один раз увидеть.

Почему это тяжелее всего остального:

1. **Тридцать точек данных сразу.** Ни одна другая часть статьи не требует держать в голове матрицу такого размера. Decision-таблица «какая платформа для какого продукта» ([`:169`](content/blog/where-to-launch-startup-2026.mdx:169)) тоже плотная, но она текстовая (названия платформ), а не числовая — читать её легче.
2. **Абстрактная метрика без единиц измерения.** «Half-life» — не число из scorecard-таблицы (там это условная оценка 1-5), а временной процесс: скорость затухания трафика. Статья описывает его четыре раза разными словами вместо одного графика распада.
3. **Всё остальное в статье ссылается на этот блок.** Секции про PH, HN, Reddit, X и итоговая decision-таблица — это развёртка одной и той же строки scorecard в прозу. Если читатель не удержал scorecard в голове, весь последующий текст читается как несвязанные утверждения.

**Ближайший конкурент (второе место):** decision-таблица «какая платформа для какого продукта» ([`:169`](content/blog/where-to-launch-startup-2026.mdx:169)). Она тоже требует сопоставления, но по природе она категориальная (текст, а не числа), поэтому нагрузка ниже, чем у числового scorecard.

---

## 2. Общая дизайн-система для всех трёх версий

- **Фон: строго белый `#ffffff`**, без градиентов, теней, текстур, шума.
- Акцент бренда: `#7c4dff` (Setproduct purple). Дополнительная категориальная палитра для 6 платформ: Product Hunt `#7c4dff`, Show HN `#ff6600`, Reddit `#ff4500`, X `#19181b`, LinkedIn `#0a66c2`, Smaller directories `#adadad`.
- Нейтральные: текст `#19181b`, волосяные линии `#e5e7eb`, светлый фон блоков `#f7f7f7`.
- Стиль: плоский вектор, штрих 1.5px, радиус 8px, много воздуха, никаких теней и градиентов.
- Типографика: геометрический sans для подписей, monospace для чисел и осей.
- Без людей, без фотореализма, без 3D, без лиц, без стоковых иконок.

---

## 3. Три версии для пункта 1 (радар-диаграмма) — три разных подхода/композиции

Все три варианта визуализируют одну и ту же точку вставки (сразу после scorecard-таблицы), но разными идеями и композицией, чтобы можно было выбрать наиболее читаемую.

### Approach A — Radar / spider chart (five axes, six overlapping shapes)

**Type:** flat vector radar chart. **Ratio:** 1:1. **Background:** strictly white.

```text
Clean flat vector radar chart (spider chart) on a strictly pure white background, no gradients, no shadows, no textures, no drop shadows. A pentagon grid with five axes radiating from the center, each axis labeled in small geometric sans caps: REACH, AUDIENCE FIT, BACKLINK VALUE, LOW EFFORT, HALF-LIFE. The grid has three concentric pentagon rings representing scores 1, 3 and 5, drawn in thin light grey hairlines #e5e7eb with small numeral labels 1, 3, 5 in monospace next to the top axis only.

Plot six overlapping pentagon outlines, each a different platform, each with its own thin 2px stroke color and a small filled dot at each vertex, no fill inside the shapes so all six remain readable through each other: Product Hunt in purple #7c4dff drawn as a mid-sized balanced pentagon, Show HN in orange #ff6600 drawn tall and narrow with very high audience fit and very low half-life, Reddit in red-orange #ff4500 drawn stretched toward audience fit and half-life but pinched on effort, X in near-black #19181b drawn small and pinched except on effort, LinkedIn in blue #0a66c2 drawn narrow and tall only on audience fit, Smaller directories in grey #adadad drawn small overall but stretched on backlink value.

Add a clean horizontal legend below the chart: six small color swatches paired with platform names in geometric sans, monospace nowhere except the axis numerals. Title above the chart in bold sans: "Six platforms, five axes — same scorecard, different shapes." Keep the composition centered, generous white margins on all sides, perfect 1:1 square crop, thin 1.5px strokes throughout, rounded terminals, no people, no 3D, no photorealism, no stock-illustration look.
```

### Approach B — Small-multiples bar grid (one mini bar chart per platform)

**Type:** flat vector small-multiples grid of bar charts. **Ratio:** 4:3. **Background:** strictly white.

```text
Flat vector small-multiples infographic on a strictly pure white background, no gradients, no shadows, no textures. The layout is a clean 3-by-2 grid of six identical mini bar-chart cards, one per platform, each card separated by thin grey hairlines #e5e7eb and framed by a rounded 8px border. Each card has a small platform name at the top in bold geometric sans, using its own accent color: Product Hunt purple #7c4dff, Show HN orange #ff6600, Reddit red-orange #ff4500, X near-black #19181b, LinkedIn blue #0a66c2, Smaller directories grey #adadad.

Inside each card, draw five short vertical bars side by side, same height scale across all six cards so comparison is honest, each bar representing one criterion in this fixed left-to-right order: Reach, Audience fit, Backlink, Effort, Half-life. Bars use the platform's own accent color at full height for high scores and a very light tint of the same color for low scores, with a thin dotted baseline at zero. Add tiny monospace numerals 1 to 5 above each bar showing its exact score from the article's scorecard, so the chart reads as a precise lookup rather than a vague impression.

Underneath the whole grid, add one slim horizontal caption strip in monospace: "Same five bars, six shapes — read top to bottom, not side to side." At the very top of the composition, add a short title in bold sans: "The scorecard, one platform at a time." Keep generous white margins, thin 1.5px strokes, rounded corners, flat vector throughout, no gradients, no shadows, no people, no 3D, no photorealism, 4:3 composition.
```

### Approach C — Ranked leaderboard strip (dot-plot ranking per criterion)

**Type:** flat vector ranked dot-plot / leaderboard strip. **Ratio:** 16:9. **Background:** strictly white.

```text
Minimal flat vector infographic on a strictly pure white background, no gradients, no shadows, no textures, styled like a clean leaderboard rather than a traditional chart. Five horizontal rows stack from top to bottom, one row per criterion, each row labeled on the left in bold geometric sans: REACH, AUDIENCE FIT, BACKLINK VALUE, LOW EFFORT, HALF-LIFE. Each row is a thin horizontal track drawn as a light grey hairline #e5e7eb running the full width.

Along each track, place six small circular dots, one per platform, positioned left to right according to that platform's score for that specific criterion, low scores near the left edge and high scores near the right edge. Each dot uses a fixed platform color across all five rows so the eye can trace one platform's journey top to bottom: Product Hunt purple #7c4dff, Show HN orange #ff6600, Reddit red-orange #ff4500, X near-black #19181b, LinkedIn blue #0a66c2, Smaller directories grey #adadad. Connect each platform's five dots with a very thin 1px dotted line of the same color, so six faint zig-zag paths thread down through the five rows, making it easy to spot the platform with the steadiest path versus the one that swings from edge to edge.

Add a compact legend strip at the bottom with six color-name pairs in small geometric sans. Title at the top in bold sans: "Where each platform ranks, criterion by criterion." Keep generous white margins, thin 1.5px strokes, rounded dot edges, flat vector, no people, no 3D, no photorealism, 16:9 composition.
```

### Версия 2 — три подхода для главы Hacker News (график затухания)

Все три варианта визуализируют одну и ту же точку вставки (после абзаца про half-life 24-48 часов в главе Hacker News), но разными идеями и композицией.

#### Approach A — Overlaid decay curves (line chart, five lines on shared axes)

**Type:** flat vector line chart. **Ratio:** 16:9. **Background:** strictly white.

```text
Minimal flat-vector line chart on a strictly pure white background, no gradients, no shadows, no drop shadows, no textures. A simple two-axis coordinate system: horizontal axis labeled DAYS SINCE LAUNCH with tick marks at 0, 2, 7, 14, 30, drawn in thin grey hairlines #e5e7eb; vertical axis labeled ATTENTION / TRAFFIC with no numeric scale, just a faint upward arrow.

Plot five distinct curves, each a different platform with a small text label anchored at the end of its own line, all curves starting from a shared origin point at day 0: a sharp orange #ff6600 curve labeled SHOW HN that spikes steeply then crashes to near zero by day 2, with a small annotation chip reading "dead by 48h" pointing at the cliff; a purple #7c4dff curve labeled PRODUCT HUNT that spikes on day 1 then decays to a low flat plateau continuing faintly to day 30, annotated "badge stays, votes don't"; a near-black #19181b curve labeled X / TWITTER that spikes briefly and drops fast, similar shape to Show HN but a slightly lower peak; a red-orange #ff4500 curve labeled REDDIT that starts lower and slower than the others but keeps climbing gently all the way to day 30, annotated "still ranking in Google"; a grey #adadad curve labeled SMALLER DIRECTORIES drawn as a low, nearly flat line across the entire width, annotated "quiet but steady."

Add a light dotted vertical guideline at day 2 with a small caption above it reading "most launches are judged here — too early." Title at the top in bold geometric sans: "Half-life: how fast each platform's attention decays." Palette limited to the platform colors plus #19181b text and #e5e7eb hairlines. Flat vector, thin 1.5px strokes, rounded line caps, 16:9 composition, generous white margins, monospace only for axis tick labels, no people, no 3D, no photorealism.
```

#### Approach B — Melting icon timeline (metaphorical decay strip, no axes)

**Type:** flat vector metaphorical infographic strip. **Ratio:** 16:9. **Background:** strictly white.

```text
Flat vector metaphorical infographic on a strictly pure white background, no gradients, no shadows, no textures, styled as a horizontal timeline strip rather than a technical chart. Five parallel horizontal rows stack top to bottom, one per platform, each row starting on the left with a small solid rounded icon-chip in the platform's own color: Show HN orange #ff6600, X near-black #19181b, Product Hunt purple #7c4dff, Reddit red-orange #ff4500, Smaller directories grey #adadad. Across each row, four evenly spaced checkpoint markers are labeled underneath in small monospace: DAY 0, DAY 2, DAY 7, DAY 30.

At each checkpoint, redraw the platform's chip smaller and more faded than the previous one, visually "melting" toward a thin outline by the final checkpoint, at a different fade rate per row: Show HN's chip is already a faint outline by Day 2, with a small caption "dead by 48h"; X's chip fades almost as fast, one checkpoint behind; Product Hunt's chip shrinks moderately by Day 7 then holds steady at a small solid dot through Day 30, captioned "badge stays, votes don't"; Reddit's chip barely shrinks at all and even gains a small upward arrow by Day 30, captioned "still ranking in Google"; Smaller directories' chip stays a consistent small pale shape the entire strip, captioned "quiet but steady."

Add a vertical dotted divider at the Day 2 checkpoint with a caption above the whole strip reading "most launches get judged here — too early." Title at the top: "Watch attention melt, checkpoint by checkpoint." Flat vector, 1.5px strokes, rounded shapes, generous white margins, geometric sans labels, monospace only for day markers, no people, no 3D, no photorealism, 16:9 composition.
```

#### Approach C — Stacked half-life bars with a decay-rate arrow

**Type:** flat vector horizontal bar chart + rate indicator. **Ratio:** 16:9. **Background:** strictly white.

```text
Flat vector infographic on a strictly pure white background, no gradients, no shadows, no textures, combining a horizontal bar chart with a decay-rate indicator instead of a curve. Five thick horizontal bars stack top to bottom, one per platform, each bar's total length representing "days until attention effectively hits zero" on a shared horizontal scale from 0 to 30 days, with faint vertical gridlines at 2, 7, 14 and 30 days in thin grey hairlines #e5e7eb.

Each bar starts solid in the platform's own color on the left, then fades through a gradient-free striped or dotted texture toward a thin outline at its own cutoff point: Show HN (orange #ff6600) is a very short solid segment ending abruptly near day 2 with a small red flag icon and caption "dead by 48h"; X (near-black #19181b) ends almost as short, just past day 2; Product Hunt (purple #7c4dff) runs solid to about day 5 then continues as a thin dotted line all the way to day 30, captioned "badge stays, votes don't"; Reddit (red-orange #ff4500) is drawn as the longest bar, solid and even growing slightly thicker toward day 30, captioned "still ranking in Google"; Smaller directories (grey #adadad) is a medium, evenly toned bar reaching mid-way, captioned "quiet but steady."

To the right of each bar, add a tiny arrow icon and a one-word descriptor in monospace indicating decay speed: FAST, FAST, MODERATE, SLOW, STEADY. Title at the top in bold geometric sans: "Half-life at a glance — how long attention actually lasts." Flat vector, 1.5px strokes, rounded bar ends, generous white margins, no people, no 3D, no photorealism, 16:9 composition.
```

### Версия 3 — Комбинация: матрица усилие/отдача + мини-легенда scorecard

**Тип:** quadrant matrix + compact scorecard heatmap. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Flat technical infographic on a pure white background combining a two-axis quadrant matrix with a compact heatmap strip, no gradients, no shadows, no textures. The main area is a large square quadrant plot: horizontal axis labeled LOW EFFORT TO HIGH EFFORT left to right, vertical axis labeled SHORT HALF-LIFE TO LONG HALF-LIFE bottom to top, both drawn as thin grey hairline arrows #e5e7eb with small monospace axis captions. A faint cross of dotted lines divides the plot into four quadrants, each with a small light-grey label in the corner: bottom-left "quick spike, high maintenance," bottom-right "quick spike, easy," top-left "slow burn, high maintenance," top-right "slow burn, easy."

Place six small rounded platform chips as data points inside the matrix, each a colored rounded rectangle with a short label and a tiny icon-like glyph, positioned according to the article's scores: Product Hunt (purple #7c4dff) sits mid-left, low-mid height; Show HN (orange #ff6600) sits far left, very low height; Reddit (red-orange #ff4500) sits far right, very high height; X (near-black #19181b) sits mid-right, very low height; LinkedIn (blue #0a66c2) sits mid-right, low-mid height; Smaller directories (grey #adadad) sits far right, mid height. Draw a thin purple #7c4dff dashed arrow trail connecting Show HN to Product Hunt to Reddit, labeled "one possible 4-week sequence."

Below the matrix, add a slim horizontal heatmap strip: six columns, one per platform, five stacked small cells per column colored on a white-to-purple intensity scale representing the five scorecard criteria (Reach, Audience fit, Backlink, Effort, Half-life), with a tiny row-label column on the left in geometric sans matching the original table order. Title at the top: "Where each platform sits — and one way to sequence them." Palette limited to the platform colors above plus #19181b text and #e5e7eb hairlines, flat vector, 1.5px strokes, rounded corners, 16:9 composition, generous margins, monospace for axis and heatmap labels, no people, no 3D, no photorealism.
```

---

## 4. Рекомендованное размещение в статье

| Версия | Куда вставлять | Зачем |
|---|---|---|
| Версия 1 (радар) | Сразу после scorecard-таблицы, после [`:73`](content/blog/where-to-launch-startup-2026.mdx:73), перед «Keep these two tables open…» | Даёт мгновенный визуальный ответ на «read rows instead of totals» — форма пентагона очевиднее, чем построчное сравнение чисел |
| Версия 2 (кривые затухания) | В разделе Hacker News, после абзаца про half-life, после [`:111`](content/blog/where-to-launch-startup-2026.mdx:111) | Закрывает самую абстрактную и самую повторяющуюся идею статьи — распад внимания во времени — именно там, где падение звучит наиболее резко (24-48 часов) |
| Версия 3 (матрица + heatmap) | Перед разделом «Which platform for which product», перед [`:165`](content/blog/where-to-launch-startup-2026.mdx:165) | Служит визуальным мостом между сырым scorecard и текстовой decision-таблицей, показывая ту же логику выбора платформы графически перед тем, как читатель встретит её текстом |

Итог по визуальному ритму: три белые инфографики разной формы (квадрат, широкий график, широкая матрица) распределены по всей длине статьи — сразу после intro-таблиц, в середине (HN-секция) и перед финальной decision-таблицей. Это ломает монотонность длинного прогона из шести H2-секций подряд без единой картинки, кроме img-1 в самом начале.

---

## 5. Что НЕ делать

- Не смешивать тёмный и светлый фон в одной серии — все три строго на белом.
- Не добавлять фотореалистичных людей, 3D-рендеры и стоковые метафоры.
- Не использовать градиенты и тени — только плоский вектор и волосяные линии.
- Не менять цветовую привязку платформ между тремя версиями — Product Hunt всегда `#7c4dff`, Show HN всегда `#ff6600` и так далее, иначе читатель не свяжет три картинки в одну систему.

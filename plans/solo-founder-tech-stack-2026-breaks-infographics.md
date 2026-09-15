# Портретная инфографика главы «Where this stack breaks» — solo-founder-tech-stack-2026

**Глава-цель:** `## Where this stack breaks` ([`solo-founder-tech-stack-2026.mdx:314`](content/blog/solo-founder-tech-stack-2026.mdx:314)) и пять подразделов H3 [`:318`](content/blog/solo-founder-tech-stack-2026.mdx:318)–[`:336`](content/blog/solo-founder-tech-stack-2026.mdx:336).

**Точка вставки:** заменить старый MDX-комментарий `solo-founder-tech-stack-2026-breaks.webp` ([`:338`](content/blog/solo-founder-tech-stack-2026.mdx:338)) — он тёмный и горизонтальный, не подходит под новую бело-инфографическую серию.

**Формат:** портрет 3:4 (вертикальный), чтобы все пять пунктов встали сверху вниз в правильном порядке. **Фон строго белый `#ffffff`** — в единой серии с уже вставленными [`img-1.webp`](public/blog/assets/solo-founder-tech-stack-2026/img-1.webp) (схема RLS) и [`img-2.webp`](public/blog/assets/solo-founder-tech-stack-2026/img-2.webp) (карандашная сцена).

**Что должно быть в каждой версии — пять фактов из текста:**

| № | Тема | Симптом | Фикс из статьи |
|---|---|---|---|
| ❶ | Vendor lock-in on Supabase Auth | сессии и юзеры залипают, Postgres уезжает легко | решить рано, дальше только сложнее |
| ❷ | Vercel costs at scale | рост счёта с трафиком | $20 VPS + Coolify, Railway, Fly.io на 10K |
| ❸ | Cursor writing insecure code confidently | запрос в обход RLS, ключ в браузере | читать каждый diff по auth, данным, деньгам |
| ❹ | Figma drift | токены расходятся с кодом | дисциплина + токены текут только Figma → код |
| ❺ | No background jobs out of the box | письма, отчёты, ретраи некуда повесить | Inngest или Trigger.dev заранее |

**Палитра:** акцент `#7c4dff`, фикс `#22c55e`, опасность `#ef4444`, текст `#19181b`, волосяные линии `#e5e7eb`. Monospace для имён инструментов, geometric sans для подписей. Плоский вектор, без градиентов и теней, без людей и фотореализма.

---

## Версия 1 — «Трещина на дороге вниз»

**Тип:** вертикальный path-таймлайн. **3:4, строго белый фон.**

```text
Portrait 3:4 flat vector infographic on a strictly pure white background, no gradients, no shadows, no textures. The composition is a single winding road that descends vertically from top to bottom, getting cracked and broken as it goes, drawn with a thin 1.5px near-black stroke. Along the road sit five numbered milestones in order, each marked with a filled purple circle ❶ through ❺ and a horizontal rule connecting it to a compact two-line label block.

Milestone ❶ is titled VENDOR LOCK-IN — SUPABASE AUTH, with a small padlock fused to a database cylinder icon, and a red caption reading users do not move easily. Milestone ❷ is titled VERCEL COSTS AT SCALE, with a small coin stack growing taller and a red caption reading the bill tracks traffic. Milestone ❸ is titled CURSOR WRITES INSECURE CODE, marked with a warning triangle over a code bracket and a red caption reading skips RLS, quietly. Milestone ❹ is titled FIGMA DRIFT, with two parallel lines slowly separating and a red caption reading tokens become fiction. Milestone ❺ is titled NO BACKGROUND JOBS, with a clock icon and a queue of tiny envelopes waiting, red caption reading nowhere to run them.

At the bottom of the road, place a green rounded chip for each fix in a single column, each connected by a thin upward arrow: decide early on auth, move compute at 10K, review every diff, keep tokens one-way, add a job runner before you need it. Add a slim vertical severity bar on the right edge with five ticks, filled progressively in red from ❶ to ❺. Palette #7c4dff, #22c55e, #ef4444, text #19181b, hairlines #e5e7eb. Monospace for tool names, geometric sans for labels, flat vector, 3:4 portrait, generous margins, no people, no 3D, no photorealism.
```

---

## Версия 2 — «Пятисегментный тотем»

**Тип:** вертикальная стека-диаграмма со шкалой. **3:4, строго белый фон.**

```text
Portrait 3:4 flat vector infographic on a purely white background, no gradients, no shadows. The hero element is a tall vertical pillar divided into five stacked segments, centered on the canvas, drawn with hairline strokes and rounded 8px corners. Each segment is numbered with a purple circle ❶ through ❺ and carries a small icon plus a monospace tool label.

From top to bottom: segment ❶ labeled SUPABASE AUTH with a lock icon and the line the sticky layer; segment ❷ labeled VERCEL with a rising cost curve and the line compute economics; segment ❸ labeled CURSOR with a red warning triangle and the line silent security slip; segment ❹ labeled FIGMA with two diverging lines and the line design drift; segment ❺ labeled JOBS with a clock icon and the line no queue at all.

Each segment has a visible hairline crack running through it in red, crack size growing slightly as it descends. To the left of the pillar, place a narrow vertical severity gauge marked low at top and high at bottom with five ticks, each tick aligned to one segment and filled red in increasing opacity. To the right of the pillar, align a green fix chip for every segment, connected by a short horizontal arrow, reading: plan an auth exit, revisit at 10K, read every diff, enforce one-way tokens, pick Inngest or Trigger.dev.

Add a small legend in the bottom right with three swatches: purple structure, red failure, green fix. Palette #7c4dff, #22c55e, #ef4444, #19181b, #e5e7eb. Flat vector only, monospace for tool names, geometric sans for captions, thin strokes, 3:4 portrait, lots of white space, no gradients, no human figures, no photorealism, no 3D.
```

---

## Версия 3 — «Портретная стопка билетов»

**Тип:** пять карточек-билетов сверху вниз + аварийный штамп. **3:4, строго белый фон.**

```text
Portrait 3:4 flat vector infographic on a strictly white background, no gradients, no shadows, no textures. The composition is a vertical stack of five wide ticket-style cards, each with a perforated left edge drawn as tiny dashed circles, a number badge ❶ through ❺ in purple, and a thin bottom hairline. Each card contains four elements stacked in a small grid: a monospace tool name, a small line icon, a one-line symptom in red, and a green pill-shaped fix chip on the right.

Card ❶ tool SUPABASE AUTH, icon a padlock fused to a cylinder, symptom accounts do not migrate easily, fix chip decide early. Card ❷ tool VERCEL, icon a coin stack, symptom bill tracks bandwidth, fix chip move compute at 10K. Card ❸ tool CURSOR, icon a warning triangle inside code brackets, symptom silently skips RLS, fix chip review every diff. Card ❹ tool FIGMA, icon two diverging lines, symptom tokens become fiction, fix chip enforce one-way flow. Card ❺ tool INNGEST, icon a clock above a queue, symptom no home for jobs, fix chip add a runner early.

Across the whole stack, run a faint vertical arrow on the far left labeled order you will hit them, pointing downward from ❶ to ❺. At the bottom, place a wide horizontal summary strip with a stamp-like border containing the line five known breaks, five cheap fixes, set in monospace, with a small purple checkmark. Add a compact legend top right with three swatches: red symptom, green fix, purple order. Palette #7c4dff, #22c55e, #ef4444, #19181b, #e5e7eb. Flat vector, monospace for tool names, geometric sans for labels, thin 1.5px strokes, rounded 8px corners, 3:4 portrait, generous white margins, no gradients, no shadows, no people, no 3D, no photorealism.
```

---

## Как выбрать

| Версия | Сильная сторона | Когда брать |
|---|---|---|
| 1 — дорога вниз | порядок и рост серьёзности читаются сразу | если нужен акцент на «в каком порядке вы это встретите» |
| 2 — тотем | самый компактный, хорошо смотрится рядом с текстом H3 | если картинка идёт в узкую колонку после списка |
| 3 — стопка билетов | максимум конкретики: симптом и фикс на каждой строке | если нужна максимальная понятность без чтения абзацев |

Рекомендую **Версию 3** — она даёт по каждой из пяти точек и симптом, и фикс, то есть работает как самодостаточный визуальный конспект всей главы. Клади как `img-3.webp` в [`public/blog/assets/solo-founder-tech-stack-2026/`](public/blog/assets/solo-founder-tech-stack-2026), и я вставлю её вместо старого тёмного плейсхолдера `solo-founder-tech-stack-2026-breaks.webp`.

# Визуализация самого сложного момента — solo-founder-tech-stack-2026

## 1. Самый сложный для понимания момент

**Модель безопасности: связка «Row Level Security + anon key + service role key».**

Это единственное место, где читателю приходится мысленно склеить **три разнесённых по тексту блока**:

- Layer 3 — как работает RLS ([`solo-founder-tech-stack-2026.mdx:184`](content/blog/solo-founder-tech-stack-2026.mdx:184)), SQL-политика `auth.uid() = user_id` ([`:192`](content/blog/solo-founder-tech-stack-2026.mdx:192)).
- Layer 4 — два ключа с противоположными правами ([`:223`](content/blog/solo-founder-tech-stack-2026.mdx:223)), `.env.example` с комментариями ([`:227`](content/blog/solo-founder-tech-stack-2026.mdx:227)).
- Failure point #3 — агент молча пишет код в обход RLS ([`:324`](content/blog/solo-founder-tech-stack-2026.mdx:324)).

Почему это тяжелее всего остального:

1. **Три сущности вместо одной.** Публичный ключ, секретный ключ и политика — читатель должен держать их в голове одновременно, чтобы понять, почему один ключ безопасен в браузере, а второй равен утечке всей базы.
2. **Невидимый провал.** Ошибка не ломает билд и не видна в тестах — «default is wide open» ([`:209`](content/blog/solo-founder-tech-stack-2026.mdx:209)). Абстракция без визуальной опоры запоминается хуже всего.
3. **Двунаправленная логика.** RLS меняет обычную модель БД на противоположную: база сама проверяет, кто спрашивает, вместо доверия к тому, кто подключился ([`:186`](content/blog/solo-founder-tech-stack-2026.mdx:186)).

**Ближайший конкурент (второе место):** абстрактный тезис «state as text» и вся цепочка хендоффов Figma → Cursor → Supabase → Vercel ([`:50`](content/blog/solo-founder-tech-stack-2026.mdx:50), [`:414`](content/blog/solo-founder-tech-stack-2026.mdx:414)). Но там читатель имеет бытовую интуицию, а модель ключей — это защита данных, поэтому провал в понимании стоит дороже.

---

## 2. Общая дизайн-система для всех трёх версий

- **Фон: строго белый `#ffffff`**, без градиентов, теней, текстур, шума.
- Палитра: акцент Setproduct `#7c4dff`, безопасное `#22c55e`, опасное `#ef4444`, текст `#19181b`, волосяные линии `#e5e7eb`.
- Стиль: плоский вектор, штрих 1.5px, радиус 8px, много воздуха.
- Типографика: геометрический sans для подписей, **monospace для кода и имён ключей**.
- Без людей, без фотореализма, без 3D и без лиц.

---

## 3. Три версии (промпты для генерации)

### Версия 1 — Схема потоков: путь двух ключей через стек

**Тип:** flat vector system schematic. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Clean flat vector system schematic on a pure white background, no gradients, no shadows, no textures. The diagram shows two parallel request lanes traveling left to right through a simplified stack. The leftmost node is a browser window drawn as a minimal rectangle labeled PUBLIC CLIENT. The rightmost node is a database cylinder labeled POSTGRES. Between them sits a vertical gate drawn as a translucent purple fence labeled ROW LEVEL SECURITY POLICY, with the expression auth.uid() = user_id printed in monospace beneath it.

The upper lane is drawn in green and labeled ANON KEY — PUBLIC, SAFE IN BROWSER. It passes directly through the gate. Behind the gate, a small grid represents a table of rows; the green lane reaches only the highlighted rows tagged with a small user icon, while the remaining rows are greyed out and blocked by a small padlock. An arrow labeled returns only your rows points back to the browser.

The lower lane is drawn in red and labeled SERVICE ROLE KEY — SECRET, SERVER ONLY. It bypasses the gate entirely with a curved arrow that arcs over the fence, then touches every row in the grid at once. A small caption reads bypasses every policy.

Add a compact legend in the bottom right with three swatches: green, red, purple. Use Setproduct purple #7c4dff as the primary accent, green #22c55e, red #ef4444, near-black #19181b for text. Typography: clean geometric sans for labels, monospace for code and key names. Keep generous negative space, perfect 16:9 composition, thin 1.5px stroke lines, rounded 8px corners, no human figures, no photorealism, not a stock illustration.
```

### Версия 2 — Инфографика: два ключа, две работы

**Тип:** flat infographic + funnel. **Соотношение:** 4:3. **Фон:** строго белый.

```text
Minimal flat-vector infographic on a strictly pure white background, split vertically into two mirrored halves by a thin 1px grey divider. The left half uses only green accents and is titled ANON KEY — PUBLIC. The right half uses only red accents and is titled SERVICE ROLE KEY — SECRET.

In the center of each half, place an identical database table drawn as a neat grid of cells, twelve cells across three columns. In the left half, a funnel labeled RLS: auth.uid() = user_id sits above the table and filters the flow: only the cells belonging to the current user stay dark, the rest fade to light grey with a small lock icon. A green arrow carries the surviving rows to a small browser rectangle. In the right half, no funnel exists; a bold red arrow labeled NO POLICY CHECK touches every cell, and all twelve cells light up red at once. Below it, a caption reads reads the entire database.

Across the bottom, add a small horizontal warning strip with a triangle icon and one line of monospace text: RLS disabled by default = every row exposed. Beneath it a tiny chip reads schema.sql — enable row level security.

Add two compact checklists at the very bottom. Left, green checks for: public, safe in browser, limited by policy. Right, red crosses for: server only, bypasses RLS, never bundle into client. Palette: Setproduct purple #7c4dff for headers, green #22c55e, red #ef4444, text #19181b, hairlines #e5e7eb. Flat, no shadows, no gradients, 4:3, generous margins, monospace for code, geometric sans for labels, no people, no 3D, no photorealism.
```

### Версия 3 — Комбинация: жизненный цикл запроса + путь утечки + график

**Тип:** process diagram + mirrored mistake path + bar chart. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Flat technical infographic on a pure white background combining a process diagram, a comparison path and a small chart. The top two thirds show a six-step horizontal request lifecycle drawn as connected rounded rectangles numbered ❶ through ❻ inside purple circles: user clicks, Next.js server action reads cookie, server client calls Supabase, RLS policy evaluates auth.uid() = user_id, Postgres returns matching rows, UI renders the user own data. Under this safe line place a green check icon and the caption correct path — secret key stays on the server.

Directly below, mirror the same six steps as the mistake path, drawn in red. At step ❸ the arrow splits downward and drops the string SUPABASE_SERVICE_ROLE_KEY into a client bundle box labeled NEXT_PUBLIC_. A red arrow continues to a small attacker panel on the far right that reads every row of a database grid and exports a full table. Add a caption: silent, invisible in testing, discovered in production, with a small clock icon labeled time to detect: never.

In the bottom third, place a compact horizontal bar chart on a white plane: one short green bar labeled blast radius — one user rows and one long red bar labeled blast radius — all users rows, measured against a dotted 1px baseline. Next to it, a small monospace code chip showing the split from the article: NEXT_PUBLIC_SUPABASE_ANON_KEY for the browser and SUPABASE_SERVICE_ROLE_KEY for the server, each with a one-line comment above it.

Palette: #7c4dff purple accents, #22c55e green, #ef4444 red, #19181b text, #e5e7eb hairlines. Flat vector, no gradients, no shadows, 16:9, thin strokes, rounded corners, monospace captions, geometric sans labels, no photorealism, no human faces, no 3D.
```

---

## 4. Рекомендованное размещение в статье

| Версия | Куда вставлять | Зачем |
|---|---|---|
| Версия 1 (схема потоков) | Заменить абстрактную картинку RLS после [`:215`](content/blog/solo-founder-tech-stack-2026.mdx:215) | Даёт читателю визуальную опору там, где сейчас только метафора щитов |
| Версия 2 (два ключа) | Сразу после `.env.example`, после [`:241`](content/blog/solo-founder-tech-stack-2026.mdx:241) | Закрывает самый опасный участок: различие публичного и секретного ключа |
| Версия 3 (жизненный цикл + утечка) | В блоке failure point #3, после [`:326`](content/blog/solo-founder-tech-stack-2026.mdx:326) | Показывает цену ошибки агента и ломает монотонность раздела «Where this stack breaks» |

Итог по визуальному ритму: статья получает три белых инфографики в разных пропорциях (16:9, 4:3, 16:9) и в разных точках — intro-зона, security-зона, failure-зона. Это разбивает длинные текстовые прогоны и удерживает внимание до чеклиста и FAQ.

---

## 5. Что НЕ делать

- Не смешивать тёмный и светлый фон в одной серии — все три строго на белом.
- Не добавлять фотореалистичных людей, 3D-рендеры и стоковые метафоры.
- Не использовать градиенты и тени — только плоский вектор и волосяные линии.
- Не дублировать уже существующие картинки: у статьи уже 8 MDX-комментариев, новая серия должна заменять или дополнять, а не просто копиться.

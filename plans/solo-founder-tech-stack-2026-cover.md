# Промпты под обложку статьи «Solo founder tech stack 2026»

## Что уже есть

В frontmatter [`строки 8-10`](content/blog/solo-founder-tech-stack-2026.mdx:8) прописаны:

- `coverImage: /blog/covers/solo-founder-tech-stack-2026.webp`
- `thumbImage: /blog/covers/thumbs/solo-founder-tech-stack-2026.webp`
- `coverImageAlt: "Four stacked layers labeled Figma, Cursor, Supabase and Vercel connected by arrows, a single person shipping a product"`

Alt уже написан под **Вариант A**. Если берёте B или C — перепишите `coverImageAlt` под выбранную сцену.

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и `object-fit: cover`. Контейнер — [`CSS 3720-3725`](public/css/setproduct.webflow.shared.css:3720): ширина 100 процентов, высота 750 px, скругление 24 px. На мобильных — 200 px.

Из этого три правила композиции:

- Генерировать в 16:9 (1536×864). Кадр обрежется по бокам, потому что рамка почти квадратная (960×750).
- Весь смысловой контраст держать в центральных 70 процентах кадра.
- Та же картинка идёт в карточку листинга высотой 385 px — главное должно читаться в превью размером с ноготь.

Палитра бренда: акцент `#7C4DFF`, пастельные подложки `#EDE7FF`, `#FFF3E2`, `#E6F4EC`, `#FFE8E8`, тёмный `#19181b`. Для Варианта C — белая инфографическая серия в один язык с уже вставленными `img-1.webp` (схема RLS) и `img-3.webp` (стопка билетов), там же `#22c55e` для «фикса» и `#e5e7eb` для волосяных линий.

---

## Вариант A — «Four layers, one person» (стек из четырёх панелей)

Create a clean flat vector editorial cover illustration, 16:9, on a soft lilac background (#EDE7FF) with a gentle warm cream glow in the center. No photographic realism, no 3D render, no glossy plastic, no paper texture, no text overlay, no logos.

Concept: one person standing in for an entire engineering team, holding a stack of four tools that hand work to each other.

Composition: four wide rounded horizontal panels float stacked vertically down the center of the frame, each slightly overlapping the one below. Top panel is pale cream (#FFF3E2), a drawing board with abstract vector handles and a crop of color swatches. Second panel is soft mint (#E6F4EC), a code editor with three abstract diff bars in purple. Third panel is pale blush (#FFE8E8), a database cylinder with three stacked shelf lines. Bottom panel is white, a cloud with a single upward arrow. Between every pair of panels a thin purple (#7C4DFF) thread drops down and widens into a small ribbon of abstract monospace dashes, so the eye reads one clean top-to-bottom handoff rather than four separate boxes.

At the bottom center a small simple figure stands on a grid line, drawn as a flat silhouette in near-black (#19181b) with a plain circle head, one arm raised to touch the lowest panel. Give the figure a soft pastel shadow and keep it small, roughly one tenth of the frame height, so scale does the talking.

Behind everything, three very soft pastel circles in mint, blush and cream drift for depth, and one thin dashed hairline runs from the top panel to the figure's hand.

Palette: lilac, cream, mint, blush, near-black, one purple accent. Flat vector, thin consistent line weights, crisp edges, no gradients except a small radial glow. Keep all detail inside the central seventy percent of the frame because the image is cropped to a wide banner and reduced to a small listing card. No readable words, only abstract bars and dashes.

---

## Вариант B — «Team photo where the team is one person» (шеренга)

Create a clean flat vector editorial cover illustration, 16:9, on a pastel background that fades from soft cream (#FFF3E2) at the top to pale lilac (#EDE7FF) at the bottom. No photographic realism, no 3D, no texture, no outer frame, no readable text.

Concept: the tongue-in-cheek team photo of a solo founder whose four team members are the four tools.

Composition: a row of five evenly spaced figures standing side by side on a single ground line, drawn in the same flat style and the same height, like a corporate lineup. The first four are tool characters, not people. A cream figure with a rounded drawing-board chest and a small vector-pen arm. A mint figure with a code-bracket head and a diff-shaped collar. A blush figure with a stacked database-cylinder torso. A white figure with a cloud-shaped head and an upward arrow pinned to its chest. Each is friendly and geometric, with simple dot eyes and no mouths.

The fifth figure stands at the right end and is the human: a near-black flat silhouette with a plain circle head, slightly turned toward the four characters. The group must read as one team, same spacing, same pastel shadow under each, same baseline.

Above their heads leave a clean empty band of background where a nameplate would go, but keep it blank, just a faint dashed outline rectangle over each figure.

Behind the lineup, a soft oversized outline of a weekend calendar grid, three large squares only, drawn as hairlines in pale purple.

Palette: cream, lilac, mint, blush, near-black, one purple accent #7C4DFF. Flat vector, thin consistent outlines, rounded corners, no gradients, no gloss. Keep the lineup centered inside a wide safe area because the frame is cropped to a banner and reduced to a thumbnail card.

---

## Вариант C — «One weekend assembly line, and the invoice at the end»

Create a flat vector technical infographic, 16:9, on a strictly white background (#ffffff), no gradients, no shadows, no textures, no photorealism. This cover belongs to a series whose inline diagrams share the same white background, hairline strokes and accents, so match that language exactly.

Concept: four stations in a row pass the same product down the line, and the only numbers that change are the ones on the invoice.

Composition: a single horizontal assembly line runs across the middle of the frame, drawn as a thin one and a half pixel near-black rail with four evenly spaced stations sitting on it. Station one is tagged FIGMA in monospace and drawn as a drawing board with two vector handles. Station two is tagged CURSOR and drawn as a code editor with an abstract diff bar. Station three is tagged SUPABASE and drawn as a database cylinder over a grid. Station four is tagged VERCEL and drawn as a cloud with a downward output chute. Between stations, short purple arrows point right, each carrying a small ribbon of abstract monospace dashes, the same visual token moving through every handoff.

Under the rail, a wide strip holds three big flat numerals in sequence, connected by thin arrows: 0, then 60, then 250, each with a tiny dollar sign in front. Above the rail on the right, a compact row of small stacked tiles grows in height left to right, one tile per thousand users, drawn as hairline rectangles filled with pale purple.

A green rounded chip sits at the far right end of the rail, containing a small checkmark.

Palette: #7c4dff for structure and arrows, #22c55e for the finish chip, #19181b for text and rails, #e5e7eb hairlines, white background. Monospace for tool names, flat vector, generous white space, no people, no 3D. Keep the four stations inside the central seventy percent of the frame because the image is cropped to a wide banner.

---

## Как выбрать

| Вариант | Сильная сторона | Когда брать |
|---|---|---|
| A — стек панелей | буквально тезис статьи про «один принцип и четыре слоя»; alt уже под него написан | если хотите премиальный, спокойный кадр без иронии |
| B — шеренга | самый остроумный и самый «человечный», хорошо работает в листинге | если нужна эмоция «я и есть вся команда» |
| C — конвейер | единственный, где виден ценник 0 → 60 → 250 и картинка стыкуется с белыми инфографиками в теле | если хотите серийность с `img-1` и `img-3` |

Рекомендую **Вариант A**: он без переделки alt, читается в превью, и четыре панели сразу объясняют название поста.

## После генерации

1. Положить файл как `public/blog/covers/solo-founder-tech-stack-2026.webp`.
2. Запустить `npm run thumbs:blog` — скрипт создаст превью 800 px в `public/blog/covers/thumbs/`.
3. Если выбран Вариант B или C — обновить `coverImageAlt` в frontmatter под новую сцену.

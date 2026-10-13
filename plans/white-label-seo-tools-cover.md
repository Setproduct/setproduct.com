# Промпты под обложку статьи «White label SEO tools, what to resell and build in house»

## Что уже есть

Во frontmatter [`content/blog/white-label-seo-tools.mdx`](content/blog/white-label-seo-tools.mdx:1):

- `coverImage: /blog/covers/white-label-seo-tools.webp`
- `coverImageAlt: Branded SEO reporting dashboard compared against white label tools`
- `thumbImage: /blog/covers/thumbs/white-label-seo-tools.webp`

Файла обложки в репозитории пока нет. Папка [`public/blog/assets/white-label-seo-tools/`](public/blog/assets/white-label-seo-tools) уже содержит `img-1.webp` (дерево решений) и `img-2.webp` (столбцы 3 vs 30) — обложка живёт отдельно, в `/blog/covers/`.

## Тема и смысл, которые должна передать обложка

Тезис поста: **инструмент можно арендовать и продать клиенту под своим брендом, а можно построить самому, и цена этой аренды растёт вместе с числом клиентов.** Три угла визуализации: наложение своего бренда, выбор «арендовать или строить», и нелинейная экономика аренды.

Сквозная идея кластера: **клиент видит только ваш бренд, вендор остаётся невидимым.**

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и классом `image-cover` (`object-fit: cover`). Контейнер — [`CSS 3720`](public/css/setproduct.webflow.shared.css:3720): ширина 100%, высота 750 px на десктопе, 200 px на мобильных, скругление 24 px.

Правила композиции:

- Генериро��ать в 16:9 (1536×864 или 1920×1080).
- Главный объект центрирован и занимает **не менее 70% центральной части кадра** — края обрезаются до почти квадрата.
- Та же картинка идёт в карточку листинга 385 px, поэтому форма и контраст должны читаться на превью размером с ноготь.
- Фон пастельный, **не белый**: сиреневая `#EDE7FF`, кремовая `#FFF3E2`, мятная `#E6F4EC`, румяная `#FFE8E8`. Один акцент — фиолетовый `#7C4DFF`.
- **Никаких крупных надписей.** Только формы, иконки и, в крайнем случае, микро-метки, нечитаемые на превью.

Отличие от белых инфографик в теле статьи: обложка НЕ на белом фоне, а на пастельном.

---

## Вариант A — «The relabeled dashboard» (наложение бренда)

Create a clean flat vector editorial cover illustration on a soft pastel lilac background (#EDE7FF), with a warm cream glow gathering behind the center of the frame. No photographic realism, no 3D render, no glossy plastic, no texture, no outer frame, no readable text.

Concept: an agency rebrands SEO software as its own, so the client only ever sees the agency name. The image should show a generic reporting dashboard mid-rebrand, with a blank label plate being swapped in on top of the vendor's.

Composition: a single large rectangular dashboard panel sits centered in the frame and fills roughly the middle 80 percent of the canvas. The panel has a soft rounded corner radius, a pale cream surface, and a thin near-black outline. Inside it, arrange a simple abstract report layout with no words: a wide header bar at the top, a row of three small chart shapes (a rising line, a bar set, and a ring), a short table block of horizontal bars, and a small logo plate in the top-left corner rendered as an empty rounded square.

Hovering just above that empty logo plate is a fresh replacement plate, drawn as a clean pastel tile in blush or mint with the single purple accent (#7C4DFF) on its face, tilted slightly as if being pressed into place. A thin dotted purple arc curves down from the floating plate to the slot it will fill, marking the instant of rebranding. Behind the dashboard, two soft pastel circles in pale mint (#E6F4EC) and blush (#FFE8E8) drift to add depth without noise.

Keep the dashboard and the swapped plate inside the central seventy percent of the frame, because the cover is cropped into a wide banner. The empty plate and the purple accent tile must stay obvious at thumbnail size. Palette: pastel lilac background, cream panel, pale mint and blush accents, near-black outlines, one purple accent #7C4DFF. Flat vector, thin consistent line weights, no gradients besides the soft ambient glow. No readable text, no real logos, only abstract bars and shapes.

---

## Вариант B — «Rent the stack, build the core» (арендовать или строить)

Create a clean flat vector editorial cover illustration on a soft pastel mint background (#E6F4EC), warming toward a cream glow at the center. No photographic realism, no 3D render, no texture, no border, no readable text.

Concept: an agency rents the generic layers of its SEO stack and builds only the layer that carries its own method. The image should make the difference between rented and owned layers readable at a single glance.

Composition: a centered vertical stack of five rounded slabs, stacked like a neat sandwich and filling roughly the middle 75 percent of the frame. Four slabs are drawn in a light pastel wash (lilac, blush, cream, pale grey) with dashed outlines, signalling that they are rented: a rank-tracking layer, a reporting layer, an audit layer, and a backlink-data layer. A faint price-dot sits on the right edge of each rented slab, drawn as a small circle.

The fifth slab, placed in the middle of the stack, is different. It is solid, fully filled in the purple accent (#7C4DFF) with a crisp near-black outline and a solid keyhole or gear mark on its face, signalling that this layer is built and owned in house. A thin dotted purple line runs from the bottom of the whole stack up the right side and stops at this owned slab, as if the rent flows past the layers to reach the one thing worth keeping.

Around the stack, two soft pastel circles in pale lilac (#EDE7FF) and cream drift for depth. Keep the entire stack centered in the middle seventy percent of the frame, since the sides get cropped, and keep the contrast between dashed rented slabs and the solid purple owned slab strong enough to read on a small listing thumbnail. Palette: pastel mint background, cream, pale lilac, blush, near-black outlines, one purple accent #7C4DFF. Flat vector, thin outlines, rounded corners, no gloss, no gradients besides the ambient glow. No readable text, no logos.

---

## Вариант C — «Margin thins as rings grow» (экономика аренды)

Create a clean flat vector editorial cover illustration on a soft pastel cream background (#FFF3E2), shifting gently into pale lilac (#EDE7FF) toward the corners. Keep the background light but never pure white, and draw no frame. No photographic realism, no 3D render, no texture, no readable text.

Concept: the per-client cost of rented SEO tools compounds as an agency grows, so the margin on each client quietly thins. The image should show one centered object whose visible profit shrinks as its rings multiply.

Composition: a single centered circular object, like a target or a cross-section of a tree, fills roughly the middle 78 percent of the frame. It is built from concentric rings, drawn as flat pastel bands in alternation (lilac, blush, cream, pale mint) with thin near-black separators. Read as a graph, each ring stands for one growing band of clients.

The purple accent (#7C4DFF) is used in exactly one place: a solid ring near the innermost core, the healthy margin an agency keeps when its book is small. Moving outward, that purple band is replaced by an increasingly thin grey rim, so the outer edge of the circle is only a hairline of grey, the margin squeezed almost to nothing at thirty clients. A single thin dotted purple arc sweeps from the fat inner ring to the thin outer rim, connecting the two states without words.

Three or four very faint price-dots sit on the outer rings like measurement marks. Around the circle, two soft pastel cloud-like shapes in mint (#E6F4EC) and blush (#FFE8E8) drift for depth only. Keep the whole circular object centered in the middle seventy percent of the frame, because the cover is cropped into a wide banner, and keep the fat purple core and thin grey rim both visible at thumbnail size. Palette: pastel cream background, pale lilac, blush, mint, near-black outlines, one purple accent #7C4DFF. Flat vector, thin consistent line weights, no gradients besides the soft ambient glow. No readable text, no logos, no numerals.

---

## Какой брать

**Вариант A** самый прямой и лучше всего передаёт суть white label, «клиент видит только ваш бренд», и легко читается в маленькой карточке. **Вариант B** точнее отражает ядро поста, решение «resell or build», и перекликается с деревом решений `img-1` внутри статьи. **Вариант C** визуализирует самую сложную мысль материала, нелинейную экономику аренды, и работает как самостоятельная метафора, но требует чуть больше внимания при первом взгляде.

## После генерации

1. Положить файл как `public/blog/covers/white-label-seo-tools.webp` (16:9, WebP).
2. Запустить `npm run thumbs:blog` — скрипт создаст превью 800 px в `public/blog/covers/thumbs/`.
3. Обновить `coverImageAlt` в frontmatter под выбранный вариант, если сцена отличается от текущего текста.
4. Проверить, что путь резолвится, через `node check_images2.js`.

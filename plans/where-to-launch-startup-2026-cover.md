# Промпты под обложку статьи «Where to launch a startup in 2026»

## Что уже есть

Во frontmatter [`строки 7-9`](content/blog/where-to-launch-startup-2026.mdx:7):

- `coverImage: /blog/covers/where-to-launch-startup-2026.webp`
- `coverImageAlt: "Five launch platform icons, Product Hunt, Hacker News, Reddit, X and a generic directory, arranged on a runway with a calendar counting down four weeks"`
- `thumbImage: /blog/covers/thumbs/where-to-launch-startup-2026.webp`

Файла обложки в репозитории пока нет. `coverImageAlt` уже написан под сцену «runway + calendar» — это ближе всего к Варианту A ниже. Если выберете B или C, alt нужно переписать под новую сцену.

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и классом `image-cover` (`object-fit: cover`). Контейнер — [`CSS 3720-3725`](public/css/setproduct.webflow.shared.css:3720): 100% ширины, высота 750 px, скругление 24 px, на мобильных — 200 px.

Из этого — три правила композиции:

- Генерировать в 16:9 (1536×864 или 1920×1080). Кадр обрежется по бокам почти до квадрата.
- Весь смысловой контраст держать в центральных 70% кадра.
- Не мельчить: та же картинка идёт в карточку листинга высотой 385 px — главное должно читаться на превью размером с ноготь.

**Отличие от белых инфографик в статье:** обложка НЕ на белом фоне. Пастельный фон, мягкий, тёплый. Один фиолетовый акцент `#7C4DFF` (бренд-цвет Setproduct) на каждой версии. Рекомендуемая пастельная палитра: сиреневая `#EDE7FF`, кремовая `#FFF3E2`, мятная `#E6F4EC`, румяная `#FFE8E8`.

---

## Вариант A — «The runway and the clock» (взлётная полоса и обратный отсчёт)

Create a clean flat vector editorial cover illustration on a soft pastel lilac background (#EDE7FF), with a gentle warm cream glow low on the horizon. No photographic realism, no 3D render, no glossy plastic, no texture, no text overlay.

Concept: a startup launch as a literal runway, with a countdown clock marking the four weeks before takeoff.

Composition: a wide horizontal runway strip runs across the lower third of the frame, drawn as a simple pastel cream road with dashed purple center markings receding toward the horizon. Standing on the runway, evenly spaced like planes waiting for clearance, are five simple rounded platform icons: a cat-like Product Hunt mark, a Y-shaped Hacker News mark, an alien Reddit mark, a bird-like X mark, and a plain rounded-square generic directory icon. Each icon sits inside a soft pastel tile of a different hue (mint, blush, cream, lilac, pale grey) with a thin purple outline. The Product Hunt tile, placed at the front of the row, is slightly larger and glowing with the purple accent (#7C4DFF), as if first in line for departure.

Above the runway, a large soft circular clock face floats in the pastel sky, showing four tick marks instead of twelve, one lit in solid purple to represent the current week, the other three in pale outline. A thin dotted arc connects the lit tick to the front tile on the runway, tying the countdown to the launch order.

Background: soft pastel gradient from lilac at the top to pale cream near the horizon, with two or three small soft cloud shapes for depth.

Palette: pastel lilac, cream, mint, blush, one purple accent #7C4DFF, dark near-black outlines only for the icons. Flat vector, thin consistent line weights, no gradients except the soft sky transition and the clock glow. Keep the runway and icons centered in the middle 70 percent of the frame, since the sides get cropped. No readable text anywhere.

---

## Вариант B — «Five doors, one hallway» (коридор с дверями)

Create a clean flat vector editorial cover illustration on a soft pastel peach-cream background (#FFF3E2), warming slightly toward the center. No photographic realism, no 3D render, no texture, no outer frame, no text overlay.

Concept: choosing a launch platform as picking the right door out of a hallway of options, each door a different mood.

Composition: a wide pastel hallway, drawn in flat perspective with soft rounded walls, recedes gently toward the center of the frame. Along both walls are five arched doorways of different pastel hues, each with a small platform icon painted on it: mint doorway with a Product Hunt cat mark, lilac doorway with a Hacker News Y mark, blush doorway with a Reddit alien mark, cream doorway with an X bird mark, and a pale grey doorway with a plain generic-directory square. Each doorway has a soft glow spilling from underneath in its own pastel hue, except the mint Product Hunt doorway, which glows in the purple accent (#7C4DFF) and stands slightly ajar, warmer and more inviting than the rest.

On the floor in front of each doorway sits one small flat object hinting at its nature: a tiny trophy badge before the mint door, a small speech-bubble stack before the lilac door, a stacked-comment icon before the blush door, a small bird-shaped paper airplane before the cream door, and a plain folder icon before the grey door.

At the far end of the hallway, a soft pastel arch frames a hint of open sky in pale mint, suggesting the destination beyond the choice.

Style: flat vector, thin dark outlines, rounded corners, gentle soft shadows under each doorway glow, no gradients besides the ambient glow and the faint sky. Palette: peach-cream, mint, lilac, blush, pale grey, one purple accent #7C4DFF. Keep the doorway row centered in the frame, since edges crop. No readable text.

---

## Вариант C — «The half-life garden» (растения с разной скоростью цветения)

Create a clean flat vector editorial cover illustration on a soft pastel mint-green background (#E6F4EC), with warm cream light gathering at the center. No photographic realism, no 3D render, no texture, no frame, no text overlay.

Concept: platforms as plants that bloom and fade at different speeds, visualizing the article's idea of each platform having its own half-life.

Composition: a row of five simple flat-vector potted plants stands along the bottom third of the frame, evenly spaced, each pot a different soft pastel hue (lilac, blush, cream, pale grey, mint) with a small platform icon printed on the pot: a Product Hunt cat mark, a Hacker News Y, a Reddit alien, an X bird, and a plain square for the generic directory. Each plant is at a different stage: the Reddit pot has fresh full purple-accented (#7C4DFF) leaves reaching high, since its attention takes long to fade; the Hacker News pot beside it has some leaves already turning pale and translucent, half wilted; the Product Hunt pot has one bold blooming flower in the purple accent color, but a few petals are already drifting off as tiny falling shapes; the X pot has thin wiry stems with small buds; the generic-directory pot has slow, sturdy, evenly leafed growth without any bloom at all, steady rather than dramatic.

Faint dotted arcs above each plant suggest a rise-and-fall curve, echoing the growth or fade pattern of that plant, drawn thin and pale so they read as a subtle texture rather than a chart.

Background: soft pastel mint gradient with a warm cream glow center-high, one or two soft round cloud-like shapes drifting near the top corners for depth.

Style: flat vector, thin consistent dark outlines, rounded shapes, no gradients besides the soft ambient glow, no gloss, no 3D. Palette: mint, lilac, blush, cream, pale grey, one purple accent #7C4DFF. Keep all five pots centered in the middle 70 percent of the frame, since the sides get cropped. No readable text, only shapes and icons.

---

## Какой брать

**Вариант A** ближе всего к уже написанному `coverImageAlt` («runway + calendar») — меньше правок в frontmatter, идея считывается мгновенно даже на маленьком превью. **Вариант B** сильнее метафорически: коридор с дверями хорошо передаёт «выбор из нескольких вариантов», но на превью 385 px мелкие детали пола (трофей, значки) могут потеряться. **Вариант C** самый оригинальный и лучше всего в��зуализирует именно «half-life» — сквозную идею статьи, но требует немного больше объяснения с первого взгляда, чем A или B.

## После генерации

1. Положить файл как `public/blog/covers/where-to-launch-startup-2026.webp`.
2. Запустить `npm run thumbs:blog` — скрипт создаст превью 800 px в `public/blog/covers/thumbs/`.
3. Если выбран вариант B или C, обновить `coverImageAlt` в frontmatter под новую сцену (сейчас он написан под вариант A).

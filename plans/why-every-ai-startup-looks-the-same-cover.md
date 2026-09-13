# Промпты под обложку статьи «Why every AI startup looks the same»

## Что уже есть и чего не хватает

В frontmatter [`строки 8-10`](content/blog/why-every-ai-startup-looks-the-same.mdx:8) прописаны:

- `coverImage: /blog/covers/why-every-ai-startup-looks-the-same.webp`
- `thumbImage: /blog/covers/thumbs/why-every-ai-startup-looks-the-same.webp`

Ни одного из этих файлов в репозитории пока нет (проверено). Обложку надо сгенерировать.

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и классом `image-cover`, то есть кадрирование по `object-fit: cover`. Контейнер — [`CSS 3720-3725`](public/css/setproduct.webflow.shared.css:3720): ширина 100 процентов, высота 750 px, скруглённые углы 24 px. На мобильных — 200 px.

Из этого следуют три правила композиции:

- Генерировать в 16:9 (1536×864 или 1920×1080). Широкий кадр обрежется по бокам, потому что рамка почти квадратная (960×750).
- Весь смысловой контраст держать в центральных 70 процентах кадра. Края уйдут под обрез.
- Не мельчить: та же картинка идёт в карточку листинга высотой 385 px, поэтому главное должно читаться на превью размером с ноготь.

Палитра: пастель как фон, тёмные плитки как «боль», один фиолетовый акцент `#7C4DFF`. Рекомендуемый набор: сиреневая `#EDE7FF`, кремовая `#FFF3E2`, мятная `#E6F4EC`, румяная `#FFE8E8`.

Важно: `coverImageAlt` уже написан и описывает именно Вариант A. Если выберете B или C, alt нужно переписать под выбранную сцену.

---

## Вариант A — «Two hundred, and not one you remember» (сетка клонов)

Create a clean flat vector editorial cover illustration on a soft pastel lilac background (#EDE7FF), with a gentle warm cream glow in the middle and no harsh white anywhere. No photographic realism, no 3D render, no glossy plastic, no paper texture, and no text overlay on the image.

Concept: the visual equivalent of scrolling two hundred AI startup landing pages and remembering none of them.

Composition: a neat top-down grid of identical miniature browser windows, roughly eight columns by five rows, filling the frame edge to edge. Every window is the same: a near-black rounded card, a soft purple radial glow in the upper right corner, a tiny four-point sparkle icon, a short grey headline bar, and a dark pill holding a thin arrow. They are clones down to the radius, the spacing, the glow, and the layout. The repetition should read almost as wallpaper, closer to a texture than to a group of products.

One window, placed near the center and a touch larger than the rest, breaks the pattern. It is a warm off-white card in cream (#FFF3E2) with one confident purple accent shape, a serif headline bar, and a small custom monogram where the sparkle would be. It keeps the same grid, the same size language, the same clean geometry, so the contrast reads as identity rather than as volume.

Behind the grid, a few very soft pastel circles in pale mint and blush drift to suggest depth without adding noise.

Palette: pastel lilac, warm cream, pale mint, soft blush, near-black tiles, one purple accent #7C4DFF. Flat vector, thin consistent line weights, crisp edges, no gradients except the small radial glow inside the dark windows. Keep the middle of the frame free of fine detail, since the image is cropped to a wide banner. Render no readable text, only abstract bars.

---

## Вариант B — «The factory that prints the same website» (конвейер)

Create a clean flat vector editorial cover illustration on a pastel background that fades from soft cream (#FFF3E2) at the top to pale lilac (#EDE7FF) at the bottom. No photographic realism, no 3D render, no texture, no frame, no text overlay apart from a single numeral.

Concept: how every AI startup ends up with the same website, because the same template is mass-produced.

Composition: on the left, a simple pastel machine drawn as a friendly boxy factory unit with one narrow intake slot and a wide output mouth. Into the intake slides a single folded blueprint sheet in cream with a purple outline. Out of the mouth runs a conveyor belt toward the right, carrying a long row of identical miniature dark landing pages, one after another: the same near-black surface, the same purple glow in the corner, the same sparkle, the same two grey text bars, the same input pill. The belt should hold at least a dozen clones and the row should run off the right edge of the frame, implying it never ends.

Above the belt, a small pastel counter panel shows a bold flat numeral: 200. Below the belt, one finished page stands aside on the floor, clearly different: warm cream, a serif headline bar, a distinct geometric mark. It is drawn slightly apart from the line, as if somebody pulled it out by hand.

Style: flat vector, thin consistent dark outlines, rounded corners, no gradients on the background, no photographic light. Depth hinted only by simple soft pastel shadows under the belt and the machine.

Palette: cream, lilac, pale mint, blush, near-black clone tiles and one purple accent #7C4DFF. Only the numeral 200 as text, sharply drawn. Keep the machine-to-clones contrast in the center of the frame, since the sides get cropped.

---

## Вариант C — «Strip the names and it is one company» (тест по логотипам)

Create a clean flat vector editorial cover illustration on a pastel background in soft blush (#FFE8E8), with pale lilac gathering in the corners. No photographic realism, no 3D render, no texture, no outer frame, no readable text anywhere.

Concept: the test from the article. Cover the logos and every page becomes the same page.

Composition: a single horizontal row of six to eight identical miniature dark landing pages standing upright like display cards, evenly spaced across the middle band of the frame. Each one is a near-black rounded rectangle with the same purple corner glow, the same sparkle, the same grey headline bar and the same dark input pill. Above each card, on a thin stem, sits a small pastel nameplate where a brand name would be, and every nameplate is empty: a flat cream rectangle with a faint dashed outline marking the missing text. All the plates are identical in size, which drives the point home.

In front of the row, a shallow heap of small pastel labels lies discarded on the ground line, in mint, blush, lilac and cream, as if peeled off one by one and dropped.

On the far right, one card is fundamentally different: warm cream, light, a serif headline bar, one distinct purple mark, and a nameplate that is actually filled with a short bold bar. It stands slightly forward and catches a soft pastel shadow, so the eye lands on it last and remembers it.

Style: flat vector, thin dark outlines, no gradients, no 3D, no gloss. Simple soft pastel grounding shadows only.

Palette: blush, lilac, mint, cream, near-black and one purple accent #7C4DFF. No readable letters at all, only bars and empty plates. Keep the row centered inside a wide safe area, since the image is cropped to a banner.

---

## Какой брать

**Вариант A** — самый честный: он буквально и есть тезис статьи, и alt уже под него написан. Читается за полсекунды даже в карточке листинга. **Вариант B** сильнее по метафоре: конвейер объясняет причину, а не только симптом, и даёт запоминающийся образ на обложку. **Вариант C** самый остроумный, но у него больше мелких деталей — на превью в листинге пустые таблички рискуют превратиться в шум.

## После генерации

1. Положить файл как `public/blog/covers/why-every-ai-startup-looks-the-same.webp`.
2. Запустить `npm run thumbs:blog` — скрипт создаст превью 800 px в `public/blog/covers/thumbs/`.
3. Если выбран вариант B или C, обновить `coverImageAlt` в frontmatter под новую сцену.

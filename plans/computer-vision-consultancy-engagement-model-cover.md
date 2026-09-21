# Промпты под обложку статьи «Choosing the right computer vision consultancy engagement model»

## Что уже есть и чего не хватает

В frontmatter [`строки 2-8`](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:2) прописаны:

- `coverImage: /blog/covers/computer-vision-consultancy-what-the-right-engagement-model-looks-like.webp`

Файла пока нет в репозитории — обложку нужно сгенерировать через внешний AI-image-инструмент (у меня нет прямого доступа к генерации изображений) и положить руками.

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и классом `image-cover` (`object-fit: cover`). Контейнер — [`public/css/setproduct.webflow.shared.css:3720`](public/css/setproduct.webflow.shared.css:3720): ширина 100%, высота 750 px на десктопе, 200 px на мобильных, скруглённые углы 24 px.

Правила композиции:

- Генерировать в 16:9 (1536×864 или 1920×1080).
- Весь смысловой контраст держать в центральных 70% кадра — края обрежутся.
- Тема должна быть нейтральной, без визуальных отсылок к конкретному бренду/консалтингу/рекламе — только абстрактная метафора трёх моделей взаимодействия команд.

Палитра: пастельный фон, один фиолетовый акцент `#7C4DFF`. Рекомендуемый набор: сиреневая `#EDE7FF`, кремовая `#FFF3E2`, мятная `#E6F4EC`, румяная `#FFE8E8`.

Важно: `coverImageAlt` уже написан ("Abstract illustration of three connected team structures representing different consulting engagement models") и описывает Вариант A ниже. При выборе другого варианта alt нужно переписать.

---

## Вариант A — «Три формы связи» (рекомендуется)

Create a clean flat vector editorial cover illustration on a soft pastel lilac background (#EDE7FF), with no photographic realism, no 3D render, no gloss, no texture, and no text overlay.

Concept: three different ways two teams can be structurally connected, an abstract metaphor for project-based, retainer, and embedded working models — with no reference to any specific company, product, or industry.

Composition: three simple node-and-line diagrams arranged left to right across the center of the frame, each drawn as a pair of clusters of small flat circles (one cluster in near-black, one cluster in warm cream #FFF3E2). Left diagram: the two clusters are linked by a single short straight line, then completely separated by a gap, illustrating a connection that ends. Middle diagram: the two clusters are linked by a thin dashed line with a small pulsing dot in the middle, illustrating light, ongoing contact. Right diagram: the circles from both clusters are interleaved into one single blended cluster with no visible seam, illustrating full integration. Each diagram sits inside a soft rounded pastel card (mint #E6F4EC, blush #FFE8E8, cream #FFF3E2) to separate the three concepts visually.

One thin purple line (#7C4DFF) trails faintly behind all three cards, connecting them left to right, suggesting progression from distant to fully merged without adding any text or numerals.

Style: flat vector, thin consistent outlines, rounded geometry, no gradients except a very soft inner glow inside the near-black circles. Keep the three-card composition centered and readable at thumbnail size, since the same image renders small in the blog listing.

Palette: lilac background, cream/mint/blush cards, near-black circle clusters, one purple accent #7C4DFF. No readable text, no logos, no numerals.

---

## Вариант B — «Три ключа к одной двери» (альтернатива)

Create a clean flat vector editorial cover illustration on a warm pastel cream background (#FFF3E2), no photographic realism, no 3D, no texture, no text overlay.

Concept: three different keys that all open the same door, an abstract metaphor for three engagement models leading to the same outcome — a working system — without referencing any specific brand or industry.

Composition: a single simple flat door shape in near-black stands slightly right of center. To the left, three distinct simple key shapes float side by side, each a different flat silhouette (one short and blunt, one long and thin, one with an interlocking notch), rendered in pastel mint, blush, and lilac respectively, each with a thin purple outline accent (#7C4DFF). A faint dashed arc connects each key toward the door's keyhole, implying three separate paths to one result.

Style: flat vector, thin consistent outlines, generous rounded corners, minimal shading, one soft ambient shadow beneath the door. Keep the three keys and the door within the central safe area of the frame.

Palette: cream background, mint/blush/lilac keys, near-black door, one purple accent #7C4DFF. No readable text, no logos.

---

## Какой брать

**Вариант A** ближе к содержанию статьи (три степени связи команд = три модели вовлечённости) и проще читается на маленьком превью в листинге. **Вариант B** более метафоричен и декоративен, но чуть менее очевиден без подписи.

## После генерации

1. Сгенерировать выбранный вариант во внешнем image-инструменте (Midjourney / DALL-E / другой), скачать в 16:9.
2. Сконвертировать в WebP и положить как `public/blog/covers/computer-vision-consultancy-what-the-right-engagement-model-looks-like.webp`.
3. Запустить `npm run thumbs:blog` — скрипт сгенерирует превью 800px в `public/blog/covers/thumbs/`.
4. Если выбран Вариант B, обновить `coverImageAlt` в frontmatter под новую сцену.
5. Запустить `node check_images2.js`, чтобы убедиться, что путь к обложке резолвится корректно.

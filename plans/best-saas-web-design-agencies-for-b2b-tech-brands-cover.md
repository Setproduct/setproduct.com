# Промпты под обложку «7 best SaaS web design agencies for B2B tech brands, reviewed»

## Технические требования

Обложка рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и `object-fit: cover`. Контейнер — 100 процентов ширины и 750 px высоты, скругление 24 px. На мобильных 200 px.

→ Генерировать 16:9 (1920×1080 или 1536×864).
→ Смысловой центр держать в центральных 70 процентах кадра: края уйдут под обрез.
→ Та же картинка идёт в карточку листинга высотой 385 px, поэтому главное должно читаться на ногте.
→ Формат файла: `.webp`, путь `public/blog/covers/best-saas-web-design-agencies-for-b2b-tech-brands.webp`, затем `npm run thumbs:blog`.

Палитра для всех вариантов: сливочный `#FFF6E0`, мятный `#DDF3E4`, лиловый `#E9E1FF`, румяный `#FFE4E1`, бумажный `#FAF7F2`, единственный акцент `#7C4DFF`.

Каждый промпт ниже самодостаточен: стилистические требования уже вписаны в текст.

---

## Вариант A — «Семь карточек на доске сравнения»

Create a flat neubrutalist editorial cover for a blog post comparing seven B2B SaaS web design agencies. Style rules apply to everything. Pure flat vector shapes, no gradients, no blur, no grain, no texture, no photorealism. Every element carries a uniform thick black outline of about 7 pixels at full resolution, with square or barely rounded corners. Each shape casts a hard unblurred offset shadow in solid black, displaced down and right by the same distance everywhere. Light pastel fills only: pale butter cream, soft mint, powder lilac, blush pink, warm paper white. One accent, deep violet, on a single element. No lettering, no logos, no readable text.

Scene: seven agency candidates laid out as index cards on a comparison board. Seven equal rectangles line up across the middle in one row, each tilted one or two degrees and overlapping its neighbor slightly, so the row reads as a stack being sorted rather than a grid. On each card sits an abstract miniature website: three short bars for navigation, one wide block for a hero, two small squares for proof. The fourth card from the left is pulled forward and dropped lower, breaking the rhythm, and it alone carries the violet accent on its hero block. Behind the row, a plain paper backdrop with two flat mint rectangles laid at a slight angle.

Keep the composition centered and low in detail at the outer edges, since the image crops to a wide banner. It must read at thumbnail size.

---

## Вариант B — «Стол отбора: таблица и финальная карточка»

Create a flat neubrutalist editorial cover about shortlisting B2B SaaS web design agencies. Style rules, no exceptions. Purely flat vector shapes, zero gradients, zero blur, no texture, nothing photographic. Every edge is a heavy uniform black outline, about 7 pixels at full resolution, corners square or barely rounded. Every object casts one hard solid-black shadow offset down and right, identical distance on every element, sharp edge, no softness. Fills stay in light pastels: cream, mint, lilac, blush, paper white. A single deep violet accent on one shape only. No lettering, no logos, no readable text.

Scene: a wide sorting table seen straight on, slightly from above. In the upper half sits a comparison table as an abstract grid: five columns, three rows, heavy black lines on a paper-white panel, small pastel blocks dropped into the cells, some filled, some empty, some crossed out with one short diagonal stroke. Below the table, six small agency tokens slide down a short ramp into a shallow tray. Five stack in a loose pile on the left. The sixth has cleared the ramp and sits alone in its own outlined slot, turned a few degrees, carrying the violet accent. A blank pastel card leans against the tray.

Everything sits on a plain cream backdrop with one flat mint band behind the table. Keep the center weighted and the corners empty: the image crops to a wide banner on the article and again in the listing card.

---

## Вариант C — «Сайт, разобранный на модули»

Create a flat neubrutalist editorial cover about hiring an agency to build a scalable B2B SaaS website. Style rules, non-negotiable. Flat vector only, no gradients, no blur, no texture, no realism, no 3D bevels. Every shape has the same thick black outline, about 7 pixels, square corners, consistent stroke weight throughout. Every object drops one hard black shadow, offset down and right by an identical amount, sharp edge, no falloff. Light pastel fills: paper cream, pale mint, powder lilac, blush. One deep violet accent, used once. No lettering, no logos, no numbers, no readable UI copy.

Scene: one SaaS website pulled apart into its modules, floating in a loose exploded arrangement. At the center a large browser frame sits open, paper white, holding three abstract blocks: a wide hero bar, a two-column feature row, a narrow pricing strip. Around it seven small modules drift outward in a ring, each its own outlined slab: a navigation rail, a chart panel, a form field, a pricing cell, a card stack, a CMS content block, a blank page template. Thin dashed black lines run from the frame to each module, showing where the pieces plug back in. The CMS block at the lower right is filled violet and sits closest to the frame, already clicked into place.

Background is a flat cream plane with two mint rectangles laid at an angle. Center the arrangement, leave the outer edges calm, since the banner crop removes them. The whole image should still read at small card size.

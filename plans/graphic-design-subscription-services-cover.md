# Промпты под обложку «8 best graphic design subscription services worth your money»

## Технические требования

Обложка рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и `object-fit: cover`. Контейнер — 100 процентов ширины и 750 px высоты, скругление 24 px ([`setproduct.webflow.shared.css`](public/css/setproduct.webflow.shared.css:3720)). На мобильных 200 px.

→ Генерировать 16:9 (1920×1080 или 1536×864).
→ Смысловой центр держать в центральных 70 процентах кадра: края уйдут под обрез.
→ Та же картинка идёт в карточку листинга высотой 385 px, поэтому главное должно читаться на ногте.
→ Формат файла: `.webp`, путь `public/blog/covers/graphic-design-subscription-services.webp`, затем `npm run thumbs:blog`.

Палитра для всех вариантов: сиреневая `#EDE7FF`, кремовая `#FFF3E2`, мятная `#E6F4EC`, румяная `#FFE8E8`, единственный акцент `#7C4DFF`.

Каждый промпт ниже самодостаточен: стилистические требования уже вписаны в текст.

---

## Вариант A — «Полка подписок» (200–250 слов)

Create a soft three-dimensional editorial cover illustration, not a flat vector. Use gently volumetric forms with rounded edges catching diffused light from the upper left, casting long feathered shadows to the lower right without a hard edge. Every shape carries a hairline outline in a deeper tone of its own fill. Surfaces are matte with a faint satin sheen, never glossy, chrome, or glass. No photographic realism, no texture, no lettering.

Scene: eight monthly design subscriptions lined up like objects on a quiet shelf. A shallow arc of eight rounded cards floats across the middle of the frame, tilted a few degrees apart so the row reads as one gesture rather than a grid. Each card is a soft slab the size of a business card, standing on its long edge, and each holds one abstract artifact embossed gently into its face: a swatch stack, a tiny presentation slide, a type specimen, an avatar cluster, an icon grid, a motion curve, a folded print sheet. One card near the center sits slightly forward and carries the single purple accent as a slim vertical stripe.

Background is pastel lilac warming into cream toward the center, with soft ambient light pooling behind the composition. Each card receives a faint reflected glow from its neighbor, which sells the depth without a visible light source. Keep the middle calm and low in detail, since the image is cropped to a wide banner.

Palette: lilac, cream, mint, blush, one purple accent.

---

## Вариант B — «Очередь запросов» (200–250 слов)

Create a soft three-dimensional editorial cover illustration, not a flat vector. Lighting is diffused and warm, arriving from above and slightly left, producing long feathered shadows that fade without a hard edge. Objects sit on tiny soft feet and cast contact shadows onto the surface below. Every edge has an elegant hairline outline in a deeper pastel tone. Materials are matte with a faint satin sheen along the curves, never glossy or glass. No photographic realism, no texture, no lettering.

Scene: eight design requests moving through one calm production line, which is what a subscription actually buys you. A gentle S-curve ribbon of soft rounded material runs from the lower left to the upper right, bending twice, casting a soft shadow onto the plane behind it. Along the ribbon sit eight rounded cards, spaced at intervals that grow slightly larger toward the front, so perspective reads as depth. Each card shows one abstract deliverable pressed into its face: a slide deck bleeding off the edge, a stacked pair of ad banners, an icon set, a chart with three soft bars, a folded brochure, a landing page frame, a curling motion arrow, a short video strip with rounded perforations. The nearest card is the focal point and carries the single purple accent as a slim border glow.

Background drifts from pale mint at the top into soft lilac at the bottom, with a warm cream halo behind the central bend.

Palette: mint, lilac, cream, blush, one purple accent.

---

## Вариант C — «Команда в коробке» (200–250 слов)

Create a soft three-dimensional editorial cover illustration in a shallow isometric view, not a flat vector. Use gently volumetric forms with rounded edges, lit by warm diffused light from the upper left that casts long feathered shadows to the lower right. Every object carries a hairline outline one step deeper than its own fill. Surfaces are matte with a faint satin sheen, never glossy, chrome, or glass. No photographic realism, no grain, no lettering.

Scene: a whole design team's output packed into one tidy monthly subscription. A wide low display tray with rounded walls sits at the center, its interior lined in soft blush. Inside, eight objects are arranged loosely with breathing room: a stack of three fanned presentation slides, a pair of rounded ad banners, a square icon tile with one glyph embossed, a swatch wheel, a folded brochure standing upright, a rounded card showing a tiny chart curve, a motion ribbon lifting in a shallow arc, a short video strip with rounded ends. Objects sit at varied heights, each casting a long feathered shadow onto the blush liner, plus a softer shadow where the tray meets the plane beneath it. The chart card carries the single purple accent along its edge.

Background is a pastel cream plane fading into lilac at the upper corners, with gentle falloff and soft ambient occlusion where shapes meet. Keep the composition clustered toward the middle, since the image is cropped to a wide banner.

Palette: cream, blush, lilac, mint, one purple accent.

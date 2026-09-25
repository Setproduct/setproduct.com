# Промпты под обложку статьи «Are you wasting money on SaaS subscriptions? A practical guide»

## Что уже есть и чего не хватает

В frontmatter [`content/blog/saas-subscription-waste.mdx`](content/blog/saas-subscription-waste.mdx:1) сейчас **нет** полей `coverImage`, `coverImageAlt` и `thumbImage` — пост опубликован без обложки по решению автора. Файла обложки в репозитории тоже нет.

Когда обложка появится, в frontmatter нужно добавить:

- `coverImage: /blog/covers/saas-subscription-waste.webp`
- `coverImageAlt: ...` — под выбранный вариант (текст в конце файла)
- `thumbImage: /blog/covers/thumbs/saas-subscription-waste.webp` — после прогона `npm run thumbs:blog`

## Тема и смысл, которые должна передать обложка

Тезис поста: **одна подписка выглядит безобидно, но десятки вместе тихо съедают большую часть бюджета — и их нужно уметь находить.** Отсюда три разных угла визуализации: накопление, незаметность, обнаружение.

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и `image-cover` (`object-fit: cover`). Контейнер — [`public/css/setproduct.webflow.shared.css:3720`](public/css/setproduct.webflow.shared.css:3720): ширина 100%, высота 750 px на десктопе, 200 px на мобильных, скругление 24 px.

Правила композиции:

- Генерировать в 16:9 (1536×864 или 1920×1080).
- Весь смысловой контраст держать в центральных 70% кадра — края обрезаются.
- Та же картинка идёт в карточку листинга 385 px, поэтому главное должно читаться на превью размером с ноготь.
- Светлый фон, но **не белый**: сиреневая `#EDE7FF`, кремовая `#FFF3E2`, мятная `#E6F4EC`, румяная `#FFE8E8`. Акцент — фиолетовый `#7C4DFF`.

Ниже три промпта. Стиль изображения в них сознательно не задан — вы выбираете его сами; описаны только сцена, композиция, палитра и технические ограничения.

---

## Вариант A — «Одна плитка против всего стога» (накопление)

Create an editorial cover illustration on a light pastel lilac background (#EDE7FF), with a soft warm cream glow gathering behind the center of the frame. Keep the background light but never pure white, and leave no visible frame or border around the image.

Concept: a single SaaS subscription looks harmless on its own, but dozens of them together quietly consume a large share of a company budget. The composition should make the gap between one tile and the whole stack readable in a single glance.

Composition: a low, wide heap of small identical rounded tiles spreads across the lower two thirds of the frame, overlapping like a pile of receipts. Every tile shares the same geometry: the same corner radius, the same thin outline, the same small circular price dot, and a short horizontal bar where a product name would sit. The repetition should read as one endless category of tools rather than as many different products. The heap grows from left to right. On the far left, only two or three lonely tiles sit apart with plenty of empty space around them. Toward the center and the right side, the tiles multiply into a dense, rising bank that fills a large part of the frame.

Above the leftmost tiles, floating alone in open space, place one single tile drawn noticeably larger than the rest. It is clean and isolated, marked with one thin purple accent (#7C4DFF) so the eye treats it as the only subscription a founder actually notices. A faint dotted arc curves from that single tile down into the dense bank on the right, linking the one you see with the many you never do.

Behind the heap, a few very soft pastel circles in pale mint (#E6F4EC) and blush (#FFE8E8) drift to suggest depth without adding noise.

Palette: pastel lilac background, warm cream, pale mint, soft blush, near-black tiles, and one purple accent #7C4DFF. Keep every meaningful contrast inside the central seventy percent of the frame, because the cover is cropped into a wide banner. The single large tile and the dense bank should both stay clearly readable when the image is scaled down to a small listing thumbnail. Add no readable text, no logos, and no numerals, only abstract bars and dots.

---

## Вариант B — «Одна прозрачная плитка в стене подписок» (незаметность)

Create an editorial cover illustration on a light pastel cream background (#FFF3E2) that shifts gently into pale mint (#E6F4EC) toward the edges. Keep the background light but never pure white, and draw no outer frame.

Concept: SaaS waste is hard to notice because every subscription looks identical and disappears into the crowd. The image should show a wall of repeating subscription tiles in which a single one has become transparent, exposing the money it quietly draws from.

Composition: the full frame is covered edge to edge with a tight, even grid of identical small rounded tiles, arranged like wallpaper. Each tile follows the same template: the same corner radius, a thin outline, a small circular price dot, and one short horizontal bar where a name would be. The grid is dense and uniform enough that it reads as texture rather than as separate products, which is the whole point.

Near the center of the frame, one tile breaks the pattern. It is rendered as a transparent, glass-like panel so the eye can see straight through it into a simple layered bar underneath, a flat budget line drawn as a thin horizontal band that visibly narrows at exactly that spot. Around this see-through tile, a small handful of neighbouring tiles fade to a washed-out, half-transparent state, as if the camouflage is starting to lift across a whole cluster.

A thin purple accent line (#7C4DFF) traces the contour of the transparent tile and follows a short arrow downward to a single falling dot, separating from the budget band, so the leak is legible without any words.

Palette: cream background, pale mint wash at the edges, soft blush highlights (#FFE8E8), pastel lilac (#EDE7FF) tiles, near-black outlines, and one purple accent #7C4DFF. Keep the transparent tile and the leaking dot inside the central seventy percent of the frame, since the cover is cropped to a wide banner, and make sure the transparent tile stays obvious at thumbnail size. No readable text, no logos, no numerals.

---

## Вариант C — «Луч аудита по стене подписок» (обнаружение)

Create an editorial cover illustration on a light pastel mint background (#E6F4EC) with a soft lilac (#EDE7FF) gradient rising toward the top corners. Keep the background light but never pure white, and add no border or frame.

Concept: the practical part of the article, actually finding the waste. The image should show an audit in progress: a scanning beam sweeping across a field of subscription tiles and lighting up the forgotten ones that nobody looks at.

Composition: a dense band of small identical rounded tiles runs horizontally across the middle of the frame, sitting slightly below center and stretching from the left edge to the right. Each tile carries the same geometry, the same thin outline, a small circular price dot, and a short bar where a product name would be. Most tiles sit dim and desaturated, low contrast against the background, as if they have not been checked in months. They blur gently at the far left and far right, suggesting the stack continues beyond the frame.

From the upper left, a narrow cone of light, drawn as two soft pastel beams, sweeps down and across the row. Where the cone touches the tiles, they brighten sharply and pick up a purple accent (#7C4DFF): these are the subscriptions the audit has just caught. Inside the lit patch, three or four tiles change state visibly. One shows a small crossed-out circle on its price dot, a subscription being cancelled. Another shows two overlapping tiles merging into one, a duplicated tool being consolidated. A third shows a small keyhole or padlock mark, a licence still active for someone who has left the team.

Below the row, one short purple line drops from a lit tile to a small flat dot resting on the ground line, standing for the recurring charge that finally stops.

Palette: pale mint background, lilac gradient, cream and blush tile accents (#FFF3E2, #FFE8E8), near-black outlines, one purple accent #7C4DFF. Keep the lit cluster and the beam inside the central seventy percent of the frame, and keep the caught tiles readable at small thumbnail size. No readable text, no logos, no numerals.

---

## Какой брать

**Вариант A** — самый прямой: буквально показывает, как много мелких плиток превращаются в общий стог, и легко читается в маленькой карточке листинга. **Вариант B** тоньше по смыслу: он про то, почему трату не замечают (маскировка под одинаковую стену), и хорошо работает как метафора «невидимого» расхода. **Вариант C** — единственный, кто визуализирует вторую половину тезиса, «here is how to find them», и поэтому лучше всего соответствует прикладному характеру поста, но у него больше мелких деталей, которые могут слегка сливаться на превью.

## После генерации

1. Положить файл как `public/blog/covers/saas-subscription-waste.webp` (16:9, WebP).
2. Запустить `npm run thumbs:blog` — скрипт создаст превью 800 px в `public/blog/covers/thumbs/`.
3. Добавить в frontmatter поста `coverImage`, `thumbImage` и `coverImageAlt` под выбранный вариант.
4. Запустить `node check_images2.js`, чтобы убедиться, что путь к обложке резолвится корректно.

# Второй по сложности момент + 3 промпта для Nano Banana Pro

Дополнение к [`plans/why-every-ai-startup-looks-the-same-visuals.md`](plans/why-every-ai-startup-looks-the-same-visuals.md:1).

Первая картинка (воронка сходимости, [`строка 103`](content/blog/why-every-ai-startup-looks-the-same.mdx:103)) уже стоит в конце секции «Where the uniform came from» и закрывает весь блок причин: референсы, библиотеки, генераторы, цикл «AI designing AI» и `Category signaling`. Значит, второй момент нужно брать в другой части статьи.

## Второй самый сложный для понимания момент

Раздел **«What sameness actually costs you»** ([строки 105-119](content/blog/why-every-ai-startup-looks-the-same.mdx:105)) — экономическое и доверительное ядро статьи.

Почему он сложнее остального. Здесь статья впервые отвечает на главное возражение читателя: «ну и что, что мы похожи, покупателю важны фичи». Ответ строится на цепочке, которую невозможно удержать в голове из чистого текста:

1. Одно визуальное решение (тёмный фон + свечение + чат-бокс) порождает **четыре разных ущерба**: потеря узнаваемости, подозрение в обёртке, ценовое сжатие, невидимость в ленте.
2. Каждый ущерб — из другой области: память (Lindgaard, 50 мс), доверие, экономика, внимание в соцсетях.
3. Самое коварное — **ценовое сжатие**. Читатель-дизайнер привык считать визуал декором. Текст утверждает обратное: когда два продукта визуально неразличимы, единственная оставшаяся ось сравнения — цена, а значит дизайн был сильнейшим неценовым сигналом, и его выбросили.
4. Плюс инверсия доверия: самый тёмный интерфейс в софте теперь ассоциируется с самыми тонкими продуктами. То есть глубокий продукт в обёртке тонкого вызывает ровно тот скепсис, которого избегал.

Это не пример, который можно показать пальцем на скриншоте, а причинно-следственная механика. Именно её и нужно визуализировать.

## Куда вставлять

Внутри раздела `## What sameness actually costs you`, сразу после вводного абзаца «The uniform carries a price. It trades four things you needed for one thing you never asked for» ([строка 107](content/blog/why-every-ai-startup-looks-the-same.mdx:107)). Тогда читатель получает карту четырёх ущербов до того, как начнёт читать их по отдельности, и дальше идёт по тексту уже ориентируясь.

Альтернатива: между блоками `**Price compression.**` и `**Invisible in the feed.**`, как визуальная пауза перед финальным усилителем.

## Общие требования (для всех трёх)

Строго белый фон `#FFFFFF`, плоский вектор, тонкие чёрные линии около 2 px, без градиента на фоне, без тени от картинки, без текстуры бумаги и рамки. Единственный акцент — фиолетовый `#7C4DFF`. Вторичные оттенки — тёплый серый. Типографика: современный геометрический гротеск, sentence case, без декоративных шрифтов. Все подписи резкие и без ошибок. Никакого 3D, бликов и «стеклянных» эффектов — стиль сухого редакционного рисунка.

---

## Вариант A — «One decision, four damages» (каскадная инфографика, 16:9)

Create a clean flat vector cascade infographic on a pure white background (#FFFFFF), no background gradient, no shadow cast on the page, no paper texture, no outer frame. It explains the hidden cost of a single visual decision for an editorial article about why AI startup landing pages all look the same.

Composition flows left to right in two stages, joined by slim purple #7C4DFF arrows.

Stage one, far left, labelled One decision. Draw a small stack of three identical browser tiles at an angle: a near-black rectangle, a purple radial glow in one corner, a four-point sparkle, and a chat input bar. Caption beneath: adopt the default look.

Stage two fans out into four parallel branches stacked vertically, each with its own icon and short label, all in equal visual weight.

Branch one, labelled Recall. A small head silhouette with a dotted empty rectangle where a memory should sit. Caption: nothing distinctive to store.

Branch two, labelled Trust. A shield outline with a thin crack. Caption: depth reads as wrapper clothing.

Branch three, labelled Price. Two identical price tags side by side, connected by a single double-headed arrow, with no other axis visible. Caption: only the number is left to compare.

Branch four, labelled Attention. A vertical column of six identical grey cards, with a thumb scrolling past and never stopping. Caption: no edge to catch on.

At the far right, draw the four branches converging into one wide bar that slowly drains from purple to pale grey, labelled competitive value.

Typography: modern geometric sans-serif, black, sentence case, generous spacing. Palette: black, white, light grey and purple #7C4DFF only. Keep the layout airy and legible at thumbnail size. Render every label sharply and correctly spelled.

---

## Вариант B — «The wrapper tell» (двухпанельная инверсия доверия, 16:9)

Create a minimal two-panel editorial diagram on a pure white background (#FFFFFF), flat vector, thin black line work, no background gradient, no drop shadow, no texture, no border. It visualizes a trust inversion for an article about sameness in AI startup design.

Split the canvas into two equal panels with a thin vertical rule, and make them mirror each other so the reversal is obvious at a glance.

Left panel, titled What the dark look used to mean. Show a near-black browser tile with a purple glow, a sparkle and a chat bar. Beneath it, a short horizontal trust meter filled almost fully in purple #7C4DFF, labelled perceived substance. Two small excerpts sit under the meter: serious infrastructure, and real engineering. The panel reads as an asset.

Right panel, titled What the same look means now. Show the identical tile, but underneath, place a small stack of three thin, ghosted wrapper tiles drawn in pale grey to suggest a copy economy. The matching trust meter is now almost empty and outlined in grey, labelled perceived substance. The two excerpts change to: thin wrapper, and prompt in a trench coat. A slim purple arrow across the divider marks the shift.

Add one short annotation strip along the bottom of the whole canvas in sentence case: the visual became a tell, not a badge.

Typography: modern geometric sans-serif, black, sentence case, uniform weight, no decorative type. Palette: black, white, light grey and purple #7C4DFF. Aspect ratio 16:9. All text sharp and correctly spelled, with generous white space so the diagram reads instantly at thumbnail size.

---

## Вариант C — «The comparison collapse» (график + схема, 16:9)

Create a clean editorial chart-and-diagram combination on a pure white background (#FFFFFF), flat vector style, thin precise black rules, no background gradient, no shadow, no texture, no frame. It shows how visual indistinguishability removes every comparison axis except price, for an article about identical AI startup landing pages.

Top half, a line chart. Horizontal axis with three tick marks labelled low, medium and high, titled how different the two products look. Two smooth curves: an ascending purple #7C4DFF line labelled what buyers can tell apart, and a descending black line labelled what they fall back on. Where the purple line drops toward zero, the black line rises steeply, and the crossing point is marked with a small hollow circle and a callout reading: from here, only price speaks.

Bottom half, a compact schematic. Draw three side-by-side vertical rulers, each representing a comparison axis: features, brand and price. Under the first ruler, a small caption says defence is expensive. Under the second, a caption says it takes years to build. Under the third, a caption says it is the last one left standing. Give the first two rulers a pale grey fill and the third a light purple wash, so the eye lands on price as the survivor.

Add one slim horizontal bar beneath everything, draining from purple to grey, labelled pricing power.

Typography: modern geometric sans-serif, black, sentence case, no shouting weight except the panel titles. Palette: black, white, light grey and purple #7C4DFF only. Aspect ratio 16:9, airy layout, legible at thumbnail size, all text sharply rendered and correctly spelled.

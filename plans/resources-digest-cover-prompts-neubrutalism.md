# Обложка для open-source-tools-digest-2026-10 — три небруталистских промпта

## Как снят конфликт стиля и палитры

Небрутализм по умолчанию требует кислотных заливок. Прежнее условие — строго светлая пастель. Компромисс, который держится в трёх промптах ниже:

| Приём небрутализма | Как применён |
|---|---|
| Жирный чёрный контур | 6–8 px по всем объектам, `#111111`, без смягчения |
| Жёсткая офсетная тень | смещение точно вправо-вниз, без размытия вообще, цвет `#111111` либо тонированный |
| Плоская заливка | ни одного градиента, ни одного блюра, ни одного блика |
| Строгая фронтальная проекция | сетка строго в плоскости кадра, все плитки одного размера и без наклона |
| Пастельная гамма | фон и заливки светлые, чёрный работает только как контур и тень |

Плюс два содержательных элемента, которых не было в первом варианте: ровно **десять** объектов по числу пунктов и **один элемент пунктирным контуром без заливки** — это пункт без релизного тега, о котором говорит финал статьи ([строка 201](../../content/blog/open-source-tools-digest-2026-10.mdx:201)).

Общее для всех: 1920×1080, весь сюжет в центральных 90% кадра, скругление углов даёт контейнер hero, текста в кадре нет.

---

## Вариант A. Фронтальная сетка, лавандовый фон

Палитра: фон `#EDE7FF`, заливки `#CFEFE4`, `#FFF3D6`, `#FFD9E4`, `#D8CCFF`, контур и тень `#111111`.

```
Flat neubrutalist illustration for a technology blog cover, strictly two
dimensional with no perspective and no camera tilt. A pale lavender background
(#EDE7FF) holds a perfectly frontal five-by-two grid of ten identical squares,
all the same size, all edges parallel to the frame, evenly spaced with wide
gutters. Every square is filled with one flat pastel colour, mint (#CFEFE4),
butter cream (#FFF3D6), powder pink (#FFD9E4) or lilac (#D8CCFF), outlined with a
heavy black stroke of uniform weight and casting one hard unblurred black shadow
offset down and to the right. Inside each square sits a single heavy black
line-art glyph drawn with the same stroke weight, no fills inside the glyphs: a
document with a folded corner, a toggle switch, a dial with one needle, a
magnifying glass over a folder, three stacked bars, a colour wheel, a glass panel
with three refraction lines, a small flag on a pole, two meshing gears, and a
plus inside a circle. Nine squares are solid pastel, the tenth square in the
lower right corner is drawn only as a dashed outline with no fill and no shadow,
so it reads as an empty slot. No gradients, no soft shadows, no glow, no
texture. Generous empty margin on all sides, every square inside the central
ninety percent of the frame. No text, no letters, no numbers, no logos, no
people, no screenshots.
```

---

## Вариант B. Ступенчатая сетка со смещением, мятный фон

Палитра: фон `#DFF3E9`, заливки `#FFF0C4`, `#FFDCC9`, `#E4DBFF`, `#FFE3E6`, контур `#111111`, тень тонированная.

```
Flat neubrutalist cover illustration, completely two dimensional, no perspective,
no rotation, no depth of field. On a pale mint background (#DFF3E9), ten cards
are arranged in a staggered grid: five cards in the upper row, five in the lower
row, the lower row shifted horizontally by half a card width so the columns
interlock. All cards are the same size and strictly parallel to the frame
edges. Each card is a flat rectangle with a very slight corner rounding, filled
in one solid pastel tint, butter yellow (#FFF0C4), peach (#FFDCC9), pale lilac
(#E4DBFF) or blush (#FFE3E6), framed by a bold black outline of even weight, and
carrying a single hard shadow with no blur, offset diagonally down and right,
tinted a darker version of the card colour rather than pure black. Each card
holds one bold black pictogram in heavy uniform line weight: a document with a
folded corner, a switch, a gauge, a magnifier, a stack of three bars, a colour
wheel, a glass sheet with refraction marks, a flag, two gears, a plus in a
circle. One card, second from the right in the lower row, is an unfilled dashed
rectangle with no pictogram and no shadow, a deliberate empty slot among solid
ones. Absolutely flat colour, no gradients, no gloss, no grain, no vignette.
Wide even margins, all cards inside the central ninety percent of the frame. No
text, no letters, no numbers, no logos, no people, no interface screenshots.
```

---

## Вариант C. Один крупный блок и девять малых, сливочный фон

Палитра: фон `#FBF6EC`, заливки `#FFD9E4`, `#D7EFE1`, `#FFF0C4`, `#D8CCFF`, контур `#111111`.

```
Flat neubrutalist editorial illustration, no perspective whatsoever, camera
straight on, every element parallel to the picture edges. A pale cream
background (#FBF6EC). One large square block occupies the left third of the
frame, and nine smaller squares are stacked in three rows of three on the right,
all perfectly aligned, all with equal gutters, all sharing the same black outline
weight. The large block is filled flat with a stronger lilac (#D8CCFF) and holds
a bold black line drawing of a single gear meshing with a second smaller gear;
the nine small blocks are filled with alternating powder pink (#FFD9E4), pale
mint (#D7EFE1), butter cream (#FFF0C4) and lilac, each holding one heavy black
pictogram: a document with a folded corner, a switch, a gauge, a magnifier over a
folder, three stacked bars, a colour wheel, a glass panel with refraction marks,
a flag on a pole, a plus in a circle. Every block carries one hard unblurred
black shadow offset down and right by the same distance, so the grid reads as a
single consistent system. One of the nine small blocks is left as a dashed
outline with no fill, no pictogram and no shadow. Absolutely flat colour fields,
no gradient, no soft shadow, no highlight, no texture, no blur. Composition
centred, nothing near the edges, everything inside the central ninety percent of
the frame. No text, no letters, no numbers, no logos, no brand marks, no people,
no screenshots, no neon.
```

---

## Alt-тексты

| Вариант | `coverImageAlt` |
|---|---|
| A | Ten outlined pastel squares with heavy black tool glyphs in a strict grid |
| B | Ten pastel cards in a staggered grid with bold black pictograms and hard shadows |
| C | One large lilac gear block beside nine outlined pastel tool blocks |

## После генерации

1. Сохранить как `public/blog/covers/open-source-tools-digest-2026-10.webp`, 1920×1080.
2. `npm run thumbs:blog` — появится превью в `covers/thumbs/`.
3. Обновить `coverImageAlt` в `content/blog/open-source-tools-digest-2026-10.mdx`, строка 8.
4. Проверить на `/blog/open-source-tools-digest-2026-10`, что при кропе 1312×750 ни один блок не срезан.

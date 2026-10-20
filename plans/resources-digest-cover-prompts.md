# Обложка для open-source-tools-digest-2026-10 — три промпта для Nano Banana Pro

## Что важно знать перед генерацией

| Параметр | Значение |
|---|---|
| Файл | `public/blog/covers/open-source-tools-digest-2026-10.webp` |
| Размер | 1920×1080, WebP |
| Реальный кроп в hero | ≈1312×750 px, то есть **1.75:1**, чуть уже 16:9 |
| Что из этого следует | держать весь сюжет в центральных 90% кадра, по 5% отступа с каждой стороны |
| Скругление | контейнер обложки уже даёт `radius-24`, своё скругление в картинке не нужно |
| Превью | `npm run thumbs:blog` после сохранения файла |

Общее для всех трёх промптов: светлая пастель, никакого текста в кадре (пост универсальный, заголовок уже стоит рядом в hero), никаких скриншотов и логотипов, потому что десять скриншотов утилит и так идут в теле статьи.

---

## Вариант 1. Фростед-плитки, лиловая палитра

Палитра: лаванда `#EDE7FF`, мята `#CFEFE4`, сливки `#FFF3D6`, пудровый розовый `#FFD9E4`, лиловый акцент `#D8CCFF`.

```
A bright, airy 3D illustration for a technology blog cover, rendered in a soft
clay and frosted glass style. A shallow perspective grid of nine rounded square
tiles floats above a pale lavender background (#EDE7FF), arranged in a loose
three-by-three layout that tilts gently away from the viewer, so the tiles feel
like objects resting on an invisible plane rather than a flat diagram. Each tile
is a translucent frosted panel with a thick opaque rim and a soft matte surface,
tinted pastel mint (#CFEFE4), butter cream (#FFF3D6), powder pink (#FFD9E4) and
lilac (#D8CCFF). On each tile sits a single simple abstract object suggesting a
utility: a stacked document with a folded corner, a rounded toggle switch, a
circular dial with a slim needle, a magnifying glass over a folder, three stacked
cards, a colour wheel, a glass panel with refraction lines, a small flag on a
pole, two meshing gears. Objects are smooth, matte and toy-like, with no sharp
edges. Diagonal soft light from the upper left, gentle contact shadows only, no
harsh contrast. The lower right tile is slightly larger and tinted a more
saturated lilac to anchor the composition. Generous negative space around all
edges, every tile stays inside the central ninety percent of the frame. Light
pastel palette throughout, no dark tones anywhere. No text, no letters, no logos,
no brand marks, no people, no wireframes, no interface screenshots, no neon.
```

---

## Вариант 2. Натюрморт на подиуме, персиково-шалфейная палитра

Палитра: сливочный `#FBF6EC`, персиковый `#FFDCC9`, шалфей `#CDE3D4`, масляный `#FFF1D2`, румяный `#FFE3E6`, прохладный акцент `#E4DBFF`.

```
A soft three-dimensional still-life illustration for a blog cover about useful
developer tools, rendered like a pastel clay product shot. On a pale cream
background (#FBF6EC) sits a low rounded pedestal of matte putty in warm sage
green (#CDE3D4), seen from a gentle three-quarter angle. On and around the
pedestal, a cluster of eight smooth abstract objects is arranged in a loose,
natural composition: a rounded document shape with a curled corner leaning
upright, a slim toggle switch, a small dial with a single needle, a magnifying
glass resting flat, a stack of three rounded cards fanned slightly, a
translucent glass slab with soft refraction lines, a short flag on a thin pole,
and two small interlocking rings. Objects are tactile and toy-like with matte
surfaces, soft rounded silhouettes and no sharp corners, coloured in pastel
peach (#FFDCC9), butter cream (#FFF1D2), warm sage (#CDE3D4) and pale blush
(#FFE3E6). One object, the glass slab, catches a faint lilac tint (#E4DBFF) as
the only cooler accent. Diffuse daylight from the upper left, very soft ambient
occlusion, no hard shadows, no reflections harsher than a soft sheen. The
cluster sits slightly low and right of centre so the upper left stays empty, and
everything remains inside the central ninety percent of the frame. Airy, calm
and premium, light pastel palette only. No text, no letters, no logos, no
people, no interface screenshots, no dark background, no neon.
```

---

## Вариант 3. Веер из полупрозрачных листов, голубо-жёлтая палитра

Палитра: небесный `#E8F2FB`, пудрово-голубой `#CFE3F7`, масляный `#FFF0C4`, мята `#D7EFE1`, абрикос `#FFE0CB`.

```
A light, airy conceptual illustration for a blog cover about a collection of open
source utilities, built from soft translucent sheets. Seen from a shallow angle,
seven thin frosted panels fan out in a gentle arc across a pale sky-blue
background (#E8F2FB), overlapping like cards laid on a light table. Each panel
is a rounded rectangle of frosted acrylic in pastel tints of powdery blue
(#CFE3F7), buttery yellow (#FFF0C4), pale mint (#D7EFE1) and soft apricot
(#FFE0CB), finished with a crisp one-pixel lighter rim and a subtle inner glow.
On each panel a single simple abstract glyph is embossed rather than printed, so
it reads as a shape pressed into the material: a rounded rectangle with a folded
corner, a chevron, a magnifier, a slider track with a knob, three horizontal bars
of different lengths, a circular arrow, and a small plus inside a circle. Thin
dotted connection lines in a slightly deeper blue arc between the panels,
suggesting a flow rather than a diagram. One panel is lifted a little higher than
the rest with a soft shadow underneath, tinted a touch more apricot to create a
single focal point. Diffuse even lighting, no harsh contrast, no glossy
highlights. The whole fan stays inside the central ninety percent of the frame
with generous empty margins on every side. Overall mood fresh, clean and
optimistic, light pastel palette only, no dark areas. No text, no letters, no
numbers, no logos, no brand marks, no people, no interface screenshots, no neon,
no heavy shadows.
```

---

## После генерации

1. Сохранить выбранный кадр как `public/blog/covers/open-source-tools-digest-2026-10.webp`, 1920×1080.
2. Запустить `npm run thumbs:blog`, появится `covers/thumbs/open-source-tools-digest-2026-10.webp`.
3. Обновить `coverImageAlt` в `content/blog/open-source-tools-digest-2026-10.mdx`, строка 8:

| Вариант | Alt |
|---|---|
| 1 | Nine frosted pastel tiles with abstract tool shapes floating in a soft grid |
| 2 | Pastel clay still life of abstract tools on a sage pedestal |
| 3 | Seven translucent pastel panels fanned out with embossed tool glyphs |

4. Открыть `/blog/open-source-tools-digest-2026-10` и убедиться, что при кропе 1312×750 не срезается ни один объект.

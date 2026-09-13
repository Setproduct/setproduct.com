# Визуальные промпты для статьи «Why every AI startup looks the same»

## Самый сложный для понимания момент

Раздел **«AI designing AI»** внутри «Where the uniform came from» — то есть механизм, из-за которого униформа воспроизводит сама себя. Читатель легко соглашается с тезисом «все копируют три референса», но не понимает главного: почему это не мода, а **замкнутый самоусиливающийся цикл**, из которого нельзя выйти, просто «постаравшись». Это абстрактная системная динамика без цифр и без картинки. Именно здесь нужна визуализация.

## Куда вставлять

- **Вариант A (воронка)** — после блока `### AI designing AI`, вместо существующего placeholder `{/* IMAGE: lineage diagram ... */}`.
- **Вариант B (цикл)** — прямо внутри `### AI designing AI`, сразу под первым абзацем.
- **Вариант C (сужение)** — в начале раздела `## What sameness actually costs you` как визуальный мостик от причин к последствиям.

## Общие требования (для всех трёх)

Строго белый фон `#FFFFFF`, плоский вектор, тонкие чёрные линии, без градиента на фоне, без тени от картинки на странице, без текстуры бумаги и без рамки. Акцент — только `#7C4DFF`. Подписи — sentence case, геометрический гротеск, без декоративных шрифтов. Текст должен быть резким и без ошибок.

---

## Вариант A — «The convergence funnel» (схема + инфографика)

Create a clean, flat vector infographic on a pure white background (#FFFFFF), no background gradients, no shadows cast on the page, no paper texture, no outer frame. The image explains one idea: many different inputs converge into one identical output. It is a convergence funnel diagram for an editorial article about why AI startup landing pages all look the same.

Composition, left to right. On the far left, draw three distinct labeled clusters, each in its own muted accent color and clearly different in shape from the others. Cluster one, labeled Same references, holds three small wordmark-like rectangles for Linear, Vercel and OpenAI. Cluster two, labeled Same component libraries, holds tiny stacked UI blocks labeled shadcn/ui and Tailwind UI. Cluster three, labeled Same page generators, shows a small cursor and a one-line prompt labeled v0, Lovable, Bolt. These three clusters must look visibly unlike each other so the contrast lands.

From all three clusters, thin lines flow rightward into the neck of a large funnel. Draw the funnel with a precise black outline, roughly two pixels, and a light warm-grey interior. At the neck, all lines merge into one single stream, visually squeezed together.

On the right of the funnel, that single stream repeats into a tidy grid of nine identical small browser tiles, three by three. Every tile is the same: a near-black rectangle, a purple radial glow in one corner, a four-point sparkle icon, a white sans-serif headline bar, and a chat input field. Above the grid place a small caption: One look, produced a thousand times.

Typography: modern geometric sans-serif, black text, sentence case, generous letter spacing. Palette limited to black, white, light grey, and three muted accents including purple #7C4DFF. Aspect ratio 16:9. Keep the layout airy with abundant white space so it reads instantly at thumbnail size. Render all text sharply and correctly spelled.

---

## Вариант B — «The loop that closed the trap» (циркулярная диаграмма)

Create a minimal editorial circular diagram on a pure white background (#FFFFFF), flat vector style, thin precise black line work, no background gradient, no drop shadow on the page, no texture, no border. The diagram visualizes a self-reinforcing feedback loop titled in clean black sans-serif at the top: The loop that closed the trap.

Draw a large circle built from four curved segments with arrowheads, arranged clockwise like a clock face. Each segment connects outward to a labeled node. Node one, at the top: Generators trained on existing AI pages. Node two, at the right: They output the average of the genre. Node three, at the bottom: Those pages ship and go live. Node four, at the left: They become the next training data. The curved arrows must clearly run from one to two to three to four and back to one, forming a closed cycle with no start and no end.

In the exact center of the ring, draw one small dot with a short horizontal marker, labeled variance. Around it, draw three faint concentric outlines, each smaller than the last, to suggest that the range of visual variety shrinks with every turn of the loop. Add a slim leader line to a small annotation that reads: Each cycle narrows the range.

Palette: black strokes, white fill, one purple accent (#7C4DFF) used only on the arrows, one warm grey for the secondary concentric outlines. Typography: modern geometric sans-serif, sentence case, uniform size, no shouting weight except the title. Aspect ratio 1:1. All text sharp and correctly spelled. Keep generous white space and aim for the clarity of a printed textbook figure.

---

## Вариант C — «How the range of looks collapsed» (график + таймлайн)

Create a clean horizontal timeline-and-area-chart combination on a pure white background (#FFFFFF), flat editorial infographic style, thin black rules, no background gradient, no shadow, no texture, no frame. It shows how visual variety across AI startup landing pages collapsed over time, and it must read as a conceptual illustration, not as measured data.

Layout: a horizontal axis across the middle with five tick marks labeled by year: 2019, 2021, 2023, 2025, 2026. Above the axis, a wide irregular band represents the range of visual variety across the category. At 2019 the band is thick and wavy, made of many distinct colored threads, each thread a different style: a serif editorial line, a bright light-mode line, an earthy claymorphism line, a monochrome line, a raw brutalist line. As the band moves right, the threads merge and the band narrows sharply, until at 2026 it is a single thin purple line lying flat on the axis, ending in a four-point sparkle.

Annotate three milestones with slim vertical markers and small callouts above the band: at 2021, Linear and Vercel set the dark template. At 2023, shadcn/ui becomes the default. At 2025, v0, Lovable and Bolt generate the page. Every label in sentence case.

Below the axis, add a compact two-column legend titled Still available, listing the surviving threads with their colors, to imply the alternatives never disappeared, they were simply not chosen.

Typography: modern geometric sans-serif, black, consistent weight, no decorative type. Palette: black, white, grey, purple #7C4DFF, plus the muted thread colors. Aspect ratio 16:9. Render all text sharply and correctly spelled. Keep it airy and legible at thumbnail size.

# Визуализация самого сложного момента — computer-vision-consultancy-what-the-right-engagement-model-looks-like

## 1. Самый сложный для понимания момент

**Сравнение трёх моделей вовлечённости (project-based / retainer / embedded) между собой.**

Это не одна сложная концепция, а **три параллельные концепции**, которые статья разворачивает последовательно, а не рядом — из-за этого читателю приходится держать в голове сразу шесть переменных:

- [Model 1: Project-based delivery](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:29) — когда работает, когда не работает, что заложить в контракт.
- [Model 2: Retainer-based advisory](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:39) — то же самое, но другие условия.
- [Model 3: Embedded team engagement](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:49) — то же самое, но третий набор условий.

Почему это тяжелее всего остального в статье:

1. **Три модели вместо одной.** Каждая описана в отдельном блоке из 4 абзацев (~130 слов), и к моменту, когда читатель добирается до Model 3, детали Model 1 уже стёрлись из памяти. Сравнить модели друг с другом текстом невозможно — нужно физически прокручивать назад.
2. **Одинаковая структура, разное содержание.** Все три раздела отвечают на одни и те же четыре вопроса (ч��о это, когда работает, когда ломается, что зафиксировать в контракте), но именно эта параллельность плохо читается в линейной прозе — она создана для таблицы или матрицы, а не для последовательных абзацев.
3. **Решение принимается на пересечении, а не внутри одной модели.** Ценность раздела — не "что такое retainer", а "какая модель подходит МНЕ", то есть сравнение по осям: степень вовлечения внутренней команды, риск зависимости, что происходит после завершения контракта. Именно эта ось нигде не проговорена явно в тексте.

**Ближайшие конкуренты (второе и третье место):**
- ["Знаниевый разрыв" / knowledge transfer problem](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:75) — абстрактный тезис про "capability vs dependency", но он линеен и не требует сравнения нескольких сущностей.
- [Model drift после доставки](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:93) — интуитивно понятен (точность падает со временем), достаточно одного простого графика, сложность ниже.

Раздел с тремя моделями выигрывает по сложности, потому что несёт саму развилку принятия решения — остальной текст статьи так или иначе следует из выбранной модели.

---

## 2. Общая дизайн-система для всех трёх версий

- **Фон: строго белый `#ffffff`**, без градиентов, теней, текстур, шума.
- Палитра: акцент Setproduct `#7c4dff`, три модели различаются вспомогательными акцентами — мятный `#22c55e` (project-based), янтарный `#f59e0b` (retainer), сиреневый `#7c4dff` (embedded); текст `#19181b`, волосяные линии `#e5e7eb`.
- Стиль: плоский вектор, штрих 1.5px, радиус 8px, много воздуха, без фотореализма, без 3D, без лиц и людей.
- Типографика: геометрический sans для подписей, monospace только для коротких меток/цифр (60-90 дней, 5%, и т.п.).
- Никаких логотипов, никаких названий компаний, никакого намёка на конкретного консалтингового брендинг — только абстрактная схема моделей вовлечённости.

---

## 3. Три версии (промпты для генерации)

### Версия 1 — Сравнительная матрица: три модели на четырёх осях

**Тип:** flat vector comparison matrix / table-as-diagram. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Clean flat vector comparison matrix on a strictly pure white background, no gradients, no shadows, no textures, no photorealism. The layout is a table-like grid with three vertical columns and four horizontal rows, drawn as soft rounded rectangles connected by thin 1px grey hairlines rather than harsh table borders.

Each column has a header pill in a distinct color: the first column header is mint green (#22c55e) and labeled PROJECT-BASED, the second is amber (#f59e0b) and labeled RETAINER, the third is purple (#7c4dff) and labeled EMBEDDED TEAM. Below each header, draw a small abstract icon summarizing the model without any text: for project-based, a single closed box with a checkmark; for retainer, a recurring circular arrow with a small clock; for embedded, two overlapping figure-eight loops representing two teams merging.

The four rows below represent comparison criteria, each with a small icon and short label on the far left in dark grey monospace: row one WHO OWNS DELIVERY (a single flag icon), row two INTERNAL TEAM INVOLVEMENT shown as a horizontal fill bar that is nearly empty for project-based, half-filled for retainer, and almost full for embedded, row three RISK OF DEPENDENCY shown as a small gauge dial pointing high for project-based, medium for retainer, low for embedded, row four BEST WHEN shown as a tiny building-block icon whose complexity increases left to right (one block, three blocks, a small connected cluster of blocks).

Keep all icons minimal, geometric, and legible at small size, since the same image will render in a narrow content column. Use consistent 1.5px stroke weight, 8px corner radius on every card, and generous white padding between cells. Palette strictly limited to mint #22c55e, amber #f59e0b, purple #7c4dff, near-black #19181b for text and icon strokes, and light grey #e5e7eb for hairlines and dividers. No readable long sentences anywhere, only short labels, no human figures, no 3D, no gloss, no stock-photo feel. The overall impression should read instantly as "compare these three side by side" even without reading a single word.
```

### Версия 2 — Инфографика: спектр вовлечённости от «отдать» до «вырастить»

**Тип:** flat horizontal spectrum infographic. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Minimal flat-vector infographic on a strictly pure white background depicting a single horizontal spectrum bar running left to right across the center of the frame, with no gradients, no shadows, no textures, and no photorealistic elements. The bar itself is a thin rounded rectangle track colored light grey (#e5e7eb), and along it sit three evenly spaced circular markers, each connected to a small card floating above or below it.

The leftmost marker is mint green (#22c55e) and sits closest to a label at the far left edge of the bar that reads HANDS OFF in small caps. Above this marker, a card shows a simple icon of a single closed box with an arrow pointing away from it, captioned PROJECT-BASED: scope it, deliver it, walk away.

The middle marker is amber (#f59e0b) and sits at the midpoint of the bar, roughly between the two extremes. Its card, placed below the bar to alternate rhythm, shows an icon of a dashed circular arrow with a small speech-bubble, captioned RETAINER: ongoing advice, internal team builds.

The rightmost marker is purple (#7c4dff) and sits closest to a label at the far right edge of the bar that reads HANDS ON in small caps. Its card, placed above the bar, shows an icon of two interlocking rings of small dots merging into one cluster, captioned EMBEDDED: two teams work as one until it is fully owned inside.

Beneath the entire spectrum, add a thin secondary axis with a small triangular pointer that can conceptually slide, labeled DEPENDENCY RISK on the left fading toward INTERNAL OWNERSHIP on the right, reinforcing that moving right along the bar increases the client's own capability and reduces reliance on the outside consultancy. Keep typography minimal: a clean geometric sans for captions, monospace only for the two axis end-labels. Palette strictly mint #22c55e, amber #f59e0b, purple #7c4dff, near-black #19181b, hairline grey #e5e7eb. No human figures, no 3D, no gloss, generous white space above and below the spectrum so the image reads clearly even scaled down to a narrow blog column.
```

### Версия 3 — Комбинация: дерево решений + три мини-карточки последствий

**Тип:** decision tree + outcome cards. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Flat vector decision diagram on a pure white background combining a simple branching tree with three small outcome cards, no gradients, no shadows, no textures, no photorealism, no human figures. At the top center, a single rounded rectangle node in near-black reads WHAT ARE YOU BUILDING. From it, three thin 1.5px lines branch downward and outward to three second-level nodes, each a small pill: the left pill in mint (#22c55e) reads A ONE-TIME, WELL-DEFINED SYSTEM, the center pill in amber (#f59e0b) reads AN EVOLVING PROBLEM, EXPERTISE GAP INTERNALLY, the right pill in purple (#7c4dff) reads A NEW CAPABILITY YOU WANT TO OWN.

Below each second-level pill, a connecting line drops down to a matching outcome card, all three cards aligned in a row at the bottom third of the frame, same size, same rounded-corner style, differentiated only by their accent color matching the branch above them. The left card, mint-bordered, shows a small closed-box icon and the label PROJECT-BASED, with one tiny green checkmark row reading clear scope and one tiny red cross row reading risk after consultancy leaves. The center card, amber-bordered, shows a recurring-arrow icon and the label RETAINER, with a green checkmark row reading builds internal judgment and a red cross row reading needs ML foundation in-house. The right card, purple-bordered, shows a merging-dots icon and the label EMBEDDED TEAM, with a green checkmark row reading true knowledge transfer and a red cross row reading requires real pairing, not a handoff deck.

Keep the tree lines thin and orthogonal with soft rounded corner joints, not sharp right angles. Keep icons simple geometric shapes, no fine detail that would be lost at small size. Typography: clean geometric sans throughout, no monospace needed here. Palette strictly mint #22c55e, amber #f59e0b, purple #7c4dff for accents, near-black #19181b for text and node fills, light grey #e5e7eb for connecting lines. Generous white margins on all sides, perfectly centered composition, legible even when scaled down to a narrow blog content column.
```

---

## 4. Рекомендованное размещение в статье

| Версия | Куда вставлять | Зачем |
|---|---|---|
| Версия 1 (сравнительная матрица) | Сразу после подзаголовка [`## The three engagement models worth understanding`](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:25), перед вступительным абзацем про три модели | Даёт читателю карту всех трёх моделей до того, как он начнёт читать про них по отдельности — снижает нагрузку на память при чтении трёх последовательных блоков |
| Версия 2 (спектр вовлечённости) | После [`### Model 3: Embedded team engagement`](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:49), перед `## What good computer vision consultancy discovery looks like` | Закрепляет прочитанное единой шкалой "от передачи на аутсорс до полного владения" — переход от детального разбора к обобщающему образу |
| Версия 3 (дерево решений) | В конце статьи, перед финальным абзацем [`The right computer vision consultancy engagement model is the one...`](content/blog/computer-vision-consultancy-what-the-right-engagement-model-looks-like.mdx:107) | Даёт читателю практический инструмент "с чего начать выбор" и создаёт сильный визуальный якорь перед закрытием статьи |

Итог по визуальному ритму: статья получает три белых инфографики, расставленные в начале, середине и конце текстового блока про модели вовлечённости (сейчас это самый длинный сплошной текстовый массив статьи — 5 подряд идущих H2/H3 без единой картинки). Это разбивает монотонный скролл именно там, где он сейчас максимален, и превращает самый сложный для удержания в голове раздел в три визуальные точки опоры.

---

## 5. Что НЕ делать

- Не смешивать цветовую кодировку моделей между версиями — mint = project-based, amber = retainer, purple = embedded должно быть одинаково во всех трёх изображениях, иначе читатель теряет визуальную привязку.
- Не добавлять фотореалистичных людей, 3D-рендеры, офисные стоковые сцены.
- Не использовать градиенты и тени — только плоский вектор и волосяные линии, фон строго белый `#ffffff`.
- Не вставлять названия реальных компаний, логотипы или что-либо, что может читаться как реклама конкретной консалтинговой фирмы — иконки и подписи должны оставаться полностью абстрактными.
- Не перегружать длинным текстом внутри картинки — только короткие лейблы и заголовки, вся аргументация остаётся в теле статьи.

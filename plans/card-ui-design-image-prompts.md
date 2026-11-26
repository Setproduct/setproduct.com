# Card UI design: план изображений и промпты

Статья: `content/blog/card-ui-design.mdx`
Папка картинок: `public/blog/assets/card-ui-design/`
Обложка: `public/blog/covers/card-ui-design.webp`
План статьи: [`plans/card-ui-design-plan.md`](card-ui-design-plan.md) (раздел 9)

Всего 24 файла: 1 обложка, 9 полноширинных, 14 обтекаемых. Всё WebP. Ни одного из этих файлов на диске пока нет, поэтому перезаписывать нечего.

**Версия 1 (25.11.2026).** Стиль всех иллюстраций: neubrutalism. Обложка на пастельном фоне, 23 картинки в теле статьи строго на белом холсте `#ffffff`. Этот файл заменяет раздел 9.2–9.3 в `card-ui-design-plan.md`: сцены взяты оттуда, стиль и подписи переписаны. Номера идут по порядку статьи, старые номера указаны в таблице.

---

## 1. Сводная таблица

«Мин. слов» — сколько текста обязано стоять рядом с обтекаемой картинкой. «Сейчас» — сколько стоит в статье на 25.11.2026 (подсчёт до закрывающего `</div>` обёртки `blog-float-clip`).

| № | Старый № | Раздел статьи | Формат | Раскладка | Исходник | Показ | Мин. слов | Сейчас | Файл |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | обложка | 16:9 | hero | 1600×900 | вся ширина | нет | нет | `covers/card-ui-design.webp` |
| 2 | 2 | What a card is, and when a table row wins | 16:9 | вся колонка | 1440×810 | 720 | нет | нет | `card-vs-table-vs-list.webp` |
| 3 | 3 | Card anatomy in eight zones | 2:3 | обтекание справа | 576×864 | 288×432 | 160 | 293 | `card-anatomy-stack.webp` |
| 4 | 4 | When cards hurt the interface | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | 157 | `card-soup-vs-table.webp` |
| 5 | 5 | Card layouts that scale | 16:9 | вся колонка | 1440×810 | 720 | нет | нет | `card-grid-breakpoints.webp` |
| 6 | 6 | The column math behind a card grid (H3) | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | 186 | `card-column-measure.webp` |
| 7 | 7 | Three card sizes and when to use each (H3) | 3:2 | вся колонка | 1440×960 | 720 | нет | нет | `card-sizes-compared.webp` |
| 8 | 8 | Horizontal cards with media (H3) | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 198 | `card-horizontal-breaks.webp` |
| 9 | 9 | Stat and KPI cards (H3) | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | 146 | `card-stat-widget.webp` |
| 10 | 22 | Product cards (H3) | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 167 | `card-product-anatomy.webp` |
| 11 | 24 | Card UI examples from real products | 3:2 | вся колонка | 1440×960 | 720 | нет | нет | `card-examples-teardown.webp` |
| 12 | 10 | How many actions a card can hold | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 159 | `card-action-density.webp` |
| 13 | 11 | Making the whole card clickable | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | 200 | `card-whole-link-focus.webp` |
| 14 | 12 | Eight card states and the CSS behind them | 16:9 | вся колонка | 1440×810 | 720 | нет | нет | `card-states.webp` |
| 15 | 13 | Loading and empty cards | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 189 | `card-loading-empty.webp` |
| 16 | 14 | Titles and truncation (H3) | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | 130 | `card-title-truncation.webp` |
| 17 | 15 | Media aspect ratios (H3) | 3:2 | вся колонка | 1440×960 | 720 | нет | нет | `card-media-ratios.webp` |
| 18 | 16 | Card accessibility | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 208 | `card-focus-order.webp` |
| 19 | 20 | Cards on mobile | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 183 | `card-mobile-one-column.webp` |
| 20 | 17 | Density and spacing | 16:9 | вся колонка | 1440×810 | 720 | нет | нет | `card-density-two.webp` |
| 21 | 18 | Card design tokens | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | 159 | `card-tokens-panel.webp` |
| 22 | 23 | Card surface styles beyond flat | 16:9 | вся колонка | 1440×810 | 720 | нет | нет | `card-surface-styles.webp` |
| 23 | 19 | Eight card anti-patterns | 3:2 | вся колонка | 1440×960 | 720 | нет | нет | `card-anti-patterns.webp` |
| 24 | 21 | Ship checklist for cards | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | 156 | `card-ship-checklist.webp` |

Все 14 обтекаемых проходят минимум. Самый узкий запас у №16: ровно 130 слов при минимуме 100.

В FAQ картинок нет. Без картинок также стоят H3 `Which zones every card needs`, `Cards in a horizontal scroller`, `Task and event cards`, `Building a card component in Figma` и H2 `The complete card in one snippet` (решение по ним в разделе 3).

Порядок обтекаемых: 3 → 4 → 6 → 8 → 9 → 10 → 12 → 13 → 15 → 16 → 18 → 19 → 21 → 24. Между каждой парой стоит либо полноширинная картинка, либо H2 (он сбрасывает обтекание через `clear: both`), либо отдельная обёртка `blog-float-clip` у подраздела H3. Пара 9 → 10 (два H3 подряд, `Stat and KPI cards` и `Product cards`) держится на двух обёртках, каждая закрывается своим `</div>`.

---

## 2. Neubrutalism на белом: как решена задача

### 2.1. В чём особенность

Neubrutalism обычно живёт на цветном фоне: жёлтом, мятном, розовом. Здесь холст обязан быть белым, поэтому цвет переезжает внутрь объектов: в заливку медиа-блоков, плашек-подписей и одной акцентной кнопки. Белый холст при этом стилю не мешает. Форму держат толстая чёрная обводка и жёсткая тень без размытия, а им фон не нужен.

Второй момент важнее. Статья учит делать карточки с мягкой тенью и рамкой `#e4dcff`, а иллюстрации рисуют карточки с чёрной обводкой и жёсткой тенью. Читатель не должен принять стиль картинки за рекомендацию статьи. Поэтому neubrutalism здесь это стиль подачи схем, а там, где картинка показывает конкретный материал (№22, ячейки flat, glass, neumorphic, clay), карточки внутри ячеек нарисованы в своём материале, а neubrutal остаётся только у рамок плиток.

### 2.2. Семь правил

1. **Холст `#ffffff`, без исключений.** Никакого кремового, серого или пастельного холста в теле статьи. Цвет только внутри объектов.
2. **Обводка 6 px в исходнике, цвет `#19181b`.** У всех фигур одна толщина: карточки, кнопки, плашки, медиа, линейки. После показа в половину размера это 3 px. Тонких линий и «карандашных» штрихов нет.
3. **Тень жёсткая.** Сплошная `#19181b`, смещение 12 px вправо и 12 px вниз в исходнике, размытие 0. Цветных и мягких теней нет. Тень есть у карточек и кнопок, у подписей и линеек её нет.
4. **Заливки плоские.** Ни градиентов, ни зерна, ни бликов. Тело карточки белое. Медиа-блок пастельный, с простой фигурой внутри (круг и треугольник с той же обводкой) вместо фотографии.
5. **Один акцент на объект.** Сплошной `#7c4dff` получает главная кнопка или элемент, о котором картинка (кольцо фокуса, выбранная рамка, ведущая зона). Если в кадре фиолетового больше одного на карточку, картинка теряет смысл.
6. **Текст карточки это полосы.** Заголовок рисуется толстой полосой `#19181b`, текст серыми полосами `#adadad`. Буквы в кадре есть только у подписей из промпта.
7. **Подписи крупные и жирные.** Тяжёлый геометрический гротеск, 36 px в исходнике (18 px на экране). Подпись стоит тёмным текстом на белом под объектом или на плашке-стикере, если промпт так говорит.

### 2.3. Где внутри картинки есть не белое и почему

| № | Что не белое | Почему |
|---|---|---|
| 1 | весь фон пастельный | обложка стоит вне текста, по решению автора |
| 22 | плитка с градиентным пятном под ячейкой glass, лавандовая плитка `#ece8f5` под ячейкой neumorphic | стекло без цвета позади не видно, neumorphism физически не существует на белом |
| 23 | серая плитка внутри ячейки `low contrast` | ячейка показывает ошибку контраста |
| 14 | серая карточка в состоянии `disabled` | состояние по определению приглушено |

Во всех случаях сам холст картинки остаётся `#ffffff`, цветное живёт внутри плитки с обводкой и скруглением.

### 2.4. Значения стиля

| Свойство | Исходник | На экране (показ в половину) |
|---|---|---|
| обводка | 6 px `#19181b` | 3 px |
| тень | `12px 12px 0 #19181b` | `6px 6px 0` |
| тень в состоянии hover и dragging | `20px 20px 0 #19181b` | `10px 10px 0` |
| радиус карточки и медиа | 24 px | 12 px |
| радиус кнопки | 16 px | 8 px |
| плашки и статусы | полностью скруглённые | то же |
| подписи | 36 px, bold | 18 px |
| вспомогательные линии (линейки, выноски) | 6 px, сплошные или пунктир | 3 px |

---

## 3. Отклонения от плана статьи

1. **Стиль сменён с flat на neubrutalism.** Раздел 9.2 в `card-ui-design-plan.md` больше не действует для генерации. Сцены сохранены, переписаны материал, тени и подписи.
2. **№1, обложка: пастельный фон.** Правило «строго белый холст» действует на 23 иллюстрации в теле статьи, обложка выведена из него по задаче. Основной вариант A на лавандовом `#ece5ff`, запасной B на мятном `#cdf3e1`. Alt `A single product card on a plain background` остаётся верным: пастельный фон однотонный, декора нет.
3. **№14 `card-states.webp`: восемь карточек в сетке 4×2 вместо одной строки.** В строке из восьми карточка выходит шириной около 150 px в исходнике, и подпись `dragging` в 36 px в неё не помещается. Alt не меняется: он перечисляет состояния, а не раскладку.
4. **№22 `card-surface-styles.webp`: neubrutal только у рамок плиток.** Сами карточки нарисованы в своих материалах, ячейка `flat` повторяет рецепт статьи (рамка 1 px `#e4dcff`, без тени). Иначе картинка противоречила бы разделу, который она иллюстрирует.
5. **№21 `card-tokens-panel.webp`: образцы токенов в стиле картинки.** Панель называет виды токенов, а не их значения, чисел на ней нет. Поэтому образец `shadow` нарисован жёсткой тенью, как и всё остальное.
6. **Разделы без картинок остаются без них.** `Cards in a horizontal scroller` стоит внутри H2 `Card layouts that scale`, где уже четыре картинки (№5–8), пятая перегрузит раздел. H2 `The complete card in one snippet` это код целиком, его иллюстрирует сам код. Если автор хочет картинку и туда, кандидат такой: `card-snippet-result.webp`, 16:9 во всю колонку, результат сниппета (две карточки и feature-карточка на всю строку). В счёт 24 файлов не входит и требует правки MDX, поэтому только по команде автора.
7. **№3, восемь зон в обтекании 2:3** больше лимита в четыре элемента. Принято на Гейте 1, подписи в одно слово по 36 px.
8. **Alt-тексты во всех промптах совпадают с MDX посимвольно.** Перечни в alt (№2, 7, 14, 17, 21, 22) это перечни реальных объектов, а не трихолоны.

---

## 4. Как собирать

**Главное правило: руками не рисуется ничего.** Всё, что должно быть на изображении, описано в промпте: композиция, подписи, числа, цвета. Если после генерации чего-то не хватает, промпт уточняется и картинка генерируется заново. Готовая картинка не дорисовывается и не подчищается в редакторе.

- **Мастер-блок из раздела 5 дописывается в конец каждого промпта №2–24.** Для обложки свой блок. Толщина обводки и тени в самих промптах не повторяется, чтобы не было 23 слегка разных описаний.
- **Подписи рисует генератор.** В каждом промпте есть строка `Labels (drawn by the generator, …)` с размером в исходнике и местом подписи. Цвет `#19181b`.
- **Шрифт:** тяжёлый геометрический гротеск, близкий к Uncut Sans или Space Grotesk, bold. Только английский, sentence case, без обводки и тени у текста.
- **Подписи в исходнике от 32 px, линии от 6 px:** картинки показываются в половину размера.
- **Числа выходят посимвольно:** `280`, `400`, `768`, `1024`, `1440`, `48.2k`, `+12%`, `$49`, `$69`, `44 px`, `2 lines`, `1:1`, `4:3`, `16:9`, а также номера `1`, `2`, `3`. Искажённая цифра означает брак и повторную генерацию.
- **Белый `#ffffff` проверяется пипеткой по четырём углам.** Генераторы любят кремовый «бумажный» фон, особенно в neubrutalism. Такая картинка генерируется заново, уровнями не правится: на странице любой оттенок проявится прямоугольником.
- **Тень проверяется глазами:** она должна быть сплошной, с резким краем. Размытая или серая тень означает брак.
- **Экспорт WebP с качеством 90+.** На низком качестве вокруг чёрных обводок на белом появляются артефакты.
- **Файлы новые, существующие не перезаписываются.** При замене картинки после публикации берётся новое имя файла (правило AGENTS.md).
- **После заливки:** `npm run thumbs:blog` и `node check_images2.js`. Оба запускает автор.

### Общая палитра

| Что | Значение |
|---|---|
| Холст в теле статьи | `#ffffff`, без исключений |
| Фон обложки, вариант A | `#ece5ff` (пастельная лаванда) |
| Фон обложки, вариант B | `#cdf3e1` (пастельная мята) |
| Обводка, тень, заголовки-полосы, подписи | `#19181b` |
| Акцент | `#7c4dff`, текст на нём белый |
| Пастели медиа-блоков | лаванда `#e6dcff`, масло `#ffe98a`, мята `#b8f2d4`, розовый `#ffc2dc` |
| Строки текста в карточке | `#adadad` |
| Ошибка | `#ff5a5f` |
| Успех и рост | `#2fbf71` |
| Приглушённое (disabled) | `#e9e7ee`, обводка `#adadad` |
| Радиус карточки | 24 px в исходнике |

---

## 5. Мастер-блок

### Для картинок №2–24 (белый холст)

```
Background: seamless pure white #ffffff, perfectly flat. No cream or paper tone, no vignette, no grey gradient, no floor line, no texture, no backdrop shadow.
Style: neubrutalism, flat 2D vector illustration. Front view, no perspective, no isometric, no 3D.
Outlines: every shape has a solid 6 px outline in near-black ink #19181b, one uniform weight everywhere. No hairlines, no sketchy or hand-drawn strokes.
Shadow: hard offset shadow in solid ink #19181b, 12 px to the right and 12 px down, zero blur, sharp edge. Shadows only under cards and buttons. No soft, grey or coloured shadows anywhere.
Fills: flat solid colours only. No gradients, no grain, no gloss, no highlights. Card bodies white. Media blocks are pastel (lavender #e6dcff, butter #ffe98a, mint #b8f2d4, pink #ffc2dc) holding one outlined circle and one outlined triangle instead of a photo.
Accent: solid violet #7c4dff with ink outline, used once per card at most, on the primary button or on the element this prompt is about.
Corners: cards and media 24 px radius, buttons 16 px radius, pills fully rounded.
Card content: the title is a thick ink bar, body text is grey #adadad bars. No fake words, no lorem ipsum.
Text: render every label and number listed in this prompt as clean flat text directly on the image, heavy geometric grotesk close to Uncut Sans or Space Grotesk, bold, sentence case, dark ink #19181b, no outline, no shadow, no italics, no lettering on a curve. Spell each value exactly as written in the prompt, character for character. Place each label exactly where this prompt puts it.
Rules: large simple shapes, generous white space, no people, no logos, no real photos, no browser chrome or device photos unless this prompt asks for an outlined frame. No text other than the labels listed in this prompt.
```

### Для обложки №1 (пастельный фон)

```
Background: one flat pastel colour across the whole frame, exactly the hex given in the prompt. No gradient, no texture, no paper grain, no vignette, no pattern, no decorative shapes.
Style: neubrutalism, flat 2D vector illustration, front view, no perspective, no 3D.
Outlines: every shape has a solid 12 px outline in near-black ink #19181b.
Shadow: hard offset shadow in solid ink #19181b, 24 px to the right and 24 px down, zero blur, sharp edge.
Fills: flat solid colours only, no gradients, no gloss. Card body white, media block in a pastel that contrasts with the background, primary button solid violet #7c4dff.
Text: none. No letters, no numbers, no logos anywhere in the image.
```

Обводка и тень на обложке вдвое толще, чем в теле: обложка показывается крупно и уменьшается до превью 800 px, где 6 px исчезли бы.

---

## 6. Промпты

### 1. Обложка

**Вариант A (основной).**

**Scene:** One large product card standing upright in the centre of the frame on a flat pastel lavender background `#ece5ff`. The card has a white body, a mint `#b8f2d4` media block on top with one outlined circle and one outlined triangle inside, a thick ink title bar, two grey text bars, a small butter `#ffe98a` status pill, and a solid violet `#7c4dff` button at the bottom. The card casts a hard ink shadow down and to the right.

**Style:** Neubrutalism, flat, bold, the card reads as a sticker pressed onto the colour.

**Composition:** The card fills the central third of the frame, straight, no tilt, and is the only object. Nothing within 15% of any edge, so the thumbnail crop and the social crop both keep the whole card with its shadow. No text.

**Aspect ratio:** 16:9

**Final size:** 1600×900, WebP

**Alt:** A single product card on a plain background

**File:** `public/blog/covers/card-ui-design.webp`

**Вариант B (запасной).** Та же сцена на пастельной мяте `#cdf3e1`, медиа-блок карточки лавандовый `#e6dcff`. Alt тот же. Брать, если в листинге блога рядом окажется другая лавандовая обложка.

---

### 2. What a card is, and when a table row wins

**Scene:** The same item shown three ways side by side. Left: a vertical card with a pastel media block, a title bar, two grey text bars and a violet button. Centre: one table row inside an outlined table frame with a header row and four columns, the row filled with short bars. Right: a list item with a small square pastel thumbnail and one title bar next to it. All three have the same ink outline; only the card and the table frame cast a hard shadow.

**Style:** Neubrutalism schematic, white canvas.

**Composition:** Three objects in one row on a shared baseline, equal gaps, meaning in the central horizontal band. Top and bottom thirds stay white apart from the labels.

**Labels (drawn by the generator, 36 px in source):** `card`, `table row`, `list item`, one centred under each object, dark on white

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** The same content as a card, a table row and a list item

**File:** `public/blog/assets/card-ui-design/card-vs-table-vs-list.webp`

---

### 3. Card anatomy in eight zones

**Scene:** One tall card exploded vertically into eight stacked zones with a white gap of about 16 px between them. From top: a lavender media block, a thin meta bar, a thick ink title bar, two grey body bars, a small mint status pill, a bold key value bar, a row with one violet button, a footer row with a small round avatar. Each zone has its own ink outline and a small hard shadow. Short ink leader lines run from each zone to its label on the right.

**Style:** Neubrutalism exploded diagram on white.

**Composition:** Vertical. Card stack on the left 60% of the width, labels on the right, 10% margin on all edges.

**Labels (drawn by the generator, 36 px in source):** `media`, `meta`, `title`, `body`, `status`, `key value`, `actions`, `footer`, each at the end of its leader line, dark on white

**Aspect ratio:** 2:3

**Final size:** 576×864, WebP

**Alt:** Labeled zones of a card stacked top to bottom

**File:** `public/blog/assets/card-ui-design/card-anatomy-stack.webp`

---

### 4. When cards hurt the interface

**Scene:** A square split into top and bottom halves by a thick ink line. Top half: a cramped 3 by 3 grid of tiny cards with misaligned media blocks, uneven heights and buttons in different positions. Bottom half: the same nine items as a clean outlined table with a header row and four visible rows of short bars. The table casts one hard shadow, the tiny cards each cast their own, which adds to the clutter.

**Style:** Neubrutalism schematic on white.

**Composition:** Vertical split, both halves equal, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `card soup` at the top left of the upper half, `table` at the top left of the lower half, dark on white

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** A cluttered card grid next to the same data in a table

**File:** `public/blog/assets/card-ui-design/card-soup-vs-table.webp`

---

### 5. Card layouts that scale

**Scene:** Three outlined rectangular frames of increasing width, left to right, each a simple window with a thick top bar and no browser icons. Inside: the same grid of identical small cards at two, three and four columns. A thick ink ruler runs along the bottom under all three frames with ticks under each frame.

**Style:** Neubrutalism schematic on white. Frames cast hard shadows, the cards inside have outlines and small shadows.

**Composition:** Frames aligned on one baseline, meaning in the central band, ruler below them.

**Labels (drawn by the generator, 36 px in source):** `768`, `1024`, `1440` at the ruler ticks under the frames, left to right, dark on white

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** One card grid at two, three and four columns with breakpoints marked

**File:** `public/blog/assets/card-ui-design/card-grid-breakpoints.webp`

---

### 6. The column math behind a card grid

**Scene:** The same card twice, left-aligned: a narrow card at the top and a wider card at the bottom, each with a full-bleed pastel media block, a title bar and a violet button. Above each card a thick ink measuring scale with end ticks matches the card width exactly.

**Style:** Neubrutalism technical schematic on white.

**Composition:** Vertical, two rows, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `min 280` above the top scale, `max 400` above the bottom scale, dark on white

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** Minimum and maximum card width on a measuring scale

**File:** `public/blog/assets/card-ui-design/card-column-measure.webp`

---

### 7. Three card sizes and when to use each

**Scene:** Three cards with identical content side by side: a small compact card with tight padding, a medium standard card, and a large feature card twice as wide as the standard one with a bigger media block. All have the same pastel media, title bar, grey bars and violet button.

**Style:** Neubrutalism on white, hard shadows, same outline weight on all three.

**Composition:** Bottom-aligned on one baseline, meaning in the central third, 8% side margins.

**Labels (drawn by the generator, 36 px in source):** `compact`, `standard`, `feature`, one centred under each card, dark on white

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** Compact, standard and feature card sizes with the same content

**File:** `public/blog/assets/card-ui-design/card-sizes-compared.webp`

---

### 8. Horizontal cards with media

**Scene:** Top: a horizontal card with a square pastel media block on the left and a title bar, two grey bars and a violet button on the right, well balanced. Bottom: the same card squeezed into a narrow column, the text area crushed into a thin strip and the button overflowing the edge, with a red `#ff5a5f` round badge with an ink cross in the corner.

**Style:** Neubrutalism on white.

**Composition:** Vertical, two rows, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `fits` under the top card, `breaks` under the bottom card, dark on white

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A horizontal media card next to its broken narrow version

**File:** `public/blog/assets/card-ui-design/card-horizontal-breaks.webp`

---

### 9. Stat and KPI cards

**Scene:** One KPI card large in the frame. Top: a short grey label bar. Middle: a big bold number `48.2k` in ink. Next to it a small green `#2fbf71` pill with an ink outline holding an up arrow and `+12%`. Bottom: a thick ink sparkline rising left to right along the full card width.

**Style:** Neubrutalism on white, card with hard shadow.

**Composition:** Card centred, 10% margins.

**Labels (drawn by the generator):** `48.2k` at 96 px in source inside the card, `+12%` at 36 px in source inside the green pill, dark ink

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** A stat card with a large number, delta and sparkline

**File:** `public/blog/assets/card-ui-design/card-stat-widget.webp`

---

### 10. Product cards

**Scene:** One product card filling about 80% of the frame height. Top: a square pink `#ffc2dc` media block with an outlined circle and triangle, no real product. In its top-right corner a round white icon button with an ink outline and an outlined heart. Below: one thick ink title bar, then a price row with a bold `$49` and next to it a smaller grey struck-through `$69`. Bottom: one violet button at full card width. Nothing else: no rating, no tags, no second button.

**Style:** Neubrutalism on white, card and button with hard shadows.

**Composition:** Vertical, card centred, 10% margins.

**Labels (drawn by the generator):** `$49` at 48 px in source in ink, `$69` at 32 px in source in grey `#adadad` with a strike line

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A product card with a photo, a name, a price next to a struck-through old price, one button and a wishlist icon

**File:** `public/blog/assets/card-ui-design/card-product-anatomy.webp`

---

### 11. Card UI examples from real products

**Scene:** A 3 by 2 grid of six redrawn schematic cards, wireframes only, no screenshots, no logos, no brand colours. Top row. 1: listing card, tall photo block with a row of small dots at the bottom of the photo and an outlined heart in the photo corner, then three bars. 2: KPI card, small label bar, one large bold number bar, a thick line chart under it, no image. 3: task card, compact, one title bar and a row of four small icons (tag, status circle, priority bars, round avatar), no image. Bottom row. 4: a split panel, left half a board column with two mini cards, right half the same items as a three-row table, a two-icon view switcher above. 5: feature card, a media block filling the card edge to edge with a small label bar and a large headline bar over it. 6: shelf, a horizontal row of four square covers with bars under them, the fourth cut off by the cell edge. In every schematic exactly one element is violet `#7c4dff`: the zone that leads that card. Everything else is white, pastel or grey.

**Style:** Neubrutalism on white, each schematic with an ink outline and hard shadow.

**Composition:** Equal cells, equal gaps, 8% outer margins.

**Labels (drawn by the generator, 36 px in source):** `Airbnb`, `Stripe`, `Linear`, `GitHub Projects`, `App Store`, `Spotify`, one centred under each schematic in that order, dark on white

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** Redrawn schematics of six product cards in a three by two grid

**File:** `public/blog/assets/card-ui-design/card-examples-teardown.webp`

---

### 12. How many actions a card can hold

**Scene:** Three identical cards stacked vertically, each with a different footer. Card 1: one violet button. Card 2: one violet button and two short underlined ink text bars. Card 3: five small buttons crammed in a row and touching each other, with a red `#ff5a5f` round badge with an ink cross in its corner.

**Style:** Neubrutalism on white.

**Composition:** Vertical stack, equal gaps, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `one`, `three`, `five`, each to the left of its card, dark on white

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** One, three and five actions on a card compared

**File:** `public/blog/assets/card-ui-design/card-action-density.webp`

---

### 13. Making the whole card clickable

**Scene:** One card with a thick violet focus ring drawn around its whole outline, offset outside the ink outline. In the top-right corner of the card a small round icon button with its own violet ring. Two round numbered badges with ink outlines and butter `#ffe98a` fill: `1` on the card title bar, `2` on the inner icon button.

**Style:** Neubrutalism on white.

**Composition:** Card centred, 10% margins.

**Labels (drawn by the generator, 40 px in source):** `1` and `2` inside the numbered badges, dark ink

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** Focus ring on a whole-card link with an inner button and numbered focus order

**File:** `public/blog/assets/card-ui-design/card-whole-link-focus.webp`

---

### 14. Eight card states and the CSS behind them

**Scene:** Eight identical small cards in a 4 by 2 grid. Top row: default (standard hard shadow); hover (moved up and left, longer hard shadow `20px 20px`); focus (thick violet ring outside the outline); selected (violet outline instead of ink and a violet check badge in the corner). Bottom row: dragging (tilted 4 degrees, longer hard shadow); loading (grey skeleton bars instead of content); error (red `#ff5a5f` outline and a red alert badge); disabled (grey fill `#e9e7ee`, grey outline `#adadad`, no shadow).

**Style:** Neubrutalism on white.

**Composition:** Two rows of four, equal cells, meaning in the central band, 6% margins.

**Labels (drawn by the generator, 36 px in source):** `default`, `hover`, `focus`, `selected`, `dragging`, `loading`, `error`, `disabled`, one centred under each card, dark on white

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** Card in default, hover, focus, selected, dragging, loading, error and disabled states

**File:** `public/blog/assets/card-ui-design/card-states.webp`

---

### 15. Loading and empty cards

**Scene:** Top: a skeleton card, grey `#e9e7ee` blocks with ink outlines in the shape of the media, title and body zones. Bottom: an empty card with a simple outlined icon (an empty box), one short grey bar and a violet button.

**Style:** Neubrutalism on white.

**Composition:** Vertical, two rows, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `loading` under the top card, `empty` under the bottom card, dark on white

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A skeleton card above an empty card

**File:** `public/blog/assets/card-ui-design/card-loading-empty.webp`

---

### 16. Titles and truncation

**Scene:** Three cards stacked, their title areas showing one, two and three lines of thick ink bars. The third card's title is cut after the second line and ends with a bold ellipsis. A vertical ink ruler on the right spans exactly the height of two title lines.

**Style:** Neubrutalism on white.

**Composition:** Vertical, cards on the left 75%, ruler on the right, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `2 lines` next to the ruler, dark on white

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** A card title at one, two and three lines with a clamp ruler

**File:** `public/blog/assets/card-ui-design/card-title-truncation.webp`

---

### 17. Media aspect ratios

**Scene:** Three identical cards side by side that differ only in media block proportion: square, 4:3, 16:9. Same title bar, grey bars and violet button under each media block. Media blocks in lavender, butter and mint.

**Style:** Neubrutalism on white.

**Composition:** Top-aligned, equal widths, meaning in the central third, 8% side margins.

**Labels (drawn by the generator, 36 px in source):** `1:1`, `4:3`, `16:9`, one centred under each card, dark on white

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** The same card with square, four by three and widescreen media

**File:** `public/blog/assets/card-ui-design/card-media-ratios.webp`

---

### 18. Card accessibility

**Scene:** One tall card with round numbered badges (ink outline, butter fill): `1` on the title bar, `2` on a secondary underlined text bar, `3` on the violet button. A dashed ink square around the button and another around a small icon button marks the touch target, with a short leader line to a label.

**Style:** Neubrutalism on white.

**Composition:** Vertical, card centred, 10% margins.

**Labels (drawn by the generator):** `1`, `2`, `3` at 40 px in source inside the badges, `44 px` at 36 px in source at the end of the leader line, dark ink

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** Numbered focus order and touch target sizes on a card

**File:** `public/blog/assets/card-ui-design/card-focus-order.webp`

---

### 19. Cards on mobile

**Scene:** A simple outlined phone shape in portrait (thick ink outline, rounded corners, hard shadow, no realistic device details) with cards stacked in a single column inside. To the left, a faded grey ghost of a two-column card grid with a thick ink arrow pointing into the phone.

**Style:** Neubrutalism on white. The ghost grid uses grey `#adadad` outlines and no shadows.

**Composition:** Phone fills 70% of the height on the right, ghost on the left, 10% margins.

**Labels:** none

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A card grid collapsing to one column on a phone

**File:** `public/blog/assets/card-ui-design/card-mobile-one-column.webp`

---

### 20. Density and spacing

**Scene:** Two outlined panels side by side. Left: a spacious grid of six cards with wide gaps and generous inner padding. Right: the same six cards with tight padding and narrow gaps, so the grid takes visibly less space.

**Style:** Neubrutalism on white, panels and cards with hard shadows.

**Composition:** Two equal panels, meaning in the central band, 6% margins.

**Labels (drawn by the generator, 36 px in source):** `comfortable` under the left panel, `compact` under the right panel, dark on white

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** The same card grid at two density levels

**File:** `public/blog/assets/card-ui-design/card-density-two.webp`

---

### 21. Card design tokens

**Scene:** One outlined panel with four rows separated by thick ink dividers. Each row has a swatch on the left and a label on the right. Row 1: a square with one strongly rounded corner. Row 2: a box with a dashed inner box showing padding. Row 3: a small card with a hard offset shadow. Row 4: a square with a thick outlined edge.

**Style:** Neubrutalism on white, swatches in pastel fills.

**Composition:** Vertical rows, panel centred, 10% margins.

**Labels (drawn by the generator, 36 px in source):** `radius`, `padding`, `shadow`, `border`, one per row to the right of its swatch, dark on white

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** Card token panel with radius, padding, shadow and border

**File:** `public/blog/assets/card-ui-design/card-tokens-panel.webp`

---

### 22. Card surface styles beyond flat

**Scene:** Four square tiles in one row. Each tile has the neubrutal ink outline and hard shadow, and holds one identical card (media block, title bar, two grey bars, one button) rendered in its own material, which overrides the master block inside the tile. Tile 1, flat: white tile, white card with a 1 px `#e4dcff` border, no shadow. Tile 2, glass: white tile with a soft violet `#7c4dff` and pink `#ff5fa2` blob behind the card, the card is translucent frosted glass with background blur and a thin white inner edge. Tile 3, neumorphic: tile filled `#ece8f5`, the card the same colour, extruded by a light shadow top-left and a darker shadow bottom-right, no border. Tile 4, clay: white tile, puffy pastel violet card with a large radius, a soft inner highlight and a soft outer drop shadow.

**Style:** Neubrutalism for the tiles, true materials for the cards inside. The four cards must not get ink outlines or hard shadows.

**Composition:** One horizontal row, equal tiles, equal gaps, bottom-aligned, meaning in the central band, 6% side margins.

**Labels (drawn by the generator, 36 px in source):** `flat`, `glass`, `neumorphic`, `clay`, one centred under each tile on white, dark ink

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** The same card in flat, glass, neumorphic and clay styles

**File:** `public/blog/assets/card-ui-design/card-surface-styles.webp`

---

### 23. Eight card anti-patterns

**Scene:** A 4 by 2 grid of small cards, each showing one mistake and a red `#ff5a5f` round badge with an ink cross in its top-right corner. Top row: five buttons crammed in the footer; a title clipped mid-letter by the card edge; three media blocks of mixed ratios in one card; a card nested inside a card. Bottom row: grey bars on a grey `#d9d7de` card fill (low contrast); tiny buttons smaller than a fingertip; a card with no focus ring next to a keyboard Tab key icon; uneven card heights in a row.

**Style:** Neubrutalism on white.

**Composition:** Grid centred, equal cells, meaning in the central area, 6% margins.

**Labels:** none

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** Eight card design mistakes in a grid

**File:** `public/blog/assets/card-ui-design/card-anti-patterns.webp`

---

### 24. Ship checklist for cards

**Scene:** One tall card styled as a checklist with six rows separated by thin gaps. Each row has a violet round check badge with an ink outline and a white tick, then a grey bar of varying length instead of text.

**Style:** Neubrutalism on white, card with a hard shadow.

**Composition:** Vertical, card centred, 10% margins.

**Labels:** none

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A card checklist with six ticked items

**File:** `public/blog/assets/card-ui-design/card-ship-checklist.webp`

---

## 7. Откуда числа

| Картинка | Число | Где в статье |
|---|---|---|
| №6 | `min 280`, `max 400` | `The column math behind a card grid`: «about 280px and 400px» |
| №5 | `768`, `1024`, `1440`, две, три и четыре колонки | таблица в том же разделе: 768 → 2, 1024 → 3, 1440 → 4 |
| №9 | `48.2k`, `+12%` | `Stat and KPI cards`, пример KPI-карточки |
| №10 | `$49`, `$69` | иллюстративные значения из промпта второй редакции, в тексте статьи цены нет. Alt говорит только о старой цене рядом с новой |
| №16 | `2 lines` | `Titles and truncation`: «Keep titles to two lines in a grid» |
| №17 | `1:1`, `4:3`, `16:9` | `Media aspect ratios` |
| №18 | `44 px` | зона касания на телефоне: зона ❹ в `Card anatomy in eight zones` («44×44px for anything people tap on a phone») и `Cards on mobile` («44×44 targets») |
| №13, №18 | `1`, `2`, `3` | порядок табуляции из `Making the whole card clickable` и `Card accessibility` |

Если число в статье поменяется, промпт правится и картинка генерируется заново под новым именем файла.

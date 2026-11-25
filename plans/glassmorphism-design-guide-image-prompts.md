# Glassmorphism design guide: план изображений и промпты

Статья: `content/blog/glassmorphism-design-guide.mdx`
Папка картинок: `public/blog/assets/glassmorphism-design-guide/`
Обложка: `public/blog/covers/glassmorphism-design-guide.webp`
Бриф: [`plans/glassmorphism-guide-brief-2026-11.md`](glassmorphism-guide-brief-2026-11.md)

Всего 23 файла: 1 обложка, 11 полноширинных, 11 обтекаемых. Всё WebP.

**Версия 2 (24.11.2026).** Все иллюстрации переведены на строго белый холст `#ffffff`. Главный рецепт статьи теперь светлое стекло с тёмным текстом. Тёмное стекло осталось только там, где этого требует контекст (раздел 2.3).

---

## 1. Сводная таблица

«Мин. слов» — сколько текста обязано стоять рядом с обтекаемой картинкой. Я закладываю сверху ещё один абзац на всю ширину (около 50 слов), чтобы две обтекаемые картинки не встретились.

| № | Раздел статьи | Формат | Раскладка | Исходник | Показ | Мин. слов | Файл |
|---|---|---|---|---|---|---|---|
| 1 | обложка | 16:9 | hero | 1600×900 | вся ширина | нет | `covers/glassmorphism-design-guide.webp` |
| 2 | What glassmorphism actually is | 16:9 | вся колонка | 1440×810 | 720 | нет | `glass-layers-exploded.webp` |
| 3 | The types of glassmorphism that actually differ | 16:9 | вся колонка | 1440×810 | 720 | нет | `glass-types-comparison.webp` |
| 4 | то же, после таблицы типов | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | `glass-subtle-vs-heavy.webp` |
| 5 | Why frosted glass keeps coming back | 2:3 | обтекание справа | 576×864 | 288×432 | 160 | `glass-history-timeline.webp` |
| 6 | Five glass aesthetics, one family | 3:2 | вся колонка | 1440×960 | 720 | нет | `glass-family-matrix.webp` |
| 7 | The anatomy of a glass surface | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | `glass-surface-cross-section.webp` |
| 8 | Backdrop blur and how much is too much | 16:9 | вся колонка | 1440×810 | 720 | нет | `blur-scale-comparison.webp` |
| 9 | Tint and saturation | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | `glass-tint-range.webp` |
| 10 | The border that saves readability | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | `glass-border-legibility.webp` |
| 11 | The inner highlight that fakes thickness | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | `glass-thickness-layers.webp` |
| 12 | A copy-paste CSS recipe | 3:2 | вся колонка | 1440×960 | 720 | нет | `glass-recipe-result.webp` |
| 13 | Light theme and dark theme | 16:9 | вся колонка | 1440×810 | 720 | нет | `glass-light-dark.webp` |
| 14 | Fallback for browsers without backdrop-filter | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | `glass-fallback-compare.webp` |
| 15 | Contrast math you can check before shipping | 16:9 | вся колонка | 1440×810 | 720 | нет | `contrast-stress-test.webp` |
| 16 | States on a glass component | 16:9 | вся колонка | 1440×810 | 720 | нет | `glass-states.webp` |
| 17 | Where glass belongs and where it breaks | 16:9 | вся колонка | 1440×810 | 720 | нет | `glass-chrome-vs-content.webp` |
| 18 | Component recipes | 3:2 | вся колонка | 1440×960 | 720 | нет | `glass-component-recipes.webp` |
| 19 | то же, после сетки | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | `glass-toast-recipe.webp` |
| 20 | Glassmorphism on mobile | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | `glass-mobile-performance.webp` |
| 21 | Design tokens for a glass system | 1:1 | обтекание справа | 576×576 | 288×288 | 100 | `glass-design-tokens.webp` |
| 22 | Eight anti-patterns that make glass unreadable | 3:2 | вся колонка | 1440×960 | 720 | нет | `glass-mistakes.webp` |
| 23 | Before you ship | 4:5 | обтекание справа | 576×720 | 288×360 | 130 | `glass-ship-checklist.webp` |

В FAQ картинок нет.

Порядок обтекаемых: 4 → 5 → 7 → 9 → 10 → 11 → 14 → 19 → 20 → 21 → 23. Между каждой парой стоит либо полноширинная картинка, либо H2 (он сбрасывает обтекание через `clear: both`), либо обёртка `blog-float-clip` у подраздела H3. Три подряд идущих H3 анатомии (9, 10, 11) заворачиваются в `blog-float-clip` каждый, потому что H3 обтекание не сбрасывает.

---

## 2. Стекло на белом: как решена задача

### 2.1. В чём проблема

Стекло показывает то, что лежит за ним. На белой странице за ним лежит белый. Белый tint поверх белого даёт белый: карточка исчезает, размывать нечего, светлая кромка сливается с фоном. Это ровно анти-паттерн `flat backdrop` из раздела про ошибки. Классический рецепт (белый tint 12%, белый текст) на белом холсте даёт контраст 1.00:1, то есть текст невидим.

Поэтому «положить стекло на белый» как есть нельзя. Нужно пересобрать материал. Ниже семь правил, по которым собрана каждая картинка и по которым пишется CSS-рецепт статьи.

### 2.2. Семь правил светлого стекла

1. **Цвет приносим с собой.** За каждым стеклянным объектом лежат 2–3 насыщенных пятна (orbs): `#7c4dff`, `#ff5fa2`, `#ffb86b`. Холст вокруг остаётся чисто белым. Пятна закрывают 30–45% площади стекла, остальная часть стекла лежит над белым.
2. **Пятно выглядывает из-под стекла на 15–25%.** Снаружи пятно резкое, под стеклом размытое. Эта граница «резко / размыто» и есть доказательство, что перед нами стекло, а не белая карточка с градиентом.
3. **Плотный белый tint и тёмный текст.** Поверхность `rgba(255,255,255,.6)`, текст `#19181b`. Белый текст на светлом стекле запрещён. Контраст посчитан: 9.94:1 в худшей точке палитры (над `#7c4dff`), 6.21:1 даже над чёрным.
4. **Насыщенность поднимаем фильтром.** `backdrop-filter: blur(24px) saturate(180%)`. Плотный белый tint обесцвечивает фон, `saturate` возвращает цвет. Без него 60% белого выглядят молоком, с ним выглядят матовым стеклом.
5. **Кромка двойная.** Внутри белая подсветка `rgba(255,255,255,.9)` по верхнему краю, снаружи тёмная волосяная линия `rgba(25,24,27,.08)`. На тёмном фоне форму держит светлая кромка. На белом светлая кромка невидима, и форму держит тёмная линия. Её контраст с белым 1.18:1: это разделитель, а не индикатор состояния.
6. **Тень цветная и широкая.** `0 24px 48px -16px rgba(124,77,255,.28)` плюс контактная `0 1px 2px rgba(25,24,27,.06)`. На белом тень делает половину работы по отделению стекла от страницы. Чёрных теней нет: они делают белый холст грязным.
7. **Акцент сплошной.** Кнопка действия внутри стекла залита `#7c4dff` с белым текстом (4.81:1). Стеклянная кнопка на стеклянной карточке даёт `stacked glass`, ещё один анти-паттерн.

### 2.3. Где холст не белый и почему

| № | Что не белое | Почему |
|---|---|---|
| 13 | правая половина на тёмном холсте `#0f1117` | раздел про тёмную тему |
| 10 | плитка с ночным фото в центре белого холста | раздел про кромку на фото, alt говорит `on a photo` |
| 15 | три плитки-фона (градиент, фото, паттерн) на белом холсте | стресс-тест по условию проверяет разные фоны |
| 6 | серая плитка `#e9edf2` только под ячейкой neumorphism | этот стиль физически не существует на белом |
| 18 | затемнённая плитка под модалкой | модалка по определению лежит над scrim |
| 22 | фото и паттерны внутри отдельных ячеек | ячейки показывают ошибки на конкретных фонах |

Во всех шести случаях сам холст картинки остаётся `#ffffff`, тёмное живёт внутри плитки со скруглением.

### 2.4. Три рецепта, под которые сделаны картинки

Эти значения войдут в раздел `A copy-paste CSS recipe` без изменений.

| Свойство | Светлое стекло (главный рецепт) | Тёмное стекло | Fallback |
|---|---|---|---|
| `background` | `rgba(255,255,255,.6)` | `rgba(16,18,27,.6)` | светлая тема `#f7f4ff`, тёмная `#1b1d29` |
| `backdrop-filter` | `blur(24px) saturate(180%)` | `blur(24px) saturate(160%)` | нет |
| `border` | `1px solid rgba(255,255,255,.7)` | `1px solid rgba(255,255,255,.14)` | `1px solid rgba(25,24,27,.08)` |
| внутренняя подсветка | `inset 0 1px 0 rgba(255,255,255,.9)` | `inset 0 1px 0 rgba(255,255,255,.12)` | нет |
| внешняя линия | `0 0 0 1px rgba(25,24,27,.08)` | нет | нет |
| тень | `0 1px 2px rgba(25,24,27,.06), 0 24px 48px -16px rgba(124,77,255,.28)` | `0 24px 48px -16px rgba(0,0,0,.5)` | та же, что у темы |
| текст | `#19181b` | `#ffffff` | по теме |
| радиус | 24 px | 24 px | 24 px |

---

## 3. Отклонения от таблицы из задачи

Первые четыре приняты автором 24.11. Пятое и шестое появились после перехода на белый холст.

1. **№6 `glass-family-matrix.webp`: 1:1 с обтеканием заменён на 3:2 во всю колонку.** Пять ячеек в 288 px нечитаемы и нарушают лимит в 4 элемента.
2. **№15 `contrast-stress-test.webp`: три карточки заменены сеткой 3×2.** Сверху провал, снизу исправление на тех же фонах.
3. **№20 `glass-mobile-performance.webp`: `60 fps` это целевой бюджет кадра (16.7 мс), а не замер.**
4. **№4 `glass-subtle-vs-heavy.webp`: alt** `Subtle and heavy glass on the same card` (слово `tint` убрано).
5. **Новое. №15, нижний ряд: рецепт сменён с тёмного стекла на светлое.** Было: tint `#10121b` 60%, белый текст, 6.05 / 5.42 / 4.88. Стало: белый tint 60%, текст `#19181b`, 14.02 / 6.76 / 6.74. Причина: главный рецепт статьи теперь светлый, и стресс-тест обязан проверять именно его. Худшая точка у рядов разная: для белого текста это самое светлое место фона, для тёмного текста самое тёмное. В статье это объясняется одним абзацем.
6. **№1, обложка: решено в пользу варианта B** (сплошной градиент `#7c4dff` → `#ff5fa2` → `#ffb86b`), alt `Glass card on a gradient background`. Автор выбрал его 24.11: обложка стоит вне текста и в листинге блога соседствует с цветными обложками. Правило «строго белый холст» действует на 22 иллюстрации внутри статьи, обложка из него выведена сознательно. Вариант A сохранён в промпте №1 как запасной.

Без отклонения, но с риском: **№23** оставлен с шестью пунктами. Запасной вариант — четыре строки.

Два расхождения брифа и задачи, оба решены в пользу задачи: `glass-mistakes.webp` — сетка 4×2 с восемью ошибками; `glass-component-recipes.webp` стоит в разделе `Component recipes`.

---

## 4. Как собирать

- **Мастер-блок из раздела 5 дописывается в конец каждого промпта.** В самих промптах материал стекла не повторяется, чтобы не было 23 слегка разных описаний.
- **Белый должен быть ровно `#ffffff`.** Генераторы дают `#fafafa`, серую виньетку или «пол» с тенью. После генерации: вырезать объект или поднять белую точку уровнями, проверить пипеткой четыре угла. На странице белый фон картинки сольётся с белым фоном сайта, любая серость проявится прямоугольником.
- **Экспорт WebP с качеством 90+ или lossless.** На низком качестве вокруг размытых пятен на белом появляются серые блоки.
- **Подписи ставить в Figma поверх основы.** В каждом промпте подписи вынесены в строку `Labels`. Цвет подписей на белом холсте `#19181b`.
- **Размер подписей в исходнике от 32 px**, линии от 6 px: картинки показываются в половину размера.
- **Шрифт подписей:** Uncut Sans или Inter, semibold. Только английский, sentence case.
- **Числа на картинках №8, №9, №15, №20, №21 менять нельзя.** Для №9 и №15 фон собирать по hex из промпта, иначе число не будет соответствовать картинке.
- **Лучше собрать стекло в Figma, а генератором делать только пятна и сцену.** Рецепт из 2.4 воспроизводится в Figma точно: fill white 60%, background blur 24, stroke inside white 70%, drop shadow `#7c4dff` 28% y24 blur48 spread−16. Тогда стекло на всех 23 картинках будет одним материалом.
- **Файлы новые, существующие не перезаписываются.**
- **После заливки:** `npm run thumbs:blog` и `node check_images2.js`. Оба запускает автор.

### Общая палитра

| Что | Значение |
|---|---|
| Холст | `#ffffff`, без исключений |
| Тёмный холст (только правая половина №13) | `#0f1117` |
| Пятна под стеклом | `#7c4dff`, `#ff5fa2`, `#ffb86b` |
| Светлый градиент (тест контраста) | `#c4b5fd` → `#fbcfe8` |
| Тёмное фото (тест контраста, №10) | тени `#0b1220`, блик `#e8eef5` |
| Паттерн (тест контраста) | `#111111` и `#ffffff` |
| Текст и подписи | `#19181b` |
| Акцент, сплошная кнопка | `#7c4dff`, текст белый |
| Ошибка | `#c62828` |
| Успех | `#1f9d6b` |
| Тёмный tint | `#10121b` |
| Радиус карточки | 24 px |

---

## 5. Мастер-блок (дописывать в конец каждого промпта)

### Светлый, для всех картинок

```
Background: seamless pure white #ffffff, perfectly flat. No vignette, no grey gradient, no floor line, no paper texture, no backdrop shadow.
Glass material: frosted light glass. White surface at about 60% opacity with a strong 24 px backdrop blur and boosted saturation, so the colours behind stay vivid and never turn grey or milky.
Edges: a crisp 1 px white highlight along the inside of the top and left edge, plus a barely visible dark hairline around the whole shape so the glass stays defined where it lies over white.
Shadow: one soft, wide, violet-tinted shadow below the glass, low and diffuse. No black or grey drop shadows.
Light: soft studio light from the top left, a faint diagonal sheen on the upper left area of the glass, a very fine grain on the glass only.
Colour: comes only from the shapes placed behind the glass, saturated orbs in violet #7c4dff, pink #ff5fa2 and warm orange #ffb86b. Each orb is sharp where it sticks out past the glass edge and blurred where the glass covers it. The orbs cover roughly a third of the glass, the rest of the glass sits over white.
Content on glass: dark ink #19181b. Never white text on light glass. Accent buttons are solid violet #7c4dff with white text.
Rules: one subject, large shapes, no small text, no screenshot or browser frames, no device bezels, no people.
```

### Тёмная добавка (только правая половина №13 и панель №10)

```
Dark variant: glass surface is deep navy #10121b at about 60% opacity with a 24 px backdrop blur. Edge is a thin white line at low opacity along the top and left. Shadow is soft and black. Content on dark glass is white.
```

---

## 6. Промпты

### 1. Обложка

**Вариант B (основной, выбран автором 24.11).**

**Scene:** One large frosted glass card floating at a slight tilt in the centre of the frame. The whole background is a smooth diagonal gradient of brand violet `#7c4dff` into pink `#ff5fa2` into warm orange `#ffb86b`, with three soft luminous orbs of the same hues sitting behind the card for depth. The card is blank: no text, no icons. A bright thin highlight runs along its top and left edge, and a soft dark violet shadow falls below it.

**Style:** Clean 3D-flavoured UI render, the glass looks thick and luminous, lit from inside by the colour behind it.

**Composition:** The card fills the central third of the frame and is the only object. Nothing important within 15% of any edge, so the thumbnail crop and the social crop both keep the whole card. No text at all.

**Aspect ratio:** 16:9

**Final size:** 1600×900, WebP

**Alt:** Glass card on a gradient background

**File:** `public/blog/covers/glassmorphism-design-guide.webp`

**Вариант A (не используется, сохранён на случай смены решения).** Та же карточка на строго белом холсте с тремя пятнами за ней, мастер-блок дописывается, alt `Glass card over gradient orbs on a white background`. Обложка стоит вне текста и в листинге блога соседствует с цветными обложками, поэтому автор выбрал цветной вариант.

---

### 2. What glassmorphism actually is

**Scene:** One glass card taken apart into four flat sheets, spaced left to right in an isometric exploded view. One wide soft ribbon of violet-pink-orange gradient runs horizontally behind all four sheets, and the canvas above and below the ribbon is pure white. Sheet 1 shows only the blur: the ribbon behind it is smeared into soft colour. Sheet 2 is only the tint: a milky white film that lightens the ribbon behind it. Sheet 3 is only the border: an empty rounded outline with a bright inner line and a faint dark outer hairline. Sheet 4 is only the highlight: an empty sheet with a soft bright strip along its top edge. A thin dotted guide line connects the four sheets through their centres.

**Style:** Flat technical illustration with soft depth. Each sheet casts its own faint violet shadow so it reads against white. Lines 6 px thick in the source file.

**Composition:** Four sheets in one row in the middle horizontal band, equal size, equal spacing. Keep the meaning in the central third: top and bottom thirds are white apart from the labels directly under each sheet.

**Labels (set in Figma, 36 px in source):** `blur`, `tint`, `border`, `highlight`

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** Four layers of a glass surface separated in an exploded view

**File:** `public/blog/assets/glassmorphism-design-guide/glass-layers-exploded.webp`

---

### 3. The types of glassmorphism that actually differ

**Scene:** The same rounded card repeated five times in one row on a pure white canvas. Behind every card sits the identical pair of bold shapes: a violet circle and an orange bar, each sticking out past the card edge. Card 1 is clear glass: the shapes behind stay sharp and fully recognisable through it. Card 2 is frosted: the shapes melt into soft colour fields. Card 3 is tinted: frosted glass that carries a visible violet hue across its whole surface. Card 4 is textured: frosted glass with a clearly visible fine grain. Card 5 is gradient-backed: instead of the two hard shapes, a smooth mesh gradient sits behind frosted glass and glows through it evenly.

**Style:** Flat UI mockup. The five surfaces must be clearly different from each other at a glance.

**Composition:** Five equal cards in a single row across the middle horizontal band, generous gaps, one label directly under each card. Keep the meaning in the central third: nothing above or below the row except the labels.

**Labels (set in Figma, 32 px in source):** `clear`, `frosted`, `tinted`, `textured`, `gradient-backed`

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** Five glassmorphism types shown side by side

**File:** `public/blog/assets/glassmorphism-design-guide/glass-types-comparison.webp`

---

### 4. The types of glassmorphism that actually differ (после таблицы)

**Scene:** The same card stacked twice, one above the other, on a pure white canvas. Behind each card sits the same pair of orbs, violet on the left and orange on the right, sticking out past the card edges. The top card is subtle glass: almost solid white, only a faint wash of colour leaks through, the orbs are barely visible under it. The bottom card is heavy glass: strongly transparent, the orb colours flood through as a thick luminous blur, bright edge highlight.

**Style:** Flat UI mockup, radius 24 px.

**Composition:** Vertical composition, two cards of equal size stacked with a clear gap, one large label inside each card. 10% empty white margin on every side. Two elements only.

**Labels (set in Figma, 44 px in source):** `subtle`, `heavy`

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** Subtle and heavy glass on the same card

**File:** `public/blog/assets/glassmorphism-design-guide/glass-subtle-vs-heavy.webp`

---

### 5. Why frosted glass keeps coming back

**Scene:** A vertical timeline of three large simplified mockups on a pure white canvas, connected by one thick vertical line. Top: a desktop window with a glossy translucent title bar in the style of late-2000s desktop glass, a violet orb showing through the bar. Middle: a tall rounded phone panel sliding up, uniformly frosted, a pink orb blurred behind it, like a 2013 mobile control panel. Bottom: a floating glass window with rounded corners and a soft orange orb behind it, like a 2023 spatial interface. No logos, no brand marks, no real interface text.

**Style:** Flat illustration with soft depth, connector line 8 px thick in the source in #7c4dff.

**Composition:** Vertical composition, three mockups of equal visual weight stacked top to bottom, the timeline line on the left, one label beside each mockup. 10% empty white margin on every side. Three elements only.

**Labels (set in Figma, 36 px in source):** `Aero, 2007`, `iOS 7, 2013`, `visionOS, 2023`

**Aspect ratio:** 2:3

**Final size:** 576×864, WebP

**Alt:** Timeline of frosted glass in Aero, iOS 7 and visionOS

**File:** `public/blog/assets/glassmorphism-design-guide/glass-history-timeline.webp`

---

### 6. Five glass aesthetics, one family

**Scene:** The same simple card (one heading bar, one button shape) rendered in five treatments on a pure white canvas, three on top and two centred below. Cell 1, glassmorphism: a frosted light glass card with violet and pink orbs blurred behind it. Cell 2, frosted UI: a neutral, more opaque frosted panel like desktop system chrome, almost no colour. Cell 3, liquid glass: a clear lens-like card whose edges bend and refract an orange orb behind it. Cell 4, neumorphism: this one cell sits on its own rounded pale grey tile #e9edf2, and the card is the same grey, shaped only by one light and one dark shadow. Cell 5, claymorphism: a puffy pastel lavender card with thick rounded corners and a coloured soft shadow, directly on white.

**Style:** Flat UI mockup, brand violet #7c4dff as the shared accent so the five cells read as one family.

**Composition:** Five equal cells, three in the first row and two centred in the second, 10% safe white margin on every side, one label under each cell. The grid is centred, nothing important in the corners.

**Labels (set in Figma, 32 px in source):** `glassmorphism`, `frosted UI`, `liquid glass`, `neumorphism`, `claymorphism`

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** One card rendered in five different glass aesthetics

**File:** `public/blog/assets/glassmorphism-design-guide/glass-family-matrix.webp`

---

### 7. The anatomy of a glass surface

**Scene:** An extreme close-up of the top-left corner of a light glass card on a pure white canvas, enlarged so the corner fills the frame. A violet orb fading to pink sits behind the corner and sticks out past it. Four things are visible and each has one short leader line: the blurred colour behind the glass, the milky white tint of the surface, the thin edge (bright line inside, faint dark hairline outside), and the soft highlight strip just inside the top edge.

**Style:** Technical macro illustration, leader lines 6 px thick in the source in #19181b.

**Composition:** The corner sits in the centre and runs diagonally, four leader lines fan out to four labels placed in the four quadrants. 10% empty white margin on every side. Four elements only.

**Labels (set in Figma, 36 px in source):** `blur`, `tint`, `border`, `highlight`

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** Close-up of a glass surface edge with four labelled layers

**File:** `public/blog/assets/glassmorphism-design-guide/glass-surface-cross-section.webp`

---

### 8. Backdrop blur and how much is too much

**Scene:** The same light glass card repeated five times in a row on a pure white canvas. Behind every card sits the identical backdrop: a large bold letter pair in violet and two hard-edged shapes in pink and orange, sticking out slightly past the card. From left to right the blur grows. Under the first card the letters are still readable. Under the third they are soft colour fields. Under the fifth there is one even wash of colour with no shapes left.

**Style:** Flat UI mockup, radius 24 px. For this image only, lower the white surface to about 30% so the blur steps are easy to compare. The five blur strengths must be clearly different from each other.

**Composition:** Five equal cards in a single row across the middle horizontal band, one value label under each. Keep the meaning in the central third: top and bottom thirds are white apart from the labels.

**Labels (set in Figma, 36 px in source):** `4 px`, `8 px`, `16 px`, `24 px`, `40 px`

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** The same glass card at five blur strengths side by side

**File:** `public/blog/assets/glassmorphism-design-guide/blur-scale-comparison.webp`

---

### 9. Tint and saturation

**Scene:** Two rounded cards stacked on a pure white canvas. Behind each card sits a solid violet tile, slightly larger than the card, so a violet frame is visible around it. Each card holds one large white sample word. The top card has a very light white tint: the violet under it stays deep and the white word is crisp. The bottom card has a heavy milky white tint: the violet under it turns pale lilac and the white word is hard to read.

**Style:** Flat UI mockup. Build from exact colours so the numbers stay true: tile #7c4dff, top surface #865bff, bottom surface #b094ff, white text on both. This image shows the classic white-text recipe on purpose, so ignore the "never white text" line of the master block here.

**Composition:** Vertical composition, two equal cards stacked with a clear gap, the percentage label large inside each card next to the sample word. 10% empty white margin on every side. Two elements only.

**Labels (set in Figma, 44 px in source, do not change):** `8%`, `40%`; sample word on both cards `Aa`

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** Glass tint at eight and forty percent opacity

**File:** `public/blog/assets/glassmorphism-design-guide/glass-tint-range.webp`

---

### 10. The border that saves readability

**Scene:** A rounded photo tile sits in the centre of a pure white canvas: a dark night photograph with a few soft out-of-focus lights. The corner of a dark glass panel lies over the photo. A thin bright line runs along the top and left edge of the panel and separates it cleanly from the photo. Inside the panel, one large white sample word stays sharp and readable.

**Style:** Photographic tile with a flat UI panel on top. Photo tones around #0b1220 with small highlights near #e8eef5. Use the dark variant of the master block for the panel. The edge line is enlarged so the 1 px edge reads as a 6 px line in the source.

**Composition:** The photo tile takes the central 80% of the frame, the corner of the panel sits slightly above centre, the edge line runs through the centre, the sample word sits inside the panel below it. 10% empty white margin on every side. Two elements only (the edge and the word). No people in the photo.

**Labels (set in Figma, 36 px in source):** `1 px border`; sample word `Aa`

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** A one pixel light border keeping text legible on a photo

**File:** `public/blog/assets/glassmorphism-design-guide/glass-border-legibility.webp`

---

### 11. The inner highlight that fakes thickness

**Scene:** Three thick slabs of light glass seen in cross-section from the side, stacked top to bottom on a pure white canvas. One vertical band of violet runs behind all three slabs and shows through them as blurred colour. The top slab is flat: a uniform translucent sheet that looks like a sticker with no depth. The middle slab has a bright soft line just inside its top edge, so it reads as a thick pane catching light. The bottom slab has the same highlight plus a fine visible grain across its surface.

**Style:** Technical cross-section illustration, highlight in pure white, outline lines 6 px thick in the source.

**Composition:** Vertical composition, three equal slabs stacked with clear gaps, one label to the left of each. 10% empty white margin on every side. Three elements only.

**Labels (set in Figma, 40 px in source):** `flat`, `highlight`, `noise`

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** Cross-section of a glass edge with and without an inner highlight

**File:** `public/blog/assets/glassmorphism-design-guide/glass-thickness-layers.webp`

---

### 12. A copy-paste CSS recipe

**Scene:** One finished light glass card on a pure white canvas: a floating summary card with one large dark number, one short dark line under it and one solid violet pill button with a white label. Three orbs sit behind the card: violet behind the upper left corner, pink behind the right edge, orange behind the lower left. Each orb sticks out past the card and is sharp there, and glows as a soft blur under the glass. The card has a bright inner top highlight, a faint dark hairline and a soft violet shadow.

**Style:** Clean product UI mockup, radius 24 px. This is the hero of the article: the glass must look bright, crisp and luminous on white, never grey.

**Composition:** The card sits in the centre and takes roughly the central third of the frame width. Keep the meaning in the central third: the outer areas are pure white.

**Labels (set in Figma):** number `$48`, line `per month`, button `Upgrade`

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** The glass card that the CSS recipe produces

**File:** `public/blog/assets/glassmorphism-design-guide/glass-recipe-result.webp`

---

### 13. Light theme and dark theme

**Scene:** One simple layout (a glass card with a heading bar, one text bar and one solid violet button) shown once, split down the middle by a vertical line. The left half is the light theme: pure white canvas, violet and pink orbs behind the card, a light glass surface, dark content bars. The right half is the dark theme: deep canvas #0f1117, the same orbs glowing behind the card, a dark navy glass surface, white content bars. The card continues across the split so it is clearly the same layout.

**Style:** Flat UI mockup, radius 24 px. Left half follows the master block, right half follows the dark variant. The violet button is identical on both halves.

**Composition:** The split line runs through the exact centre, the card is centred on it. Keep the meaning in the central third. One label in the top corner of each half.

**Labels (set in Figma, 36 px in source):** `light` in #19181b, `dark` in white

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** The same glass layout in light and dark themes

**File:** `public/blog/assets/glassmorphism-design-guide/glass-light-dark.webp`

---

### 14. Fallback for browsers without backdrop-filter

**Scene:** Two cards of the same size side by side on a pure white canvas, the same violet and orange orbs behind each. The left card is the fallback: a solid, fully opaque pale lavender surface with a faint hairline border, the orbs are completely hidden where the card covers them. The right card is the glass version: the same orbs show through as a soft luminous blur. Both hold the same large dark sample word and both are equally readable.

**Style:** Flat UI mockup, left card solid #f7f4ff, right card follows the master block, text #19181b on both, radius 24 px, the same violet shadow under both.

**Composition:** Two equal cards centred, a clear gap between them, one label under each. 10% empty white margin on every side. Two elements only.

**Labels (set in Figma, 36 px in source):** `fallback`, `blur`; sample word on both `Aa`

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** A solid fallback next to a blurred glass card

**File:** `public/blog/assets/glassmorphism-design-guide/glass-fallback-compare.webp`

---

### 15. Contrast math you can check before shipping

**Scene:** A grid of six cards on a pure white canvas, three columns by two rows. Each card lies on its own rounded backdrop tile, slightly larger than the card. Column 1 tile: a pale pastel gradient. Column 2 tile: a dark night photo with one bright highlight. Column 3 tile: a hard black-and-white checker pattern. The top row uses classic glass with white text: a faint white tint, and the white sample word nearly disappears on the pale gradient, on the photo highlight and on the white squares. The bottom row uses light glass with dark text: a dense white surface, and the dark sample word is clearly readable on all three tiles.

**Style:** Flat UI mockup. Build the tiles from exact colours so the numbers stay true: gradient #c4b5fd to #fbcfe8, photo shadows #0b1220 with a highlight of #e8eef5, pattern #111111 and #ffffff. Top row surface is white at 12% with white text. Bottom row surface is white at 60% with #19181b text. In the top row the sample word sits over the lightest part of each tile, in the bottom row over the darkest part.

**Composition:** Grid centred with a 10% safe white margin, columns labelled once along the top, rows labelled once on the left, one large contrast value under each card. A red cross beside the three values in the top row and a green tick beside the three in the bottom row. No people in the photo.

**Labels (set in Figma, values 40 px in source, do not change them):** columns `gradient`, `photo`, `pattern`; rows `12% tint`, `60% tint`; top row values `1.33:1`, `1.15:1`, `1.00:1`; bottom row values `14.02:1`, `6.76:1`, `6.74:1`; sample word `Aa`

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** Glass card tested on gradient, photo and pattern backgrounds

**File:** `public/blog/assets/glassmorphism-design-guide/contrast-stress-test.webp`

---

### 16. States on a glass component

**Scene:** The same light glass pill button repeated seven times in one row on a pure white canvas. One soft horizontal ribbon of violet-pink-orange gradient runs behind the whole row, a little taller than the buttons, so every button has colour under it and white above and below. Each button shows one state through a structural change, never through tint alone. Default: resting glass with a top highlight and a soft shadow. Hover: brighter highlight and a larger, lifted shadow. Focus: a solid dark 2 px ring outside the button with a 2 px white gap. Active: pressed flat, highlight gone, shadow tight. Disabled: flat, no highlight, no shadow, dimmed label. Error: a solid red border and a small alert glyph. Loading: label replaced by a spinner, same width.

**Style:** Flat UI mockup, dark labels #19181b, focus ring #19181b, error border #c62828.

**Composition:** Seven equal buttons in one row across the middle horizontal band, one label under each. Keep the meaning in the central third: top and bottom thirds are white apart from the labels.

**Labels (set in Figma, 32 px in source):** `default`, `hover`, `focus`, `active`, `disabled`, `error`, `loading`

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** Glass button in default, hover, focus, active, disabled, error and loading states

**File:** `public/blog/assets/glassmorphism-design-guide/glass-states.webp`

---

### 17. Where glass belongs and where it breaks

**Scene:** Two panels side by side on a pure white canvas. Left: a white page with large colourful content blocks, and a light glass navigation bar floating across the top of it. The blocks pass under the bar and show through as a soft blur, the bar content stays readable, the blocks below are sharp. Right: a light glass panel holding a dense data table with many rows of small bars and numbers, lying over the same colourful blocks. The colour bleeds through unevenly and the rows become patchy and hard to follow.

**Style:** Flat UI mockup, content blocks in #7c4dff, #ff5fa2 and #ffb86b. Table rows are abstract bars, not readable text.

**Composition:** Two equal panels centred with a clear gap, a green tick above the left one and a red cross above the right one, one label under each. Keep the meaning in the central third.

**Labels (set in Figma, 36 px in source):** `chrome`, `dense data`

**Aspect ratio:** 16:9

**Final size:** 1440×810, WebP

**Alt:** Glass on navigation chrome and on dense content

**File:** `public/blog/assets/glassmorphism-design-guide/glass-chrome-vs-content.webp`

---

### 18. Component recipes

**Scene:** Four finished light glass components in a two by two grid on a pure white canvas, each with its own pair of orbs behind it. Top left: a content card with a heading bar, a text bar and a solid violet button. Top right: a modal dialog with a title bar and two buttons, floating over a rounded dimmed tile so the scrim is visible. Bottom left: a horizontal navigation bar with a logo dot and four link bars, colourful blocks passing under it. Bottom right: a toast notification with an icon dot, one line and a close mark.

**Style:** Clean product UI mockup, radius 24 px on the card and modal, full pill on the toast and navbar. Content is abstract dark bars, not readable text. All four must look like one material.

**Composition:** Grid of four equal cells centred with a 10% safe white margin, one label under each cell, nothing important in the corners.

**Labels (set in Figma, 36 px in source):** `card`, `modal`, `navbar`, `toast`

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** Four glass component recipes on a neutral canvas

**File:** `public/blog/assets/glassmorphism-design-guide/glass-component-recipes.webp`

---

### 19. Component recipes (после сетки)

**Scene:** One toast notification shown three times, stacked top to bottom on a pure white canvas, a violet orb and an orange orb behind the stack. Top: a quiet neutral light glass toast. Middle: the same toast with a green hue mixed into the glass and a green icon dot. Bottom: the same toast as a fully solid red surface with no transparency and white content, for a critical message.

**Style:** Flat UI mockup, top toast follows the master block, middle toast tinted with #1f9d6b at low strength with dark content, bottom toast solid #c62828 with white content, full pill radius. Content is one icon dot and one bar per toast.

**Composition:** Vertical composition, three equal toasts stacked with clear gaps, one label directly beneath each. 10% empty white margin on every side. Three elements only.

**Labels (set in Figma, 40 px in source):** `quiet`, `tinted`, `solid`

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A single glass toast component at three accent levels

**File:** `public/blog/assets/glassmorphism-design-guide/glass-toast-recipe.webp`

---

### 20. Glassmorphism on mobile

**Scene:** A simplified phone outline on a pure white canvas. The screen is white with a scrolling feed of large colourful blocks, and a light glass bottom navigation bar with four large dark icon dots floats over the feed, the blocks blurred under it. Below the phone sits one large rounded readout chip showing a frame rate value with a short gauge arc.

**Style:** Flat UI illustration. The phone is a plain rounded outline 6 px thick in the source in #19181b (a shape, not a product photo), feed blocks in #7c4dff, #ff5fa2 and #ffb86b, readout chip solid #19181b with white text.

**Composition:** Vertical composition, the phone takes the upper two thirds, the readout chip the lower third, both centred. 10% empty white margin on every side. Two elements only.

**Labels (set in Figma, 56 px in source, do not change):** `60 fps`

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** Glass navigation on a phone next to a frame rate reading

**File:** `public/blog/assets/glassmorphism-design-guide/glass-mobile-performance.webp`

---

### 21. Design tokens for a glass system

**Scene:** One light glass panel on a pure white canvas, a violet orb behind its upper left corner and a pink orb behind its lower right. The panel holds a list of four rows. Each row pairs two name chips joined by a short arrow: a design-tool variable name on the left and a code variable name on the right. A small swatch sits at the start of each row.

**Style:** Flat UI mockup, chips in solid white with #19181b monospace text and a faint hairline, arrows 6 px thick in the source in #7c4dff.

**Composition:** The panel is centred and fills the frame up to a 10% empty white margin on every side, four rows of equal height. Four elements only (four rows).

**Labels (set in Figma, 32 px in source, monospace, do not change):** row 1 `glass/blur` → `--glass-blur`; row 2 `glass/tint` → `--glass-tint`; row 3 `glass/border` → `--glass-border`; row 4 `glass/highlight` → `--glass-highlight`

**Aspect ratio:** 1:1

**Final size:** 576×576, WebP

**Alt:** Token panel mapping Figma variables to CSS custom properties

**File:** `public/blog/assets/glassmorphism-design-guide/glass-design-tokens.webp`

---

### 22. Eight anti-patterns that make glass unreadable

**Scene:** A grid of eight small mockups on a pure white canvas, four columns by two rows, each showing one mistake and each marked with a red cross in its top right corner. 1: white text on clear untinted glass over a busy photo tile. 2: a glass card stacked on another glass card, both muddy. 3: a glass card directly on plain white with nothing behind it, so it is almost invisible. 4: a milky pale card over a violet tile with washed-out white text. 5: a glass card with no edge and no shadow, melting into the colour behind it. 6: glass over a dense table of tiny rows. 7: two identical buttons where the only difference is a slightly lighter tint. 8: a see-through card with sharp unblurred content behind it and unreadable text.

**Style:** Flat UI mockup, backdrops in #7c4dff, #ff5fa2 and #ffb86b, crosses in #c62828 inside solid white circles with a hairline so they stay visible, radius 24 px. Content is abstract bars, not readable text. These cells break the master block on purpose: each one removes exactly one rule.

**Composition:** Grid of eight equal cells centred with a 10% safe white margin, one label under each cell, nothing important in the corners.

**Labels (set in Figma, 32 px in source):** `no tint`, `stacked glass`, `flat backdrop`, `milky tint`, `no edge`, `dense data`, `tint-only states`, `no fallback`

**Aspect ratio:** 3:2

**Final size:** 1440×960, WebP

**Alt:** Eight common glassmorphism mistakes in a grid

**File:** `public/blog/assets/glassmorphism-design-guide/glass-mistakes.webp`

---

### 23. Before you ship

**Scene:** One tall light glass card on a pure white canvas, a violet orb behind its upper right corner and a pink orb behind its lower left, both sticking out past the card. The card holds a checklist of six rows. Each row has a large round tick mark on the left and one short dark label on the right. All six rows are ticked.

**Style:** Flat UI mockup, ticks are solid #7c4dff circles with a white check, labels #19181b.

**Composition:** Vertical composition, the card is centred and fills the frame up to a 10% empty white margin on every side, six rows of equal height, no card title.

**Labels (set in Figma, 36 px in source):** `contrast checked`, `fallback ready`, `focus visible`, `states differ`, `phone tested`, `tokens named`

**Aspect ratio:** 4:5

**Final size:** 576×720, WebP

**Alt:** A glass checklist card with ticked items

**File:** `public/blog/assets/glassmorphism-design-guide/glass-ship-checklist.webp`

---

## 7. Откуда числа

Все значения контраста посчитаны по формуле относительной яркости WCAG 2.x, смешивание слоёв в sRGB (так композитит браузер по умолчанию). Скрипты расчёта: `/tmp/glass-contrast.js` и `/tmp/glass-white.js`. Расчёт целиком будет показан в разделе `Contrast math you can check before shipping`.

| Где | Число | Что это |
|---|---|---|
| №9 | поверхность `#865bff` при 8% | белый tint 8% поверх `#7c4dff`, контраст с белым текстом 4.23:1 |
| №9 | поверхность `#b094ff` при 40% | белый tint 40% поверх `#7c4dff`, контраст с белым текстом 2.46:1 |
| №15, верхний ряд | 1.33 / 1.15 / 1.00 | белый текст на белом tint 12%, самая светлая точка каждого фона: `#fbcfe8`, `#e8eef5`, `#ffffff` |
| №15, нижний ряд | 14.02 / 6.76 / 6.74 | текст `#19181b` на белом tint 60%, самая тёмная точка каждого фона: `#c4b5fd`, `#0b1220`, `#111111` |
| №20 | 60 fps | целевой бюджет кадра, 1000 / 60 = 16.7 мс. Не замер |
| правило 3 | 9.94:1 | `#19181b` на белом tint 60% поверх `#7c4dff` (поверхность `#cbb8ff`) |
| правило 3 | 6.21:1 | то же поверх чёрного `#000000` (поверхность `#999999`), худший возможный фон |
| правило 5 | 1.18:1 | линия `rgba(25,24,27,.08)` на белом (`#ededed`) к белому |
| правило 7 | 4.81:1 | белый текст на сплошном `#7c4dff` |
| №16 | 17.68:1 и 3.67:1 | кольцо фокуса `#19181b` к белому и к `#7c4dff` |
| №19 | 5.62:1 | белый текст на сплошном `#c62828` |
| №14 | 16.28:1 | `#19181b` на fallback-заливке `#f7f4ff` |

Дополнительно для текста статьи: светлое стекло с tint 50% над чёрным даёт 4.45:1 (чуть ниже AA), с tint 40% даёт 3.08:1. Отсюда нижняя граница главного рецепта: 60%.

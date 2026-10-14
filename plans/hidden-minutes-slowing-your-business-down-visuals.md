# Визуализация самого сложного момента — hidden-minutes-slowing-your-business-down

## 1. Самый сложный для понимания момент

**Метод «карты трения» из финального раздела [`Measure software by the steps it removes`](content/blog/hidden-minutes-slowing-your-business-down.mdx:141).**

Статья держит ровный, очень понятный ритм: каждый из семи разделов берёт одно бытовое раздражение (печатать, копировать между системами, спрашивать статус, ислать документ, договариваться о встрече) и объясняет его простыми примерами. Эти разделы читаются легко, потому что у каждого есть бытовая интуиция. Финальный раздел ломает этот ритм: он единственный описывает **не конкретный инструмент, а абстрактный метод аудита**, и делает это одним плотным абзацем без единой визуальной опоры.

Почему это тяжелее всего остального:

1. **Четыре действия в одном абзаце.** Читателю предлагается одновременно: провести процесс «от начала до конца», посчитать шесть разных типов потерь (handoffs, repeated entries, searches, approvals, manual messages, app switches), затем рассортировать шаги на две группы и только потом решить, что упрощать ([`:145`](content/blog/hidden-minutes-slowing-your-business-down.mdx:145)). Шесть переменных в одном предложении — предельная нагрузка на рабочую память.
2. **Две группы шагов, которые внешне выглядят одинаково.** «Steps that create genuine value» и «steps that exist only because the current workflow requires them» — это одинаковые клетки одного процесса, различить их можно только мысленно, на глаз они не отличаются ([`:145`](content/blog/hidden-minutes-slowing-your-business-down.mdx:145)). Именно здесь нужна визуальная кодировка цветом, которой в тексте нет.
3. **Накопление против мгновенности.** Сам тезис статьи — «каждая мелочь кажется безобидной, вместе они становятся операционной проблемой» ([`:55`](content/blog/hidden-minutes-slowing-your-business-down.mdx:55)) и «сложенные вместе минуты становятся самым ценным улучшением продуктивности» ([`:153`](content/blog/hidden-minutes-slowing-your-business-down.mdx:153)). Абстрактная идея накопления плохо удерживается без графика или счётчика.

**Ближайший конкурент (второе место):** финальная перечисляющая фраза `When dictation speeds up input, integrations move data automatically, project systems clarify ownership…` ([`:153`](content/blog/hidden-minutes-slowing-your-business-down.mdx:153)) — это длинный «каталог выгод» из пяти инструментов в одном предложении. Но у каждого инструмента уже есть свой раздел с примерами выше, поэтому непонимание локально и не критично. Метод аудита остаётся единственным местом, где читатель не имеет бытовой опоры.

---

## 2. Общая дизайн-система для всех трёх версий

- **Фон: строго белый `#ffffff`**, без градиентов, теней, текстур, шума.
- Палитра: акцент Setproduct `#7c4dff`, «ценный шаг» зелёный `#22c55e`, «трение» красный `#ef4444`, текст `#19181b`, волосяные линии `#e5e7eb`.
- Стиль: плоский вектор, штрих 1.5px, радиус 8px, много воздуха, без фотореализма, без 3D, без лиц и людей.
- Типографика: геометрический sans для подписей, **monospace для названий шагов, счётчиков и метрик**.
- Нумерация шагов — арабские цифры в маленьких кружках (не ❶ и не кириллица).
- Никаких брендов и логотипов: инструменты остаются абстрактными категориями (dictation, integration, project system, scheduling, finance).
- Внутри картинки только короткие метки, вся аргументация остаётся в теле статьи.

---

## 3. Три версии (промпты для генерации)

### Версия 1 — Схема: карта трения одного процесса

**Тип:** flat vector process diagram with counters. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Clean flat vector process diagram on a strictly pure white background, no gradients, no shadows, no textures, no photorealism. The composition reads left to right as a single horizontal chain labeled MAP ONE RECURRING PROCESS, drawn as ten small rounded rectangle step cards connected by thin 1.5px grey connectors. Each card carries a tiny geometric icon and a short label in dark grey monospace, the sequence reading: form arrives, create CRM record, copy notes, notify finance, search document, request approval, send message, switch app, log status, invoice.
Above the chain, five small counting badges hover over the relevant cards, each a purple circle with a short metric in white monospace: HANDOFFS, REPEATED ENTRIES, SEARCHES, APPROVALS, APP SWITCHES. A thin purple tally rail runs above the whole chain, marked with small vertical tick marks, visually accumulating a running count as it moves right, ending in a bold rounded badge that reads TOTAL FRICTION POINTS.
Below each card, a small classification tag colors the step: steps that create genuine value are tagged green #22c55e, and steps that exist only because the current workflow requires them are tagged red #ef4444. Add a compact legend in the bottom left with three swatches, and a single caption in geometric sans reading: count the steps, keep the ones that create value. Palette strictly purple #7c4dff accents, green #22c55e, red #ef4444, near-black #19181b for text and icons, light grey #e5e7eb for connectors and hairlines. Flat vector, 16:9, thin strokes, rounded corners, generous negative space, monospace labels, no people, no 3D, no photorealism.
```

### Версия 2 — Инфографика: анатомия рабочего дня, где прячутся минуты

**Тип:** flat infographic, day-strip with leaking minutes. **Соотношение:** 16:9. **Фон:** строго белый.

```text
Minimal flat-vector infographic on a strictly pure white background, no gradients, no shadows, no textures, no photorealism. The frame shows one horizontal working-day strip running left to right, drawn as a long rounded rectangle in light grey #e5e7eb, with small hour markers labeled 9:00 through 18:00 in monospace beneath it. Over the strip sit six identical small task blocks, evenly spaced, each shown as a tidy rounded square with a tiny icon and a short monospace label: retype data, copy between apps, search file, wait for approval, rewrite message, book meeting.
From the bottom edge of each block, a thin red #ef4444 line leaks downward and drops a tiny sand-like particle trail into a narrow collecting tray that runs the width of the frame beneath the day strip. The tray gradually fills left to right with a soft red fill that rises in small steps, accumulating visibly as the day progresses, ending at the far right with a bold rounded counter that reads MINUTES LOST, with three small tick sublabels at 1 DAY, 1 WEEK, 1 MONTH to suggest the total growing over time.
Across the top of the frame, a single row of small neutral pills lists the six loss types in monospace for the reader to match against the leaking blocks: HANDOFF, REPEATED ENTRY, SEARCH, APPROVAL, MANUAL MESSAGE, APP SWITCH. Keep the upper third calm and airy, the middle third diagrammatic, the lower third focused on the accumulating tray. Palette strictly purple #7c4dff for headings and counters, red #ef4444 for leaks, near-black #19181b for text and icons, light grey #e5e7eb for the day strip and hairlines. Flat vector, 16:9, thin 1.5px strokes, rounded corners, monospace captions, geometric sans labels, no people, no 3D, no photorealism.
```

### Версия 3 — Комбинация: сортировка шагов + график высвобожденного времени

**Тип:** sorting diagram (two piles) + compact bar chart. **Соотношение:** 4:3. **Фон:** строго белый.

```text
Flat technical infographic on a pure white background combining a sorting diagram with a small bar chart, no gradients, no shadows, no textures, no photorealistic elements. The upper two thirds show a sorting motion: on the left, a vertical stack of twelve identical small step cards, each a rounded rectangle with a short monospace label such as create record, copy notes, search doc, request approval, send message, switch app, and a few unlabeled blank cards. Two diverging arrows leave the stack: the upper arrow curves right into a green #22c55e tray titled KEEP, VALUE STEPS, and the lower arrow curves right into a red #ef4444 tray titled REMOVE, WORKFLOW STEPS. Show only the value cards landing neatly in the green tray and the friction cards piling into the red tray, with small tally marks beside each tray reading the final counts.
The lower third holds a compact horizontal bar chart on a white plane with a dotted 1px baseline. Four short purple #7c4dff bars are labeled with the tools from the article, using short captions in monospace: DICTATION, INTEGRATIONS, PROJECT SYSTEM, SCHEDULING, each bar ending in a tiny chip showing minutes saved per week, rising gently left to right to suggest that small gains per tool stack up over a day. Above the chart, one line in geometric sans reads: faster is fewer steps, not more tools, echoed by a tiny warning triangle chip at the right edge reading a heavier platform can add work.
Palette strictly purple #7c4dff, green #22c55e, red #ef4444, near-black #19181b for text and card outlines, light grey #e5e7eb for hairlines and the baseline. Flat vector, 4:3, thin strokes, rounded corners, generous white margins, monospace for labels and numbers, geometric sans for the headline line, no people, no 3D, no photorealism, no brand logos.
```

---

## 4. Рекомендованное размещение в статье

| Версия | Куда вставлять | Зачем |
|---|---|---|
| Версия 1 (карта трения) | Сразу после абзаца [`Map a recurring process from beginning to end…`](content/blog/hidden-minutes-slowing-your-business-down.mdx:145) | Даёт визуальную опору там, где текст перечисляет шесть типов потерь одним предложением — это ядро метода, без картинки оно не запоминается |
| Версия 2 (анатомия дня) | В конце вводного абзаца [`When work slows down…`](content/blog/hidden-minutes-slowing-your-business-down.mdx:55), перед первым H2 | Разбивает вход в статью и сразу показывает тезис накопления, который дальше доказывается по разделам |
| Версия 3 (сортировка + график) | Перед закрывающим абзацем [`The objective is to reserve human attention…`](content/blog/hidden-minutes-slowing-your-business-down.mdx:153) | Обобщает метод аудита в практический инструмент и визуально фиксирует идею «минуты складываются» перед финалом |

Итог по визуальному ритму: статья получает три белые инфографики в разных пропорциях (16:9, 16:9, 4:3) в трёх разных зонах: вход, объясняющая середина, практический финал. Это разбивает длинные текстовые прогоны именно там, где сейчас идут пять, семь и четыре абзаца подряд без картинок, и удерживает внимание читателя до FAQ.

---

## 5. Что НЕ делать

- Не смешивать тёмный и светлый фон — все три строго на белом `#ffffff`.
- Не менять цветовую кодировку между версиями: зелёный `#22c55e` всегда «ценный шаг», красный `#ef4444` всегда «трение», фиолетовый `#7c4dff` всегда акцент и счётчик.
- Не добавлять фотореалистичных людей, 3D-рендеры, офисные стоковые сцены и лица.
- Не использовать градиенты, тени, текстуры — только плоский вектор и волосяные линии.
- Не вставлять названия компаний, логотипы и продуктовые бренды: инструменты остаются абстрактными категориями, иначе картинка читается как реклама.
- Не перегружать картинки длинным текстом — только короткие метки и счётчики, вся аргументация остаётся в теле статьи.

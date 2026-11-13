# LinkedIn-картинки, вторая итерация

Первая версия промптов (A, B, C в `plans/resources-digest-linkedin.md`) в работу не идёт: три абстрактные инфографики не останавливают ленту. Разбор ниже, потом три новых подхода.

## Почему первые три не работали

→ **Нет узнаваемого объекта.** Пастельные прямоугольники с чёрными иконками не изображают ничего, что человек видел раньше. Ленту останавливает либо знакомое (Photoshop, PSD, телефон, экран приложения), либо непонятное настолько, что хочется разобраться. Промежуточная абстракция не делает ни того, ни другого.

→ **Текст на картинке повторял текст поста.** Смысл обложки в ленте — дать причину развернуть пост. Если на картинке уже написано «Stars vs installs», читать дальше незачем.

→ **Зацикленность на GitHub-цифрах.** Звёзды и загрузки важны разработчику, который уже выбирает библиотеку. Дизайнер, тимлид и продакт проходят мимо: для них это внутренняя метрика чужого мира.

## Три новых подхода

| Вариант | Механизм остановки | Что нужно | Кто доделывает |
|---|---|---|---|
| **A. Стена из десяти экранов** | Плотность плюс настоящий интерфейс | Готовая сетка-подложка | Скриншоты вставляются скриптом |
| **B. Из текста в экран** | Превращение: слева текст, справа экран | Готовая подложка со стрелкой | Один скриншот вставляется скриптом |
| **C. Стопка слоёв** | Знакомый предмет: слои, как карточки | Всё на картинке | Ничего, можно публиковать как есть |

Все три: **4:5, разрешение 2K** в Nano Banana Pro. Стиль тот же, что у обложки поста: небрутализм, светлая пастель, вид строго спереди, толстая чёрная обводка, тени без размытия.

Главное техническое отличие от первой версии: **модель больше не рисует интерфейс**. В промптах A и B экраны оставлены пустыми белыми прямоугольниками, и это оговорено прямым запретом. Иначе Nano Banana Pro придумает кнопки и графики, и картинка станет ложью про настоящие утилиты. Пустые места заполняются реальными скриншотами из `public/freebies/` через sharp.

---

## Вариант A. Стена из десяти экранов

Стоит первым: десять разных интерфейсов в одной сетке читаются за полсекунды и обещают «вот столько всего сразу». Плюс это единственный вариант, где картинка показывает сам продукт, а не разговор о нём.

```
A flat neubrutalist editorial poster in a vertical 4:5 format, viewed perfectly head-on with no tilt, no perspective and no rotation. The background is pale cream (#FBF6EC) with a faint grid of slightly darker lines. At the top, one line of very heavy black sans-serif text reads "Ten tools. Two months." at a size that spans most of the frame width, with the smaller label "September to October 2026" directly beneath it. Below the heading, ten rounded rectangles fill the rest of the frame in five rows and two columns, with even gaps between them. Every rectangle has a bold black outline about 7 pixels thick and a hard black offset shadow shifted down and to the right with zero blur. The rectangles alternate in fill between soft lilac (#EDE7FF), pale mint (#D7F5E3), butter yellow (#FFF3C4) and pale peach (#FFE1CC). The rectangle in the bottom right corner is filled coral (#FF9E80) and is noticeably taller than the others, so the grid ends on a larger tile. The interior of every rectangle is plain empty white with nothing drawn inside: these are placeholders for real screenshots added later. Do not draw windows, buttons, icons, charts, toolbars, cursors, text or any interface elements inside the rectangles. The only text in the whole image is the heading and the small date label. Flat colour fills only: no gradients, no glow, no glass, no 3D shading, no photographic texture, no people, no logos. Keep everything inside the central 90 percent of the frame, with the coral tile at the bottom right fully visible.
```

Alt: `Ten pastel tiles in a grid on a cream background, ready to hold screenshots of ten open source tools`

---

## Вариант B. Из текста в экран

Самый сильный из трёх по механике. «Опиши экран, получи приложение» — это то, что в статье удивляет сильнее всего, и это упаковывается в схему «было → стало», а она останавливает ленту лучше любого списка. Заодно снимает вопрос «а что там внутри», не раскрывая ответа.

```
A flat neubrutalist editorial illustration in a vertical 4:5 format, viewed perfectly head-on with no tilt, no perspective and no rotation. The background is soft lilac (#EDE7FF) with a faint grid of slightly lighter lines. At the top, two lines of very heavy black sans-serif text read "Describe a screen" and, beneath it, "Get an app", both left-aligned. Below the heading, two tall objects stand side by side on a shared baseline with a clear gap between them. On the left is a rectangular card filled off-white (#FFFDF7) with a bold black outline about 8 pixels thick and a hard black offset shadow shifted down and to the right with zero blur. Inside its upper half, draw eight horizontal rounded bars of solid grey (#C9C9C9) of varying widths, evenly spaced, like unreadable lines of writing. Below the bars the card stays plain and empty. On the right stands a tall rounded phone-shaped rectangle filled pale mint (#D7F5E3) with the same thick black outline and the same hard shadow. Its interior is plain empty white with nothing drawn inside: this is a placeholder for a real app screenshot. Do not draw buttons, icons, status bars, toolbars, keyboards or any interface elements inside the phone. Between the two objects, at mid height, place one thick solid black horizontal arrow pointing to the right, drawn as a simple straight line with a triangular head. Under the left object place the small label "prompt", under the right object the small label "screen". The only text in the whole image is the heading and those two labels. Flat colour fills only: no gradients, no glow, no glass, no 3D shading, no people, no logos. Keep both objects and the arrow inside the central 90 percent of the frame.
```

Alt: `A card of grey text lines on the left, an empty phone-shaped frame on the right, a black arrow between them`

---

## Вариант C. Стопка слоёв

Единственный из трёх, который можно публиковать сразу, без доделки. Ставка на узнавание: дизайнер видит слои раньше, чем прочитает слова. Заголовок бьёт в главный страх темы — «бесплатная замена Photoshop, которая открывает PSD». Слова короткие, поэтому модель их не испортит.

```
A flat neubrutalist editorial illustration in a vertical 4:5 format, viewed perfectly head-on with no tilt, no perspective and no rotation. The background is warm cream (#FBF6EC). At the top, one line of very heavy black sans-serif text reads "Free. Opens PSD files. macOS." left-aligned, with a short coral (#FF9E80) bar underneath the first word only. Below the heading sits a stack of four flat rectangular panels, offset upward and to the left so the top edges of the three lower panels show above and behind the front one, like a pile of sheets fanned slightly. Each panel has a bold black outline about 8 pixels thick and a hard black offset shadow with zero blur. The three back panels are filled pale peach (#FFE1CC), pale mint (#D7F5E3) and soft lilac (#EDE7FF), and each shows only a narrow empty strip of its surface. The front panel is the largest, filled off-white (#FFFDF7). Centred inside the front panel sits one large square file badge, about 45 percent of the panel height, with the same bold black outline and the same hard shadow, rounded at the corners by about 12 percent of its width. The badge is filled dark navy (#001E36). Inside it, the two letters "Ps" are set in heavy light-blue (#31A8FF) grotesque type, centred, filling most of the badge width, drawn as clean flat letterforms: a capital P followed by a lowercase s, with no ribbon, no swirl, no gradient, no glow and no photographic detail. Directly under the badge, still inside the front panel, a small black pill label holds white monospace text reading "PSD". Do not draw window chrome, menus, sliders, brush icons, photographs, cursors or any other interface elements inside the panels. The only text in the whole image is the heading, the two letters "Ps" and the label "PSD". Flat colour fills only: no gradients, no glow, no 3D shading, no photographic texture, no people. Keep the whole stack inside the central 90 percent of the frame, with the badge fully visible and its letters sharp.
```

Alt: `A stack of four pastel sheets fanned slightly, the front one holding a navy PSD file badge`

### Что изменилось в C

→ Вместо безымянного чёрного квадрата в центре листа теперь стоит знак файла PSD: тёмно-синий (#001E36) квадрат с чёрной обводкой и жёсткой тенью в общем стиле, внутри буквы «Ps» светло-голубым (#31A8FF).

→ Под знаком добавлена маленькая плашка «PSD» моноширинным шрифтом. Это страховка: если модель переврёт буквы, подпись снизу всё равно объяснит, что за файл.

→ В промпт добавлен прямой запрет на ленту, спираль, градиент и свечение внутри знака. Без этого Nano Banana Pro тянет узнаваемую графику Adobe и добавляет детали, которые в плоском стиле выглядят как грязь.

### Две оговорки по этому знаку

→ **Буквы модели путают.** Две буквы в одном слове — типичный сбой: «Ps» превращается в «Pg», «Rs» или в одну букву. Если ошибка повторится дважды, проще сгенерировать знак пустым и вписать буквы в Figma за минуту.

→ **Точный знак собирается кодом.** Тёмно-синий квадрат, скругление и две буквы — это пять строк SVG. Скриптом на sharp знак встанет идеально ровно, без риска, что модель исказит пропорции или написание. Если нужен именно точный знак, а не стилизация, лучше этот путь.

→ **Это чужая торговая марка.** Для иллюстрации в посте про формат файлов это обычная практика, но если картинка пойдёт в рекламу или в материал от имени бренда, безопаснее заменить «Ps» на нейтральную плашку с надписью PSD.

---

## Сборка вариантов A и B

Скриншоты уже лежат в репозитории, по одному на утилиту:

→ `public/freebies/freebie-m3e-canvas.webp` — для B, туда идёт самый крупный экран

→ `public/freebies/freebie-pdfcn.webp`, `freebie-spectrum-ui.webp`, `freebie-sfinterface-numbers.webp`, `freebie-fsearch.webp`, `freebie-gr8r-task-management.webp`, `freebie-compositor.webp`, `freebie-liquid-glass.webp`, `freebie-driver-js.webp`, `freebie-rea.webp` — для сетки A

Скрипт на sharp: берёт подложку, находит пустые прямоугольники по заданным координатам, вписывает каждую картинку через `fit: cover`, обрезает по скруглению маской и пишет текст названий, если понадобится. Подложка и результат сохраняются в `public/blog/social/`.

Если после генерации модель всё-таки нарисует интерфейс внутри плейсхолдеров, подложка всё равно годится: белые прямоугольники закроют лишнее, скриншот встанет сверху.

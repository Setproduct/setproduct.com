# LinkedIn-анонс: open-source-tools-digest-2026-10

Пост: https://www.setproduct.com/blog/open-source-tools-digest-2026-10

## Механика, на которую рассчитан текст

| Приём | Как применён |
|---|---|
| Хук до «…see more» | Первые ~100 символов — два числа и обещание. Мобильная лента обрезает примерно на 140 символах, десктоп на 210 |
| Внешняя ссылка не в теле | Ссылка уходит в первый комментарий: посты со ссылкой в теле LinkedIn показывает заметно меньшему числу людей |
| Время чтения (dwell time) | Нумерованный список 10→1 читается до конца, потому что победитель стоит последним |
| Повод сохранить пост | Три проверки перед установкой зависимости. Сохранения весят для алгоритма больше лайков |
| Повод прокомментировать | Финальный вопрос с двумя вариантами ответа, на который у каждого разработчика есть мнение |
| Хештеги | 3 штуки, больше уже не помогает |
| Картинка | Формат 4:5 (1080×1350) — занимает в мобильной ленте больше места, чем 1:1 или 16:9 |

Сознательные отступления от «вирусных» шаблонов: без эмодзи и восклицательных знаков (правило скилла copywriter), ноль em-dash, все цифры взяты из статьи. Трюк «приманка ради комментариев» (напиши «tools» и я пришлю) не используется: LinkedIn с 2024 года режет охват за engagement bait.

## Текст поста

```
126 GitHub stars.
13,113 npm installs a month.

That gap is the most useful thing I learned this autumn.

Every couple of months we add open source tools to the Resources section on Setproduct. This time it was 10. Before writing them up, I checked each one against GitHub and npm.

Stars told one story. Installs told another.

Here is the list, from quiet to loud:

10. pdfcn: PDF documents as React components. 2,952 stars in 69 days, zero release tags.

9. spectrum-ui: animated components you copy into your repo. The npm number you see belongs to its MCP server, so ignore it.

8. sfinterface-numbers: rolling digits for live counters. The 126-star library from the first line.

7. fsearch: whole-disk file search for macOS. 7.6 million files indexed, 5.5 ms median query.

6. gr8r: a task workspace in plain JavaScript. 198 forks and no license file.

5. Compositor: a free Photoshop alternative that opens PSD files. 17,521 stars in 33 days.

4. liquid-glass: Apple's glass material in React. Version 0.0.2, one maintainer.

3. Driver.js: product tours in 5 kB. 9.1 million downloads a month.

2. REA: lets an AI agent take apart a binary on your own machine. 266 contributors.

1. m3e-canvas: build a Material 3 screen in the browser, export it as a prompt for your AI coding tool.

The tool people opened most is #1.
The tool people install most is #3.
Those are two different tools.

My checklist before adding any dependency now:

→ Is there a license file?

→ Is there a release tag?

→ Does the npm package belong to the project I think it does?

3 of these 10 tools had no release tag at all.

So which do you trust more when you pick a library: stars or downloads?

Full write-up with the one caveat for each tool is in the first comment.

#opensource #webdevelopment #uxdesign
```

Объём: около 1 500 символов (коридор лучших постов LinkedIn 1 200–1 900).

## Первый комментарий (публиковать сразу после поста)

```
The full list, with GitHub links and the one thing that might go wrong with each tool:
https://www.setproduct.com/blog/open-source-tools-digest-2026-10
```

## Публикация

→ Вторник–четверг, 8:00–10:00 по времени основной аудитории (для США это 15:00–17:00 МСК).

→ Первые 60 минут отвечать на каждый комментарий развёрнуто: ответы автора продлевают показ поста.

→ Не редактировать пост в первый час.

→ Мейнтейнеров отмечать только в ответах на комментарии, и только тех, кто сам активен в LinkedIn. Отметка молчащих людей снижает охват.

---

## Картинки: формат 4:5, Nano Banana Pro

Настройки генерации: **aspect ratio 4:5, разрешение 2K**. После генерации ужать до 1080×1350, WebP или JPEG q90.

Все три промпта продолжают стиль обложки поста: небрутализм, светлая пастель, строгая фронтальная проекция, толстая чёрная обводка, жёсткие тени без размытия. Каждый вариант опирается на разную часть текста.

| Вариант | Опирается на | Сильная сторона |
|---|---|---|
| A. Разрыв | Хук «126 stars / 13,113 installs» | Картинка повторяет первую строку поста: глаз и текст говорят одно и то же |
| B. Лестница 10→1 | Нумерованный список | Обещает список, который хочется дочитать |
| C. Чек-лист | Три проверки перед установкой | Самый «сохраняемый» вариант |

Рекомендация: **A**. Число, которое человек видит на картинке, он тут же находит в первой строке текста, и это заставляет развернуть пост.

### Вариант A. Разрыв (лиловая палитра)

```
A flat neubrutalist editorial illustration in a vertical 4:5 format, viewed perfectly head-on with no tilt, no perspective and no rotation. The background is a soft lilac (#EDE7FF) with a faint grid of thin, slightly lighter lines. Across the top quarter of the frame, one line of heavy black sans-serif text reads "Stars vs installs", left-aligned, with generous margin above it. Below the heading, two rectangular cards stand side by side on a shared baseline near the bottom of the frame. The left card is short and compact, filled pale butter yellow (#FFF3C4), with a bold black outline about 8 pixels thick and a hard black offset shadow shifted down and to the right with zero blur. Inside it sits a simple solid black five-point star icon and the number "126" in heavy black grotesque type. The right card has the same width but towers over its neighbour, filling most of the remaining height. It is filled fresh mint (#D7F5E3) with the same thick black outline and the same hard shadow. Inside it are a simple solid black downward arrow icon, the number "13,113" set very large in heavy black type, and the small label "per month" underneath. All text is crisp, spelled exactly as written, and nothing else appears as text. Flat colour fills only: no gradients, no glow, no glass, no 3D shading, no photographic texture, no people, no logos. Keep every element inside the central 90 percent of the frame. The mood is confident and poster-like, with strong contrast between black lines and soft pastel fills.
```

Alt для LinkedIn: `Two pastel cards, a short one with a star and 126, a tall one with a download arrow and 13,113 per month`

### Вариант A2. Разрыв, исправленный (после первой генерации)

Что исправлено по сравнению с A:

→ Стрелку вниз читали как «падение». Её заменила закрытая коробка (так в npm обозначают пакет), а стрелки и линии тренда в промпте прямо запрещены.

→ Над заголовком добавлено название библиотеки: в чёрной плашке, моноширинным шрифтом, как имя пакета в терминале.

→ Под цифрами появились подписи «GitHub stars» и «npm installs a month», поэтому картинка понятна и без текста поста.

```
A flat neubrutalist editorial illustration in a vertical 4:5 format, viewed perfectly head-on with no tilt, no perspective and no rotation. The background is soft lilac (#EDE7FF) with a faint grid of slightly lighter lines. At the top left sits a small black rounded pill label with white monospace text reading "sfinterface-numbers". Directly under it, one line of heavy black sans-serif text reads "Stars vs installs". Below the heading, two cards of equal width stand side by side on a shared baseline near the bottom of the frame, like two bars of a simple chart. Both cards have a bold black outline about 8 pixels thick and a hard black offset shadow shifted down and to the right with zero blur. The left card is short and filled pale butter yellow (#FFF3C4). Inside it are a solid black five-point star icon, the number "126" in heavy black grotesque type, and the small label "GitHub stars". The right card towers over its neighbour, filling most of the remaining height, and is filled fresh mint (#D7F5E3). Near its top sits a closed package box icon, drawn as a flat front-facing black square with a horizontal tape strip. Lower in the card, the number "13,113" is set very large in heavy black type, with the small label "npm installs a month" beneath it. There are no arrows anywhere in the image, no trend lines and no downward symbols. All text is crisp and spelled exactly as written, and no other text appears. Flat colour fills only: no gradients, no glow, no 3D shading, no people, no logos. Keep every element inside the central 90 percent of the frame.
```

Alt для LinkedIn: `sfinterface-numbers: a short card with 126 GitHub stars next to a tall card with 13,113 npm installs a month`

### Вариант B. Лестница 10→1 (п��рсиковая палитра)

```
A flat neubrutalist editorial illustration in a vertical 4:5 format, viewed strictly head-on with no tilt, no perspective and no rotation. The background is warm cream (#FBF6EC). At the top, one line of heavy black sans-serif text reads "10 open source tools", left-aligned. Beneath it, ten horizontal cards are stacked vertically with equal small gaps between them, forming a clean column that fills the middle of the frame. Each card has a bold black outline about 6 pixels thick and a hard black offset shadow shifted down and to the right with zero blur. The cards are numbered from top to bottom: "10" on the top card down to "1" on the bottom card, each number set in heavy black type at the left edge of its card. To the right of each number sits one simple solid black icon, all different: a document, a sparkle, a counter with digits, a magnifying glass, a checkbox, a paint brush, a rounded glass pane, a pointing arrow, a circuit chip, a phone screen. The cards grow slightly wider as the numbers get smaller, so the column widens toward the bottom. Cards 10 to 2 alternate between soft peach (#FFE1CC) and pale sage (#DDEEDC). Card 1 is the widest, filled bright coral (#FF9E80), and its shadow is twice as deep as the others. Three of the cards carry a small dashed outline tag with no fill on their right edge. The only text is the heading and the ten numbers. Flat fills only: no gradients, no glow, no 3D, no people, no logos. Keep all elements inside the central 90 percent of the frame.
```

Alt для LinkedIn: `Ten numbered pastel cards stacked from 10 to 1, the coral card number 1 widest at the bottom`

### Вариант C. Чек-лист (небесная палитра)

```
A flat neubrutalist editorial illustration in a vertical 4:5 format, viewed perfectly head-on with no tilt, no perspective and no rotation. The background is pale sky blue (#E8F2FB) with a subtle dotted grid. In the centre of the frame sits one large rectangular card, filled off-white (#FFFDF7), with a bold black outline about 8 pixels thick and a hard black offset shadow shifted down and to the right with zero blur. Across the top of the card, heavy black sans-serif text reads "Check before you install". Below the heading are three rows separated by thin black horizontal rules. Each row starts with a square checkbox drawn with a thick black outline. Row one reads "License file" and its checkbox is filled butter yellow (#FFF3C4) with a bold black check mark. Row two reads "Release tag" and its checkbox is drawn as a dashed black outline with no fill and no check mark, clearly empty. Row three reads "Right npm package" and its checkbox is filled soft pink (#FFD6E0) with a bold black check mark. All row labels are set in heavy black grotesque type, left-aligned, spelled exactly as written. In the lower right corner of the background, partly overlapping the card edge, sits a small solid black pencil icon with a pink eraser, drawn flat. No other text appears. Flat colour fills only: no gradients, no glow, no glass, no 3D shading, no photographic texture, no people, no logos. Keep every element inside the central 90 percent of the frame, with generous breathing room around the card.
```

Alt для LinkedIn: `A checklist card with three rows, license file and right npm package checked, release tag left empty and dashed`

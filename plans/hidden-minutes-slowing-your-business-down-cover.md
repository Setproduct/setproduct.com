# Промпты под обложку статьи «Hidden minutes slowing your business down»

## Что уже есть

В frontmatter [`content/blog/hidden-minutes-slowing-your-business-down.mdx`](content/blog/hidden-minutes-slowing-your-business-down.mdx:1) прописаны:

- `coverImage: /blog/covers/hidden-minutes-slowing-your-business-down-v2.webp`
- `coverImageAlt: "Colleagues in a meeting as tiny clock and hourglass fragments leak from their devices"`
- `thumbImage: /blog/covers/thumbs/hidden-minutes-slowing-your-business-down-v2.webp`

Текущая обложка извлечена из base64-картинки черновика: стоковый кадр Pexels, PNG 500×333, качество низкое. Файл нужно перегенерировать и положить поверх.

## Что на текущей картинке

Композиция: одна женщина в белом жакете стоит справа и держит бумаги с ручкой, двое коллег сидят напротив через тёмный стол и слушают. На столе ноутбук, планшет, документы и телефон. На фоне чёрная стеклянная перегородка, светлая комната. Сцена читается как рядовая встреча-синк.

## Что должно измениться по смыслу статьи

Тезис поста: работу замедляют не большие проекты, а накопление мелких задержек, которые поодиночке незаметны. Композицию сцены сохраняем (один стоящий докладчик, двое сидящих слушателей, тёмный стол с устройствами), но добавляем слой, который делает невидимую проблему видимой: во время встречи из устройств и бумаг утекают минуты.

## Технические требования к обложке

Герой статьи рендерится в [`BlogHero`](components/blog/BlogHero.tsx:65) через `next/image` с `fill` и классом `image-cover` (`object-fit: cover`). Контейнер — [`public/css/setproduct.webflow.shared.css:3720`](public/css/setproduct.webflow.shared.css:3720): ширина 100%, высота 750 px на десктопе, 200 px на мобильных, скругление 24 px.

Правила композиции:

- Генерировать в 16:9 (1536×864 или 1920×1080).
- Весь смысловой контраст держать в центральных 70% кадра — края обрежутся.
- Та же картинка идёт в карточку листинга 385 px, поэтому главное должно читаться на превью размером с ноготь.
- Палитра: тёплый кремовый, бледно-сиреневый, приглушённый серый, почти чёрная мебель, один фиолетовый акцент `#7C4DFF`.

## Промпт (основной вариант)

Create an editorial photograph for a business article cover, shot like a candid reportage moment inside a bright modern office. Keep the composition of the reference scene: one person stands on the right side of the frame presenting a stack of printed papers and a pen, while two colleagues sit across a dark table in the foreground, listening. The table holds an open laptop, a tablet, loose documents, and a phone. Behind them, a large black-framed glass partition divides the room. Everyone wears simple neutral business clothing. The mood stays calm and ordinary, nothing dramatic, because the problem this image shows is invisible.

Overlay the scene with one restrained surreal element that reveals hidden time loss. From every device and each stack of paper, a thin trail of tiny glowing time fragments drifts upward and to the left, leaving the frame: small clock glyphs, hourglass shapes, minute marks, and sand-like particles. They look as if they are leaking unnoticed during the meeting. On the table, show duplicated documents and one repeated form, hinting at the same information entered twice. A single thin purple line (#7C4DFF) tries to connect the laptop, the tablet, and the papers, but the line breaks in the middle with a small gap, showing systems that never talk to each other.

Keep the standing presenter and the two seated listeners inside the central seventy percent of the frame, since the cover is cropped to a wide banner, and make the leaking time fragments readable at small thumbnail size. Lighting: soft natural daylight from the left. Palette: warm cream, pale lilac, muted gray, near-black furniture, one purple accent #7C4DFF. Photorealistic, shallow depth of field, 16:9. No readable text, no logos, no visible brand names.

## Рекомендуемые параметры

- Aspect ratio: 16:9
- Alt text: `Colleagues in a meeting as tiny time fragments leak from their devices`
- Filename: `hidden-minutes-slowing-your-business-down-v2.webp` (суффикс `-v2` нужен, чтобы сменить URL и обойти кэш браузера/CDN, который держал старую картинку под прежним именем)

## Что обновить после генерации

1. Положить новый файл в [`public/blog/covers/hidden-minutes-slowing-your-business-down-v2.webp`](public/blog/covers/hidden-minutes-slowing-your-business-down-v2.webp).
2. Прогнать `npm run thumbs:blog` для превью в листинге.
3. Обновить `coverImageAlt` во frontmatter на текст выше.

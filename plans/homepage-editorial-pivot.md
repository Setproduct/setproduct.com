# Homepage editorial pivot — locked decisions

Статус: шаги 0–6 закрыты. Шаг 7 (реализация) не начат. Файлы кода не изменялись.
Режим реализации: Code (переключение после подтверждения этого плана).

## Контекст

Setproduct переходит от продажи Figma-китов к роли широкого издания для людей,
которые строят технологические компании: фаундеры, инди-хакеры, маркетологи,
дизайнеры, инженеры. Основная монетизация — платные гостевые размещения
(publish.setproduct.com). CTA на размещение остаётся заметным, но не доминирует.

Дизайн — одна из вертикалей, а не идентичность сайта. Из hero дизайн-фрейминг
уходит. UI kits не удаляются: остаются в навигации, футере и секции `TemplateGrid`.

Доступные факты для копирайта: 11 000 читателей в месяц, DR 42, индексация в
Google News, цитирование в Google AI Overviews, возраст домена 9 лет (с 2017),
2 700+ ссылающихся доменов.

## Что отменено в ходе обсуждения

- UTM-метки на кнопке `Publish` в хедере — не добавляем.
- Футер целиком вне скоупа: колонка `For businesses` не создаётся,
  `Write for Us` в колонке `Information` не переименовывается.
- Кнопка `Write for Us` в хедере не переименовывается, остаётся как есть.
- Порядок секций на главной не меняется.
- Чип `Recent Publications` и кнопка `Read All` в блог-секции не меняются.
- Подзаголовок под новым H2 ресурсной секции не добавляется.

## Итоговый скоуп: три файла

| Файл | Что меняется |
|---|---|
| `data/pages-meta.ts` | `PAGE_META.index.title`, `PAGE_META.index.description` |
| `components/pages/HomePage.tsx` | H1, sub-H1, обе CTA, OG/Twitter-теги в `<Head>`, H2 секции `TemplateGrid` |
| `components/sections/BlogPostsHome.tsx` | H2 секции на строке 24 + удаление ведущего пробела |

Файлы `components/layout/SiteHeader.tsx` и `components/layout/SiteFooter.tsx`
не редактируются.

## Шаг 1 — meta title (57 символов)

```
Setproduct — a tech publication for founders and builders
```

Ключ: `data/pages-meta.ts` → `PAGE_META.index.title`.

## Шаг 2 — meta description (145 символов)

```
Setproduct covers startups, AI, growth, product and design. Nine years of archives, 11,000 monthly readers, and citations in Google AI Overviews.
```

Ключ: `data/pages-meta.ts` → `PAGE_META.index.description`.

## Шаг 3 — H1 + sub-H1

Разметка сохраняется: `.main_hero-section` → `.heading-center-wr` →
`h1.heading-style-h1` → `.max-width-800` → `.heading-style-h5`.
Градиентный span ставится на «building and growing tech companies».

H1:

```
Notes from the people building and growing tech companies
```

Sub-H1, две строки через `<br />`, внутри `.heading-style-h5`:

```
Practical writing on startups, AI, growth, careers and design.
An independent magazine, trusted by 11,000 readers a month.
```

## Шаг 4 — CTA в hero

| Кнопка | Лейбл | Href | Разметка |
|---|---|---|---|
| Primary | `Read the latest` | `/blog` | `Link` + `button w-inline-block` |
| Secondary | `Publish with Us` | `https://publish.setproduct.com` | внешняя ссылка, `button secondary w-inline-block` + `ArrowIcon` |

Внешняя ссылка: `target="_blank" rel="noreferrer"`. UTM не добавляем.
Класс `.hero-cta-row` и `ArrowIcon` сохраняются.

## Шаг 5 — H2 блог-секции

`components/sections/BlogPostsHome.tsx`, строка 24.

Было:

```
 or design better with these practical insights
```

(обратите внимание на ведущий пробел — он удаляется в любом случае)

Стало:

```
What we published this week
```

## Шаг 6 — H2 ресурсной секции

`components/pages/HomePage.tsx`, строка 78. Секция и `TemplateGrid` остаются
на месте, порядок секций не меняется.

Было:

```
Browse our collection of Figma templates & UI kits
```

Стало:

```
Resources for your team
```

Подзаголовок не добавляется. `PRODUCTS`, карточки, ссылки и `variant="home"`
не трогаем.

## Дополнение A — OG и Twitter-теги на главной

Сейчас главная выводит только `title`, `description` и `canonical`.
Добавить в `<Head>` в `HomePage.tsx` по образцу `BlogPostLayout.tsx`:

- `og:title` — из `meta.title`
- `og:description` — из `meta.description`
- `og:type` — `website`
- `og:url` — из `meta.canonical`
- `og:image` — абсолютный URL: `https://www.setproduct.com` + `meta.ogImage`
- `twitter:card` — `summary_large_image`
- `twitter:title`, `twitter:description` — из meta
- `twitter:image` — тот же абсолютный URL

Файл `ogImage` (`/images/setproduct2.webp`) пока остаётся прежним.
Логика canonical не меняется.

## Что не трогаем

- Роуты, редиректы и `next.config.js`, `vercel.json`.
- `PAGE_FAQ.index` и `FaqSection` — FAQ остаётся ориентированным на покупку UI kits.
- Категории блога, `HOME_BLOG_CATEGORIES`.
- Любые файлы в `data/template-content/`, `content/blog/`, `public/`.
- Компоненты хедера и футера.

## Шаг 7 — коммиты

Один коммит на файл, conventional commits, sentence case:

- `feat: update homepage meta title and description for editorial pivot`
- `feat: replace homepage hero copy and ctas`
- `feat: rename homepage blog heading and resources section heading`

Перед началом — проверить `git status`. Push не выполнять.

## Шаг 8 — QA-чеклист

- Title 57 ≤ 60, description 145 ≤ 155. Значения проверены через
  `node -e "s.length"`, а не на глаз.
- H1 присутствует один раз, градиентный span внутри.
- Sub-H1 рендерится двумя строками.
- Primary CTA ведёт на `/blog`; secondary открывает publish.setproduct.com в новой
  вкладке, без UTM.
- `Launch App` и `Browse UI kits` отсутствуют в hero. `/all` остаётся достижим
  через дропдаун `Design Kits`, футер и секцию `TemplateGrid`.
- H2 блог-секции без ведущего пробела.
- H2 ресурсной секции обновлён, секция сохранена.
- og:/twitter: теги присутствуют в исходнике главной.
- `npm run lint` (`tsc --noEmit`) проходит, затем `npm run build`.

Известные проблемы, вне скоупа:

- `alt` изображений в `BlogPostsHome` равен пути `/blog/{slug}`. Рекомендация на
  будущее: `alt={post.title}`.
- `PAGE_FAQ.index` описывает покупку UI kits и не соответствует новой позиции.
- `TermsOfPaidPostsPage` упоминает Gumroad и «Setproduct Design Blog».
- Новая позиция издания расходится с H2 `Browse our collection of Figma templates
  & UI kits` в навигационном дропдауне и с описаниями колонок футера — эти файлы
  вне скоупа.

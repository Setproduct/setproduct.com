# Раздел Resources: этап 1 выполнен, этап 2 (смена URL) отложен

## Принятые решения

| Вопрос | Решение |
|---|---|
| Название раздела | **Resources** |
| Адрес раздела | Остаётся `/freebies`. Меняем через несколько месяцев отдельным этапом |
| Категория блога «Resources» | Переименована в **Tools** |
| H1 листинга | «Free resources» |
| Title листинга | «Free UI resources, open source code and Figma files» (51 символ, без двоеточия) |
| Старые ссылки `?category=Resources` | Работают через карту `LEGACY_BLOG_CATEGORIES` |

---

## Этап 1. Выполнено (без смены URL, без SEO-риска)

Адрес, canonical, sitemap и все внутренние ссылки остались на `/freebies`. Изменились только видимые пользователю названия. Google не видит причины переиндексировать страницы, поэтому позиции и трафик не затрагиваются.

### Что изменено

**Название раздела в интерфейсе**
- Меню: `Freebies` → `Resources`, aria-label обновлён
- Футер, колонка Design Kits: `Freebies` → `Resources`
- Хлебные крошки: `Freebies` → `Resources`
- Табы каталога в [`data/categories.ts`](data/categories.ts:11)
- Таб и подписи на `/search`: «Freebies» → «Resources», тексты «free resources»
- Бейдж результата в поиске: `FREEBIE` → `RESOURCE`

**Тексты страниц**
- H1 листинга: «Free Figma templates» → «Free resources»
- Подзаголовок: «Open source code and design files, picked and tested by Setproduct»
- Title листинга: без двоеточия, «Figma» сохранена для поиска
- Description листинга: про open source React, code libraries и design files
- H2 витрины: «More Figma freebies» → «More free resources»
- Кнопка витрины: «See All» → «See all» (sentence case)
- Title детальных: `{title} — code freebie` → `{title} — free open source code`, `Figma freebie` → `free Figma file`, `tutorial` → `free UI tutorial`
- Анкоры внутренних ссылок: «free Figma resources» → «free Figma files», «free code resources» → «open source code»
- Текст подписки в [`CtaSubscribe`](components/sections/CtaSubscribe.tsx:16)
- FAQ: «free freebies» → «free resources»
- [`public/llms.txt`](public/llms.txt:95): строка раздела переписана

**Категория блога**
- `Resources` → `Tools` в [`data/blog-categories.ts`](data/blog-categories.ts:1), включая список для главной
- Меню и футер: категория блога теперь `Tools`
- Совместимость: [`LEGACY_BLOG_CATEGORIES`](data/blog-categories.ts:29) переводит `?category=Resources` в `Tools`, чтобы старые ссылки продолжали фильтровать

**Поиск**
- Синонимы: к группе `free/freebie/freebies` добавлены `resource`, `resources`, `open source`

**Документация**
- [`AGENTS.md`](AGENTS.md:1017): карта роутинга описывает `/freebies` как раздел Resources

### Откат

Правки текстовые и разнесены по 18 файлам, `git revert` коммита возвращает всё в исходное состояние.

---

## Этап 2. Смена URL `/freebies` → `/resources` (через несколько месяцев)

Запускать, когда появится причина переезжать (например, раздел окончательно перестроен под open source). Порядок сохранён из исходного плана и учитывает риски.

### Что на кону (данные GSC)

| URL | Клики | Показы | Позиция |
|---|---|---|---|
| `/freebies/m3e-canvas` (www + non-www) | 1354 + 429 | 9600 + 3563 | 3–4 |
| `/freebies` | 58 | 7332 | 16.6 |
| `/freebies/free-ios-ui-kit`, `/ios-datepickers`, `/hyper-charts`, `/runeicons` | 7–29 каждый | до 1200 | 5–25 |

Самый ценный URL раздела — `m3e-canvas`. Каждый редирект должен быть одним прыжком 308 сразу на точный новый адрес.

### Инвентарь правок

**Роуты**
- [`pages/freebies.tsx`](pages/freebies.tsx) → `pages/resources.tsx`
- [`pages/freebies/[slug].tsx`](pages/freebies/[slug].tsx) → `pages/resources/[slug].tsx`

**Данные**
- [`data/freebies-listing.ts`](data/freebies-listing.ts): `previewHref` → `/resources/<slug>`. Поля `thumb`/`image` **не трогаем**, картинки остаются в `public/freebies/`
- [`data/pages-meta.ts`](data/pages-meta.ts:82): canonical → `/resources`
- [`data/webflow-redirects.csv`](data/webflow-redirects.csv:104): ~35 строк с назначением `/freebies/...` → `/resources/...`, иначе получится два прыжка

**Ссылки и SEO-файлы**
- [`pages/sitemap.xml.ts`](pages/sitemap.xml.ts:20), [`public/llms.txt`](public/llms.txt:95)
- [`SiteHeader`](components/layout/SiteHeader.tsx:838), [`SiteFooter`](components/layout/SiteFooter.tsx:42), [`FreebiesShowcase`](components/sections/FreebiesShowcase.tsx:81), [`FreebieArticle`](components/sections/FreebieArticle.tsx:543) (12 ссылок), [`SearchPage`](components/pages/SearchPage.tsx:60), [`lib/search/types.ts`](lib/search/types.ts:34), [`FreebieDetailPage`](components/pages/FreebieDetailPage.tsx:35) (canonical и крошка)
- Блог: 10 MDX с `/freebies` — `figma-resources-review-1`, `empty-state-ui-design`, `liquid-glass-vs-glassmorphism`, `search-ui-design`, `how-to-sell-design-system`, `carousel-ui-design`, `liquid-glass-design-explained-a-practical-guide`, `how-to-design-a-ui-kit-foundation`, `dropdown-ui-design`, `visual-elements-in-email-marketing`

**Не трогать**: CSS-классы `freebies_*`, `is-freebies-filters`, папку `public/freebies/`.

### Редиректы в [`next.config.js`](next.config.js:25)

Шаблон `/freebies/:slug` использовать **нельзя**: он перехватит `/freebies/*.webp`, потому что редиректы срабатывают раньше статики из `public/`. Сломаются og:image, Google Images и превью.

Правильный вариант:
```js
{ source: "/freebies", destination: "/resources", permanent: true },
// по одному правилу на каждый slug из FREEBIE_PRODUCTS
{ source: "/freebies/m3e-canvas", destination: "/resources/m3e-canvas", permanent: true },
// ...
```

Список slug'ов вынести в `data/resource-slugs.json`, чтобы его читали и `next.config.js`, и `freebies-listing.ts`, а в `lint` добавить проверку синхронизации.

### Пост-деплой

- Отправить обновлённый sitemap
- URL Inspection для `/resources`, `/resources/m3e-canvas` и топ-10 детальных
- Инструмент «Смена адреса» не нужен, домен тот же
- Редиректы держать бессрочно
- Мониторинг на 2, 4 и 8 неделе: клики по `/resources/*` и `/freebies/*` вместе, отдельно позиция `m3e-canvas`
- Обновить ссылки в собственных Figma Community-файлах и на GitHub

---

## Риски

| # | Риск | Как снижаем |
|---|---|---|
| 1 | Просадка `m3e-canvas` на 1–4 недели | Один прыжок 308, запрос индексации в день деплоя |
| 2 | Одновременная смена URL и title не даёт понять причину просадки | Title уже изменён в этапе 1. В этапе 2 меняются только адреса |
| 3 | Потеря запросов со словом «Figma» | «Figma» сохранена в title листинга и в суффиксах Figma-файлов |
| 4 | Шаблонный редирект ломает картинки | Только явные правила, папка картинок не переносится |
| 5 | Цепочки редиректов с Webflow URL | Назначения в CSV переписать сразу |
| 6 | Разрыв истории в GA4 и GSC | В отчётах смотреть `/freebies/*` и `/resources/*` вместе |
| 7 | Откат после миграции | Решение принимается один раз, откат не планируется |

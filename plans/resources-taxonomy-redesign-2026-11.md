# Раздел Resources: Figma в одну категорию, код на пять категорий

Дата: 11 ноября 2026
Формат: **один уровень категорий**
Статус: предложение на утверждение, код не тронут

## 1. Итог

| # | Название | Карточек | Что внутри |
|---|---|---|---|
| 1 | `All topics` | 62 | всё |
| 2 | `Figma templates` | 43 | макеты и файлы для дублирования |
| 3 | `UI components` | 7 | компоненты и библиотеки для интерфейса |
| 4 | `Icons and animations` | 4 | иконки, анимации, микроинтеракции |
| 5 | `Design and AI tools` | 4 | редакторы, вьюеры, генераторы |
| 6 | `Desktop utilities` | 2 | утилиты для системы |
| 7 | `Self-hosted apps` | 2 | приложения, которые ставишь себе |

43 + 7 + 4 + 4 + 2 + 2 = 62. Каждая карточка ровно в одной категории.

Шесть рабочих категорий вместо шестнадцати.

## 2. Почему Figma идёт одной категорией

Вы правы: макеты — это однородная масса. Человек приходит за файлом, который можно
дублировать в Figma, и ему не важно, называется внутри набор «UI kit» или «components».
Дробить 43 файла по назначению значит создавать фильтры, между которыми он всё равно
не различает разницу.

**Что теряем и почему это нормально.** Внутри `Figma templates` смешаны киты, компоненты,
дашборды и лендинги. Для поиска это не потеря: описание и заголовок карточки уже содержат
слова `dashboard`, `components`, `landing`. Фильтр по категории нужен, чтобы отсечь
код от макетов, а не чтобы заменить поиск.

**Что Figma-категория даёт взамен.** Один клик вместо пяти, и `m3e-canvas` перестаёт
теряться среди чартов.

## 3. Почему код разложен именно так

Девятнадцать карточек — это не однородная масса. Их объединяет только источник,
а способ применения разный. Пять категорий ниже отвечают на вопрос «что мне нужно
сделать», а не «на чём это написано».

### 3.1 `UI components`, 7 карточек

Критерий: ставится в проект как зависимость и даёт готовые элементы интерфейса.

| Slug | Что это | Почему здесь |
|---|---|---|
| [`ramka`](data/freebies-listing.ts:24) | лайтбокс для React | 15 примитивов, собираешь как конструктор |
| [`looseleaf`](data/freebies-listing.ts:66) | 123 компонента shadcn/ui | ставится через реестр, ложится в свой репозиторий |
| [`spectrum-ui`](data/freebies-listing.ts:161) | анимированные React-компоненты | одна CLI-команда, файлы в проекте |
| [`liquid-glass`](data/freebies-listing.ts:217) | стеклянные поверхности | контролы на Base UI, ставится пакетом |
| [`sfinterface-numbers`](data/freebies-listing.ts:274) | анимация цифр | один компонент, 13 КБ |
| [`pdfcn`](data/freebies-listing.ts:370) | PDF-вьюер | компонент вместо iframe |
| [`driver-js`](data/freebies-listing.ts:350) | туры по продукту | 5 КБ, ванильный, но это элемент интерфейса |

`driver-js` здесь, а не в инструментах разработчика, потому что по сути это
компонент онбординга: подсветка, поповер, шаги. То, что он не React, на решение
не влияет: в проекте уже лежат vanilla-сниппеты.

### 3.2 `Icons and animations`, 4 карточки

Критерий: визуальные ресурсы, которые подключаешь набором, а не собираешь логику.

| Slug | Что это | Почему здесь |
|---|---|---|
| [`matita-icons`](data/freebies-listing.ts:104) | 200 иконок карандашом | SVG и React, набор целиком |
| [`runeicons`](data/freebies-listing.ts:293) | набор SVG-иконок | то же, MIT |
| [`react-useanimations`](data/freebies-listing.ts:85) | 300 анимированных иконок | иконки с готовыми состояниями |
| [`amicro`](data/freebies-listing.ts:312) | микроанимации | сниппеты движения, не логика |

Все четыре — про движение и глифы. Объединение честное: человек, ищущий иконку,
и человек, ищущий hover-эффект, ищут в одном месте.

### 3.3 `Design and AI tools`, 4 карточки

Критерий: запускаемое приложение для работы с дизайном или с ИИ, а не библиотека.

| Slug | Что это | Почему здесь |
|---|---|---|
| [`desigma`](data/freebies-listing.ts:45) | редактор дизайна на Rust | приложение, открывает Figma-файлы |
| [`compositor`](data/freebies-listing.ts:179) | редактор изображений | приложение вместо Photoshop |
| [`m3e-canvas`](data/freebies-listing.ts:331) | сборщик Material 3 | приложение, отдаёт промпт для ИИ |
| [`rea`](data/freebies-listing.ts:236) | MCP-сервер для агентов | инструмент анализа приложений через ИИ |

Два редактора и два инструмента вокруг ИИ. Общая мысль: это то, что открывают
и работают внутри, а не то, что подключают строкой в package.json.

### 3.4 `Desktop utilities`, 2 карточки

| Slug | Что это | Почему здесь |
|---|---|---|
| [`fsearch`](data/freebies-listing.ts:255) | поиск файлов на Mac | системная утилита, фоновый демон |
| [`cleanyourtv`](data/freebies-listing.ts:123) | очистка Android TV | скрипт настройки устройства |

Обе решают бытовую задачу на своём железе. Две карточки — мало, но это
единственная пара, которая честно объединяется.

### 3.5 `Self-hosted apps`, 2 карточки

| Slug | Что это | Почему здесь |
|---|---|---|
| [`mailcheap`](data/freebies-listing.ts:198) | рассылка на Amazon SES | ставишь себе, платишь за отправку |
| [`gr8r-task-management`](data/freebies-listing.ts:142) | воркспейс для проектов | приложение, которое разворачиваешь |

Обе — альтернатива платному SaaS, который ты поднимаешь у себя. Именно это
и есть критерий категории.

## 4. Полный список в `Figma templates`, 43 карточки

Проверочный перечень, чтобы при реализации ничего не потерять. Все они уже ведут
на `figma.com`.

`invoice`, `avatar-ui`, `appbar-ui`, `fonts-playground`, `website-template`,
`android-ui-kit`, `figma-ios-ui-kit`, `material-x-starter`, `radar-chart`,
`rome-ui-kit-lite`, `xela-ui-kit-starter`, `free-ios-ui-kit`, `mobile-x-ui-kit`,
`accordion-guide`, `eclipse-ui-kit`, `appka-ios-ui-kit`, `nav-templates`,
`dark-charts-ui-kit`, `figma-email-templates`, `charts-widgets-dark-light`,
`shopping-layout-for-web-app`, `orion-dark-templates`, `responsive-imagery-cards`,
`landing-page-web-blocks`, `mobile-tables-several-themes`, `12-free-mobile-templates`,
`calendars-date-picker-templates`, `schedule-events-template`,
`material-you-for-web-apps`, `ios-datepickers`, `segment-ui-kit`, `figma-react-ui-kit`,
`messenger-app-desktop-template`, `zeus-ui-free-website-template`,
`design-system-starter`, `navigation-layout-4-samples`, `chart-cards`,
`material-ui-styled`, `hyper-charts`, `search-inputs`, `figma-grid-layouts`,
`panda-dashboard-template`, `orion-dataviz-templates`.

Считаем: 43. Все прежние 15 Figma-категорий (`Components`, `Free UI kits`,
`Mobile Templates`, `Desktop templates`, `Data visualization`, `Web Design`,
`Global Styles`, `Grid Layouts`, `Design & Code`, `Tutorials & Education`,
`Dashboard Templates`, `Card Templates`, `Chart Templates`, `Email Templates`)
схлопываются в одну.

## 5. Что удаляется

Пятнадцать прежних Figma-категорий плюс `Code` в старом виде. `Code` становится
пятью категориями из раздела 3.

## 6. Порядок чипов

❶ `All topics`
❷ `Figma templates`
❸ `UI components`
❹ `Icons and animations`
❺ `Design and AI tools`
❻ `Desktop utilities`
❼ `Self-hosted apps`

Figma идёт второй, потому что это 43 карточки, то есть две трети раздела.
Код идёт после, внутри него по убыванию размера.

**Мега-меню.** Оставить шесть вкладок: `All topics`, `Figma templates`,
`UI components`, `Icons and animations`, `Design and AI tools`.
Список в [`NAV_FREEBIE_CATEGORIES`](components/layout/nav/navConfig.ts:123)
сокращается с восьми до пяти. `Desktop utilities` и `Self-hosted apps` в меню
не выводим: по две карточки не заполнят сетку из шести.

## 7. Что придётся изменить в коде

| Файл | Правка | Риск |
|---|---|---|
| [`data/freebies-listing.ts`](data/freebies-listing.ts:3) | новый `FREEBIES_CATEGORIES` из шести значений, поле `category` у 62 карточек | средний |
| [`components/pages/FreebiesListingPage.tsx`](components/pages/FreebiesListingPage.tsx:23) | карта старых категорий | низкий |
| [`components/pages/FreebieDetailPage.tsx`](components/pages/FreebieDetailPage.tsx:24) | суффикс по новой категории | средний, меняет title 62 страниц |
| [`components/layout/nav/navConfig.ts`](components/layout/nav/navConfig.ts:123) | пять вкладок | низкий |
| [`data/search-suggestions.ts`](data/search-suggestions.ts) | синонимы | низкий |

**Главный риск.** Смена `category` меняет `<title>` всех 62 страниц: суффикс считается
от категории в [`suffixForCategory`](components/pages/FreebieDetailPage.tsx:24).
Сейчас там три ветки: код, туториал, Figma-файл. После правки останется две,
а страницы с `ios-datepickers` и `accordion-guide` получат правильный суффикс
`free Figma file` вместо ошибочного `free UI tutorial`.

[`m3e-canvas`](data/freebies-listing.ts:331) держит позицию 3–4 по GSC и около 1800 кликов
за три месяца. Поэтому:

❶ Первый коммит: данные и фильтр, суффиксы не трогаем
❷ Второй коммит, через две недели: новые суффиксы
❸ Наблюдение за `m3e-canvas`, `free-ios-ui-kit`, `hyper-charts`, `runeicons`, `ios-datepickers`

**Старые ссылки.** `?category=Code`, `?category=Mobile+Templates` и остальные
придут в [`resolveCategory`](components/pages/FreebiesListingPage.tsx:23). Нужна карта
`LEGACY_FREEBIE_CATEGORIES` по образцу [`LEGACY_BLOG_CATEGORIES`](data/blog-categories.ts:29),
иначе старые URL вернут `All topics` и внешние закладки сломаются.

## 8. Порядок работ

❶ Утвердить названия шести категорий
❷ Переписать `FREEBIES_CATEGORIES` и поле `category` у 62 карточек по разделам 3 и 4
❸ Добавить карту старых категорий в резолвер
❹ Сократить вкладки мега-меню до пяти
❺ Обновить синонимы поиска
❻ Проверить все 62 страницы: ни один фильтр не должен быть пустым
❼ Отдельным коммитом позже — суффиксы title

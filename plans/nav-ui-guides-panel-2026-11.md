# Панель UI guides в навбаре: варианты подачи (16.11.2026)

Статус: выпущено локально 16.11.2026 (панель 62f79e6, хаб b50e812), без push. Продолжение [`navbar-restructure-2026-11.md`](navbar-restructure-2026-11.md).
Поправки к тексту ниже: вместо `Articles` первый пункт называется `Magazine`; `Inspiration` остаётся в баре после `Resources` без бейджа, поэтому в шаге 5 раздела 9 строки `AI UI inspiration ↗` нет. В указателе 42 гайда (35 + 7).
Решение автора 16.11: берём вариант 2 (`Articles` · `UI guides` · `Resources` · `Advertise`), выкатываем одним выпуском, замер `publish_cta_click` не ждём.

## 0. Решения автора (16.11, второй заход)

1. Панель: вариант A (указатель со `Start here` и группами).
2. Клик по пункту `UI guides` и ссылка `All UI guides` ведут на новый хаб `/ui-guides`.
3. 4 дополнительных гайда включаем: `button-group-guide`, `ai-agent-ui-design-patterns`, `command-palette-ui-design-guide`, `how-to-design-dialogs`.
4. Группы оставляем: `Inputs`, `Navigation`, `Data display`, `Feedback`, `Screens`, `Visual styles`.

Итоговый состав и порядок работ приведены в разделах 7–9 ниже.

## 1. Короткий ответ

Да, подача должна быть другой. Сохраняем общую рамку: та же высота панели, анимация, триггер, клавиатура и menu aim. Меняется начинка: вместо «категории слева + 6 карточек справа» используем указатель, где все гайды видны сразу текстовыми ссылками, сгруппированными по назначению, а сверху стоят 3 самых читаемых с картинками.

## 2. Почему не так, как Articles и Resources

| | Articles, Resources | UI guides |
|---|---|---|
| Что это | Лента: состав меняется, свежее важнее | Справочник: фиксированный набор из 31 гайда по компонентам и 7 по стилям |
| С чем приходит человек | «Покажите, что интересного» | Знает, что ищет: «теперь гайд по dropdown» |
| Чем выбирают | Картинкой и заголовком | Названием компонента |
| Сколько видно за раз | 6 карточек из десятков, и это нормально | 6 карточек из 38 = 16%, остальные спрятаны за наведением на группу |
| Шагов до цели | Навести на категорию → выбрать карточку | Пробежать глазами → кликнуть |

Доводы по данным (GA4, 12.07–09.10.2026, суммы сложены вручную):

1. Гайды по компонентам дают около 13 500 входов (~26% сайта), гайды по стилям около 6 000. Эти люди приходят из Google на один гайд и уходят: 1,18 страницы за сессию. Бар для них единственный путь к соседнему гайду, и путь должен быть в один клик.
2. Спрос распределён длинным хвостом. Пятёрка лидеров (Data table 2 417, AI chat interface 1 578, Tabs 1 456, Dropdown 884, Dashboard 616) даёт около половины входов, остальные 26 гайдов по 70–590. Сетка из 6 карточек показала бы лидеров и спрятала хвост, хотя как раз хвосту нужен внутренний трафик.
3. Обложки гайдов похожи друг на друга (иллюстрации компонентов), поэтому картинка мало помогает выбрать. По названию «Date picker» выбрать быстрее, чем по обложке.
4. Внутренняя перелинковка. Панели рендерятся на сервере (закрытые только `inert`), так что указатель даёт ссылку на каждый из 38 гайдов с каждой страницы сайта. Google ценит ссылки из меню ниже, чем ссылки в тексте, но это гарантирует, что весь кластер связан. Сейчас из бара на гайды ведёт только то, что попало в 6 карточек `Learn`.

Доводы за одинаковую подачу, честно:

- единообразие: человек один раз понял, как устроено меню;
- переиспользуется [`MegaMenuPanel`](../components/layout/nav/MegaMenuPanel.tsx:52) без новой вёрстки;
- меньше риска сломать menu aim и клавиатуру.

Как это закрываем: новая панель повторяет оболочку `MegaMenuPanel` (тот же `MenuTrigger`, `nav_dropdown_list`, `container`, `handlePanelKeyDown`, `inert`). Прецедент уже есть: [`CompanyPanel`](../components/layout/nav/CompanyPanel.tsx:23) тоже устроена иначе, и это никого не путает.

## 3. Варианты

### Вариант A. Указатель с «Start here» (рекомендую)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ Start here           │ Inputs        │ Navigation      │ Data display │ Visual styles   │
│ ┌────┐ Data table    │ Button        │ App bar         │ Accordion    │ Bento grid      │
│ └────┘ 2 400 readers │ Checkbox      │ Breadcrumbs     │ Avatar       │ Blueprint grid  │
│ ┌────┐ AI chat UI    │ Date picker   │ Filter          │ Badge        │ Claymorphism    │
│ └────┘               │ Dropdown      │ Pagination      │ Calendar     │ Glassmorphism   │
│ ┌────┐ Tabs          │ Input field   │ Search          │ Carousel     │ Liquid glass    │
│ └────┘               │ Radio button  │ Sidebar nav     │ Chip         │ Neumorphism     │
│                      │ Slider        │ Steps           │ Data table   │ Retro brutalism │
│                      │ Stepper       │ Tabs            │              │                 │
│                      │ Toggle switch │                 │ Feedback     │                 │
│                      │               │ Screens         │ Empty state  │                 │
│                      │               │ AI chat UI      │ Notifications│                 │
│                      │               │ Dashboard       │ Tooltip      │                 │
│                      │               │ Pricing page    │              │                 │
│                      │               │ Settings        │              │                 │
│ All UI guides →      │               │                 │              │                 │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- Слева колонка `Start here`: 3 компактные строки с миниатюрой 64px (`radius-12`) и названием. Это Data table, AI chat interface и Tabs, около 40% входов на гайды. Цифры читателей под названием под вопросом: они устаревают, можно без них.
- Справа 4 колонки текстовых ссылок по группам, внутри группы по алфавиту (так быстрее искать). Подзаголовки групп в стиле `subtitle-all-caps`.
- Data table и Tabs стоят и в `Start here`, и в группах. Это сознательно: группа должна быть полной.
- Внизу ссылка `All UI guides` на хаб (см. вопрос 2 в разделе 6).
- Ховеров с картинками в ссылках нет, только подсветка цветом, как у текстовых ссылок в `CompanyPanel`.

Плюсы: все 38 гайдов в один взгляд, один клик до цели, максимум перелинковки.
Минусы: плотно; на 1024 пять колонок могут не влезть. Запасной вариант на 1024: `Visual styles` уходит под `Data display`, получается 4 колонки.

### Вариант B. Та же панель, группы вместо категорий

Левая колонка: `Popular`, `Inputs`, `Navigation`, `Data display`, `Feedback`, `Screens`, `Visual styles`. Справа 6 карточек с обложками гайдов выбранной группы.

Плюсы: ноль новой вёрстки, полное единообразие с Articles и Resources.
Минусы: в группах по 7–9 гайдов, а карточек 6, то есть часть всё равно спрятана; до нужного гайда 2 шага; обложки похожи. По сути повторяет нынешний `Learn` → `UI design`, только с группировкой.

### Вариант C. Гибрид: группы слева, список справа

Левая колонка та же, что в B. Справа вместо 6 карточек полный текстовый список гайдов группы в 2 колонки и одна крупная обложка самого читаемого гайда группы.

Плюсы: вся группа видна целиком, рамка панели та же, menu aim переиспользуется.
Минусы: всё ещё 2 шага, и человек должен угадать группу. Где «Search», в Inputs или Navigation? В варианте A он это видит сразу, в C должен наводить по очереди.

### Вариант D. Поиск по гайдам вверху панели (дополнение к A)

Поле `Find a component` над колонками фильтрует 38 ссылок на клиенте, без запроса к серверу. Поле по токенам `--input-*`.

Плюсы: быстро для тех, кто знает название.
Минусы: в шапке уже есть общий поиск, два поля рядом путают. Предлагаю не делать в этом выпуске; вернуться, если `nav_click` покажет, что в указателе долго ищут.

## 4. Мобильное меню (390)

Карточек в drawer нет ни в одном варианте. Пункт `UI guides` раскрывается аккордеоном: сначала 3 ссылки `Start here`, затем группы как вложенные раскрывающиеся списки (по умолчанию свёрнуты), внизу `All UI guides`. Как сейчас раскрываются другие пункты в drawer, я не проверял: нужно прочитать мобильную часть `SiteHeader` перед реализацией.

## 5. Технические заметки для реализации

- Данные: вынести `HOME_UI_GUIDES` из [`data/home.ts`](../data/home.ts:47) в общий `data/ui-guides.ts`, добавить поле `group` и 7 гайдов по стилям. Главная и навбар читают один источник, список не разъедется.
- Кандидаты в указатель, которых нет в `HOME_UI_GUIDES`: `button-group-guide` (292 входа), `ai-agent-ui-design-patterns` (219), `command-palette-ui-design-guide` (60), `how-to-design-dialogs` (58). Решить, включать ли их (вопрос 3).
- `search-ui-design` дал 3 входа, `sidebar-navigation-ui-design` в выгрузке не найден. В указателе оставляем: ссылка из меню им как раз и нужна.
- Новый компонент `GuidesPanel` по образцу `CompanyPanel`; `MenuKey` получает `guides`, в `NAV_MENU_ID` пишем `guides`.
- Аналитика: на колонках ставим `data-nav-group` (`start_here`, `inputs`, `navigation` и т.д.), чтобы `nav_click` показывал, откуда кликают. Так через 4 недели станет видно, нужен ли блок `Start here` и поиск D.
- Миниатюры `Start here` берём из `public/blog/covers/thumbs/`, грузятся лениво при открытии панели, как превью сейчас.
- Проверить на 1440 / 1024 / 768 / 390.

## 6. Что нужно от автора

1. Вариант панели: A, B или C (D отдельно, позже).
2. Куда ведёт клик по самому пункту `UI guides` и ссылка `All UI guides`. Хаба сейчас нет. Варианты: новая страница `/ui-guides` (отдельная посадочная под запросы вроде «ui design guides», но это новая страница со своим текстом и мета); якорь блока гайдов на главной; `/blog?category=UI Design` (там вперемешку и другие статьи).
3. Включать ли в указатель 4 гайда вне нынешнего списка (button group, AI agent patterns, command palette, dialogs).
4. Группировка: устраивают ли группы `Inputs`, `Navigation`, `Data display`, `Feedback`, `Screens`, `Visual styles`, или нужен простой список A–Z.

(Ответы получены, см. раздел 0.)

## 7. Итоговый состав указателя: 42 гайда

Все slug сверены с `content/blog/*.mdx`. Внутри группы порядок по алфавиту.

| Группа | Подпись → slug |
|---|---|
| Start here | Data table → `data-table-ui-design`; AI chat interface → `ai-chat-interface-ui-design`; Tabs → `tabs-ui-design` |
| Inputs (10) | Button; Button group → `button-group-guide`; Checkbox; Date picker; Dropdown; Input field → `input-ui-design`; Radio button; Slider; Stepper; Toggle switch |
| Navigation (9) | App bar → `appbar-ui-design`; Breadcrumbs; Command palette → `command-palette-ui-design-guide`; Filter; Pagination; Search; Sidebar navigation; Steps; Tabs |
| Data display (7) | Accordion; Avatar; Badge; Calendar; Carousel; Chip; Data table |
| Feedback (4) | Dialogs → `how-to-design-dialogs`; Empty state; Notifications; Tooltip |
| Screens (5) | AI agent patterns → `ai-agent-ui-design-patterns`; AI chat interface; Dashboard; Pricing page; Settings |
| Visual styles (7) | Bento grid → `bento-grid-layout-design-guide`; Blueprint grid → `complete-guide-to-blueprint-grid-design`; Claymorphism → `claymorphism-design-guide`; Glassmorphism → `liquid-glass-vs-glassmorphism`; Liquid glass → `liquid-glass-design-explained-a-practical-guide`; Neumorphism → `neumorphism-design-guide`; Retro brutalism → `retro-brutalist-ui-design-2026` |

Без подписи со стрелкой slug имеет вид `<label>-ui-design` (в нижнем регистре, через дефис). Уникальных гайдов 42: в группах 10 + 9 + 7 + 4 + 5 + 7 = 42; Tabs, Data table и AI chat interface дополнительно стоят в `Start here`.

Спорное место: `liquid-glass-vs-glassmorphism` по сути сравнение стилей, а не гайд по glassmorphism. Подпись `Glassmorphism` выбрана потому, что статья собирает этот запрос (1 988 входов). Если подпись покажется неточной, можно назвать `Glass styles compared`.

Раскладка колонок на 1440: `Start here` | `Inputs` | `Navigation` | `Data display` + `Feedback` | `Screens` + `Visual styles`. На 1024 проверить; если не влезает, `Start here` уходит строкой над колонками.

## 8. Хаб `/ui-guides`

- Роут `pages/ui-guides.tsx` → page-компонент `components/pages/UiGuidesPage.tsx` по образцу [`CategoryPage`](../components/pages/CategoryPage.tsx) (`section-padding top-80 bottom-80`, H1, `spacer-*`).
- Данные: `getStaticProps` читает frontmatter (title, `cardDescription`, `thumbImage`) для 42 slug из `data/ui-guides.ts`. Если slug не найден, сборка падает с понятной ошибкой, и опечатка не проскочит молча.
- Структура страницы: H1 и вводный абзац → `Start here` (3 крупные карточки, `hover-lift is-large`) → по одному H2 на группу с сеткой карточек → `CtaSubscribe`. Якоря у групп (`#inputs`, `#navigation` …), чтобы подзаголовки групп в панели могли вести на хаб.
- SEO: запись в `data/pages-meta.ts`, хлебные крошки в `data/breadcrumbs.ts`, путь в `STATIC_PATHS` в `pages/sitemap.xml.ts`, JSON-LD `CollectionPage` с `ItemList`, если в `lib/seo/schema.ts` есть подходящий хелпер (проверить).
- Тексты (title, description, H1, вступление) Code-режим готовит по скиллам seo и copywriter с самопроверкой: sentence case, без двоеточия в title, title не длиннее 65 символов. Рабочий черновик title: `UI design guides for components and styles` (42 символа).
- Главная: блок гайдов читает тот же `data/ui-guides.ts` и получает ссылку `All UI guides` на хаб.

## 9. Порядок работ (один выпуск, отдельные коммиты)

Каждый пункт отдельным коммитом, без push. После каждого `npm run lint`, в конце `npm run build` и проверка на 1440 / 1024 / 768 / 390.

1. `refactor:` вынести `HOME_UI_GUIDES` в `data/ui-guides.ts`: 42 гайда, поле `group`, список `START_HERE`; главная читает новый источник.
2. `feat:` хаб `/ui-guides` (роут, page-компонент, мета, крошки, sitemap).
3. `feat:` `GuidesPanel` (вариант A) и мобильный аккордеон; `MenuKey` и `NAV_MENU_ID` получают `guides`; `data-nav-group` на колонках.
4. `feat:` `Learn` → `Articles`, новый порядок категорий (Popular, Latest, Startups & SaaS, Growth hacking, SEO, Technology, UI design, Design & code, Research).
5. `feat:` `Resources` получает строки `Design kits` (без `Buy`) и `AI UI inspiration ↗`; пункты `UI kits` и `Inspiration` уходят из бара.
6. `feat:` `Company` → `AdvertisePanel` по `publish-showcase-phase5-1.md` с поправками; `advertise_panel` и `advertise_panel_mobile` в `PublishLocation`.
7. `chore:` подсказки поиска (`Search articles…`, `Search UI guides…`, `Search free resources…`), подсветка активного пункта, ссылка `All UI guides` на главной.
8. Финальная проверка: `npm run build`, 4 ширины, клавиатура и Escape в каждой панели, `nav_click` в DebugView.

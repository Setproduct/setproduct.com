# Resources: итоговая таксономия из 7 категорий. Спецификация на внедрение

Дата: 11 ноября 2026
Статус: **утверждено автором**, 7 категорий
Объём: один уровень категорий, 62 карточки, 43 Figma и 19 кода

## 1. Новый массив FREEBIES_CATEGORIES

Заменить целиком в [`data/freebies-listing.ts`](data/freebies-listing.ts:3):

```ts
export const FREEBIES_CATEGORIES: string[] = [
  "All topics",
  "Figma templates",
  "UI components",
  "Icons and animations",
  "Design and AI tools",
  "Desktop utilities",
  "Self-hosted apps",
];
```

Плюс список категорий, которые считаются кодом, для суффикса title и для старых ссылок:

```ts
/** Everything that is a library, tool or app, not a Figma file. */
export const FREEBIE_CODE_CATEGORIES: string[] = [
  "UI components",
  "Icons and animations",
  "Design and AI tools",
  "Desktop utilities",
  "Self-hosted apps",
];
```

## 2. Раскладка 62 карточек

### 2.1 `Figma templates`, 43 карточки

Заменить `category` на `"Figma templates"` у всех перечисленных slug'ов.
Они же покрывают прежние 15 Figma-категорий, включая `Tutorials & Education`,
`Card Templates`, `Email Templates`, `Grid Layouts`, `Design & Code`,
`Global Styles`, `Chart Templates`, `Dashboard Templates`.

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

### 2.2 `UI components`, 7 карточек

| Slug | Строка | Причина |
|---|---|---|
| `ramka` | 24 | 15 примитивов лайтбокса, собираются как конструктор |
| `looseleaf` | 66 | 123 компонента через shadcn-реестр |
| `spectrum-ui` | 161 | компоненты через CLI, файлы в своём репозитории |
| `liquid-glass` | 217 | контролы на Base UI, ставятся пакетом |
| `sfinterface-numbers` | 274 | один компонент, 13 КБ |
| `pdfcn` | 370 | вьюер вместо iframe |
| `driver-js` | 350 | онбординг-компонент, vanilla не мешает |

### 2.3 `Icons and animations`, 4 карточки

| Slug | Строка | Причина |
|---|---|---|
| `matita-icons` | 104 | 200 иконок, SVG и React |
| `runeicons` | 293 | набор SVG-иконок |
| `react-useanimations` | 85 | анимированные иконки |
| `amicro` | 312 | сниппеты движения |

### 2.4 `Design and AI tools`, 4 карточки

| Slug | Строка | Причина |
|---|---|---|
| `desigma` | 45 | редактор дизайна, приложение |
| `compositor` | 180 | редактор изображений, приложение |
| `m3e-canvas` | 332 | сборщик Material 3, отдаёт промпт |
| `rea` | 237 | MCP-сервер, инструмент анализа через ИИ |

### 2.5 `Desktop utilities`, 2 карточки

| Slug | Строка | Причина |
|---|---|---|
| `fsearch` | 256 | системная утилита, фоновый демон |
| `cleanyourtv` | 123 | скрипт настройки устройства |

### 2.6 `Self-hosted apps`, 2 карточки

| Slug | Строка | Причина |
|---|---|---|
| `mailcheap` | 199 | рассылка на своём сервере |
| `gr8r-task-management` | 142 | воркспейс, который разворачиваешь |

**Контроль:** 43 + 7 + 4 + 4 + 2 + 2 = 62. Пустых категорий нет.

## 3. Порядок карточек в массиве

Оставить текущий порядок массива без перемешивания. Внутри категории сортировка
идёт по позиции в массиве, а она уже отражает свежесть. Единственная правка
порядка — `ramka` остаётся первой.

## 4. Правки в коде

### 4.1 [`data/freebies-listing.ts`](data/freebies-listing.ts:3)

→ новый `FREEBIES_CATEGORIES` из раздела 1
→ новый `FREEBIE_CODE_CATEGORIES`
→ заменить `category` у 62 карточек по разделу 2

### 4.2 [`components/pages/FreebieDetailPage.tsx`](components/pages/FreebieDetailPage.tsx:24)

Заменить [`suffixForCategory`](components/pages/FreebieDetailPage.tsx:24) на проверку
по списку кода:

```ts
function suffixForCategory(category: string) {
  return FREEBIE_CODE_CATEGORIES.includes(category)
    ? "free open source code"
    : "free Figma file";
}
```

Ветка `free UI tutorial` удаляется: категории `Tutorials & Education` больше нет,
а `accordion-guide` и `ios-datepickers` получат корректный `free Figma file`.

Проверка длины: `Ramka, the headless lightbox for React (free open source code)` = 62.

### 4.3 [`components/pages/FreebiesListingPage.tsx`](components/pages/FreebiesListingPage.tsx:23)

Добавить карту старых ссылок. Старые Figma-категории ведут в `Figma templates`,
старый `Code` и `Design & Code` показывают все категории кода.

```ts
const LEGACY_FREEBIE_GROUPS: Record<string, string[]> = {
  Code: FREEBIE_CODE_CATEGORIES,
  "Design & Code": FREEBIE_CODE_CATEGORIES,
  Components: ["Figma templates"],
  "Free UI kits": ["Figma templates"],
  "Mobile Templates": ["Figma templates"],
  "Desktop templates": ["Figma templates"],
  "Data visualization": ["Figma templates"],
  "Web Design": ["Figma templates"],
  "Global Styles": ["Figma templates"],
  "Grid Layouts": ["Figma templates"],
  "Tutorials & Education": ["Figma templates"],
  "Dashboard Templates": ["Figma templates"],
  "Card Templates": ["Figma templates"],
  "Chart Templates": ["Figma templates"],
  "Email Templates": ["Figma templates"],
};
```

Фильтр в [`filteredProducts`](components/pages/FreebiesListingPage.tsx:45) менять так:
вместо `item.category === activeCategory` проверять вхождение в массив активных
категорий. Хранить в состоянии либо название новой категории, либо legacy-ключ,
и разворачивать его через карту до фильтра.

Ссылки вида `/freebies?category=Code` при этом показывают все 19 карточек кода,
а не `All topics`. Это важно: такие ссылки уже есть в мега-меню и в закладках.

### 4.4 [`components/layout/nav/navConfig.ts`](components/layout/nav/navConfig.ts:123)

[`NAV_FREEBIE_CATEGORIES`](components/layout/nav/navConfig.ts:123) привести к пяти вкладкам:

```ts
{ label: "All topics", category: null },
{ label: "Figma templates", category: "Figma templates" },
{ label: "UI components", category: "UI components" },
{ label: "Icons and animations", category: "Icons and animations" },
{ label: "Design and AI tools", category: "Design and AI tools" },
```

`Desktop utilities` и `Self-hosted apps` в мега-меню не выводим: по две карточки
не заполнят сетку из шести. В самом листинге они остаются, там семь чипов.

### 4.5 [`components/layout/nav/navPreviews.ts`](components/layout/nav/navPreviews.ts:49)

[`getFreebiePreviews`](components/layout/nav/navPreviews.ts:49) сейчас фильтрует по
равенству `item.category === category`. Для вкладок из раздела 4.4 этого достаточно,
менять функцию не нужно. Но если сюда придёт legacy-ключ, вернётся полный набор,
потому что список окажется пустым и сработает фолбэк. Это допустимое поведение.

### 4.6 Поиск

Проверить [`data/search-suggestions.ts`](data/search-suggestions.ts) и
[`components/pages/SearchPage.tsx`](components/pages/SearchPage.tsx:60) на упоминания
старых категорий. Заменить формулировки на новые: `Figma templates`,
`open source UI components`, `icons`, `design tools`.

### 4.7 Что не трогать

→ `public/freebies/` и имена файлов картинок
→ `previewHref` и адреса `/freebies/<slug>`, переезд на `/resources` остаётся
  отдельным этапом из [`plans/freebies-to-resources-migration.md`](plans/freebies-to-resources-migration.md)
→ CSS-классы `freebies_*`
→ типы в [`types/data.ts`](types/data.ts:40), поле `category` уже `string`,
  второй оси нет

## 5. Проверки после внедрения

❶ `npm run lint` — чисто
❷ `npm run build` — все 62 страницы собираются
❸ Проверить, что каждый чип на `/freebies` непустой: 43, 7, 4, 4, 2, 2
❹ Открыть `/freebies?category=Code` — должно показать 19 карточек кода
❌ Не должно: `/freebies?category=Code` показывает всё подряд
❺ Открыть `/freebies/ramka` и `/freebies/m3e-canvas` — title с суффиксом
  `free open source code`
❻ Открыть `/freebies/free-ios-ui-kit` — title с суффиксом `free Figma file`
❼ Открыть `/freebies/accordion-guide` — суффикс `free Figma file`, не `free UI tutorial`

## 6. Один коммит или два

Рекомендую **один коммит**, потому что суффиксы и так меняются у трёх страниц
(`accordion-guide`, `ios-datepickers`, и все, кто переехал из кода в Figma),
и разделение на два не даёт выигрыша.

Но перед пушем зафиксировать в отчёте текущие позиции пяти страниц из GSC:
`m3e-canvas`, `free-ios-ui-kit`, `ios-datepickers`, `hyper-charts`, `runeicons`.
Если через две недели `m3e-canvas` просядет больше чем на две позиции,
причина будет видна сразу.

Сообщение коммита: `refactor: regroup resources into seven categories`

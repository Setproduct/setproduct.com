# Аудит полей ввода (inputs) на setproduct.com

Исследование сделано по той же схеме, что и [аудит кнопок](buttons-design-system-audit.md): какие CSS-классы есть, где и как поля используются, какие состояния поддерживаются, где есть проблемы с семантикой и доступностью.

## 1. Как поля устроены сейчас

Поля собраны из трёх слоёв CSS, которые наслаиваются друг на друга:

1. **База Webflow** — `.w-input`, `.w-select` в [`setproduct.webflow.shared.css`](../public/css/setproduct.webflow.shared.css:509). Серая системная рамка `#ccc`, фокус голубой `#3898ec`, `outline: 0`, высота 38px, у отключённого поля фон `#eee`. Эти классы стоят почти на каждом поле, хотя визуально их перебивают классы бренда.
2. **Фирменный стиль** — `.text-input` (строка 3068) и `.textarea-input` (строка 4395). Сиреневый фон `#f0ebff`, рамка 1px `#1a191c26`, внутренняя тень `inset 0 3px 1px #7c4dff33` (эффект «вдавленного» поля, по духу совпадает с push-кнопками), `font-size: 18em`. Модификаторы: `is-search`, `is-templates`, `is-freebies-filters`, `is-nav-search`, `is-page-search`, `is-smaller`.
3. **Локальные переопределения**:
   - [`globals.css`](../styles/globals.css:1565) переписывает `.text-input.is-nav-search` (шрифт 14em, ширина +50%, другие отступы и скругление).
   - [`globals.css`](../styles/globals.css:1338) задаёт мобильный поиск в меню `.nav-menu-mob-search-input` целиком в `px`, со своим фоном, радиусом и без внутренней тени.
   - [`FreebiesListingPage.module.css`](../components/pages/FreebiesListingPage.module.css:5) задаёт кнопке-селекту шрифт `18px` (в `px`, а не в `em`).
   - Селект темы на /search ([`SearchPage.tsx`](../components/pages/SearchPage.tsx:1003)) собран целиком из Tailwind-классов в `rem`.

React-компонента `<Input>` нет. Каждое поле пишется руками.

## 2. Инвентаризация: все поля на сайте

| # | Где | Элемент | Классы | Тип |
|---|---|---|---|---|
| 1 | [`SiteFooter.tsx`](../components/layout/SiteFooter.tsx:146) | Email подписки | `text-input w-input` | `email` |
| 2 | [`CtaSubscribe.tsx`](../components/sections/CtaSubscribe.tsx:23) | Email подписки | `text-input w-input` | `email` |
| 3 | [`BlogSidebar.tsx`](../components/blog/BlogSidebar.tsx:109) | Email подписки (вертикальная форма) | `text-input w-input` | `email` |
| 4 | [`ContactModal.tsx`](../components/modals/ContactModal.tsx:117) | Email | `text-input w-input` | `email` |
| 5 | [`ContactModal.tsx`](../components/modals/ContactModal.tsx:130) | Сообщение | `textarea-input w-input` | `textarea` |
| 6 | [`SiteHeader.tsx`](../components/layout/SiteHeader.tsx:1167) | Поиск в навбаре (десктоп) | `text-input is-nav-search w-input` | `search` |
| 7 | [`SiteHeader.tsx`](../components/layout/SiteHeader.tsx:1134) | Поиск в мобильном меню | `w-input nav-menu-mob-search-input` | `search` |
| 8 | [`SearchPage.tsx`](../components/pages/SearchPage.tsx:766) | Поиск на /search | `text-input is-nav-search is-page-search w-input` + Tailwind | `search` |
| 9 | [`SearchPage.tsx`](../components/pages/SearchPage.tsx:999) | Селект темы блога | только Tailwind | `select` |
| 10 | [`FreebiesListingPage.tsx`](../components/pages/FreebiesListingPage.tsx:155) | Поиск по ресурсам | `text-input is-search is-templates w-input` | `text` |
| 11 | [`FreebiesListingPage.tsx`](../components/pages/FreebiesListingPage.tsx:112) | Кастомный дропдаун «Filter by» | `text-input is-search is-freebies-filters w-dropdown-toggle` на `<button>` | кнопка + список |
| 12 | Скрытые honeypot-поля `website` в 4 формах | ловушка для ботов | `hidden` или `style={{display:"none"}}` | `text` |
| 13 | Скрытые `<input type="submit" class="hide w-button">` в поисках 6 и 8 | невидимая кнопка отправки | `hide w-button` | `submit` |

Итого: 11 видимых полей, из них 4 визуальных языка (фирменный `.text-input`, поиск в навбаре с отдельной геометрией, мобильный поиск в px, Tailwind-селект).

## 3. Матрица «размер × вариант» (что реально есть в CSS)

| Размер | Как получается | Шрифт | Высота на 1440px | Где |
|---|---|---|---|---|
| L | `.text-input` | 18em | ~50px | Подписка, модалка контакта, поиск на /freebies |
| M | `.text-input.is-nav-search` (переопределение в globals) | 14em | ~41px, подогнана под кнопку M | Поиск в навбаре, поиск на /search |
| Мобильный поиск | `.nav-menu-mob-search-input` | 16px | 52px | Только мобильное меню |
| Textarea | `.textarea-input` | 18em | min 8em × 18 ≈ 144px | Модалка контакта |
| Select-пилюля | Tailwind | `text-size-regular` | ~40px, в rem | /search, таб Blog |
| Dropdown-кнопка | `.text-input.is-freebies-filters` + module.css | 18px | ~50px | /freebies |

Скругления в разных местах получились разными: `1em` от 18em-шрифта = 18px у `.text-input`, `1.25em` = 22.5px у textarea, `1.143em` от 14em ≈ 16px в навбаре, 12px у мобильного поиска, `radius-full` у селекта.

## 4. Проблемы

### 4.1. Системные

1. **Мелкий шрифт на планшете и масштабирование в iOS.** `font-size: 18em` привязан к `body { font-size: .0694vw }`. При ширине 768px это ≈ 9.6px, при 1024px ≈ 12.8px. Mobile Safari увеличивает страницу, когда фокусируется поле со шрифтом меньше 16px. На iPad и в узком десктопном окне текст в поле мелкий, а на планшете страница «прыгает» при тапе. Ниже 479px всё нормально (≈ 19.5px). Автор уже наталкивался на это: у мобильного поиска стоит `font-size: 16px` с комментарием про zoom.
2. **Мёртвая база Webflow.** `.w-input` / `.w-select` стоят почти везде, но их стили почти полностью перебиты. Утекают только побочные эффекты (серый фон у отключённого поля, `outline: 0`, `margin-bottom: 10px` там, где его не сбросили).
3. **Четыре визуальных языка** (см. раздел 2). Мобильный поиск и Tailwind-селект выпадают из фирменного стиля: другой фон, нет внутренней тени, единицы `px`/`rem` вместо `em`.
4. **Хаос скруглений** — 5 разных значений, ни одно не из шкалы `radius-*`.
5. **Нет токенов.** Цвета `#f0ebff`, `#1a191c26`, `#7c4dff33`, `#19181bb3`, `#1a191c99` захардкожены по несколько раз. Плейсхолдер бывает двух разных цветов.

### 4.2. Состояния

| Состояние | Сейчас | Проблема |
|---|---|---|
| Default | Сиреневый фон, рамка 15% чёрного, inset-тень | ОК |
| Hover | Рамка становится `--primary` | Совпадает с focus: по виду не понять, где фокус |
| Focus | Рамка `--primary`, `outline: 0` | Слабый индикатор: смена цвета 1px-рамки не проходит WCAG 2.4.11 (контрастная зона фокуса). У кнопок теперь есть общий `:focus-visible`, у полей нет |
| Filled | Не отличается | Допустимо |
| Disabled | Срабатывает Webflow `.w-input[disabled]` → фон `#eee` (специфичность выше, чем у `.text-input`) | Серое пятно не в стиле бренда. При отправке подписки поле на секунду сереет |
| Error / invalid | Отсутствует полностью | Нет стиля `:user-invalid` / `aria-invalid`. У модалки текст ошибки есть, но поле не подсвечивается и не связано с текстом через `aria-describedby` |
| Success | Форма заменяется текстом | ОК |
| Переходы | Нет `transition` | Рамка переключается мгновенно, хотя у кнопок теперь плавные 260ms |
| `.is-freebies-filters:focus` | Рамка принудительно серая | Фокус на дропдауне полностью невидим |

### 4.3. Семантика и доступность

1. **Подписи.** В модалке подписи «Email» и «Message» — это `<p>`, а не `<label htmlFor>`. Клик по подписи не ставит фокус, связь держится только на `aria-label`. В формах подписки видимой подписи нет, только `aria-label` (для однопольной формы допустимо, но плейсхолдер исчезает при вводе).
2. **Автозаполнение.** У email-полей нет `autoComplete="email"`. Браузер и менеджеры паролей подставляют хуже, на мобильных лишний ввод.
3. **Поиск на /freebies** — `type="text"`, `name="field"`, нет кнопки очистки. На /search всё это есть.
4. **Дропдаун на /freebies** — `aria-haspopup="listbox"`, но у контейнера `<nav>` нет `role="listbox"`, опции `role="option"` лежат без родителя. Нет навигации стрелками. Проще и надёжнее заменить на нативный `<select>`, как на /search.
5. **Поиск в навбаре** — `placeholder=""` и анимированный оверлей. Для скринридера подсказки нет, но `aria-label` есть, так что поле не немое. Оверлей не исчезает, если поле заполнено без фокуса (например, после «назад» в браузере).
6. **Ошибки проглатываются.** [`useSubscribe`](../hooks/useSubscribe.ts:30) в `catch` ставит `isSubscribed = true`: пользователь видит «Congratulations» даже при сетевой ошибке.
7. **Honeypot** спрятан двумя способами (`className="hidden"` и `style={{display:"none"}}`). Работает, но разнобой.
8. **Тексты.** Плейсхолдер в модалке `Whats your e-mail` (опечатка, без апострофа), кнопка `Send your Message` (нарушение sentence case).

## 5. Каких типов не хватает

- **Label + helper + error** как связка: подпись над полем, подсказка под ним, текст ошибки с `aria-describedby`.
- **Поле с иконкой** как официальный вариант: сейчас иконка поиска позиционируется через `.search-icon-wr` и отступ, подобранный руками в трёх местах.
- **Кнопка очистки** как общий паттерн (есть только на /search, написана на Tailwind).
- **Select в фирменном стиле.** Сейчас два несовместимых решения.
- **Checkbox / radio / toggle** — на сайте не используются (кроме прототипа), но для дизайн-системы стоит заложить.
- **Инлайн-форма «поле + кнопка»** как единый блок с гарантированно равной высотой (сейчас высоты совпадают случайно).

## 6. Варианты решения

### Вариант A. «Причесать CSS» (минимальный)

Без изменения разметки, только [`setproduct.webflow.shared.css`](../public/css/setproduct.webflow.shared.css) и [`globals.css`](../styles/globals.css):

1. Токены `--input-*` в `:root`: фон, рамка, рамка hover, inset-тень, плейсхолдер, ошибка.
2. Шрифт поля не меньше 16px: `font-size: max(18em, 16px)` для `.text-input`, `.textarea-input`, `.is-nav-search` (`max(14em, 16px)` в навбаре нужно проверить на десктопе отдельно). Это убирает zoom в iOS и мелкий текст на планшете.
3. Разделить hover и focus: hover = рамка 40% primary, focus = рамка primary + кольцо `0 0 0 3px` светло-фиолетового цвета (через `box-shadow` вместе с inset-тенью). Добавить `transition` 200ms.
4. Disabled в фирменном стиле: перебить `.w-input[disabled]`, оставить сиреневый фон и `opacity .7`, как у кнопок.
5. Стиль ошибки: `.text-input[aria-invalid="true"]` и `:user-invalid` → красная рамка `#e03e3e`.
6. Скругления на шкалу `radius-*` через `calc(N * var(--em-px))`: L и textarea → 16, M → 12.
7. Мобильный поиск и селект на /search перевести на те же токены (фон, рамка, inset-тень).
8. Убрать принудительно серую рамку у `.is-freebies-filters:focus`.

### Вариант B. React-примитивы поверх существующих классов (рекомендую после A)

Как для кнопок: `components/ui/` с компонентами, которые выводят те же Webflow-классы.

- `TextField` — `label` (видимая или `sr-only`), `hint`, `error`, `size: "L" | "M"`, `icon`, `clearable`. Сам связывает `id`, `htmlFor`, `aria-describedby`, `aria-invalid`, ставит `autoComplete` по типу.
- `TextArea` — та же связка подписи и ошибки.
- `Select` — нативный `<select>` в фирменном стиле с шевроном. Заменяет и Tailwind-пилюлю на /search, и кастомный дропдаун на /freebies.
- `InlineForm` — поле + кнопка с равной высотой, используется в трёх формах подписки.
- `Honeypot` — одна реализация на все формы.

Миграция по одному компоненту за коммит: подписки (3 места) → модалка → поиски → селекты.

## 7. Правила для AGENTS.md

Перенесено в [`AGENTS.md`](../AGENTS.md:856), раздел «Поля ввода (обязательное правило)».

1. Поле собирается только из `text-input` / `textarea-input` и их модификаторов. Свои поля на Tailwind не пишем.
2. Рамка в обычном состоянии — цвет внутренней тени `#d7ccfc`, серый `#1a191c26` не используем.
3. Шрифт в поле не меньше 16px на любой ширине.
4. У каждого поля есть доступное имя: `<label htmlFor>` или `aria-label`. Плейсхолдер не заменяет подпись.
5. Email-поля: `type="email"`, `autoComplete="email"`. Поиск: `type="search"`, `enterKeyHint="search"`.
6. Ошибка показывается и цветом рамки, и текстом, связанным через `aria-describedby`; на поле ставится `aria-invalid="true"`.
7. Hover и focus выглядят по-разному, фокус никогда не прячем.
8. Скругления только из шкалы `radius-*`.
9. Выпадающие списки — нативный `<select>`, пока нет общего компонента.

## 8. Принятые решения

**Рамка поля в обычном состоянии — цвет внутренней тени.** Заменили прежний серый `#1a191c26` на `#d7ccfc`. Это ровно тот оттенок, который даёт `inset 0 3px 1px #7c4dff33` (фирменный фиолетовый 20%) поверх заливки `#f0ebff`, то есть около `#d9cbff`. Тогда рамка читается как продолжение тени, а не как отдельная серая линия.

Что из этого следует:

- токен `--input-border` (в прототипе [`InputsProtoPage.module.css`](../components/pages/InputsProtoPage.module.css:108), после выкатки — в shared CSS) получает значение `#d7ccfc`;
- `--attention-line` у поля с бегущим лучом приводится к тому же цвету, чтобы оно не выглядело другим компонентом: рамка там прозрачная и только несёт луч, а линия под ним это и есть цвет покоя;
- hover (`--input-border-hover`), focus (`--input-border-focus`), ошибка (`--input-error`) и disabled не меняются, у каждого состояния свой токен;
- проверено в прототипе на 1440: все 30 полей в покое показывают `rgb(215, 204, 252)`, у поля с лучом рамка остаётся прозрачной, состояния hover/focus/ошибки сохранили свои цвета.

Выкатка на живой сайт: там `#1a191c26` стоит в четырёх местах [`setproduct.webflow.shared.css`](../public/css/setproduct.webflow.shared.css:3047) (3047, 3098, 3464, 4374) и меняется одновременно с остальными токенами `--input-*`, отдельным шагом.

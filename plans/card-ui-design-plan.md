# card-ui-design: план статьи (Гейт 1, на подтверждение)

Дата: 2026-11-25. Источник: `plans/card-gsc/` (5 уникальных zip, первые два файла совпадают побайтно). Период в фильтрах выгрузки: «За последние 3 месяца», тип поиска «Веб-поиск (текст)».

## 0. Лимиты (AGENTS.md и скиллы)

1. Em-dash на весь файл, включая frontmatter, alt и FAQ: не больше 2.
2. Двоеточий в title, metaTitle, H2 и H3 нет. Description 130–160 символов без двоеточий. Sentence case везде.
3. Риторических трихолонов не больше 2. Перечни реальных объектов считаются отдельно.
4. Запрещены «Not X, but Y», предложения и фрагменты с «Not», «It's not just», «Whether you're», «From X to Y», банклише, blockquote и сырой JSON-LD.
5. Стрелочные списки разделяются пустой строкой, узкие таблицы оборачиваются в `blog-fit-table`. FAQ задаётся через поле `faq`. Картинки только с новыми именами.

---

## 1. Что показали выгрузки

### 1.1. Запросы с regex `(?i)card`

| Срез | Запросов | Показов | Кликов |
|---|---|---|---|
| Всё по фильтру | 269 | 3 327 | 19 |
| Финансовые карты (solcard, kyc, crypto, claude without card) | 177 | 2 207 | 15 |
| UI-смысл | 92 | 1 120 | 4 |

Главный вывод: по головным запросам `card ui`, `ui card`, `card design`, `card component`, `card layout`, `card hover` показов почти нет. У `cards ui`, `card ui design ideas` и `dashboard card design` по 1 показу. Это не означает, что спроса нет. Search Console показывает только запросы, по которым сайт уже попадает в выдачу, а страницы про карточку у нас пока нет. Реальный объём головного запроса по этим файлам не измерить. Внешнего источника (Ahrefs, Semrush) в брифе нет, поэтому для головного интента расчёт опирается на полноту ответа, а не на показы.

### 1.2. UI-запросы по кластерам и владельцам

| Кластер | Примеры | Показы | Позиция | Кто ранжируется |
|---|---|---|---|---|
| Выбираемая карточка (radio) | radio cards ui, radio button cards, radio card ui | ~330 | 2.8–10.6 | `radio-button-ui-design` |
| Метрики на дашборде | who offers dashboard design kits with reusable metric cards?, kpi cards prompt | ~400 | 1–9 | `dashboard-ui-design`, `/templates/material-desktop` (196 показов, поз. 4.3) |
| Стеклянная карточка | liquid glass card(s), card liquid glass | ~127 | 1.8–9 | `liquid-glass-design-explained-a-practical-guide` |
| Стили поверхности | neumorphic/neumorphism cards, claymorphism cards, glassmorphism cards | ~40 | 1.5–10 | гайды по стилям |
| Сетка карточек | bento card grid layout, bento cards | ~47 | 4–7 | `bento-grid-layout-design-guide` |
| Бейдж на карточке | card badge ui, badge on card ui, card badges | ~18 | 2–8 | `badge-ui-design` |
| Карусель карточек | creative ui carousel card design, card carousel ui | ~24 | 18–30 | `carousel-ui-design` (вне топ-10) |
| Карточки задач | project management cards, task card ui design, workflow cards | ~48 | 4.8–34.7 | никто устойчиво |
| Продуктовая карточка | product cards ui design, product cards design | ~29 | 8–21 | никто |
| События и уведомления | event cards ui, notification card ui design, ticket card ui | ~30 | 8–11 | никто |
| Figma и адаптивность | responsive cards figma, ui cards figma, figma cards template | ~31 | 5–13 | никто |
| Пустая карточка | empty state card ui | 2 | 6 | `empty-state-ui-design` |
| Шум | chip customization in asp.net mvc card, seo report card tool, card x mobile apps | ~200 | — | игнорирую |

### 1.3. Устройства и страны

ПК: 2 545 показов (76%). Мобильные: 769 (23%). Планшеты: 13. В UI-подвыборке своего разреза по устройствам нет, использую долю всего фильтра. По странам: США 1 071 (32%), Индия 267, Германия 128, Великобритания 111.

Вывод: мобильный раздел обычного размера, около 350 слов, без расширения. Язык и примеры ориентированы на американскую аудиторию.

### 1.4. Соседи: позиции 8–20 и показы от 200

| Страница | Запросов | Показов | Что лежит на 8–20 |
|---|---|---|---|
| bento | 239 | 3 147 | bento grid layout (448, 8.8), bento grids (264, 8.2), bento grid layouts (226, 11.7) |
| chip | 286 | 4 020 | от 200 показов ничего. При 50–199: what is a chip in ui design (182, 9.1), status chips (142, 10.1) |
| data-table | 721 | 12 677 | от 200 показов ничего. При 50–199: saas data table ux patterns (145, 9.2) |
| dashboard-ui | 316 | 4 424 | dashboard layout patterns for task tracking web apps (514, 9.5) |

Ни один из этих недобранных запросов не про карточку. Новая статья их не трогает: словосочетания `bento grid`, `chip`, `data table` и `dashboard layout` в её H2 и H3 не используются.

---

## 2. Каннибализация, решение по каждому пересечению

| Пересечение | Владелец и позиция | Решение |
|---|---|---|
| Головной card ui, ui card, card design | нет страницы в топ-10 | Новая статья оправдана. Правило «расширять существующую» не срабатывает |
| radio cards ui и варианты | radio-button-ui-design, 2.8–8 | Остаётся у radio. В card-гайде одна фраза про выбираемую карточку в разделе состояний и ссылка. H3 про radio card нет |
| metric/KPI cards | dashboard-ui-design 6–9, material-desktop 4.3 | Дашборд держит страничный уровень. Card-гайд разбирает одну KPI-карточку как компонент, ссылается на дашборд и упоминает Material Desktop |
| liquid glass card | liquid-glass guide, 6–7 | Один короткий раздел про стили поверхности со ссылкой. Фраза liquid glass card не идёт в заголовок |
| neumorphic и claymorphism cards | гайды по стилям, 1.5–9 | Тот же раздел, одна ссылка на каждый стиль |
| bento card grid layout | bento, 6.5 | Сетка разбирается только как механика колонок одинаковых карточек. Неравные ячейки и композиция отдаются ссылкой |
| card badge ui | badge-ui-design, 4–8 | Зона статуса в анатомии, ссылка на badge |
| теги на карточке | chip-ui-design | Зона мета в анатомии, ссылка на chip |
| card carousel | carousel-ui-design, 18–30, вне топ-10 | Короткий H3 о карточках в горизонтальной ленте, ссылка на carousel. Риск низкий, страница не в топ-10 |
| table vs cards | data-table-ui-design, в FAQ таблицы | Card-гайд закрывает сторону карточки. Вопрос «table или cards» в FAQ не дублирую |
| empty card | empty-state-ui-design, 6 | Раздел загрузки и пустоты, ссылка |
| pricing card | pricing-ui-design, card-запросов в выгрузке нет | Конфликта нет, ссылка в разделе размеров на акцентную карточку тарифа |

Отдельных выгрузок по badge, empty-state и pricing не было. Их card-запросы видны во вкладке «Страницы» общего фильтра, этого достаточно для решения.

---

## 3. Расчёт объёма

### 3.1. Интенты и покрытие

Сложный интент тот, где нужны код, цифры или сравнение. Он получает 300–500 слов, простой 150–250. Код считается в словах, потому что `wc -w` его считает и самопроверка тоже.

| № | Интент | Тип | Источник | Слов |
|---|---|---|---|---|
| 1 | Что такое карточка, отличие от строки и пункта списка | что это | бриф, what is kpi cards, can i use card? | 350 |
| 2 | Анатомия, восемь зон | анатомия | card badge ui, character card grid tags badges | 450 |
| 3 | Когда карточка вредит | когда применять | бриф | 250 |
| 4 | Раскладки, вводная плюс freebie | раскладки | responsive cards figma, figma cards template | 200 |
| 5 | Математика колонок, minmax, равная высота | раскладки | bento card grid layout | 400 |
| 6 | Три размера карточки | раскладки | feature card(s) | 250 |
| 7 | Горизонтальная карточка, container query | раскладки | бриф | 300 |
| 8 | Карточки в горизонтальной ленте | раскладки | card carousel ui, creative ui carousel card design | 200 |
| 9 | KPI и stat-карточка | типы | kpi card design ui, dashboard kpi cards ui, metric cards | 350 |
| 10 | Продуктовая карточка | типы | product cards ui design | 300 |
| 11 | Карточки задач и событий | типы | project management cards, task card, event cards, ticket card | 250 |
| 12 | Число действий | действия | бриф | 300 |
| 13 | Ссылка на всю карточку | доступность и действия | бриф | 450 |
| 14 | Восемь состояний с CSS, включая hover | состояния | card hover в брифе, tab group header hover cards | 450 |
| 15 | Загрузка и пустая карточка | состояния | empty state card ui | 300 |
| 16 | Заголовки и обрезка, line-clamp | контент | бриф | 300 |
| 17 | Пропорции медиа, aspect-ratio | контент | бриф | 250 |
| 18 | Доступность | доступность | бриф | 400 |
| 19 | Мобильные | мобильные | 23% показов с телефона | 350 |
| 20 | Плотность | раскладки | бриф | 250 |
| 21 | Токены карточки | система | бриф | 350 |
| 22 | Стили поверхности | стили | liquid glass card, neumorphic cards, claymorphism cards | 200 |
| 23 | Антипаттерны, восемь штук | антипаттерны | бриф | 400 |
| 24 | Чеклист перед релизом | чеклист | бриф | 200 |
| 25 | FAQ, 7 вопросов по 70 слов | непокрытые интенты | см. раздел 7 | 490 |

### 3.2. Сумма

Интенты 1–24: 7 500 слов. FAQ: 490. Итого 7 990.
Плюс 10% на вступление и закрытие: 800.
Цель: около 8 800 слов в теле, допустимый коридор 8 000–9 000.

Разделы, которых нет в брифе и которые добавил расчёт: 8 (лента), 9–11 (типы карточек) и 22 (стили поверхности). Без них остаются без ответа product cards, task cards, KPI cards и запросы по стилям. Это около 300 показов, которые сейчас уходят на чужие страницы или на позиции 20+.

Для сравнения: bento 6 087 слов, data-table 6 347. Карточка шире, потому что совмещает раскладку, контент, действия и доступность.

### 3.3. Почему меньше нельзя

На 4 000 слов при 25 интентах приходится около 160 слов на интент. Семь интентов несут обязательный рабочий код: minmax-сетка, container query, ссылка на всю карточку, состояния, line-clamp, aspect-ratio и токены. Один такой блок CSS с разметкой занимает 60–120 слов, и на объяснение с цифрами остаётся 40–100. Так нельзя честно ответить, почему минимум 280 px, а не 240, и что ломается в узкой колонке.

Второй вариант экономии, выкинуть типы карточек и ленту, оставляет без ответа единственные card-запросы, у которых на сайте нет владельца.

`readingTimeText` посчитаю по фактическому объёму после написания.

---

## 4. Карта интентов: запрос, интент, раздел

| Запрос | Интент | Раздел |
|---|---|---|
| card ui, ui card, cards ui, card ui design ideas | что это, как выглядит хорошая карточка | H2 «What a card is, and when a table row wins» + анатомия |
| card component | анатомия и API компонента | H2 «Card anatomy in eight zones» + токены |
| card badge ui, badge on card ui, card badges | где ставить статус | анатомия, зона status |
| character card grid ui pattern tags badges | теги на карточке | анатомия, зона meta |
| card layout, card grid, bento card grid layout | колонки | H2 «Card layouts that scale» + H3 по колонкам |
| responsive cards figma, ui cards figma, figma cards template | адаптивный шаблон | раскладки + freebie + FAQ |
| feature card(s) | акцентная карточка | H3 о трёх размерах |
| card carousel ui, creative ui carousel card design | лента карточек | H3 о горизонтальной ленте |
| kpi card design ui, what is kpi cards, dashboard card design, metric cards | KPI-карточка | H3 «Stat and KPI cards» + FAQ |
| product cards ui design, product cards design | продуктовая карточка | H3 «Product cards» + FAQ |
| project management cards, task card ui design, workflow cards, event cards ui, ticket card ui, notification card ui design | карточки задач и событий | H3 «Task and event cards» |
| card hover, tab group header hover cards | hover | H2 о состояниях |
| empty state card ui | пустая карточка | H2 «Loading and empty cards» |
| radio cards ui (владелец radio) | выбираемая карточка | одна фраза в состояниях со ссылкой |
| liquid glass card, neumorphic cards, claymorphism cards (владельцы гайды стилей) | стиль поверхности | H2 о стилях поверхности со ссылками |

---

## 5. Структура H2/H3

Заголовки проверены построчно: sentence case, без двоеточий, без em-dash, без «From X to Y» и «Not».

**Лид (без заголовка).** Одно самодостаточное определение: карточка это контейнер, который группирует данные об одном объекте и ведёт к одному действию. Плюс одна фраза о том, когда она проигрывает строке таблицы: когда пользователь сравнивает значения между объектами.

**H2 What a card is, and when a table row wins.** Одни и те же данные в трёх контейнерах и правило выбора по задаче: просмотр, сравнение или поиск. *(img 2, широкая)*

**H2 Card anatomy in eight zones.** Восемь зон сверху вниз (media, meta, title, body, status, key value, actions, footer), какие обязательны и в каком порядке их читают. *(img 3, 2:3 обтекание)*
→ **H3 Which zones every card needs.** Минимальный набор из title и одного действия, остальное по задаче. Полноширинный абзац, отделяет обтекание img 3 от img 4.

**H2 When cards hurt the interface.** Признаки «каши из карточек»: больше 12 объектов на экране, сравнение по одному полю, одинаковые изображения. Порог перехода на таблицу. *(img 4, 1:1 обтекание)*

**H2 Card layouts that scale.** Сетка одинаковых карточек как механика колонок, неравные ячейки отдаются bento-гайду. Здесь же freebie Responsive imagery cards. *(img 5, широкая)*
→ **H3 The column math behind a card grid.** Минимальная и максимальная ширина карточки, `repeat(auto-fill, minmax(280px, 1fr))`, равная высота, число колонок по брейкпоинтам 390, 768, 1024 и 1440. *(img 6, 1:1)*
→ **H3 Three card sizes and when to use each.** Компактная, обычная и акцентная с размерами в px и правилом «одна акцентная на ряд», ссылка на карточку тарифа. *(img 7, 3:2 широкая)*
→ **H3 Horizontal cards with media.** Медиа слева, переход в вертикаль через `@container` при ширине меньше 480 px, что ломается без этого. *(img 8, 4:5)*
→ **H3 Cards in a horizontal scroller.** `scroll-snap`, видимый край следующей карточки на 15–20%, когда лента лучше сетки, ссылка на carousel.

**H2 Card types you will actually ship.** Короткая вводная о том, что тип задаёт иерархию зон.
→ **H3 Stat and KPI cards.** Одно число, дельта, период и спарклайн, размеры шрифтов, ссылки на дашборд и Material Desktop. *(img 9, 1:1)*
→ **H3 Product cards.** Фото, цена, рейтинг и одно действие, что выносится в hover, а что нет. *(img 22, 4:5)*. Перед этим полноширинный абзац после KPI.
→ **H3 Task and event cards.** Дата, исполнитель, статус и drag-ручка, плотность для канбана.

**H2 How many actions a card can hold.** Одно основное действие, до двух второстепенных, остальное в меню, иерархия кнопок. *(img 10, 4:5)*. Раздел заканчивается полноширинным абзацем.

**H2 Making the whole card clickable.** Паттерн с растянутым `::after` у ссылки в заголовке, внутренние кнопки над слоем, порядок фокуса, рабочая разметка и CSS. *(img 11, 1:1)*

**H2 Eight card states and the CSS behind them.** Default, hover, focus, selected, dragging, loading, error и disabled с CSS. Выбираемая карточка одной фразой со ссылкой на radio. *(img 12, широкая)*

**H2 Loading and empty cards.** Скелетон повторяет геометрию загруженной карточки, пустая карточка с одним действием, ссылка на empty state. *(img 13, 4:5)*

**H2 Content rules inside a card.** Полноширинная вводная, отделяет img 13 от img 14.
→ **H3 Titles and truncation.** До 2 строк в сетке, `line-clamp`, полный текст в `title` и на детальной странице. *(img 14, 1:1)*
→ **H3 Media aspect ratios.** 1:1, 4:3 и 16:9, одна пропорция на сетку, `aspect-ratio` и `object-fit`. *(img 15, 3:2 широкая)*

**H2 Card accessibility.** Семантика `article` или `li`, один заголовок на карточку, тач-цели от 24×24 по WCAG 2.2 SC 2.5.8 и 44×44 как рекомендация, контраст границы 3:1. *(img 16, 4:5)*. Раздел заканчивается полноширинным абзацем.

**H2 Cards on mobile.** Одна колонка до 480 px, горизонтальная карточка вместо вертикальной в списках, действия от 44 px. *(img 20, 4:5)*

**H2 Density and spacing.** Два уровня плотности: отступ 16 или 24 px, зазор 12 или 24 px, когда какой. *(img 17, широкая)*

**H2 Card design tokens.** Радиус, отступ, тень и граница как CSS custom properties, правило вложенных радиусов. Ссылка на галерею карточек в app.setproduct.com. *(img 18, 1:1)*

**H2 Card surface styles beyond flat.** Один абзац на стиль: стекло, неоморфизм и клей, ограничения по контрасту, ссылки на три гайда. *(img 23, 3:2 широкая)*

**H2 Eight card anti-patterns.** Восемь ошибок по 40–50 слов, по одной на каждую ячейку картинки. *(img 19, 3:2 широкая)*

**H2 Ship checklist for cards.** Шесть проверок, совпадающих с картинкой. *(img 21, 4:5)*

**H2 Frequently asked questions.** Семь вопросов, текст дублируется в поле `faq`, как в chip и data-table.

Итог: 18 H2, 11 H3, 23 изображения (21 из брифа и 2 добавленных: img 22, img 23).

---

## 6. Варианты description (130–160 символов, без двоеточий)

| № | Текст | Символов |
|---|---|---|
| 1 | Design cards that survive real content. Eight-zone anatomy, column math with CSS minmax, card states and accessible whole-card links, plus a ship checklist. | 156 |
| 2 | When a card beats a table row and when it loses. Card anatomy, grid widths per breakpoint, KPI and product card patterns, with working CSS and an FAQ. | 150 |
| 3 | A practical card UI guide with real numbers. Minimum card width, columns per breakpoint, action limits and touch targets, plus CSS and a ship checklist. | 152 |

Каждый вариант содержит одно перечисление артефактов. Это перечни реальных объектов, не риторические трихолоны, но в итоговом подсчёте я учту их отдельной строкой. Рекомендую вариант 1: он закрывает `card ui` через «cards» и обещает конкретные артефакты.

**Title.** По брифу `Card UI design, anatomy and the layouts that scale`, но фактически в нём **50 символов, а не 48**. Длину не меняю. В card UI-запросах нет запросов с годом (год встречается только в крипто-запросах), поэтому вариант с годом не предлагаю.

---

## 7. FAQ: 7 вопросов из непокрытых интентов

| № | Вопрос | Откуда |
|---|---|---|
| ❶ | What is a KPI card in a dashboard? | what is kpi cards, kpi cards |
| ❷ | What is the minimum width of a card in a grid? | card layout, responsive cards |
| ❸ | Should the whole card be clickable? | бриф, нет владельца |
| ❹ | How many cards should fit in one row? | card grid |
| ❺ | How do I make cards the same height in a row? | card layout |
| ❻ | What should a product card include? | product cards ui design |
| ❼ | How do I build a responsive card in Figma? | responsive cards figma, ui cards figma, figma cards template |

---

## 8. Внутренние и внешние ссылки

### 8.1. Из новой статьи

| № | Куда | Раздел и абзац |
|---|---|---|
| 1 | `/blog/data-table-ui-design` | «What a card is», второй абзац, правило «сравнение значит таблица» |
| 2 | `/blog/badge-ui-design` | Анатомия, абзац о зоне status |
| 3 | `/blog/chip-ui-design` | Анатомия, абзац о зоне meta (теги) |
| 4 | `/blog/bento-grid-layout-design-guide` | «Card layouts that scale», первый абзац, граница «одинаковые ячейки здесь, неравные там» |
| 5 | `/blog/carousel-ui-design` | H3 «Cards in a horizontal scroller», последний абзац |
| 6 | `/blog/dashboard-ui-design` | H3 «Stat and KPI cards», первый абзац |
| 7 | `/blog/pricing-ui-design` | H3 «Three card sizes», абзац об акцентной карточке |
| 8 | `/blog/radio-button-ui-design` | Состояния, фраза о selected |
| 9 | `/blog/empty-state-ui-design` | «Loading and empty cards», абзац о пустой карточке |
| 10 | `/blog/button-ui-design` | «How many actions», абзац об иерархии кнопок |
| 11 | `/blog/liquid-glass-design-explained-a-practical-guide` | Стили поверхности, абзац о стекле |
| 12 | `/blog/neumorphism-design-guide` | Стили поверхности, абзац о неоморфизме |
| 13 | `/blog/claymorphism-design-guide` | Стили поверхности, абзац о клее |

13 ссылок больше рекомендованных 4–8. Причина: пп. 11–13 уводят запросы по стилям к владельцам, это часть защиты от каннибализации. Если нужно сократить, первыми убираю 10 и 7.

**Продуктовые упоминания (3):** `/freebies/responsive-imagery-cards` в «Card layouts that scale», `/templates/material-desktop` в KPI-разделе (у шаблона уже 196 показов по запросу о metric cards), галерея карточек `app.setproduct.com` в токенах.

**Внешние (2):** WCAG 2.2 SC 2.5.8 Target size (minimum) в разделе доступности, MDN CSS container queries в H3 о горизонтальной карточке.

### 8.2. Обратные ссылки (отдельный коммит, одна новая ссылка на пост)

| Пост | Место |
|---|---|
| data-table-ui-design | строка 113, «Use cards when the visual content matters more…», слово cards становится ссылкой |
| dashboard-ui-design | строка 92, «❷ **KPI cards.**», ссылка в описании |
| bento-grid-layout-design-guide | строка 107, «A card grid uses identical cell sizes» |
| chip-ui-design | абзац о тегах на карточке рядом со строкой 80 (в таблице ссылку не ставлю), покажу diff |
| empty-state-ui-design | абзац про пустые контейнеры, точное место покажу diff перед правкой |
| carousel-ui-design | абзац о карточках внутри ленты, покажу diff |

---

## 9. План изображений

Обтекание в проекте делается так: `<div className="blog-float-clip">`, картинка `![alt](path "float-right")` стоит перед текстом. На мобильных обтекание отключается (`styles/globals.css`, строка 831).

### 9.1. Сводка по правилам

| № | Раздел | Формат | Тип | Слов рядом, план | Минимум |
|---|---|---|---|---|---|
| 1 | обложка | 16:9 1600×900 | — | — | — |
| 2 | What a card is | 16:9 1440×810 | широкая | — | — |
| 3 | Anatomy | 2:3 576×864 | обтекание | 450 | 160 |
| 4 | When cards hurt | 1:1 576×576 | обтекание | 250 | 100 |
| 5 | Layouts that scale | 16:9 1440×810 | широкая | — | — |
| 6 | Column math | 1:1 576×576 | обтекание | 400 | 100 |
| 7 | Three sizes | 3:2 1440×960 | широкая | — | — |
| 8 | Horizontal cards | 4:5 576×720 | обтекание | 300 | 130 |
| 9 | Stat and KPI | 1:1 576×576 | обтекание | 350 | 100 |
| 22 | Product cards | 4:5 576×720 | обтекание | 300 | 130 |
| 10 | Actions | 4:5 576×720 | обтекание | 300 | 130 |
| 11 | Whole card link | 1:1 576×576 | обтекание | 450 | 100 |
| 12 | States | 16:9 1440×810 | широкая | — | — |
| 13 | Loading and empty | 4:5 576×720 | обтекание | 300 | 130 |
| 14 | Titles and truncation | 1:1 576×576 | обтекание | 300 | 100 |
| 15 | Media ratios | 3:2 1440×960 | широкая | — | — |
| 16 | Accessibility | 4:5 576×720 | обтекание | 400 | 130 |
| 20 | Mobile | 4:5 576×720 | обтекание | 350 | 130 |
| 17 | Density | 16:9 1440×810 | широкая | — | — |
| 18 | Tokens | 1:1 576×576 | обтекание | 350 | 100 |
| 23 | Surface styles | 3:2 1440×960 | широкая | — | — |
| 19 | Anti-patterns | 3:2 1440×960 | широкая | — | — |
| 21 | Ship checklist | 4:5 576×720 | обтекание | 200 | 130 |

Между обтекаемыми парами 3→4, 9→22, 10→11, 13→14 и 16→20 стоит полноширинный абзац (он указан в структуре, раздел 5). Ни в одном разделе нет больше одной обтекаемой и больше двух картинок.

**Решение по img 3.** В брифе обещано восемь зон, а перечислено шесть. Предлагаю восемь: media, meta, title, body, status, key value, actions, footer. Для обтекаемой картинки это больше лимита в 4 элемента, но формат 2:3 и стек сверху вниз сохраняют читаемость при 288 px: подписи в одно слово, шрифт от 16 px. Если автор хочет строго соблюсти лимит, вариант Б такой: шесть зон из брифа и формат 2:3 без изменений.

**Alt с перечнями** (img 2, 7, 12, 15, 18 и 23) это перечни реальных объектов, а не трихолоны. В отчёте посчитаю их отдельно.

### 9.2. Общий стиль для всех промптов

Добавляется к каждому промпту ниже:

```
Style: flat vector UI illustration, clean and minimal, soft light background #f7f5ff, cards in white with 1px border #e4dcff and radius 24px, accent violet #7c4dff, text dark #19181b, neutral gray #adadad for secondary lines. All cards share identical placeholder content: a soft violet abstract image block, a short title line, two gray text lines, a small pill status, one violet button. No real photos, no stock people, no logos, no small or unreadable text. Labels in English, sentence case, no all caps, maximum three words per label, labels at least 16px at final size. Lines at least 3px at final size.
```

### 9.3. Промпты

**1. Обложка**
Scene: one large product card centered, tilted 0 degrees, with media block on top, title line, two text lines, status pill and a violet button. Soft shadow under the card. Composition: card occupies the middle third, generous empty background around it. Aspect 16:9, final 1600×900. Alt: `A single product card on a plain background`. File: `public/blog/covers/card-ui-design.webp`.

**2. card-vs-table-vs-list.webp**
Scene: the same item shown three ways side by side, left a vertical card, center a single table row inside a thin table frame with 4 columns, right a list item with small thumbnail and one line. Labels under each: "card", "table row", "list item". Composition: meaning held in the central third, three objects equal height baseline. Aspect 16:9, final 1440×810. Alt: `The same content as a card, a table row and a list item`. File: `public/blog/assets/card-ui-design/card-vs-table-vs-list.webp`.

**3. card-anatomy-stack.webp**
Scene: one tall card exploded vertically into eight stacked zones with small gaps between them, thin callout lines to the right with one-word labels: "media", "meta", "title", "body", "status", "key value", "actions", "footer". Composition: vertical, card on the left 60% width, labels on the right, 10% margin on all edges. Aspect 2:3, final 576×864. Alt: `Labeled zones of a card stacked top to bottom`. File: `public/blog/assets/card-ui-design/card-anatomy-stack.webp`.

**4. card-soup-vs-table.webp**
Scene: split square. Top half a cramped grid of nine tiny identical cards with mixed misaligned elements. Bottom half the same nine items as a clean compact table with four rows visible and a header row. Two labels: "card soup", "table". Composition: vertical split top and bottom, 10% margins. Aspect 1:1, final 576×576. Alt: `A cluttered card grid next to the same data in a table`. File: `public/blog/assets/card-ui-design/card-soup-vs-table.webp`.

**5. card-grid-breakpoints.webp**
Scene: three browser frames of increasing width left to right, holding the same card grid at two, three and four columns. A horizontal ruler below with ticks labeled "768", "1024", "1440". Composition: frames aligned on one baseline, meaning in central third. Aspect 16:9, final 1440×810. Alt: `One card grid at two, three and four columns with breakpoints marked`. File: `public/blog/assets/card-ui-design/card-grid-breakpoints.webp`.

**6. card-column-measure.webp**
Scene: one card shown twice, narrow at top and wide at bottom, aligned left, with a measuring scale above each and labels "min 280", "max 400". Composition: vertical, 10% margins. Aspect 1:1, final 576×576. Alt: `Minimum and maximum card width on a measuring scale`. File: `public/blog/assets/card-ui-design/card-column-measure.webp`.

**7. card-sizes-compared.webp**
Scene: three cards with identical content side by side: small compact card, medium standard card, large feature card twice as wide. Labels "compact", "standard", "feature". Composition: bottom-aligned, meaning in central third. Aspect 3:2, final 1440×960. Alt: `Compact, standard and feature card sizes with the same content`. File: `public/blog/assets/card-ui-design/card-sizes-compared.webp`.

**8. card-horizontal-breaks.webp**
Scene: top, a horizontal card with square media on the left and text on the right, looking correct. Bottom, the same card squeezed into a narrow column, text crushed into a thin strip with one red cross marker. Labels "fits", "breaks". Composition: vertical, 10% margins. Aspect 4:5, final 576×720. Alt: `A horizontal media card next to its broken narrow version`. File: `public/blog/assets/card-ui-design/card-horizontal-breaks.webp`.

**9. card-stat-widget.webp**
Scene: one KPI card large in frame, a big number placeholder rendered as a bold "48.2k", a small green up-arrow pill "+12%", a thin sparkline along the bottom. Composition: card centered, 10% margins. Aspect 1:1, final 576×576. Alt: `A stat card with a large number, delta and sparkline`. File: `public/blog/assets/card-ui-design/card-stat-widget.webp`.

**22. card-product-anatomy.webp** (вторая редакция: рейтинг убран, добавлены старая цена и wishlist)
Scene: one product card large in frame, filling about 80% of the height. Top: a square product photo block rendered as a soft violet abstract object on a light fill, no real product. In the top-right corner of the photo, a round 40px white icon button with an outlined heart. Below the photo: one product name line in dark bold, then a price row with a bold dark price "$49" and next to it a smaller gray struck-through old price "$69". At the bottom: one violet button at full card width. Nothing else on the card: no rating, no tags, no second button. Composition: vertical, card centered, 10% margins, meaning held in the central third. Aspect 4:5, final 576×720. Alt: `A product card with a photo, a name, a price next to a struck-through old price, one button and a wishlist icon`. File: `public/blog/assets/card-ui-design/card-product-anatomy.webp`.

**10. card-action-density.webp**
Scene: three identical cards stacked vertically, each with a different footer: one violet button; one violet button plus two text links; five buttons crammed in a row. Labels "one", "three", "five". Composition: vertical stack, 10% margins. Aspect 4:5, final 576×720. Alt: `One, three and five actions on a card compared`. File: `public/blog/assets/card-ui-design/card-action-density.webp`.

**11. card-whole-link-focus.webp**
Scene: one card with a thick violet focus ring around its whole outline, a small inner icon button in the top right corner with its own ring. Two numbered circles "1" on the card title, "2" on the inner button. Composition: card centered, 10% margins. Aspect 1:1, final 576×576. Alt: `Focus ring on a whole-card link with an inner button and numbered focus order`. File: `public/blog/assets/card-ui-design/card-whole-link-focus.webp`.

**12. card-states.webp**
Scene: eight small identical cards in one row with labels under each: "default", "hover" (lifted with shadow), "focus" (violet ring), "selected" (violet border and check), "dragging" (tilted with heavy shadow), "loading" (gray skeleton bars), "error" (red border and alert icon), "disabled" (faded 40%). Composition: one row, meaning in central band. Aspect 16:9, final 1440×810. Alt: `Card in default, hover, focus, selected, dragging, loading, error and disabled states`. File: `public/blog/assets/card-ui-design/card-states.webp`.

**13. card-loading-empty.webp**
Scene: top, a skeleton card with gray shimmer blocks matching the card zones. Bottom, an empty card with a simple line icon, one short line and a violet button. Labels "loading", "empty". Composition: vertical, 10% margins. Aspect 4:5, final 576×720. Alt: `A skeleton card above an empty card`. File: `public/blog/assets/card-ui-design/card-loading-empty.webp`.

**14. card-title-truncation.webp**
Scene: three cards stacked, title area showing one, two and three lines, the third ending with an ellipsis. A vertical ruler on the right marking "2 lines". Composition: vertical, 10% margins. Aspect 1:1, final 576×576. Alt: `A card title at one, two and three lines with a clamp ruler`. File: `public/blog/assets/card-ui-design/card-title-truncation.webp`.

**15. card-media-ratios.webp**
Scene: three identical cards side by side differing only in media block proportion: square, 4:3, 16:9. Labels "1:1", "4:3", "16:9". Composition: top-aligned, meaning in central third. Aspect 3:2, final 1440×960. Alt: `The same card with square, four by three and widescreen media`. File: `public/blog/assets/card-ui-design/card-media-ratios.webp`.

**16. card-focus-order.webp**
Scene: one tall card with numbered circles "1", "2", "3" on title link, secondary link and button, and dashed squares around the button and icon showing touch target size with label "44 px". Composition: vertical, 10% margins. Aspect 4:5, final 576×720. Alt: `Numbered focus order and touch target sizes on a card`. File: `public/blog/assets/card-ui-design/card-focus-order.webp`.

**20. card-mobile-one-column.webp**
Scene: a phone outline in portrait with cards stacked in a single column, a faint ghost of a two-column grid to the left with an arrow pointing into the phone. Composition: phone fills 70% height, vertical, 10% margins. Aspect 4:5, final 576×720. Alt: `A card grid collapsing to one column on a phone`. File: `public/blog/assets/card-ui-design/card-mobile-one-column.webp`.

**17. card-density-two.webp**
Scene: two panels side by side, left a spacious grid of six cards with wide gaps, right the same six cards with tight padding and narrow gaps. Labels "comfortable", "compact". Composition: two equal panels, meaning in central third. Aspect 16:9, final 1440×810. Alt: `The same card grid at two density levels`. File: `public/blog/assets/card-ui-design/card-density-two.webp`.

**18. card-tokens-panel.webp**
Scene: one panel with four rows, each row a small visual swatch on the left and a short label on the right: rounded corner "radius", padding box "padding", soft shadow "shadow", outlined edge "border". Composition: vertical rows, 10% margins. Aspect 1:1, final 576×576. Alt: `Card token panel with radius, padding, shadow and border`. File: `public/blog/assets/card-ui-design/card-tokens-panel.webp`.

**23. card-surface-styles.webp** (вторая редакция: 16:9 вместо 3:2)
Scene: four identical cards in one row, same size and same content (image block, title line, two text lines, one button), each rendered in a different surface style. 1: flat, white with a 1px #e4dcff border and no shadow. 2: glass, translucent frosted panel with background blur over a soft violet and pink gradient blob placed only behind this card, thin white inner edge. 3: neumorphic, card the same light lavender as its local background, extruded by a light shadow top-left and a darker shadow bottom-right, no border. 4: clay, puffy pastel violet card with a large radius, soft inner highlight and a soft outer drop shadow. Labels under each card: "flat", "glass", "neumorphic", "clay". Composition: one horizontal row, equal gaps, cards bottom-aligned, meaning in the central band, 8% side margins. Aspect 16:9, final 1440×810. Alt: `The same card in flat, glass, neumorphic and clay styles`. File: `public/blog/assets/card-ui-design/card-surface-styles.webp`.

**24. card-examples-teardown.webp** (новая, раздел «Card UI examples from real products»)
Scene: a 3 by 2 grid of six redrawn schematic cards, each a simplified wireframe in the shared style, no screenshots, no logos, no brand colors, no real photos. Top row. 1: listing card, tall photo block with a row of small dots under it and an outlined heart in the photo corner, then three text lines. 2: KPI card, small label line, one large bold number, a thin line chart under it, no image. 3: task card, compact, one title line and a row of four small icons (ID tag, status circle, priority bars, round avatar), no image. Bottom row. 4: a small split panel, left half a board column with two mini cards, right half the same items as a three-row table, a two-icon view switcher above. 5: feature card, artwork block filling the card edge to edge with a small label line and a large headline line over it. 6: shelf, a horizontal row of four square covers with title lines under them, the fourth cut off by the frame edge. Caption under each schematic, dark text: "Airbnb", "Stripe", "Linear", "GitHub Projects", "App Store", "Spotify". Composition: equal cells, 8% outer margins, one accent violet element per schematic marking the leading zone. Aspect 3:2, final 1440×960. Alt: `Redrawn schematics of six product cards in a three by two grid`. File: `public/blog/assets/card-ui-design/card-examples-teardown.webp`.

**19. card-anti-patterns.webp**
Scene: grid 4 columns by 2 rows of small cards, each showing one mistake with a red cross badge in the corner: five buttons, clipped title, mixed image ratios, nested card inside card, low contrast text, tiny tap targets, no visible focus, uneven heights. No labels. Composition: grid centered, meaning in central area. Aspect 3:2, final 1440×960. Alt: `Eight card design mistakes in a grid`. File: `public/blog/assets/card-ui-design/card-anti-patterns.webp`.

**21. card-ship-checklist.webp**
Scene: one tall card styled as a checklist with six rows, each a violet check circle and a short gray bar instead of text. Composition: vertical, card centered, 10% margins. Aspect 4:5, final 576×720. Alt: `A card checklist with six ticked items`. File: `public/blog/assets/card-ui-design/card-ship-checklist.webp`.

---

## 10. Что нужно от автора для перехода к Гейту 2

1. Подтвердить структуру из раздела 5 (18 H2, 11 H3) и объём около 8 800 слов.
2. Выбрать description (рекомендую 1).
3. Решить по img 3: вариант A с восемью зонами или вариант Б с шестью.
4. Подтвердить 13 внутренних ссылок или указать, какие убрать.
5. Принять к сведению: title 50 символов, а не 48 из брифа.

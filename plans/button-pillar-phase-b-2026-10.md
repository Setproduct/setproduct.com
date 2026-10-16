# Фаза B: рефактор тела пиллара button-ui-design (план, октябрь 2026)

## Статус: ЗАКРЫТ (2026-10-16)

Сверено с файлом 2026-10-16: все 12 пунктов целевой структуры (§1) на месте,
дефекты (§8) сняты. Фактический замер:
[`content/blog/button-ui-design.mdx`](../content/blog/button-ui-design.mdx) —
2 968 слов в теле (цель 2 200–2 800, вышло немного выше), em-dash 0, двоеточий
в H2/H3 вне URL 0, U+FFFD 0, blockquote 0. Лид answer-first, TL;DR,
decision-таблица, секция WCAG 2.2, FAQ (6 вопросов), checklist и
`## Closing thought` присутствуют. `## Button of the Month` и выдуманные
усилители удалены. Трихолоны: сырой regex даёт 4, но это перечисления
состояний и контролов, а не риторические трихолоны (метрика признана
ложной, см. `content-strengthening-2026-10.md`).

**Дата плана:** 2026-10-11. **Режим:** только план. Ни один MDX не меняется до OK.

**Целевой файл:** [`content/blog/button-ui-design.mdx`](../content/blog/button-ui-design.mdx)

**Исходное состояние (до рефактора):** 2 420 слов, 14 изображений, 19 унаследованных
триколонов, 1 blockquote (строка 139), лид `Welcome to the world of buttons
UI design!` и `So let's get started!`, секция `## Button of the Month`.

**Целевой объём после рефактора:** 2 200–2 800 слов.

**Образцы структуры:** [`data-table-ui-design.mdx`](../content/blog/data-table-ui-design.mdx),
[`form-controls-reference-2026.mdx`](../content/blog/form-controls-reference-2026.mdx).

**Важное решение по данным.** Анализ GSC (раздел 12 плана кластера)
показал, что каннибализация НЕ подтверждена: по «group»-запросам пиллар
получает 1 показ против 5 660 у сателлита. Значит секцию `## Button Group`
**не сокращаем** до одного абзаца (этот пункт из исходного задания
отменяется по фактам). Реальная цель рефактора — нулевой CTR на
собственных топ-запросах: `button ui templates` (620 показов, 0 кликов,
позиция 14.33), `ui buttons` (266 / 0 / 15.58), `button ui` (265 / 0 / 17.90).

---

## 1. Целевая структура (новый порядок секций)

| № | Секция | Что делает | Источник |
|---|---|---|---|
| 0 | Лид answer-first (40–80 слов) | заменяет «Welcome…» и «So let's get started!» | новый текст |
| 1 | TL;DR (4–5 строк) | быстрый ответ под сниппет | новый текст |
| 2 | Что такое кнопка и какой это интент | определение + место среди контролов | из текущих `Buttons Anatomy` |
| 3 | Decision-таблица «кнопка vs ссылка vs чип vs иконка» | закрывает запросы `button types ui`, `types of buttons ui` | новый |
| 4 | Anatomy (состояния, размеры, тени) | сохранить текущую анатомию | текущие секции |
| 5 | Стили и темизация | сохранить | `Buttons Theming`, `Button shadows` |
| 6 | Corner radius, inner shadow, gradients | сохранить | текущие секции |
| 7 | Icon button, split button, speed dial, button group | сохранить, включая `Button Group` целиком | текущие секции |
| 8 | Accessibility по WCAG 2.2 | новый раздел | новый текст |
| 9 | Anti-patterns | новый | новый текст |
| 10 | FAQ (5–6 вопросов) | новый | новый текст |
| 11 | Checklist before you ship | новый | новый текст |
| 12 | Closing thought | замена «Final words» | новый текст |

Удаляется: `## Button of the Month` и `### Tactile controls improve usability`,
`### Proven by real study`, `### Users like fancy buttons` — это выдуманные
усилители и маркетинговые вставки, не подкреплённые источниками.

---

## 2. Лид answer-first (40–80 слов)

Черновик (sentence case, без триколонов, без em-dash):

> A button is the most-used control in any interface, and a weak one breaks
> the whole flow. This guide covers the anatomy of a button, the states it
> must handle, sizing, theming, and priority rules, plus a decision table
> that tells you when to use a button instead of a link, a chip, or an icon
> button. Use it as a reference when you design or review button UI.

Объём: 64 слова.

---

## 3. TL;DR (4–5 строк)

- Button = действие на месте; ссылка = переход; не путать (это разные роли).
- Одна primary-кнопка на экран или секцию, остальные secondary или tertiary.
- Минимальный target size по WCAG 2.2 — 24×24 px, комфортно 44×44 на тач.
- Focus-visible обязателен, контраст текста минимум 4.5:1.
- Всегда проверяй состояния: idle, hover, focus, active, loading, disabled.

---

## 4. Decision-таблица (кнопка vs ссылка vs чип vs иконка)

| Контрол | Когда использовать | Когда не использовать |
|---|---|---|
| Button | Действие на месте: submit, открыть модалку, сохранить | Навигация на другой URL |
| Link | Переход на страницу или якорь | Запуск действия без перехода |
| Chip | Выбор из набора, фильтр, тег | Основное действие формы |
| Icon button | Знакомое действие без места под текст | Действие непонятно без подписи |

Сразу под таблицей — ссылка на [`chip-ui-design`](../content/blog/chip-ui-design.mdx)
и на [`button-group-guide`](../content/blog/button-group-guide.mdx).

---

## 5. Секция accessibility по WCAG 2.2

Обязательные пункты (со ссылкой на W3C):

- **Target size (minimum) 2.5.8** — минимум 24×24 CSS px.
- **Focus visible 2.4.7 / 2.4.11** — заметная обводка при клавиатуре.
- **Contrast 1.4.3** — текст на кнопке минимум 4.5:1.
- **Name, role, value 4.1.2** — семантический `<button>`, а не `<div onclick>`.
- **Disabled** — `aria-disabled` вместо `disabled`, если нужна доступность.

Текущий раздел `### **Accessibility**` расширяется этим списком, а не
заменяется.

---

## 6. FAQ (5–6 вопросов, ответы 40–60 слов)

1. **What is the difference between a button and a link?**
   Кнопка запускает действие на текущей странице, ссылка ведёт на другой
   URL или якорь. Семантика разная: `<button>` против `<a>`, и это влияет
   на клавиатуру и скринридеры. Выбор тега определяется смыслом, а не
   внешним видом.
2. **How many buttons should be on one screen?**
   Одна primary-кнопка на секцию, остальные secondary или tertiary. Несколько
   конкурирующих primary размывают приоритет и замедляют выбор. Если действий
   много, группируй их или убирай в меню.
3. **What button size is accessible?**
   По WCAG 2.2 минимум 24×24 CSS px, для тач-интерфейсов комфортно 44×44.
   Текст на кнопке минимум 4.5:1 контраста. Мелкие иконочные кнопки требуют
   увеличенной зоны нажатия вокруг видимой иконки.
4. **Should disabled buttons be used at all?**
   Реже, чем кажется: заблокированная кнопка не объясняет причину. Лучше
   оставить кнопку активной и показать ошибку при нажатии, либо объяснить
   рядом, что нужно заполнить. Если отключаешь, добавь подсказку.
5. **What states must every button have?**
   Idle, hover, focus, active, loading, disabled. Focus-visible обязателен
   для клавиатуры, loading заменяет подпись спиннером без прыжка ширины.
   Без полного набора состояний кнопка ощущается недоделанной.
6. **How do I handle buttons on mobile?**
   Увеличивай target до 44×44, не ставь primary у края экрана, избегай
   hover-only подсказок. На узких экранах primary-действие часто переезжает
   в sticky-бар внизу, а вторичные уходят в меню.

---

## 7. Checklist before you ship

- [ ] Одна primary-кнопка на секцию, остальные secondary или tertiary.
- [ ] Тег выбран по смыслу: `<button>` для действия, `<a>` для перехода.
- [ ] Есть все состояния: idle, hover, focus, active, loading, disabled.
- [ ] Focus-visible виден на тёмном и светлом фоне.
- [ ] Target size не меньше 24×24 px, на тач 44×44.
- [ ] Контраст текста минимум 4.5:1.
- [ ] Подпись в sentence case, глагол первым, 1–3 слова.
- [ ] Loading не меняет ширину кнопки.
- [ ] Иконочные кнопки имеют `aria-label`.
- [ ] Disabled, если есть, объясняет причину.

---

## 8. Снятие дефектов

| Дефект | Где | Действие |
|---|---|---|
| Blockquote (K1) | строка 139, `> By varying a radius…` | заменить обычным абзацем |
| 19 унаследованных триколонов | строки 5, 10, 20, 35, 37, 47, 51×3, 61×2, 63×2, 125, 189, 240, 254, 278×2 | переписать в пары или «X, затем Y» |
| `## Button of the Month` + 3 подсекции | строки 43–66 | удалить целиком |
| Выдуманные усилители | `### Proven by real study`, `### Users like fancy buttons` | удалить |
| `Welcome to the world…` / `So let's get started!` | строки ~35, 40 | заменить лидом answer-first |

После снятия триколонов счётчик должен быть не больше 2 на статью. Цель —
2 или меньше, все оставшиеся проверяемые.

---

## 9. Image-плейсхолдеры

Визуалы делает владелец отдельно. В теле расставляются плейсхолдеры
формата `{/* IMAGE NN — … */}` с коротким описанием того, что должно быть
на картинке. Существующие 14 изображений сохраняются на своих местах по
порядку; новые плейсхолдеры добавляются только к новым секциям:

| № | Куда | Что на изображении |
|---|---|---|
| NEW-1 | под TL;DR | Схема: button vs link vs chip vs icon button в одном ряду |
| NEW-2 | decision-таблица | Раскладка четырёх контролов с подписями ролей |
| NEW-3 | accessibility | Пример focus-visible обводки на светлой и тёмной кнопке |
| NEW-4 | checklist | Чек-лист из десяти пунктов как визуальный блок |

Существующие изображения 1–14 (строки 47–268) не трогаем: пути и alt
сохраняются, порядок тот же.

---

## 10. Порядок работы (после отдельного OK)

1. Коммит `content:` — лид + TL;DR + decision-таблица.
2. Коммит `content:` — удаление `Button of the Month` и выдуманных усилителей.
3. Коммит `content:` — секция accessibility по WCAG 2.2.
4. Коммит `content:` — FAQ + checklist.
5. Коммит `content:` — снятие blockquote и 19 триколонов.
6. Коммит `seo:` — финальная сверка title/description под новый объём.

Каждый шаг — отдельный отчёт, self-check по AGENTS.md (em-dash, триколоны,
двоеточия в H2/H3, длина title), затем `npm run lint`.

---

## 11. Что НЕ делаем в Фазе B

- Не сокращаем секцию `## Button Group` (каннибализация не подтвердилась).
- Не трогаем `button-group-guide` (отдельная задача по своему сниппету).
- Не удаляем существующие изображения и не меняем их пути.
- Не правим `radio-button-ui-design` (вне кластера).

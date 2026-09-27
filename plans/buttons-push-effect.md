# Push-эффект для кнопок в фирменных цветах

Референс: `.push-btn` с `press(60ms)`. У кнопки есть сплошная «кромка» снизу (`box-shadow: 0 6px 0 <тёмный цвет>`). При нажатии кнопка опускается на 5px (`translateY(5px)`), а кромка уменьшается до 1px, поэтому кажется, что кнопку физически вдавили.

## 1. Что есть сейчас

Кнопки уже выглядят объёмными, но объём сделан **внутренними** тенями (inset). Сама кнопка при этом не двигается.

| Класс | Фон | Нижняя «кромка» сейчас | Ховер |
|---|---|---|---|
| `button` (L) | `--primary` #7c4dff | `inset 0 -6px 1px #2b00a380` | кромка пропадает, кнопка «светлеет» |
| `button-small` (M) | `--primary` | `inset 0 -4px 1px #2b00a380` | то же |
| `button-x-small` (S) | `--primary` | `inset 0 -3px 1px #2b00a380` | то же |
| `secondary` / `is-secondary` | `--light-primary` #ebe0ff | `inset ... #2b00a31a` (10%) | лёгкая внешняя тень |
| `outlined` (M) | белый + фиолетовая рамка | `inset ... #2b00a31a` | лёгкая внешняя тень |
| `is-text` (чипы) | белый | `inset 0 -3px 1px #2b00a31a` | фон `--light-purple`, кромка 50% |

Что мешает push-эффекту:
- `transition: all .3s`: нажатие длиной 60ms растянется до 300ms и превратится в «кисель»;
- состояния `:active` нет ни у одной кнопки;
- тени задаются в `px`, а остальные размеры кнопки в `em`;
- [`.template-sticky-cta-btn`](styles/globals.css:1802) дублирует тени `.button`, поэтому его придётся поправить отдельно.

## 2. Фирменные цвета кромки (вычислены из текущих теней)

Сейчас кромка полупрозрачная и накладывается на фон. Для push-эффекта нужен сплошной цвет, иначе при сдвиге кнопки сквозь кромку просвечивает фон страницы. Поэтому я смешал текущие значения и получил сплошные цвета, визуально совпадающие с тем, что на сайте сейчас:

| Токен | Цвет | Откуда | Где |
|---|---|---|---|
| `--primary-edge` | `#5426d1` | #2b00a3 50% поверх #7c4dff | primary L/M/S |
| `--secondary-edge` | `#d8caf6` | #2b00a3 10% поверх #ebe0ff | secondary |
| `--outlined-edge` | `#eae6f6` | #2b00a3 10% поверх белого | outlined, `is-text` |
| `--chip-active-edge` | `#937dd1` | #2b00a3 50% поверх #fbfaff | активный чип |

Фиолетовый `--primary` не меняется. Меняется только способ рисовать кромку: вместо полупрозрачной внутренней тени будет сплошная внешняя.

## 3. Два способа реализации

### Способ 1. Классический push, как в референсе (внешняя кромка)

```css
.button {
  --edge: 6em;
  box-shadow: 0 var(--edge) 0 var(--primary-edge), inset 0 5px 10px #f0ebff4d;
  transition: transform .06s ease, box-shadow .06s ease, background-color .2s;
}
.button:active:not(:disabled) {
  transform: translateY(calc(var(--edge) - 1em));
  box-shadow: 0 1em 0 var(--primary-edge), inset 0 5px 10px #f0ebff4d;
}
```

- ✅ Ярко и «тактильно», один в один с референсом.
- ⚠️ Кромка рисуется **под** кнопкой. Место в вёрстке она не занимает, но визуально кнопка становится на 6/4/3em выше. В плотных местах (ряд карточек, мега-меню) расстояние до соседнего блока на глаз сократится.
- ⚠️ Если у родителя `overflow: hidden`, кромка обрежется. Кандидаты на проверку: обёртки карточек, мега-меню, горизонтальные треки.
- ⚠️ Стиль заметно «игровой». Это новая интонация для сайта.

### Способ 2. Вдавливание внутри габарита (внутренняя кромка)

```css
.button:active:not(:disabled) {
  transform: translateY(3em);
  box-shadow: inset 0 -2px 1px #2b00a380, inset 0 5px 10px #f0ebff4d;
}
```

- ✅ Кнопка выглядит так же, как сейчас. Кромка остаётся внутри кнопки, поэтому риска с `overflow` и отступами нет.
- ✅ Меньше правок: меняются только `transition` и добавляется `:active`.
- ⚠️ Эффект мягче: кнопка чуть проседает, внутренняя кромка сужается с 6px до 2px.

### Рекомендация: гибрид

| Где | Способ | Почему |
|---|---|---|
| L primary и secondary (hero, CTA, формы, sticky CTA) | 1, внешняя кромка | главные действия, вокруг них много воздуха, эффект виден лучше всего |
| M primary, secondary и outlined (карточки, Load more) | 1, кромка 4em | карточки проверить на `overflow` |
| S (мега-меню, Read more), чипы, табы | 2, внутренняя | плотная вёрстка, чипы не должны «прыгать» |
| `is-text-no-pointer` (бейдж категории) | без эффекта | это не кнопка |

## 4. Детали, которые нужно учесть

1. **Тайминги.** Нажатие 60ms, как в референсе. Отпускание 120ms, чтобы кнопка «пружинила», а не отскакивала. Смена цвета при ховере остаётся 200ms. `transition: all` убрать.
2. **Ховер.** Сейчас при наведении нижняя кромка пропадает, то есть кнопка уже выглядит «наполовину нажатой». С push-эффектом это сбивает с толку. Предлагаю: при ховере кромка остаётся, меняется только верхний блик (подсветка), по желанию кнопка поднимается на 1em.
3. **Размеры в `em`.** Кромку задаём в `em` (6/4/3em): кнопка наследует шрифт от `body`, поэтому `em` ≈ 1px на 1440, и эффект масштабируется вместе с вёрсткой. Внутри статьи (`.rich-text-18`) кнопок нет, ловушки с `em` не будет. Если появятся, используем `calc(N * var(--em-px))`.
4. **Неактивное состояние.** `:active:not(:disabled):not([aria-disabled="true"])`: неактивная кнопка и кнопка во время отправки формы не вдавливаются.
5. **Клавиатура.** `:active` срабатывает от Space и Enter на `<button>`, но не на `<a>` по Enter. Это нормально. Пригодится `:focus-visible` из пункта 6 основного плана.
6. **Мобильные.** В iOS Safari `:active` срабатывает, только если на странице есть обработчик `touchstart`. React вешает его на корень приложения, но это надо проверить на реальном iPhone. Если не сработает, в [`pages/_app.tsx`](pages/_app.tsx) добавить пустой пассивный `touchstart`-слушатель.
7. **`prefers-reduced-motion`.** Движение не выполняем, меняется только кромка.
8. **Мобильная рамка `outlined`.** Около строки 5116 в shared CSS рамка становится 1px. Кромку для мобильных проверить отдельно.
9. **Где писать CSS.** Прямо в [`setproduct.webflow.shared.css`](public/css/setproduct.webflow.shared.css:2411), рядом с определениями кнопок, а токены цветов положить в `:root` (строка 2092). Если писать в `globals.css`, исход зависит от порядка подключения файлов (Webflow CSS подключается через `<link>` в `_document`). Такая схема ненадёжна.

## 5. Черновик CSS (способ 1 для L и M, способ 2 для S)

```css
:root {
  --primary-edge: #5426d1;
  --secondary-edge: #d8caf6;
  --outlined-edge: #eae6f6;
  --chip-active-edge: #937dd1;
  --press-in: .06s;
  --press-out: .12s;
}

.button, .button-small {
  --edge: 6em;
  --edge-color: var(--primary-edge);
  --shine: inset 0 5px 10px #f0ebff4d;
  box-shadow: 0 var(--edge) 0 var(--edge-color), var(--shine);
  transition: transform var(--press-out) ease, box-shadow var(--press-out) ease, background-color .2s;
}
.button-small { --edge: 4em; }

.button.secondary, .button-small.secondary { --edge-color: var(--secondary-edge); --shine: inset 0 4px 4px #ffffff26; }
.button-small.outlined { --edge-color: var(--outlined-edge); --shine: 0 0 0 #0000; }

.button:hover, .button-small:hover {
  box-shadow: 0 var(--edge) 0 var(--edge-color), inset 0 5px 14px #f0ebff66;
}

.button:active:not(:disabled):not([aria-disabled="true"]),
.button-small:active:not(:disabled):not([aria-disabled="true"]) {
  transform: translateY(calc(var(--edge) - 1em));
  box-shadow: 0 1em 0 var(--edge-color), var(--shine);
  transition-duration: var(--press-in);
}

/* S и чипы: вдавливание внутри габарита */
.button-x-small { transition: transform var(--press-out) ease, box-shadow var(--press-out) ease, background-color .2s; }
.button-x-small:active:not(:disabled) {
  transform: translateY(2em);
  box-shadow: inset 0 -1px 1px #2b00a380, inset 0 3px 10px #f0ebff4d;
  transition-duration: var(--press-in);
}
.button-x-small.is-text:active:not(:disabled) { box-shadow: inset 0 -1px 1px #2b00a31a; }

@media (prefers-reduced-motion: reduce) {
  .button:active, .button-small:active, .button-x-small:active { transform: none; }
}
```

Табы `button-small tab` сохраняют `box-shadow: none` и эффект не получают.

## 6. Как проверить

- Прототип: одна страница с матрицей «размер × вариант × состояние» (обычная, ховер, нажата, неактивная) до переноса на весь сайт.
- Ширины 1440 / 1024 / 768 / 390, реальный iPhone и Android.
- Места с риском обрезки: карточки шаблонов и freebies, мега-меню, sticky CTA, модалка контакта, подписка в футере.
- Отступ под кнопкой до следующего блока (способ 1 визуально съедает 4–6em).

## 7. Решения после ревью прототипа

- **Кромка у outlined** — фирменный фиолетовый `--outlined-edge: var(--primary)`. Рядом с primary кнопка выглядит такой же высоты.
- **Ховер.** Кромка остаётся, внутри кнопки сверху и снизу появляется мягкое внутреннее свечение (inner shadow), как у текущей primary:
  - primary: `--primary-glow: #f0ebff4d` (светлее заливки);
  - secondary: `--secondary-glow: #d3bff9` (на тон темнее `--light-primary`);
  - outlined: `--outlined-glow: #ece4ff` (на тон темнее белого);
  - сила свечения: 5px у L, 4px у M, 3px у S secondary, размытие 8–10px.
- **Ripple на чистом CSS.** Кольцо на `::after` через `box-shadow` и двухфазный transition:
  - кнопка дошла до нижней точки (через `--press-in`) → кольцо мгновенно появляется вплотную к ней;
  - кнопку отпустили → кольцо за `--ripple-out: 520ms` расходится наружу и тает;
  - радиус разлёта: 14em у L, 11em у M, 8em у S;
  - цвет: `--ripple-primary: #7c4dff47` у primary, `--ripple-soft: #7c4dff33` у остальных;
  - ограничение: CSS не умеет перезапускать анимацию по клику, поэтому ripple играет при отпускании; в замороженном состоянии «pressed» его нет;
  - `prefers-reduced-motion`: ripple скрыт.
- **Риск для прода:** кольцо выходит за кнопку на 8–14em, поэтому его обрежет любой предок с `overflow: hidden` (карточки, мега-меню, sticky CTA). Проверить вместе с кромкой (пункт 13).

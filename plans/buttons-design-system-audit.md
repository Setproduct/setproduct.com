# Аудит кнопок setproduct.com и план перехода к дизайн-системе

## 1. Как кнопки устроены сейчас

Кнопки в проекте — это **CSS-классы из Webflow**, а не React-компоненты. Каждый компонент заново собирает кнопку руками из 3–4 классов:

```jsx
<a className="button-small outlined w-inline-block" href="...">
  <div className="text-size-medium text-weight-bold">Learn More</div>
  <div className="button-icon is-small w-embed"><ArrowIcon /></div>
</a>
```

Из чего складывается одна кнопка:

| Слой | Класс | За что отвечает |
|---|---|---|
| Размер + базовый вид | `button` / `button-small` / `button-x-small` | Высота, паддинги, скругление, фиолетовая заливка, 3D-тень |
| Вариант | `secondary`, `outlined`, `is-secondary`, `is-outlined`, `is-text`, `tab` | Цвет фона/текста/бордера |
| Webflow-служебный | `w-inline-block` | `display: inline-block` для `<a>` |
| Текст (отдельный div) | `text-size-large/medium/regular/small` + `text-weight-bold/semibold` | Размер и жирность подписи |
| Иконка (отдельный div) | `button-icon` / `button-icon is-small` + `w-embed` | Размер стрелки |
| Обёртка ряда | `template-list-btn-wr`, `hero-cta-row`, `buttons-row`, `btn-link-align-center`, `button-form-wr`, `heading-left-text-btn-wr`, `nav_tabs-list-item-btn-wr`, `main_blog-liist2-btn-wr`… | Выравнивание и отступ между кнопками |

Определения: [`setproduct.webflow.shared.css`](../public/css/setproduct.webflow.shared.css) строки 2411–2619, иконки 2931–2941, мобильные правки ~5116–5191. Дополнительные точечные стили — в [`styles/globals.css`](../styles/globals.css).

## 2. Матрица «размер × вариант» (что реально есть в CSS)

| Размер | Паддинги | Скругление | Primary | Secondary | Outlined | Text / ghost | Прочее |
|---|---|---|---|---|---|---|---|
| `button` (L) | 9/40/11em | 20em | ✅ | ✅ `.secondary` | ⚠️ `.outlined` есть, не используется | ❌ | — |
| `button-small` (M) | 6/28/7em | 16em | ✅ | ✅ `.secondary` | ✅ `.outlined` | ❌ | `.tab`, `.is-scroll-up` |
| `button-x-small` (S) | 3/24/4em | 12em | ⚠️ базовый, почти не используется | ✅ `.is-secondary` | ⚠️ `.is-outlined` не используется | ✅ `.is-text`, `.is-text-no-pointer` | `.is-templates`, `.is-tag`, `.fs-cmsfilter_active` |

Мёртвый код: `.button_old`, `.button.outlined`, `.button-x-small.is-outlined`, глобальный `.outlined` (px-бордер и хардкод `#7c4dff` вместо `var(--primary)`).

## 3. Фактическая логика использования (по ~60 местам в `components/`)

| Роль в интерфейсе | Как сделано | Где |
|---|---|---|
| Главное действие страницы / hero | `button` | [`HomePage`](../components/pages/HomePage.tsx), [`TemplateHero`](../components/sections/TemplateHero.tsx), [`TemplateCtaHire`](../components/sections/TemplateCtaHire.tsx), [`BlogInlineCta`](../components/blog/BlogInlineCta.tsx) |
| Второе действие рядом с главным / «See all» у секции | `button secondary` | [`HomePage`](../components/pages/HomePage.tsx), [`FreebiesShowcase`](../components/sections/FreebiesShowcase.tsx), [`BlogRelatedPosts`](../components/blog/BlogRelatedPosts.tsx), [`SearchPage`](../components/pages/SearchPage.tsx) |
| Сабмит формы (подписка, контакт) | `button` в `button-form-wr` | [`SiteFooter`](../components/layout/SiteFooter.tsx), [`CtaSubscribe`](../components/sections/CtaSubscribe.tsx), [`BlogSidebar`](../components/blog/BlogSidebar.tsx), [`ContactModal`](../components/modals/ContactModal.tsx) |
| Buy в карточке | `button-small` + стрелка | [`TemplateCard`](../components/sections/TemplateCard.tsx), [`SliderTemplateCard`](../components/sections/SliderTemplateCard.tsx) |
| Learn more / Duplicate в карточке | `button-small outlined` | те же, [`FreebieTemplateCard`](../components/sections/FreebieTemplateCard.tsx), [`TemplatePricing`](../components/sections/TemplatePricing.tsx) |
| Load more | `button-small outlined` **на `<a href="#">`** или `button secondary` на `<button>` | [`TemplateGrid`](../components/sections/TemplateGrid.tsx), [`BlogListingPage`](../components/pages/BlogListingPage.tsx), [`AuthorPage`](../components/pages/AuthorPage.tsx), [`FreebiesListingPage`](../components/pages/FreebiesListingPage.tsx) vs [`SearchPage`](../components/pages/SearchPage.tsx) |
| Read more в карточке поста | `button-x-small is-text` + стрелка | [`BlogPostsHome`](../components/sections/BlogPostsHome.tsx), [`BlogRelatedPosts`](../components/blog/BlogRelatedPosts.tsx), [`SiteHeader`](../components/layout/SiteHeader.tsx) |
| View / Duplicate в мега-меню | `button-x-small is-secondary` | [`SiteHeader`](../components/layout/SiteHeader.tsx) |
| Фильтры-чипы / табы категорий | 4 разных реализации: `button-x-small is-text` на `<div onClick>`, `button-x-small is-text is-templates`, `blog_list-filters-item`, `button-small tab` | [`BlogPostsHome`](../components/sections/BlogPostsHome.tsx), [`CategoryTabs`](../components/sections/CategoryTabs.tsx), [`SearchPage`](../components/pages/SearchPage.tsx), [`TemplateTabs`](../components/sections/TemplateTabs.tsx) |
| Бейдж категории (не кликабельный по смыслу) | `button-x-small is-text-no-pointer` | [`BlogHero`](../components/blog/BlogHero.tsx) |
| Иконочные кнопки | 6 разных решений: `button-small is-scroll-up`, `modal_close-btn`, `code-copy-btn`, `blog-floating-share`, `menu-button w-nav-button`, Tailwind-кнопка «очистить поиск» | [`ScrollUpButton`](../components/layout/ScrollUpButton.tsx), [`ContactModal`](../components/modals/ContactModal.tsx), [`CodeBlock`](../components/blog/CodeBlock.tsx), [`BlogFloatingShare`](../components/blog/BlogFloatingShare.tsx), [`SiteHeader`](../components/layout/SiteHeader.tsx), [`SearchPage`](../components/pages/SearchPage.tsx) |
| Inline-ссылка-кнопка | Tailwind с нуля (dotted underline) | [`SearchPage`](../components/pages/SearchPage.tsx) строка 249 |
| Sticky CTA | `button` + `template-sticky-cta-btn` (дублирует тени `.button` вручную) | [`TemplateStickyCta`](../components/sections/TemplateStickyCta.tsx) |

Неявное правило, которое всё же читается: **L — для секций и форм, M — для карточек, S — для меню, чипов и «Read more»**. Primary = одно главное действие, secondary/outlined = второе. Но нигде это не записано.

## 4. Проблемы

### 4.1. Системные
1. **Нет единого компонента.** Одна и та же кнопка «Buy + стрелка» скопирована в 2 карточки, «Read more» — в 4 места, стрелка иногда `ArrowIcon`, иногда inline-SVG (дубликат в [`BlogRelatedPosts`](../components/blog/BlogRelatedPosts.tsx), [`ScrollUpButton`](../components/layout/ScrollUpButton.tsx)).
2. **Несогласованные имена модификаторов:** `secondary`/`outlined` у L и M, но `is-secondary`/`is-outlined` у S.
3. **Размер подписи не привязан к размеру кнопки.** Размер текста задаётся отдельным div, поэтому L+`text-size-large`, M+`text-size-medium`, S+`text-size-regular` или `text-size-small` — легко перепутать.
4. **Зоопарк обёрток-рядов** (10+ классов `*-btn-wr`) вместо одного `buttons-row`.
5. **Текст кнопок в Title Case**, что нарушает правило sentence case из AGENTS.md: `Learn More`, `Load More`, `Read All`, `See All`, `More Preview`, `Publish with Us`.

### 4.2. Состояния
| Состояние | Есть? |
|---|---|
| hover | ✅ только смена тени |
| focus-visible | ❌ ни у одного `.button*` (клавиатурная навигация не видна) |
| active / pressed | ❌ |
| disabled | ⚠️ 3 с��особа: `disabled:opacity-70` (Tailwind), `style={{opacity}}` inline (футер), ничего (ContactModal) |
| loading | ⚠️ спиннер только в футере, SVG вставлен inline |
| selected / current | ⚠️ 4 способа: `w--current`, `is-active`, `fs-cmsfilter_active`, `aria-selected` |

### 4.3. Семантика и доступность
- `<a href="#" onClick>` для действий «Load more» (4 места) — должен быть `<button>`.
- `<div onClick>` для фильтров в [`BlogPostsHome`](../components/sections/BlogPostsHome.tsx) — не фокусируется с клавиатуры.
- Бейдж категории стилизован как кнопка (`is-text-no-pointer`) — визуально обещает клик.
- Внешние ссылки/Gumroad частично через [`getGumroadLinkProps`](../lib/gumroad.ts), частично вручную.

## 5. Каких типов не хватает

| Тип | Зачем |
|---|---|
| **Ghost / text** для L и M | Третий уровень важности (например «Cancel» в модалке, «Skip») |
| **Icon-only** как вариант системы (S/M/L, круглый) | Закрыть 6 разрозненных решений |
| **Link-button** (inline, подчёркнутый) | Вместо Tailwind-кнопки в поиске и ссылок-действий в тексте |
| **Chip / filter** как отдельный примитив | Объединить 4 реализации фильтров и табов |
| **Состояния** focus-visible, disabled, loading | Доступность и консистентность форм |
| **Full-width** модификатор | Сейчас делается через `w-full` или media-правила в globals.css |
| **Button group / row** | Один класс для отступов между кнопками |
| Destructive / danger | Сейчас не нужен (нет удаления данных) — зарезервировать токен, не делать |

## 6. Варианты реорганизации

### Вариант A. «Причесать CSS» (минимальный)
- Оставить классы Webflow, удалить мёртвые, добавить алиасы `is-secondary`/`is-outlined` для L и M.
- Добавить в `globals.css` общие `:focus-visible`, `:disabled`, `.is-loading` для всех `.button*`.
- Исправить Title Case и `href="#"`.
- Плюс: ноль риска для вёрстки. Минус: копипаста разметки остаётся.

### Вариант B. React-примитив `<Button>` поверх существующих классов (рекомендую)
Один компонент в `components/ui/Button.tsx`, который **генерирует те же Webflow-классы**, поэтому визуально ничего не меняется:

```tsx
<Button size="md" variant="primary" href={buyHref} iconRight="arrow">Buy $49</Button>
<Button size="md" variant="outlined" href={`/templates/${slug}`}>Learn more</Button>
<Button size="lg" type="submit" loading={isSubmitting}>Subscribe</Button>
<IconButton size="md" icon="arrow-up" aria-label="Scroll to top" />
<Chip selected={active} onClick={...}>UI Design</Chip>
```

API:

| Проп | Значения | Во что превращается |
|---|---|---|
| `size` | `lg` / `md` / `sm` | `button` / `button-small` / `button-x-small` + правильный `text-size-*` и `button-icon` |
| `variant` | `primary` / `secondary` / `outlined` / `ghost` | `""` / `secondary`·`is-secondary` / `outlined`·`is-outlined` / `is-text` |
| `href` | строка | `<Link>` для внутренних, `<a>` + `getGumroadLinkProps` для внешних |
| без `href` | — | `<button type="button">` |
| `iconRight` / `iconLeft` | `arrow` и т.д. | `<ArrowIcon>` в `button-icon` |
| `loading`, `disabled` | boolean | `aria-busy`, спиннер, класс `is-disabled` |
| `fullWidth` | boolean | `is-full-width` |

Плюс: разметка в 1 строку, правило «какой размер текста к какой кнопке» зашито в код, `<a>` vs `<button>` выбирается автоматически. Минус: миграция ~60 мест (делается по одному компоненту за коммит).

### Вариант C. Полная токен-система на Tailwind v4 `@theme`
Перенести цвета, тени, радиусы кнопок в `@theme`, переписать кнопки на Tailwind-утилиты + `cva`. Минус: противоречит правилу проекта «em-шкала Webflow» (Tailwind в `rem` не масштабируется с вёрсткой), нужна новая зависимость. **��е рекомендую** на текущем этапе.

## 7. Документировать правила (для AGENTS.md)
1. Одна primary-кнопка на экран/секцию. Второе действие — secondary (L) или outlined (M в карточке).
2. L — hero, секции, формы. M — карточки, пагинация, мобильные CTA. S — мега-меню, «Read more», чипы.
3. Действие без перехода → `<button>`; переход → `<Link>`/`<a>`. `href="#"` запрещён.
4. Некликабельное (бейдж категории) не оформляется как кнопка.
5. Текст кнопок — sentence case, 1–3 слова, глагол первым.
6. Стрелка `ArrowIcon` только у навигационных кнопок (ведут на другую страницу).

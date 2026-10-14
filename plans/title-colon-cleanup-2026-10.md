# Двоеточия в `title` — системный долг (октябрь 2026)

Работа идёт (начата 2026-10-14). Источник правила: `.roo/skills/seo/SKILL.md`
(двоеточие в title/metaTitle запрещено, режет сниппет в SERP) и
[`AGENTS.md`](../AGENTS.md:145).

## Масштаб

Проверено по `content/blog/*.mdx`: **50 постов из 185** имеют двоеточие
в `title` или `metaTitle`. Из них **19 — компонентные гайды**, то есть тот
же кластер, который в Wave 1 терял позиции.

Первичная оценка «47 из 184» считала только `title` и не видела `metaTitle`.
После исправления 27 постов (см. «Прогресс») остаётся 43 поста с двоеточием
в `title` или `metaTitle`.

## Распределение по длине (первичный снимок, 47 постов)

| Длина title | Постов | Комментарий |
|---|---|---|
| 44–54 | 10 | В норме по длине, но двоеточие есть |
| 55–59 | 13 | В норме |
| 60–64 | 6 | В норме |
| 66–78 | 18 | Плюс превышение лимита 65 |

То есть 18 постов нарушают сразу два правила: двоеточие и длина.

## Кластер 1: компонентные гайды (19 постов, приоритет)

Те, что уже известны по Wave 1 и по аудиту. Правка title/metaTitle здесь
даёт двойной эффект: убирает двоеточие и чинит сниппет на постах с
проблемным CTR.

- `accordion-ui-design` — `Accordion UI design: When to use it instead of tabs`
- `appbar-ui-design` — `App bar UI design: Vs nav bar, header, and toolbar`
- `avatar-ui-design` — `Avatar UI design: What to show when there's no photo`
- `badge-ui-design` — `Badge UI design: Notification, count, and status patterns`
- `button-ui-design` — `Button UI design: Every detail that makes a button work`
- `calendar-ui-design` — `Calendar vs date picker UI design: When to use each`
- `carousel-ui-design` — `Carousel UI design: When carousels actually work in 2026`
- `checkbox-ui-design` — `Checkbox UI design: Anatomy, states, and the indeterminate one`
- `effective-dashboard-design-principles` — `Dashboard design principles: 8 rules that actually work`
- `input-ui-design` — `Input UI design: States, anatomy, and validation patterns`
- `marketing-dashboard-ui-design-guide` — `Marketing dashboard UI design: Campaigns, ROI, and funnels`
- `notifications-ui-design` — `Notifications UI design: Why most apps annoy users instead`
- `pagination-ui-design` — `Pagination UI design: Offset vs keyset vs infinite scroll`
- `settings-ui-design` — `Settings UI design: Why users can''t find what they need`
- `stepper-ui-design` — `Stepper input UI design: The +/− quantity control done right`
- `tabs-ui-design` — `Tab UI design rules: When tabs work and when they fail`
- `toggle-switch-ui-design` — `Toggle switch UI design: When to use it and when not to`
- `liquid-glass-design-explained-a-practical-guide` — `Liquid glass design explained: a practical guide`
- `why-landing-page-optimization-is-essential` — `Landing page optimization: 8 rules that move conversion`

## Кластер 2: Title Case в title (отдельное нарушение)

Эти посты не только с двоеточием, но и с Title Case — двойное нарушение
[`AGENTS.md`](../AGENTS.md:69):

- `how-to-get-graphic-design-clients` — `How To Get More Graphic Design Clients: A Step-by-step Guide for Freelancers`
- `innovative-ideas-for-video-creation` — `Innovative Ideas For Video Creation: From Editing To Animation`
- `streamlining-website-development` — `Streamlining Website Development: Essential Tools For Agency Management`
- `mastering-javascript` — `Mastering JavaScript: Essential JavaScript Tricks and Tips For Web Developers`
- `know-before-designing-your-website` — `Conducting Market Research: What to Know Before Designing Your Website`
- `the-art-of-logo-design` — `The Art of logo design: Strategies for crafting a lasting visual identity`
- `most-stressful-design-phrases` — `Stressed out: Managing demands from unreasonable clients in graphic design`
- `overcome-middle-age-burnout` — `Life after 40: finding new energy and motivation`

## Остальные (низкий приоритет)

18 постов, которые формально нарушают правило, но по теме не критичны
(кейсы, ресурсы, крипта). Полный список — вывод команды из раздела
«Воспроизведение» ниже.

## Порядок работы (когда возьмёмся)

1. **Кластер 1 (19 компонентных гайдов).** Самая высокая отдача: двоеточие
   убирается у постов с проблемным CTR. Пачками по 5, каждый пост — по
   процедуре скилла `seo` (3 варианта title + выбор), затем правка
   `title` и `metaTitle` синхронно, самопроверка, коммит
   `seo: remove colon from title in [slug]`.
2. **Кластер 2 (8 постов с Title Case).** Там же правится и регистр.
3. **Остальные 18** — по остаточному принципу.

## Воспроизведение списка

```
grep -l "^title: " content/blog/*.mdx | while read f; do
  T=$(grep -m1 "^title:" "$f" | sed "s/^title: *//;s/^['\"]//;s/['\"]$//")
  case "$T" in *:*) printf "%-70s %s\n" "$(basename $f)" "$T";; esac
done
```

## Прогресс (2026-10-14)

Закрыто 27 файлов, по одному коммиту на файл, без push.

Первые 22 коммита отправлены в `origin/main` 2026-10-14
(`ee20dcd..57b32ed`).

### Батч 1 — компонентные гайды (коммиты `3d939dc` … `2bce528`)

| Slug | Было → стало (title) |
|---|---|
| `accordion-ui-design` | `Accordion UI design: When to use it instead of tabs` → `Accordion UI design, when to use it instead of tabs` |
| `appbar-ui-design` | `App bar UI design: Vs nav bar, header, and toolbar` → `App bar UI design vs nav bar, header, and toolbar` |
| `avatar-ui-design` | `Avatar UI design: What to show when there's no photo` → `Avatar UI design, what to show when there's no photo` |
| `calendar-ui-design` | `Calendar vs date picker UI design: When to use each` → `Calendar vs date picker UI design, when to use each` |
| `carousel-ui-design` | `Carousel UI design: When carousels actually work in 2026` → `Carousel UI design, when carousels actually work in 2026` |

### Батч 2 — компонентные гайды (коммиты `136b34f` … `98b00cf`)

| Slug | Было → стало (title) |
|---|---|
| `checkbox-ui-design` | `Checkbox UI design: Anatomy, states, and the indeterminate one` → `Checkbox UI design, anatomy, states, and the indeterminate one` |
| `effective-dashboard-design-principles` | `Dashboard design principles: 8 rules that actually work` → `Dashboard design principles that actually work` |
| `marketing-dashboard-ui-design-guide` | `Marketing dashboard UI design: Campaigns, ROI, and funnels` → `Marketing dashboard UI design, campaigns, ROI, and funnels` |
| `notifications-ui-design` | `Notifications UI design: Why most apps annoy users instead` → `Notifications UI design, why most apps annoy users instead` |
| `pagination-ui-design` | `Pagination UI design: Offset vs keyset vs infinite scroll` → `Pagination UI design, offset vs keyset vs infinite scroll` |

### Батч 3 — компонентные гайды (коммиты `46286a5` … `0584e89`)

| Slug | Было → стало (title) | metaTitle |
|---|---|---|
| `figma-tutorial-instances-management` | `Figma components tutorial: management for Instances` → `Figma components tutorial, instance management` | Title Case → `Figma components tutorial, how to manage instances` |
| `settings-ui-design` | `Settings UI design: Why users can't find what they need` → `Settings UI design, why users can't find what they need` | то же |
| `figma-tables-data-grid-design` | `Figma tables: Data grid design by a single cell-component` → `Figma tables, data grid design by a single cell-component` | `Learn How to Design a Table UI in Figma: Single Component Tutorial` (69) → `How to design a table UI in Figma with one cell component` |
| `stepper-ui-design` | `Stepper input UI design: The +/− quantity control done right` → `Stepper input UI design, the +/− quantity control done right` | то же |
| `how-to-design-dialogs` | `Dialog windows: a complete tutorial for designers and developers` → `Dialog UI design, a tutorial for designers and developers` (убрано запрещённое «complete») | `How to design dialogs: Error, Delete, Settings, Update` → `How to design dialogs, patterns and states` |

### Батч 4 — Design Trends, Case Studies, Growth (коммиты `866e4d6` … `6ae9833`)

| Slug | Было → стало (title) | metaTitle |
|---|---|---|
| `liquid-glass-design-explained-a-practical-guide` | `Liquid glass design explained: a practical guide` → `Liquid glass design explained, a practical guide` | то же |
| `liquid-glass-vs-glassmorphism` | `Glassmorphism, neumorphism, liquid glass: what to use in 2026` → `…, what to use in 2026` | синхронизирован |
| `why-landing-page-optimization-is-essential` | `Landing page optimization: 8 rules that move conversion` → `…, 8 rules that move conversion` | синхронизирован |
| `depth-in-ios-design` | `Name a bigger downgrade: The absence of depth in iOS UI design` → `Name a bigger downgrade, the absence of depth in iOS UI design` | `iOS 17 Design Trends: …` (69) → `Depth in iOS UI design, shadows and hierarchy` |
| `case-study-design-image-upload-component` | `Case study: Design iterations for Cleeve's image upload component` → `Case study, redesigning an image upload component` | `Image upload UI design: How iterative revisions lead to optimal form` (70) → `Image upload UI design, how iterative revisions shaped the form` |

### Вынужденные отклонения от брифа

- `case-study-design-image-upload-component`: предложенный title «Case study,
  design iterations for Cleeve's image upload component» давал 66 символов
  (экранирование `''` в YAML считается дважды), что выше жёсткого лимита 65.
  Заменён на «Case study, redesigning an image upload component» (49).
- `effective-dashboard-design-principles`: «Dashboard design principles, 8
  rules that actually work» отвергнут — после запятой перечисление читается
  хуже, чем версия без него. Принят «Dashboard design principles that
  actually work» (46).
- `how-to-design-dialogs`: в исходном title было запрещённое слово «complete»
  из списка скилла SEO, заменено в рамках той же правки.

### Батч 5 — Title Case (коммиты `a0a537e` … `991568f`)

Здесь правился не только регистр, но и двоеточие, а также найдены
дополнительные дефекты.

| Slug | Было → стало (title) | metaTitle и прочее |
|---|---|---|
| `innovative-ideas-for-video-creation` | `Innovative Ideas For Video Creation: From Editing To Animation` (64) → `Innovative video creation ideas, from editing to animation` | убран суффикс `- Setproduct` (77 → 45) |
| `streamlining-website-development` | `Streamlining Website Development: Essential Tools For Agency Management` (73) → `Streamlining web development with agency management tools` | убран суффикс `- Setproduct` (67 → 58) |
| `mastering-javascript` | `Mastering JavaScript: Essential JavaScript Tricks and Tips For Web Developers` (79) → `JavaScript tricks and tips for web developers` | убран суффикс `- Setproduct` (62 → 44) |
| `know-before-designing-your-website` | `Conducting Market Research: What to Know Before Designing Your Website` (72) → `Market research before designing your website` | регистр (45 → 49) |
| `the-art-of-logo-design` | `The Art of logo design: Strategies for crafting a lasting visual identity` (75) → `Logo design strategies for a lasting visual identity` | регистр (47) |
| `most-stressful-design-phrases` | `Stressed out: Managing demands from unreasonable clients in graphic design` (76) → `Managing unreasonable client demands in graphic design` | `Hated Graphic Design Client Phrases: Dealing with Stress` → `Stressful client phrases in graphic design` (42) |
| `overcome-middle-age-burnout` | `Life after 40: finding new energy and motivation` → `Life after 40, finding new energy and motivation` | удалены два символа `U+200B` (zero-width space) из начала metaTitle |

В четырёх файлах (`innovative-ideas-for-video-creation`,
`streamlining-website-development`, `mastering-javascript`,
`know-before-designing-your-website`) синхронизированы `coverImageAlt`:
они дублировали старый Title Case заголовок и нарушали правило sentence
case из [`AGENTS.md`](../AGENTS.md:93).

Исключён из батча: `how-to-get-graphic-design-clients` — на момент проверки
уже имел корректный title и metaTitle (sentence case, без двоеточия) и был
почищен в предыдущем заходе, хотя в исходном списке плана значился.

### Найденный долг, не входивший в задачу

В теле трёх постов `innovative-ideas-for-video-creation` (15 строк),
`mastering-javascript` (19 строк, преимущественно блок ссылок) и
`streamlining-website-development` (1 строка) обнаружены символы
`U+200B` в тексте. Это унаследованный мусор копипаста из Webflow, вне
frontmatter, поэтому по решению владельца не чистился в этом батче.
Кандидат на отдельный заход.

### Валидация после 27 файлов

- `npm run lint` (`tsc --noEmit`) — exit 0.
- `npm run build` — exit 0.
- Все 27 файлов: двоеточий в `title`/`metaTitle` нет, длины ≤ 65,
  `U+FFFD` = 0, запрещённого суффикса `- Setproduct` нет,
  `U+200B` во frontmatter нет.
- `content/blog` — рабочая копия чистая, всё закоммичено.

### Батч 6 — старые кейсы, ресурсы, технологии (коммиты `6ec3b3a` … `85bee22`)

Файлы: `adobe-stealing-designs` (metaTitle), `ais-impact-on-graphic-design`
(title + metaTitle), `black-friday-2023` (title + metaTitle),
`case-study-gtrendz` (title + metaTitle), `case-study-journeyapp` (metaTitle).

Попутно: `black-friday-2023` title был в Title Case, `case-study-gtrendz`
title 80 символов (сокращён до 54). Суффикс `- Setproduct` не встречался.

### Батч 7 — ресурсы, дизайн-системы, фриланс, Figma (коммиты `5700b86` … `85bee22`)

Файлы: `design-resources-feb-2021` (metaTitle), `design-system-for-business`
(metaTitle), `difficult-design-clients` (metaTitle), `figma-auto-layout-debate`
(metaTitle), `figma-plugins-productivity-boost` (metaTitle).

Попутно: в `figma-auto-layout-debate` из metaTitle убран запрещённый суффикс
`- Setproduct`.

### Валидация после 37 файлов

- `npm run lint` (`tsc --noEmit`) — exit 0.
- Все 37 файлов: двоеточий в `title`/`metaTitle` нет, длины ≤ 65,
  `U+FFFD` = 0, `U+200B` во frontmatter нет, суффикса `- Setproduct` нет.
- Найден предсуществующий долг, не входивший в задачу: у
  `figma-plugins-productivity-boost` title = 78 символов (правился только
  metaTitle). Зафиксирован, не чинился.

### Батч 8 — старые ресурсы, Figma, фриланс, продуктовые гайды (коммиты `a6ae971` … `0a1356b`)

10 файлов, правился `metaTitle` (в `how-to-design-a-ui-kit-foundation` — ещё и `title`):
`figma-resources-review-1`, `figma-responsive-mobile-components`,
`figma-summer-top-15`, `freelance-hourly-rate`, `getgradients-review`,
`getting-your-first-startup-users`, `how-to-3d-animate-scroll`,
`how-to-design-a-ui-kit-foundation`, `how-to-design-landing`, `how-to-sell-design-system`.

### Батч 9 — дизайн-системы, карьера, инструменты (коммиты `ef901a9` … `ad2ecf0`)

10 файлов: `how-to-study-saas-dashboard-in-the-ai-era`, `ios-lock-screen-feature`,
`liftkit-open-source-design-system-for-figma-react` (title + metaTitle),
`material-design-redesigned`, `monetizing-the-design-one-year` (title + metaTitle),
`navigating-the-job-market-storm`, `nocra-ui-kit-the-ai-design-system-with-templates`
(title + metaTitle), `quality-control-and-assurance-difference`, `remote-productivity`,
`side-income-for-designers-and-developers`.

### Батч 10 — последние 13 постов (коммиты `6a50964` … `b34322d`)

13 файлов: `solo-founder-tech-stack-2026` (title + metaTitle), `tables-design-system`,
`top-design-releases-2020`, `top-design-resources-jan-2021`,
`top-real-estate-app-development-companies-compared` (title),
`translate-website-using-ai-dont-forget-pdfs` (title + metaTitle), `unpaid-design-work`,
`useful-design-resources-fall-2020`, `user-profile-templates`,
`visual-elements-in-email-marketing` (title + metaTitle), `what-gets-designers-to-300k`,
`why-apps-ux-is-getting-worse`, `why-some-designers-dislike-ai`.

Особенность: у `visual-elements-in-email-marketing` title хранился как YAML folded
scalar (`>-`); первый `apply_diff` не совпал, применён повторно, попутно синхронизирован
дублирующий `coverImageAlt`.

### Валидация после 70 файлов

- `npm run lint` (`tsc --noEmit`) — exit 0.
- Все 70 файлов (батчи 1–10): двоеточий в `title`/`metaTitle` нет, `U+FFFD` = 0,
  суффикса `- Setproduct` в правленых полях нет.
- Новый скан всех 186 постов блога: двоеточие в `title`/`metaTitle` осталось в
  **1 посте** — `8-designers-developers-success` (Title Case, 81 символ, двоеточие).
  Он не входил ни в один выданный батч, не правился, зафиксирован отдельно.
- Предсуществующий долг длины (не создан этими правками): `title`/`metaTitle`
  длиннее 65 символов примерно в 30 постах, часть с суффиксом `- Setproduct`.
  В батчах 8–10 таких полей не создано: правленые `metaTitle` ≤ 65.

## Остаток после батчей 1–10

| Группа | Постов | Комментарий |
|---|---|---|
| Двоеточие в `title`/`metaTitle` | 1 | `8-designers-developers-success` (Title Case, вне батчей) |
| Двоеточия в H2/H3 тела | 0 | ЗАКРЫТО 2026-10-14 (21 двоеточие в 6 файлах, коммиты `c3c565d`…`c607419`) |
| `title`/`metaTitle` длиннее 65 | ~30 | предсуществующий долг, отдельный заход |
| Запрещённый суффикс `- Setproduct` | несколько | в старых `title`/`metaTitle` |
| `U+200B` в теле | 35 строк | `innovative-ideas-for-video-creation`, `mastering-javascript`, `streamlining-website-development` |

## Что НЕ делать

- Не менять title вслепую, без процедуры скилла `seo` (3 варианта + выбор
  владельца): это метаданные в живом SERP.
- Не трогать `slug` при правке title: URL-адреса должны остаться прежними.
- Не менять title и description в одном коммите с правками тела: причины
  изменения разные.

# FAQ-разметка как рычаг CTR — компонентные гайды (октябрь 2026)

## Итог одной строкой

22 гайда категории `UI Design` имеют видимый блок Q&A в теле и не имеют `faq:` во frontmatter. Добавляем `faq:` из этих блоков, чтобы `buildFaqJsonLd` (см. [`lib/blog/schema.ts`](../lib/blog/schema.ts:56)) начал отдавать FAQPage в `<head>` и расширил зацепку в SERP и AI Overview.

## Почему это работает

- [`components/blog/BlogPostLayout.tsx`](../components/blog/BlogPostLayout.tsx:35) рендерит FAQPage JSON-LD только когда во frontmatter есть `faq:`.
- Из 152 постов `faq:` был у 16. Компонентные гайды — самый крупный кластер блога и ядро UI-design трафика, у них разметки не было.
- JSON-LD требует content parity: вопрос и ответ в схеме должны быть видимы на странице. Поэтому источник — существующий видимый блок Q&A, а не придуманные вопросы.
- `faq:` даёт только схему. Видимый блок в теле не дублируется и остаётся на месте.

## Скоуп: 22 файла

| # | slug | строк | вопросов в теле | заголовок блока |
|---|---|---|---|---|
| 1 | avatar-ui-design | 206 | 7 | `## Userpic questions & answers` |
| 2 | badge-ui-design | 281 | 6 | `## Frequently asked questions` |
| 3 | breadcrumbs-ui-design | 415 | 7 | `## ❓ Breadcrumbs Q&A` |
| 4 | button-ui-design | 353 | 6 | `## Frequently asked questions` |
| 5 | chip-ui-design | 384 | 4 | `## Frequently asked questions` |
| 6 | dashboard-ui-design | 390 | 7 | `## Frequently asked questions` |
| 7 | data-table-ui-design | 519 | 8 | `## Frequently asked questions` |
| 8 | date-picker-ui-design | 362 | 7 | `## Frequently asked questions` |
| 9 | dropdown-ui-design | 448 | 5 | `## Frequently asked questions` |
| 10 | effective-dashboard-design-principles | 209 | 5 | `## Dashboard design questions and answers (FAQ)` |
| 11 | empty-state-ui-design | 466 | 6 | `## Empty state design questions and answers (FAQ)` |
| 12 | filter-ui-design | 795 | 4 | `## Frequently asked questions` |
| 13 | form-controls-reference-2026 | 384 | 6 | `## Frequently asked questions` |
| 14 | how-to-design-dialogs | 208 | 7 | `### FAQ: Dialog UI design` |
| 15 | notifications-ui-design | 522 | 8 | `## Notifications design FAQ` |
| 16 | radio-button-ui-design | 346 | 7 | `## Frequently asked questions` |
| 17 | slider-ui-design | 343 | 7 | `### **Frequently asked questions**` |
| 18 | stepper-ui-design | 190 | 7 | `## Stepper component FAQ` |
| 19 | steps-ui-design | 230 | 5 | `### Steps questions and answers (FAQ)` |
| 20 | strikethrough-text-deserves-more-love-in-ui | 122 | 7 | `## Common questions about strikethrough` |
| 21 | toggle-switch-ui-design | 284 | 7 | `### FAQ: Toggle UI design` |
| 22 | tooltip-ui-design | 304 | 8 | `## Frequently asked questions` |

Итого **22 файла**.

### Что НЕ входит

- `accordion-ui-design` — блока Q&A нет, только `## What is Accordion?` (определение, не вопрос→ответ).
- `appbar-ui-design` — видимого блока Q&A нет.
- `pagination-ui-design` — есть «?»-подзаголовки H5, но нет блока вопрос→ответ. Разметки из чего собирать нет.
- `how-to-design-landing` — заголовок `## Create a good FAQ section` это туториал «как писать FAQ», а не сам FAQ.
Оговорка по `effective-dashboard-design-principles`: заголовок `## Principle 1. Start from the user's question` это принцип, а не FAQ, но сам блок Q&A в теле есть (стр. 260), поэтому файл **входит** в скоуп.

## Правила копирования в `faq:`

1. Источник — видимый блок Q&A. Копируем 1:1 по смыслу.
2. Ответ очищаем до plain text (JSON-LD `text` — строка):
   - убрать ведущие маркеры: `❶ ❷ ➀ ➁`, `1\.`, `**1\.**`, `•`, `**`;
   - разэкранировать `\.` → `.`, `\(` → `(`;
   - снять markdown-ссылки до текста: `[text](url)` → `text`;
   - убрать inline-код backticks и подчёркивания `_em_` → текст;
   - убрать `**bold**` → текст.
3. Если ответ содержит em-dash (`—`), в схеме заменяем на запятую или двоеточие. Тело не трогаем.
4. Вопрос берём из подзаголовка блока, снимая нумерацию и маркеры.
5. Формат записи — как в [`content/blog/tabs-ui-design.mdx`](../content/blog/tabs-ui-design.mdx:36):
   ```yaml
   faq:
     - question: Что спросили?
       answer: >-
         Прямой ответ в plain text.
   ```

## Где вставлять `faq:`

Последним блоком frontmatter, перед закрывающим `---`. Если уже есть `relatedSlugs` или `thumbImage` — `faq:` идёт после них. В `tabs-ui-design` порядок: `thumbImage` → `faq` → `---`.

## Порядок работы: 4 батча

| Батч | Файлы | Заметка |
|---|---|---|
| 1 | strikethrough (122), stepper (190), avatar (206), how-to-design-dialogs (208), effective-dashboard-design-principles (209), steps (230), badge (281) | все < 300 строк |
| 2 | toggle-switch (284), tooltip (304), slider (343), radio-button (346), button (353), date-picker (362) | 284–362 |
| 3 | chip (384), form-controls-reference-2026 (384), dashboard (390), breadcrumbs (415), dropdown (448), empty-state (466) | 384–466 |
| 4 | data-table (519), notifications (522), filter-ui-design (795) | > 500 строк → только apply_diff |

Правило по [`AGENTS.md`](../AGENTS.md:84): файлы > 500 строк правим `apply_diff` по атомарным шагам, без `write_to_file`.

## Self-check перед каждым коммитом

```
F=content/blog/<slug>.mdx
echo "EM-DASH:"; grep -o '—' $F | wc -l
echo "HEADING COLONS:"; grep -cE '^#{2,3} .*:' $F
node -e 'const g=require("gray-matter"),fs=require("fs");const p=process.argv[1];const f=g(fs.readFileSync(p,"utf8"));if(!f.data.faq||!f.data.faq.length)process.exit(1);console.log("faq items:",f.data.faq.length)' $F
npm run lint 2>&1 | tail -1
```

Пороги: em-dash ≤ 2 (если по телу уже больше — это унаследованный долг тела, не наш; фиксируем цифру в отчёте); двоеточий в H2/H3 нет; `faq` парсится, число вопросов совпадает с числом в видимом блоке; `npm run lint` чистый.
Дополнительно: `npm run build` после последнего батча — страница должна собраться и отдать FAQPage в `<head>`.

## Коммиты (без push)

Один коммит на файл, сообщение `content: add faq schema to <slug>` (sentence case, английский). 22 файла, 22 коммита.

### Батч 1
| slug | коммит |
|---|---|
| strikethrough-text-deserves-more-love-in-ui | 3ca6390 |
| stepper-ui-design | c29359e |
| avatar-ui-design | 8d0733d |
| how-to-design-dialogs | 960356a |
| effective-dashboard-design-principles | bbe5c74 |
| steps-ui-design | f87b8aa |
| badge-ui-design | 4f133a4 |

### Батч 2
| slug | коммит |
|---|---|
| toggle-switch-ui-design | 17c7214 |
| tooltip-ui-design | bfa2e3b |
| slider-ui-design | b861676 |
| radio-button-ui-design | 00fd2e9 |
| button-ui-design | a932b6f |
| date-picker-ui-design | e41c517 |

### Батч 3
| slug | коммит |
|---|---|
| chip-ui-design | 45bedae |
| form-controls-reference-2026 | 587bd21 |
| dashboard-ui-design | c3e3974 |
| breadcrumbs-ui-design | 6617ad5 |
| dropdown-ui-design | b97c28b |
| empty-state-ui-design | a3a4c8d |

### Батч 4 (> 500 строк, только apply_diff)
| slug | коммит |
|---|---|
| data-table-ui-design | dd15982 |
| notifications-ui-design | d2dfd1e |
| filter-ui-design | fcf7907 |

## Что НЕ делаем

- Не трогаем тело статей: видимый блок Q&A остаётся как есть.
- Не правим существующие `faq:` у 16 постов.
- Не добавляем вопросы, которых нет в видимом блоке (content parity).
- Не дублируем и не переносим блок FAQ в другое место.
- Не меняем title/description/slug в этом батче — это отдельный долг (двоеточия в title).
- Не коммитим больше одного файла за раз.

## Self-check: фактические цифры (финальный прогон)

- Постов в блоге на момент прогона: **185** (не 152 — выросли за период).
- Постов с `faq:` было **16** → стало **38** (+22).
- `npm run lint` (`tsc --noEmit`): чисто, exit 0.
- `npm run build`: успешно, exit 0, все страницы prerendered.
- em-dash: у `notifications-ui-design` 2 (унаследованный долг тела, не наш); у data-table и filter — 0. Дельта по всем файлам = 0.
- Двоеточий в H2/H3: 0 во всех файлах скоупа. Дельта = 0.
- Трихолоны: дельта = 0 по каждому файлу (базовые значения: data-table 43, notifications 54, filter 52 — унаследованный долг тела).
- Запрещённые конструкции («Not X, but Y», строки, начинающиеся с «Not»): не найдены.
- Пять ответов были переписаны, чтобы не добавить новых трихолонов: avatar, effective-dashboard-design-principles, steps (×2), badge (батч 1); tooltip, date-picker (×2) (батч 2); empty-state (×2) (батч 3). В батче 4 новых трихолонов не появилось.

## Замер

- До/после числа страниц с `faq:`: 16 → 38.
- GSC: показатели FAQ-разметки появятся в «Вид в поиске» / расширенных результатах через 2–4 недели после индексации.
- Прямая проверка: Rich Results Test на паре URL после деплоя.

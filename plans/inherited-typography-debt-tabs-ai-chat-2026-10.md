# Унаследованный типографический долг: tabs-ui-design и ai-chat-interface-ui-design (октябрь 2026)

Разбор без правок. Ни одна строка в `content/blog/` этим файлом не меняется.

## Статус: ЗАКРЫТ (2026-10-15)

Все три захода выполнены, проверено командой на текущем состоянии файлов.

| Заход | Коммит | Что сделано |
|---|---|---|
| 1. Двоеточия в заголовках ai-chat | `93339ee` | 8 двоеточий снято, теперь 0 |
| 2. Em-dash ai-chat | `c3fe790` | 39 → 0 |
| 3. Трихолоны и мелочь | `5e401f2` (tabs), `c6907e3` (ai-chat) | трихолоны переписаны, банклише снято, `subtitle` без эха, FAQ синхронизирован |

Замер на 2026-10-15:

| Метрика | tabs-ui-design | ai-chat-interface-ui-design | Лимит |
|---|---|---|---|
| Em-dash всего | 2 | 0 | ≤ 2 |
| Двоеточия в H2/H3 | 0 | 0 | 0 |
| Строгие трихолоны | 1 | 2 | ≤ 2 |
| Банклише | 0 | 0 | 0 |
| `faq:` во frontmatter | — | 7 (синхронизирован) | — |
| Строк в файле | 528 | 454 | — |

Побочный эффект смены якорей (§2) реализован: `id` заголовков ai-chat
изменились вместе с текстом. Внутренних ссылок на эти якоря в контенте нет,
sitemap якорей не содержит, оглавление сайдбара пересчитывается автоматически.
Дальнейших действий файл не требует.

## 0. Итог одной строкой

У ai-chat 39 em-dash (лимит 2) и 8 двоеточий в заголовках, у tabs 17 трихолонов (лимит 2) и одно банклише. Полная чистка — это переписывание ~90 фрагментов в двух файлах; предлагаю разбить на три изолированных захода и начать с того, что даёт SEO-эффект (заголовки), а не с того, что «просто нарушение».

## 1. Что именно нарушено (факты прогона)

| Метрика | tabs-ui-design | ai-chat-interface-ui-design |
|---|---|---|
| Строк в файле | 529 | 445 |
| Em-dash, всего | **2** (в пределах лимита) | **39** (лимит 2) |
| Em-dash во frontmatter | 0 | 0 |
| En-dash (диапазоны чисел) | 8 | 8 |
| Двоеточия в H2/H3 | **0** | **8** |
| Строгих трихолонов (тело) | **17** | 18 |
| Трихолонов во frontmatter | 2 | 1 |
| Банклише | 1 («Seamless») | 0 |
| Запрещённые переходы в начале абзаца | 0 | 0 |
| «Not X, but Y» | 0 | 0 |
| Эхо «not X, and not Y» | 0 | 1 (в `subtitle`) |
| Слов в теле | 4281 | 5317 |
| Список из 4+ элементов через запятую | 8 | 5 |

Метод замера: `python3` по нормализованному тексту (свёрнутый YAML разворачивался в одну строку, иначе построчный grep пропускает `subtitle`, `description`, `cardDescription` и `inlineCta`). Регулярка строгого трихолона требует ровно три элемента, разделённых запятыми и закрытых `and`/`or`.

## 2. Двоеточия в заголовках ai-chat (8 штук) — правим первыми

Это единственная часть долга, которая влияет на выдачу: двоеточие в заголовке-разделе работает как тайтл и режется в SERP.

| Строка | Сейчас | Предлагается |
|---|---|---|
| 214 | `## Layout patterns: desktop vs mobile` | `## Layout patterns for desktop and mobile` |
| 220 | `### Desktop: the two-pane standard` | `### Desktop, the two-pane standard` |
| 224 | `### Desktop: the IDE embed` | `### Desktop, the IDE embed` |
| 228 | `### Mobile: single column, full bleed` | `### Mobile, single column and full bleed` |
| 232 | `### Mobile: the input-first pattern` | `### Mobile, the input-first pattern` |
| 246 | `## When to use what: AI chat vs alternatives` | `## When to use AI chat instead of alternatives` |
| 290 | `## Accessibility: critical and often skipped` | `## Accessibility, critical and often skipped` |
| 320 | `## Anti-patterns: what kills AI chat UX` | `## Anti-patterns that kill AI chat UX` |

Замена — запятая или перестройка фразы. Двоеточие внутри прозы (не в заголовке) правилом не запрещено, поэтому в описаниях ниже я его иногда оставляю.

**Побочный эффект, о котором нужно знать заранее.** Смена текста H2/H3 меняет `id` якоря (генерируется из заголовка в `rehype-slug`). Старые ссылки вида `/blog/ai-chat-interface-ui-design#layout-patterns-desktop-vs-mobile` перестанут попадать на нужный раздел. Внутри статей таких ссылок нет, в sitemap якорей нет (см. `plans/anchor-url-investigation.md`), поэтому риск ограничен: внешние ссылки на конкретный раздел, если они вообще существуют. Сайдбарное оглавление пересчитается автоматически.

## 3. Em-dash ai-chat: 39 → 2 (полная таблица)

Каждое вхождение имеет механическую замену. Тип замены: `,` — придаточная в том же предложении, `.` — отдельное предложение, `:` — раскрытие (в прозе разрешено), `()` — вставка.

| № | Строка | Сейчас (фрагмент) | Предлагается |
|---|---|---|---|
| 1 | 110 | `is now expected — if you ship AI chat without it, users assume their history is gone.` | `is now expected. Ship AI chat without it and users assume their history is gone.` |
| 2 | 114 | `acts like a tab pattern — same logic of mutually exclusive choices, one active at a time.` | `acts like a tab pattern. Same logic of mutually exclusive choices, one active at a time.` |
| 3 | 118 | `Use a comfortable max-width — Claude.ai uses around 768 pixels, ChatGPT around 768, Perplexity around 720.` | `Use a comfortable max-width. Claude.ai and ChatGPT use around 768 pixels, Perplexity around 720.` |
| 4 | 122 | `fork or replace the conversation from that point — make the choice explicit, do not silently lose context.` | `fork or replace the conversation from that point. Make the choice explicit, do not silently lose context.` |
| 5 | 126 | `Rendered as rich Markdown — headings, lists, code blocks with copy button, tables, math, sometimes diagrams.` | `Rendered as rich Markdown: headings, lists, code blocks with a copy button, tables, math, and sometimes diagrams.` |
| 6 | 130 | `Shift+Enter` for newline — match those defaults.` | `` `Shift+Enter` for newline. Match those defaults.`` |
| 7 | 138 | `which is a domain-specific action — design yours around the actual jobs your users do, not a generic toolbar.` | `which is a domain-specific action. Design yours around the actual jobs your users do, not a generic toolbar.` |
| 8 | 154 | `Do not show a percentage progress bar — there is no progress to report and a fake one breaks trust` | `Do not show a percentage progress bar. There is no progress to report, and a fake one breaks trust` |
| 9 | 158 | `Label it honestly — `Thinking`, `Reasoning`, or `Searching the web` — not vague terms like `Working on it`.` | `Label it honestly, with `Thinking`, `Reasoning`, or `Searching the web` instead of vague terms like `Working on it`.` |
| 10 | 166 | `Cursor adds token count and cost — useful for power users, distracting for everyone else.` | `Cursor adds token count and cost, useful for power users and distracting for everyone else.` |
| 11 | 170 | `into a generic "Something went wrong" — that is the laziest possible failure UX` | `into a generic "Something went wrong". That is the laziest possible failure UX` |
| 12 | 178 | `Do not delete the partial output — it may already be useful.` | `Do not delete the partial output. It may already be useful.` |
| 13 | 192 | `the mistake is dropping the caret entirely — without it, a paused stream looks identical to a finished one.` | `the mistake is dropping the caret entirely. Without it, a paused stream looks identical to a finished one.` |
| 14 | 204 | `Hide it the moment streaming ends — leaving it visible after completion is a small bug` | `Hide it the moment streaming ends. Leaving it visible after completion is a small bug` |
| 15 | 222 | `only when there is something to show — keeping it persistent wastes space` | `only when there is something to show. Keeping it persistent wastes space` |
| 16 | 226 | `do not give chat a full-page layout — users want to see code and chat at the same time` | `do not give chat a full-page layout. Users want to see code and chat at the same time` |
| 17 | 238 | `iOS safe-area handling matters here — test on a notched device before shipping.` | `iOS safe-area handling matters here. Test on a notched device before shipping.` |
| 18 | 256 | `Cursor and GitHub Copilot Chat — chat is necessary but the diff is the product.` | `Cursor and GitHub Copilot Chat, where chat is necessary but the diff is the product.` |
| 19 | 259 | `Linear AI and Raycast — faster than typing a sentence.` | `Linear AI and Raycast, faster than typing a sentence.` |
| 20 | 272 | `The design lesson here is restraint — these products earn trust` | `The design lesson here is restraint. These products earn trust` |
| 21 | 276 | `Chat is one surface among several — inline edit, agent mode, terminal command suggestions.` | `Chat is one surface among several: inline edit, agent mode, terminal command suggestions.` |
| 22 | 276 | `` `Open in editor` — chat without action is just expensive documentation.`` | `` `Open in editor`. Chat without action is just expensive documentation.`` |
| 23 | 280 | `asking users to take your word for it — and current LLMs do not deserve that yet.` | `asking users to take your word for it, and current LLMs do not deserve that yet.` |
| 24 | 288 | `The handoff must be visible — a banner that says "Connecting you to a person" with an ETA.` | `The handoff must be visible, with a banner that says "Connecting you to a person" and an ETA.` |
| 25 | 298 | `Use `polite` not `assertive` — assertive interrupts and is hostile during a long reply.` | `Use `polite` rather than `assertive`. Assertive interrupts and is hostile during a long reply.` |
| 26 | 302 | `Every action — send, stop, regenerate, copy, edit, switch model — needs a keyboard path.` | `Every action needs a keyboard path: send, stop, regenerate, copy, edit, switch model.` |
| 27 | 306 | `do not steal focus — let the user decide where to go next.` | `do not steal focus. Let the user decide where to go next.` |
| 28 | 314 | `the auto-scroll — all of it needs to respect `prefers-reduced-motion`.` | `the auto-scroll. All of it needs to respect `prefers-reduced-motion`.` |
| 29 | 328 | `apply here — show the actual error class — rate limit, content filter, network drop — and the action that fixes it.` | `apply here. Show the actual error class (rate limit, content filter, network drop) and the action that fixes it.` |
| 30 | 340 | `appear on hover too — give the user time to ignore them.` | `appear on hover too. Give the user time to ignore them.` |
| 31 | 422 | `take 10 to 30 seconds for long replies — that is fine as long as streaming starts quickly` | `take 10 to 30 seconds for long replies, and that is fine as long as streaming starts quickly` |
| 32 | 426 | `retrieval-augmented generation, yes — citations are non-negotiable for trust.` | `retrieval-augmented generation, yes. Citations are non-negotiable for trust.` |
| 33 | 442 | `giving the chat real context — the current document, the selected text, the active project — so the answers are grounded` | `giving the chat real context (the current document, the selected text, the active project), so the answers are grounded` |
| 34 | 444 | `is here to get something done — not to admire your animation work.` | `is here to get something done, not to admire your animation work.` |

Пункты 9, 26, 29 и 33 снимают по 2–3 тире каждый, поэтому 34 правки закрывают все 39 вхождений. Остаётся 1–2 em-dash в самых сильных местах (например, финальный абзац), чтобы текст не стал «ни одного тире», но это уже опционально.

## 4. Трихолоны (лимит 2 на статью)

**tabs: 17 в теле + 2 во frontmatter.** Кандидаты на переписывание (оставить 2 самых сильных):

| Строка | Сейчас | Предлагается |
|---|---|---|
| 74 | `a segmented control for a quick view toggle, a nav for top-level destinations, or an accordion` | две пары: `a segmented control for a quick view toggle, or an accordion when horizontal room runs out` |
| 76 | `sections are peers, fit on one row, and only one is visible at a time` | `sections are peers and only one is visible at a time` |
| 76 | `tab anatomy, every interaction state, theming, accessible keyboard patterns, and real examples` | `tab anatomy, every interaction state, theming and accessible keyboard patterns` |
| 90 | `a heavier label, an accent indicator, and a fill or border shift` | `a heavier label plus an accent indicator, or a fill or border shift` |
| 144 | `Fill the segments, round the corners a touch, and flip the colors` | `Fill the segments, round the corners a touch, then flip the colors` |
| 248 | `Brand-forward apps, wellness platforms, and interfaces targeting younger demographics` | `Brand-forward apps and interfaces targeting younger demographics` |
| 284 | `Mobile-first experiences, settings panels, and binary choices` | `Mobile-first experiences and settings panels, or simple binary choices` |
| 320 | `Minimalist portfolios, artist websites, and interfaces with full-bleed imagery` | `Minimalist portfolios and artist websites with full-bleed imagery` |
| 368/370 | `various preferences, options, or configurations` (2 раза) | `various preferences or configurations` |
| 392 | `show up in keyboard, focus, and what happens the moment someone` | `show up in keyboard and focus behaviour, and in what happens` |
| 494 | `near the top, under the app bar, and mark the active tab` | `near the top, under the app bar, marking the active tab` |
| 510 | `default, hover, active, focus, and disabled states` | `default, hover, active, and focus states plus disabled` |
| 514 | `the sections are peers, each fits the same space, and people switch between them often` | `the sections are peers and people switch between them often` |
| 518 | `a product page, a pricing table, or a docs section` | `a product page or a docs section` |
| 522 | `Amazon filters, Instagram stories, and Slack settings` | `Amazon filters and Instagram stories, plus Slack settings` |
| 25 (fm) | `we can write research, case study, and even UX roast` | `we can write research, a case study, or even a UX roast` |
| 26 (fm) | `Increase your online visibility, drive targeted traffic, and boost your website's SEO` | `Increase your online visibility and drive targeted traffic to boost your website's SEO` |

**ai-chat: 18 в теле + 1 во frontmatter.** Крупные кандидаты: строки 68, 74 (два), 162, 170, 178, 222, 234, 248, 266, 284, 292, 322, 344, 418, 434 (три), 444. Многие — перечисления в скобках-уточнениях; часть можно оставить как «две пары» без потери смысла.

## 5. Что ещё найдено (мелкий долг)

| Дефект | Где | Правка |
|---|---|---|
| Банклише «Seamless» | tabs, строка 318 | `Seamless integration with background` → `Blends with the background` |
| Дефис вместо тире/запятой в прозе | tabs, строки 182, 198 | `"ghost tabs" - every tab` → `"ghost tabs", every tab`; `3 techniques minimum - color change` → `3 techniques minimum: color change` |
| Эхо «not X, and not Y» | ai-chat, `subtitle` | `AI chat is not a messaging app and not a chatbot.` → `AI chat sits apart from both messaging apps and chatbots.` (запрещена конструкция с «not») |
| Пять элементов в одном предложении | ai-chat, строка 118 (снята правкой №3), 192 | `Cursor uses a thin vertical bar. Claude.ai uses a small filled square. ChatGPT uses a pulsing dot.` — три предложения, а не цепочка; уже в порядке |
| Дублирование FAQ | ai-chat: `faq:` (5 вопросов) во frontmatter + видимый блок FAQ (7 вопросов) в теле | Расхождение по числу. Вариант: синхронизировать frontmatter до 7 вопросов, чтобы JSON-LD совпадал с видимым блоком |
| Непоследовательная разметка H3 | tabs: часть H3 обёрнута в `**`, часть нет (строки 80–116 против 240, 476+) | Косметика, не нарушение. Приводка опциональна |
| H3 как «псевдо-болд» | tabs: `### **Active tab**` — заголовок-словосочетание на 30+ штук | Косметика. Опционально понизить анатомию/состояния до H4 |

Проверено и признано чистым: запрещённые переходы в начале абзаца (0 в обоих файлах), «Not X, but Y» (0), конструкции «Whether you're…» (0), «From X to Y» как структурный шаблон (3 вхождения `from queued to error` / `from AI to human` — это буквальные описания переходов, не шаблон), банклише в ai-chat (0), em-dash во frontmatter (0), двоеточия в title/metaTitle (0 после Части 2).

## 6. Предлагаемое разбиение на заходы

Полная чистка — это ~90 точечных правок в двух файлах, включая правки внутри таблиц и внутри свёрнутого YAML. Одним коммитом такое делать нельзя: ревью невозможно, риск незаметно сломать таблицу.

**Заход 1. Заголовки ai-chat (8 правок).** Наибольшая SEO-ценность: снимает последние двоеточия-тайтлы, улучшает читаемость SERP-сниппетов разделов. Отдельный коммит `refactor: remove colons from ai chat headings`. Риск: смена якорей (см. §2).

**Заход 2. Em-dash ai-chat (34 правки, 39 вхождений).** Чисто механическая работа по таблице §3. Файл 445 строк, то есть формально под правило «>500 строк» не попадает, но из-за таблиц и свёрнутого YAML я всё равно делаю это атомарными шагами через `node` с проверкой счётчика, не через `write_to_file`. Коммит `style: replace em dashes in ai chat body`.

**Заход 3. Трихолоны и мелочь (tabs + ai-chat).** Самый «вкусовой» заход: переписывание перечислений. Делать последним и отдельными коммитами на файл.

Почему такой порядок: заход 1 даёт эффект в выдаче, заход 2 убирает самый сильный AI-детектор, заход 3 — гигиена. Если бюджет ограничен, заход 3 можно отложить бессрочно: 17 трихолонов — это стилистический долг, а не блокер, и трогать их без нужды значит платить за переписывание читаемых мест.

## 7. Что НЕ делаем

- Не трогаем `title`, `description`, `metaTitle`, `cardDescription` — они закрыты в Части 2 (коммиты `2a22df4`, `e61e1f8`).
- Не меняем `slug` и `coverImage` — это ломает URL и карточки.
- Не удаляем видимый FAQ-блок ai-chat: он даёт E-E-A-T и длинный хвост. Речь только о синхронизации с `faq:` во frontmatter.
- Не переписываем текст ради стиля за пределами перечисленных дефектов.
- Не трогаем 8 en-dash в каждом файле: это числовые диапазоны в домовой стилистике проекта.

## 8. Замер до/после (шаблон для отчёта)

```
F=content/blog/<slug>.mdx
echo "BODY WORDS:"; awk 'BEGIN{c=0} /^---$/{c++; next} c>=2' $F | wc -w
echo "EM-DASH TOTAL:"; grep -o '—' $F | wc -l
echo "HEADING COLONS:"; grep -cE '^#{2,3} .*:' $F
echo "TITLE LEN:"; grep -E '^title:' $F | grep -oE '"[^"]+"|\x27[^\x27]+\x27' | tr -d '"' | tr -d "'" | awk '{print length($0)}'
echo "TRICOLONS:"; python3 -c "
import re,sys
t=open('$F',encoding='utf-8').read()
print(len(re.findall(r'\b\w[\w.\-\'\`]*(?: \w[\w.\-\'\`]*){0,4}, \w[\w.\-\'\`]*(?: \w[\w.\-\'\`]*){0,4}, (?:and|or) \w',t)))
"
echo "BANNED:"; grep -niE 'seamless|streamlined|robust|leverage|comprehensive|ultimate|dive into' $F | wc -l
npm run lint 2>&1 | tail -1
```

Пороги сдачи: em-dash ≤ 2, двоеточий в H2/H3 — 0, трихолонов ≤ 2, банклише — 0, `npm run lint` чист. YAML дополнительно проверяется через `gray-matter`, потому что `tsc` не валидирует frontmatter.

## 9. Источники этого файла

- `.ai/seo-benchmarks.md` — лимиты и бенчмарк UI design (лучший CTR 1.37%, цель 1.5%)
- `AGENTS.md`, разделы «КАТЕГОРИЧЕСКИЕ ЗАПРЕТЫ» и «ОБЯЗАТЕЛЬНАЯ САМОПРОВЕРКА»
- `.roo/skills/world-class-blog-writing-for-setproduct/SKILL.md` — бюджеты em-dash и трихолонов, список банклише
- `content/blog/tabs-ui-design.mdx`, `content/blog/ai-chat-interface-ui-design.mdx` — по состоянию на `e61e1f8`
- `plans/anchor-url-investigation.md` — оценка риска смены якорей
- `plans/tabs-ai-chat-pillar-2026-10.md` — контекст Части 1 и Части 2

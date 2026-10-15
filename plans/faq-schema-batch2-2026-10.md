# FAQPage-разметка, батч 2: 26 постов с видимым FAQ без `faq:` (октябрь 2026)

## Итог одной строкой

40 постов из 187 имеют `faq:` во frontmatter, ещё **26 постов имеют видимый
блок Q&A в теле, но `faq:` не заполнен** — для них FAQPage JSON-LD не
генерируется. Суммарный пул показов этих 26 постов ≈ **356 866** за 3 месяца.
Задача — скопировать видимые Q&A в frontmatter по правилу content parity,
153 вопроса, 4 батча, один коммит на файл.

## Почему это работает

`buildFaqJsonLd` в [`lib/blog/schema.ts`](../lib/blog/schema.ts:56) читает
только frontmatter `faq:`. Видимый блок в теле на разметку не влияет.
`BlogPostLayout` рендерит `<script type="application/ld+json">` в `<head>`
только когда `faqJsonLd` непустой
([`components/blog/BlogPostLayout.tsx`](../components/blog/BlogPostLayout.tsx:58)).

Механизм уже отработан на 22 постах: [`plans/faq-schema-batch-2026-10.md`](faq-schema-batch-2026-10.md).
Там же зафиксировано правило content parity: **не добавляем вопросов, которых
нет в видимом блоке**, и **не правим тело**.

## Скоуп: 26 файлов, 153 вопроса

Порядок — по показам за 3 месяца (GSC, [`plans/Страницы.csv`](Страницы.csv)).

| # | slug | вопросы | формат Q в теле | показы 3 мес | строк |
|---|---|---|---|---|---|
| 1 | guest-posting-opportunities | 6 | `###` | 65 685 | 203 |
| 2 | claymorphism-design-guide | 5 | `###` | 48 189 | 324 |
| 3 | what-is-looksmax-ai | 6 | `###` | 44 529 | 141 |
| 4 | guest-posts-vs-niche-edits | 4 | `**bold**` | 32 944 | 344 |
| 5 | benefits-of-guest-blogging | 5 | `###` | 29 561 | 235 |
| 6 | neumorphism-design-guide | 5 | `###` | 22 302 | 331 |
| 7 | retro-brutalist-ui-design-2026 | 6 | `###` + маркеры ❶ | 18 334 | 245 |
| 8 | submit-a-guest-post | 6 | `**bold**` | 14 980 | 159 |
| 9 | complete-guide-to-blueprint-grid-design | 5 | `###` + маркеры | 14 423 | 250 |
| 10 | jupiter-solana-swap-lend-and-referral-guide | 7 | `###` | 13 076 | 252 |
| 11 | pay-for-claude-pro-with-usdt | 6 | `**bold**` + маркеры | 7 669 | 180 |
| 12 | chinese-ai-models-vs-american-2026 | 6 | `**bold**` | 7 665 | 177 |
| 13 | why-landing-page-optimization-is-essential | 4 | `###` | 5 942 | 150 |
| 14 | solcard-review-usdt-crypto-card-that-actually-helps-pay-for-online-subscriptions | 10 | `###` | 5 316 | 286 |
| 15 | guest-article-for-web-development | 5 | `**bold**` | 5 123 | 174 |
| 16 | how-to-design-a-ui-kit-foundation | 7 | `###` | 4 868 | **843** |
| 17 | best-no-kyc-crypto-card-2026-compared | 10 | `###` | 4 759 | 242 |
| 18 | white-label-seo-reseller-platforms | 5 | `###` | 3 967 | 113 |
| 19 | how-much-does-guest-post-cost-2026 | 8 | `###` | 2 942 | 272 |
| 20 | jaredfromsubway-mev-bot-hack-2026 | 7 | `**bold**` | 1 221 | 125 |
| 21 | how-to-get-your-first-users-from-reddit | 4 | `###` | 1 153 | 140 |
| 22 | ai-infographics-for-marketing-teams | 7 | `**bold**` + маркеры | 963 | 284 |
| 23 | ai-editable-landing-template-case-study | 4 | `###` | 839 | 154 |
| 24 | google-news-guest-posts | 6 | `###` | 226 | 230 |
| 25 | freelance-paperwork-without-printer | 5 | `###` | 162 | 120 |
| 26 | what-gets-designers-to-300k | 4 | `###` + маркеры | 28 | 195 |

Итого: **153 вопроса**. Скоуп — 26 файлов, из них 25 меньше 500 строк,
1 файл (`how-to-design-a-ui-kit-foundation`, 843 строки) правится только
`apply_diff` по правилу [`AGENTS.md`](../AGENTS.md:84).

### Что НЕ входит

- Посты, у которых `faq:` уже есть (40 файлов) — не трогаем.
- Посты без видимого блока Q&A — вопросов брать негде, content parity
  запрещает выдумывать.
- Тело статей — видимый блок остаётся как есть.
- title / metaTitle / description / slug — отдельный долг.

## Правила копирования в `faq:`

Те же, что в батче 1 ([`plans/faq-schema-batch-2026-10.md`](faq-schema-batch-2026-10.md:51)):

1. Источник — видимый блок Q&A, копия 1:1 по смыслу.
2. Ответ очищаем до plain text:
   - убрать ведущие маркеры `❶ ❷ ➀`, `1\.`, `**1\.**`, `•`;
   - снять HTML: `<a href="...">WCAG</a>` → `WCAG`;
   - снять markdown-ссылки: `[text](url)` → `text`;
   - убрать backticks и `_em_`;
   - снять `**bold**`;
   - разэкранировать `\.` → `.`, `\(` → `(`.
3. Em-dash (`—`) в ответе заменить на запятую или двоеточие. **Тело не трогаем.**
4. Вопрос — из подзаголовка блока, снять нумерацию и маркеры.
5. Формат записи — как в [`content/blog/chip-ui-design.mdx`](../content/blog/chip-ui-design.mdx:36):
   ```yaml
   faq:
     - question: Что спросили?
       answer: >-
         Прямой ответ в plain text.
   ```

## Где вставлять `faq:`

Последним блоком frontmatter, перед закрывающим `---`. Если уже есть
`relatedSlugs` или `thumbImage` — `faq:` идёт после них.

## Порядок работы: 4 батча

| Батч | Файлы | Вопросов | Заметка |
|---|---|---|---|
| 1 | #1–8 (guest-posting-opportunities … submit-a-guest-post) | 43 | крупнейшие пулы, все < 350 строк |
| 2 | #9–15, #18–19 (blueprint, jupiter, claude, chinese-ai, why-landing, solcard, guest-article, white-label, how-much) | 56 | 5 файлов в формате `**bold**` |
| 3 | #17, #20–26 (best-no-kyc, jaredfromsubway, reddit, ai-infographics, ai-editable, google-news, freelance, what-gets-designers) | 47 | маркеры ❶ в двух файлах |
| 4 | #16 (how-to-design-a-ui-kit-foundation) | 7 | **843 строки → только apply_diff, атомарными шагами** |

## Особые случаи (проверено при разведке)

1. **HTML в ответах.** `retro-brutalist-ui-design-2026` содержит
   `<a href="https://www.w3.org/TR/WCAG22/">WCAG</a>` — в схеме оставляем
   только текст `WCAG`.
2. **Em-dash внутри FAQ.** `what-is-looksmax-ai` (ответ про анализ селфи),
   `submit-a-guest-post` (ответ про темы) — заменить на запятую в схеме.
3. **Маркеры нумерации.** `retro-brutalist-ui-design-2026` (❶–❻),
   `complete-guide-to-blueprint-grid-design`, `pay-for-claude-pro-with-usdt`,
   `ai-infographics-for-marketing-teams`, `what-gets-designers-to-300k` —
   снять перед вопросом.
4. **Формат `**bold**` вместо `###`.** 6 файлов: guest-posts-vs-niche-edits,
   submit-a-guest-post, pay-for-claude-pro-with-usdt,
   chinese-ai-models-vs-american-2026, guest-article-for-web-development,
   jaredfromsubway-mev-bot-hack-2026, ai-infographics-for-marketing-teams.
   Вопрос берём из жирной строки, `**` снимаем.
5. **Ответы в одну строку.** `submit-a-guest-post` и `jaredfromsubway-mev-bot-hack-2026`
   держат вопрос и ответ на соседних строках без пустой строки — парсить
   построчно, а не по абзацам.

## Self-check перед каждым коммитом

```
F=content/blog/<slug>.mdx
echo "EM-DASH:"; grep -o '—' $F | wc -l
echo "HEADING COLONS:"; grep -cE '^#{2,3} [^:]*:' $F
echo "QUESTIONS IN BODY:"; <посчитать видимые Q>
node -e 'const g=require("gray-matter"),fs=require("fs");const p=process.argv[1];const f=g(fs.readFileSync(p,"utf8"));if(!f.data.faq||!f.data.faq.length)process.exit(1);console.log("faq items:",f.data.faq.length)' $F
npm run lint 2>&1 | tail -1
```

Пороги:

- `faq` парсится gray-matter, число вопросов совпадает с числом в видимом блоке;
- em-dash не вырос относительно базового значения файла (унаследованный
  долг тела фиксируем цифрой в отчёте, не правим);
- двоеточий в H2/H3 нет;
- `npm run lint` (`tsc --noEmit`) чистый;
- U+FFFD в файле = 0 (проверять `grep -c $'\xef\xbf\xbd' $F`).

## Отдельная заметка: ложные двоеточия

Первичный прогон `grep -cE '^#{2,3} .*:'` дал 16 «двоеточий» в четырёх
dashboard-постах. При проверке оказалось, что 15 из них — это двоеточие
внутри URL: `### 1. [React UI Kit](https://www.setproduct.com/...)`.
Реальное двоеточие одно: `## Key Features Across Types:` в
`top-dashboard-design-examples-ideas`. Считать нужно регуляркой, которая
исключает URL: `grep -E '^#{2,3} [^:]*:'`.

## Прогресс (2026-10-15)

| Батч | Статус | Файлы | Вопросы | Коммиты |
|---|---|---|---|---|
| план | закрыт | 1 | — | `c58d2bb` |
| 1 | закрыт | 8 | 43 | `a817814` … `87e4794` |
| 2 | — | 9 | 56 | |
| 3 | — | 8 | 47 | |
| 4 | — | 1 | 7 | |

Батч 1, коммиты по файлам:

| slug | коммит | faq items |
|---|---|---|
| guest-posting-opportunities | a817814 | 6 |
| claymorphism-design-guide | eaa9172 | 5 |
| what-is-looksmax-ai | 1ee97b6 | 6 |
| guest-posts-vs-niche-edits | 7734eb2 | 4 |
| benefits-of-guest-blogging | e4f3b20 | 5 |
| neumorphism-design-guide | f6109ea | 5 |
| retro-brutalist-ui-design-2026 | 85aa338 | 6 |
| submit-a-guest-post | 87e4794 | 6 |

Счётчик постов с `faq:`: 40 → 48. `npm run lint` (`tsc --noEmit`) чистый.
U+FFFD во всех восьми файлах = 0, em-dash не вырос ни в одном,
двоеточий в H2/H3 не добавлено, диффы — только добавления (0 удалённых строк).

### Отклонения от плана (зафиксировано)

- `guest-posting-opportunities`: в ответе про стоимость фраза «Free's editorial
  gate stays separate from the price tier above it» читалась как опечатка, в схеме
  переписана как «Free editorial access stays separate from the price tier above
  it». Смысл сохранён, тело не тронуто.
- `what-is-looksmax-ai`: в схеме добавлено «No, not objectively» вместо «Not
  objectively», чтобы ответ начинался с полного предложения.
- `submit-a-guest-post`: em-dash в ответе про темы заменён на запятую
  («declined, see the accept and reject list above»), тело не тронуто.
- `retro-brutalist-ui-design-2026`: HTML-ссылка `<a href="...WCAG22...">WCAG</a>`
  в схеме сведена к тексту `WCAG`, маркеры ❶–❻ сняты.

### Батч 2 — прогресс (2026-10-15)

| slug | коммит | faq items |
|---|---|---|
| complete-guide-to-blueprint-grid-design | e7d7dca | 5 |
| jupiter-solana-swap-lend-and-referral-guide | 996c541 | 7 |
| pay-for-claude-pro-with-usdt | 0363a06 | 6 |
| chinese-ai-models-vs-american-2026 | 023b97f | 6 |
| solcard-review-usdt-crypto-card-that-actually-helps-pay-for-online-subscriptions | 9700931 | 10 |
| guest-article-for-web-development | a52c9a5 | 5 |
| white-label-seo-reseller-platforms | 1d9783c | 5 |
| how-much-does-guest-post-cost-2026 | 2f0472b | 8 |
| why-landing-page-optimization-is-essential | ОТЛОЖЕН | — |

Применено 8 файлов из 9, 52 вопроса. Диффы — только добавления, U+FFFD = 0,
em-dash не вырос ни в одном файле.

#### Блокер: why-landing-page-optimization-is-essential

Видимый FAQ-блок этого поста содержит неподтверждённую статистику, при том что
Wave 4 батч B (`f925f98`, коммит `f925f98`) уже убрал из тела поста
ровно такие же цифры:

- «Median across industries is 2.35%.»
- «Top quartile is 5–11% depending on offer.»

Копирование блока в `faq:` 1:1 по правилу content parity перенесло бы эти
цифры в JSON-LD и разошлось бы с чисткой Wave 4. Это противоречит антипаттерну
«Fake statistics without source attribution» из `.ai/seo-benchmarks.md` (строка 205).

Файл поставлен на паузу до решения владельца. Варианты:

1. Сначала снять цифры в видимом FAQ-блоке (правка тела, отдельный коммит),
   потом скопировать очищенный блок в `faq:`.
2. Скопировать в `faq:` версию без цифр, тело оставить как есть. Тогда
   видимый блок и схема разойдутся, что нарушает content parity.
3. Пропустить файл и вернуться к нему в отдельном заходе.

Второй вопрос в блоке (сроки «7–14 days» и «4–6 weeks») — это ориентир по срокам,
а не утверждение о рынке, его можно копировать без правок.

### Батч 2 закрыт (2026-10-15)

Блокер снят по варианту 1: цифры «2.35%» и «5–11%» убраны из видимого FAQ-блока
(коммит `761d689`, правка тела), затем `faq:` добавлен из уже очищенного
блока (`6e16121`). Расхождения между телом и схемой нет, content parity соблюдён.

Итог батча 2: 9 из 9 файлов, 56 вопросов. Счётчик постов с `faq:`: 48 → 57.

## Коммиты (без push)

Один коммит на файл, сообщение `content: add faq schema to <slug>`
(sentence case, английский). 26 файлов, 26 коммитов.

## Замер

- До/после числа страниц с `faq:`: 40 → 66.
- Rich Results Test на 3 URL (по одному из каждого батча) после деплоя.
- GSC «Вид в поиске» → расширенные результаты, окно 2–4 недели после индексации.
- Контроль: не выросли ли em-dash и не появились ли новые двоеточия в H2/H3.

## Что НЕ делаем

- Не трогаем тело: видимый блок Q&A остаётся как есть.
- Не правим существующие `faq:` у 40 постов.
- Не добавляем вопросы, которых нет в видимом блоке.
- Не переносим и не дублируем блок FAQ.
- Не меняем title/description/slug в этом батче.
- Не коммитим больше одного файла за раз.
- Не используем `write_to_file` для `how-to-design-a-ui-kit-foundation` (843 строки).

## Источники этого файла

- [`plans/faq-schema-batch-2026-10.md`](faq-schema-batch-2026-10.md) — механика батча 1.
- [`lib/blog/schema.ts`](../lib/blog/schema.ts:56) — `buildFaqJsonLd`.
- [`components/blog/BlogPostLayout.tsx`](../components/blog/BlogPostLayout.tsx:58) — рендер JSON-LD.
- [`plans/Страницы.csv`](Страницы.csv) — показы 3 мес (окно 2026-07-07 → 2026-10-06).
- [`AGENTS.md`](../AGENTS.md:84) — правило apply_diff для файлов > 500 строк.

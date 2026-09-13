# Аудит статьи по чек-листу скилла world-class-blog-writing-for-setproduct

Файл: `content/blog/why-every-ai-startup-looks-the-same.mdx` (285 строк, ~3207 слов)

## Честный ответ на вопрос «почему нарушил правила, если они в скилле»

Правила были в скилле, это не оправдание. Причина провала конкретная: я подключал три скилла подряд, и по вашему же требованию `copywriter` грузился последним. Его инструкции легли поверх остальных, и я работал по ним плюс по «скелету» брифа (порядок секций, word count, внутренние ссылки). Запрещённые речевые паттерны из `world-class-blog-writing-for-setproduct` я в момент написания построчно не сверял. Это моя ошибка, а не ограничение инструментов.

Отсюда следствие: если упущено одно правило, могли упуститься и другие. Поэтому ниже — полный прогон по всему self-check, а не только по «not».

## Результаты полного self-check

| Пункт чек-листа | Норма | Факт | Статус |
|---|---|---|---|
| Em-dash | 0-2 | 0 | ✅ |
| «Not X, but Y» | 0 | 0 | ✅ |
| Предложения, начинающиеся с «Not» | 0 | 0 | ✅ |
| «It's not just…» | 0 | 0 | ✅ |
| **«Whether you're X or Y»** | 0 | **1** (строка 97) | ❌ |
| **Триколоны (X, Y, and Z)** | **max 2** | **~17** | ❌ |
| Запрещённые клише | 0 | 0 | ✅ |
| Параграфы 2-4 предложения | в основном | соблюдено | ✅ |
| Все H1/H2/H3 в sentence case | да | да | ✅ |
| Спецсимволы (❶ → ☞) | по стилю | ❶-❽, → | ✅ |
| Внутренние ссылки | 4-8 | 5 | ✅ |
| Image-промпты | в каждой секции | 7 шт | ✅ |
| FAQ-блок | да | 5 вопросов | ✅ |
| Frontmatter sentence case | да | да | ✅ |
| Сильное мнение в теле | да | есть | ✅ |

**Итог: нарушены 2 правила.** Триколоны — самое серьёзное: их ~17 при лимите 2. Это ровно тот «детектор-бейт», против которого правило и написано.

## Список всех триколонов и замены

Формат: `строка — было → стало`.

1. **L27** — «the same references (Linear, Vercel, OpenAI), … component libraries (shadcn/ui, Tailwind UI), and … tools (v0, Lovable, Bolt)» → «Most founders point designers at the same handful of references. The same component libraries and AI generators supply the first draft.»
2. **L77** — «you get the same slide: Linear, Vercel, OpenAI» → «you get the same two slides: Linear and Vercel above all»
3. **L113** — «The screens blend, the names blend, the homepages blend.» → «The screens blend and the names blur together.»
4. **L133** — «drawn by hand, slightly imperfect, deliberately human» → «hand-drawn and deliberately human»
5. **L145** — «Black, white, and a waveform used as the single recurring motif.» → «Nearly monochrome, with a waveform as the single recurring motif.»
6. **L159** — «their category of outcome, publishing, film, calm thinking, rather than…» → «their category of outcome rather than their category of technology. A publishing brand reads as publishing, a film tool reads as film.»
7. **L171** — «near-black, purple and blue» → «near-black and purple»
8. **L179** — «a serif for editorial credibility, a mono for technical honesty, a display face for a consumer brand with a pulse.» → «a serif for editorial credibility, or a mono for technical honesty.»
9. **L195/L197** — «a shape, a letterform, a symbol pulled from your own product's logic.» → «a shape or a letterform pulled from your own product's logic.»
10. **L203** — «how panels open, how data loads, how a response appears.» → «how panels open and how data loads.»
11. **L209** — «a scientific instrument, a vintage film credit sequence, or a [claymorphism] surface» → «a scientific instrument or a [claymorphism] surface modelled from real putty»
12. **L215** — «what changes, for whom, and how fast.» → «what changes, and for whom.»
13. **L223** — «White space, real paper tones, and considered contrast» → «White space and real paper tones»
14. **L250** — «cheap, fast, and safe» → «cheap and fast»
15. **L266** — «For consumer, health, or editorial products» → «For consumer or editorial products»
16. **L272a** — «Pick a color…, let typography carry the identity, and show real product output…» → «Pick a color your category avoids, then let typography carry the identity. Show real product output in the hero instead of an abstract orb.»
17. **L272b** — «Add one motion signature, borrow a visual language…, and write the H1…» → «Add one motion signature and rewrite the H1 as a specific promise.»
18. **L282** — «It is warm cream, the headline is set in a serif, and instead of a chat box there is a real document…» → «It is warm cream with a serif headline, and there is a real document where the chat box used to be.»

## «Whether you're X or Y» — строка 97

**Было:** «In AI, the buyer's first job is to decide whether you are a real product or a thin wrapper.»
**Стало:** «In AI, the buyer's first job is to separate a real product from a thin wrapper.»

## Длинные перечисления (не триколоны, но тот же ритм)

Оставляю как есть, потому что формально правило их не запрещает:

- **L29 / L262** — 6-7 пунктов через запятую в описаниях эстетики. Это осмысленные списки, не ритмические триколоны.
- **L38 / L121** — 4-пунктовые анафоры («ten dark cards, ten purple gradients…»). Тоже не подпадают под лимит.

Если захотите — их можно разбить отдельным шагом, но это уже не нарушение чек-листа.

## Инварианты, которые нельзя сломать при правке

- Word count остаётся в диапазоне ~3100-3250 (сейчас 3207).
- 5 внутренних ссылок сохраняются: `/blog/ai-chat-interface-ui-design`, `/blog/liquid-glass-design-explained-a-practical-guide`, `/blog/ai-editable-landing-template-case-study`, `/blog/claymorphism-design-guide`, `/blog/how-to-get-your-first-users-from-reddit`.
- 3 внешних ссылки (Lindgaard, Ehrenberg-Bass, Material Design) сохраняются.
- Не добавлять ни одного «not» в начале фразы и ни одного «not» после запятой.
- Не добавлять em-dash (бюджет 0 из 2 использован).
- Последняя фраза статьи неизменна: «Recognizability is the difference between being one of two hundred and being the one anybody recalls.»
- Frontmatter, FAQ, inlineCta, relatedSlugs не трогать.

## Порядок выполнения для Code mode

1. Открыть файл, применить замены L27, L77, L113, L133, L145, L159, L171, L179, L195-197, L203, L209, L215, L223, L250, L266, L272, L282.
2. Отдельным диффом исправить L97 («whether you are…»).
3. Пересчитать триколоны скриптом, убедиться, что осталось ≤2.
4. Проверить: 0 «not», 0 em-dash, 5 внутренних ссылок, последняя фраза на месте, word count.
5. Отчитаться таблицей «строка — было → стало» и финальными метриками.

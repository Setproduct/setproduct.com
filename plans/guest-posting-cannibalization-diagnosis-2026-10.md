# Мера C. Каннибализация guest posting: диагностика (октябрь 2026)

Разбор без правок в `content/`. Ни одна строка поста этим файлом не меняется.

Дополняет [`plans/money-pages-intent-map-2026-10.md`](money-pages-intent-map-2026-10.md:193)
(раздел B). Здесь добавлены свежие данных, пятая страница кластера и вердикт.

## 0. Итог одной строкой

Каннибализация в ядре сравнения **не подтвердилась**: головные сравнительные
запросы сидят на базовом URL `guest-posts-vs-niche-edits` на позициях 3.1–4.2,
а на двух соседних страницах те же запросы висят на позициях 34–57, то есть не
конкурируют. Настоящая причина нуля кликов другая: позиция 3–4 при нуле кликов
указывает на AI Overview или featured snippet. Фикс уже применён 12 октября
2026 (decision-таблица + answer-first лид), а окно выгрузки закрылось 10 октября,
поэтому эффект ещё не измерен.

## 1. Что проверяли

Вопрос из [`plans/step6-deep-measures-2026-10.md`](step6-deep-measures-2026-10.md:230):
какая именно страница ранжируется по `guest posting vs niche edits` и
`guest posts vs niche edits` при позиции 4.5 и нуле кликов. Три возможных
случая: каннибализация двух страниц, неудачный сниппет, несовпадение интента.

## 2. Данные

Источник: пять per-page выгрузок GSC в `plans/`, окно **2026-04-11 → 2026-10-10**.

| Страница | Клики | Показы | CTR | Позиция | Покрытие выгрузки |
|---|---|---|---|---|---|
| guest-posts-vs-niche-edits | 74 | 38 454 | 0.19% | 11.49 | 25 372 |
| guest-posting-opportunities | 644 | 124 350 | 0.52% | 18.9 | 94 044 |
| benefits-of-guest-blogging | 141 | 38 807 | 0.36% | 16.41 | 28 637 |
| submit-a-guest-post | 686 | 19 291 | 3.56% | 18.98 | 7 256 |
| guest-article-for-web-development | 303 | 6 375 | 4.75% | 25.16 | 2 111 |

Пятая страница (`guest-article-for-web-development`) закрывает запрос владельцу
из раздела B.7 старого разбора. У неё **лучший CTR в кластере** при самой
глубокой позиции.

## 3. Ядро сравнения: где сидят запросы

| Запрос | gpvne | gpo | bgb |
|---|---|---|---|
| guest posting vs niche edits | 0c / 2 211i / p3.44 | 0c / 720i / p46.62 | 0c / 250i / p38.26 |
| guest posts vs niche edits | 0c / 2 008i / p4.1 | 0c / 334i / p48.77 | 0c / 214i / p34.26 |
| niche edits vs guest posts | 0c / 1 200i / p4.22 | 0c / 226i / p51.09 | 0c / 247i / p39.02 |
| niche edit vs guest post | 0c / 1 207i / p3.11 | 0c / 293i / p54.53 | 0c / 60i / p57.92 |
| niche edits vs guest post | 1c / 1 134i / p3.09 | 0c / 222i / p45.88 | 0c / 154i / p40.75 |
| guest post niche edits | 0c / 1 019i / p8.78 | 0c / 349i / p46.5 | — |
| how to choose between niche edits and guest posts | 0c / 565i / p3.81 | 0c / 116i / p53.28 | — |

Вывод по таблице: базовый URL держит сравнение на позициях 3.1–4.2. На
`guest-posting-opportunities` и `benefits-of-guest-blogging` те же запросы
находятся на позициях 34–57, то есть Google показывает их лишь как дальний
совпадение, а не как конкурирующую страницу. Забирать клики друг у друга
им нечего.

## 4. Пересечения по всем пяти страницам

Всего **430 запросов из 1 647** встречаются минимум на двух страницах. Продача
«399 пересечений» из старого разбора уточнена: добавилась пятая страница.

| Сумма показов | Запрос | Где всплывает | Владелец |
|---|---|---|---|
| 6 459 | uploadarticle guest posting.com | gpo 6 456, bgb 3 | никто (чужой домен) |
| 4 457 | guest blogging for seo | bgb 4 453, gpo 4 | benefits-of-guest-blogging |
| 3 517 | guest blogging seo | bgb 3 461, gpo 56 | benefits-of-guest-blogging |
| 3 368 | guest post opportunities | gpo 3 365, bgb 3 | guest-posting-opportunities |
| 3 181 | guest posting vs niche edits | gpvne 2 211, gpo 720, bgb 250 | guest-posts-vs-niche-edits |
| 3 025 | guest posting | gpo 3 011, остальные по 1–6 | guest-posting-opportunities |
| 2 572 | seo guest post | bgb 1 932, gpo 639, gpvne 1 | benefits-of-guest-blogging |
| 2 556 | guest posts vs niche edits | gpvne 2 008, gpo 334, bgb 214 | guest-posts-vs-niche-edits |
| 2 267 | guest posting for seo | gpo 1 249, bgb 1 018 | развести (см. п. 6) |
| 2 179 | guest posts style posts | gpvne 1 350, gpo 828, gafwd 1 | неясный интент |

Два настоящих пересечения интентов, которые стоит разделить:

1. **«seo guest post» / «guest posting for seo»** — течёт между
   `benefits-of-guest-blogging` и `guest-posting-opportunities`. Это не про
   сравнение и не про Меру C, а про развод title (Мера B, раздел 3.1).
2. **comparison** — но, как показал п. 3, вторые страницы стоят на позициях
   34+, то есть эффекта каннибализации нет.

## 5. Вердикт по трём гипотезам

| Гипотеза | Вердикт | Обоснование |
|---|---|---|
| Каннибализация двух страниц | **НЕ подтверждена** | на gpo/bgb те же запросы на позициях 34–57; забирать клики нечего |
| Неудачный сниппет | **Подтверждена частично** | позиция 3–4 при 0 кликов на 3 400+ показов: сниппет не отвечает на «which should I pay for first» |
| Несовпадение интента | **Подтверждена** | запрос про выбор, а страница начиналась с разбора «что такое guest posting» |

Отдельно: `guest-posts-vs-niche-edits` потеряна доля клика и на головные
запросы, которые поиск явно показывает как требующие короткого ответа
(`guest posting vs niche edits when should i use each…` 281 показ, 0 кликов).

## 6. Ключевая находка: фикс уже применён, данных ещё нет

Окно выгрузки закрылось **2026-10-10**. Правки в тело внесены **2026-10-12**:

| Коммит | Дата | Что |
|---|---|---|
| `04faa96` | 2026-10-12 18:15 | content: add decision block and rewrite snippet for guest posts vs niche edits |
| `71c8413` | 2026-10-12 19:55 | content: rewrite comparison lead to guest posts first and fix guest post cost row |
| `85b3ad3` | 2026-10-11 21:53 | fix: wrap narrow tables in blog-fit-table |
| `2221b4d` | 2026-10-10 22:05 | style: convert guest post headings to sentence case |

Состояние страницы сейчас (проверено по файлу):

- Строка 30: answer-first лид. Выбор по дедлайну и бюджету, с двумя
  внутренними ссылками на `benefits-of-guest-blogging` и
  `guest-posting-opportunities`.
- Строки 32–38: TL;DR из трёх пунктов.
- Строки 40–45: decision-таблица на четыре варианта (Guest post, Niche edit,
  Link insertion, HARO or digital PR) с колонками Cost, Time to link, Risk,
  When to take it, When to skip it.

То есть рекомендация из старого разбора (раздел B.6) **уже выполнена**. Она
попала в тело через два дня после закрытия окна замера. Значит цифры 0 кликов
на 2 211 и 2 008 показов описывают **состояние до фикса**, а не после.

Вывод: замер эффекта невозможен на текущей выгрузке. Нужна пересборка после
примерно 2026-10-26.

## 7. Что делать

| Приоритет | Действие | Тип |
|---|---|---|
| 1 | Пересобрать выгрузку `guest-posts-vs-niche-edits` после 2026-10-26 и сравнить CTR на ядре сравнения с 0.19% | замер, без правок |
| 2 | Развести title `benefits-of-guest-blogging` и `guest-posting-opportunities` под «benefits / why» и «opportunities / where» | Мера B, отдельный заход |
| 3 | Не трогать `guest-article-for-web-development`: CTR 4.75%, лучший в кластере, интент (`write for us web development`) не пересекается с ядром | оставить |
| 4 | Шум `uploadarticle` (23.6% показов gpo) не лечится контентом: это навигация к чужому домену | игнорировать |
| 5 | Якорный пул 22 711 показов при 0 кликов на базовом URL — технический долг canonicalization | Мера E |

Merge **не нужен**: `guest-posts-vs-niche-edits` остаётся легитимным владельцем
comparison-интента, позиции 3–4 это подтверждают.

## 8. Что НЕ делалось

- Ни одной правки в `content/`. Мера C — диагностика.
- Не объединяли страницы, не меняли title, не трогали `relatedSlugs`.
- Не считали якорный пул новой проблемой: он разобран в Мере E.
- Не правили шум `uploadarticle` — он вне скоупа контента.

## 9. Ограничения

- Покрытие per-page выгрузок 4.7–75.6%. Доли показов считаны по видимой части.
- Связь запрос→URL не выдумывалась: выгрузка GSC «запросы по странице» уже
  привязана к странице.
- Пересечения считаны по совпадению строки запроса в выгрузках разных
  страниц, без нормализации написания.
- Вердикт о AI Overview — вывод из формы данных (позиция 3–4, ноль кликов), а не
  прямое подтверждение из GSC: тип SERP в выгрузках не приходит.

## Коммиты

Один коммит: `docs: add guest posting cannibalization diagnosis`. Без push.

# Визуалы под статью «Are you wasting money on SaaS subscriptions? A practical guide»

## Самый сложный для понимания момент

**Три вида SaaS-растрат выглядят на счёте одинаково, но лечатся по-разному.**

В теле статьи этот смысл разнесён по трём отдельным разделам и нигде не собран в одном месте:

- `### 3. Remove unused licences` — [ghost seats](content/blog/saas-subscription-waste.mdx:108): платят за людей, которым доступ больше не нужен;
- `### 4. Look for feature overlap` — [дублирующая функциональность](content/blog/saas-subscription-waste.mdx:116): два-три инструмента делают одно и то же;
- `### 5. Match plans to actual usage` — [раздутый тариф](content/blog/saas-subscription-waste.mdx:124): инструмент нужен, но оплачен тариф больше, чем реальное использование.

Читатель видит три похожих пункта и один и тот же симптом — «деньги уходят каждый месяц». В счёте эти три причины неразличимы: строка «Licence — $49/mo» не говорит, это мёртвый аккаунт, дубль или переплата за тариф. Различить их можно только по диагностике, а действие в каждом случае разное: уволить аккаунт, консолидировать инструменты или понизить тариф. Именно это — единственная точка статьи, где читатель рискует не понять, чем один совет отличается от другого, и в итоге ничего не применить.

**Задача визуала:** собрать эти три причины в одну диагностическую картину и развести их по разным действиям, чтобы читатель мог посмотреть на свой стек и отнести каждую трату к своему типу.

## Куда вставлять

Оптимально — **сразу после абзаца [`строки 76`](content/blog/saas-subscription-waste.mdx:76)** («The first step toward controlling SaaS costs is understanding exactly where the money is going…»), то есть на стыке между `## Where does the waste come from?` и `## How to cut unnecessary SaaS costs`.

Почему здесь:

1. Сработает как визуальная пауза ровно в тот момент, когда текст уже описал проблему, но ещё не начал длинный список из пяти однотипных подпунктов. Именно тут читатель рискует проскроллить дальше.
2. Даст ему карту перед списком: дальше три из пяти пунктов будут читаться как решения уже знакомых ему проблем, а не как новые абзацы.
3. Одна картинка разгружает самую монотонную часть поста — пять блоков `### 1..5`, идущих друг за другом без перебивки.

Технически: картинка в теле статьи вставляется обычным markdown, `![alt](/blog/assets/saas-subscription-waste/img-1.webp)`, рендерится через [`MDXImage`](components/blog/MDXImage.tsx:9) с `loading="lazy"`. Стиль картинок в теле не задан — вы выбираете его сами; все три промпта требуют **строго белый фон**, чтобы изображение читалось как схема, а не как обложка.

---

## Вариант 1 — «Три причины, один счёт» (диагностическая таблица)

Infographic on a strictly white background (#FFFFFF), with no background tint, no gradient wash, no texture, and no frame.

Concept: three different kinds of SaaS waste that look identical on an invoice but require three completely different fixes. The point is to let a reader classify their own spending at a glance.

Layout: a clean three-column comparison, aligned on a shared grid so the eye can read it both across and down. Each column is a vertical card with a thin light grey outline and a small number badge in the header.

Column one, Ghost seats: the header icon is a simple user silhouette with a dashed outline, standing empty. Below it, one short caption line. In the body, a tiny before and after: on the left an invoice line with three seat dots filled, on the right the same line with only one dot filled and two hollow. One purple accent (#7C4DFF) marks the two hollow dots.

Column two, Feature overlap: the header icon is two rounded squares overlapping, their shared area highlighted. In the body, a small Venn of two circles where the intersection is tinted, next to an arrow that points to a single consolidated square, showing two tools collapsing into one.

Column three, Oversized plan: the header icon is a large empty bucket with a thin stream pouring in. In the body, a simple stacked bar where the top two segments are pale and labelled as unused capacity, and only the bottom segment is solid.

Under all three columns, a single shared row spans the full width, drawn as three short verbs in flat bold bars instead of words, each aligned under its column, so each cause visibly maps to its own action.

Palette: pure white background, light grey outlines, pastel mint (#E6F4EC), blush (#FFE8E8) and lilac (#EDE7FF) fills as soft accents, near-black line work, and one purple accent #7C4DFF. Keep the three columns inside the central safe area. Use no readable words anywhere, only geometric icons, bars, dots and arrows.

---

## Вариант 2 — «Одно правило, три ветки» (диагностическое дерево решений)

Diagram on a strictly white background (#FFFFFF), no tint, no gradient, no outer frame, no drop shadows beyond very soft light grey grounding.

Concept: a single leading question that splits a confusing pile of subscriptions into three clean categories, each with its own fix. This resolves the article's hardest point, telling the three waste types apart.

Layout: vertical flow, top to bottom, centred on a shared axis. At the top, one rounded start node containing a small magnifier icon, drawn as the entry point for a subscription audit.

From the start node, a single thick line descends and splits into three diverging branches, evenly fanned left, centre and right. Each branch passes through a diamond-shaped decision node, then ends in a rounded action node.

Left branch, decision node showing a user silhouette with a hollow dot: asks whether anyone still uses the seat. The action node below shows a crossed-out seat and a downward arrow, standing for removing inactive accounts.

Centre branch, decision node showing two overlapping squares: asks whether another tool already does this job. The action node below shows two squares merging into one, standing for consolidating duplicated functionality.

Right branch, decision node showing a large bucket beside a small filled measuring cup: asks whether the current plan still matches real usage. The action node below shows a step-down staircase of three bars, standing for downgrading the tier.

Along the left edge of the whole diagram, a narrow vertical scale bar runs top to bottom with a single small dot marker, hinting at a cost axis without any numbers.

Palette: pure white background, light grey connectors and outlines, fills in pastel mint (#E6F4EC), blush (#FFE8E8) and lilac (#EDE7FF), near-black decision diamonds and a solid purple accent #7C4DFF on the final action of each branch. No readable words, only icons, arrows and shapes.

---

## Вариант 3 — «Что видит бухгалтерия и что видит аудит» (контраст слоёв + до и после)

Infographic on a strictly white background (#FFFFFF), with no background colour, no gradient, no texture and no decorative frame.

Concept: the same three subscriptions appear identical on an invoice, yet a proper audit reads three different stories behind them. This is the visual answer to the article's most confusing passage.

Layout: two horizontal bands stacked with a thin grey divider between them, sharing the same three columns so the eye compares directly top to bottom.

Top band, "what the invoice shows": three identical flat invoice rows side by side, each row styled exactly the same way, a plain grey rectangle with the same generic price pill and the same short name bar. Nothing distinguishes them, which is the whole point. A small label bar above reads as a sheet header, drawn as a solid dark bar.

Bottom band, "what the audit reveals": the same three columns, but now each one is annotated. Column one shows the row with one empty dashed seat and a pair of scissors cutting it away. Column two shows the row overlapped by a second nearly identical row, with a merge arrow pulling them together. Column three shows the row with a step-down stack of three descending bars beside it, marking a smaller plan.

A single vertical connector line runs from each top row straight down to its matching bottom column, so the mapping stays unambiguous. One purple accent (#7C4DFF) highlights only the corrective mark in each bottom column, so the eye instantly sees three different outcomes from three identical-looking inputs.

Palette: pure white background, light grey invoice rows, pastel mint (#E6F4EC), blush (#FFE8E8) and lilac (#EDE7FF) accents, near-black label bar and connectors, one purple accent #7C4DFF. Keep everything in the central safe area and use no readable text, only bars, pills, dots and arrows.

---

## Какой брать

**Вариант 1** — самый спокойный и лучше всех работает как пауза в тексте: три колонки легко сканируются, читатель сразу раскладывает свои подписки по полочкам. **Вариант 2** сильнее как инструмент: это буквально алгоритм, по которому можно пройтись по своему стеку, и он даёт ощущение «сейчас я разберусь». **Вариант 3** самый наглядный по главному тезису статьи (на счёте всё одинаково, разница только в диагностике), но у него плотнее композиция, поэтому в узком мобильном контейнере он читается хуже двух первых.

## После генерации

1. Положить файлы как `public/blog/assets/saas-subscription-waste/img-1.webp` (и `img-2`, `img-3`, если берёте больше одного).
2. Вставить в тело поста после абзаца на [строке 76](content/blog/saas-subscription-waste.mdx:76) через `![alt](/blog/assets/saas-subscription-waste/img-1.webp)`.
3. Проверить, что пути резолвятся: `node check_images2.js`.

Alt-тексты под каждый вариант (sentence case, без двоеточий):

- Вариант 1 — `Comparison of three kinds of SaaS waste, ghost seats, feature overlap and oversized plans, each with its own fix`
- Вариант 2 — `Decision tree that splits a subscription audit into removing inactive seats, consolidating duplicate tools and downgrading plans`
- Вариант 3 — `Two stacked bands showing identical invoice rows above and three different audit findings below`

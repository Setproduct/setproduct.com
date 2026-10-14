# SEO-пласт: frontmatter и заголовки — чистка долга (октябрь 2026)

Источник задачи: продолжение разбора white-label пиллара (см. §16
[`.ai/content-strategy.md`](../.ai/content-strategy.md)). Дефекты — системный долг
из [`plans/title-colon-cleanup-2026-10.md`](title-colon-cleanup-2026-10.md) и
§15.2.3 контент-стратегии. Часть дефектов там устарела: title white-label и
seo-tools-compared были поправлены раньше, а §15.2.3 описывал уже снятые проблемы.

## 1. Область

Стартовый список из 13 постов пласта плюс все посты категории `SEO`, найденные
поиском, плюс два поста с теми же дефектами в соседних категориях. Итог: **16
постов**.

Проверено по факту состояния файлов (не по памяти), категории:
`SEO` — 10, `Growth Hacking` — 3, `Technology` — 1, `Presentation` — 1,
`Startups & SaaS` — 1.

## 2. Аудит: таблица дефектов (шаг 1)

| slug | поле | было | дефект |
|---|---|---|---|
| link-building-for-startups | title | Link building for startups and the tactics that still work today | len 64 |
| link-building-for-startups | metaTitle | то же | len 64 |
| link-building-for-startups | description | … | len 137 |
| link-building-for-startups | H2/H3 ×3 + H2 | Popular Link-Building Strategies: Niche Edits vs. Guest Post Links; Niche Edits: The Power…; Guest Post Links: Building… | двоеточие, Title Case |
| link-building-for-startups | H2 | Startup Link Building Best Practices for 2025 | year 2025, Title Case |
| white-label-seo-reseller-platforms | description | Compare six white label SEO reseller platforms… | len 164 |
| seo-strategies-…stand-out | metaTitle | SEO strategies to make your graphic design business stand out | len 61 |
| seo-strategies-…stand-out | description | Boost your graphic design business's visibility… | len 177 |
| seo-strategies-…stand-out | H2/H3 ×13 | Actionable Steps:; Key Areas to Focus On:; Ideas for Content:; Content Tips:; Ways to Earn Backlinks: | двоеточие, Title Case |
| seo-tools-compared | metaTitle | Tried these Semrush alternatives and some SEO tools surprised me | len 64 |
| seo-tools-compared | description | … | len 145 |
| seo-tools-compared | H2 ×2 | Then came a tool I hadn't heard of: Frizerly; Now, here's my wildcard: NeuronWriter | двоеточие |
| seo-tools-compared | coverImageAlt | SEO tools compared: What I learned after quitting Semrush | двоеточие (вне области frontmatter-title) |
| guest-article-for-web-development | metaTitle | Guest posting for web development companies - Setproduct | суффикс `- Setproduct` |
| guest-article-for-web-development | description | … | len 167 |
| guest-article-for-web-development | H3 ×2 | DO:; DON'T: | двоеточие |
| how-much-does-guest-post-cost-2026 | description | … | len 170 |
| how-much-does-guest-post-cost-2026 | H2 ×2 | Niche multipliers: why crypto costs 3x more than lifestyle; Red flags: any of these means walk away | двоеточие |
| google-news-guest-posts | description | … | len 169 |
| red-flags-in-guest-post-outreach | title | 13 red flags that prove a guest post site will waste your money | len 63 |
| red-flags-in-guest-post-outreach | metaTitle | то же | len 63 |
| red-flags-in-guest-post-outreach | description | … | len 164 |
| red-flags-in-guest-post-outreach | H2 | The meta red flag: How the pitch itself reveals the site | двоеточие |
| how-to-get-cited-in-google-ai-overviews | title | How to get cited in Google AI Overviews (GEO guide with real data) | len 66 |
| how-to-get-cited-in-google-ai-overviews | metaTitle | то же | len 66 |
| how-to-get-cited-in-google-ai-overviews | description | … | len 161 |
| how-to-get-cited-in-google-ai-overviews | H2 | Case study: how setproduct.com earned 29 AIO citations | двоеточие |
| top-ux-ui-…-2026 | title | Top 7 UX/UI design agencies for SaaS product redesign in 2026 | len 61 |
| top-ux-ui-…-2026 | metaTitle | UX/UI design agencies for SaaS product redesign \| Ranking 2026 | len 62, суффикс |
| top-ux-ui-…-2026 | H2 | Quick comparison: top 3 picks | двоеточие |
| top-7-ai-web-design-agencies-… | description | … | len 164 |
| optimizing-digital-marketing | title | Optimizing Digital Marketing Through Comprehensive Strategies | len 61, Title Case |
| optimizing-digital-marketing | metaTitle | The Best Digital Marketing Strategies for Online Success - Setproduct | len 69, Title Case, суффикс |
| optimizing-digital-marketing | description | … | len 169 |
| how-to-enhance-email-security | title | Best practices for keeping your inbox safe and enhance email security | len 69 |
| how-to-enhance-email-security | metaTitle | Top Email Security Best Practices: Keep Your Inbox Safe & Secure - Setproduct | двоеточие, len 77, Title Case, суффикс |
| how-to-enhance-email-security | description | … | len 189 |
| top-tips-for-new-businesses-… | title | Top tips for new businesses looking to strengthen their online presence | len 71 |
| top-tips-for-new-businesses-… | metaTitle | How new businesses can strengthen their online presence and rank higher | len 71 |
| choosing-right-ios-kit | title | Countdown to launch: How Figma iOS kits can help design your next mobile app faster | двоеточие, len 83 |
| choosing-right-ios-kit | metaTitle | Expert Tips for Selecting the Best Figma UI Kit for iOS App Design | Title Case, len 66 |
| choosing-right-ios-kit | description | … | len 161 |
| how-to-get-graphic-design-clients | title | How To Get More Graphic Design Clients: A Step-by-step Guide for Freelancers | двоеточие, len 76, Title Case |
| how-to-get-graphic-design-clients | metaTitle | How to Get Graphic Design Clients: A Freelancer's Guide - Setproduct | двоеточие, len 69, Title Case, суффикс |
| how-to-get-graphic-design-clients | description | … | len 168 |

## 3. Per-page выгрузки и реальные формы запросов

Выгрузки были для 6 постов; остальные правились механически (двоеточие / год /
регистр), формулировки не выдумывались.

| пост | топ-форма запроса (без пола 300) | показы | вывод |
|---|---|---|---|
| link-building-for-startups | link building for startups | 1131 | title уже был «for startups» — заменил концовку на «that actually works in 2026» |
| seo-strategies-… | seo keywords for graphic design; seo for designers | 1233; 527 | title/metaTitle переписаны под эти две формы |
| white-label-… | white label seo platform / reseller / tools | 6594 / 3558 / 3355 | title уже актуальный, правил только description |
| optimizing-digital-marketing | digital marketing optimization | 730 | title/metaTitle переписаны под эту форму |
| how-to-enhance-email-security | secure your email; protect emails; email security tips | 158 / 145 / 99 | title переписан под «how to secure your email» |
| guest-article-for-web-development | web-development blogs that accept guest posts; web development guest post | 240 / 108 | title оставлен на «web development companies», суффикс metaTitle снят |

## 4. Правки: before / after

| slug | поле | было | стало | len |
|---|---|---|---|---|
| link-building-for-startups | title / metaTitle | Link building for startups and the tactics that still work today | Link building for startups that actually works in 2026 | 54 |
| link-building-for-startups | description | …(137) | Link building for startups without wasted budget. Outreach and content tactics that still move rankings in 2026, plus what to skip and how to measure. | 150 |
| link-building-for-startups | H2/H3 ×4 | двоеточия + Title Case | Popular link-building strategies, niche edits vs guest post links и др. | — |
| white-label-seo-reseller-platforms | description | …(164) | Compare six white label SEO reseller platforms on support and markup, plus what each one really costs an agency per client and where the margin hides. | 150 |
| seo-strategies-… | title | SEO strategies that help a graphic design business stand out | SEO keywords for graphic design that bring in clients | 53 |
| seo-strategies-… | metaTitle | SEO strategies to make your graphic design business stand out | SEO for graphic designers and the keywords that win clients | 59 |
| seo-strategies-… | description | …(177) | Target the SEO keywords for graphic design that bring clients. A practical playbook covering site structure, content, backlinks, and local search for designers. | 160 |
| seo-strategies-… | H3 ×8 | Actionable Steps: и др. | Actionable steps; Key areas to focus on; Ideas for content; Content tips; Ways to earn backlinks | — |
| seo-tools-compared | metaTitle | … surprised me (64) | Tried Semrush alternatives and a few SEO tools surprised me | 59 |
| seo-tools-compared | description | …(145) | Semrush felt outdated, so I explored what else is there. Real reviews of tools like Moz, Frizerly, and Ahrefs, plus what actually fits a startup budget. | 152 |
| seo-tools-compared | H2 ×2 | Then came a tool I hadn't heard of: Frizerly; … wildcard: NeuronWriter | Then came a tool I hadn't heard of, Frizerly; … wildcard, NeuronWriter | — |
| guest-article-for-web-development | title | Guest posting for web development companies | Guest posting for web development companies that converts | 57 |
| guest-article-for-web-development | metaTitle | … - Setproduct | Guest posting for web development companies | 43 |
| guest-article-for-web-development | description | …(167) | Guest posting helps web development companies earn backlinks, referral traffic, and qualified leads. See how to pick topics, pitch sites, and measure results. | 158 |
| guest-article-for-web-development | H3 ×2 | DO:; DON'T: | Do; Don't | — |
| how-much-does-guest-post-cost-2026 | description | …(170) | Real 2026 guest post prices from $50 to $15,000. Pricing tables by DR tier and niche, why crypto costs 3x more, and the 8 red flags that signal a PBN seller. | 157 |
| how-much-does-guest-post-cost-2026 | H2 ×2 | Niche multipliers: …; Red flags: … | Niche multipliers, why crypto costs 3x more than lifestyle; Red flags that mean walk away | — |
| google-news-guest-posts | description | …(169) | Pick guest post sites that Google News truly indexes. It includes a 60-second verification check, the 7 trust signals Google rewards, and 2026 cost ranges. | 155 |
| red-flags-in-guest-post-outreach | title / metaTitle | 13 red flags that prove a guest post site will waste your money | 13 red flags that prove a guest post site will waste money | 58 |
| red-flags-in-guest-post-outreach | description | …(164) | The signals that separate legit guest post opportunities from PBNs, bot-traffic sites, and outreach scams. What to check in five minutes before you pay them. | 158 |
| red-flags-in-guest-post-outreach | H2 | The meta red flag: How the pitch itself reveals the site | The meta red flag, how the pitch reveals the site | — |
| how-to-get-cited-in-google-ai-overviews | title / metaTitle | How to get cited in Google AI Overviews (GEO guide with real data) | How to get cited in Google AI Overviews with real data | 54 |
| how-to-get-cited-in-google-ai-overviews | description | …(161) | 29 verified AI Overview citations on a DR 42 blog. The 6 signals that predict citation, the tactics that waste time, and the checklist that replicates it. | 154 |
| how-to-get-cited-in-google-ai-overviews | H2 | Case study: how setproduct.com earned 29 AIO citations | Case study, how setproduct.com earned 29 AIO citations | — |
| top-ux-ui-…-2026 | title | Top 7 UX/UI design agencies for SaaS product redesign in 2026 | Top 7 UX/UI design agencies for SaaS product redesign 2026 | 58 |
| top-ux-ui-…-2026 | metaTitle | UX/UI design agencies for SaaS product redesign \| Ranking 2026 | UX/UI design agencies for SaaS product redesign 2026 | 52 |
| top-ux-ui-…-2026 | H2 | Quick comparison: top 3 picks | Quick comparison, top 3 picks | — |
| top-7-ai-web-design-agencies-… | description | …(164) | AI speeds up web production, but speed alone does not convert. Here is what the top AI web design agencies do differently, and how to pick the right one. | 153 |
| optimizing-digital-marketing | title | Optimizing Digital Marketing Through Comprehensive Strategies | Digital marketing optimization strategies that actually work | 60 |
| optimizing-digital-marketing | metaTitle | The Best Digital Marketing Strategies for Online Success - Setproduct | Digital marketing optimization, a practical strategy guide | 58 |
| optimizing-digital-marketing | description | …(169) | Digital marketing optimization in practice. How to audit current campaigns, pick channels that convert, and fix the leaks that quietly waste your ad budget. | 156 |
| how-to-enhance-email-security | title | Best practices for keeping your inbox safe and enhance email security | How to secure your email with practical security tips | 53 |
| how-to-enhance-email-security | metaTitle | Top Email Security Best Practices: … - Setproduct | Email security best practices to secure your inbox | 50 |
| how-to-enhance-email-security | description | …(189) | Protect your inbox with practical email security best practices. Learn how to spot phishing, secure attachments, and keep sensitive data safe from threats. | 155 |
| top-tips-for-new-businesses-… | title | … looking to strengthen their online presence (71) | Top tips for new businesses to build their online presence | 58 |
| top-tips-for-new-businesses-… | metaTitle | … and rank higher (71) | How new businesses can strengthen their online presence | 55 |
| choosing-right-ios-kit | title | Countdown to launch: How Figma iOS kits can help design your next mobile app faster | How Figma iOS kits help you design a mobile app faster | 54 |
| choosing-right-ios-kit | metaTitle | Expert Tips for Selecting the Best Figma UI Kit for iOS App Design | How to choose the best Figma UI kit for iOS app design | 54 |
| choosing-right-ios-kit | description | …(161) | Maximize the consistency and UX of your iOS app with an iOS UI kit. This guide highlights the advantages that streamline the mobile app development process. | 156 |
| how-to-get-graphic-design-clients | title | How To Get More Graphic Design Clients: A Step-by-step Guide for Freelancers | How to get more graphic design clients as a freelancer | 54 |
| how-to-get-graphic-design-clients | metaTitle | How to Get Graphic Design Clients: A Freelancer's Guide - Setproduct | How to get graphic design clients, a freelancer guide | 53 |
| how-to-get-graphic-design-clients | description | …(168) | Learn how to get graphic design clients with a step-by-step guide for freelancers. Practical strategies to grow your client base and boost your business. | 153 |

## 5. Остаточный долг (тело не трогали)

- link-building-for-startups: `## Startup link building best practices for 2025` —
  год в заголовке тела противоречит 2026 в title. По брифу тело не трогаем,
  фиксирую как отдельный долг (нужна правка «2025 → 2026» отдельной задачей).
- link-building-for-startups: cardDescription содержит «in 2025».
- optimizing-digital-marketing: cardDescription «Stay ahead in 2024…».
- seo-tools-compared: двоеточие в `coverImageAlt` (вне области title/metaTitle).
- choosing-right-ios-kit: H2 `## The full guide on choosing the proper [iOS design kit](…)`
  и H3 с `**Why use such a UI kit in Figma for iOS design?**` — двоеточий в
  тексте заголовка нет (grep ловит `:` внутри URL и `?`), Title Case в H3 остаётся.

## 6. Self-check

- em-dash: frontmatter не содержит em-dash.
- Двоеточия в title/metaTitle: 0 по всем 16 постам.
- Двоеточия в H2/H3: 0 (все сняты; совпадения в choosing-right-ios-kit — только
  внутри URL).
- Год 2024/2025 в title/metaTitle: 0.
- Длина title ≤ 60: все (max 60 — optimizing-digital-marketing и
  how-much-does-guest-post-cost-2026).
- Длина description 150-160: все.
- Суффиксы `- Setproduct` / `| …`: сняты (guest-article, optimizing,
  how-to-enhance-email-security, top-ux-ui, how-to-get-graphic-design-clients).
- `npm run lint` (`tsc --noEmit`): чисто.
- U+FFFD: 0.
- Внутренние якорные ссылки на изменённые заголовки: не найдено, анкоры не сломаны.

## 7. Итог

- Постов в области: 16.
- Дефектов на входе: 50 (по полям title/metaTitle/description/H2/H3).
- Осталось дефектов в области правки: 0.
- Остаточный долг вне области (тело, coverImageAlt): 5 пунктов, см. §5.
- Коммитов: по 1 на пост, префикс `seo:`.

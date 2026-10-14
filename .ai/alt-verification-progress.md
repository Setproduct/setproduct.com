# Alt verification progress (image-read audit)

Цель: перепроверить все батчи замены alt-текстов, считывая картинки и сверяя с новыми альтами.
Объём: 78 картинок (без уже проверенных figma-instances img-1..3 и liquid-glass img-12).
Лимит изображений: 64 на контекст. Сброс — через new_task, продолжая с этого файла.

## Формат вердикта
- OK — альт соответствует картинке
- FIX — альт не соответствует, исправлено
- MISS — картинка не найдена/битая

## Батч 4p — 16 картинок — ЗАКРЫТ (commit 84ad3e2)
- [x] remote-productivity img-1..9 (9) — FIX 2,3,4,7; OK 1,5,6,8,9
- [x] ai-infographics-for-marketing-teams img-1..7 (7) — FIX 1,3,4,6; OK 2,5,7

## Батч 4q — 24 картинки (figma-instances img-1..3 уже проверены)
- [x] tabs-ui-design img-7,16,17 — img-7 OK, img-16 FIX (unread dot + count badge), img-17 OK
- [x] real-ux-work-in-tech-companies img-1,2,3 — все FIX (мультирукий UX, твит про кнопку, уницикл с Jira)
- [x] pricing-ui-design img-3,4,5 — img-3 OK, img-4 FIX (тёмные карточки, Purple Lift), img-5 OK
- [x] material-nextjs-ui-kit img-1,2,3 — img-1 FIX (bar chart), img-2 FIX (donut 8900/34.95 процента), img-3 FIX (search component + код)
- [x] landing-page-design-tips-for-startups img-2,3,4 — все FIX
- [x] choosing-right-ios-kit img-1,2,3 — все FIX (grid screens, phone mockup + pencil, hands on tablet)
- [x] case-study-journeyapp img-1,2,3 — все OK
- [x] calendar-ui-design img-1,4,5 — img-1 OK, img-4 FIX, img-5 FIX
- Батч 4q ЗАКРЫТ (commit 1baafd0 часть A, a4fa51c часть B)

## Батч 4r — 26 картинок
- [x] why-designers-are-loosing-motivation img-1,2 — img-1 FIX (многорукий дизайнер), img-2 OK (развилка дорог)
- [x] venice-ai-tool-private-uncensored img-1,2 — все FIX (таблица токеномики, сравнение API)
- [x] top-tips-for-new-businesses... img-1,2 — img-1 OK (иллюстрация «дверь»), img-2 FIX (дерево из UI-карточек)
- [x] strikethrough-text-deserves-more-love-in-ui img-4,5 — все FIX (to-do со зачёркиванием, слово done)
- [x] state-of-crypto-2025 img-1,2 — img-1 OK (маска + свинья CENTRALIZATION), img-2 FIX (регулирование)
- [x] pagination-ui-design img-5,11 — img-5 OK (disabled/hover), img-11 FIX (цветовые варианты)
- [x] optimizing-digital-marketing img-2,4 — все FIX (Patagonia Core Values, инфографика SEO)
- [x] how-to-cancel-adobe-subscription-without-fees img-1,2 — все FIX (экран отмены, мужчина с бумагой)
- [x] how-to-3d-animate-scroll img-1,2 — img-1 FIX (страница AirPods Pro), img-2 OK (чёрный кадр)
- [x] genius-ux-design-inventions img-1,3 — img-1 OK (телефон с портретами), img-3 OK (платёжная экосистема)
- [x] freelance-hourly-rate img-1,2 — все FIX (фрилансер за столом, интерфейс на iMac)
- [x] choosing-right-design-team img-1,2 — img-1 OK (экран с макетами), img-2 OK (скетчи вайрфреймов)
- [x] how-to-use-ai-ui-inspiration... img-4,5 — img-4 OK (центр уведомлений), img-5 OK (кнопка Send)
- Батч 4r ЗАКРЫТ (commit 40bea9b часть A, 8be32b9 часть B)

## Батч 4s — 12 картинок (liquid-glass img-12 уже проверена)
- [x] why-some-designers-dislike-ai img-1 — OK (проверена ранее, см. журнал)
- [x] why-apps-ux-is-getting-worse img-1 — FIX (треснувший экран iPhone)
- [x] using-quickbooks-to-calculate-saas-growth img-1 — FIX (лейка Organic Growth)
- [x] start-a-saas-business-with-no-money img-2 — FIX (основатель с мыслями)
- [x] launching-saas-with-zero-investments img-1 — FIX (человек у борда Startup growth)
- [x] how-to-swap-btc-to-eth-with-thorswap img-3 — OK (логотип Thorchain)
- [x] how-to-enhance-email-security img-2 — FIX (фишинг с крючком)
- [x] how-to-design-a-ui-kit-foundation img-8 — OK (DO/DON'T layout scaffolding)
- [x] empty-state-ui-design img-9 — FIX (кот в гамаке, zero emails)
- [x] difficult-design-clients img-1 — FIX (улыбающийся человек с ноутбуком)
- [x] avatar-ui-design img-19 — FIX (панель Collaboration с аватарами)
- [x] ais-impact-on-graphic-design img-1 — FIX (силуэт с рукой среди фигур)
- Батч 4s ЗАКРЫТ (commit 7c4e528)

Все батчи 4p–4s перепроверены чтением картинок. Итог: 78 картинок, из них FIX — 48, OK — 30.

## Журнал
- figma-tutorial-instances-management img-1 FIX (Row of userpic states...), img-2 FIX (Figma local styles panel...), img-3 FIX (Layers panel of the Userpic master...) — commit 99cd6c8
- why-some-designers-dislike-ai img-1 OK
- liquid-glass-design-explained-a-practical-guide img-12 OK

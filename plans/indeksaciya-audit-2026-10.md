# Технический аудит индексации (Wave 5) — октябрь 2026

Источник: план `.ai/content-strategy.md` (Wave 5), сырые данные
`plans/gsc-2026-10-10-raw-record.md`, `plans/Критические проблемы.csv`,
`plans/Диаграмма 2.csv`, плюс проверка кода.

## Итог одной строкой

Цифра «7 505 не проиндексировано» вводит в заблуждение: она почти целиком
состоит из наследия миграции с Webflow, а не из проблем живого сайта.
Живой сайт отдаёт около 300 URL. Единственный найденный дефект canonical
уже исправлен в тот же день — см. раздел 4.

## 1. Что говорит GSC (факт)

Разбивка «Критические проблемы» (страниц):

| Причина | Страниц |
|---|---|
| noindex | 1 948 |
| Вариант canonical | 1 675 |
| Просканировано, но не проиндексировано | 3 481 |
| Заблокировано 4xx | 210 |
| Дубликат, Google выбрал другой canonical | 67 |
| 404 | 50 |
| Страница с редиректом | 34 |
| Мягкая 404 | 28 |
| Заблокировано robots.txt | 7 |
| Обнаружено, но не проиндексировано | 4 |
| Дубликат, canonical не совпадает | 1 |
| 5xx | 0 |

Динамика (`Диаграмма 2.csv`): не проиндексировано держится на 7 505,
проиндексировано снизилось 3 332 → 2 827.

## 2. Сколько URL реально отдаёт сайт

Построчно из кода и данных:

| Источник | URL |
|---|---|
| Статические страницы (`STATIC_PATHS`) | 14 |
| Блог (`content/blog/*.mdx`) | ~184 (+ /blog) |
| Шаблоны (`TEMPLATE_PRODUCTS`) | 32 |
| Freebies (`FREEBIE_PRODUCTS`) | 52 |
| Дашборды (`DASHBOARD_TEMPLATES`) | 9 |
| Авторы (`AUTHORS`) | ~10 |
| **Итого в sitemap** | **~300** |

Проверено: sitemap собирается из этих источников
([`pages/sitemap.xml.ts`](pages/sitemap.xml.ts:56)), дедупликация есть
(Set по `loc`, строки 95–100). `/search` в sitemap не входит — правильно.

## 3. Главный вывод: это наследие, а не проблема

Разрыв между 7 505 «не проиндексировано» и ~300 живыми URL (в 25 раз)
означает, что подавляющая часть этой цифры — старый инвентарь Webflow:

- `.html`-страницы старого сайта (`page6223045.html` и подобные), которые
  теперь 301-редиректятся на чистые URL. Google ещё держит их в памяти,
  пока они не выпадут естественным путём.
- Старые пути вида `/orion/pricing`, `/material/components`,
  `/patterns/ios/navigation` — 226 редиректов в
  [`data/webflow-redirects.csv`](data/webflow-redirects.csv:1) их покрывают.
- Возможный вклад поддоменов (`react.`, `angular.`, `publish.`,
  `app.setproduct.com`) и превью-деплоев Vercel, которые по умолчанию
  отдают `noindex`.

Проверка кода: тег `noindex` объявлен **только в двух местах** —
[`components/pages/SearchPage.tsx`](components/pages/SearchPage.tsx:738)
(намеренно) и
[`components/pages/PushButtonsProtoPage.tsx`](components/pages/PushButtonsProtoPage.tsx:116)
(временный прототип). Значит 1 948 noindex-URL не порождаются текущим
кодом — они пришли извне. Точно сказать, откуда, можно только по
URL-списку из GSC (см. раздел 6).

## 4. Дефект canonical без www — ИСПРАВЛЕН (2026-10-10)

> **Статус: закрыто.** Дефект устранён коммитом [`7a152c6`](../../-) «fix: use
> www canonical in template and freebie pages» 2026-10-10 в 22:01, через
> 11 минут после коммита самого аудита. Ниже описан исходный диагноз и
> результат повторной проверки 2026-10-14. Правок в коде больше не требуется.

Четыре компонента собирают canonical с доменом **без www**:

| Файл | Строка |
|---|---|
| [`components/pages/TemplateDetailPage.tsx`](components/pages/TemplateDetailPage.tsx:26) | `https://setproduct.com/templates/${slug}` |
| [`components/pages/templates/GenericTemplatePage.tsx`](components/pages/templates/GenericTemplatePage.tsx:97) | `https://setproduct.com/templates/${slug}` |
| [`components/pages/templates/ChartsTemplatePage.tsx`](components/pages/templates/ChartsTemplatePage.tsx:31) | `https://setproduct.com/templates/${slug}` |
| [`components/pages/FreebieDetailPage.tsx`](components/pages/FreebieDetailPage.tsx:31) | `https://setproduct.com/freebies/${slug}` |

Всё остальное на сайте использует **www**-версию: [`data/pages-meta.ts`](data/pages-meta.ts:10),
[`lib/blog/site-config.ts`](lib/blog/site-config.ts:1)
(`CANONICAL_SITE_URL = "https://www.setproduct.com"`),
[`pages/sitemap.xml.ts`](pages/sitemap.xml.ts:10),
[`components/blog/BlogPostLayout.tsx`](components/blog/BlogPostLayout.tsx:30)
(через SITE_URL), [`components/pages/HomePage.tsx`](components/pages/HomePage.tsx:19).

**Почему это плохо:** sitemap указывает www-адреса, а страницы деталей
шаблонов и freebies заявляют canonical без www. Это два разных хоста для
Google, и он получает противоречивый сигнал о канонической версии. Такой
разрыв попадает в корзину «Вариант canonical» (1 675) и «Дубликат,
canonical не совпадает». Затронуто около 84 страниц (32 шаблона +
52 freebie).

**Фикс (выполнен):** подставлен `CANONICAL_SITE_URL` из
[`lib/blog/site-config.ts`](lib/blog/site-config.ts:3) вместо хардкода.
Правка в четырёх компонентах плюс экспорт константы. `CANONICAL_SITE_URL`
равен `https://www.setproduct.com`, то есть canonical остаётся на
production-домене и на Vercel-preview (в отличие от `SITE_URL`, который
подменяется на preview-хост).

### 4.1. Повторная проверка 2026-10-14 (факт)

- В коде больше нет ни одного хардкода `https://setproduct.com` в
  canonical: четыре компонента используют `CANONICAL_SITE_URL`.
- В собранном HTML всех 32 страниц шаблонов и всех страниц freebies
  canonical содержит `www`. Ни одного canonical без www не найдено.
- В `content/blog/*.mdx` канонические адреса заданы во frontmatter у 19
  постов, все 19 — с `www`. У остальных canonical подставляется из
  `SITE_URL` (дефолт `CANONICAL_SITE_URL`, то есть тоже www).
- Хост `setproduct.com` отвечает `307 → https://www.setproduct.com/` на
  корне и на внутренних путях. Это делает редирект сам Vercel
  (домен-связка), а не `next.config.js` и не `vercel.json` — в обоих
  конфигах правил для хоста нет.

### 4.2. Остаточная мелочь: 8 внутренних ссылок без www

В собранном HTML шести постов нашлись внутренние ссылки на
`https://setproduct.com/...` без www:

| Пост | Ссылок |
|---|---|
| `tabs-ui-design` | 3 (на `appbar-ui-design`, `settings-ui-design`, `notifications-ui-design`) |
| `how-to-use-ai-ui-inspiration-to-design-faster-without-copying-blindly` | 1 (на `/all`) |
| `the-ui-designer-who-built-a-50k-month-template-store` | 1 (на `/all`) |
| `startup-niches-always-money-printing` | 1 (на `/`) |
| `top-design-releases-2020` | 1 (на `/`) |
| `how-to-design-a-ui-kit-foundation` | 1 (на `/all`, схема `http://`) |

Влияние низкое: хост отвечает 307 на www, то есть Google и пользователи
попадают на правильный URL, а ссылочный вес переносится постоянным
редиректом. Это не дефект canonical и не ошибка индексации. Чинится
заменой домена в теле постов; отдельного захода не требует, можно
подобрать при следующей правке этих постов.

## 5. Мелкая гигиена

- [`pages/push-buttons-proto.tsx`](pages/push-buttons-proto.tsx:1) +
  [`components/pages/PushButtonsProtoPage.tsx`](components/pages/PushButtonsProtoPage.tsx:1) —
  временный прототип (`noindex, nofollow`), комментарий в коде говорит
  «Remove after push buttons ship». В sitemap не входит. Нужно решение
  владельца: удалить или оставить.
- `NEXT_PUBLIC_SITE_URL` не описан в [`.env.example`](.env.example:1)
  (там только `NEXT_PUBLIC_GA_ID`), хотя
  [`lib/blog/site-config.ts`](lib/blog/site-config.ts:9) его читает.
  На проде не задан → используется www-дефолт, то есть всё корректно.
  Косметика: добавить в пример для документации.

## 6. Что нужно от владельца

CSV «Критические проблемы» содержит только **счётчики**, без URL. Чтобы
закрыть вопросы из раздела 3, нужен **URL-список** по каждой корзине из
интерфейса GSC (Страницы → Индексирование страниц → нажать на причину →
«Экспорт»). Без него можно честно утверждать только одно: текущий код
таких страниц не порождает, значит это внешний/исторический инвентарь.

Минимально нужны три списка:
1. noindex (1 948) — понять, какие хосты их отдают.
2. Вариант canonical (1 675) — проверить, попадает ли туда наш дефект без www.
3. Заблокировано 4xx (210) и 404 (50) — проверить, нет ли живых ссылок на них.

## 7. Приоритет действий

| Приоритет | Действие | Тип |
|---|---|---|
| 1 | Починить canonical без www в 4 компонентах | код, `fix:`, закрыто 2026-10-10, `7a152c6` |
| 2 | Запросить URL-списки из GSC (3 корзины) | действие владельца |
| 3 | Решить судьбу `push-buttons-proto` | решение владельца |
| 4 | Дописать `NEXT_PUBLIC_SITE_URL` в `.env.example` | косметика |
| 5 | Заменить домен в 8 внутренних ссылках без www | контент, низкий приоритет |
| — | Хост-редирект non-www на www работает на уровне домена Vercel | закрыто |
| — | Anchor-URL — уже разобрано в Шаге 1 | закрыто |

## 8. Чего НЕ делать

- Не удалять 226 редиректов из `data/webflow-redirects.csv` — они рабочие
  и именно они гасят старый инвентарь.
- Не добавлять `Disallow` в robots.txt под старые пути: правила
  AGENTS.md запрещают трогать robots-логику без явного запроса, а запрет
  сканирования помешает Google увидеть 301 и выкинуть URL.
- Не менять типы редиректа с 301 на 302.

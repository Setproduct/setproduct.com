# Двоеточия в `title` — системный долг (октябрь 2026)

Не делаем сейчас. Файл нужен, чтобы не потерять масштаб и не переоткрывать
вопрос заново. Источник правила: `.roo/skills/seo/SKILL.md` (двоеточие в
title/metaTitle запрещено, режет сниппет в SERP) и
[`AGENTS.md`](../AGENTS.md:145).

## Масштаб

Проверено по `content/blog/*.mdx`: **47 постов из 184** имеют двоеточие
в `title`. Из них **19 — компонентные гайды**, то есть тот же кластер,
который в Wave 1 терял позиции.

## Распределение по длине (у 47 постов)

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
- `why-landing-page-optimization-is-essential` ��� `Landing page optimization: 8 rules that move conversion`

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

## Остальные (низкий приор��тет)

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

## Что НЕ делать

- Не менять title вслепую, без процедуры скилла `seo` (3 варианта + выбор
  владельца): это метаданные в живом SERP.
- Не трогать `slug` при правке title: URL-адреса должны остаться прежними.
- Не менять title и description в одном коммите с правками тела: причины
  изменения разные.

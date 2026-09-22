# Обложка для поста «AI agent UI design patterns» — сбалансированный вариант

Формат: **16:9**. Сетка: **два ряда по 8 ячеек = 16 слотов**. Фон: **любой пастельный, не белый**. Стиль **не задаю** — выбираешь сам.

**Баланс, который нужен.** Не голые пиктограммы (пусто и невыразительно) и не мелкие мокапы интерфейса с кучей деталей (каша в миниатюре). Золотая середина:

- В каждой ячейке — **одна крупная понятная иконка как главный герой** (жирный контур, занимает ~60% ячейки), читается в миниатюре.
- Плюс **1-2 вспомогательных штриха** рядом с иконкой (намёк на интерфейс: пара линий, точка-статус, галочка, ползунок) — ровно столько, чтобы ячейка ожила, но не превратилась в мокап.
- Под каждой иконкой — **одно короткое слово-подпись**, крупным читаемым шрифтом (не мелким).
- **Мягкая группировка по 5 фазам цветом** — лёгкие пастельные зоны за ячейками, чтобы издалека была видна структура.

16 ячеек по строкам (иконка → подпись), сгруппированы по 5 фазам:

Ряд 1: 1 мишень → clarify · 2 рамка-скобки → scope · 3 чек-лист → plan · 4 монета+часы → cost · 5 пунктирный круг → dry-run · 6 степпер → ledger · 7 скобка кода → tools · 8 лампочка → reasoning
Ряд 2: 9 кольцо прогресса → background · 10 щит → gates · 11 стопка+галочка → batch · 12 пауза → interrupt · 13 diff +/− → diff · 14 спидометр → confidence · 15 undo-стрелка → undo · 16 рукопожатие → handoff

Фазы (цветные зоны): ячейки 1-2 intent · 3-5 plan · 6-9 execution · 10-12 checkpoint · 13-16 result.

---

## Промпт (EN)

A 16:9 blog cover for an article about designing user interfaces for autonomous AI agents. The design must stay clean and readable both full-width and as a small thumbnail on a homepage, so aim for a balanced level of detail — expressive but never cluttered.

Fill the canvas with a soft pastel non-white background. Behind the cells, add five very gentle pastel color zones that group the grid into the five stages of an agent's work, differing just enough to be sensed from a distance without ever looking loud: cells 1–2 in one tint, cells 3–5 in a second, cells 6–9 in a third, cells 10–12 in a fourth, cells 13–16 in a fifth.

On top, lay out exactly sixteen rounded cells in two rows of eight, evenly spaced with comfortable breathing room. Each cell follows the same simple recipe: one large, bold, clearly drawn icon as the hero of the cell, occupying roughly sixty percent of the space, in a consistent thick line weight so it survives shrinking; beside or around that icon, one or two light supporting strokes that merely hint at an interface — a couple of short lines, a small status dot, a tick, a slider handle — just enough to make the cell feel alive without turning it into a detailed screenshot; and beneath the icon, a single short caption word set in a clean, reasonably large sans-serif that stays legible at thumbnail size. No paragraphs, no multi-word labels, no tiny mockups, no dense dashboards.

The sixteen cells, in reading order, with their hero icon and caption word: (1) a target with a center dot, caption clarify; (2) a bracket frame marking a boundary, caption scope; (3) a short checklist with ticks, caption plan; (4) a coin overlapping a clock, caption cost; (5) a dashed hollow circle, caption dry-run; (6) a vertical stepper of connected dots with one active, caption ledger; (7) a code bracket glyph, caption tools; (8) a lightbulb, caption reasoning; (9) a three-quarter progress ring, caption background; (10) a shield, caption gates; (11) a small stack of layers topped by one checkmark, caption batch; (12) a pause symbol of two bars, caption interrupt; (13) a split square with a plus and a minus, caption diff; (14) a semicircular needle gauge, caption confidence; (15) a circular undo arrow, caption undo; (16) two simple hands meeting, caption handoff. Keep all sixteen icons in one visual family — same stroke thickness, same corner rounding, same abstraction level — so they read as a single coherent system.

Optionally place five short phase words once per color zone, above or below each zone — intent, plan, execution, checkpoint, result — in a subtle bold sans-serif, so the underlying five-stage lifecycle is legible without repeating anything per cell. You may also add one short bold title along the top edge, for example 16 AI agent UI patterns, but keep it optional and restrained.

Discipline the palette: cells sit light and clean against the pastel zones, icons share one confident accent color (deep indigo, teal, or violet), and semantic green, amber, or red appear only in the few cells where meaning truly calls for it (the shield, the diff, the gauge, the pause). Prioritize high figure-ground contrast, generous spacing, and consistent line weights. No photographic realism, no detailed faces, no visual noise. The finished cover should feel like a confident, editorial poster-index: from a distance the five color zones and sixteen bold icons give instant structure and pull the click; up close, the small supporting strokes and caption words reward attention and promise a complete, practical system inside.

# Image prompts — bento-grid-layout-design-guide.mdx

Style bible used for every image below (keep consistent so the whole guide reads as one visual system, and so each image rewards a close look instead of being skimmed past):

- Flat vector infographic / annotated diagram style, not a photo, not a literal screenshot of a real product UI.
- Background: off-white or very light grey (#f7f7f7 / #fbfaff).
- Line weight: thin, consistent 1.5-2px outlines.
- Accent color: Setproduct purple #7c4dff for every dimension label, arrow, callout, and highlight. Everything else stays neutral grey/black/white so the purple always marks "the thing to look at."
- Typography in the image: small geometric sans-serif labels (numbers, unit labels like "2×1", "16px", "24px") placed directly on the diagram, the way a spec sheet or a Figma redline would.
- Every teardown image is an **abstract reinterpretation**, never a literal logo or copied screenshot. No wordmarks, no real UI chrome, no recognizable icon sets. Reference only shape language, density, and color mood.
- Composition leaves clean negative space on one side so the float-wrap text does not run into busy areas (the images render at ~40% column width, float right, text wraps on the left).

Each entry below matches an existing `img-N` placeholder already sitting in `content/blog/bento-grid-layout-design-guide.mdx`. Alt text is kept identical to what is already in the MDX file so no code change is needed once the real image is dropped in.

---

## Section: The grid math

**Image prompt — img-2:**
A vertical spec-sheet-style infographic on a light background, four stacked labeled blocks read top to bottom like a designer's redline. Block 1: a single small square labeled "base unit — 8px" with a ruler tick mark. Block 2: a row of four rectangles of different sizes labeled "1×1", "2×1", "1×2", "2×2" (the footprint family), each with a thin purple dimension line. Block 3: a 12-column page grid with a 4-unit bento grid overlaid in purple, an arrow and label showing "1 unit = 3 columns". Block 4: a small formula card showing a corner-radius circle at 24px next to a gap measurement arrow labeled "12-20px gap", with the relationship written as "gap = 0.5-1× radius". Thin purple connector lines link each block to the next, implying a top-to-bottom derivation.

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Vertical spec sheet showing bento grid math: base unit, footprint family, column translation, and gap-radius formula

Filename: bento-grid-layout-design-guide-grid-math.webp

---

## Section: Radius, row height and nesting

**Image prompt — img-3:**
A three-panel annotated diagram, light background, purple accents only. Panel 1 (top): a rounded rectangle with a smaller rounded badge nested inside its corner, both corners labeled with radius values ("outer 24px", "inner 8px"), a small formula strip underneath reading "inner ≈ outer − padding, floor 4px". Panel 2 (middle): two side-by-side mini grids, left one labeled "grid-auto-rows: 104px" showing uniform row bands, right one labeled "aspect-ratio: 1/1" showing a square cell deriving its own height, both with a purple horizontal guideline proving equal row height. Panel 3 (bottom): a small 4-cell grid where one cell has jumped out of source order with a red-purple warning arrow and the label "grid-auto-flow: dense breaks DOM order", next to a crossed-out icon over that property name.

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Diagram showing the nested corner radius formula, two methods for shared row height, and why grid-auto-flow dense breaks DOM order

Filename: bento-grid-layout-design-guide-radius-row-height.webp

---

## Section: Content hierarchy

**Image prompt — img-4:**
A single horizontal row of four bento cells side by side, ordered largest to smallest left to right: a 2×2 cell holding a simple screenshot-shaped rectangle plus one short label line, a 2×1 cell holding a headline bar plus one line of body text, a 1×2 tall cell holding three small stacked bullet dots with short lines, and a 1×1 square cell holding just a single bold number. A long, fading indigo/purple arrow runs underneath all four cells from left to right with the label "content density drops →" fading in opacity to visually show the rule described in the text.

Aspect ratio: 16:9 (full width, no float, sits alone in the section)

Alt text: Four bento cells in one row from largest to smallest, each holding the content it actually fits, with a fading indigo arrow showing density dropping from left to right

Filename: bento-grid-layout-design-guide-content-hierarchy.webp

---

## Section: 12 teardowns

Each teardown image below floats right beside its own `### <Brand>` heading. Keep every one an **abstract mood-board reinterpretation** built only from shape language and color, no wordmarks, no copied UI. Add one small purple callout label on each image showing the footprint of the hero cell (matches the "Grid:" line already in the text), so the reader's eye has a reason to actually study the graphic instead of scrolling past it.

**Image prompt — img-5 (Apple):**
A minimal bento grid, mostly white space, one dominant 2×2 tile holding a single smooth abstract product silhouette (rounded, generic, not any real device) rendered in soft grey gradients, surrounded by two or three small calm 1×1 and 2×1 tiles containing nothing but a subtle icon-shaped dot. A small purple corner tag on the hero tile reads "2×2". Extremely generous negative space, almost gallery-like.

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Apple's product pages, with one dominant 2x2 tile holding a single product render and small, calm supporting tiles beside it

Filename: bento-grid-layout-design-guide-teardown-apple.webp

**Image prompt — img-6 (Linear):**
A tight bento grid of white cards outlined with a single thin violet accent line, each card holding a tiny abstract cropped-UI shape (rows of grey rectangles suggesting an interface, no real text or icons), one violet accent color used consistently across every tile's outline and one small dot indicator. A small purple tag on the largest tile reads "2×1".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Linear's marketing page, tightly cropped light-mode UI mockups in white cards outlined with a single violet accent

Filename: bento-grid-layout-design-guide-teardown-linear.webp

**Image prompt — img-7 (Vercel):**
A strict black-line-on-white bento grid, two or three wide horizontal tiles suggesting terminal/code output as simple monospace-style grey bars of varying length on a black card, no real syntax highlighting or logos. One tile is clearly wider than the others. Small purple tag reads "3×1".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Vercel's marketing page, wide code and terminal-output tiles rendered in a strict black-line-on-white style

Filename: bento-grid-layout-design-guide-teardown-vercel.webp

**Image prompt — img-8 (Raycast):**
A colorful bento grid of small icon-plus-label tiles reimagined in light mode, each tile a different pastel tint (soft coral, mint, lavender, butter yellow) with one simple abstract rounded-square icon shape and a short grey line standing in for a label, roughly 7-8 tiles total in a dense but organized layout. One larger 2×2 tile anchors the group. Small purple tag on it reads "2×2".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Raycast's marketing page, colorful icon-plus-label tiles reimagined in light mode with pastel-tinted cards on white

Filename: bento-grid-layout-design-guide-teardown-raycast.webp

**Image prompt — img-9 (Arc browser):**
A bento grid with unusually tall and wide tiles, one tall 1×2 tile and one wide 2×1 tile both containing a soft looping-motion cue (a subtle circular arrow or blurred trail suggesting animation, not a real screenshot), pastel gradient backgrounds, playful but restrained. Small purple tag reads "1×2".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Arc browser's marketing page, tall and wide tiles suggesting looping interaction previews instead of static screenshots

Filename: bento-grid-layout-design-guide-teardown-arc.webp

**Image prompt — img-10 (Supabase):**
A dark-mode-leaning bento grid where two tiles hold abstract code-block shapes (grey monospace bars on near-black background) and a third holds a simple schema-diagram abstraction (three small connected boxes with thin lines), all carrying more visual density and weight than a plain text-only tile beside them. Small purple tag on the widest tile reads "2×1".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Supabase's marketing page, code and schema-diagram tiles carrying more visual weight than plain marketing-copy tiles

Filename: bento-grid-layout-design-guide-teardown-supabase.webp

**Image prompt — img-11 (Framer):**
A bento grid where every tile is filled edge to edge with a simplified abstract website-mockup shape (a rectangle with a thin header bar and two or three colored content blocks suggesting a real site screenshot, no actual text or logos), varied color palettes per tile to suggest "different real customer sites". One 2×2 hero tile is clearly the largest. Small purple tag reads "2×2".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Framer's marketing page, tiles filled with realistic website screenshot mockups instead of generic icons

Filename: bento-grid-layout-design-guide-teardown-framer.webp

**Image prompt — img-12 (Notion):**
A calm bento grid of several near-equal-sized 1×1 and 2×1 tiles in soft neutral tones, each holding one simple abstract use-case icon (a document shape, a checkbox row, a small calendar grid), with one visibly larger tile anchoring the group representing "the whole workspace" using a slightly bigger nested grid pattern inside it. Small purple tag on the anchor tile reads "2×1".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Notion's marketing page, several near-equal-sized use-case tiles anchored by one larger workspace tile

Filename: bento-grid-layout-design-guide-teardown-notion.webp

**Image prompt — img-13 (Tailwind UI / Tailwind Plus):**
A catalog-style bento grid where tile size clearly correlates with visual complexity rather than importance: a large 2×2 tile holds a dense abstract dashboard-preview shape (many small nested rectangles), a medium 2×1 tile holds a simpler component shape (two stacked bars), and small 1×1 tiles hold a single tiny badge shape each. Small purple tag on the largest tile reads "2×2".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Tailwind UI's marketing page, a catalog-style grid where tile size tracks component complexity rather than importance

Filename: bento-grid-layout-design-guide-teardown-tailwind-ui.webp

**Image prompt — img-14 (Cursor):**
A bento grid with one clearly wide 2×1 tile holding an abstract code-editor shape (grey monospace lines with one line highlighted in purple to suggest an AI-assisted edit), sized noticeably larger than the small 1×1 tiles beside it which hold single icon shapes. Small purple tag on the editor tile reads "2×1".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Cursor's marketing page, a wide code-editor screenshot tile sized for legibility next to smaller supporting tiles

Filename: bento-grid-layout-design-guide-teardown-cursor.webp

**Image prompt — img-15 (Resend / Loops):**
A minimal bento grid, mostly white space, small 1×1 and 2×1 tiles each holding a short abstract API-snippet shape (two or three thin monospace-style grey bars with one purple-highlighted token) instead of any icon or adjective. Very little visual noise, deliberately sparse. Small purple tag on the widest tile reads "2×1".

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid inspired by Resend and Loops marketing pages, minimal tiles built around an API code snippet instead of an icon and adjective

Filename: bento-grid-layout-design-guide-teardown-resend-loops.webp

**Image prompt — img-16 (generic personal portfolio):**
A bento grid resembling a generic personal-portfolio template, four or five tiles of near-identical size and identical visual weight (same grey placeholder-image shape repeated in every tile, same tiny caption line under each), with no tile standing out as more important, intentionally flat and undifferentiated to illustrate the "weak spot" described in the text. No purple tag on any tile, since the whole point is the absence of a clear hero cell.

Aspect ratio: 4:3 inline (floats right, ~40% column width)

Alt text: Abstract bento grid resembling a generic personal portfolio template, tiles of near-identical visual weight with no clear size hierarchy

Filename: bento-grid-layout-design-guide-teardown-portfolio.webp

---

## Section: Responsive behavior

**Image prompt — img-responsive:**
A three-frame horizontal sequence on a light background showing the same bento grid collapsing across breakpoints, left to right: frame 1 "Desktop" shows a full 12-column grid with 5-6 varied tiles (2×2 hero, 2×1 wide, several 1×1); frame 2 "Tablet" shows the same tiles simplified to a 4-6 column layout with the tallest/widest cells reduced to 2×1 or 1×1; frame 3 "Mobile" shows every tile stacked full-width in a single column. Small numbered purple badges (1, 2, 3...) sit on each tile in every frame, and thin purple arrows trace tile 1 from frame to frame, then tile 2, then tile 3, visually proving the DOM order stays identical across all three frames even as the visual layout changes.

Aspect ratio: 16:9 (full width, no float, sits alone in the section)

Alt text: Diagram of a bento grid collapsing from a 12-column desktop layout to a single-column mobile stack, with DOM order arrows matching the mobile order

Filename: bento-grid-layout-design-guide-responsive-collapse.webp

---

## Section: Building a bento grid with an AI agent — layout manifest

**Image prompt — img-manifest:**
A split-panel diagram, light background. Left panel: a clean JSON code block (monospace, dark card, syntax-highlighted keys in purple) showing a short layout manifest with 3-4 cell entries, each with "id", "footprint", "priority" fields visible. Right panel: the generated bento grid rendered from that manifest, with matching cell shapes and sizes. Thin purple dashed arrows connect each JSON entry on the left to its corresponding cell on the right, with small labels repeating the shared "id" value (like "hero", "api") at both ends of each arrow, making the one-to-one mapping obvious at a glance.

Aspect ratio: 16:9 (full width, no float, sits alone in the section)

Alt text: Diagram: layout manifest JSON on the left, generated CSS grid on the right, arrows mapping each cell id to its grid-area

Filename: bento-grid-layout-design-guide-layout-manifest.webp

---

## Section: 7 mistakes that turn a bento into a tile wall

**Image prompt — img-before-after:**
A side-by-side before/after comparison, light background, thin divider line down the middle. Left half labeled "Before" in muted red-grey: a messy bento grid where every tile is the same size, gaps are inconsistent, corner radii mismatch between nested elements, and one tile has visibly small text crammed into it. Right half labeled "After" in purple: the same content reorganized into a clean bento grid with one clear 2×2 hero tile, consistent gap and radius, no crammed text, and a visible logical DOM-order arrow running through the tiles. Small purple checkmark icons appear next to each fixed issue on the "After" side.

Aspect ratio: 16:9 (full width, no float, sits alone in the section)

Alt text: Before and after comparison of a bento grid with all seven mistakes present, and the same grid corrected

Filename: bento-grid-layout-design-guide-before-after.webp

---

## Next steps after generating the images

1. Generate all 18 images above in Nano Banana Pro (or your preferred tool), one prompt per image, keeping the shared style bible consistent across every generation pass.
2. Save each file at `/public/blog/assets/bento-grid-layout-design-guide/<filename>` using the exact filenames listed above (or update the MDX paths to match whatever filenames you actually save).
3. Run `node check_images2.js` to confirm no broken references remain in the MDX after the real files replace the current `img-N.webp` placeholders.
4. No MDX text changes are needed for the 4 non-teardown images (img-2, img-3, img-4, img-responsive, img-manifest, img-before-after) since their alt text already matches these prompts exactly. The 12 teardown images already carry the "float" marker and matching alt text too, so dropping in the real files is a pure asset swap.

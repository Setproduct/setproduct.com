#!/bin/sh
# Renders the HTML sources in this folder to PNG with headless Brave, then
# converts them to WebP with sharp. Run from the repo root:
#
#   sh plans/guest-post-not-ranking-images-src/build.sh            # all images
#   sh plans/guest-post-not-ranking-images-src/build.sh cover      # one image
#
# Output goes to /tmp/gpnr/out. Nothing under public/ is written here on
# purpose: files are copied by hand after a visual check, and a replaced image
# always gets a NEW file name (see AGENTS.md, image cache rule).
set -e

BROWSER="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
SRC="$(cd "$(dirname "$0")" && pwd)"
OUT=/tmp/gpnr/out
mkdir -p "$OUT"
URLBASE="file://$(printf '%s' "$SRC" | sed 's/ /%20/g')"

# name width height scale
LIST="01-seven-causes-timeline 1600 900 1.5
02-tabs-ui-design-search-console-figures 800 1000 2
03-research-protocol-map 1600 900 1.5
04-delegate-order-deadline 520 650 2.5
cover 1920 1080 1"

echo "$LIST" | while read -r NAME W H SCALE; do
  if [ -n "$1" ] && [ "$1" != "$NAME" ]; then continue; fi
  "$BROWSER" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor="$SCALE" --window-size="$W,$H" \
    --virtual-time-budget=4000 \
    --screenshot="$OUT/$NAME.png" "$URLBASE/$NAME.html" >/dev/null 2>&1
  node -e "
    const sharp = require('sharp');
    const [name] = process.argv.slice(1);
    sharp('$OUT/' + name + '.png')
      .webp({ quality: 86, effort: 6 })
      .toFile('$OUT/' + name + '.webp')
      .then((i) => console.log(name, i.width + 'x' + i.height, Math.round(i.size / 1024) + ' KB'));
  " "$NAME"
done

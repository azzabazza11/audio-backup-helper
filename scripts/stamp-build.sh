#!/bin/bash
# Stamp build time into index.html and docs/index.html (local wall clock).
set -e
STAMP=$(date '+%Y-%m-%d %H:%M')
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
for f in index.html docs/index.html; do
  [ -f "$f" ] || continue
  # HTML: v1.6.4 · stamp
  sed -i "s/id=\"appVer\">v\([0-9.]*\)[^<]*/id=\"appVer\">v\1 · $STAMP/" "$f"
  # JS constant used for display + diagnostics
  if grep -q "const APP_BUILD" "$f"; then
    sed -i "s/const APP_BUILD = '[^']*'/const APP_BUILD = '$STAMP'/" "$f"
  fi
done
echo "Stamped build $STAMP"

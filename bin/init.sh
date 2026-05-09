#!/usr/bin/env bash
#
# Customize a freshly-cloned game-tracker-template for a new project.
# Replaces placeholder strings in src/consts.ts and src/styles/global.css
# based on values from the Phase 4 (DESIGN.md) dossier.
#
# Usage:
#   bin/init.sh
#
# Exits non-zero if any required input is empty.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== game-tracker-template scaffolding ==="
echo
echo "Reads values from your Phase 4 design dossier and patches them into"
echo "src/consts.ts + src/styles/global.css. You can re-run this multiple times."
echo

read -rp "Site name (e.g. MapleAhead): " SITE_NAME
read -rp "One-line tagline: " SITE_TAGLINE
read -rp "Short description (for meta tags): " SITE_DESC
read -rp "Target domain (e.g. example.gg or leave blank): " SITE_DOMAIN
read -rp "Contact email (real, reachable): " CONTACT_EMAIL
read -rp "Brand voice direction (one phrase): " BRAND_VOICE
echo
echo "--- Palette (hex values; pick from Phase 4 visual identity board) ---"
read -rp "  Primary accent (e.g. #e89a3c): " ACCENT_400
read -rp "  Accent strong (darker variant, e.g. #cc7a1a): " ACCENT_500
read -rp "  Accent soft (lighter variant, e.g. #f7c97a): " ACCENT_300
read -rp "  Warn / cinnabar (e.g. #e96a6a): " WARN_400
echo
echo "--- Game state ---"
read -rp "  Source region (CN/KMS/JP/...) or 'none' if single-region: " SOURCE_REGION
read -rp "  Target region (Global/GMS/NA/...): " TARGET_REGION
read -rp "  Source version (or blank): " SOURCE_VER
read -rp "  Target version (or blank): " TARGET_VER

[ -z "$SITE_NAME" ] && { echo "Site name required" >&2; exit 1; }

SITE_URL="https://example.com"
[ -n "$SITE_DOMAIN" ] && SITE_URL="https://$SITE_DOMAIN"

TODAY=$(date +%Y-%m-%d)

echo
echo "Patching src/consts.ts ..."
# Use perl for portable in-place edit (sed -i has macOS/Linux differences)
perl -i -pe "s|export const SITE_URL = '[^']*';.*|export const SITE_URL = '$SITE_URL';|" src/consts.ts
perl -i -pe "s|export const SITE_NAME = '[^']*';.*|export const SITE_NAME = '$SITE_NAME';|" src/consts.ts
perl -i -pe "s|export const SITE_TAGLINE = '[^']*';.*|export const SITE_TAGLINE = '$SITE_TAGLINE';|" src/consts.ts
perl -i -pe "s|export const SITE_DESCRIPTION = '[^']*';.*|export const SITE_DESCRIPTION = '$SITE_DESC';|" src/consts.ts
perl -i -pe "s|export const SOURCE_REGION = '[^']*';.*|export const SOURCE_REGION = '$SOURCE_REGION';|" src/consts.ts
perl -i -pe "s|export const TARGET_REGION = '[^']*';.*|export const TARGET_REGION = '$TARGET_REGION';|" src/consts.ts
perl -i -pe "s|export const SOURCE_VERSION = '[^']*';.*|export const SOURCE_VERSION = '$SOURCE_VER';|" src/consts.ts
perl -i -pe "s|export const TARGET_VERSION = '[^']*';.*|export const TARGET_VERSION = '$TARGET_VER';|" src/consts.ts
perl -i -pe "s|export const SNAPSHOT_DATE = '[^']*';.*|export const SNAPSHOT_DATE = '$TODAY';|" src/consts.ts
perl -i -pe "s|export const BRAND_VOICE = '[^']*';.*|export const BRAND_VOICE = '$BRAND_VOICE';|" src/consts.ts
perl -i -pe "s|export const CONTACT_EMAIL = '[^']*';.*|export const CONTACT_EMAIL = '$CONTACT_EMAIL';|" src/consts.ts

echo "Patching src/styles/global.css ..."
perl -i -pe "s|--color-accent-400: #[0-9a-fA-F]+;|--color-accent-400: $ACCENT_400;|" src/styles/global.css
perl -i -pe "s|--color-accent-500: #[0-9a-fA-F]+;|--color-accent-500: $ACCENT_500;|" src/styles/global.css
perl -i -pe "s|--color-accent-300: #[0-9a-fA-F]+;|--color-accent-300: $ACCENT_300;|" src/styles/global.css
perl -i -pe "s|--color-warn-400: #[0-9a-fA-F]+;|--color-warn-400: $WARN_400;|" src/styles/global.css

echo "Bumping LAST_REVIEWED in data files ..."
for f in src/data/*.ts; do
  perl -i -pe "s|export const LAST_REVIEWED = '[^']*';|export const LAST_REVIEWED = '$TODAY';|" "$f"
done

echo
echo "✅ Scaffolding done."
echo
echo "Next steps:"
echo "  1. Replace public/favicon.svg + public/og-default.svg with branded marks"
echo "     (see DESIGN.md → Visual identity → Motif)"
echo "  2. Customize src/components/Header.astro NAV_ITEMS for your actual tools"
echo "  3. Replace src/pages/index.astro with a homepage matching your audience priority"
echo "  4. Begin Phase 6 (data layer) — fill in src/data/*.ts with real game data"
echo "  5. Build per-entity dynamic routes in src/pages/[entity]/[id].astro"
echo
echo "Run 'npm install && npm run dev' to start the dev server."

// Single source of truth for site identity.
// All meta tags, sitemap, OG, and canonical links pull from here.

export const SITE_URL = 'https://rivalslab.gg';
export const SITE_NAME = 'RivalsLab';
export const SITE_TAGLINE = 'Team-Up explorer + map-aware picks for Marvel Rivals.';
export const SITE_DESCRIPTION =
  'Discover the team-ups that win matches and the heroes that win maps. Patch-aware, mobile-first, built for Diamond-III queue brain.';
export const SITE_LOCALE = 'en_US';
export const SITE_TWITTER = '';
export const SITE_AUTHOR = 'RivalsLab';

// Game-state snapshot — bumped each patch. See OPERATE.md.
export const SOURCE_REGION = 'GLOBAL';
export const TARGET_REGION = 'GLOBAL';
export const SOURCE_VERSION = '20260507';
export const SOURCE_VERSION_NAME = 'Season 7.5 — Lucky Loan';
export const TARGET_VERSION = '20260515';
export const TARGET_VERSION_NAME = 'Season 8';
export const SNAPSHOT_DATE = '2026-05-09';

// Brand voice direction used by AI-assisted content generation.
export const BRAND_VOICE =
  'Knowledgeable Diamond-III peer — patch-aware, team-up-fluent, queue-anxious, mobile-second-screen reader. No wiki bot tone.';

// Feature flags — leave empty until eligible. See REVENUE.md.
export const ADSENSE_CLIENT = '';
export const PLAUSIBLE_DOMAIN = '';

// Contact email surfaced in /privacy, /terms, AdSense application.
export const CONTACT_EMAIL = 'hello@rivalslab.gg';

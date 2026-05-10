// RSS feed — publishes the most recent Marvel Rivals patch entries + the
// upcoming patch as items. Built from src/data/patches.ts so each maintenance
// bump (every patch) auto-refreshes the feed.
//
// Why: a populated RSS feed is a backlink magnet — game news aggregators and
// patch-tracker apps subscribe to it; each patch entry pulls fresh inbound
// link equity. Empty RSS (the template default) signals an inactive site.

import type { APIContext } from 'astro';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_AUTHOR } from '@/consts';
import { TARGET_PATCHES, UPCOMING } from '@/data/patches';

export async function GET(_context: APIContext): Promise<Response> {
  // Upcoming patches first (each as an item with a synthetic windowStart pubDate).
  const upcomingItems = UPCOMING.map((u) => ({
    title: `${u.codename} — confirmed for ${u.windowStart}`,
    link: `${SITE_URL}/patches/`,
    pubDate: new Date(u.windowStart + 'T00:00:00Z').toUTCString(),
    description: u.highlights.map((h) => `${h.name}: ${h.blurb}`).join(' • ') +
      (u.prepRecap.length > 0 ? ' Prep: ' + u.prepRecap.join('; ') : ''),
    guid: `${SITE_URL}/patches/#${u.targetVersion}`,
  }));

  // Then shipped patches, newest first.
  const shippedItems = [...TARGET_PATCHES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({
      title: `${p.codename ?? p.version} (${p.season})`,
      link: p.sourceUrl ?? `${SITE_URL}/patches/`,
      pubDate: new Date(p.date + 'T00:00:00Z').toUTCString(),
      description: p.highlights.map((h) => `${h.name}: ${h.blurb}`).join(' • '),
      guid: `${SITE_URL}/patches/#${p.version}`,
    }));

  // Site-level item at the top, then patches.
  const items = [
    {
      title: SITE_NAME,
      link: SITE_URL,
      pubDate: new Date().toUTCString(),
      description: SITE_DESCRIPTION,
      guid: SITE_URL,
    },
    ...upcomingItems,
    ...shippedItems,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>noreply@rivalslab.gg (${escapeXml(SITE_AUTHOR)})</managingEditor>
    <generator>Astro · RivalsLab</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .map(
        (i) => `<item>
      <title>${escapeXml(i.title)}</title>
      <link>${escapeXml(i.link)}</link>
      <guid isPermaLink="false">${escapeXml(i.guid)}</guid>
      <pubDate>${i.pubDate}</pubDate>
      <description>${escapeXml(i.description)}</description>
    </item>`,
      )
      .join('\n    ')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

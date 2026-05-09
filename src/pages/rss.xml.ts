// Minimal RSS feed scaffold.
//
// Out of the box this generates an RSS feed referencing only the homepage.
// Once you add /guides/ MDX pages or news posts, expand the items list.

import type { APIContext } from 'astro';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/consts';

export async function GET(_context: APIContext): Promise<Response> {
  const items: { title: string; link: string; pubDate: string; description: string }[] = [
    {
      title: SITE_NAME,
      link: SITE_URL,
      pubDate: new Date().toUTCString(),
      description: SITE_DESCRIPTION,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    ${items
      .map(
        (i) => `<item>
      <title>${escapeXml(i.title)}</title>
      <link>${i.link}</link>
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

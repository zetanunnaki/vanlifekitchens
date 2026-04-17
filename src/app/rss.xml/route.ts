import { products, guides, setups } from "@/lib/data";

const SITE = "https://vanlifekitchens.com";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toUTCString();
}

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
  guid: string;
  author: string;
};

export async function GET() {
  const items: FeedItem[] = [];

  for (const p of products) {
    items.push({
      title: `${p.name} Review`,
      link: `${SITE}/reviews/${p.slug}`,
      description: p.verdict,
      pubDate: rfc822(p.updated),
      category: p.category,
      guid: `${SITE}/reviews/${p.slug}`,
      author: `editor@vanlifekitchens.com (${p.author})`,
    });
  }

  for (const g of guides) {
    items.push({
      title: g.title,
      link: `${SITE}/guides/${g.slug}`,
      description: g.excerpt,
      pubDate: rfc822(g.updated ?? "2026-04-15"),
      category: g.category,
      guid: `${SITE}/guides/${g.slug}`,
      author: "editor@vanlifekitchens.com (VanLifeKitchens Editorial Team)",
    });
  }

  for (const s of setups) {
    items.push({
      title: `${s.name} — ${s.vanType} Kitchen Build`,
      link: `${SITE}/setups/${s.slug}`,
      description: `A real ${s.vanType} van kitchen build with a total gear cost of ${s.budget}.`,
      pubDate: rfc822("2026-04-15"),
      category: "Setups",
      guid: `${SITE}/setups/${s.slug}`,
      author: "editor@vanlifekitchens.com (VanLifeKitchens Editorial Team)",
    });
  }

  // Sort newest-first by pubDate
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const lastBuildDate = rfc822(new Date());

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>VanLifeKitchens</title>
    <link>${SITE}</link>
    <description>Independent reviews and field guides for van life kitchen gear. Tested on the road, written by nomads.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/images/hero/og-default.jpg</url>
      <title>VanLifeKitchens</title>
      <link>${SITE}</link>
    </image>
${items
  .map(
    (i) => `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${i.link}</link>
      <guid isPermaLink="true">${i.guid}</guid>
      <description>${escapeXml(i.description)}</description>
      <category>${escapeXml(i.category)}</category>
      <dc:creator>${escapeXml(i.author)}</dc:creator>
      <pubDate>${i.pubDate}</pubDate>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

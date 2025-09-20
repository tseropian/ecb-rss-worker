addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

function escape(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function handleRequest(request) {
  const { searchParams, href } = new URL(request.url);

  const targetUrl = new URL(searchParams.get("url") || 'https://install.doctor/blog');
  const siteUrl = targetUrl.origin;
  const itemSelector = searchParams.get("item") || '.post';
  const titleSelector = searchParams.get("title") || '.post-title';
  const descriptionSelector = searchParams.get("description") || '.paragraph-intro';
  const linkSelector = searchParams.get("link") || '.post-link';
  const pubDateSelector = searchParams.get("pubDate") || '.publish-date time';
  const imageSelector = searchParams.get("image") || '.featured-image';
  const modifiedSelector = searchParams.get("modified") || '.modified-date time';
  // contentSelector is used to select full content from article after scraping links from the post list
  const contentSelector = searchParams.get("content") || '.post-content';
  const creatorSelector = searchParams.get("creator") || '.author-date a';


  const items = [];
  let item;
  let channelTitle = searchParams.get("channelTitle") || 'Install Doctor Blog';
  let channelDescription = searchParams.get("channelDescription") || 'Articles by the Install Doctor team and community';
  let managingEditor = searchParams.get("managingEditor") || 'help@install.doctor';
  let webMaster = 'help@megabyte.space';
  let applicationName = searchParams.get("applicationName") || 'Install Doctor';
  let copyrightHolder = 'Megabyte LLC';
  const generator = 'Megabyte Labs RSS (https://megabyte.space/project/rss)';
  const language = 'en-US'
  const twitterUser = searchParams.get("twitterUser") || 'InstallDoc';

  const res = await fetch(targetUrl);

  await new HTMLRewriter()
    .on('head meta[name="copyright"]', {
      text(text) {
        copyrightHolder = text.text;
      }
    })
    .on('head meta[name="application-name"]', {
      text(text) {
        applicationName = text.text;
      }
    })
    .on('head meta[name="contact"]', {
      text(text) {
        managingEditor = text.text;
      }
    })
    .on('head meta[name="rss-feed-title"]', {
      text(text) {
        channelTitle = text.text;
      }
    })
    .on('head meta[name="description"]', {
      text(text) {
        channelDescription = text.text;
      }
    })
    .on(itemSelector, {
      element() {
        item = {
          title: "",
          description: "",
          link: "",
          pubDate: "",
          modified: "",
          creator: "",
          categories: [],
          image: "",
          alt: ""
        };
        items.push(item);
      }
    })
    .on(`${itemSelector} ${titleSelector}`, {
      text(text) {
        item.title += text.text;
      }
    })
    .on(`${itemSelector} ${descriptionSelector}`, {
      text(text) {
        item.description += text.text;
      }
    })
    .on(`${itemSelector} ${linkSelector}`, {
      async element(element) {
        item.link = element.getAttribute("href");
        const tags = element.getAttribute("data-tags")
        if (tags) {
          item.categories = tags.split(',')
        }

        // Make links absolute
        if (item.link?.startsWith("/")) {
          item.link = `${targetUrl.origin}${item.link}`;
        }

        // Acquire full page content
        const contentUrl = new URL(item.link);
        const innerRes = await fetch(contentUrl + '/page.state.json', {
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
        });
        const jsonResp = await innerRes.json()
        item.content = jsonResp['page.state'].html.replace(/"\/assets\/img/g,`${siteUrl}/assets/img`)
      }
    })
    .on(`${itemSelector} ${pubDateSelector}`, {
      text(text) {
        item.pubDate += text.text;
        item.modified = item.pubDate;
        item.lastDate = item.pubDate;

        if (text.lastInTextNode && item.pubDate) {
          item.pubDate = new Date(item.pubDate).toUTCString();
          item.modified = item.pubDate;
          item.lastDate = item.pubDate;
        }
      }
    })
    .on(`${itemSelector} ${modifiedSelector}`, {
      text(text) {
        item.modified += text.text;
        item.lastDate = item.modified;

        if (text.lastInTextNode && item.modified) {
          item.modified = new Date(item.modified).toUTCString();
          item.lastDate = item.modified;
        }
      }
    })
    .on(`${itemSelector} ${creatorSelector}`, {
      text(text) {
        if (text.text) {
          item.creator = text.text
        }
      }
    })
    .on(`${itemSelector} ${imageSelector}`, {
      element(element) {
        item.image = element.getAttribute("src");
        item.alt = element.getAttribute("alt");
        if (item.image?.startsWith("/")) {
          item.image = `${targetUrl.origin}${item.image}`;
        }
      }
    })
    .transform(res)
    .arrayBuffer();

  const lastBuildDate = (
    items.map((item) => new Date(item.lastDate)).sort((a, b) => b - a)[0] ||
    new Date()
  ).toUTCString();

  const rss = `
<?xml version="1.0" encoding="UTF-8" ?>
<rss
  version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:media="http://search.yahoo.com/mrss/"
>
    <channel>
        <title>${channelTitle}</title>
        <atom:link href="${targetUrl}/rss.xml" rel="self" type="application/rss+xml" />
        <link>${targetUrl}</link>
        <generator>${generator}</generator>
        <language>${language}</language>
        <copyright>© ${copyrightHolder} ${new Date().getFullYear()}, All Rights Reserved</copyright>
        <description>${channelDescription}</description>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <sy:updatePeriod>hourly</sy:updatePeriod>
        <sy:updateFrequency>1</sy:updateFrequency>
        <managingEditor>${managingEditor} (${applicationName} Support)</managingEditor>
        <webMaster>${webMaster} (Megabyte Labs Support)</webMaster>
        <image>
            <url>${siteUrl}/assets/img/rss/logo-icon.png</url>
            <title>${channelTitle}</title>
            <link>${targetUrl}</link>
            <width>256</width>
            <height>256</height>
        </image>
        
${items.map((item) => `        <item>
            <title>${item.title}</title>
            <pubDate>${item.pubDate}</pubDate>
            <dc:creator>${item.creator}</dc:creator>
${item.categories.map((category) => `            <category>${category}</category>`).join("\n")}
            <description>${item.description}</description>
            <guid isPermaLink="true">${item.link}</guid>
            <link>${item.link}</link>
            <media:content url="${item.image}" medium="image">
                <media:title type="html">${item.alt}</media:title>
            </media:content>
            <content:encoded><![CDATA[
                <div style="width: 100%;display:block;margin-bottom: 14px;text-align:center;">
                    <a href="https://www.facebook.com/sharer.php?u=${encodeURIComponent(item.link)}" style="margin: 5px; display: inline-block; text-decoration: none;"><img alt="Share on Facebook" border="0" src="${siteUrl}/assets/img/rss/facebook.png" /></a>
                    <a href="https://twitter.com/share?via=${twitterUser}&text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(item.link)}&hashtags=${item.categories.length ? item.categories.join(',') : 'Fresh'}" style="margin: 5px; display: inline-block; text-decoration: none;"><img alt="Tweet on Twitter" border="0" src="${siteUrl}/assets/img/rss/twitter.png" /></a>
                    <a href="https://pinterest.com/pin/create/link/?url=${encodeURIComponent(item.link)}" style="margin: 5px; display: inline-block; text-decoration: none;"><img alt="Pin on Pinterest" border="0" src="${siteUrl}/assets/img/rss/pinterest.png" /></a>
                    <a href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(item.link)}&title=${encodeURIComponent(item.title)}&tags=${item.categories.length ? item.categories.join(',') : 'Fresh'}" style="margin: 5px; display: inline-block; text-decoration: none;"><img alt="Post on Tumblr" border="0" src="${siteUrl}/assets/img/rss/tumblr.png" /></a>
                </div>
                <div style="width:100%;display:block;">
                  ${item.content}
                </div>
                <div style="width: 100%;display: block; margin-top: 14px;text-align:center;">
                  <a href="${siteUrl}">${siteUrl}</a>
                </div>]]>
            </content:encoded>
        </item>`).join("\n")}
    </channel>
</rss>`.trim();

  return new Response(rss, {
    headers: new Headers({
      "Content-Type": "text/xml",
      charset: "utf-8",
    }),
  });
}

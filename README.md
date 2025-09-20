<div align="center">
  <center><h1 align="center"><i></i>📰 CSS to RSS Feed CloudFlare Worker<i></i></h1></center>
  <center><h4 style="color: #18c3d1;">Maintained by <a href="https://megabyte.space" target="_blank">Megabyte Labs</a></h4><i></i></center>
</div>

<div align="center">
  <a href="https://megabyte.space" title="Megabyte Labs homepage" target="_blank" style="text-decoration: none !important;">
    <img alt="Homepage" src="https://img.shields.io/website?down_color=%23FF4136&down_message=Down&label=Homepage&logo=home-assistant&logoColor=white&up_color=%232ECC40&up_message=Up&url=https%3A%2F%2Fmegabyte.space&style=for-the-badge" />
  </a>
  <a href="https://megabyte.space/contributing/" title="Learn about contributing" target="_blank" style="text-decoration: none !important;">
    <img alt="Contributing" src="https://img.shields.io/badge/Contributing-Guide-0074D9?logo=github-sponsors&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://app.slack.com/client/T01ABCG4NK1/C01NN74H0LW/details/" title="Chat with us on Slack" target="_blank" style="text-decoration: none !important;">
    <img alt="Slack" src="https://img.shields.io/badge/Slack-Chat-e01e5a?logo=slack&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://app.element.io/#/room/#megabyte:matrix.org" title="Chat with the community via Matrix.org" target="_blank" style="text-decoration: none !important;">
    <img alt="Matrix" src="https://img.shields.io/matrix/megabyte:matrix.org?logo=matrix&logoColor=white&style=for-the-badge" />
  </a>
  <a href="https://github.com/ProfessorManhattan/rss-worker" title="GitHub mirror" target="_blank" style="text-decoration: none !important;">
    <img alt="GitHub" src="https://img.shields.io/badge/Mirror-GitHub-333333?logo=github&style=for-the-badge" />
  </a>
</div>

> </br><h4 align="center">**Turn any website into an RSS feed using CSS selectors — powered by Cloudflare Workers.**</h4></br>

This project lets you convert any blog or article listing page into a valid RSS 2.0 feed using only URL parameters and CSS selectors. Whether the site doesn’t support RSS or you just want richer metadata, this tool gives you complete control over your feed.

🌐 Live demo: [rss.manhattan.workers.dev](https://rss.manhattan.workers.dev)  
📖 Blog article: [megabyte.space/generate-rss-feeds-from-any-website-with-cloudflare-workers-no-backend-needed](https://megabyte.space/generate-rss-feeds-from-any-website-with-cloudflare-workers-no-backend-needed)  
🎥 Video walkthrough: [YouTube](https://www.youtube.com/watch?v=JsqihGmm24A)

<a href="#table-of-contents" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 📚 Table of Contents

- [✨ Features](#features)
- [🚀 Quick Start](#quick-start)
- [🧪 Example Usage](#example-usage)
- [🌐 Hosting on Your Own Domain](#hosting-on-your-own-domain)
- [📄 Learn More](#learn-more)
- [🤝 Contributing](#contributing)

<a href="#features" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## ✨ Features

- ⚡️ No backend required — runs entirely on Cloudflare Workers  
- 🧠 Customizable with CSS selectors via URL query params  
- 🖼 Full RSS 2.0 output with images, authors, categories, and more  
- 🔄 Supports fetching full article content from post links  
- 🧩 Easily rebrand and self-host under your own domain  

<a href="#quick-start" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 🚀 Quick Start

### 🟦 One-Click Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tseropian/rss-worker)

> ✏️ **Make sure to fork this repo first**, then update the button URL with your GitHub username.

<a href="#example-usage" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 🧪 Example Usage

https://your-worker.workers.dev/?url=https://install.doctor/blog&item=.post&title=.post-title&description=.paragraph-intro&link=.post-link

Customize the query string to match your blog’s structure. All parameters accept valid CSS selectors.

### Required Parameters:

| Parameter    | Description                            |
|--------------|----------------------------------------|
| `url`        | The URL of the blog or listing page    |
| `item`       | The selector for each blog post        |
| `title`      | The selector for the post title        |
| `description`| The selector for the post summary      |
| `link`       | The selector for the post link         |

### Optional Parameters:

| Parameter         | Description                                 |
|-------------------|---------------------------------------------|
| `pubDate`         | Selector for publish date                   |
| `creator`         | Selector for author                         |
| `image`           | Selector for featured image                 |
| `content`         | Selector for full article HTML              |
| `channelTitle`    | Custom RSS channel title                    |
| `channelDescription` | Custom feed description                 |
| `managingEditor`  | Email contact for RSS feed                  |
| `applicationName` | Name of the app/feed                        |
| `twitterUser`     | Used in social share buttons                |

<a href="#hosting-on-your-own-domain" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 🌐 Hosting on Your Own Domain

You can proxy this Worker through your custom domain using:

- 🌀 **Cloudflare DNS + Route config**  
- 🔁 **Firebase Hosting rewrites**  

Example: serve your RSS feed at `rss.yoursite.com`.

<a href="#learn-more" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 📄 Learn More

- 📖 **Blog Post**: [CSS to RSS — How It Works](https://megabyte.space/generate-rss-feeds-from-any-website-with-cloudflare-workers-no-backend-needed)  
- 🎬 **YouTube Demo**: [Watch on YouTube](https://www.youtube.com/watch?v=JsqihGmm24A)

<a href="#contributing" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 🤝 Contributing

Pull requests are welcome! If you have ideas for improving selector flexibility, feed formatting, or scraping edge cases — we’d love your input.

📬 Contact: [hey@megabyte.space](mailto:hey@megabyte.space)  
💻 Built with 💙 by [Megabyte Labs](https://megabyte.space)

<a href="#license" style="width:100%"><img style="width:100%" src="https://gitlab.com/megabyte-labs/assets/-/raw/master/png/aqua-divider.png" /></a>

## 🧰 License

MIT License © [Megabyte Labs Open-Source](https://megabyte.space)

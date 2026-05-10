require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://mananagarwal.in`,
    siteTitle: `Manan Agarwal`,
    siteTitleAlt: `Manan Agarwal`,
    siteHeadline: `Manan Agarwal`,
    siteDescription: `I build stuff on the internet, for the internet — and share what I learn along the way. Side projects mostly built on Claude Code or Codex.`,
    siteImage: `/og-card.jpg`,
    author: `@manan_0308`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `AI Tinkering`,
            slug: `/ai-tinkering`,
          },
          {
            title: `Lego Land`,
            slug: `/lego`,
          },
        ],
        externalLinks: [
          {
            name: `About`,
            url: `/about`,
          },
          {
            name: `Twitter`,
            url: `https://twitter.com/manan_0308`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/mananagarwal03`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-3GHSYW6EHT`],
        gtagConfig: {
          anonymize_ip: true,
          send_page_view: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: [],
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Manan Agarwal`,
        short_name: `Manan Agarwal`,
        description: `I build stuff and share my learnings`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-netlify`,
  ],
}

require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    // ...
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // ...
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // Add both your Universal Analytics (UA) and GA4 tracking IDs here.
        trackingIds: [
          "UA-182376999-1", // Your UA tracking ID
          "G-TLRJBEVB1S",   // Your GA4 measurement ID
        ],
        pluginConfig: {
          head: true, // Puts tracking script in the head instead of the body.
          anonymize_ip: true, // Anonymize IP addresses.
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // ...
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};

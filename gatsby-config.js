module.exports = {
  siteMetadata: {
    title: `Building security and automations`,
    name: `BuildSecurity.dev`,
    siteUrl: `https://buildsecurity.dev`,
    description: `Building security and automations.`,
    hero: {
      heading: `BuildSecurity.dev`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/nashcontrol`,
      },
      {
        name: `github`,
        url: `https://github.com/nashcontrol`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/alex-mor/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BuildSecurity.dev`,
        short_name: `BuildSecurity.dev`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-177229502-1",
        // Defers execution of google analytics script after page load
        defer: true,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "buildsecurity.dev",
      },
    },
      `gatsby-plugin-netlify-cms`
  ],
};

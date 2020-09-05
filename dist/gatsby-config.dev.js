"use strict";

module.exports = {
  siteMetadata: {
    title: "Building security and automations",
    name: "BuildSecurity.dev",
    siteUrl: "https://buildsecurity.dev",
    description: "Building security somewhere..",
    hero: {
      heading: "Welcome to BuildSecurity.dev blog.. I will show",
      maxWidth: 652
    },
    social: [{
      name: "twitter",
      url: "https://twitter.com/nashcontrol"
    }, {
      name: "github",
      url: "https://github.com/nashcontrol"
    }, {
      name: "linkedin",
      url: "https://www.linkedin.com/company/narative/"
    }]
  },
  plugins: [{
    resolve: "@narative/gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      basePath: "/",
      authorsPage: true,
      sources: {
        local: true // contentful: true,

      }
    }
  }, {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "Novela by Narative",
      short_name: "Novela",
      start_url: "/",
      background_color: "#fff",
      theme_color: "#fff",
      display: "standalone",
      icon: "src/assets/favicon.png"
    }
  }, {
    resolve: "gatsby-plugin-netlify-cms",
    options: {}
  }]
};
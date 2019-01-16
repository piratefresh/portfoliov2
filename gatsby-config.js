module.exports = {
  siteMetadata: {
    title: `Magnus Portfolio`,
    subtitle: `Portfolio`,
    author: `Magnus Nilsen`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `localhost:4000`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `wordpress.magnusnilsen.tech`,
        protocol: `http`,
        hostingWPCOM: false,
        useACF: true,
        includedRoutes: [
          '/*/*/categories',
          '/*/*/posts',
          '/*/*/pages',
          '/*/*/media',
          '/*/*/tags',
          '/*/*/taxonomies',
          '/*/*/projects',
          '/*/*/users',
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-plugin-styled-components',
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

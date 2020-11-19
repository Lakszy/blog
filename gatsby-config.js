module.exports = {
  siteMetadata: {
    title: `Pragmatic Pineapple 🍍`,
    author: {
      name: `Nikola Đuza`,
      summary: `who helps developers improve their productivity by sharing pragmatic advice & applicable knowledge on JavaScript and Ruby.`,
      landingPage: "https://nikolalsvk.github.io",
    },
    description: `A blog by Nikola Đuza that aims to spread knowledge and give practical tips on technology and life in general.`,
    siteUrl: `https://pragmaticpineapple.com/`,
    social: {
      twitter: `nikolalsvk`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(({ node }) => {
            sitemapObject = {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: 1.0,
            }

            if (node.path === "/") sitemapObject.priority = 0.9

            if (node.path.includes("/tags/")) sitemapObject.priority = 0.6

            if (["/thank-you/", "/confirm-subscription/"].includes(node.path))
              sitemapObject.priority = 0.5

            return sitemapObject
          }),
        exclude: [`/newsletter/*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/newsletter`,
        name: `newsletter`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        pedantic: false,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `markdown-header-link`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-PG86LMK`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-111191498-2`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: {
                    order: DESC,
                    fields: [frontmatter___date]
                  },
                  filter: {
                    frontmatter: {
                      newsletter: { ne: true },
                      published: { eq: true }
                    }
                  }
                ) {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                      }
                      fields {
                        slug
                      }
                      excerpt
                      html
                    }
                  }
                }
              }
            `,
            // Where we will save the feed generated by this query.
            output: `rss.xml`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pragmatic Pineapple Blog`,
        short_name: `Pragmatic Pineapple`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/assets/pineapple-emoji.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
  ],
}

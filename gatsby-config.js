const path = require('path');

module.exports = {
  siteMetadata: {
    siteLanguage: 'en',
    siteUrl: 'https://ugross.dev',
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '~': path.resolve(__dirname, 'src'),
        },
      },
    },
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `posts`, path: `${__dirname}/content/posts/` },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          // gatsby-remark-relative-images must go before gatsby-remark-images
          { resolve: `gatsby-remark-relative-images` },
          { resolve: 'gatsby-remark-images', options: { maxWidth: 750 } },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              fromHeading: 1,
              toHeading: 4,
              tight: true,
              className: 'table-of-contents',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
            },
          },
          { resolve: 'gatsby-remark-responsive-iframe' },
          `gatsby-remark-prismjs`,
          'gatsby-remark-copy-linked-files',
          { resolve: 'gatsby-remark-external-links', options: { target: '_blank' } },
        ],
        remarkPlugins: [require('@fec/remark-a11y-emoji')],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: { trackingId: `UA-135374915-1` },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Ross Blog',
        short_name: 'Ross Blog',
        categories: ['news', 'education'],
        start_url: '/',
        background_color: '#222',
        theme_color: '#2691ff',
        display: 'minimal-ui',
        icon: 'static/favicon.png', // This path is relative to the root of the site.
        icons: [
          {
            src: 'static/pwa/pwa-icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'static/pwa/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'static/pwa/maskable_icon_x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'static/pwa/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'static/pwa/maskable_icon_x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'static/pwa/maskable_icon_x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'static/pwa/maskable_icon_x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        lang: 'en-US',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
              })),
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'ugRoss.dev RSS Feed',
          },
        ],
      },
    },
  ],
};

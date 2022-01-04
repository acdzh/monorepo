const gatsbyConfig = require('gatsby-config');

const defaultSiteMetadata = {
  title: 'gatsby-theme-plain',
  description: 'gatsby-theme-plain demo',
  siteUrl: 'https://example.com',
  author: {
    name: 'acdzh',
  },
  favicon: `${__dirname}/assets/favicon.png`,
  social: {
    github: 'acdzh',
    twitter: 'acdzh',
    steam: 'acdzh',
    mail: 'acdzh@outlook.com',
  },
  postsPerPage: 8,
};

const createConfig = ({
  contentPath = 'content',
  assetsPath = 'assets',
  siteMetadata = defaultSiteMetadata,
}) =>
  gatsbyConfig({
    siteMetadata,
    plugins: [
      'gatsby-plugin-image',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'content',
          path: contentPath,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'assets',
          path: assetsPath,
        },
      },
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
          extensions: ['.mdx', '.md'],
          gatsbyRemarkPlugins: [
            'gatsby-remark-images',
            {
              resolve: 'gatsby-remark-autolink-headers',
              options: {
                // icon: false,
                offsetY: 60,
              },
            },
            'gatsby-remark-copy-linked-files',
            'gatsby-remark-graphviz',
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: siteMetadata.title || '',
          short_name: siteMetadata.title || '',
          description: siteMetadata.description || '',
          lang: siteMetadata.lang || 'zh-CN',
          start_url: '/',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          display: 'standalone',
          icon: siteMetadata.favicon || `${__dirname}/assets/favicon.png`,
          theme_color_in_head: false, // This will avoid adding theme-color meta tag.
        },
      },
      {
        resolve: 'gatsby-plugin-feed',
        options: require('./config/gatsby-plugin-feed-options'),
      },
      'gatsby-plugin-postcss',
      'gatsby-plugin-pnpm',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-use-dark-mode',
      'gatsby-plugin-sitemap',
    ].filter(Boolean),
  });

module.exports = createConfig;
// module.exports = createConfig({});

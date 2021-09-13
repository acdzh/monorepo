const createConfig = ({ contentPath = 'content', assetsPath = 'assets' }) => ({
  siteMetadata: {
    title: 'gatsby-theme-plain',
    description: 'gatsby-theme-plain demo',
    siteUrl: 'https://example.com',
    author: {
      name: 'acdzh',
    },
    social: {
      github: 'acdzh',
      twitter: 'acdzh',
      steam: 'acdzh',
      mail: 'acdzh@outlook.com',
    },
    postsPerPage: 8,
  },
  plugins: [
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
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-dark-mode',
  ].filter(Boolean),
});

module.exports = createConfig({});

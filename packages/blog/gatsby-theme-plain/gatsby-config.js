const createConfig = ({
  contentPath = 'content',
  assetsPath = 'assets',
  postsPerPage = 8,
}) => ({
  siteMetadata: {
    title: 'gatsby-theme-plain',
    author: {
      name: 'acdzh',
    },
    postsPerPage,
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
  ].filter(Boolean),
});

module.exports = createConfig({});

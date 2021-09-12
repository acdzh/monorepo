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
    social: {
      github: 'acdzh',
      twitter: 'acdzh',
      steam: 'acdzh',
      mail: 'acdzh@outlook.com',
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
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-dark-mode',
  ].filter(Boolean),
});

module.exports = createConfig({});

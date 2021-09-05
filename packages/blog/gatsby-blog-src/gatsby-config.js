module.exports = {
  siteMetadata: {
    title: '随便写写',
    author: {
      name: 'acdzh',
    },
  },
  plugins: [
    'gatsby-plugin-pnpm',
    'gatsby-theme-plain',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-148601605-2',
      },
    },
  ],
};

module.exports = {
  siteMetadata: {
    title: '随便写写',
    author: {
      name: 'acdzh',
    },
    socialLinks: {
      github: 'https://github.com/acdzh',
      twitter: 'https://twitter.com/acdzh',
      steam: 'https://steamcommunity.com/id/acdzh',
      mail: 'mailto:acdzh@outlook.com',
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

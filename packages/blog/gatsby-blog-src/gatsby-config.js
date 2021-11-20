const siteMetadata = {
  title: '随便写写',
  description: '随便写写, 全而不精',
  siteUrl: 'https://blog.acdzh.com',
  author: {
    name: 'acdzh',
  },
  favicon: 'assets/favicon.png',
  social: {
    github: 'acdzh',
    twitter: 'acdzh',
    steam: 'acdzh',
    mail: 'acdzh@outlook.com',
  },
  postsPerPage: 8,
};

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-pnpm',
    {
      resolve: 'gatsby-theme-plain',
      options: {
        siteMetadata,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-148601605-2',
      },
    },
    {
      resolve: 'gatsby-plugin-slardar',
      options: {
        bid: 'blog_vukk',
      },
    },
  ],
};

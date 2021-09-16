module.exports = {
  siteMetadata: {
    title: '随便写写',
    description: '随便写写, 全而不精',
    siteUrl: 'https://blog.acdzh.com',
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
    'gatsby-plugin-pnpm',
    'gatsby-theme-plain',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '随便写写',
        short_name: '随便写写',
        description: '随便写写, 全而不精',
        lang: 'zh-CN',
        start_url: '/',
        background_color: '#fff',
        theme_color: ' #fff',
        display: 'standalone',
        icon: 'assets/favicon.png',
        theme_color_in_head: false, // This will avoid adding theme-color meta tag.
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

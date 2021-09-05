module.exports = {
  siteMetadata: {
    title: '随便写写',
    author: {
      name: 'acdzh',
    },
    description: '真的只是随便写写',
    siteUrl: 'https://blog.acdzh.com',
    social: {
      github: 'acdzh',
      qq: 1069436872,
      cnblogs: 'acdzh',
      weibo: '',
      zhihu: 'kkkk-zzzz-13',
      zhihuzhuanlan: 'c_1159869906471759872',
      mail: 'acdzh@outlook.com',
      steam: 'acdzh',
      facebook: '',
      linkedin: '',
      instagram: '',
      twitter: 'acdzh',
    },
    menus: [
      {
        name: 'Categories',
        url: '/categories/',
        icon: 'folder-open',
      },
      {
        name: 'Series',
        url: '/series/',
        icon: 'bookmark',
      },
      {
        name: 'Tags',
        url: '/tags',
        icon: 'tags',
      },
      {
        name: 'About',
        url: '/about',
        icon: 'user',
      },
      {
        name: 'RSS',
        url: '/rss.xml',
        icon: 'heart',
      },
    ],
    tagLine: '---0-0-0---',
    postsPerPage: 8,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `./content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `./assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-plugin-static-folders',
      options: {
        folders: ['./static'],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        // remarkPlugins: [require(`remark-math`)],
        // rehypePlugins: [require(`rehype-katex`)],
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
          'gatsby-remark-graphviz',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: true,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like 'this'.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              // languageExtensions: [
              //   {
              //     language: 'superscript',
              //     extend: 'javascript',
              //     definition: {
              //       superscript_types: /(SuperType)/,
              //     },
              //     insertBefore: {
              //       function: {
              //         superscript_keywords: /(superif|superelse)/,
              //       },
              //     },
              //   },
              // ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
        extensions: ['.mdx', '.md'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-148601605-2',
      },
    },
    {
      resolve: 'gatsby-plugin-valine',
      options: {
        appId: 'THSEEUpmt73ioQLUO7dO6sI8-9Nh9j0Va',
        appKey: '2ko493HrmEBiJ5FFTpPnnrWg',
        avatar: 'robohash',
        visitor: true,
        recordIP: true,
        enableQQ: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-feed',
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
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
            `,
            output: '/rss.xml',
            title: '随便写写',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '随便写写',
        short_name: '随便写写',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#008080',
        display: 'standalone',
        icon: './assets/favicon.png',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};

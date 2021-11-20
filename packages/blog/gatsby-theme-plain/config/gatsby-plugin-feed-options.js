module.exports = {
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
          const url =
            `${site.siteMetadata.siteUrl}/${node.fields.slug}/`.replace(
              /\/\/$/,
              '/'
            );
          return Object.assign({}, node.frontmatter, {
            url,
            guid: url,
            date: node.frontmatter.date,
            title: node.frontmatter.title,
            description: node.frontmatter.description || node.excerpt,
            custom_elements: [{ 'content:encoded': node.html }],
          });
        });
      },
      query: `
        {
          allMdx(
            sort: { fields: [frontmatter___date], order: DESC },
            filter: { frontmatter: { draft: { in: [false, null] } } }
          ) {
            nodes {
              excerpt
              fields { slug }
              frontmatter {
                title
                date
              }
              html
            }
          }
        }
      `,
      output: '/rss.xml',
    },
  ],
};

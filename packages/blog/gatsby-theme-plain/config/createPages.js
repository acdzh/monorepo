module.exports = async function ({ graphql, actions }) {
  const { createPage } = actions;

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }

      allMdx: allMdx(
        filter: { frontmatter: { draft: { in: [false, null] } } }
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
    return;
  }

  const posts = result.data.allMdx.nodes;
  const postsPerPage = result.data.site.siteMetadata.postsPerPage;

  if (posts.length <= 0) {
    throw new Error('No posts found');
    return;
  }

  // create all post page
  // define a tem
};

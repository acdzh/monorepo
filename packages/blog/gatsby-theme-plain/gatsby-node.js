const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions }) => {
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug || value,
    });
  }
};

// server the static file when dev
exports.onCreateDevServer = function ({ app }) {
  app.use(require('express').static('./static'));
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@icons': path.resolve(__dirname, 'src/icons'),
      },
    },
  });
};

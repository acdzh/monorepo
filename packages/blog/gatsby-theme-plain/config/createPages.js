const path = require('path');

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
  const postsPerPage = result.data.site.siteMetadata.postsPerPage || 8;

  if (posts.length <= 0) {
    throw new Error('No posts found');
    return;
  }

  // create all post page
  // Define a template for blog post
  const blogPost = path.join(__dirname, '../src/templates/post.tsx');
  // Create blog posts pages
  // But only if there's at least one markdown file found at "content" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id;
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;
    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    });
  });

  // create index pages
  // create homepage pagination
  const numPages = Math.ceil(posts.length / postsPerPage);
  const homePaginate = path.join(__dirname, '../src/templates/index.tsx');
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/posts/${i + 1}`,
      component: homePaginate,
      context: {
        currentPage: i + 1,
        totalPage: numPages,
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    });
  });
  createPage({
    path: '/',
    component: homePaginate,
    context: {
      currentPage: 1,
      totalPage: numPages,
      limit: postsPerPage,
      skip: 0,
    },
  });
};

const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

module.exports = function ({ node, actions, getNode }) {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    const dirName = path.dirname(value);

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug
        ? dirName === '/'
          ? `/${node.frontmatter.slug}/`
          : `${dirName}/${node.frontmatter.slug}/`
        : value,
    });
  }
};

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const moment = require('moment');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
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

      categoriesGroup: allMdx(
        filter: { frontmatter: { draft: { in: [false, null] } } }
      ) {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }

      seriesGroup: allMdx(
        filter: { frontmatter: { draft: { in: [false, null] } } }
      ) {
        group(field: frontmatter___series) {
          fieldValue
        }
      }

      tagsGroup: allMdx(
        filter: { frontmatter: { draft: { in: [false, null] } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      result.errors
    );
    return;
  }

  const posts = result.data.allMdx.nodes;
  const postsPerPage = result.data.site.siteMetadata?.postsPerPage || 8;

  if (posts.length > 0) {
    // create all post page
    // Define a template for blog post
    const blogPost = `${__dirname}/src/templates/post.tsx`;
    // Create blog posts pages
    // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
    // `context` is available in the template as a prop and as a variable in GraphQL
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;
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
    const homePaginate = `${__dirname}/src/templates/posts.tsx`;
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: `/posts/${i + 1}`,
        component: homePaginate,
        context: {
          currentPage: i,
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
        currentPage: 0,
        totalPage: numPages,
        limit: postsPerPage,
        skip: 0,
      },
    });
  }

  // create all category pages
  const categories = result.data.categoriesGroup.group.map((i) => i.fieldValue);
  const categoryTemplate = `${__dirname}/src/templates/category.tsx`;
  categories.forEach((category) => {
    createPage({
      path: `/categories/${category.replace(/\s/g, '-')}`,
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });

  // create all series pages
  const series = result.data.seriesGroup.group.map((i) => i.fieldValue);
  const seriesTemplate = `${__dirname}/src/templates/series.tsx`;
  series.forEach((series_) => {
    createPage({
      path: `/series/${series_.replace(/\s/g, '-')}`,
      component: seriesTemplate,
      context: {
        series: series_,
      },
    });
  });

  // create all tag pages
  const tags = result.data.tagsGroup.group.map((i) => i.fieldValue);
  const tagTemplate = `${__dirname}/src/templates/tag.tsx`;
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.replace(/\s/g, '-')}`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    const pwd = path.dirname(value);
    
    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug
        ? node.frontmatter.slug // path.join(pwd, node.frontmatter.slug, '/')
        : value,
    });

    createNodeField({
      name: 'fileAbsolutePath',
      node,
      value: pwd,
    });

    createNodeField({
      name: 'dateFormated',
      node,
      value: moment(node.frontmatter.date).format('yyyy年MM月DD日 HH:mm:ss'),
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      cover: File @fileByRelativePath

      tags: [String]
      author: String
      categories: [String]
      comment: Boolean
      description: String
      draft: Boolean
      from: String
      nolicense: Boolean
      series: [String]
      slug: String
      toc: Boolean
    }

    type Fields {
      slug: String
      fileAbsolutePath: String
      dateFormated: String
    }
  `);
};

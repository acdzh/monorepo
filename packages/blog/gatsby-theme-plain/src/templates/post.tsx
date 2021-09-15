import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import { Layout, Header, Content, Footer } from '@components/layout';
import { MDXComponents } from '@components/post/MDXComponents';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';
import { GraphqlQueryDataType } from '@typings/graphql';

export type PostTemplatePropsType = {
  data: GraphqlQueryDataType;
};

const PostTemplate: React.FC<PostTemplatePropsType> = ({ data }) => {
  const { mdx, site } = data;
  const { body, excerpt, frontmatter, fields } = mdx;
  return (
    <Layout>
      <SEO
        description={frontmatter.description || excerpt}
        title={frontmatter.title}
        // image={frontmatter.cover}
        pathname={`/${fields.slug}`}
        type="article"
        articleInfo={{
          publishedTime: frontmatter.date,
          modifiedTime: frontmatter.update_date,
          author: frontmatter.author || site.siteMetadata.author.name,
          section: frontmatter.categories,
          tag: frontmatter.tags,
        }}
      />
      <Header />
      <Content>
        <WidthDebug />
        <article className="w-full max-w-screen-xl mx-auto px-loose py-loose overflow-hidden">
          <h1 className="text-24px">{frontmatter.title}</h1>
          <MDXProvider components={MDXComponents}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </article>
      </Content>
      <Footer />
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      tableOfContents(maxDepth: 10)
      fields {
        slug
      }
      fileAbsolutePath
      frontmatter {
        tags
        author
        categories
        comment
        date
        description
        draft
        from
        nolicense
        series
        slug
        title
        toc
      }
      wordCount {
        words
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

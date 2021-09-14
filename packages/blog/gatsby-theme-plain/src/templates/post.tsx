import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import { Layout, Header, Content, Footer } from '@components/layout';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';
import { GraphqlQueryDataType } from '@typings/graphql';

export type PostTemplatePropsType = {
  data: GraphqlQueryDataType;
};

const PostTemplate: React.FC<PostTemplatePropsType> = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <Header />
      <Content>
        <WidthDebug />
        <article className="w-full max-w-screen-xl mx-auto py-60px my-auto-px overflow-hidden">
          <h1 className="text-24px">{data.mdx.frontmatter.title}</h1>
          <MDXProvider>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
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

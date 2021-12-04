import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import { Content, Footer, Header, Layout } from '@components/layout';
import { MDXComponents, TOC } from '@components/post/';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';
import { GraphqlQueryDataType } from '@typings/graphql';

export type PostTemplatePropsType = {
  data: GraphqlQueryDataType;
};

const PostTemplate: React.FC<PostTemplatePropsType> = ({ data }) => {
  const { mdx, site } = data;
  const { body, excerpt, frontmatter, fields, tableOfContents } = mdx;
  return (
    <Layout>
      <SEO
        description={frontmatter.description || excerpt}
        title={frontmatter.title}
        image={frontmatter?.cover?.publicURL}
        pathname={fields.slug}
        type="article"
        articleInfo={{
          publishedTime: frontmatter.date,
          modifiedTime: frontmatter.update_date,
          author: frontmatter.author || site.siteMetadata.author.name,
          section: frontmatter.categories,
          tag: frontmatter.tags,
        }}
      />
      <Header title={frontmatter.title} />
      <Content
        className="
          w-full max-w-screen-xl 
          mx-auto px-loose py-loose 
          xl:flex xl:flex-row
          <xl:overflow-hidden
        "
      >
        <WidthDebug />
        <article className="p-12px sm:p-24px shadow sm:shadow-md md:shadow-lg lg:shadow-xl dark:shadow-white">
          <h1 className="text-24px">{frontmatter.title}</h1>
          <MDXProvider components={MDXComponents}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </article>
        <aside className="<xl:hidden">
          <div className="sticky top-74px w-280px pl-32px">
            <TOC items={tableOfContents.items} />
          </div>
        </aside>
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
        cover {
          publicURL
        }
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

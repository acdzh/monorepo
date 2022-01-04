import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useToggle } from 'react-use';

import { Content, Footer, Header, Layout } from '@components/layout';
import { MDXComponents, TOC } from '@components/post/';
import { SEO } from '@components/SEO';
import { WidthDebug } from '@components/WidthDebug';
import { GraphqlQueryDataType } from '@typings/graphql';

const formatDate = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const formatDateString = (s: string) => formatDate(new Date(s));

export type PostTemplatePropsType = {
  data: GraphqlQueryDataType;
};

const PostTemplate: React.FC<PostTemplatePropsType> = ({ data }) => {
  const { mdx, site } = data;
  const {
    body,
    excerpt,
    frontmatter,
    fields,
    rawBody,
    tableOfContents,
    timeToRead,
    wordCount,
  } = mdx;
  const { siteMetadata: meta } = site;
  const [showRaw, toggleShowRaw] = useToggle(false);
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
      <Helmet>
        <link
          href="https://cdn.bootcdn.net/ajax/libs/KaTeX/0.15.1/katex.min.css"
          rel="stylesheet"
        />
      </Helmet>
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
        <article
          className="
            <sm:py-16px <sm:px-4px sm:p-24px sm:rounded-md
            light:sm:border light:sm:shadow-md light:md:shadow-lg
          "
        >
          <h1
            className="
              mb-12px leading-snug tracking-tight
              text-2xl md:text-3xl 2xl:text-4xl
            "
          >
            {frontmatter.title}
          </h1>
          <p className="text-secondary text-sm uppercase mb-12px">
            by&nbsp;
            {frontmatter?.from ? (
              <a href={frontmatter?.from}>{frontmatter?.author}</a>
            ) : (
              frontmatter?.author || meta?.author?.name || 'UNKOWN'
            )}
            &nbsp;·&nbsp;
            {frontmatter.date && (
              <>
                {formatDateString(frontmatter.date)}
                &nbsp;·&nbsp;
              </>
            )}
            {wordCount.words} WORDS &nbsp;·&nbsp; ~ {timeToRead || 0}
            &nbsp;mins reading time&nbsp;|&nbsp;
            <button
              className="text-theme focus:outline-none"
              onClick={toggleShowRaw}
            >
              {showRaw ? 'SRC' : 'RAW'}
            </button>
          </p>
          {showRaw ? (
            <pre className="whitespace-pre-wrap">
              <code className="font-mono">{rawBody}</code>
            </pre>
          ) : (
            <MDXProvider components={MDXComponents}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          )}
        </article>
        <aside className="<xl:hidden">
          <div className="sticky top-110px w-280px pl-32px">
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
        githubRawUrl
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
      rawBody
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

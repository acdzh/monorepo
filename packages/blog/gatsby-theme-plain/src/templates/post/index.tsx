import { MDXProvider } from '@mdx-js/react';
import clsx from 'clsx';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Valine from 'gatsby-plugin-valine';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FaTimes } from 'react-icons/fa';
import { useToggle } from 'react-use';

import { Content, Footer, Header, Layout } from '@components/layout';
import { HeaderIconButton } from '@components/layout/Header/HeaderIconButton';
import { AfterPostTags, MDXComponents, TOC } from '@components/post';
import { SEO } from '@components/SEO';
import { GraphqlQueryDataType } from '@typings/graphql';

import './index.css';
import './article.css';
import './codeblock-one-dark.css';
import './codeblock-one-light.css';

const formatDate = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const formatDateString = (s: string) => formatDate(new Date(s));

const isSSR = typeof window === 'undefined';

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
  const [isRawShow, toggleIsRawShow] = useToggle(false);
  const [isFixedTocShow, toggleIsFixedTocShow] = useToggle(false);
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
          href="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/firacode/6.2.0/fira_code.min.css"
          type="text/css"
          rel="stylesheet"
        />
        <link
          href="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/KaTeX/0.15.2/katex.min.css"
          type="text/css"
          rel="stylesheet"
        />
      </Helmet>
      <Header
        title={frontmatter.title}
        toggleIsFixedTocShow={toggleIsFixedTocShow}
      />
      <Content
        className="
          w-full max-w-screen-xl
          mx-auto px-loose py-loose
          xl:flex xl:flex-row
          <xl:overflow-hidden
        "
      >
        <main
          className="
            flex-1 min-w-0
            <sm:py-16px <sm:px-4px sm:p-24px sm:rounded-md
            light:sm:border light:sm:shadow-md light:md:shadow-lg
          "
        >
          <article>
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
                frontmatter?.author || meta?.author?.name || 'UNKNOWN'
              )}
              &nbsp;·&nbsp;
              {frontmatter.date && (
                <>
                  {formatDateString(frontmatter.date)}
                  &nbsp;·&nbsp;
                </>
              )}
              {wordCount.words} WORDS &nbsp;·&nbsp; ~ {timeToRead || 0}
              &nbsp;mins reading time&nbsp;·&nbsp;
              <span
                id={isSSR ? '' : window.location?.pathname || ''}
                className="leancloud_visitors"
                data-flag-title={frontmatter?.title || '无标题'}
              >
                <span className="leancloud-visitors-count">0</span>
              </span>
              &nbsp; Visitors |&nbsp;
              <button
                className="text-theme focus:outline-none"
                onClick={toggleIsRawShow}
              >
                {isRawShow ? 'SRC' : 'RAW'}
              </button>
            </p>
            {isRawShow ? (
              <pre className="whitespace-pre-wrap">
                <code className="font-mono">{rawBody}</code>
              </pre>
            ) : (
              <MDXProvider components={MDXComponents}>
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>
            )}
          </article>
          <AfterPostTags tags={frontmatter.tags} series={frontmatter.series} />
          {frontmatter?.comment !== false && <Valine />}
        </main>
        {/* xl: aside and sticky; <xl: fixed */}
        <aside
          className={clsx(
            'rounded',
            '<xl:bg-header <xl:glass <xl:light:shadow',
            '<xl:p-12px <xl:fixed <xl:top-64px <sm:right-6px <md:right-14px <lg:right-32px <xl:right-64px',
            {
              '<xl:hidden': !isFixedTocShow,
            }
          )}
        >
          <div
            className="xl:sticky xl:top-86px xl:w-280px <xl:max-w-280px xl:pl-32px overflow-y-auto overscroll-y-contain"
            style={{ height: 'calc(100vh - 86px - 32px - 44px)' }}
          >
            <TOC items={tableOfContents.items} />
          </div>
          <HeaderIconButton
            className="xl:hidden absolute top-4px right-8px"
            aria-label="显示/隐藏目录"
            onClick={toggleIsFixedTocShow}
          >
            <FaTimes />
          </HeaderIconButton>
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

import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXComponents } from './post-components';
import { Helmet } from 'react-helmet';

import Card from '../components/Card';
import Valine from '../components/Valine';

import './post-sidebar.css';
import './post.scss';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataType = any;

type TOCItemType = {
  title: string;
  url: string;
  items?: Array<TOCItemType>;
};

const TOC: React.FC<{
  items: Array<TOCItemType>;
}> = ({ items = [] }) => (
  <ul>
    {items.map((item) =>
      item.items ? (
        <li key={item.url}>
          <p>
            <a href={item.url}>{item.title}</a>
          </p>
          <TOC items={item.items} />
        </li>
      ) : (
        <li key={item.url}>
          <a href={item.url}>{item.title}</a>
        </li>
      )
    )}
  </ul>
);

const SideBar = ({ data }) => {
  const post = data.mdx;
  const { previous, next } = data;
  return (
    <div className="post-sidebar" style={{ position: 'sticky', top: 60 }}>
      <Card
        topStyle="primary"
        topInner="Catalog"
        bgColor="BgSideBar"
        defaultFold="auto"
      >
        {post.frontmatter?.toc !== false && (
          <div className="sidebar-content-post-toc">
            <TOC items={post.tableOfContents.items} />
          </div>
        )}
        <div className="sidebar-content-separator"></div>
        <div className="sidebar-content-post-nav">
          {next && (
            <>
              <Link to={next.fields.slug} rel="next">
                <div className="sidebar-content-post-nav-item sidebar-content-post-nav-next">
                  <i className="fas fa-chevron-right"></i>
                  <div>
                    <strong>Next post</strong>
                    <span>{next.frontmatter.title}</span>
                  </div>
                </div>
              </Link>
              <div className="sidebar-content-separator"></div>
            </>
          )}
          {previous && (
            <>
              <Link to={previous.fields.slug} rel="prev">
                <div className="sidebar-content-post-nav-item sidebar-content-post-nav-prev">
                  <i className="fas fa-chevron-left"></i>
                  <div>
                    <strong>Previous Post</strong>
                    <span>{previous.frontmatter.title}</span>
                  </div>
                </div>
              </Link>
              <div className="sidebar-content-separator"></div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

const PostContainer = ({ data, children }) => {
  const post = data.mdx;
  const hasCategory = Boolean(
    post.frontmatter.categories && post.frontmatter.categories.length
  );
  const hasSeries = Boolean(
    post.frontmatter.series && post.frontmatter.series.length
  );
  return (
    <Card
      topStyle="const"
      topInner={
        <ul>
          {hasCategory &&
            post.frontmatter.categories.map((category) => (
              <li key={category}>
                <Link
                  to={`/categories/${category.replace(/\s/g, '-')}`}
                  title={`All posts in category ${category}`}
                  rel="category tag"
                >
                  {category}
                </Link>
              </li>
            ))}
          {hasSeries &&
            post.frontmatter.series.map((series) => (
              <li key={series}>
                <Link
                  to={`/series/${series.replace(/\s/g, '-')}`}
                  title={`All posts in series ${series}`}
                  rel="series tag"
                >
                  {series}
                </Link>
              </li>
            ))}
          {!hasCategory && !hasSeries && (
            <li className="series">
              <Link to="/" rel="series category tag">
                Posts
              </Link>
            </li>
          )}
        </ul>
      }
    >
      <div className="post-container">{children}</div>
    </Card>
  );
};

const BlogPostLicense = ({ data }) => {
  const post = data.mdx;
  const meta = data.site.siteMetadata;
  const location = typeof window === 'undefined' ? undefined : window.location;
  return (
    <section className="post-entry-license">
      <p>
        作者: {post.frontmatter?.author || meta?.author?.name} <br />
        本文出处: &nbsp;
        <a target="_blank" rel="noreferrer" href={location?.href || ''}>
          {location?.href || ''}
        </a>
        <br />
        互联网日新月异, 请注意文章时效. <br />
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <i className="fab fa-creative-commons"></i>
          <i className="fab fa-creative-commons-by"></i>
          <i className="fab fa-creative-commons-nc"></i>
          <i className="fab fa-creative-commons-sa"></i>
        </a>
        &nbsp;本作品采用&nbsp;
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
        </a>
        &nbsp;进行许可.&nbsp;文章版权归作者所有,&nbsp;允许转载,&nbsp;但未经作者同意必须保留此段声明,&nbsp;且在文章页面明显位置给出原文链接,&nbsp;否则保留追究法律责任的权利.
        <br />
      </p>
    </section>
  );
};

const AfterPostTags = ({ data }) => {
  const post = data.mdx;
  const hasCategory = Boolean(
    post.frontmatter.categories && post.frontmatter.categories.length
  );
  const hasSeries = Boolean(
    post.frontmatter.series && post.frontmatter.series.length
  );
  const hasTags = Boolean(
    post.frontmatter.tags && post.frontmatter.tags.length
  );
  return (
    <div className="post-tags">
      {hasCategory && (
        <>
          <Link rel="nofollow" to="/categories/" title="All categories">
            <i className="fas fa-folder-open"></i>
          </Link>
          &nbsp;
          {post.frontmatter.categories.map((category) => (
            <Link
              key={category}
              to={`/categories/${category}/`}
              title={`All posts in category ${category}`}
              rel="category tag"
            >
              {category}
            </Link>
          ))}
          &nbsp;&nbsp;&nbsp;
        </>
      )}
      {hasSeries && (
        <>
          <Link rel="nofollow" to="/series/" title="All series">
            <i className="fas fa-bookmark"></i>
          </Link>
          &nbsp;
          {post.frontmatter.series.map((_series) => (
            <Link
              key={_series}
              to={`/series/${_series}/`}
              title={`All posts in series ${_series}`}
              rel="series tag"
            >
              {_series}
            </Link>
          ))}
          &nbsp;&nbsp;&nbsp;
        </>
      )}
      {hasTags && (
        <>
          <Link rel="nofollow" to="/tags/" title="All tags">
            <i className="fas fa-tags"></i>
          </Link>
          &nbsp;
          {post.frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              rel="tag"
              to={`/tags/${tag.replace(/\s/g, '-')}`}
              title={`All post with tag ${tag}`}
            >
              {tag}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

const BlogPostTemplate: React.FC<DataType> = ({ data }) => {
  const post = data.mdx;
  const meta = data.site.siteMetadata;
  const location = typeof window === 'undefined' ? undefined : window.location;
  return (
    <Layout sidebar={<SideBar data={data} />}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Helmet>
        <link
          href="https://cdn.bootcdn.net/ajax/libs/KaTeX/0.12.0/katex.min.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      <PostContainer data={data}>
        <article className="post">
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <p className="post-meta">
            by&nbsp;
            {post.frontmatter?.from ? (
              <a href={post.frontmatter?.from}>{post.frontmatter?.author}</a>
            ) : (
              post.frontmatter?.author || meta?.author?.name || 'Unkown'
            )}
            &nbsp;·&nbsp;
            {post.fields?.dateFormated}
            &nbsp;·&nbsp;
            {post.wordCount.words} WORDS &nbsp;·&nbsp; ~ {post.timeToRead || 0}
            &nbsp;mins reading time&nbsp;·&nbsp;
            <span
              id={location?.pathname || ''}
              className="leancloud_visitors"
              data-flag-title={post.frontmatter?.title || '无标题'}
            >
              <span className="leancloud-visitors-count"></span>
            </span>
            &nbsp; Visitors |&nbsp;
            <a
              href={`//github.com/acdzh/gatsby-blog-src/blob/master/blog/${
                post.fileAbsolutePath.split('content/blog/')[1] || ''
              }`}
              target="_blank"
              rel="noreferrer"
            >
              raw on <i className="fab fa-github"></i>
            </a>
          </p>
          <div className="post-entry">
            <MDXProvider components={MDXComponents}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
            {post.frontmatter?.nolicense !== true && (
              <BlogPostLicense data={data} />
            )}
            <AfterPostTags data={data} />
          </div>
        </article>
        {post.frontmatter?.comment !== false && <Valine />}
      </PostContainer>
    </Layout>
  );
};

export default BlogPostTemplate;

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
        cover {
          publicURL
          childImageSharp {
            fixed(width: 172, height: 96, quality: 50) {
              ...GatsbyImageSharpFixed
            }
          }
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
      fields {
        dateFormated
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

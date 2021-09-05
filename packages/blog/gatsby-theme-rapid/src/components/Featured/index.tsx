/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import './index.css';

export type FeaturedPropsType = {
  post: {
    excerpt: string;
    fields: {
      slug: string;
      dateFormated: string;
    };
    frontmatter: {
      tags: string[];
      categories: string[];
      cover: {
        publicURL: string;
        childImageSharp: {
          fixed: any;
        };
      };
      description: string;
      series: string[];
      title: string;
    };
  };
};

const Featured: React.FC<FeaturedPropsType> = ({ post }) => {
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
    <article className="featured" style={{ paddingBottom: 16 }}>
      <div className="featured-post-meta">
        <span>{post.fields.dateFormated}</span>
        {hasCategory && (
          <span>
            &nbsp;&nbsp;&nbsp;
            <Link rel="nofollow" to="/categories/" title="All categories">
              <i className="far fa-folder-open"></i>
            </Link>
            &nbsp;
            {post.frontmatter.categories.map((category) => (
              <Link
                key={category}
                to={`/categories/${category}/`}
                title={`All posts in category ${category}`}
                rel="category tag"
              >
                {category}&nbsp;
              </Link>
            ))}
          </span>
        )}
        {hasSeries && (
          <span>
            &nbsp;&nbsp;&nbsp;
            <Link rel="nofollow" to="/series/" title="All series">
              <i className="far fa-bookmark"></i>
            </Link>
            &nbsp;
            {post.frontmatter.series.map((_series) => (
              <Link
                key={_series}
                to={`/series/${_series}/`}
                title={`All posts in series ${_series}`}
                rel="series tag"
              >
                {_series}&nbsp;
              </Link>
            ))}
          </span>
        )}
      </div>
      <h2 className="featured-post-title">
        <Link
          to={post.fields.slug}
          rel="bookmark"
          title={post.frontmatter.title || '无标题'}
        >
          {post.frontmatter.title || '无标题'}
        </Link>
      </h2>
      <Link to={post.fields.slug} rel="bookmark" style={{ color: 'inherit' }}>
        <div className="featured-post-body">
          {post.frontmatter.cover && (
            <div className="featured-post-cover">
              <Image
                fixed={post.frontmatter.cover?.childImageSharp?.fixed}
                alt={post.frontmatter.title || '无标题'}
                imgStyle={{
                  borderRadius: 6,
                }}
              />
            </div>
          )}
          <div className="featured-post-content">
            <span>{post.frontmatter.description || post.excerpt}</span>
            &nbsp;
            <small
              className="featured-post-content-read-more"
              style={{ fontSize: 'small' }}
            >
              阅读全文 {'>'}
            </small>
          </div>
        </div>
      </Link>
      {hasTags && (
        <div className="featured-post-tags">
          {post.frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              rel="tag"
              to={`/tags/${tag}`}
              title={`All post with tag ${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
};

type SimpleFeaturedPropsType = {
  post: {
    fields: {
      slug: string;
      dateFormated: string;
    };
    frontmatter: {
      title: string;
    };
  };
};

export const SimpleFeatured: React.FC<SimpleFeaturedPropsType> = ({ post }) => {
  return (
    <article className="simple-featured">
      <span className="simple-featured-date">{post.fields.dateFormated}</span>
      <span className="simple-featured-link">
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </span>
    </article>
  );
};

export default Featured;

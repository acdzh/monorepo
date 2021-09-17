import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import { GraphqlQueryDataType } from '@typings/graphql';

type ArticleInfoType = {
  publishedTime?: Date | string | number;
  modifiedTime?: Date | string | number;
  expirationTime?: Date | string | number;
  author?: string | string[];
  section?: string | string[];
  tag?: string[];
};

export type SeoPropsType = {
  description?: string;
  lang?: string;
  title?: string;
  image?: string;
  pathname?: string;
  type?: 'website' | 'article';
  articleInfo?: ArticleInfoType;
  children?: React.ReactNode;
};

function toArray<T>(n: T | T[]): T[] {
  return Array.isArray(n) ? n : [n];
}

const ArticleInfoMetas: React.FC<ArticleInfoType> = ({
  publishedTime,
  modifiedTime,
  expirationTime,
  author,
  section,
  tag,
}) => {
  return (
    <Helmet>
      {publishedTime && (
        <meta
          property="article:published_time"
          content={new Date(publishedTime).toISOString()}
        />
      )}
      {modifiedTime && (
        <meta
          property="article:modified_time"
          content={new Date(modifiedTime).toISOString()}
        />
      )}
      {expirationTime && (
        <meta
          property="article:expiration_time"
          content={new Date(expirationTime).toISOString()}
        />
      )}
      {author &&
        toArray(author).map((item) => (
          <meta key={item} property="article:author" content={item} />
        ))}
      {section &&
        toArray(section).map((item) => (
          <meta key={item} property="article:section" content={item} />
        ))}
      {tag &&
        toArray(tag).map((item) => (
          <meta key={item} property="article:tag" content={item} />
        ))}
    </Helmet>
  );
};

export const SEO: React.FC<SeoPropsType> = ({
  description,
  lang = 'zh-CN',
  title = '',
  image,
  type = 'website',
  articleInfo,
  pathname = '/',
  children,
}) => {
  const { site } = useStaticQuery<GraphqlQueryDataType>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description || '';
  const defaultTitle = site.siteMetadata.title;
  const url = `${site.siteMetadata.siteUrl}${pathname}`.replace(/\/\/$/, '/');
  const imageUrl = image
    ? `${site.siteMetadata.siteUrl}${image}`.replace(/\/\/$/, '/')
    : '';

  return (
    <>
      <Helmet
        defaultTitle={defaultTitle}
        titleTemplate={`%s | ${defaultTitle}`}
      >
        {/* https://devhints.io/html-meta */}
        <html lang={lang} />
        <meta charSet="utf-8" />

        {/* title */}
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />

        {/* url */}
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta name="twitter:url" content={url} />

        {/* description */}
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:description" content={metaDescription} />

        {/* image */}
        {image && <meta property="og:image" content={imageUrl} />}
        {image && <meta name="twitter:image" content={imageUrl} />}

        {/* ua */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        {/* more information */}
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content={type} />

        {/* Apple Only */}
        <meta name="format-detection" content="telephone=no" />

        {children}
      </Helmet>
      {type === 'article' && articleInfo && (
        <ArticleInfoMetas {...articleInfo} />
      )}
    </>
  );
};

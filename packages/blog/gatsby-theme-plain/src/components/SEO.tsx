import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

type SeoPropsType = {
  description?: string;
  lang?: string;
  title?: string;
  image?: string;
  pathname?: string;
  type?: 'website' | 'article';
  articleInfo?: {
    publishedTime?: Date | string | number;
    modifiedTime?: Date | string | number;
    expirationTime?: Date | string | number;
    author?: string | string[];
    section?: string;
    tag?: string[];
  };
  children?: React.ReactNode;
};

type SeoStaticQueryType = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      social: {
        twitter: string;
      };
    };
  };
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
  const { site } = useStaticQuery<SeoStaticQueryType>(
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

  return (
    <Helmet defaultTitle={defaultTitle} titleTemplate={`%s | ${defaultTitle}`}>
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
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}

      {/* ua */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      {/* more information */}
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content={type} />

      {type === 'article' && articleInfo && (
        <>
          {articleInfo.publishedTime && (
            <meta
              property="article:published_time"
              content={new Date(articleInfo.publishedTime).toISOString()}
            />
          )}
          {articleInfo.modifiedTime && (
            <meta
              property="article:modified_time"
              content={new Date(articleInfo.modifiedTime).toISOString()}
            />
          )}
          {articleInfo.expirationTime && (
            <meta
              property="article:expiration_time"
              content={new Date(articleInfo.expirationTime).toISOString()}
            />
          )}
          {articleInfo.author && (
            <meta property="article:author" content={type} />
          )}
          {articleInfo.section && (
            <meta property="article:section" content={type} />
          )}
          {articleInfo.tag && <meta property="article:tag" content={type} />}
        </>
      )}

      {/* Apple Only */}
      <meta name="format-detection" content="telephone=no" />

      {children}
    </Helmet>
  );
};

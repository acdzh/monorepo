import { Link } from 'gatsby';
import React from 'react';

import { MdxType } from '@typings/graphql/mdx';

export type FeaturedProps = {
  mdx: MdxType;
};

const formatDate = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`;

const formatDateString = (s: string) => formatDate(new Date(s));

export const Featured: React.FC<FeaturedProps> = ({ mdx }) => {
  return (
    <>
      <h1 className="text-2xl">
        <Link
          className="hover:text-theme hover:underline-theme"
          to={mdx.fields.slug}
        >
          {mdx.frontmatter.title}
        </Link>
      </h1>
      {mdx.frontmatter.date && (
        <span className="mt-2px text-sm text-secondary">
          <time dateTime={mdx.frontmatter.date} itemProp="datePublished">
            {formatDateString(mdx.frontmatter.date)}
          </time>
          {mdx.frontmatter.update_date &&
            mdx.frontmatter.update_date !== mdx.frontmatter.date && (
              <>
                {' ('}
                最近更新:
                <time
                  dateTime="2021-05-26T00:00:00+00:00"
                  itemProp="datePublished"
                >
                  {formatDateString(mdx.frontmatter.update_date)}
                </time>
                {')'}
              </>
            )}
        </span>
      )}
      <p className="mt-8px">
        <Link to={mdx.fields.slug}>{mdx.excerpt}</Link>
      </p>
    </>
  );
};

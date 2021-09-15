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
  const { excerpt } = mdx;
  const { slug } = mdx.fields;
  const { title, date, description, update_date } = mdx.frontmatter;
  return (
    <>
      <h1 className="text-2xl">
        <Link className="hover:text-theme hover:underline-theme" to={slug}>
          {title}
        </Link>
      </h1>
      {date && (
        <span className="mt-2px text-sm text-secondary">
          <time dateTime={date} itemProp="datePublished">
            {formatDateString(date)}
          </time>
          {update_date && update_date !== date && (
            <>
              {' ('}
              最近更新:
              <time
                dateTime="2021-05-26T00:00:00+00:00"
                itemProp="datePublished"
              >
                {formatDateString(update_date)}
              </time>
              {')'}
            </>
          )}
        </span>
      )}
      <p className="mt-8px">
        <span className="<sm:hidden">{description || excerpt}</span>
        <span className="sm:hidden">
          {description || excerpt.length > 123
            ? excerpt.slice(0, 120) + '...'
            : excerpt}
        </span>
      </p>
    </>
  );
};

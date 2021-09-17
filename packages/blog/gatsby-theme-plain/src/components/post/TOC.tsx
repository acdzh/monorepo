import React from 'react';

import { TableOfContentsItemType } from '@typings/graphql/mdx';

export type TocPropsType = {
  items: TableOfContentsItemType[];
};

export const TOC: React.FC<TocPropsType> = ({ items }) => {
  return (
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
};

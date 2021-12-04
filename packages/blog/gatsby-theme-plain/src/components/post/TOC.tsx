import { useCurrentElementById } from '@acdzh/hooks';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { TableOfContentsItemType } from '@typings/graphql/mdx';

export type FlattenTableOfContentsItemType = {
  id: string;
  url: string;
  title: string;
  depth: number;
};

const flatten = (
  items: TableOfContentsItemType[],
  depth = 0
): FlattenTableOfContentsItemType[] =>
  items
    .map(({ url, title, items }) => [
      { url, title, depth },
      ...(items ? flatten(items, depth + 1) : []),
    ])
    .flat(2)
    .filter(({ url }) => url?.startsWith('#'))
    .map(({ url, title, depth }) => ({ url, title, depth, id: url.slice(1) }));

export type TocPropsType = {
  items: TableOfContentsItemType[];
};

export const TOC: React.FC<TocPropsType> = ({ items }) => {
  const flattenItems = useMemo(() => flatten(items), [items]);
  const ids = useMemo(() => flattenItems.map(({ id }) => id), [flattenItems]);
  const currentId = useCurrentElementById(ids);
  return (
    <ul>
      <li>
        <h3 className="font-600 pl-8px mb-8px">目录</h3>
      </li>
      {flattenItems.map(({ id, url, title, depth }) => (
        <li key={url}>
          <a
            href={url}
            className={clsx(
              'block px-8px py-4px transition-colors hover:text-theme',
              'border-theme-700 dark:border-theme-300',
              `
              my-8px p-8px rounded-sm
              hover:bg-gray-100 dark:hover:bg-true-gray-700
              active:shadow-inner dark:active:shadow-white`,
              {
                'text-sm': depth,
                'text-theme border-l-2 shadow': currentId === id,
              }
            )}
            style={{
              marginLeft: `${depth}rem`,
            }}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

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
      {flattenItems.map(({ id, url, title, depth }) => (
        <li key={url} className="truncate">
          <a
            href={url}
            className={clsx('transition-colors hover:text-theme', {
              'text-sm': depth,
              'text-theme': currentId === id,
            })}
            style={{
              marginLeft: `${depth * 0.5}rem`,
            }}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

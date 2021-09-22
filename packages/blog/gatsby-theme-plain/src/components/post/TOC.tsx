import React, { useEffect, useState } from 'react';

import { TableOfContentsItemType } from '@typings/graphql/mdx';

const IS_SSR = typeof window === 'undefined';

export type TocCorePropsType = {
  items: TableOfContentsItemType[];
  depth: number;
  visibleMap?: {
    [property: string]: boolean;
  };
};

export const TOCCore: React.FC<TocCorePropsType> = ({
  items,
  depth,
  visibleMap = {},
}) => {
  return (
    <ul className="ml-20px">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            title={item.title}
            className="hover:text-theme hover:underline-theme"
          >
            {visibleMap[item.url] && '!'}
            {item.title}
          </a>
          {item.items && depth < 5 && (
            <TOCCore
              items={item.items}
              depth={depth + 1}
              visibleMap={visibleMap}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const flatten = (
  items: TableOfContentsItemType[]
): TableOfContentsItemType[] => {
  const result = [] as TableOfContentsItemType[];
  items.forEach((item) => {
    item.items ? result.push(item, ...flatten(item.items)) : result.push(item);
  });
  return result;
};

export type TocPropsType = {
  items: TableOfContentsItemType[];
};

export const TOC: React.FC<TocPropsType> = ({ items }) => {
  const [visibleMap, setVisibleMap] = useState<{ [property: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (IS_SSR || !IntersectionObserver) {
      return;
    }
    const intersectionObserver = new IntersectionObserver((entries) => {
      const visibleIds = entries
        .filter((entry) => entry.intersectionRatio !== 0)
        .map((entry) => '#' + entry.target.id);
      if (visibleIds.length > 0) {
        const m = {} as { [property: string]: boolean };
        visibleIds.forEach((id) => {
          m[id] = true;
        });
        setVisibleMap(m);
      }
    });
    flatten(items)
      .filter((item) => item.url)
      .map((item) => document.getElementById(item.url.slice(1)))
      .forEach((ele) => {
        ele && intersectionObserver.observe(ele);
      });
  }, [items]);

  return <TOCCore items={items} depth={0} visibleMap={visibleMap} />;
};

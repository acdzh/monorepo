import { MDXProviderComponentsProp } from '@mdx-js/react';
import clsx from 'clsx';
import React from 'react';

import { Codeblock } from './mdx-components';
import { bilibili, codepen, netease, youtube } from './shortcodes';

export const MDXComponents: MDXProviderComponentsProp = {
  code: Codeblock,
  pre: (props) => <>{props.children}</>,
  img: (props: React.HTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} className={clsx(props.className, 'max-w-650px m-auto')} />
  ),
  figcaption: (props: React.HTMLAttributes<HTMLElement>) => (
    <figcaption {...props} className={clsx(props.className, 'text-center')} />
  ),
  bilibili,
  codepen,
  netease,
  youtube,
};

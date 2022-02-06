import { MDXProviderComponentsProp } from '@mdx-js/react';
import clsx from 'clsx';
import React from 'react';

import { bilibili } from './shortcodes';

export const MDXComponents: MDXProviderComponentsProp = {
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className={clsx(props.className, 'font-mono')} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className={clsx(props.className, 'whitespace-pre-wrap')} />
  ),
  img: (props: React.HTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} className={clsx(props.className, 'max-w-650px m-auto')} />
  ),
  figcaption: (props: React.HTMLAttributes<HTMLElement>) => (
    <figcaption {...props} className={clsx(props.className, 'text-center')} />
  ),
  bilibili,
};

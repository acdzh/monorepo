import { MDXProviderComponentsProp } from '@mdx-js/react';
import clsx from 'clsx';
import React from 'react';

import { Codeblock } from './mdx-components';
import { bilibili, codepen, netease, youtube } from './shortcodes';

export const MDXComponents: MDXProviderComponentsProp = {
  code: Codeblock,
  pre: (props) => <>{props.children}</>,
  del: (props) => <del title="被你发现了..." {...props} />,
  bilibili,
  codepen,
  netease,
  youtube,
};

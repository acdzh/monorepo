import type { MDXProviderComponentsProp } from '@mdx-js/react';
import React from 'react';

import { Codeblock } from './mdx-components';
import {
  bilibili,
  codepen,
  iframe2,
  netease,
  pdf,
  section,
  youtube,
} from './shortcodes';

export const MDXComponents: MDXProviderComponentsProp = {
  code: Codeblock,
  pre: (props) => <>{props.children}</>,
  del: (props) => <del title="被你发现了..." {...props} />,
  bilibili,
  codepen,
  iframe2,
  netease,
  pdf,
  section,
  youtube,
};

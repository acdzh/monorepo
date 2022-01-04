import { MDXProviderComponentsProp } from '@mdx-js/react';
import React from 'react';

export const MDXComponents: MDXProviderComponentsProp = {
  code: (props) => <code {...props} className="font-mono" />,
  pre: (props) => <pre {...props} className="whitespace-pre-wrap" />,
};

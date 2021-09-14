import React from 'react';

import { MdxType } from '@typings/graphql/mdx';

type FeaturedProps = {
  mdx: Partial<MdxType>;
};

const Featured: React.FC<FeaturedProps> = ({ mdx }) => {};

import { CoreType } from './core';
import { FileType } from './file';

export type FieldsType = {
  slug: string;
};

export type FrontmatterType = Partial<{
  author: string;
  categories: string[];
  comment: boolean;
  cover: FileType;
  toc: boolean;
  title: string;
  tags: string[];
  slug: string;
  series: string[];
  nolicense: boolean;
  from: string;
  draft: boolean;
  description: string;
  date: string;
  update_date: string;
}>;

export type TableOfContentsItemType = {
  url: string;
  title: string;
  items?: TableOfContentsItemType[];
};

export type MdxType = CoreType & {
  body: string;
  excerpt: string;
  fields: FieldsType;
  fileAbsolutePath: string;
  frontmatter: FrontmatterType;
  headings: {
    depth: number;
    value: string;
  }[];
  html: string;
  mdxAST: any; // It is useless
  rawBody: string;
  slug: string;
  tableOfContents: {
    items: TableOfContentsItemType[];
  };
  timeToRead: number;
  wordCount: {
    paragraphs: number;
    sentences: number;
    words: number;
  };
};

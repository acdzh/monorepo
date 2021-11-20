/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * We didn't use the gatsby-plugin-typegen or gastsby-plugin-codegen
 * because the result is uncontrollable.
 * and our requirement is not so complicated.
 */

import { AllCoreType } from './allCore';
import { FileType } from './file';
import { MdxType } from './mdx';
import { SiteType } from './site';

export type GraphqlQueryDataType = {
  allFile: AllCoreType<FileType>;
  allMdx: AllCoreType<MdxType>;
  allSite: AllCoreType<SiteType>;
  fileType: FileType;
  mdx: MdxType;
  site: SiteType;
};

export type GraphqlQueryErrorsType = {
  message: string;
  locations: {
    line: number;
    column: number;
  }[];
  extensions: {
    stack: string[];
  };
}[];

export type GraphqlQueryType = {
  data: GraphqlQueryDataType;
  extensions: any;
  errors: GraphqlQueryErrorsType; // no use
};

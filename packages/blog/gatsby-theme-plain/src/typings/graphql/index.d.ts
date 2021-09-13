/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllCoreType } from './allCore';
import { MdxType } from './mdx';
import { SiteType } from './site';

export type GraphqlQueryDataType = {
  allMdx: AllCoreType<MdxType>;
  allSite: AllCoreType<SiteType>;
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

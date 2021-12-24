/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoreType } from './core';

export type SiteMetadata = {
  author: {
    name: string;
  };
  description: string;
  postsPerPage: number;
  siteUrl: string;
  githubRawUrl: string;
  social: {
    github: string;
    mail: string;
    steam: string;
    twitter: string;
  };
  title: string;
};

export type SiteType = CoreType & {
  buildTime: string;
  siteMetadata: SiteMetadata;
  host: string;
  pathPrefix: string;
  polyfill: boolean;
  port: number;
};

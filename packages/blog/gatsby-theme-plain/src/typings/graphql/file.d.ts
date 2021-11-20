import { CoreType } from './core';
import { MdxType } from './mdx';

export type ImageSharpType = CoreType & {
  fixed: {
    aspectRatio: number;
    base64: string;
    height: number;
    originalName: string;
    srcSet: string;
    src: string;
    srcSetWebp: string;
    srcWebp: string;
    tracedSVG: string;
    width: number;
  };
  fluid: {
    aspectRatio: number;
    base64: string;
    originalImg: string;
    originalName: string;
    presentationHeight: number;
    presentationWidth: number;
    sizes: string;
    src: string;
    srcSet: string;
    srcSetWebp: string;
    srcWebp: string;
    tracedSVG: string;
  };
  origin: {
    height: number;
    src: string;
    width: number;
  };
  resize: {
    aspectRatio: number;
    height: number;
    originalName: string;
    src: string;
    tracedSVG: string;
    width: number;
  };
};

export type FileType = CoreType & {
  absolutePath: string;
  accessTime: string;
  atime: string;
  atimeMs: number;
  base: string;
  birthTime: string;
  birthtime: string;
  birthtimeMs: number;
  blksize: number;
  blocks: number;
  changeTime: string;
  childImageSharp: ImageSharp;
  childMdx: MdxType;
  childrenImageSharp: ImageSharp;
  childrenMdx: MdxType;
  ctime: string;
  ctimeMs: number;
  dev: number;
  dir: string;
  ext: string;
  extension: string;
  name: string;
  nlink: number;
  publicURL: string;
  rdev: number;
  relativeDirectory: string;
  relativePath: string;
  root: string;
  size: number;
  sourceInstanceName: string;
  uid: number;
};

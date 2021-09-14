export type CoreType = {
  children: CoreType;
  id: string;
  internal: {
    content: string;
    contentDigest: string;
    description: string;
    fieldOwners: string;
    ignoreType: string;
    mediaType: string;
    owner: string;
    type: string;
  };
  parent: CoreType;
};

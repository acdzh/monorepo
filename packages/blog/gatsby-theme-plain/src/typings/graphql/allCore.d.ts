/* eslint-disable @typescript-eslint/no-explicit-any */
export type NodesType<T> = T[];

export type EdgesType<T> = {
  next: NodesType<T>;
  node: NodesType<T>;
  previous: NodesType<T>;
};

export type GroupType<T> = {
  group: {
    edges: EdgesType<T>;
    field: string; // The key group by;
    fieldValue: string; // The value of the key group by;
    nodes: NodesType<T>;
    pageInfo: PageInfoType;
    totalCount: number;
  };
};

export type PageInfoType = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount: number;
  itemCount: number;
  perPage: any /* 未知类型 */;
  totalCount: number;
};

export type AllCoreType<T> = {
  distinct: string[];
  edges: EdgesType<T>;
  group: GroupType<T>;
  max: number;
  min: number;
  nodes: NodesType<T>;
  pageInfo: PageInfoType;
  sum: number;
  totalCount: number;
};

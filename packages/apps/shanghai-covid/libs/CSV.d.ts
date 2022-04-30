declare const CSV: {
  parse: (csv: string) => unknown[];
  stringify: <T>(array: T[], fields: string[]) => string;
};
export default CSV;

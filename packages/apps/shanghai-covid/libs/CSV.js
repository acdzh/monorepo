const CSV = {
  parse: (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const data = lines
      .slice(1)
      .filter((line) => line !== '')
      .map((line) => {
        const values = line.split(',');
        return Object.fromEntries(
          headers.map((header, index) => [header, values[index]])
        );
      });
    return data;
  },
  stringify: (array, fields) =>
    array.reduce(
      (csv, item) =>
        (csv += fields.map((field) => item[field] || '').join(',') + '\n'),
      fields.join(',') + '\n'
    ),
};

module.exports = CSV;

const path = require('path');

module.exports = function ({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../src/components'),
        '@icons': path.resolve(__dirname, '../src/icons'),
        '@typings': path.resolve(__dirname, '../src/typings'),
      },
    },
  });
};

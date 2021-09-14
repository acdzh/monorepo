const createPages = require('./config/createPages');
const onCreateDevServer = require('./config/onCreateDevServer');
const onCreateNode = require('./config/onCreateNode');
const onCreateWebpackConfig = require('./config/onCreateWebpackConfig');

module.exports = {
  createPages,
  onCreateDevServer,
  onCreateNode,
  onCreateWebpackConfig,
};

// server the static file when dev
module.exports = function ({ app }) {
  app.use(require('express').static('./static'));
};

// server the static file when dev
const express = require('express');

module.exports = function ({ app }) {
  app.use(express.static('./static'));
  app.use(express.static(`${__dirname}/../static`));
};

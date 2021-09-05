const path = require('path');

const postcssWindicss = require('postcss-windicss');

module.exports = () => ({
  plugins: [
    postcssWindicss({
      config: path.join(__dirname, 'windi.config.ts'),
    }),
  ],
});

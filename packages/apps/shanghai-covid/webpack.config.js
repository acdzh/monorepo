const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moment = require('moment');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BASE_PATH = __dirname;
const DIST_PATH = path.join(BASE_PATH, 'dist');
const SRC_PATH = path.join(BASE_PATH, 'src');
const PUBLIC_PATH = path.join(BASE_PATH, 'public');

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development';

  return {
    entry: {
      index: path.join(SRC_PATH, 'index.tsx'),
    },
    output: {
      path: DIST_PATH,
      filename: '[name].[chunkhash].js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
          },
        },
      },
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      '@antv/l7': 'L7',
      '@ant-design/maps': 'Maps',
      moment: 'moment',
    },
    devtool: isDevMode ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.([t|j]sx?)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss|\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevMode,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: `上海涉疫地点 (更新于 ${moment()
          .utcOffset(8)
          .format('MM-DD HH:mm')})`,
        template: path.join(PUBLIC_PATH, 'index.html'),
        favicon: path.join(PUBLIC_PATH, 'favicon_32x32.ico'),
      }),
      new HtmlWebpackPlugin({
        template: path.join(PUBLIC_PATH, 'download.html'),
        favicon: path.join(PUBLIC_PATH, 'favicon_32x32.ico'),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'data', to: 'data' }],
      }),
      isDevMode && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
  };
};

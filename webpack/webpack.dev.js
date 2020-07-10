const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
  mode: ENV,
  entry: [
    './src/main/client/app/index'
  ],
  output: {
    path: utils.root('build/resources/main/static/'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: { implementation: sass }
        }
        ]
      }
    ]
  },
  devServer: {
    stats: options.stats,
    hot: true,
    contentBase: './build/resources/main/static/',
    proxy: [{
      context: [
        '/api',
      ],
      target: `http://localhost:8080`,
      secure: false,
    }],
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  },
  // stats: process.env.DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9000,
      proxy: {
        target: `http://localhost:9060`,
        proxyOptions: {
          changeOrigin: false  //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
        }
      },
      socket: {
        clients: {
          heartbeatTimeout: 60000
        }
      }
    }, { reload: false }),
    new SimpleProgressWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('src/test'),
    ]),
    new WebpackNotifierPlugin({
      title: 'DataWheel',
      contentImage: path.join(__dirname, 'logo.png')
    })
  ]
});

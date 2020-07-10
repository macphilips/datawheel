const path = require('path');
const webpack = require('webpack');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils.js');

const getTsLoaderRule = env => {
  const rules = [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('build/cache-loader')
      }
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true
      }
    }
  ];
  if (env === 'development') {
    rules.unshift({
      loader: 'react-hot-loader/webpack'
    });
  }
  return rules;
};

module.exports = options => ({
  cache: options.env !== 'production',
  resolve: {
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ],
    modules: ['node_modules'],
    alias: {
      "app": utils.root("./src/main/client/app")
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: getTsLoaderRule(options.env),
        include: [utils.root('./src/main/client/app')],
        exclude: [utils.root('node_modules')]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          digest: 'hex',
          hash: 'sha512',
          name: 'content/[hash].[ext]'
        }
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'source-map-loader'
      },
    ]
  },
  stats: {
    children: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${options.env}'`,
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        DEBUG_INFO_ENABLED: options.env === 'development',
        SERVER_API_URL: `'http://localhost:8080/api'`
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/main/client/content/', to: 'content' },
      // { from: './src/main/client/favicon.ico', to: 'favicon.ico' },
      // { from: './src/main/client/404.html', to: '404.html' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/main/client/index.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
    new BaseHrefWebpackPlugin({ baseHref: '/' }),
  ],
});

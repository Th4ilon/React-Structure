const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.config');

const webpackProdConfig = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'src/dist'),
    publicPath: './',
    chunkFilename: '[name].[chunkhash].min.js',
    devtoolModuleFilenameTemplate: 'app:///[resource-path]'
  },
  /*
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          allChunks: true,
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                modules: false,
                importLoaders: 1,
                localIdentName: '[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/template.html'),
      filename: path.resolve(__dirname, 'src/dist/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./src/app.css')
  ]
});

module.exports = webpackProdConfig;

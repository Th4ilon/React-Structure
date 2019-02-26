require('@babel/polyfill');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackCommonConfig = {
  entry: [
    '@babel/polyfill',
    'core-js/fn/promise',
    './src/index.js'
  ],
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'src/dist'),
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].min.js',
    devtoolModuleFilenameTemplate: 'app:///[resource-path]'
  },
  resolve: {
    alias: {
      // 'coreui-styles': '@coreui/react/React_Full_Project/scss/style.scss',
      'simple-line-icons': 'simple-line-icons/css/simple-line-icons.css',
      'custom-css': './public/custom.css',
      'fonts-css': './public/fonts.css',
      'base-styles': './public/style.css',
      'spinkit-spinners': 'spinkit/scss/spinkit.scss',
      components: path.resolve(__dirname, 'src/components'),
      scenes: path.resolve(__dirname, 'src/scenes'),
      services: path.resolve(__dirname, 'src/services'),
      utils: path.resolve(__dirname, 'src/utils')
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          allChunks: true,
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 2,
                localIdentName: '[local]',
                // to fix the imports of coreiu styles
                alias: { '../img': '../public/img' }
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          allChunks: true,
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 2,
                localIdentName: '[local]',
                // to fix the imports of coreiu styles
                alias: { '../img': '../public/img' }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/template.html'),
      filename: path.resolve(__dirname, 'src/dist/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./src/app.css'),
    new CopyWebpackPlugin([
      {
        from: './src/public/img',
        to: 'img/[name].[ext]',
        test: /([^/]+)\/(.+)\.png$/
      }
    ], {debug: true})
  ]
};

module.exports = webpackCommonConfig;

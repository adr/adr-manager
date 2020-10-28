const {join} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

/*
* Generates a configuration object for Webpack.
*/

module.exports = function ({mode, env, publicPath}) {
  let isClient = mode === 'client';
  let isDev = env === 'development';

  return {
    context: join(__dirname, '..', 'src', 'app'),
    target: isClient ? 'web' : 'node',
    devtool: isDev ? '#source-map' : false,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: !isDev ? {css: ExtractTextPlugin.extract({loader: `css-loader`})} : {}
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/ /* you must use .babelrc */
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: `[path][name].[ext]?[hash]`
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          query: {
            name: `[path][name].[ext]?[hash]`
          }
        }
      ]
    },
    entry: [
      isClient ? 'babel-polyfill' : null,
      isClient && isDev ? 'webpack-hot-middleware/client' : null,
      join(__dirname, '..', 'src', 'app', `${mode}-entry.js`)
    ].filter((e) => !!e),
    output: {
      path: join(__dirname, '..', 'dist', mode),
      filename: `bundle.js?[hash]`,
      publicPath,
      libraryTarget: isClient ? 'var' : 'commonjs2'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.VUE_ENV': JSON.stringify(mode)
      }),
      new InlineEnviromentVariablesPlugin(),
      isDev ? new webpack.HotModuleReplacementPlugin() : null,
      isDev ? new webpack.NoEmitOnErrorsPlugin() : null,
      !isDev ? new ExtractTextPlugin(`bundle.css?[hash]`) : null,
      !isDev ? new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}) : null,
      !isDev ? new webpack.LoaderOptionsPlugin({minimize: true}) : null
    ].filter((e) => !!e)
  }
};

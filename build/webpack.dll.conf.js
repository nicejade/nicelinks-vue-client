const path = require('path')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    vendor: [
      'js-cookie',
      'axios',
      'vue/dist/vue.min.js',
      'vue-router',
      'vue-i18n',
      'vuex',
      'crypto-js/sha256',
      'crypto-js/md5',
      'raven-js',
      'countup',
      'marked',
      'vue-content-placeholder',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(autotrack|dom-utils))/,
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    /*
      @desc: https://webpack.js.org/plugins/module-concatenation-plugin/
      "作用域提升(scope hoisting)",使代码体积更小[函数申明会产生大量代码](#webpack3)
    */
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
    }),
  ],
}

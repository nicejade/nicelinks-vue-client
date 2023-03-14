const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const vueLoaderConfig = require('./vue-loader.conf')
const svgoConfig = require('../config/svgo-config.json')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const env = process.env.NODE_ENV

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const cssLoader = new MiniCssExtractPlugin({
  use: ['happypack/loader?id=happy-css'],
})

// inject happypack accelerate packing for vue-loader @17-08-18
Object.assign(vueLoaderConfig.loaders, {
  js: 'happypack/loader?id=happy-babel-vue',
  css: cssLoader,
})

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1',
  })
}

module.exports = {
  entry: {
    app: './src/main.js',
    element: ['element-ui'],
  },
  mode: env === 'production' ? 'production' : 'development',
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [resolve('src'), resolve('node_modules')],
    alias: {
      vue$: 'vue/dist/vue.min.js',
      src: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      config: resolve('src/config'),
      helper: resolve('src/helper'),
      views: resolve('src/views'),
      mixins: resolve('src/mixins'),
      partials: resolve('src/partials'),
      store: resolve('src/store'),
    },
  },
  module: {
    noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      {
        test: /\.svg$/,
        enforce: 'pre',
        loader: 'svgo-loader?' + JSON.stringify(svgoConfig),
        include: /assets\/icons/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        include: [resolve('src')],
        exclude: /node_modules\/(?!(autotrack))|vendor\.dll\.js/,
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('src')],
        loader: 'happypack/loader?id=happy-babel-js',
      },
      // inject loader for @waline/dist
      {
        test: /\.js[x]?$/,
        include: [/node_modules\/@waline/],
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        loader: 'happypack/loader?id=happy-svg',
        include: [/assets\/icons/, /node_modules\/mavon-editor/],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src')],
        exclude: /assets\/icons/,
        query: {
          limit: 8192,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|woff|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  // externals中：key 是 require 的包名，value 是全局的变量。
  externals: {
    // 'element-ui': 'ElementUI',
    // 'vue': 'Vue',
    'babel-polyfill': 'window',
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json'),
    }),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version'],
          }),
        ],
      },
    }),
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-svg', ['svg-sprite-loader']),
    createHappyPlugin('happy-css', ['css-loader']),
    new HappyPack({
      loaders: [
        {
          path: 'vue-loader',
          query: {
            loaders: {
              scss: 'css-loader!sass-loader?indentedSyntax',
              js: 'happypack/loader?id=happy-babel-vue',
            },
          },
        },
      ],
    }),
  ],
}

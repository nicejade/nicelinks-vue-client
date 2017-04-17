var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var vueLoaderConfig = require('./vue-loader.conf')
var svgoConfig = require('../config/svgo-config.json')
var chalk = require('chalk')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var HappyPack = require('happypack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var happyThreadPool = HappyPack.ThreadPool({ size: 5 })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var cssLoader = ExtractTextPlugin.extract({
  use: [{
    loader: 'happypack/loader?id=happycss'
  }],
  fallback: 'vue-style-loader'
})

var sassLoader = ExtractTextPlugin.extract({
  use: [
    'happypack/loader?id=happycss',
    'happypack/loader?id=happysass'
  ],
  fallback: 'vue-style-loader'
})

// Merge the config into vueLoaderConfig
Object.assign(vueLoaderConfig.loaders, {
  css: cssLoader,
  scss: sassLoader,
  js: 'happypack/loader?id=happybabel'
})

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'config': resolve('src/config'),
      'helper': resolve('src/helper')
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        enforce: "pre",
        loader: 'svgo-loader?' + JSON.stringify(svgoConfig)
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src'), resolve('test')]
      // },
      {
        test: /\.js[x]?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: /assets\/icons/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /assets\/icons/,
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'happycss',
      cache: true,
      loaders: [ 'css-loader?mportLoaders=1' ]
    }),
    new HappyPack({
      id: 'happysass',
      cache: true,
      loaders: [ 'sass-loader' ]
    })
  ]
}

// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')

env.NODE_ENV = process.env.NODE_ENV || 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// backups for build @2017-11-12
// var backupsSpinner = ora('Start backing up the last packaged project...')
// backupsSpinner.start()
// let backupsPath = path.resolve(__dirname, '../backups')
// shell.rm('-rf', backupsPath)
// shell.mkdir('-p', backupsPath)
// shell.cp('-R', config.build.assetsRoot + '/*', backupsPath)
// backupsSpinner.stop()

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.cp('./ads.txt', config.build.assetsRoot)
shell.config.silent = false

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n'
  )

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(
    chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
        "  Opening index.html over file:// won't work.\n"
    )
  )
})

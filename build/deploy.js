var path = require('path')
var shell = require('shelljs')

let sourcePath = path.resolve(__dirname, '../dist/*')
let targetPath = '/data/site/jade-blog'
shell.rm('-rf', targetPath)
shell.mkdir('-p', targetPath)
shell.config.silent = true
shell.cp('-R', sourcePath, targetPath)
shell.config.silent = false

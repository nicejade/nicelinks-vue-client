var path = require('path')
var shell = require('shelljs')
var chalk = require('chalk')

let sourcePath = path.resolve(__dirname, '../dist/*')

// Copy To NiceLinks-API (1)
let targetPath = './../nice-koa2-api/'
shell.rm('-rf', `${targetPath}public/static`)
shell.mkdir('-p', `${targetPath}public/static`)
shell.cp('-R', sourcePath, `${targetPath}public/`)

// Copy To NiceLinks-Static (2)
targetPath = './../nicelinks/'
shell.rm('-rf', `${targetPath}/static`)
shell.mkdir('-p', targetPath)
shell.cp('-R', sourcePath, targetPath)

// shell.cd(targetPath)

// if (!shell.which('git')) {
//   shell.echo('Sorry, this script requires git')
//   shell.exit(1)
// }

// if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
//   shell.echo('Error: Git commit failed')
//   shell.exit(1)
// }

// shell.config.silent = true
// shell.config.silent = false

console.log(chalk.green('\n√ Success: ') + 'Deploy Has been completed.')

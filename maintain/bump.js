const { Command } = require('commander')
const program = new Command()

program.parse(process.argv)
commander.version(
  require('../package.json').version,
  '-v, --version',
  'Output the current version'
)
program
  .option('-1, --major', '提升主版本号')
  .option('-2, --minor', '提升次版本号')
  .option('-3, --patch', '提交补丁')
  .option('--pre <type>', '定义新的预发布版本 (alpha/beta/pre)')
  .option('--nopush', '若定义，则不推送到源')
  .option('--nopublish', '若定义，则不分发打包')

const options = program.opts()
console.log(options)

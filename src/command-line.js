const yargs   = require('yargs/yargs'),
      parser  = require('yargs-parser')

export function getCommandLine() {
  yargs()
    .usage('Usage: $0 <cmd> [args]')
    .example('$0 business --phone=654123456', 'get the business with this number phone')
    .command('business [args]', 'Get a habit-business', {
      args: {
        describe: "What features do you want?",
        choices: ['id', 'mail', 'phone', 'active'],
      }
    })
    .command('customer [args]', 'Get a habit-customer', {
      args: {
        describe: 'What features do you want?',
        choices: ['id', 'mail', 'phone', 'active'],
        default: 'active',
      }
    })
    .help()
    .argv

  var values = parser(process.argv.slice(2))
  var hab_type = values._[0]
  delete values._

  return {hab_type, values}
}
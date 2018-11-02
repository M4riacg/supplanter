import { mainDefinitions, getBusinessOptions, helpCommandLine } from './parse-args'
const commandLineArgs = require('command-line-args')

export function getCommandLine() {
  /* first - select user type */
  const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })
  const argv = mainOptions._unknown || []

  /* second - parse user command options */
  if (mainOptions.command === 'business') {
    const options = commandLineArgs(getBusinessOptions(), { argv, partial: true })

    if (options._unknown) {
      console.log('\x1b[31mError param')
      console.log('\x1b[32m' + helpCommandLine())
    }

    console.log(options)
    return {"hab_type": mainOptions.command, "values": options};
  } else if (mainOptions.command === 'customer') {
    console.log('TODO')
  } else {
    console.log('\x1b[31mError command')
    console.log('\x1b[32m' + helpCommandLine())
  }
}

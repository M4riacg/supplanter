#!/usr/bin/env node

const yargs   = require('yargs'),
      parser  = require('yargs-parser')

export function getCommandLine() {  
  yargs
    .usage('Usage: $0 <cmd> [args]')
    .example('$0 business --phone=654123456', 'get the business with this number phone')    
    .command('business [args]', 'Get a habit-business', {
      args: {
        describe: "What features do you want?",
        choices: ['id', 'mail', 'phone', 'active'],
      }     
    }, function (argv) {
      console.log('business', 'id =', argv.id, ', mail =', argv.mail, ', phone =', argv.phone, ', active =', argv.active)
    })
    .command('customer [args]', 'Get a habit-customer', {
      args: {
        describe: 'What features do you want?',
        choices: ['id', 'mail', 'phone', 'active'],        
        default: 'active',
      }
    }, function (argv) {
      console.log('hello', argv.name, 'welcome to yargs!')
    })
    .help('h')
    .argv

  return parser(process.argv.slice(2))
}
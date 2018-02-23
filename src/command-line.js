var inquirer = require('inquirer');
var command_args = require('../command-args.json')

export function getCommandLine() {
  var questions = [
    {
      type: 'list',
      name: 'user_type',
      message: 'What user type do you need?',
      choices: ['Business', 'Customer'],
      filter: function(val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'list',
      name: 'filter',
      message: 'What filter do you need?',
      choices: command_args.business.simple,
      when: userIs('business')
    },
    {
      type: 'list',
      name: 'filter',
      message: 'What filter do you need?',
      choices: command_args.customer.simple,
      when: userIs('customer')
    },
    {
      type: 'input',
      name: 'value',
      message: 'Introduce the value:',
    }
  ];

  function userIs(type) {
    return function(answers) {
      return answers['user_type'] == type;
    }
  }

  return new Promise((resolve) => {
    inquirer.prompt(questions).then(answers => {
      // console.log(JSON.stringify(answers, null, '  '));
      var hab_type = answers['user_type']
      var values = {
        [answers['filter']]: answers['value'],
      }
      resolve({hab_type, values})
    })
  })
}
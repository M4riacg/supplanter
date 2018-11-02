var inquirer = require('inquirer');
var command_args = require('../command-args.json')

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
    type: 'checkbox',
    name: 'filter',
    message: 'What filters do you need?',
    choices: (command_args.business.simple).concat(command_args.business.join),
    when: userIs('business'),
    validate: function(answer) {
      if (answer.length < 1) {
        return 'You must choose at least one (pressing space).';
      }
      return true;
    }
  },
  {
    type: 'list',
    name: 'filter',
    message: 'What filter do you need?',
    choices: command_args.customer.simple,
    when: userIs('customer')
  }
];

function userIs(type) {
  return function(answers) {
    return answers['user_type'] == type;
  }
}

function generateFilterQuestions(filters = []) {
  return filters.map((filter) => {
    return {
      type: 'input',
      name: filter,
      message: 'Introduce the value of ' + filter + ':',
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must introduce the value.';
        }
        return true;
      }
    };
  })
}

export function getCommandLine() {
  return inquirer.prompt(questions)
    .then(answers => {
      var filter_questions = generateFilterQuestions(answers['filter']);
      return inquirer.prompt(filter_questions)
        .then((filter_answers) => {
          var hab_type = answers['user_type']
          var values = filter_answers
          return {hab_type, values};
        })
  });
}


// export async function getCommandLineSync() {
//   const firtsQuestions = await inquirer.prompt(questions);
//   const secondQuestions = await inquirer.prompt(generateFilterQuestions(firtsQuestions['filter']));
//   return [firtsQuestions, secondQuestions];
// }
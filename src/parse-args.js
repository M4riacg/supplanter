const command_args = require('../command-args.json')
const commandLineUsage = require('command-line-usage')

export const mainDefinitions = [
  { 
    name: 'command',
    type: function (value) {
      return Object.keys(command_args).includes(value) ? value : false
    },
    defaultOption: true 
  }
]

export const getBusinessOptions = () => {
  let options = []
  options = prepareSimple(options, command_args.business.simple)
  options = prepareComplexed(options, command_args.business.join)
  options = prepareComplexed(options, command_args.business.customized)
  return options
}

const prepareSimple = (options, args) => {
  Object.keys(args).forEach(key => {
    let option = {}
    option = args[key]
    option.name = key
    if (option.type) {
      option.type = eval(option.type)
    }
    options.push(option)
  })

  return options
}

const prepareComplexed = (options, args) => {
  Object.keys(args).forEach(key => {
    let option = {description: args[key]['description']}
    option.name = key
    if (args[key]['type']) {
      option.type = eval(args[key]['type'])
    }
    if (args[key]['alias']) {
      option.alias = args[key]['alias']
    }
    options.push(option)
  })

  return options
}

export function helpCommandLine() {
  return commandLineUsage([
    {
      header: 'Available Commands',
      content: Object.keys(command_args)
    },
    {
      header: 'Business Options',
      optionList: getBusinessOptions()
    },
    {
      header: 'Typical Example',
      content: 'business --membership=5 -s 1'
    },
  ]);
}
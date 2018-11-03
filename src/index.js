import { getCommandLine } from './command-line'
import { executeQuery } from './database'

const opn = require('opn')
const config = require('./config.json')

const params = getCommandLine()
if (params && params.hab_type === 'business') {
  const normalized_name = executeQuery(params.values, config)

  normalized_name
  .then(function(params) {
    opn(config.business_domain+params, {app: config.browser})
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

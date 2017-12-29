import { getCommandLine } from './command-line'
import { getQuery, executeQuery } from './database'


var config = require('./config.json');
var business_domain = config.business_domain;

var opn = require('opn');

var params = getCommandLine()

if (params.hab_type === 'business') {
  var query = getQuery(params.values)
  if (query) {
    var normalized_name = executeQuery(query)

    normalized_name
    .then(function(params) {
      opn(business_domain+params, {app: 'google-chrome'})
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }
  
}

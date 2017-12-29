import { getCommandLine } from './command-line'
import { getQuery, executeQuery } from './database'

var jsonfile = require('jsonfile')
var opn = require('opn');
var path = require('path');

var home = process.env['HOME'];
var config_path = path.join(home, '/.config/supplanter/confi.json');

var config = jsonfile.readFileSync(config_path, {throws: false});

if (!config) {
  config = require('./config.json');
  jsonfile.writeFileSync(config_path, config, {spaces: 2, EOL: '\r\n'})
}

var params = getCommandLine()

if (params.hab_type === 'business') {
  var query = getQuery(params.values)
  console.log(query)
  if (query) {
    var normalized_name = executeQuery(query)

    normalized_name
    .then(function(params) {
      opn(config.business_domain+params, {app: 'google-chrome'})
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }
  
}

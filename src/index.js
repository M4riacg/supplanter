import { getCommandLine } from './command-line'
import { getQuery, executeQuery } from './database'

var jsonfile = require('jsonfile')
var opn = require('opn')
var path = require('path')
var makeDir = require('make-dir')

var home = process.env['HOME']
var config_path = path.join(home, '/.config/supplanter/')
var name_config_file = 'config.json'

var config = jsonfile.readFileSync(config_path+name_config_file, {throws: false})

if (!config) {
  makeDir(config_path).then(path => {
    config = require('./config.json')
    jsonfile.writeFileSync(config_path+name_config_file, config, {spaces: 2, EOL: '\r\n'})
  });
  console.log('Se ha creado un fichero de configuración en:' + config_path+name_config_file);
  console.log('Quizás es necesario que lo modifiques para que funcione :)');
}

getCommandLine().then(function(params) {
  if (params.hab_type === 'business') {
    var query = getQuery(params.values, config.command_args.business.complexed)
    console.log(query)
    if (query) {
      var normalized_name = executeQuery(query, config.habitissimo_db)

      normalized_name
      .then(function(params) {
        opn(config.business_domain+params, {app: 'google-chrome'})
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }

  }
})

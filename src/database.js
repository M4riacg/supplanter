var mysql = require('mysql'),
      config = require('./config.json');

var db_config = config.habitissimo_db,
      business_complexed = config.command_args.business.complexed; 

export function executeQuery(query) {

  var c = mysql.createConnection({
    host     : db_config.host,
    user     : db_config.user,
    password : db_config.pass,
    port     : db_config.port,
    database : db_config.name
  })
  
  return new Promise((resolve, reject) => {
    c.query(query, (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve(results[0].normalized_name)
      }      
    })
    
    c.end()
  })
}

export function getQuery(values) {
  let key_values = Object.keys(values);
  if (!business_complexed.includes(values) && key_values.length === 1) {
    return 'SELECT * from hab_business where '+ key_values + "= '" + values[key_values] + "'"
  }

  return null;
}

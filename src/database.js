var mysql = require('mysql')

export function executeQuery(query, db_config) {

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

export function getQuery(values, business_complexed) {
  let key_values = Object.keys(values);
  if (!business_complexed.includes(key_values) && key_values.length === 1) {
    return 'SELECT * from hab_business where '+ 
      key_values + " = '" + values[key_values] + "' " +
      "and business_status = 1 order by id desc limit 1"
  }

  return null;
}

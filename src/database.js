var mysql = require('mysql')

function getQuery(c, values, customized) {
  let key_values = Object.keys(values);
  if (!customized.indexOf(key_values[0]) > -1) {

    var query = 'SELECT * from hab_business WHERE '
    // create method to add inner joins
    key_values.forEach( function(key, index) {
      if (index !== 0) query += ' AND '
      query += key + ' = ' + c.escape(values[key])
    })

    query += ' ORDER BY id DESC LIMIT 1';
    return query;
  } else {
    console.log('pending to code')
  }
  return null;
}

export function executeQuery(values, config) {

  var c = mysql.createConnection({
    host     : config.habitissimo_db.host,
    user     : config.habitissimo_db.user,
    password : config.habitissimo_db.pass,
    port     : config.habitissimo_db.port,
    database : config.habitissimo_db.name
  })

  return new Promise((resolve, reject) => {
    var query = getQuery(c, values, config.command_args.business.customized)
    console.log(query)
    c.query(query, (error, results, fields) => {
      if (error) {
        reject(error)
      } else if(results[0]) {
        resolve(results[0].normalized_name)
      } else {
        console.log('No results found')
      }
    })
    
    c.end()
  })
}

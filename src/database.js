const command_args = require('../command-args.json')
var mysql = require('mysql')

function getQuery(c, values) {
  const  business_params = command_args.business
  let key_values = Object.keys(values);
  if (!(key_values in Object.keys(business_params.customized))) {
    var query = 'SELECT * from hab_business '
    query = addRelations(query, business_params, values)
    query += ' WHERE '
    key_values.forEach( function(key, index) {
      if (index !== 0) query += ' AND '
      query += getkey(key, business_params) + ' = ' + c.escape(values[key])
    })

    query += ' ORDER BY id DESC LIMIT 1';
    return query;
  } else {
    console.log('pending to code')
  }
  return null;
}

function addRelations(query, business_params, filters) {
  Object.keys(filters).forEach(key => {
    if (key in business_params.join) {
      query += ' INNER JOIN ' + business_params.join[key].table
                + ' ON hab_business.id = ' + business_params.join[key].table + '.' + business_params.join[key].pk;
    }
  });
  return query;
}

function getkey(key, business_params) {
  if (key in Object.keys(business_params.join)) {
    return business_params[key].field;
  }
  return key;
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
    var query = getQuery(c, values)
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

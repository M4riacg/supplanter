const mysql   = require('mysql');
require('dotenv').config()

export function getBusiness() {
  var c = mysql.createConnection({
    host     : process.env.APITISSIMO_DB_HOST,
    user     : process.env.APITISSIMO_DB_USER,
    password : process.env.APITISSIMO_DB_PASS,
    port     : process.env.APITISSIMO_DB_PORT,
    database : process.env.APITISSIMO_DB_NAME
  })

  return new Promise((resolve, reject) => {
    c.query('SELECT * from hab_business where id = 1', (error, results, fields) => {
      resolve(results)
    });
  })
}
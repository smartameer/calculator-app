/**
 * Calculator
 * @author: smartameer
 */

const mysql = require('mysql')
const config = require('../database.json')[process.env.NODE_ENV || 'development']

//mysql connection
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
})

connection.connect(err => {
    if (err) throw err
    console.log('You are now connected with mysql database.')
})

module.exports = connection

mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    password: 'admin123',
    database: 'niceflix',
    host: 'localhost'
})

module.exports = db

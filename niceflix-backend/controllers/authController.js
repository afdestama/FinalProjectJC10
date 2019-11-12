const db = require('../database')


module.exports = {
   login: (req, res) => {

      db.query(`select * from users where email = '${req.query.email}'`, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            if (req.query.password === result[0].password) {
               res.send({
                  status: '200',
                  result: {
                     id: result[0].id,
                     name: result[0].name,
                     email: result[0].email,
                     role: result[0].role
                  }
               })
            } else {
               res.send({
                  status: '401',
                  message: 'Wrong Password!'
               })
            }
         } else {
            let hasil = {
               status: '404',
               message: 'User not found!'
            }
            res.send(hasil)
         }


      })
   },
   register: (req, res) => {
      let check = `select * from users where email = '${req.body.email}'`
      let input = `insert into users (name, email, password) value ('${req.body.name}','${req.body.email}','${req.body.password}')`

      db.query(check, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send({
               status: '400',
               message: 'Email has been taken!'
            })
         }
      })
   },

   verify: (req, res) => {
      let email = req.query.email
      let sql = `update users set verified = 1 where email = '${email}'`
      db.query(sql, (err, result) => {
         if (err) throw err
         res.send('<p>Your account has been verified !</p>')
      })
   }
}


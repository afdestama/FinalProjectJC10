const db = require('../database')
const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hellodestama@gmail.com',
        pass: 'hztrnekguqndtgss'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = {
    uploadTransaksi: (req, res) => {
        let bukti = `http://localhost:8000/${req.file.path}`
        let { id, paket, amount } = req.body

        //sql
        let sql = `select * from subscription as s
        join users as u on s.users_id = u.id
        where u.id = '${id}' and not u.role = 'premium';`

        let sql2 = `insert into subscription (users_id, paket, amount, bukti_pembayaran)
        value ('${id}','${paket}','${amount}','${bukti}')`

        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length <= 0) {
                db.query(sql2, (err, result) => {
                    if (err) throw err
                    res.send({
                        status: "Konfirmasi Sukses, Silahkan Tunggu"
                    })
                })
            }
        })

        // res.send('Halo')
    },

    getRequest: (req, res) => {
        let sql = `select s.id, s.users_id, s.paket, s.amount, s.status, s.bukti_pembayaran from subscription as s
        join users as u on s.users_id = u.id
        where s.status = false;`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    setApprove: (req, res) => {
        let { users_id, start_time, end_time, email } = req.body
        let updateUser = `update users SET role = 'premium' WHERE id = '${users_id}'`
        let subsStatus = `update subscription set start_time = '${start_time}', end_time = '${end_time}', status = true
        where users_id='${users_id}' and status = false`

        db.query(updateUser, (err, result) => {
            if (err) throw err
            db.query(subsStatus, (err, result) => {
                if (err) throw err
                res.send('Approve done')
            })
        })
    },

    subsHistory: (req, res) => {
        let sql = `select s.id, s.users_id, s.paket, s.amount, s.status, s.bukti_pembayaran from subscription as s
        join users as u on s.users_id = u.id
        where s.status = true`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }
}
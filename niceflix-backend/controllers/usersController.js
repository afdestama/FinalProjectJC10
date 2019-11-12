const db = require('../database')

module.exports = {

    watchlist: (req, res) => {
        let id = req.params.id
        sql = `select wl.id, wl.mov_id, mf.mov_poster from watchlist as wl
        join mov_filestore as mf on wl.mov_id = mf.mov_id
        where users_id = '${id}'
        order by 1 asc`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    watchremove: (req, res) => {
        let id = req.params.id

        sql = `delete from watchlist where id='${id}'`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    watchlistAdd: (req, res) => {
        let { users_id, mov_id } = req.body


        let sql = `insert into watchlist (users_id, mov_id) 
                            value ('${users_id}', '${mov_id}')`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(
                {
                    message: 'Done'
                }
            )
        })
    },

    checkWatchlistButton: (req, res) => {
        let id = req.query.id
        let sql = `
        select wt.id, wt.mov_id, wt.status from watchlist as wt
        join movies as m on m.mov_id = wt.mov_id
        join users as u on u.id = wt.users_id
        where wt.users_id = '${id}'
        order by 1 desc
        `
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    history: (req, res) => {
        let { users_id, mov_id } = req.body

        let sql = `insert into history (users_id, mov_id) 
        value ('${users_id}', '${mov_id}')`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }
}
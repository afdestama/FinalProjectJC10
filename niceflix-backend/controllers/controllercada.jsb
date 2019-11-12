editMovie: (req, res) => {
    let id = req.params.id
    let { title, year, time, country, genre, actor, description, director, vidlink } = req.body
    let getTime = parseInt(time)
    let input = `update movies set mov_title = '${title}', 
    mov_year = '${year}', mov_time = '${getTime}', mov_country = '${country}'`

    db.query(input, (err, result) => {
        if (err) throw err

        // update mov_description
        sql = `update mov_description set mov_desc = '${description}' 
      where mov_id = '${id}'`
        db.query(sql, (err, result) => {
            if (err) throw err

            // update link dan poster
            let location = `http://localhost:8000/${req.file.path}`

            sql = `update mov_filestore set mov_url = '${vidlink}', mov_poster = '${location}' 
      where mov_id = '${id}'`
            db.query(sql, (err, result) => {
                if (err) throw err

                //update genre (array)
                arr = JSON.parse(genre.trim())
                arr.map(list => {
                    db.query(`update mov_genre set genre = '${list}' where mov_id = '${id}'`, (err, result) => {
                        if (err) throw err
                    })
                })

                //update director 
                // 1. check dulu di dir_list kalo ada yang sama di update , 
                //kalo gak ada baru di insert
                db.query(`select * from dir_list where dir_name = '${director}'`, (err, result) => {
                    if (err) throw err
                    if (result.length <= 0) {
                        // tambah ke dir_list
                        db.query(`insert into dir_list (dir_name) value ('${director}')`, (err, result) => {
                            if (err) throw err
                            //get dir id 
                            db.query(`select * from dir_list order by dir_id desc limit 1`, (err, result) => {
                                if (err) throw err
                                let dirID = result[0].dir_id
                                // console.log(id)

                                //insert
                                db.query(`insert into mov_director (mov_id, dir_id)
                   value ('${id}', '${dirID}')`, (err, result) => {
                                    if (err) throw err
                                    console.log('insert new dir done')
                                })
                            })
                        })

                    } else {
                        // db.query(`update mov_director set dir_id = '' where mov_id= '${id}'`)

                        db.query(`select * from dir_list where dir_name like '%${director}%'`, (err, result) => {
                            if (err) throw err
                            let dirID = result[0].dir_id

                            //update mov_director
                            db.query(`update mov_director set dir_id = '${dirID}' where mov_id = '${id}'`, (err, result) => {
                                if (err) throw err
                                console.log('update dir done')
                            })

                        })

                    }
                })

                //update actor



                res.send({ status: "Edit Berhasil" })

            })
        })
    })

},


    editGenre: () => {

    },
        deleteGenre: () => {

        },
            editDirector: () => { },
                deleteDirector: () => { },

                    editActor: (req, ) => {
                        arrActor = JSON.parse(actor.trim())
                        arrActor.map(list => {
                            db.query(`select * from cast_list where cast_name like'%${list}%'`, (err, result) => {
                                if (err) throw err
                                if (result.length <= 0) {
                                    db.query(`insert into cast_list (cast_name) value ('${list}')`, (err, result) => {
                                        if (err) throw err
                                        console.log('add actor done')
                                    })
                                } else {
                                    sql = `select * from cast_list where cast_name like '%${list}%'`
                                    db.query(sql, (err, result) => {
                                        if (err) throw err
                                        let idCast = result[0].id_cast
                                        console.log(idCast)

                                        // db.query(`update mov_cast set id_cast = '${idCast}' where mov_id = '${id}'`, (err, result) => {
                                        //   if (err) throw err
                                        //   console.log('update done')
                                        // })

                                    })
                                }
                            })
                        })
                    },

                        deleteActor: () => { },
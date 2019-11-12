const db = require('../database')

module.exports = {

   // tahun sama time di parse ke int

   upload: (req, res) => {
      let { title, year, time, country, genre, actor, description, director, vidlink, banner } = req.body
      let getTime = parseInt(time)
      let input = `insert into movies (mov_title, mov_year, mov_time, mov_country) 
        value ('${title}', '${parseInt(year)}', '${parseInt(getTime)}', '${country}')`

      const upload = new Promise((resolve, reject) => {
         db.query(input, (err, result) => {
            if (err) throw err
            //ambil id movie
            db.query(`select * from movies ORDER BY mov_id DESC LIMIT 1`, (err, result) => {
               resolve(result[0].mov_id)
            })
         })
      })
      upload
         .then(respone => {
            db.query(`insert into mov_description (mov_id, mov_desc)
                value ('${respone}', '${description.replace(/'/g, "\\'")}')`, (err, result) => {
               if (err) throw err
            })
            //link dan poster
            let location = `http://localhost:8000/${req.file.path}`
            db.query(`insert into mov_filestore (mov_id, mov_url, mov_poster, mov_banner)
                value('${respone}', '${vidlink}', '${location}', '${banner}')`, (err, result) => {
               if (err) throw err
            })

            //genre arr

            arr = JSON.parse(genre.trim())
            arr.map(list => {
               db.query(`insert into mov_genre (mov_id, genre)
                    value ('${respone}', '${list}')`, (err, result) => {
                  if (err) throw err
               })
            })



            //director
            // 1. cek dulu dilist ada yang sama gak ? kalo gak ada baru di push

            db.query(`select * from dir_list where dir_name like '%${director}%'`, (err, result) => {
               if (err) throw err
               if (result.length <= 0) {
                  //push 
                  db.query(`insert into dir_list (dir_name) value ('${director}')`, (err, result) => {
                     if (err) throw err
                  })
               } else {
                  res.send('sudah ada')

               }

               db.query(`select * from dir_list where dir_name like '%${director}%' order by dir_id desc limit 1`, (err, result) => {
                  if (err) throw err
                  let id = result[0].dir_id
                  console.log(id)

                  //push
                  db.query(`insert into mov_director (mov_id, dir_id)
                      value ('${respone}', '${id}')`, (err, result) => {
                     if (err) throw err
                     console.log('done')
                  })

               })
            })

            // //actor arr
            // 1. cek dulu dilist ada yang sama gak ? kalo gak ada baru di push
            // 2. select id cast yang sama dengan input list, trus di push

            arrActor = JSON.parse(actor.trim())
            arrActor.map(list => {
               db.query(`select * from cast_list where cast_name like '%${list}%'`, (err, result) => {
                  if (err) throw err
                  if (result.length <= 0) {
                     //push
                     db.query(`insert into cast_list (cast_name) value ('${list.replace(/'/g, "\\'")}')`, (err, result) => {
                        if (err) throw err
                     })
                  } else {
                     console.log('sudah ada')
                  }

                  //cek id & push
                  sql = `select * from cast_list where cast_name like '%${list}%' order by id_cast desc limit ${arrActor.length}`
                  db.query(sql, (err, result) => {
                     if (err) throw err
                     let id = result[0].id_cast
                     // console.log(id)

                     //push
                     db.query(`insert into mov_cast (mov_id, id_cast)
               value ('${respone}', '${id}')`, (err, result) => {
                        if (err) throw err
                        // res.send({ status: 'done' })
                     })
                  })
               })
            })

            res.send({ status: "Upload Selesai" })


         })
         .catch(err => {
            console.log(err)
         })
   },

   allmovies: (req, res) => {
      const sql = `
      select m.mov_id, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
      md.mov_desc, fs.mov_url, fs.mov_poster from movies as m 
      join mov_description as md on m.mov_id = md.mov_id
      join mov_filestore as fs on m.mov_id = fs.mov_id
      order by m.mov_id desc limit 18
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   MostViewed: (req, res) => {
      const sql = `
      select m.mov_id, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
      md.mov_desc, fs.mov_url, fs.mov_poster, mv.view from movies as m 
      join mov_description as md on m.mov_id = md.mov_id
      join mov_filestore as fs on m.mov_id = fs.mov_id
      join mov_views as mv on m.mov_id = mv.mov_id
      order by mv.view desc limit 18;
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   randomMoviesPreview: (req, res) => {
      const sql = `
      select m.mov_id, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
      md.mov_desc, fs.mov_url, fs.mov_poster, fs.mov_banner from movies as m 
      join mov_description as md on m.mov_id = md.mov_id
      join mov_filestore as fs on m.mov_id = fs.mov_id
      order by rand() desc limit 1;
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   getMoviesByID: (req, res) => {
      let idmov = req.params.id
      const sql = `
    select m.mov_id, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
    md.mov_desc, fs.mov_url, fs.mov_poster, fs.mov_banner from movies as m 
    join mov_description as md on m.mov_id = md.mov_id
    join mov_filestore as fs on m.mov_id = fs.mov_id
    where m.mov_id = '${idmov}'
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   getMoviesByGenre: (req, res) => {
      let genre = req.query.genre
      const sql = `
      select m.mov_id, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
      md.mov_desc, fs.mov_url, fs.mov_poster, fs.mov_banner from movies as m 
      join mov_description as md on m.mov_id = md.mov_id
      join mov_filestore as fs on m.mov_id = fs.mov_id
      join mov_genre as mg on m.mov_id = mg.mov_id
      where mg.genre like '%${genre}%'
      order by 1 desc;
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   getMoviesByDirector: (req, res) => {
      let director = req.query.dir
      const sql = `
      select m.mov_id, dl.dir_name, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
	fs.mov_url, fs.mov_poster, fs.mov_banner from dir_list as dl
	join mov_director as md on dl.dir_id = md.dir_id
	join movies as m on md.mov_id = m.mov_id
    join mov_filestore as fs on m.mov_id = fs.mov_id
    where dl.dir_id = '${director}';
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   getMoviesByActor: (req, res) => {
      let actor = req.query.actorid
      const sql = `
      select * from cast_list as cl
      join mov_cast as mc on cl.id_cast = mc.id_cast
      join movies as m on mc.mov_id = m.mov_id
      join mov_filestore as fs on m.mov_id = fs.mov_id
      where cl.id_cast = '${actor}';
    `
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else {
            res.send({ status: "Not Found" })
         }
      })
   },

   getAllCast: (req, res) => {
      let sql = `select cast_name from cast_list`
      db.query(sql, (err, result) => {
         if (err) throw err
         res.send(result)
      })
   },

   getCastbyID: (req, res) => {
      let idcast = req.params.id

      const qr = `select m.mov_id, cl.cast_name, cl.id_cast from cast_list as cl
      join mov_cast as mc on cl.id_cast = mc.id_cast
      join movies as m on mc.mov_id = m.mov_id
      where m.mov_id = '${idcast}';
      `

      db.query(qr, (err, result) => {
         if (err) throw err
         res.send(result)
      })

   },

   getAllDirector: (req, res) => {
      let sql = `select * from dir_list`
      db.query(sql, (err, result) => {
         if (err) throw err
         res.send(result)
      })
   },

   getDirectorbyID: (req, res) => {
      let iddir = req.params.id

      const dir = `
        select * from dir_list as dl
        join mov_director as md on dl.dir_id = md.dir_id
        join movies as m on md.mov_id = m.mov_id
        where m.mov_id = '${iddir}';
        `
      db.query(dir, (err, result) => {
         if (err) throw err
         res.send(result)
      })

   },

   getAllGenre: (req, res) => {
      db.query(`select distinct genre from mov_genre`, (err, result) => {
         if (err) throw err
         res.send(result)
      })
   },

   getGenreByID: (req, res) => {
      let id = req.params.id
      db.query(`select * from mov_genre where mov_id = '${id}'`, (err, result) => {
         if (err) throw err
         res.send(result)
      })
   },

   deleteMovie: (req, res) => {
      let id = req.params.id

      sql = `
         DELETE t1,t2,t3,t4,t5,t6 FROM movies as t1
         JOIN mov_description as t2 ON t2.mov_id = t1.mov_id
         JOIN mov_filestore as t3 ON t3.mov_id = t1.mov_id
         JOIN mov_director as t4 ON t4.mov_id = t1.mov_id
         JOIN mov_cast as t5 ON t5.mov_id = t1.mov_id
         JOIN mov_genre as t6 ON t6.mov_id = t1.mov_id
         WHERE t1.mov_id = '${id}'
         `

      db.query(sql, (err, result) => {
         if (err) throw err
         res.send({ status: "Delete Done" })
      })

   },

   recomendation: (req, res) => {
      let { recomendation, id } = req.body
      // console.log(recomendation)
      console.log(recomendation, id)

      db.query(`
         select distinct m.mov_id, m.mov_title, m.mov_year, m.mov_time, m.mov_country,
         md.mov_desc, fs.mov_url, fs.mov_poster, fs.mov_banner from movies as m 
         join mov_description as md on m.mov_id = md.mov_id
         join mov_filestore as fs on m.mov_id = fs.mov_id
         join mov_genre as mg on m.mov_id = mg.mov_id
         where mg.genre like '%${recomendation[0]}%' and not m.mov_id = ${id} or
         mg.genre like '%${recomendation[1]}%' and not m.mov_id = ${id} or
         mg.genre like '%${recomendation[2]}%' and not m.mov_id = ${id} or
         mg.genre like '%${recomendation[3]}%' and not m.mov_id = ${id}
         `, (err, result) => {
         if (err) throw err
         // console.log(result1)
         res.send(result)
         // let unique = [...new Set(data)];
         // x(data)

      })


   },

   search: (req, res) => {
      let keyword = req.query.keyword
      let sql = `select * from movies as m
      join mov_description as md on m.mov_id = md.mov_id
      join mov_filestore as mf on m.mov_id = mf.mov_id
      join mov_views as mv on m.mov_id = mv.mov_id
      where m.mov_title like '%${keyword}%' or md.mov_desc like '%${keyword}%'`
      db.query(sql, (err, result) => {
         if (err) throw err
         if (result.length > 0) {
            res.send(result)
         } else (
            res.send([])
         )
      })
   },



   addViews: (req, res) => {
      let { id, views } = req.body
      let sql1 = `select view from mov_views where mov_id = ${id}`
      db.query(sql1, (err, result) => {
         if (err) throw err
         if (result.length <= 0) {
            db.query(`insert into mov_views (mov_id, view) value ('${id}',1)`, (err, result) => {
               if (err) throw err
               res.send(result)
            })
         } else {
            db.query(`update mov_views set view = ${result[0].view + 1} where mov_id = ${id}`, (err, result) => {
               if (err) throw err
               res.send('done')
            })
         }
      })
   },

   getViews: (req, res) => {
      let id = req.params.id
      let sql = `select * from mov_views where mov_id=${id}`
      db.query(sql, (err, result) => {
         if (err) throw err
         res.send(result)
      })
   }

}

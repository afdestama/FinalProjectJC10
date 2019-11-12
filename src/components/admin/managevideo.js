import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import AdmHeader from '../../components/admin/admheader'

const ManageVideo = () => {

   const role = useSelector(state => state.auth.role)

   //state
   const [data, setData] = useState([])

   useEffect(() => {
      //get movie
      getData()
   }, [])

   const getData = () => {
      axios.get(
         'http://localhost:8000/mov/movies'
      ).then(res => {
         setData(res.data)
      })
   }

   const onDelete = (id) => {

      let y = window.confirm('Yakin hapus ?')

      if (y) {
         axios.delete(`http://localhost:8000/mov/delete/${id}`)
            .then(res => {
               getData()
            })
      }

      console.log(id)
   }

   let renderMovie = () => {
      let render = data.map(ls => {
         return (
            <div key={ls.mov_id} className="ml-3">
               <div className="card" style={{ width: "18rem" }} >
                  <img src={ls.mov_poster} className="card-img" alt="..." width='286' height='180' />
                  <div className="card-body">
                     <h5 className="card-title">{ls.mov_title}</h5>
                     <p className="card-text">{ls.mov_desc}</p>
                     <button onClick={() => onDelete(ls.mov_id)} className='btn btn-primary'>Delete</button>
                     <button className='btn btn-primary ml-2'>Edit</button>
                  </div>
               </div>
            </div>


         )
      })

      return render
   }


   if (role === 'admin') {
      return (
         <div>
            <AdmHeader />
            <div className="container-fluid" style={{ maxWidth: '1344px' }}>
               <div className='row mt-5 justify-content-center'>
                  {renderMovie()}
               </div>
            </div>
         </div>
      )
   }
}

export default ManageVideo
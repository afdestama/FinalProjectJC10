import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


import NavHeader from './Navbar'

const List = () => {

    let [list, setList] = useState([])
    const userID = useSelector(state => state.auth.id)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`http://localhost:8000/users/watchlist/${userID}`)
            .then(res => {
                setList(res.data)
            })
    }


    const deleteList = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/users/watchlist/remove/${id}`)
            .then(res => {
                getData()
            })

    }

    const MovieList = () => {

        return list.map(v => {
            return (
                <div>
                    <div className="poster">
                        <Link to={`/movie/${v.mov_id}`} target="_blank">
                            <img src={v.mov_poster} width="140" height="190" alt={v.mov_poster} />
                        </Link>
                        <input type='button' className="btn-info" style={{ borderRadius: '2px' }} value="Delete" onClick={() => deleteList(v.id)} />
                    </div>
                </div>
            )
        })
    }
    return (
        <div>
            <Helmet>
                <style>
                    {`
            body { 
                background-color: #141414; 
                color: white; 
            }
            .poster {
                margin-right:20px;
            }

            .poster:hover img{
                opacity:0.9;
                border-radius: 2px;
            }

            .poster input {
                display: none;
                width: 140px;
                border: none;
            }

            .poster:hover input {
                display: block;
                position: absolute;
                bottom: 0%;
            }
            `}
                </style>
            </Helmet>
            <NavHeader />
            <div className="container-fluid" style={{ maxWidth: '1344px', marginTop: 30 }}>
                <h3>My List</h3>
                {console.log(list)}
                <div className="row col-sm-12">
                    {MovieList()}
                </div>
            </div>

        </div>
    )
}

export default List
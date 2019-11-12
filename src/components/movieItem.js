import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import '../assets/movieitem.css'



const MovieItem = (props) => {
    let { mov_poster, mov_id } = props.movie
    const [view, setView] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/mov/views/${mov_id}`)
            .then(res => {

                setView(res.data)

            })
    }, [])

    return (
        <div>
            <Helmet>
                <style>
                    {`
            span {
                vertical-align: middle;
            }
            `}
                </style>
            </Helmet>
            <div className="poster">
                <Link to={`/movie/${mov_id}`}>
                    <img src={mov_poster} width="140" height="190" alt={mov_poster} />
                </Link>
                <span className="view text-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span className="text ml-1">{isNaN(view) ? view.map(get => get.view) : 0} views</span>
                </span>
            </div>
        </div>
    )
}


export default MovieItem
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Movieitem from './movieItem'
import NavHeader from './Navbar'



const Actor = (props) => {

    let [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`http://localhost:8000/mov/moviesbyactor/?actorid=${props.match.params.id}`)
            .then(res => {
                setData(res.data)
            })
    }

    const RenderActor = () => {
        return data.map(v => {
            return <Movieitem movie={v} key={v.mov_id} />
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
    `}
                </style>
            </Helmet>
            <NavHeader />
            <div className="container-fluid" style={{ maxWidth: '1344px', marginTop: 30 }}>
                <h3>{data.map(v => v.cast_name)}</h3>
                <div className="row col-sm-9">
                    {RenderActor()}

                </div>
            </div>
        </div>
    )
}

export default Actor

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';

import NavHeader from './Navbar'
import Movieitem from './movieItem'




const Director = (props) => {

    let [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`http://localhost:8000/mov/moviesbydirector?dir=${props.match.params.id}`)
            .then(res => {
                setData(res.data)
            })
    }

    const RenderDirector = () => {
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
                <h3>{data.map(v => v.dir_name)}</h3>
                <div className="row col-sm-9">
                    {RenderDirector()}

                </div>
            </div>
        </div>
    )
}

export default Director

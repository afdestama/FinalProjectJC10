import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import Select from 'react-select';

import NavHeader from './Navbar'
import Movieitem from './movieItem'


const options = [
    { value: 'Year Released', label: 'Year Released' },
    { value: 'A-Z', label: 'A-Z' },


];


const Genre = (props) => {

    let [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`http://localhost:8000/mov/moviesbygenre?genre=${props.match.params.id}`)
            .then(res => {
                setData(res.data)
            })
    }

    const filter = (e) => {
        if (e === 'year') {
            axios.get(`http://localhost:8000/mov/moviesbygenre?genre=${props.match.params.id}`)
                .then(res => {
                    setData(res.data.sort(function (a, b) { return b.mov_year - a.mov_year }))
                })
        } else if (e === 'asc') {
            axios.get(`http://localhost:8000/mov/moviesbygenre?genre=${props.match.params.id}`)
                .then(res => {
                    setData(res.data.sort(function (a, b) {
                        if (a.mov_title < b.mov_title) { return -1 }
                        if (a.mov_title > b.mov_title) { return 1 }
                    }))
                })
        } else if (e === 'desc') {
            axios.get(`http://localhost:8000/mov/moviesbygenre?genre=${props.match.params.id}`)
                .then(res => {
                    setData(res.data.sort(function (a, b) {
                        if (a.mov_title > b.mov_title) { return -1 }
                        if (a.mov_title < b.mov_title) { return 1 }
                    }))
                })
        } else {
            axios.get(`http://localhost:8000/mov/moviesbygenre?genre=${props.match.params.id}`)
                .then(res => {
                    setData(res.data)
                })
        }
    }


    const RenderGenre = () => {
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
                <div className="row ml-auto">
                    <h3>{props.match.params.id}</h3>
                    <p className="mt-2 ml-auto">Sort by <span>
                        <select onClick={e => filter(e.target.value)}>
                            <option value="year">Year Released</option>
                            <option value="asc">A-Z</option>
                            <option selected value="All">All</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </span></p>
                </div>

                <div className="row col-sm-12">
                    {RenderGenre()}

                </div>
            </div>
        </div>
    )
}

export default Genre

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';



import NavHeader from './Navbar'
import Movieitem from './movieItem'
import { useDispatch } from 'react-redux'
import { onSearch } from '../actions/index'






const searchResult = () => {

    function Result(props) { // Rule 2: call hooks in function component
        let result = useSelector(state => state.search.input)
        // const dispatch = useDispatch()
        const [state, setstate] = useState([])

        useEffect(() => {
            getData()

        }, [])

        const getData = () => {
            axios.get(`http://localhost:8000/mov/search?keyword=${result}`)
                .then(res => {
                    setstate(res.data)
                    console.log(state)
                })
        }

        const Filter = (e) => {
            if (e === 'year') {
                axios.get(`http://localhost:8000/mov/search?keyword=${result}`)
                    .then(res => {
                        setstate(res.data.sort(function (a, b) { return b.mov_year - a.mov_year }))
                    })

            } else if (e === 'asc') {
                axios.get(`http://localhost:8000/mov/search?keyword=${result}`)
                    .then(res => {
                        setstate(res.data.sort(function (a, b) {
                            if (a.mov_title < b.mov_title) { return -1 }
                            if (a.mov_title > b.mov_title) { return 1 }
                        }))
                    })

            } else if (e === 'desc') {
                axios.get(`http://localhost:8000/mov/search?keyword=${result}`)
                    .then(res => {
                        setstate(res.data.sort(function (a, b) {
                            if (a.mov_title > b.mov_title) { return -1 }
                            if (a.mov_title < b.mov_title) { return 1 }
                        }))
                    })
            } else {
                axios.get(`http://localhost:8000/mov/search?keyword=${result}`)
                    .then(res => {
                        setstate(res.data)
                    })
            }
        }

        const render = () => {
            return state.map(v => <Movieitem movie={v} />)
        }

        if (result) {

            return (
                <div>
                    <div className="row ml-auto">
                        <h3>Search Result </h3>
                        <p className="ml-auto">Sort by <span>
                            <select onClick={e => Filter(e.target.value)}>
                                <option value="year">Year Released</option>
                                <option value="asc">A-Z</option>
                                <option selected value="All">All</option>
                                <option value="desc">Z-A</option>
                            </select>
                        </span></p>
                    </div>

                    <div className="row col-sm-12 mt-3">
                        {render()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Not Found</h3>
                </div>
            )
        }
    }

    function render() {
        return <Result />
    }



    return (
        <div>
            <Helmet>
                <style>{`

                a {
                    color: #b3b3b3;
                }

                a:hover {
                    color: rgb(207, 218, 214);
                }
                button {
                    width: 140px;
                    margin-top: 5px;
                    border: 2px;
                }

                body { background-color: #000; 
                    color: #b3b3b3; }
                

                #arr {
                    font-size: 15px;
                    line-height:0.5;
}
                }
                `}</style>
            </Helmet>
            <NavHeader />
            <div className="container-fluid" style={{ maxWidth: '1344px', marginTop: 30 }}>


                {render()}

            </div>

        </div>
    )
}

export default searchResult

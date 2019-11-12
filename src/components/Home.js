import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import LandingPage from './LandingPage'
import NavHeader from './Navbar'
import ReactJWPlayer from 'react-jw-player'
import '../assets/jwplayer.css'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'


import Movieitem from './movieItem'
import '../assets/movieitem.css'
import Subscribe from './subscribe'



const Home = () => {

    const role = useSelector(state => state.auth.role)
    const id = useSelector(state => state.auth.id)

    const [newMovies, setNewMovies] = useState([])
    const [preview, setPreview] = useState([])
    const [drama, setDrama] = useState([])
    const [mostviewed, setMostViewed] = useState([])
    const [comedy, setComedy] = useState([])
    const [toggle, setToggle] = useState(false)
    const [arrow, setArrow] = useState(false)


    useEffect(() => {
        //get movie
        axios.get(
            'http://localhost:8000/mov/movies'
        ).then(res => {
            setNewMovies(res.data)
            axios.get('http://localhost:8000/mov/randommoviespreview/')
                .then(res => {
                    setPreview(res.data)
                    axios.get('http://localhost:8000/mov/moviesbygenre?genre=drama')
                        .then(res => {
                            setDrama(res.data)
                            axios.get('http://localhost:8000/mov/moviesbygenre?genre=comedy')
                                .then(res => {
                                    setComedy(res.data)
                                    axios.get('http://localhost:8000/mov/mostviewed')
                                        .then(res => {
                                            setMostViewed(res.data)
                                        })
                                })
                        })
                })
        })

    }, [])

    const ArrowRight = () => {
        document.querySelector('#right-button').addEventListener("click", function (event) {
            const conent = document.querySelector('.itemContainer');
            // conent.scrollLeft += 50;
            sideScroll(conent, 'right', 25, 100, 10);
            event.preventDefault();
        })
        setArrow(true)
    }

    const ArrowLeft = () => {

        document.querySelector('#left-button').addEventListener("click", function (event) {
            const conent = document.querySelector('.itemContainer');
            // conent.scrollLeft -= 100;
            sideScroll(conent, 'left', 25, 100, 10);
            event.preventDefault();
        })

    }

    function sideScroll(element, direction, speed, distance, step) {
        let scrollAmount = 0;
        var slideTimer = setInterval(function () {
            if (direction === 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }
        }, speed);
    }


    const NewMovie = () => {
        return newMovies.map(v => {
            return (
                <Movieitem movie={v} key={v.mov_id} />
            )
        })
    }

    const byDrama = () => {
        return drama.map(v => {
            return <Movieitem movie={v} key={v.mov_id} />
        })

    }

    const byComedy = () => {
        return comedy.map(v => {
            return <Movieitem movie={v} key={v.mov_id} />
        })

    }

    const byMostViewed = () => {
        return mostviewed.map(v => {
            return <Movieitem movie={v} key={v.mov_id} />
        })

    }

    const addList = () => {
        axios.post('http://localhost:8000/users/watchlist/add', {
            users_id: id,
            mov_id: preview.map(list => list.mov_id)
        }).then(res => {
            setToggle(true)
        })
    }


    if (role === "premium" || role === 'admin') {
        return (
            <div>
                <NavHeader />
                <div>
                    <div className="jumbotron" style={{ backgroundColor: "#141414", color: 'white' }}>

                        <div style={{ marginTop: "90px", marginLeft: 31 }}>
                            <h1 className="display-4">{preview.map(list => list.mov_title)}</h1>
                            <p style={{ maxWidth: 600, fontSize: "20px" }}>{preview.map(list => list.mov_desc)}</p>
                            <Link to={`movie/${preview.map(list => list.mov_id)}`}>
                                <button className="btn btn-dark btn-md">Watch Now</button>
                            </Link>
                            {toggle ? <button className="ml-2 btn btn-dark btn-md" disabled>Add to List Done</button> : <button onClick={addList} className="ml-2 btn btn-dark btn-md">+ My List</button>}

                        </div>
                        <div style={{ marginTop: "45px", marginLeft: 31 }}>
                            <div>
                                <h5 className="mt-3 mb-3" style={{ color: 'white' }}>New Movies</h5>
                            </div>
                            <div className="itemContainer">
                                {arrow ? <div id="left-button" class="arrowleft" onClick={ArrowLeft}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </div> : null}
                                {NewMovie()}
                                <div id="right-button" class="arrowright" onClick={ArrowRight}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



                <div className="container-fluid" style={{ maxWidth: '1344px' }}>
                    <div style={{ marginTop: 650 }}>

                        <div>

                            <h5 className="mt-3 mb-3" style={{ color: '#e5e5e5' }}>Most Viewed</h5>
                        </div>
                        <div className="itemContainer">
                            {arrow ? <div id="left-button" class="arrowleft" onClick={ArrowLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </div> : null}
                            {byMostViewed()}
                            <div id="right-button" class="arrowright" onClick={ArrowRight}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>

                        <div>
                            <Link to="/browse/genre/Drama">
                                <h5 className="mt-3 mb-3" style={{ color: '#e5e5e5' }}>Drama</h5>
                            </Link>
                        </div>
                        <div className="itemContainer">
                            {arrow ? <div id="left-button" class="arrowleft" onClick={ArrowLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </div> : null}
                            {byDrama()}
                            <div id="right-button" class="arrowright" onClick={ArrowRight}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>


                        <div style={{ marginTop: 20 }}>
                            <div>
                                <Link to="/browse/genre/Comedy"><h5 className="mt-3 mb-3" style={{ color: '#e5e5e5' }}>Comedy</h5></Link>

                            </div>
                            <div className="itemContainer">
                                {arrow ? <div id="left-button" class="arrowleft" onClick={ArrowLeft}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </div> : null}
                                {byComedy()}
                                <div id="right-button" class="arrowright" onClick={ArrowRight}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                            </div>
                        </div>




                    </div>
                    <hr />
                    <hr />
                </div>
                <Helmet>
                    <style>{
                        `
                    body { 
                        background-color: #141414; 
                        color: white; 
                    }

                    .jumbotron {
                        height: 690px;
                        background: radial-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7)),url(${preview.map(list => list.mov_banner).toString()});
                        -webkit-background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        -o-background-size: 100% 100%;
                        background-size: 100% 100%;
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: fixed;
                        content: "";
                        left: 0px;
                        position: absolute;
                        right: 0px;
                        top: 0px;
                    }
                    
    
                    

                
                `}</style>
                </Helmet>
            </div>
        )
    } else if (role === "user") {
        return (
            <div>
                <NavHeader />
                <Subscribe />
            </div>
        )
    } else {
        return (
            <div>
                <LandingPage />
            </div>
        )
    }
}

export default Home

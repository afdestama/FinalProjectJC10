import React, { useState, useEffect } from 'react'
import ReactJWPlayer from 'react-jw-player'
import '../assets/jwplayer.css'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



import NavHeader from './Navbar'
import Movieitem from './movieItem'


const MovieDetail = (props) => {

    const [movie, setMovie] = useState([])
    const [genre, setGenre] = useState([])
    const [dir, setDir] = useState([])
    const [actor, setActor] = useState([])
    const [recomendation, setRecomendation] = useState([])
    const [wlstatus, setWlStatus] = useState([])
    const [toggle, setToggle] = useState(false)
    const userID = useSelector(state => state.auth.id)
    const [view, setView] = useState([])




    useEffect(() => {
        axios.get(`http://localhost:8000/mov/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
                axios.get(`http://localhost:8000/mov/director/${props.match.params.id}`)
                    .then(res => {
                        setDir(res.data)
                        axios.get(`http://localhost:8000/mov/genre/${props.match.params.id}`)
                            .then(res => {
                                // setGenre(res.data)
                                setGenre(res.data.map(list => list.genre))
                                axios.post('http://localhost:8000/mov/recomendation', {
                                    recomendation: res.data.map(list => list.genre),
                                    id: props.match.params.id
                                }).then(res =>
                                    setRecomendation(res.data)
                                )
                                axios.get(`http://localhost:8000/mov/cast/${props.match.params.id}`)
                                    .then(res => {
                                        setActor(res.data)
                                        axios.get(`http://localhost:8000/mov/views/${props.match.params.id}`)
                                            .then(res => {
                                                setView(res.data)
                                            })
                                    })
                            })
                    })
            })

    }, [])

    function genreRender() {
        return genre.map((list) => {
            return (
                <div>
                    <Link to={`/browse/genre/${list}`}><span style={{ paddingRight: '5px' }}>{list}</span></Link>
                </div>
            )
        })

    }



    function actorRender() {
        return actor.map(list => {
            return (
                <div>
                    <Link to={`/browse/cast/${list.id_cast}`}><span style={{ paddingRight: '5px' }}>{list.cast_name}</span></Link>
                </div>
            )
        })
    }

    function dirRender() {

        return dir.map(list => {
            return (
                <div>
                    <Link to={`/browse/director/${list.dir_id}`}><span style={{ paddingRight: '5px' }}>{list.dir_name}</span></Link>
                </div>
            )
        })
    }

    const addList = (id) => {

        axios.post('http://localhost:8000/users/watchlist/add', {
            users_id: userID,
            mov_id: id
        }).then(res => {
            setToggle(true)
        })

    }

    const recomendationRender = () => {
        return recomendation.map(v => {
            return (
                <div>
                    <div className="poster mr-3">
                        <Link to={`/movie/${v.mov_id}`} target="_blank">
                            <img src={v.mov_poster} width="140" height="190" alt={v.mov_poster} />
                        </Link>
                    </div>
                </div>
            )

        })

    }

    const onPlay = (event) => {
        // console.log(event.viewable)
        axios.post('http://localhost:8000/mov/views/add', {
            id: props.match.params.id,
            views: event.viewable
        })
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

                div.poster {
                    margin-right:20px;
                }

                div.poster:hover img{
                    opacity:0.9;
                    border-radius: 2px;
                    box-shadow:3px 3px #ED690A;
                }

                .icon, .text {
                vertical-align: middle;
                display: inline-block;
                line-height:15px;
                }
                `}</style>
            </Helmet>
            <NavHeader />
            <div>
                <ReactJWPlayer
                    playerId='niceflix-video'
                    playerScript='https://cdn.jwplayer.com/libraries/58ZfZztq.js'
                    file={movie.map(list => list.mov_url).toString()}
                    image={movie.map(list => list.mov_banner).toString()}
                    onPlay={onPlay}
                />
            </div>

            <div className="container">
                <hr style={{ backgroundColor: '#333333' }} />
                <p>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </span>
                    <span className="text ml-2">{view.map(get => get.view)} viewers</span>
                </p>
                <div>
                    <h1 style={{ color: '#E1E1E1' }}>{movie.map(list => list.mov_title)} ({movie.map(list => list.mov_year)})</h1>

                    <p className="row" style={{ marginLeft: 1 }}>{movie.map(list => list.mov_time)}min | <span className="row ml-2">{genreRender()} | </span> <span className="ml-4">{movie.map(list => list.mov_country)}</span></p>

                    <p className="row" style={{ marginLeft: 1 }}>{movie.map(list => list.mov_desc)}</p>
                    <div id="arr" className="mt-4" >
                        <p className="row fontp" style={{ marginLeft: 1 }}>Director: <span className="row ml-2">{dirRender()}</span> </p>
                        <p className="row fontp" style={{ marginLeft: 1 }}>Cast: <span className="row ml-2">{actorRender()}</span> </p>
                    </div>
                </div>

                {toggle ? <button className="btn btn-dark btn-md" disabled>Add to List Done</button> : <button onClick={() => addList(movie.map(list => list.mov_id))} className="btn btn-dark btn-md">+ My List</button>}
                <hr style={{ backgroundColor: '#333333' }} />

                <div>
                    <div>
                        <h5 className="mb-3">More Like This</h5>
                    </div>
                    <div className="row col-sm-12">
                        {recomendationRender()}
                    </div>
                    <hr />
                    <hr />
                </div>

            </div>
        </div>
    )
}

export default MovieDetail
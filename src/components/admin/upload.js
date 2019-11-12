import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import { Redirect } from 'react-router-dom'



import AdmHeader from '../../components/admin/admheader'

const actorOption = []

axios.get('http://localhost:8000/mov/cast')
    .then(res => {
        let name = res.data

        name.map((v) => {
            actorOption.push({ value: v.cast_name, label: v.cast_name })
        })
    })

const dirOption = []

axios.get('http://localhost:8000/mov/director')
    .then(res => {
        let name = res.data

        name.map((v) => {
            dirOption.push({ value: v.dir_name, label: v.dir_name })
        })
    })


const options = [
    { value: 'Action', label: 'Action' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Documenter', label: 'Documenter' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Family', label: 'Family' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'History', label: 'History' },
    { value: 'Music', label: 'Music' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Sci Fiction', label: 'Sci Fiction' },
    { value: 'Sport', label: 'Sport' },
    { value: 'Thriller', label: 'Thriller' },

];


const Upload = () => {



    const [data, setData] = useState({
        title: "",
        year: "",
        time: "",
        country: "",
        description: "",
        director: '',
        vidlink: '',
        poster: '',
        banner: ''
    })

    const [actor, setActor] = useState([])
    const [genre, setGenre] = useState([])

    const role = useSelector(state => state.auth.role)



    const actorHandleChange = (newValue, actionMeta) => {
        if (newValue !== null) {
            setActor(newValue.map(val => val.value))
        }
        if (actionMeta.action === 'remove-value') {
            setActor([])
        }


    }

    const genreHandleChange = (e) => {
        setGenre(e.map(val => val.value))
    }



    let onSubmitMovie = (e) => {
        e.preventDefault()
        var fd = new FormData()
        fd.append('poster', data.poster, data.poster.name)
        fd.append('title', data.title)
        fd.append('year', data.year.toString())
        fd.append('time', data.time.toString())
        fd.append('country', data.country)
        fd.append('genre', JSON.stringify(genre))
        fd.append('description', data.description)
        fd.append('actor', JSON.stringify(actor))
        fd.append('director', data.director)
        fd.append('vidlink', data.vidlink)
        fd.append('banner', data.banner)

        axios.post('http://localhost:8000/mov/upload', fd)
            .then(res => {
                console.log(res.data.status)
                alert(res.data.status);
            })
            .catch(err => {
                console.log(err)
            })
        // let gotest = JSON.parse(fd.get('genre'))
        // gotest.map(val => console.log(val.value))

        for (var pair of fd.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

    }

    if (role === 'admin') {
        return (
            <div>
                <AdmHeader />
                <div className="container">
                    <div className="col-md-10 ml-5 mt-4">
                        <form onSubmit={onSubmitMovie}>
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input type="text" placeholder='Title' className="form-control" onChange={e => setData({ ...data, title: e.target.value })} required autoFocus />

                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Genre</label>
                                <div className="col-sm-10">
                                    <Select
                                        options={options}
                                        isMulti
                                        onChange={genreHandleChange}
                                        required autoFocus

                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea type="text" placeholder='Description' className="form-control" onChange={e => setData({ ...data, description: e.target.value })} spellCheck="true" required autoFocus />

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Actor</label>
                                <div className="col-sm-10">
                                    <CreatableSelect
                                        isMulti
                                        onChange={actorHandleChange}
                                        placeholder='Actor'
                                        options={actorOption}
                                        required autoFocus
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Director</label>
                                <div className="col-sm-10">
                                    <input type="select" placeholder='Director' className="form-control" onChange={e => setData({ ...data, director: e.target.value })} required autoFocus />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Year</label>
                                <div className="col-sm-10">
                                    <input type="number" id="inputEmail3" placeholder='Year' className="form-control" onChange={e => setData({ ...data, year: e.target.value })} required autoFocus />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Time</label>
                                <div className="col-sm-10">
                                    <input type="number" placeholder='Time in minutes' className="form-control" onChange={e => setData({ ...data, time: e.target.value })} required autoFocus />

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Country</label>
                                <div className="col-sm-10">
                                    <input type="text" placeholder='Country' className="form-control" onChange={e => setData({ ...data, country: e.target.value })} required autoFocus />

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Movie Link</label>
                                <div className="col-sm-10">
                                    <input type="text" placeholder='vidLink m3u8 file' className="form-control" onChange={e => setData({ ...data, vidlink: e.target.value })} required autoFocus />

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Banner Link</label>
                                <div className="col-sm-10">
                                    <input type="text" placeholder='Banner Url' className="form-control" onChange={e => setData({ ...data, banner: e.target.value })} required autoFocus />

                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Upload Poster</label>
                                <div className="col-sm-10">
                                    <input type="file" placeholder='Upload poster' className="form-control" onChange={e => setData({ ...data, poster: e.target.files[0] })} required autoFocus />


                                </div>
                            </div>



                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn " style={{ backgroundColor: '#ED690A', color: 'white' }}>Submit Movie</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    } else {
        return <Redirect to='/' />
    }
}

export default Upload









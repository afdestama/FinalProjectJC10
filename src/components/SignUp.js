import React, { useState } from 'react'
import logo from '../assets/nicebaru.svg'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { NavLink, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


import '../assets/style.css'

import axios from 'axios'

const urlApi = 'http://localhost:8000/'

const SignUp = () => {

    const name = useSelector(state => state.auth.name)
    const role = useSelector(state => state.auth.role)

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [alertMsg, setAlertMsg] = useState('')
    const [onCheck, setOnCheck] = useState(false)

    const onBtnSignup = (e) => {
        e.preventDefault()

        // console.log(data.email, data.name, data.password)
        setOnCheck(true)

        let users = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        axios.post(urlApi + `auth/register`, users)
            .then(res => {
                if (res.data.status === '201') {
                    setAlertMsg(res.data.message)
                } else if (res.data.status === '400') {
                    setAlertMsg(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
        e.target.reset()
    }

    const onAlertMessage = () => {
        if (onCheck) {
            return (
                <div className="alert alert-warning">
                    {alertMsg}
                </div>

            )
        }
    }

    if (name || role === 'users' || role === "premium") {
        return <Redirect to='/' />
    } else {
        return (
            <SingUpComponent>


                <nav className="border-bottom p-4 bg-2">
                    <div className="ml-3" style={{ zIndex: 1 }}>
                        <Link to='/'>
                            <img src={logo} alt="" />
                        </Link>

                        <div className="float-right ">
                            <Link to="/login">
                                <h5 className="text-dark mt-2 mr-2">Sign In</h5>
                            </Link>
                        </div>
                    </div>

                </nav>

                <div className="container">
                    <form className="mx-auto form-signin mt-5" onSubmit={onBtnSignup}>
                        <div className="mb-4">

                            <h4>Create your account.</h4>
                            <hr />
                        </div>

                        <div className="form-label-group">
                            <input onChange={(e) => { setData({ ...data, name: e.target.value }) }}
                                type="text" name="name" id="name_id" className="form-control" placeholder="Name" required autoFocus />
                            <label htmlFor="name_id">Name</label>
                        </div>


                        <div className="form-label-group">
                            <input onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                // onInvalid={e => { e.target.setCustomValidity("Please Enter valid Email") }}
                                type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                            <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                            <label htmlFor="inputPassword">Password</label>
                        </div>

                        <button className="btn btn-lg" style={{
                            color: "whitesmoke",
                            backgroundColor: "#ED690A",
                            display: "block",
                            width: "100%",
                            borderRadius: 2,
                        }}>Sign Up</button>
                        <hr />
                        <div id="alert">
                            {onAlertMessage()}
                        </div>
                    </form>
                </div>


            </SingUpComponent>
        )

    }

}

const SingUpComponent = styled.div`

.abs-r  {
    position: absolute;
    right: 0;
    z-index: 1;
    color: black;

`

export default SignUp

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'



import logo from '../assets/nicebaru.svg'
import '../assets/login.css'

import { onLoginUser } from '../actions/index'



const Login = () => {

    //mengambil data dari redux hooks / useselector
    const name = useSelector(state => state.auth.name)
    const admin = useSelector(state => state.auth.role)

    //mengirim data ke redux 
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const onLoginBtn = (e) => {
        e.preventDefault()
        // console.log(data.email, data.password)
        dispatch(onLoginUser(data.email, data.password))
        e.target.reset()

    }

    if (!name) {
        return (

            <div className="loginheader">
                <Helmet>
                    <style>{'body { background-color: black}'}</style>
                </Helmet>

                <nav className="p-4 bg-2">
                    <div className="ml-3" style={{ zIndex: 2, position: "absolute" }}>
                        <Link to='/'>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                </nav>

                <div className="container-login">
                    <form className="mx-auto form-signin mt-5" onSubmit={onLoginBtn}>
                        <div className="mb-4 mt-4">

                            <h4>Sign In</h4>
                            <hr />
                        </div>


                        <div className="form-label-group">
                            <input onChange={(e) => { setData({ ...data, email: e.target.value }) }}
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
                            marginTop: '30px'

                        }}>Sign In</button>
                        <div style={{ marginTop: '150px' }}>
                            <p><span style={{ color: "#737373" }}>New to Niceflix ? </span>
                                <span><Link to="/signup" className="text-white">Sign up now.</Link></span>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        )
    } else if (admin === 'admin') {
        return <Redirect to='/admin' />

    } else {
        return <Redirect to='/' />
    }
}



export default Login 
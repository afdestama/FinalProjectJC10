import React from 'react'
import logo from '../../assets/nicebaruputih.svg'

import { onLogOut } from '../../actions/index'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'




const AdmHeader = () => {

    const dispatch = useDispatch()

    const onLogoutBtn = (e) => {
        e.preventDefault()
        dispatch(onLogOut())
    }
    return (
        <div>
            <nav className="navbar navbar-light" style={{ zIndex: 1, backgroundColor: "#ED690A" }}>
                <span className="navbar-brand" href="#">
                    <img src={logo} alt="" />
                </span>
                <span className="nav-item" style={{ fontSize: "17px" }}>
                    <NavLink to='/costumers' style={{ color: 'white', textDecoration: "none" }}>
                        <svg style={{ marginRight: '10px', marginBottom: "4px" }} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>


                        Costumers
                        </NavLink>
                </span>

                <span className="nav-item" style={{ fontSize: "17px" }}>
                    <NavLink to='/upload' style={{ color: 'white', textDecoration: "none" }}>
                        <svg style={{ marginRight: '10px', marginBottom: "4px" }} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        Upload Video
                    </NavLink>
                </span>

                <span className="nav-item" style={{ fontSize: "17px" }}>
                    <NavLink to='/manage' style={{ color: 'white', textDecoration: "none" }}>
                        <svg style={{ marginRight: '10px', marginBottom: "4px" }} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Manage Video
                            </NavLink>
                </span>


                <div className="float-right ">
                    <button className="btn mr-2" onClick={onLogoutBtn} style={{ backgroundColor: 'white', color: '#ED690A', }}>Sign Out</button>
                </div>
            </nav>
        </div>
    )
}

export default AdmHeader


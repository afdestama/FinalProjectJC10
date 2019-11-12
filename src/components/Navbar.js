import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import logo from '../assets/nicebaru1.svg'
import icon from '../assets/search.svg'

import { Link, Redirect, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux'

import { onLogOut, onSearch } from '../actions/index'
import { useDispatch } from 'react-redux'
import Axios from 'axios';

import searchResult from './searchresult'





const NavHeader = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('')


    const toggle = () => setIsOpen(!isOpen);
    const name = useSelector(state => state.auth.name)
    const result = useSelector(state => state.search.result)

    useEffect(() => {
        var nav = document.querySelector('nav'); // Identify target

        window.addEventListener('scroll', function (event) { // To listen for event
            event.preventDefault();

            if (window.scrollY <= 50) { // Just an example
                nav.style.backgroundColor = 'rgba(0,0,0,0.0)'; // or default color
            } else {
                nav.style.backgroundColor = 'rgba(0,0,0,5)';
            }
        });
    }, [])


    const dispatch = useDispatch()

    const onLogoutBtn = (e) => {
        e.preventDefault()
        dispatch(onLogOut())
    }

    const onSearchInput = (e) => {
        e.preventDefault()
        // Axios.get(`http://localhost:8000/mov/search?keyword=${search}`)
        //     .then(res => {
        //         dispatch(onSearch(res.data, search))
        //         // console.log(res.data)
        //     })

        dispatch(onSearch(search))

        props.history.push('/search')
        // return <Redirect to={'/search'} />
    }


    return (
        <div className="sticky-top">
            <Helmet>
                <style>{`
                .nav-link {
                    color: #b3b3b3 !important;
                }

                .nav-link:hover {
                  color: rgb(207, 218, 214) !important;
                }
                
                .dropdown-menu {
                    color: #b3b3b3 !important;
                    background-color: rgb(20, 20, 20) !important;

                }


                .dropdown-item {
                    display: block;
                    width: 100%;
                    padding: .25rem 1.5rem;
                    clear: both;
                    font-weight: 400;
                    color: #fff; 
                    text-align: inherit;
                    white-space: nowrap;
                    background-color: transparent;
                    border: 0;
                }

                
            

                `}</style>
            </Helmet>
            <Navbar expand="md">
                <Link to="/">
                    <img className="mt-1 ml-4" src={logo} alt="niceflix" />
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto mt-1" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/browse/my-list">My List</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="mr-4" navbar>
                        <form className="form-inline mt-2 mt-md-0" onSubmit={onSearchInput}>
                            <input className="mr-sm-2" onChange={e => setSearch(e.target.value)} type="text" style={{ backgroundColor: "transparent", color: "#b3b3b3", border: '1px solid', borderRadius: '3px' }} placeholder=" Search Movie" aria-label="Search" />
                            <span onClick={onSearchInput}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search text-white"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </span>
                        </form>

                        {/*
                        (result.length > 1 &&
                            <Redirect to={{
                                pathname: '/search'
                            }} />) || alert('Not Found')    
                        */
                        }


                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, {name}
                            </DropdownToggle>
                            <DropdownMenu right={true}>
                                <DropdownItem onClick={onLogoutBtn} >
                                    Sign out of Niceflix
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default withRouter(NavHeader)

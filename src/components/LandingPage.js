import React, { Component } from 'react';
import logo from '../assets/nicebaru.svg'
import { NavLink, Link } from 'react-router-dom'


import '../assets/style.css'

import styled from 'styled-components'
import { Helmet } from 'react-helmet';



class LandingPage extends Component {


    render() {
        return (


            <HeaderComponent className="header-container">
                <Helmet>
                    <style>{'body { background-color: black; color: white; }'}</style>
                </Helmet>

                <nav>
                    <div className="abs" style={{ zIndex: 1 }}>
                        <Link to="/">
                            <img style={{ marginTop: "30px" }} src={logo} alt="" />
                        </Link>
                    </div>

                    <div className="abs-r">
                        <NavLink to="/login">
                            <button className="btn">Login</button>
                        </NavLink>
                    </div>
                </nav>


                <div className="center-con" style={{ zIndex: 1 }}>
                    <h1 className="p1">See what's next.</h1>
                    <p className="p2">WATCH ANYWARE. CANCEL ANYTIME</p>
                    <NavLink to='/signup'>
                        <button className="ctm-btn text-center">JOIN NOW</button>
                    </NavLink>
                </div>
            </HeaderComponent>




        )
    }
}

const HeaderComponent = styled.div`


    // Extra small devices (portrait phones, less than 576px)
    @media (max-width: 575.98px) { 
        .abs
        {
            position: absolute;
            width: 100%;
            left: 0;
            text-align: left;
            margin-left: 20px;
            z-index: 2;
        }

    .abs-r  {
        position: absolute;
            right: 0;
            width: 100px;
            height: 40px;
            top: 32px;
            z-index: 1;
    }
        .btn {
            
        
            background: #ED690A;
            border-radius: 2px;
        
            color: #FFF
            font-size: 18px;
            font-family: 'Lato', sans-serif;
        
        
          }
    }
    
    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) and (max-width: 767.98px) { 
        .abs
        {
            position: absolute;
            width: 100%;
            left: 0;
            text-align: center;
            z-index: 2;
        }

    .abs-r  {
        position: absolute;
            right: 0;
            width: 100px;
            height: 40px;
            top: 32px;
            z-index: 1;
    }
        .btn {
            
        
            background: #ED690A;
            border-radius: 2px;
        
            color: #FFF
            font-size: 18px;
            font-family: 'Lato', sans-serif;
        
        
          }
     }
    
    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) and (max-width: 991.98px) { 
        .abs
        {
            position: absolute;
            width: 100%;
            left: 0;
            text-align: center;
            z-index: 2;
        }

    .abs-r  {
        position: absolute;
            right: 0;
            width: 100px;
            height: 40px;
            top: 32px;
            z-index: 1;
    }
        .btn {
            
        
            background: #ED690A;
            border-radius: 2px;
        
            color: #FFF
            font-size: 18px;
            font-family: 'Lato', sans-serif;
        
        
          }
    }
    
    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) and (max-width: 1199.98px) { 
        .abs
        {
            position: absolute;
            width: 100%;
            left: 0;
            text-align: center;
            z-index: 2;
        }

    .abs-r  {
        position: absolute;
            right: 0;
            width: 100px;
            height: 40px;
            top: 32px;
            z-index: 1;
    }
        .btn {
            
        
            background: #ED690A;
            border-radius: 2px;
        
            color: #FFF
            font-size: 18px;
            font-family: 'Lato', sans-serif;
        
        
          }
    }
    
    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) { 
        .abs
        {
            position: absolute;
            width: 100%;
            left: 0;
            text-align: center;
            z-index: 2;
        }

    .abs-r  {
        position: absolute;
            right: 0;
            width: 100px;
            height: 40px;
            top: 32px;
            z-index: 1;
    }
        .btn {
            
        
            background: #ED690A;
            border-radius: 2px;
        
            color: #FFF
            font-size: 18px;
            font-family: 'Lato', sans-serif;
        
        
          }
    }

  
  
  

  .p1 {
    
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 77px;
    z-index: 1;


  }

  .center-con {
      position: absolute;
      display: inline-block;
      top: 303px;
      width: 100%;
      left: 0;
      text-align: center;
    
  }

  .p2 {
    
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: normal;

    font-size: 23px;
    line-height: 28px;
    z-index: 1;



  }
  
  .ctm-btn {
 
    width: 271px;
    height: 60px;

    color: #FFFFFF
    background-color: #ED690A;
    border-color: #ED690A;
    font-size: 24px;
    font-family: 'Lato', sans-serif;
    border-radius: 2px;
    border: none;

  }
`;


export default LandingPage

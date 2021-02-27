import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";

import './styles.css'

const Navigation = (props, context) => (

    <div className = "Navbar">

        <div 
            className = "left_nav"
            id = "Over_size"
            >
            <div id ="feed_banner">
            <center>
            <a><Link to = "/Profile/pk">
                <div className="imgUser"></div>
            </Link></a>
                <br/>

            <h1><b>Hello!</b></h1>
            <h5><b>{props.profile_data?.name}</b></h5>

            </center>
        </div>    
        </div>

        <div className = "center_nav">
            <h1 id = "Over_size-small"
            ><a href="/">ARCHIVE </a></h1>

            <div className = "nav_btns">

                <button className = "button">
                    <div className = "Search_btn"></div>
                </button> 

                <input 
                    type="text" 
                    placeholder="Please enter your search" 
                    className="search_form"
                    id = "Over_size" />

                <div className = "button">
                    <div className = "dropdown">
                        <div className = "View_more_btn"></div>
                            <div className = "dropdown-content">
                                <a> <Link to = "/groupHome">group</Link></a>
                                <a onClick={props.logout}>Logout</a>
                        </div>
                    </div>
                </div>
                    
                <Link to = "/Profile/pk" className = "imgUser"></Link>
                <Link to className = "button">
                    <div className = "Help_btn"></div>
                </Link>
                    &nbsp;
                    
                <Link to className = "button">
                    <div className = "Settings_btn"></div>
                </Link>
                    &nbsp;
            </div>
        </div>

    </div>

);

Navigation.propTypes = {
	logout 	: PropTypes.func.isRequired,
};

export default Navigation;
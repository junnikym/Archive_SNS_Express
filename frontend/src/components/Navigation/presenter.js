import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";

import './styles.css'

const Navigation = (props, context) => (

    <div className = "Navbar">

                <h1><a href="/">ARCHIVE </a></h1>


        <input type="text" placeholder="Please enter your search" className="mr-sm-2" />
        <button className = "button">
                <div className = "Search_btn"></div>
            </button> 



        <div className = "nav_btns">
                
            <Link to = "/Profile/pk" className = "imgUser"></Link>
            {props.info?.name}
                &nbsp;

            <Link to className = "button">
                <div className = "Help_btn"></div>
            </Link>
                &nbsp;
                
            <Link to className = "button">
                <div className = "Settings_btn"></div>
            </Link>
                &nbsp;

        <div className = "button">
            <div className = "dropdown">
                <div className = "View_more_btn"></div>
                    <div className = "dropdown-content">
                        <a> <Link to = "/groupHome">group</Link></a>
                        <a onClick={props.logout}>Logout</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

);

Navigation.propTypes = {
	logout 	: PropTypes.func.isRequired,
};

export default Navigation;
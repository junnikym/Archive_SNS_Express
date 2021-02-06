import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";

import { 
    Navbar, 
    Nav, 
    Form, 
    FormControl, 
    DropdownButton, 
    Dropdown, 
    ButtonGroup,
} from 'react-bootstrap';

const Navigation = (props, context) => (

    <div className = "Navbar">
        <Navbar bg="white" variant="light" className = "shadowbox">
            <Navbar.Brand href="/">ARCHIVE</Navbar.Brand>
            <Nav className="mr-auto">
        </Nav>

        <Form inline element id = "Over_size-small">

        <button className = "button">
                <div className = "Search_btn"></div>
            </button> &nbsp;
            <FormControl 
            
            type="text" placeholder="Please enter your search" className="mr-sm-2" />
        </Form>
                
            <Link to = "/Profile/pk" className = "imgUser"></Link>
            {props.info?.name}
                &nbsp;

            <button className = "button">
                <div className = "Help_btn"></div>
            </button>
                &nbsp;
                
            <Link to className = "button">
                <div className = "Settings_btn"></div>
            </Link>
                &nbsp;

            <div className = "dropdown">
                <button className = "button">
                <div className = "View_more_btn"></div>
            </button>
                <div className = "dropdown-content">
                    <a>시발</a>
                    <a>시발</a>
                    <hr/>
                    <a onClick={props.logout}>로그아웃</a>
                </div>
                </div>
            
            

            
            {/* onClick={props.logout}>Logout */}
    
        

        </Navbar>
			
    </div>

);

Navigation.propTypes = {
	logout 	: PropTypes.func.isRequired,
};

export default Navigation;
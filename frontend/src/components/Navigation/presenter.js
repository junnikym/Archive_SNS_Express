import React from "react";
import PropTypes from "prop-types";

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
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">ARCHIVE</Navbar.Brand>
            <Nav className="mr-auto">
        </Nav>

        <Form inline>
            <FormControl 
            element id = "Over_size-small"
            type="text" placeholder="Please enter your search" className="mr-sm-2" />
        </Form>
   
            <span>
                {props.info?.name}
            </span>

            <DropdownButton 
            as={ButtonGroup}  
            id="bg-vertical-dropdown-1"
            >
            <Dropdown.Item eventKey="1">profile</Dropdown.Item>
            <hr/>
            <Dropdown.Item eventKey="5" onClick={props.logout}>Logout</Dropdown.Item>
            </DropdownButton>
        

        </Navbar>
			
    </div>

);

Navigation.propTypes = {
	logout 	: PropTypes.func.isRequired,
};

export default Navigation;
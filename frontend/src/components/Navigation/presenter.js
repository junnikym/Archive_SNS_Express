import React from 'react';

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
                박보성 &nbsp;
            </span>

            <DropdownButton 
            as={ButtonGroup}  
            id="bg-vertical-dropdown-1"
            >
            <Dropdown.Item eventKey="1">profile</Dropdown.Item>
            <hr/>
            <Dropdown.Item eventKey="5">Logout</Dropdown.Item>
            </DropdownButton>
        

        </Navbar>
			
    </div>

);
    export default Navigation;
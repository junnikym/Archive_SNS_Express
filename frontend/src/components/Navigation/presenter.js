import React from 'react';

import { 
    Navbar, 
    Nav, 
    Form, 
    FormControl, 
    Button, 
    DropdownButton, 
    Dropdown, 
    ButtonGroup,
} from 'react-bootstrap';

const Navigation = (props, context) => (

    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">ARCHIVE_SNS</Navbar.Brand>
            <Nav className="mr-auto">
        </Nav>

        <Form inline>
            <FormControl type="text" placeholder="Please enter your search" className="mr-sm-2" />
            <DropdownButton as={ButtonGroup} title="User_Settings" id="bg-vertical-dropdown-1">
            <Dropdown.Item eventKey="1">profile</Dropdown.Item>
            <Dropdown.Item eventKey="2">test</Dropdown.Item>
            <hr/>
            <Dropdown.Item eventKey="3">Logout</Dropdown.Item>
            </DropdownButton>
        
        </Form>

        </Navbar>
			
    </div>

);
    export default Navigation;
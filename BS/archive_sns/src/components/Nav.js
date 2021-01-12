import React from 'react';

import { 
    Navbar, 
    Nav, 
    Form, 
    FormControl, 
    Button, 
    DropdownButton, 
    Dropdown, 
    ButtonGroup
} from 'react-bootstrap';

function Navigation() {
return(
    
    <div className="navbar">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">ARCHIVE_SNS</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
        </Nav>

        <Form inline>
            <FormControl type="text" placeholder="Please enter your content" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
            <Nav.Link href="/login">login</Nav.Link>

            <DropdownButton as={ButtonGroup} title="Settings" id="bg-vertical-dropdown-1">
                <Dropdown.Item eventKey="1">login</Dropdown.Item>
                <Dropdown.Item eventKey="2">Sign Up</Dropdown.Item>
                <Dropdown.Item eventKey="2">Member list</Dropdown.Item>
            </DropdownButton>
        </Form>

        </Navbar>
			
    </div>
);
}
    export default Navigation;
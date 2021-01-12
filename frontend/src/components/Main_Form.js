import React from 'react';

import { 
    Jumbotron, Button, Dropdown
} from 'react-bootstrap';

function Main() {
    return(
        
        <div className="main_home">
            <Jumbotron>
                <h1>Congratulations on your visit</h1>
                <p>
                    This is a Archive_net
                </p>
                <p>
                    <Button variant="primary">Join</Button>
                </p>
            </Jumbotron>

            <div className="Content">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Title
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

            
        </div>
    );
    }

    export default Main;
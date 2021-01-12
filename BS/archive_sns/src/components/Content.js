import React from 'react';

import { 
    Dropdown
} from 'react-bootstrap';

function Content() {
    return(
        
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
    );
    }

    export default Content;
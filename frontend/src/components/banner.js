import React from 'react';

import { 
    Jumbotron, Button, Dropdown
} from 'react-bootstrap';

function __banner__() {
    return(
        
        <div className="main_home">
            <Jumbotron>
                <h1>Congratulations on your visit</h1>
                <p>
                    This is a Archive_net
                </p>
                <p>
                    <Button href="/login"variant="primary">Join</Button>
                </p>
            </Jumbotron>

            <div className="Content">
        </div>

            
        </div>
    );
    }

    export default __banner__;
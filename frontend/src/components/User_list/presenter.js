import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom'; 

import {
	ListGroup
} from 'react-bootstrap';

const User_list = (props, contet) => (
    
    <div 
      className = "User_list" 
      element id ="Over_size">

    <ListGroup>
      <ListGroup.Item variant="success"> USER
      </ListGroup.Item>
      <ListGroup.Item href="#link1">
        <span>박보성</span>
      </ListGroup.Item>
      
      {/* <ListGroup.Item action onClick={alertClicked}>
        This one is a button
      </ListGroup.Item> */}
  </ListGroup>
    </div>
  )

export default User_list;
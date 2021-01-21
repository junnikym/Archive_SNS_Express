import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom'; 

import {
	ListGroup
} from 'react-bootstrap';

const User_list = (props, contet) => (
    
    <div className = "User_list">
    <ListGroup>
      <ListGroup.Item variant="success"> USER
      </ListGroup.Item>
      <ListGroup.Item href="#link1">
        <span>박보성</span>
      </ListGroup.Item>
      <ListGroup.Item href="#link2">
        박보성박보성
      </ListGroup.Item>
      <ListGroup.Item href="#link3">
        박보성박보성박보성
      </ListGroup.Item>
      <ListGroup.Item href="#link4">
        user4
      </ListGroup.Item>
      <ListGroup.Item href="#link5">
        user5
      </ListGroup.Item>
      <ListGroup.Item href="#link5">
        user5
      </ListGroup.Item>
      <ListGroup.Item href="#link5">
        user5
      </ListGroup.Item>
      <ListGroup.Item href="#link5">
        user5
      </ListGroup.Item>
      {/* <ListGroup.Item action onClick={alertClicked}>
        This one is a button
      </ListGroup.Item> */}
  </ListGroup>
    </div>
  )

export default User_list;
import React from "react";
// import PropTypes from "prop-types";

import Login from "../Login";
import Signup from "../Signup";

import {
	Tabs,
	Tab,
} from 'react-bootstrap';

import { Route, Router } from "react-router-dom";

const Auth = (props, context) => (

	<Route>

	<div className = "__Logo__">

		<h1>ARCHIVE</h1>

		</div>

	<div className='Login_center'>		

	<Tabs defaultActiveKey="Login" id="default">

		<Tab eventKey="Login" title="Login">
			<br/>
		<Login />
			
		</Tab>

		<Tab eventKey="SignUp" title="SignUp">
			<br/>
		<Signup />
		</Tab>
	</Tabs>
		</div>
	</Route>
);

export default Auth;

import React from "react";
// import PropTypes from "prop-types";
import './styles.css'

import Login from "../Login";
import Signup from "../Signup";

import {
	Tabs,
	Tab,
	Media,
} from 'react-bootstrap';

import { Route, Router } from "react-router-dom";

const Auth = (props, context) => (

	<Route>
	<div 
		className = "Main_form"
		inline element id = "Over_size-none"
		>
		<div 
			className = "left_form"
			inline element id = "Over_size-form">
			<center>
				<h1>Welcome to <br/> ARCHIVE_SNS</h1>
				<span>Join our website !!</span>
			</center>
		</div>

		<h1 inline element id = "Over_size-on"
		>ARCHIVE_SNS</h1>
		<div 
			className = "right_form"
			inline element id = "Over_size-none"
			>
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
		</div>
	</Route>
);

export default Auth;

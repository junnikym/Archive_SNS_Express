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

	<Tabs defaultActiveKey="Main" id="default">

	<Tab eventKey="Main" title="Main">
			<br/>
		<center>
			<span>
				안녕하세요 저희 'ARCHIVE' 에 오신걸 환영합니다. <br/><br/>
				접속하시기 전에 회원가입은 하셨나요?<br/>
				사이트를 이용하시기 전에 상단 'SignUp'을 통해 회원가입 부탁드립니다.
			</span>
			</center>
			
		</Tab>

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

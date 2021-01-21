import React from "react";
import PropTypes from "prop-types";
import formStyles from "../../shared/formStyles.scss";

import {
	Form,
	Button
} from 'react-bootstrap';

const Login = (props, context) => (
	<div>

		<Form
			className={formStyles.form}
			onSubmit={props.submit_handler}
			method="post" >
	
		<Form.Group controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
				<Form.Control 
					type="email" 
					name="email"
					placeholder="email" 
					value={props.account_email}
					onChange={props.input_hander}
					className={formStyles.textInput}
					/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>
	
		<Form.Group controlId="Password">
			<Form.Label>Password</Form.Label>
				<Form.Control 
					type="password" 
					name="password" 
					placeholder="password" 
					value={props.account_pw}
					onChange={props.input_hander}
					className={formStyles.textInput}
					/>
		</Form.Group>
	
		<Form.Group controlId="formBasicCheckbox">
		<Form.Check type="checkbox" label="Check me out" />
		</Form.Group>

		<Button className = "right"
			variant="primary" 
			type="submit">
				Login		
		</Button>
			</Form>
	
		
	</div>
);

Login.propTypes = {
	input_hander 	: PropTypes.func.isRequired,
	submit_handler 	: PropTypes.func.isRequired,
	
	account_email 	: PropTypes.string.isRequired,
	account_pw 		: PropTypes.string.isRequired
};

// Login.contextTypes = {
//   t: PropTypes.func.isRequired
// };

export default Login;

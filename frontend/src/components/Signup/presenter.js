import React from "react";
import PropTypes from "prop-types";
import formStyles from "../../shared/formStyles.scss";

import {
	Form,
	Button
} from 'react-bootstrap';

const MAX_SIGNUP_STAGE = 2

const Signup = (props, context) => (
	<div>

		<Form
			onSubmit={props.submit_handler}
			method="post" >

			{/* (1) : Email / Password Satege 
			--------------------------------------------------*/}
			{ props.current_stage === 1 && (

				<div>
			<Form.Group controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
				<Form.Control 
					type="email" 
					name="email"
					placeholder="email" 
					value={props.email_val}
					onChange={props.text_input_handler} 
					className={formStyles.textInput}
					/>
			</Form.Group>
	
		<Form.Group controlId="Password">
			<Form.Label>Password</Form.Label>
				<Form.Control 
					type="password" 
					name="password" 
					placeholder="password" 
					value={props.pw_val}
					onChange={props.text_input_handler}
					className={formStyles.textInput}
					/>
		</Form.Group>

		<Form.Group controlId="Password">
			<Form.Label>Confirm_Password</Form.Label>
				<Form.Control 
					type="password" 
					name="confirm_pw" 
					placeholder="Confirm Password"
					value={props.confirm_pw_val}
					onChange={props.text_input_handler} 
					className={formStyles.textInput}
					/>
		</Form.Group>

		<Button
			className = "button_right"
			variant="primary" 
			type="submit"
			value="Continue"
			onClick={props.step_stage}
			>
				next		
		</Button>
				</div>
			) }

			{/* (2) : Profile Imange / Alias Stage
			--------------------------------------------------*/}
			{ props.current_stage === 2 && (
				<div>
					<Form.File 
						id="formcheck-api-regular"
						className="ImgUploaderFrom">

						<div className="ImgPreview">
							test:
							<img src={props.img_preview} />
						</div>

						<Form.File.Input
							type="file"
							// accept='image/jpg, impge/png, image/jpeg, image/gif'
							name="img" 
							value={props.img_value}
							onChange={props.img_input_handler} />

					</Form.File>

					<Form.Group controlId="Password">
						<Form.Label>Alias</Form.Label>
							<Form.Control 
								type="text" 
								name="name" 
								placeholder="Alias" 
								value={props.alias_val}
								onChange={props.text_input_handler}
								className={formStyles.textInput}
								/>
					</Form.Group>

					<input
						type="submit"
						// value={context.t("Sign up")}
						// className={formStyles.button}
						value="Sign up" />
				</div>
			) }
			</Form>

		<div>
			test_load<br/>
			email : {props.email_val}<br/>
			pw : {props.pw_val}<br/>
			confirm_pw : {props.confirm_pw_val}<br/>
			alias : {props.alias_val}<br/>
		</div>

		{/* <p className={formStyles.terms}>
			{context.t("By signing up, you agree to our ")}
			<span>{context.t("Terms & Privacy Policy")}</span>.
		</p> */}

	</div>
);

Signup.propTypes = {
	email_val		: PropTypes.string.isRequired,
	pw_val			: PropTypes.string.isRequired,
	confirm_pw_val	: PropTypes.string.isRequired,
	profile_img_val	: PropTypes.string.isRequired,
	alias_val		: PropTypes.string.isRequired,
	current_stage	: PropTypes.number.isRequired,

	step_stage			: PropTypes.func.isRequired,
	text_input_handler	: PropTypes.func.isRequired,
	img_input_handler	: PropTypes.func.isRequired,
	submit_handler		: PropTypes.func.isRequired,
};

// SignupForm.contextTypes = {
// 	t: PropTypes.func.isRequired
// };

export { MAX_SIGNUP_STAGE };
export default Signup;

import React, { useState } from "react";
import PropTypes from "prop-types";
import Signup, { MAX_SIGNUP_STAGE } from "./presenter";

const Container = (props, context) => {
	
	const [page, setPage] = useState({
		stage : 1
	});

	const [account, setAccount] = useState({
		email		: '',
		password	: '',
		confirm_pw	: '',
		name		: '',
		status_msg	: ''
	});

	const [base64, setBase64] = useState("");
	const [imgFile, setImgFile] = useState(null);

	const { email, password, confirm_pw, name } = account;
	const { stage } = page;

	const __step_stage__ = () => {
		if (stage <= MAX_SIGNUP_STAGE ) {
			setPage({ stage : stage+1 });
		}
	}

	const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setAccount({
			...account,
			[name]: value
		});
	};

	const __img_input_handler__ = event => {
		
		const reader = new FileReader();
		const file = event.target.files[0];
		
		reader.onloadend = () => {
			if (file && reader.result) 
				setBase64(reader.result.toString());

			console.log(base64);
		}

		if(file) {
			reader.readAsDataURL(file);
			setImgFile(file);
		}
		
	};

	const __submit_handler__ = event => {
		event.preventDefault();

		const data = new FormData();

		data.append('image', imgFile)
		Object.keys(account).map( elem => {
			data.append( elem, account[elem] );
		});

		props.createAccount(data);
	};

	return (
		<Signup
			email_val		= {email}
			pw_val			= {password}
			confirm_pw_val	= {confirm_pw}
			alias_val		= {name}
			current_stage 	= {stage}
			img_preview		= { base64 }

			step_stage 			= {__step_stage__}
			text_input_handler 	= {__text_input_handler__}
			img_input_handler	= { __img_input_handler__ }
			submit_handler 		= {__submit_handler__} />
	);

}

Container.propTypes = {
	createAccount : PropTypes.func.isRequired,
};

export default Container;

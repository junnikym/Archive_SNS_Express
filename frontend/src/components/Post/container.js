import React, { useState }  from "react";
import PropTypes from "prop-types";
import Post from "./presenter";

const Container = (props, context) => {

    const [feed, setAccount] = useState({
		text	: '',
		file    : '',
    });
    
    const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setAccount({
			...account,
			[name]: value
		});
	};

	const __file_input_handler__ = event => {
		setAccount({
			...account,
			file : event.target.files[0]
		})
	};

	const __submit_handler__ = event => {
		event.preventDefault();
		props.createAccount(text, file);
	};

    return (
		<Post
			text_val		= {text}
			file_val		= {file}

			step_stage 			= {__step_stage__}
			text_input_handler 	= {__text_input_handler__}
			img_input_handler 	= {__img_input_handler__}
			submit_handler 		= {__submit_handler__} />
	);

}

Container.propTypes = {
	createAccount : PropTypes.func.isRequired,
};

export default Container;
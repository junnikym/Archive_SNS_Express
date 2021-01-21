import React, { useState }  from "react";
import PropTypes from "prop-types";
import Post from "./presenter";

const Container = (props, context) => {

    const [feed, setFeed] = useState({
		text	: '',
		file    : '',
    });

    const { text, file } = feed;

    const __text_input_handler__ = event => {
		const { value, text } = event.target;
		setFeed({
			...feed,
			[text]: value
		});
    };
    
    const __file_input_handler__ = event => {
		setFeed({
			...feed,
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

			text_input_handler 	= {__text_input_handler__}
			file_input_handler 	= {__file_input_handler__}
			submit_handler 		= {__submit_handler__} />
	);

}

Container.propTypes = {
	createAccount : PropTypes.func.isRequired,
};

export default Container;
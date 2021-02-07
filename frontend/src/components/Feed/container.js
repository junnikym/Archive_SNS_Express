import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

const Container = (props, context) => {

	// useEffect(() => {
			
	// 	}
	// }, [input])

    const [PostInfo, setPostInfo] = useState({
		title		: '',
		text		: '',
	});

	const { title, text, _date } = PostInfo;
	
	const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setPostInfo({
			...PostInfo,
			[name]: value
			});
    };

	const __submit_handler__ = event => {
		event.preventDefault(); 
		console.log(title, text, _date);
		props.createPost(title, text);
		
	};

	/**
	 * Image Uploader
	 */

	function __img_submit_handler__(data) {
		
	}

    return (
		<Feed
			text_input_handler 		= {__text_input_handler__}
			submit_handler 			= {__submit_handler__} 
			img_submit_handler		= {__img_submit_handler__}

			Post_title				= 	{title}
			Post_text				= 	{text}
		/>
	);

}

Container.propTypes = {
	createPost : PropTypes.func.isRequired
};

export default Container;
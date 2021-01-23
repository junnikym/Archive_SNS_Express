import React, { useState }  from "react";
import PropTypes from "prop-types";
import Post from "./presenter";

const Container = (props, context) => {

    const [PostInfo, setPostInfo] = useState({
		title		: '',
		text		: '',
		img     	: ''
    });

	const { title, text, img } = PostInfo;
	
	const __title_input_handler__ = event => {
		const { value, name } = event.target;
		setPostInfo({
			...PostInfo,
			[name]: value
		});
    };

    const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setPostInfo({
			...PostInfo,
			[name]: value
		});
    };
    
    const __img_input_handler__ = event => {
		setPostInfo({
			...PostInfo,
			img : event.target.files[0]
		})
	}; 

	const __submit_handler__ = event => {
		console.log("clked");
		
		event.preventDefault();

		console.log("clked");

		props.createPost(title, text, img);
	};

    return (
		<Post
			title_input_handler 	= {__title_input_handler__}
			text_input_handler 		= {__text_input_handler__}
			img_input_handler 		= {__img_input_handler__}
			submit_handler 			= {__submit_handler__} 

			Post_text				= 	{text}
			Post_img				= 	{img}
			Post_title				= 	{title}
			/>
	);

}

Container.propTypes = {
	createPost : PropTypes.func.isRequired,
};

export default Container;
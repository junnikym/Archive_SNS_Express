import React, { useState }  from "react";
import PropTypes from "prop-types";
import _Post_ from "./presenter";

const Container = (props, context) => {

    const [Post, setPost] = useState({
		title		: '',
		text		: '',
		img     	: ''
    });

	const { title, text, img } = Post;
	
	const __title_input_handler__ = event => {
		const { value, name } = event.target;
		setPost({
			...Post,
			[name]: value
		});
    };

    const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setPost({
			...Post,
			[name]: value
		});
    };
    
    const __img_input_handler__ = event => {
		setPost({
			...Post,
			img : event.target.files[0]
		})
	}; 

	const __submit_handler__ = event => {
		event.preventDefault();
		props.createPost(title, text, img);
	};

    return (
		<_Post_
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
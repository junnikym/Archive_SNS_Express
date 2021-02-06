import React, { useState } from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

const Container = (props, context) => {

	// useEffect(() => {
			
	// 	}
	// }, [input])

    const [PostInfo, setPostInfo] = useState({
		title		: '',
		text		: '',
		img     	: '',
	});

	const { title, text, img, _date } = PostInfo;
	
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
		event.preventDefault(); 
		console.log(title, text, img, _date);
		props.createPost(title, text, img);
		
	};

    return (
		<Feed
			text_input_handler 		= {__text_input_handler__}
			img_input_handler 		= {__img_input_handler__}
			submit_handler 			= {__submit_handler__} 

			Post_title				= 	{title}
			Post_text				= 	{text}
			Post_img				= 	{img}
			/>
	);

}

Container.propTypes = {
	createPost : PropTypes.func.isRequired
};

export default Container;
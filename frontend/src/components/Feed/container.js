import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

const Container = (props, context) => {

	const [upload, setUpload] = useState(-1);

	const PostInfoInit = {
		title				: '',
		content				: '',
	};

    const [PostInfo, setPostInfo] = useState(PostInfoInit);

	useEffect(() => {

		if(upload == props.new_post_count) {
			setUpload(-1);

			setPostInfo(PostInfoInit);
		}
		
	}, [props.new_post_count])
	
	const __text_input_handler__ = event => {
		const { value, name } = event.target;
		setPostInfo({
			...PostInfo,
			[name]: value
		});
    };

	const __submit_handler__ = event => {
		event.preventDefault(); 
		console.log("run")
		console.log(PostInfo);
		setUpload(props.new_post_count + 1);
	};

	const __uploader__ = (img) => {
		const data = new FormData();
		
		img.map(elem => data.append('image', elem));

		Object.keys(PostInfo).map( elem => {
			data.append( elem, PostInfo[elem] );
		});

		props.createPost(data);
	}

    return (
		<Feed
			text_input_handler 		= {__text_input_handler__}
			submit_handler 			= {__submit_handler__} 
			upload					= {upload}
			uploader				= {__uploader__}

			post_info 				= {PostInfo}
		/>
	);

}

Container.propTypes = {
	createPost : PropTypes.func.isRequired
};

export default Container;
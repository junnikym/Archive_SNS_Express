import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageUploader from "./presenter";

const Container = (props, context) => {

	const [base64, setBase64] = useState([]);
	const [imgFile, setImgFile] = useState([]);

	useEffect(() => {
		console.log(imgFile);
	}, [imgFile])

	const __img_change_handler__ = (event) => {
		const reader = new FileReader();
		const file = event.target.files[0];
		
		reader.onloadend = () => {

			if (file && reader.result) {
				setBase64([
					...base64,
					reader.result.toString()
				]);
			}

		}

		if(file) {
			reader.readAsDataURL(file);

			setImgFile([
				...imgFile,
				file
			]);
		}
	}

	const __upload_handler__ = event => {
		event.preventDefault(); 

		const data = new FormData();
		imgFile.map(elem => data.append('image', elem));

		props.uploadPostImg(data);
	};

    return (
		<ImageUploader
			img_change_handler		= { __img_change_handler__ }
			img_preview				= { base64 }
			upload_handler 			= { __upload_handler__ }
		/>
	);

}

Container.propTypes = {
	createPost : PropTypes.func.isRequired
};

export default Container;
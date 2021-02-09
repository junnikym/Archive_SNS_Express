import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";

// import PostList from "./presenter";
import Post_Card, { Post_Card_Img } from "./presenter";

const Container = (props, context) => {
	
	const [state, setState] = useState({
		loading : true,
	});

	useEffect(() => {
		if(props.post_list.length != 0) {
			setState({
				loading: false,
			});
		}
		else {
			props.postList(0, 5, "post.createAt");	
		}
	}, [props.post_list]);

	const {loading} = state;

	const image_loader = (elem) => {
		return (
			elem.image.map(elem => (
				<Post_Card_Img img = {elem} />
			))
		);
	}

	const render = () => {
		if(loading) {
			return ( <p>loading...</p> )
		}
		else {
			console.log(props.post_list);

			return (
				props.post_list.map(elem => (
					<Post_Card 
						Post_title 	= {elem.title}
						Post_img_loader = {() => image_loader(elem)}
						Post_text	= {elem.text_content}
						Post_date	= {elem.date} 
					/>
			)));
		}
	}

	return (
		<div>
			{render()}
		</div>
	);
}

Container.propTypes = {
	postList : PropTypes.func.isRequired,
	post_list: PropTypes.array.isRequired
};

export default Container;


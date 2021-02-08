import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import PostList from "./presenter";

import Post_Card from "../Post_Card/presenter";

const Container = (props, context) => {
	
	const [state, setState] = useState({
		loading : true,
		list : []
	});

	useEffect(() => {
		if(!props.post_list)
			props.postList(0, 5, "post.createAt");
		else {
			setState({
				loading: false,
				list: props.post_list
			});
		}
	}, [props.post_list]);

	const {loading, list} = state;

	const render = () => {
		if(loading) {
			return ( <p>loading...</p> )
		}
		else {
			return (
				list.map(elem => (
					<Post_Card 
						Post_text={elem.title} />
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
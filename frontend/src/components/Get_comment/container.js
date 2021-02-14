import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";

import Get_comment from "./presenter";

const Container = (props, context) => {
	
	const [state, setState] = useState({
		loading : true,
	});

	useEffect(() => {
		if(props.comment_list != 0) {
			setState({
				loading: false,
			});
		}
		else {
			props.commentList("post.createAt", 0, 5, "comment.createAt");	
		}
	}, [props.comment_list]);

	const {loading} = state;

	const render = () => {
		if(loading) {
			return ( <p>loading...</p> )
		}
		else {
			console.log(props.comment_list);

			return (
				props.comment_list.map(elem => (
					<Get_comment 
						comment 	= {elem.content}
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
	commentList   	     : PropTypes.func.isRequired,
	comment_list         : PropTypes.array.isRequired
};

export default Container;
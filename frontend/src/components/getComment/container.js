import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import getComment from "./presenter";

const Container = (props, context) => {
	
	const [state, setState] = useState({
		loading : true,
		list : []
	});

	useEffect(() => {
		if(!props.comment_list)
			props.commentList(0, 5, "comment.createAt");
		else {
			setState({
				loading: false,
				list: props.comment_list
			});
		}
	}, [props.comment_list]);

	const {loading, list} = state;

	const render = () => {
		if(loading) {
			return ( <p>loading...</p> )
		}
		else {
			return (
				list.map(elem => (
					<getComment 
						comment 	= {elem.content}
						// user    	= {elem.user}
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
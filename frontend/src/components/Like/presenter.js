import React from "react";
import PropTypes from "prop-types";

import {
	Form,
	Button
} from 'react-bootstrap';

const Like = (props, context) => {

    return(

	<div className = "Like_button">

            <button 
                className = "button_right"
                onClick = {props.cilckLike}
                >
            좋아요
            </button>

	</div>
)
};

Like.propsTypes = {
    cilckLike	    	: PropTypes.func.isRequired,
};

export default Like;
import React from "react";
import PropTypes from "prop-types";

import {
	Form,
	Button
} from 'react-bootstrap';

const Like = (props, context) => {

    return(

            <button 
                className = "button"
                onClick = {props.cilckLike}
                >
            <div className = "Like_btn"></div>
            </button>
)
};

Like.propsTypes = {
    cilckLike	    	: PropTypes.func.isRequired,
};

export default Like;
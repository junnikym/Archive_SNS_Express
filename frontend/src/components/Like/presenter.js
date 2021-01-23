import React from "react";
import PropTypes from "prop-types";

import {
	Form,
	Button
} from 'react-bootstrap';

const Like = (props) => (

	<div className = "Like_button"
    onSubmit={props.submit_handler}>

        <Button 
        className = "button_right"
        type = "submit"
        name = "Like"
        >
            좋아요
        </Button>
		
	</div>
);

Like.propsTypes = {
    submit_handler	    	: PropTypes.func.isRequired,
};

export default Like;
import React from "react";
import PropTypes from "prop-types";

import {
	Form,
	Button
} from 'react-bootstrap';

const Like_button = (props, context) => (
	<div className = "Like_button">

        <Button 
        onSubmit={props.submit_handler}
        type = "submit"
        name = "Like"
        >
            좋아요
        </Button>
		
	</div>
);


export { MAX_SIGNUP_STAGE };
export default Like_button;

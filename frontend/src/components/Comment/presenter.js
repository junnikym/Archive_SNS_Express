import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

const Comment = props => (
    
    <form
        className = "comment"
        onSubmit={props.submit_handler}
        method="post">

        <input 
            type = "comment"
            name = "comment"
            placeholder = "댓글을 입력해주세요." 
            value = {props.comment}
            onChange = {props.comment_input_handler} 
        />

        <input
            type = "submit"
            />
    </form>

);

Comment.propTypes = {
    comment_input_handler   : PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
    
    comment                 : PropTypes.string.isRequired,
};

export default Comment;
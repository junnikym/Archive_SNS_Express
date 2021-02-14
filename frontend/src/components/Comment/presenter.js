import React from 'react';
import PropTypes from "prop-types";

import Get_comment from "../Get_comment";

const Comment = props => (
    
    <div className = "Comment">

        <br/>

        <Get_comment/>
        
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

    </div>

);

Comment.propTypes = {
    comment_input_handler   : PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
};

export default Comment;
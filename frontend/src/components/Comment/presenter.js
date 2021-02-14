import React from 'react';
import PropTypes from "prop-types";

export const CommentView = props => (
    <div>
        작성자 : {props.comment.writer.name} <br/>
        {props.comment.content}
        <hr/>
    </div>
)

const Comment = props => (
    
    <div className = "Comment">

        <br/>

        { props.draw_handler() }
        
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
    
    comment                 : PropTypes.string.isRequired,
};

export default Comment;
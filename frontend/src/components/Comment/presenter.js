import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './styles.css'

export const CommentView = props => (
    <div className = "commentView">
        <br/>
        작성자 : {props.comment.writer.pk} <br/>
        {props.comment.content}
        <button
            onClick = {props.delete_handler}
            type = "button">
                <span>delete</span>
        </button>
    </div>
)

const Comment = props => (
    
    <div className = "comment">
        
        <form
            onSubmit={props.submit_handler}
            method="post">

                <div className = "img_aside">
                    <Link to = "/Profile/pk">
                        <div className = "imgUser"></div>
                    </Link>
                </div>
                <hr/>
                <center>
            <input
                className = "comment_input"
                type = "comment"
                name = "comment"
                placeholder = "댓글을 입력해주세요." 
                value = {props.comment}
                onChange = {props.comment_input_handler} 
            />
            <input
                type = "submit"
                />
            </center>
                { props.draw_handler() }
        </form>

    </div>

);

Comment.propTypes = {
    comment_input_handler   : PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
};

export default Comment;
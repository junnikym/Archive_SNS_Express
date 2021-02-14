import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

import Comment, { CommentView } from "./presenter";

const Container = (props, context) => {

    useEffect(() => {
        props.commentList(props.post_pk, 0, 5, null);
    }, [])

    useEffect(() => {
        console.log("loaded");
    }, [props.comment_list])

    const [commentInfo, setCommentInfo] = useState({
        comment     : '',
    });

    const { comment } = commentInfo

    const comment_input_handler = event => {
        const { value, name } = event.target;
        setCommentInfo({
            ...commentInfo,
            [name]: value
        });
    }

    const submit_handler = event => {
        event.preventDefault();
        props.createComment(props.post_pk, comment);
    }

    const draw_handler = () => {
        const result = [];

        props.comment_list?.comments.map( elem => {
            result.push(<CommentView comment={elem}/>)
        })
        
        return result;
    }


    return (
        

        <Comment
            comment_input_handler       = {comment_input_handler}
            submit_handler              = {submit_handler}
            draw_handler                = {draw_handler}
            comment                     = {comment}
            commentInfo                 = {commentInfo}

        />
    );
}


export default Container;
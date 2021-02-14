import React, { useState, useEffect } from "react";

import Comment from "./presenter";

const Container = (props, context) => {

    const [commentInfo, setCommentInfo] = useState({
        comment     : '',
    });

    const { comment } = commentInfo;

    const comment_input_handler = event => {
        const { value, name } = event.target;
        setCommentInfo({
            ...commentInfo,
            [name]: value
        });
    };

    const submit_handler = event => {
        event.preventDefault();
        console.log(props.post_pk);
        props.createComment(props.post_pk, comment);
    };

    return (
        <Comment
            comment_input_handler       = {comment_input_handler}
            submit_handler              = {submit_handler}

            commentInfo                 = {commentInfo}

        />
    );
}

export default Container;
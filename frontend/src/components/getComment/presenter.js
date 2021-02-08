import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

const getComment = props => (

        <div className = "getComment">
            댓글 : <b> {props.content} </b>
            {/* 유저 : <b> {props.user}</b> */}
        </div>
);

export default getComment;
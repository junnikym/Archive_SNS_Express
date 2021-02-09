import React from 'react';
import PropTypes from "prop-types";

const groupHome = (props, content) => (
    <div>

        <br/>
        
        <h1> Group Page </h1>

        <input
            type = "button"
            name = "그룹찾기"
            value = "그룹찾기"
        />

        <input
            type = "button"
            name = "그룹가입하기"
            value = "그룹가입하기"
        />

        <input
            type = "button"
            name = "가입한 그룹"
            value = "가입한 그룹"
        />

    </div>
);

export default groupHome;
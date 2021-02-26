import React from 'react';
import PropTypes from "prop-types";
import GroupList from "../GroupList";

const GroupHome = (props, content) => (

    <div className = "groupHome">
        <h1> Group Page </h1>
            <form onSubmit = {props.submit_hander}>
                <input
                    type = "title"
                    name = "title"
                    value = {props.title}
                    onChange = {props.text_hander}
                />

                <input
                    type = "submit"
                    >

                    </input>
        </form>

        <GroupList/>
    </div>
    
);

GroupHome.propTypes = {
	text_input_handler   	: PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,

    GroupInfo               : PropTypes.object.isRequired
};

export default GroupHome;
import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

const Container = (props, context) => {

    const [ profile, updateProfile ] = useState({
        email       : '',
        password    : '', 
        name        : '',
        image       : '',
        msg         : ''
    });

    const { email, password, name, image, msg } = profile;

    const __text_input_handler__ = event => {
        const { value, name } = event.target;
        updateProfile({
            ...profile,
            [name]: value
        });
    };

    const __submit_handler__ = event => {
        event.preventDefault();
        console.log("edit run");
        props.editProfile(email, password, name, image, msg);
    };

    return (
        <Profile
            data = {() => props.getProfile(props.match.params.pk)}
            Unsubscribe = {() => props.Unsubscribe(props.match.params.pk)}
            
            email_val           = {email}
            password_val        = {password}
            name_val            = {name}
            img_val             = {image}
            msg_val             = {msg}
            
            Profile             = {() => props.getProfile(localStorage.getItem("PK"))}
            text_input_handler  = {__text_input_handler__}
            submit_handler      = {__submit_handler__}
        />
    )
}

Container.propTypes = {
    editProfile    : PropTypes.func.isRequired,
    getProfile     : PropTypes.array.isRequired,
};

export default Container;
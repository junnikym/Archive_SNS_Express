import React, { useState } from "react";
import PropTypes from "prop-types";

const Container = (props, context) => {

}

const __submit_handler__ = event => {
    event.preventDefault();
    props.createAccount(email, pw, confirm_pw, profile_img, alias);
};
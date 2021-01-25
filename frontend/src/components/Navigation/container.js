import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

const Container = (props, context) => {

    const [state, setState] = useState({
        loading : true
    });
    
    useEffect(() => {
        if(!props.info) {
            props.getInfo(props.PK);
        }
    }, []);

    return (
        <Navigation
            logout = {props.logout}
            info = {props.info}
        />
    );
}

Container.propTypes = {
    logout : PropTypes.func.isRequired,
    getInfo: PropTypes.func.isRequired
}

export default Container;
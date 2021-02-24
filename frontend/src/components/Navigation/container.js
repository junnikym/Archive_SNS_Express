import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

const Container = (props, context) => {

    const [state, setState] = useState({
        loading : true
    });

    return (
        <Navigation
            logout = {props.logout}
        />
    );
}

Container.propTypes = {
    logout : PropTypes.func.isRequired,
}

export default Container;
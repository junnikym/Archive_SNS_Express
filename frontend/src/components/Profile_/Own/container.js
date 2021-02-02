import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import Own from "./presenter";

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
        <Own
            info = {props.info}
        />
    );
}

Container.propTypes = {
    getInfo: PropTypes.func.isRequired
}

export default Container;
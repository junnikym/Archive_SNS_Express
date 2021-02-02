import React from "react";
import PropTypes from "prop-types";
import Like from "./presenter";

const Container = (props, context) => {

    const __cilckLike__ = event => {
        
        event.preventDefault();
    
        props.feed_Like();
    };

    return (
        <Like
            cilckLike			= {__cilckLike__} 
            />
    );

}

Container.propTypes = {
	feed_Like: PropTypes.func.isRequired,
};

export default Container;
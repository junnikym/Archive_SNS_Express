import React from "react";
import PropTypes from "prop-types";
import Like from "./presenter";

// Like = () => {
//     if (this.state.mode === "off") {
//         this.useState({
//             mode: "on",
//             button_color_switch: "green"
//         });
//     } else if (this.state.mode === "on") {
//         this.useState({
//             mode: "off",
//             button_color_switch: "red"
//         });
//     }
// }

const Container = (props, context) => {

    const __cilckLike__ = event => {
        console.log("clked");
        
        // event.preventDefault();
    
        // console.log("clked");
    
        // props.feed_Like();
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
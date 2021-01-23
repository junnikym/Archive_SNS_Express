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

const Container = (props) => {

    const __submit_handler__ = event => {
        console.log("clked");
        
        event.preventDefault();
    
        console.log("clked");
    
        props.Like_onClick();
    };

    return (
        <Like
            submit_handler 			= {__submit_handler__} 
            />
    );

}

Container.propTypes = {
	Like_onClick: PropTypes.func.isRequired,
};

export default Container;
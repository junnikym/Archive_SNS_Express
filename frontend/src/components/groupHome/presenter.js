import React from 'react';
import PropTypes from "prop-types";

const groupHome = (props, content) => (
    <div className = "groupHome">
        <br/>
        <h1> Group Page </h1>

        <form>
            <input
                type = "button"
                name = "groupFind"
                value = "Find"
            />

            &nbsp;

            <input
                type = "button"
                name = "groupInvite"
                value = "Invite"
            />

            &nbsp;
            
            <input
                type = "button"
                name = "groupCreate"
                value = "Create"
            />
        </form>
    </div>
    
);

export default groupHome;
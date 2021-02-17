import React from "react";
import PropTypes from "prop-types";

const Profile = (props, context) => (

    <div className = "Profile">
    
        Email : {props.info?.email} <br/>

        Name : {props.info?.name}   <br/>

        Status_msg : {props.info?.status_msg}

        <button
            onClick = {props.delete_handler}
            type = "submit">
                <span>Unsubscribe</span>
        </button>
        
    </div>

);


export default Profile;
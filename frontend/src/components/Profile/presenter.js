import React from "react";
import PropTypes from "prop-types";

const Profile = (props, context) => (

    <div className = "Profile">
    
        Email : {props.info?.email} <br/>

        Name : {props.info?.name}   <br/>

        Status_msg : {props.info?.status_msg}
        
    </div>

);


export default Profile;
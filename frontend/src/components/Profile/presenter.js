import React from "react";
import PropTypes from "prop-types";

const Profile = (props, context) => (

    <div className = "Profile">
    
        Email : {props.info?.email} <br/>

        Name : {props.info?.name}   <br/>

        Status_msg : {props.info?.status_msg}

        <hr/>

    <from 
        className = "Profile_Edit"
        >

        <h5>Profile_Edit</h5>

        Email : &nbsp;
        <input
            placeholder = "Email"
            name = "email"
            type = "email"
            value = {props.email_val}
            onChange = {props.text_input_handler}
            /> <br/>

        Name : &nbsp;
        <input
            placeholder = "Name"
            name = "name"
            type = "name"
            value = {props.name_val}
            onChange = {props.text_input_handler}
            /> <br/>

        Password : &nbsp;
        <input
            placeholder = "Password"
            name = "password"
            type = "password"
            value = {props.password_val}
            onChange = {props.text_input_handler}
            />
            <br/>
        img : <br/>

        msg : &nbsp;
        <input
            placeholder = "Status_msg"
            name = "msg"
            type = "text"
            value = {props.msg_val}
            onChange = {props.text_input_handler}
            />

    </from>

    <div><hr/>
			test_load<br/>
			email : {props.email_val}<br/>
            name  : {props.name_val}<br/>
			pw : {props.password_val}<br/>
            msg : {props.msg_val}
            <hr/></div>

    

        <button
            onClick = {props.submit_handler}
            type = "submit"
            >
                <span>profile_edit</span>
        </button>

        <button
            onClick = {props.delete_handler}
            type = "submit">
                <span>Unsubscribe</span>
        </button>
        
    </div>

);

Profile.propTypes = {
    email_val           : PropTypes.string.isRequired,
    password_val        : PropTypes.string.isRequired,
    name_val            : PropTypes.string.isRequired,
    image_val           : PropTypes.string.isRequired,
    msg_val             : PropTypes.string.isRequired,

    text_input_handler	: PropTypes.func.isRequired,
	img_input_handler	: PropTypes.func.isRequired,
	submit_handler		: PropTypes.func.isRequired,
}


export default Profile;
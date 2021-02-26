import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

const Container = (props, context) => {

    const [ profile, updateProfile ] = useState({
        email       : '',
        password    : '', 
        name        : '',
        image       : '',
        msg         : ''
    });

    const { email, password, name, image, msg } = profile;

    const __text_input_handler__ = event => {
        const { value, name } = event.target;
        updateProfile({
            ...profile,
            [name]: value
        });
    };

    const __submit_handler__ = event => {
        event.preventDefault();
        console.log("edit run");
        props.editProfile(email, password, name, image, msg);
    };

    const [state, setState] = useState({
		loading : true,
	});

    useEffect(() => {

		if(props.profile_data != undefined) {
			setState({
				loading: false,
			});
		}
		else {
			props.getProfile(localStorage.getItem("PK"));
		}
	}, [props.profile_data]);

	const {loading} = state;

    
const render = () => {
    if(loading) {
        return ( <div className="loader_Text">
            <b>Loading...</b>
            <div className = "loader"></div>
            </div> )
    }
    else {

        return (
            <div>
                <Profile
                    Unsubscribe = {() => props.Unsubscribe(props.match.params.pk)}

                    email               = {props.profile_data.email}
                    name                = {props.profile_data.name}
                    msg                 = {props.profile_data.status_msg}
                    
                    email_val           = {email}
                    password_val        = {password}
                    name_val            = {name}
                    img_val             = {image}
                    msg_val             = {msg}
                    
                    text_input_handler  = {__text_input_handler__}
                    submit_handler      = {__submit_handler__}
                />
            )}
            </div>
        )
    }
}

return (
    <div>
        {render()}
    </div>
);
}

Container.propTypes = {
    editProfile    : PropTypes.func.isRequired,
    getProfile     : PropTypes.array.isRequired,
};

export default Container;

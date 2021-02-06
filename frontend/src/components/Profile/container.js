import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

const Container = (props, context) => {

    useEffect(()=>{
        props.Profile(props.match.params.pk);
    },[])


    const [state, setState] = useState({
        loading : true
    });

    return (
        <Profile
            info = {props.profile_info}
        />
    );
}

Container.propTypes = {

}

export default Container;
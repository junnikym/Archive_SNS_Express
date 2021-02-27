import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import GroupList from "./presenter";

const Container = (props, content) => {

    const [state, setState] = useState({
        loading : true,
    });

    useEffect(() => {
        if(props.group_list != undefined)
            setState({
                loading: false,
            });
        else {
            props.groupList();
        }
    }, [props.group_list]);

    const {loading} = state;

    const render = () => {
        if(loading) {
            return ( 
            <div className="loader_Text">
                <b>Loading...</b>
                    <div className = "loader"></div>
            </div> )
        }
        else {
            return (
                <div>
                    <GroupList
                    />
                </div>
            )
        }
    }
    return (
        <div>
            {render()}
        </div>
    )
}

Container.propTypes = {
	groupList 			: PropTypes.func.isRequired,
	group_list			: PropTypes.array.isRequired,
};

export default Container;
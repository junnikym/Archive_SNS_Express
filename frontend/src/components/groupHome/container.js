import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";

import groupHome from "./presenter";

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
    }, [props.group_List]);

    const {loading} = state;

    const render = () => {
        if(loading) {
            return ( <p>loading...</p> )
        }
        else {
            return (
                <div>
                    // 그룹 리스트 들어올 자리
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

export default Container;
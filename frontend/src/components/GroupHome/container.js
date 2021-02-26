import React, { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import GroupHome from "./presenter";

const Container = (props, content) => {

    const GroupInfoInit = {
        group_pk            : '',
        title               : '',
        member_pk_list      : ''
    }

    const [GroupInfo, setGroupInfo] = useState(GroupInfoInit);

    const __text_hander__ = e => {
        const { value, name } = e.target;
        setGroupInfo({
            ...GroupInfo,
            [name]: value
        });
    };

    const __submit_handler__ = e => {
        e.preventDefault();
        console.log("Group create run : ", GroupInfo);
        props.groupCreate(GroupInfo);
    }

    return (
            <GroupHome
                text_hander     = {__text_hander__}
                submit_hander   = {__submit_handler__}
            />
    )
        
}

Container.propTypes = {

};


export default Container;
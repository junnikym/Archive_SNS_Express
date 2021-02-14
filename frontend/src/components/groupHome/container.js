import React, {useState} from "react";
import groupHome from "./presenter";

const Container = (props, content) => {

    const [groupInfo, setGroupInfo] = useState({
        title       : '',
    });

    const { group } = groupInfo;

    return (
        <groupHome/>
    );
}

export default Container;
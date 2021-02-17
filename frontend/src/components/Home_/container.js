import React, { useEffect, useState, useRef } from "react";
import Home_ from "./presenter";

import ws from "../../shared/socket_io";

const Container = (props, context) => {

    const { socket } = ws;
    const [notifyBuf, setNotifyBuf] = useState([]);
    const nRecive = useRef(0);

    useEffect(() => {
        console.log("before start : ", notifyBuf, " :: n : ", nRecive );
    
        while(notifyBuf.length != 0) {
            props.AddChatNotify(notifyBuf[0]);
            setNotifyBuf(notifyBuf.shift());
        }
    },[nRecive.current]);

    socket.on('chat_notify', msg => {
        nRecive.current += 1;
        setNotifyBuf(notifyBuf.concat([msg]));
    });

    return (
        <Home_/>
    );
}

export default Container;
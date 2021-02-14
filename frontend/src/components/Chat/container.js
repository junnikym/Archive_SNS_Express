import React, {useEffect, useState} from "react";
import Chat, {ChatRecivedText, ChatMyText} from "./presenter";

const Container = (props, context) => {

    useEffect(() => {
        props.getChatContents("21298f2e-860a-44a5-bc3d-a19a604a5f73");
    }, []);

    const [chatInput, setChatInput] = useState({ msgInput: "" });
	
	const __text_input_handler__ = event => {
		const { value, name } = event.target;
        
		setChatInput({
			...chatInput,
			[name]: value
		});
    };

    const __send_message__ = event => {
		event.preventDefault(); 
		props.sandChatMessage(
            "21298f2e-860a-44a5-bc3d-a19a604a5f73",
            chatInput.msgInput
        );
	};

    const DrawChatContents = (contents) => {
        return contents.map(elem => {
            console.log("writer : ", elem.writer_pk);
            console.log("writer : ", elem.my_pk);
            if(elem.writer_pk == props.my_pk) 
                return (<ChatMyText chat = {elem}/>);

            return (<ChatRecivedText chat = {elem}/>);
        });
    }

    return (
        <Chat 
            sendMessage = {__send_message__}
            textInputHandler = {__text_input_handler__}
            msgInput = {chatInput.msgInput} 
            contents = {DrawChatContents(props.current_chat_contents)}
        />
    );
}

export default Container;
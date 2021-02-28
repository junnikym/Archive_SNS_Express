import React, {useEffect, useState} from "react";
import Chat, {ChatRecivedText, ChatMyText} from "./presenter";

const Container = (props, context) => {

    useEffect(() => {
        props.getChatContents("76407e7e-9676-41bd-9539-275ac8a8b6b6");
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
            "681b1a60-fc35-42f7-9e4a-0a08fbfc044e",
            chatInput.msgInput
        );
	};

    const DrawChatContents = () => {
        return props.current_chat_contents.map(elem => {
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
            contents = {DrawChatContents()}
        />
    );
}

export default Container;
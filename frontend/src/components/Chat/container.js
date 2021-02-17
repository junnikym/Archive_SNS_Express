import React, {useEffect, useState} from "react";
import Chat, {ChatRecivedText, ChatMyText} from "./presenter";

const Container = (props, context) => {

    useEffect(() => {
        props.getChatContents("6b3f76f9-d076-4aef-ab67-8e26509c10ce");
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
            "6b3f76f9-d076-4aef-ab67-8e26509c10ce",
            chatInput.msgInput
        );
	};

    const DrawChatContents = (contents) => {
        return contents.map(elem => {
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
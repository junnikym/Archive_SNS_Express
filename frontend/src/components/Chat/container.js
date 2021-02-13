import React, {useState} from "react";
import Chat from "./presenter";

const Container = (props, context) => {

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

    return (
        <Chat 
            sendMessage = {__send_message__}
            textInputHandler = {__text_input_handler__}
            msgInput = {chatInput.msgInput} 
        />
    );
}

export default Container;
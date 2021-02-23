import React from 'react';
import './styles.css'

import { BrowserRouter as Router, Route} from 'react-router-dom'; 

import { 
    Form,
    Button
} from 'react-bootstrap';

export const ChatRecivedText = (props, content) => (
    <div>
        <p> {props.chat.writer.name} </p>
        {props.chat.content}
    </div>
);

export const ChatMyText = (props, content) => (
    <div>
        {props.chat.content}
    </div>
);

const Chat = (props, content) => (

        <div id = "chat"> 
            <div id = "close">
                </div>   

        <div className = "chat_load">
            {props.contents}
        </div>    

        <Form
            className="chat_input_box"
            onSubmit={props.sendMessage}
            method="post" >

            <hr/>
            <Form.Group controlId="Textarea">

                <Form.Control  
                    type="text"
                    name="msgInput"
                    placeholder="메시지를 입력해주세요." 
                    value={props.msgInput}
                    onChange={props.textInputHandler}         
                    rows={3} 
                />

            </Form.Group>

            <Button 
                className = "button_right"
                variant = "primary"
                type = "submit" > 
                    <span>전송</span>
            </Button>

        </Form>

        </div>

)

export default Chat;
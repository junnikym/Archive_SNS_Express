import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom'; 

import { 
    Form,
    Button
} from 'react-bootstrap';

const Chat = (props, contet) => (

    <div id = "chat">

    <div className = "chat_load"> 채팅 영역

        <div className = "chat_input_box">
        
        <Form
            onSubmit={props.sendMessage}
            method="post" >

            <hr/>
            <Form.Group controlId="Textarea">
                
                <Form.Label>@사용자</Form.Label>

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

    </div>
    </div>
)

export default Chat;
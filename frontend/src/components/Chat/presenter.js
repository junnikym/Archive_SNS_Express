import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom'; 

import { 
    Form,
    Button
} from 'react-bootstrap';

const Chat = (props, contet) => (

    <div id = "chat">

    <div className = "chat_load"> 채팅 영역
        </div>

        <div className = "chat_input_box">
        
        <Form
        onSubmit={props.submit_handler}
        method="post" >

    <hr/>
    <Form.Group controlId="Textarea">
        <Form.Label>@사용자</Form.Label>
        <Form.Control  
        type="text"
        name="text"
        placeholder="메시지를 입력해주세요." 
        value={props.text_val0}
        onChange={props.text_input_handler}         
        
        rows={3} />
    </Form.Group>
    </Form>

        <Button 
        className = "button_right"
        variant = "primary"
        onClick = "sand()" > 
        전송 
        </Button>
    </div>

    </div>
    
    


)

export default Chat;
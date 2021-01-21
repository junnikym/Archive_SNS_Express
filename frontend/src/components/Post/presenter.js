import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { 
    Form,
    Button
} from 'react-bootstrap';

const Post = (props, contet) => (
    
    <div className = "Post">

    <Form
        onSubmit={props.submit_handler}
        method="post" >

    <Form.Group controlId="Textarea">
        <Form.Label>사용자</Form.Label>
        <Form.Control  
        type="text"
        name="text"
        placeholder="당신의 하루는 어떠셨나요?" 
        // value={props.text_val0}
		// onChange={props.text_input_handler}         
        as="textarea" 
        rows={3} />
    </Form.Group>
    </Form>

    <Form.File id="formcheck-api-regular">
        <Form.File.Label>첨부파일 올리기</Form.File.Label>
        <Form.File.Input />
        </Form.File>

        <Button type = "submit" > 게시하기 </Button>
    
        </div>


)

Post.propTypes = {
	text_val		: PropTypes.string.isRequired,
    
	text_input_handler	: PropTypes.func.isRequired,
	submit_handler		: PropTypes.func.isRequired,
};

export default Post;
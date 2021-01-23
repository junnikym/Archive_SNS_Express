import React from 'react';
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route} from 'react-router-dom';

import { 
    Form,
    Button
} from 'react-bootstrap';

const Post = (props, context) => (
    
    <div className = "Post">

    <Form
        onSubmit={props.submit_handler}
        method="post" >

    <Form.Group controlId="Textarea">
        <Form.Label>@사용자</Form.Label>
        <Form.Control  
        type="text"
        name="title"
        placeholder="오늘 최고의 키워드!" 
        value={props.Post_title}
		onChange={props.title_input_handler}  />
    </Form.Group>

    <Form.Group controlId="Textarea">
        
        <Form.Control  
        type="text"
        name="text"
        placeholder="당신의 하루는 어떠셨나요?" 
        value={props.Post_text}
		onChange={props.text_input_handler}         
        rows={3} />
    </Form.Group>

    <Form.File id="formcheck-api-regular">
        <Form.File.Input
        type="file"
        name="img" 
        value={props.Post_img}
        onChange={props.img_input_handler}
        />
        </Form.File>

        <Button 
            className = "button_right"
            variant = "primary"
            type = "submit" > 
        게시하기 
        </Button>

        </Form>
    
        </div>
);

Post.propTypes = {
    text_input_handler	: PropTypes.func.isRequired,
    img_input_handler	: PropTypes.func.isRequired,
    submit_handler		: PropTypes.func.isRequired,
    
    Post_text	    	: PropTypes.string.isRequired,
    Post_img        	: PropTypes.string.isRequired,
    Post_title       	: PropTypes.string.isRequired,
};

export default Post;
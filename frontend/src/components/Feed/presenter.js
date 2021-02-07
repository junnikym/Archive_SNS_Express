import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { 
    Form,
    Button
} from 'react-bootstrap';

import ImageUploader from '../ImageUploader';

const Feed = (props) => (
    
    <div className = "Feed">

        <Form
            onSubmit={props.submit_handler}
            method="post" >

            <Form.Label>포스트 쓰기</Form.Label>

            <Form.Group controlId="Textarea">
                <Form.Control  
                    type="text"
                    name="title"
                    placeholder="제목" 
                    value={props.Post_title}
                    onChange={props.text_input_handler} />
            </Form.Group>

            <Form.Group controlId="Textarea">
                <Form.Control  
                    type="text"
                    name="text"
                    placeholder="내용" 
                    value={props.Post_text}
                    onChange={props.text_input_handler} />
            </Form.Group>

            <ImageUploader 
                is_run_submit={props.is_run_submit}
                submit_handler={props.img_submit_handler}
            />

            <Button 
                className = "button_right"
                variant = "primary"
                type = "submit" > 
                    <span>게시하기</span>
            </Button>

        </Form>
    
    </div>
);

Feed.propTypes = {
	text_input_handler   	: PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
    img_submit_handler      : PropTypes.func.isRequired,
    
    Post_title              : PropTypes.string.isRequired,
    Post_text               : PropTypes.string.isRequired,
    is_run_submit           : PropTypes.bool.isRequired
};

export default Feed;
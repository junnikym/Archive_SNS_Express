import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './styles.css'

import { 
    Form,
    Button
} from 'react-bootstrap';

import ImageUploader from '../ImageUploader';

const Feed = (props) => (

    <div>

        <div id ="feed_banner">
            <center>
            <a><Link to = "/Profile/pk">
                <div className="imgUser"></div>
            </Link></a>
                <br/>
                <h3>NAME : {props.info?.name}</h3>
                    <br/>

            <h5><b>Hey Folks</b></h5>
            <h1><b>What's Up</b></h1>

            </center>
        </div>    

        <div className = "Feed">

                <Form
                    onSubmit={props.submit_handler}
                    method="post" >

                    <Form.Group controlId="Textarea">
                        <input
                            className = "input"
                            type="text"
                            name="title"
                            placeholder="Hey dude, write down a nice title!" 
                            value={props.post_info.title}
                            onChange={props.text_input_handler} />
                    </Form.Group>

                    <Form.Group controlId="Textarea">
                        <input 
                            className = "input" 
                            type="text"
                            name="text_content"
                            placeholder="Fill it up with cool content!" 
                            value={props.post_info.text_content}
                            onChange={props.text_input_handler} />
                    </Form.Group>

                    <ImageUploader 
                        upload = {props.upload}
                        uploader = {props.uploader}
                        post_info = {props.post_info}
                    />

                    <Button 
                        className = "submit_btn"
                        variant = "primary"
                        type = "submit" > 
                            <span>Post!</span>
                    </Button>

                </Form>
            
        </div>
        
    </div>
);

Feed.propTypes = {
	text_input_handler   	: PropTypes.func.isRequired,
    submit_handler		    : PropTypes.func.isRequired,
    uploader                : PropTypes.func.isRequired,
    
    post_info               : PropTypes.object.isRequired,
    upload                  : PropTypes.number.isRequired
    
};

export default Feed;
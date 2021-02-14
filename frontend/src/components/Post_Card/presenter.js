import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Like_button from "../Like"  
import Comment from "../Comment";

import { 
    Card,
    Button,
    Form
} from 'react-bootstrap';

export const Post_Card_Img = props => (
    <img src={"/static/" + props.img.url}/>
)

export const Post_Card_Img_Mini = props => (
    <img width="100px" src={"/static/" + props.img.url}/>
)

export const Post_Card_Img_Mini_Desc = props => (
    <div>
        <img width="100px" src={"/static/" + props.img.url}/>
        <div className="nMore"> {props.nRestImg} </div>
    </div>
)

const Post_Card = props => (
    
    <div className = "Post_Card">

        <Card>
                
            <Card.Body>

                {props.Post_img_loader()}

                <Card.Text>
                    <b> {props.Post_title} </b>
                    <hr/>
                        {props.Post_img}
                        {props.Post_text}
                </Card.Text>

                <Like_button/>

                <small className="text-muted">
                    Time : {props.Post_date}
                </small>

            </Card.Body>

            <Card.Footer>
                <Form.Group controlId="Textarea">
                    <Comment/>
                </Form.Group>

                <Button 
                    className = "button_right"
                    variant = "primary"
                    type = "submit" > 
                        <span>게시하기</span>
                </Button>
            </Card.Footer>
        </Card>
    
    </div>

);

export default Post_Card;
import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";

import styled  from 'styled-components';

import Like_button from "../Like"  
import Comment from "../Comment";

import { 
    Card,
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
    
        <Card className = "card">     

            <Card.Body>

                <Card.Text>
                    제목 : <b> {props.Post_title} </b>

                    <button
                        onClick = {props.delete_handler}
                        type = "submit">
                        <span>delete</span>
                    </button>

                    <Link to = "/Profile/pk" className = "imgUser"></Link>
                    {props.user_info}

                    <hr/>
                    내용 : {props.Post_text} 
                    <br/>
                    <br/>
                    {props.Post_img_loader()}
                </Card.Text>

            <small className="text-muted">
                Time : {props.Post_date}
            </small>

            <Like_button/>

        </Card.Body>

            <Card.Footer>
                
                <Comment post_pk={props.Post_pk}/> 
                post_pk : {props.Post_pk}

            </Card.Footer>
        </Card>

);

export default Post_Card;
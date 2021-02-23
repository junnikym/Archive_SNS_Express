import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";

import './styles.scss'
import styled  from 'styled-components';

import Like_button from "../Like"  
import Comment from "../Comment";

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
    
        <card> 
            <header>
            <h5>
                    <b> {props.Post_title} </b>
                    </h5>
                    {props.user_info}    
                    <br/>
                    
                    <button
                        className = "button"
                        onClick = {props.delete_handler}
                        type = "submit">
                        <div  className = "delete_btn"></div>
                    </button>
                    <Link to = "/Profile/pk" className = "imgUser"></Link>
            </header>    

            <body>
                <text>
                
                <br/><br/>
                    <hr/>
                    내용 : {props.Post_text} 
                    <br/>
                    <br/>
                    {props.Post_img_loader()}
                </text>

            <small className="text-muted">
                Time : {props.Post_date}
            </small>

            <hr/>

            <Like_button/>
        </body>

            <footer>
                
                <Comment post_pk={props.Post_pk}/> 
                post_pk : {props.Post_pk}

            </footer>
        </card>

);

export default Post_Card;
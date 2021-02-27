import React from 'react';
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";

import './styles.scss'

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

                <div className = "img_aside">
                    <Link to = "/Profile/pk">
                        <div className = "imgUser"></div>
                    </Link>
                </div>

                <div className = "Post_user_info">
                    <h5>
                        <span>{props.user_info}</span>
                    </h5>
                </div>

                    <br/>
                
            </header>    

            <body>
                <br/>
                <text>
                    <center>
                        <span><b>{props.Post_title}</b></span> <br/>
                        <span>{props.Post_text} </span>
                        {props.Post_img_loader()}<br/>
                        <span>{props.Post_time}</span>
                    </center>
                </text>
                <br/>

                <div className = "Post_buttons">
                    <button
                        className = "button"
                        onClick = {props.delete_handler}
                        type = "click">
                        <div  className = "delete_btn"></div>
                    </button>
                    <Like_button/>
                </div>
            <br/>
        </body>

            <footer>
                <Comment post_pk={props.Post_pk}/>
            </footer>
        </card>

);

export default Post_Card;
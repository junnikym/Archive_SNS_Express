import React from 'react';

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
    
    <div className = "Post_Card">

        <Card>
                
            <Card.Body>

                <Card.Text>
                    제목 : <b> {props.Post_title} </b>
                    <hr/>
                    내용 : {props.Post_text} 
                    <br/>
                    <br/>
                    {props.Post_img_loader()}
                </Card.Text>

                <Like_button/>

                <small className="text-muted">
                    Time : {props.Post_date}
                </small>

            </Card.Body>

            <Card.Footer>
                
                <Comment/> 

            </Card.Footer>
        </Card>
    
    </div>

);

export default Post_Card;
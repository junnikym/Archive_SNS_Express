import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { 
    Card,
    Button,
} from 'react-bootstrap';
import Post from '../Post';

const Post_Card = (props, contet) => (
    
        <div className = "Post_Card">

    <Card>
        <Card.Img 
        variant="top" 
        img src="/" onError="this.style.display='none'" alt='' 
        />
        <Card.Body>
            {props.Post_text}
        <Card.Text>
            
        </Card.Text>
            <Button 
                className="button_right" 
                variant="primary">
                    좋아요
                    </Button>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
    </Card>
    
        </div>

);

Post.propsTypes = {
    Post_text	    	: PropTypes.string.isRequired,
    Post_img        	: PropTypes.string.isRequired,
};

export default Post_Card;
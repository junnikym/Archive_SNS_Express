import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { 
    Card,
    Button,
} from 'react-bootstrap';

const Feed_Card = (props, contet) => (
    
        <div className = "Feed_Card">

    <Card>
    <Card.Header>박보성</Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>
                {' '}
                게시물
                {' '}
            </p>
            <footer className="blockquote-footer">
                박보성 작성
                <cite title="Source Title"> 시간 </cite>

                <div className = "Right">
                    <Button variant="info">Feed</Button> 
                    <Button variant="danger">Like</Button> <br/>
                    {' 좋아요를 눌으셨습니다. '}
                </div>
            </footer>
            </blockquote>
        </Card.Body>
    </Card>
        </div>


)

export default Feed_Card;
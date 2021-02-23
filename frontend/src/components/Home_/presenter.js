import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Feed from "../Feed";
import Post_Card from "../Post_Card";       
import Chat from "../Chat";

const Home_ = (props, contet) => (

  <Router>   

    {/* <Switch>
      <Route exact path ="/" component = {} />
    </Switch> */}
    
    {/* Post 쓰기 */}
    
    <Feed/>

    {/* Post 보기 */}
    {/* <Post/> */}
    <Post_Card/>

    <Chat/>

  </Router>

  
)

export default Home_;
import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';



import Feed from "../Feed";
// import Post from "../Post";
import Post_Card from "../Post_Card";       
// import User_list from "../User_list";


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

        </Router>


  )

export default Home_;
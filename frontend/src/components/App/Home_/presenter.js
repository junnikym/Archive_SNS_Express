import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from "../../Navigation";     
import Post_Card from "../../Post_Card";       
import User_list from "../../User_list"    
import Footer from "../../Footer"    

import Chat from "../../Chat"  

import Post from "../../Post";

const Home_ = (props, contet) => (
    

        <Router>   
          
          <Navigation />

          {/* <Switch>
            <Route exact path ="/" component = {} />
          </Switch> */}
          
          <User_list/>  
          
          {/* Post 쓰기 */}
          <Post/>

          {/* Post 보기 */}
          <Post_Card/>

          {/* <Chat/> */}
          <Footer/>
        </Router>


  )

export default Home_;
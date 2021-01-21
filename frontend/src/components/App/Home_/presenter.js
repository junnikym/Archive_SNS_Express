import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from "../../Navigation";     
import Feed_Card from "../../Feed_Card";       
import User_list from "../../User_list"    

import Post from "../../Post";

const Home_ = (props, contet) => (
    

        <Router>   
          
          <Navigation />
          <User_list/>
          <Post/>
          <Feed_Card/>
          
        </Router>


  )

export default Home_;
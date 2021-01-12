import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {Login, home} from './pages';

import Navigation from "./components/Nav";
import Content from "./components/Content";
import Footer_content from "./components/Footer";


import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'; 

function App(){
  return (
    <div className="App">
      <Router>

      <Navigation />
      <Content />
      <Route exact path='/home' component={home} />
      <Route exact path='/login' component={Login}/>

      <Footer_content/>
      </Router>
    </div>
  )
}
export default App;

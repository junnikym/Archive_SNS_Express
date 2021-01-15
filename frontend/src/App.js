import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {Login, home} from './pages';

import Navigation from "./components/Nav";
import Main from "./components/Main_Form";

//import Content from "./components/Content";
import Footer_content from "./components/Footer";


import 'bootstrap/dist/css/bootstrap.min.css';


import './css/App.css'

function App(){
  return (
    
    <div className="App">
      <Navigation />

      <Main />
        <Route exact path='/home' component={home} />
        <Route exact path='/login' component={Login}/>s

      <Footer_content/>
    </div>
  )
}
export default App;

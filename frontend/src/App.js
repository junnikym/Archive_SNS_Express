import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import __Main__ from "./pages/Main";

import Navigation from "./components/Nav";            // ================ Nav =================== // 
import {Login, home} from './pages';                  // ================ Pages ================= //
import Footer_content from "./components/Footer";     // ================ Footer ================ //   

import __banner__ from './components/banner';

import 'bootstrap/dist/css/bootstrap.min.css';

import './css/App.css';
import './css/components.css';


function App(){ 
  return (
    
    <div className="App">

      <__Main__ />

        <Router>
          <Navigation />

            <__banner__ />
            <Route exact path='/home' component={home} />
            <Route exact path='/login' component={Login}/>

          <Footer_content/>
        </Router>

      
    </div>
  )
}
export default App;

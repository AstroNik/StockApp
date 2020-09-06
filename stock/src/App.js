import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class App extends Component {
  render(){
    return (
        <Router>
          <div>
            <section>
              <NavBar/>
              <Switch>
                <Route exact path='/stock'  component={Home}/>
              </Switch>
            </section>
          </div>
        </Router>
    );
  }
}

export default App;

import React from 'react'
import './App.css';
import Home from "./component/Home"
import Review from "./component/Review"
import Login from "./component/Login"
import Register from "./component/Register"
import Write from "./component/Write"
import { BrowserRouter, Switch, Route } from "react-router-dom"

function App() {
	
  return (
		<div className = 'App'>
      <BrowserRouter>
			  <Switch>
				  <Route exact path="/" component={Login} />
          <Route path="/Review" component={Review} />
          <Route path="/Home" component={Home} />
          <Route path="/Register" component={Register} />
          <Route path="/Write" component={Write}/>
			  </Switch>
      </BrowserRouter>
	  </div>
  );
}

export default App;

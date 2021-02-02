import React from "react";
import { useState, useEffect } from "react";

// Import that manage the authentification system
import ProtectedRoute from "./ProtectedRoute";
import auth from './auth';


// Component that render some View
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Resource from "./components/Resource"
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';

import "./App.css";

// Material UI Import
import Container from "@material-ui/core/Container"


function App() {
  if (localStorage.auth_token !== undefined) {
    console.log('connecté')
  } else {
    console.log('hors ligne')
  }
console.log(localStorage.auth_token);
    if (localStorage.auth_token !== undefined) {
        return (

            <>
                <BrowserRouter>
                    <Router>
                        <Navigation/>
                        <Container maxWidth="lg">
                            <Switch>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <ProtectedRoute exact path="/home" component={Home}/>
                                <ProtectedRoute exact path="/categories" component={Categories}/>
                                <ProtectedRoute
                                    exact
                                    path="/categories/category"
                                    component={Category}
                                />
                                <ProtectedRoute
                                    exact
                                    path="/categories/category/resource"
                                    component={Resource}
                                />
                                <Route path="*" component={NotFound}/>
                            </Switch>
                        </Container>
                    </Router>
                </BrowserRouter>
            </>
        );
    } else {
        return (
            <>
                <BrowserRouter>
                    <Router>
                        <Navigation/>
                        <Container maxWidth="lg">
                            <Switch>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                 <Route path="/" component={Login}/>

                            </Switch>
                        </Container>
                    </Router>
                </BrowserRouter>
            </>
        )
    }


}

// Not found component
function NotFound() {
  return(
    <div>
      <h1>Not Found</h1>
    </div>
  )
}

export default withRouter(App);

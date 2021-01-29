import React from "react";
import { useState, useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Resource from "./components/Resource"
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import ContentContainer from "./components/ContentContainer";
import "./App.css";
import auth from './auth';


// Test Pages
import TestAllResources from "./components/TestAllResources";

function App() {
  
  return (
    <>
      <div className="page-container">
        <BrowserRouter>
          <Router>
            <Navigation />

            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/home" component={Home} />
              <ProtectedRoute exact path="/categories" component={Categories} />
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
              <ProtectedRoute exact path="/register" component={Register} />
              <Route
                exact
                path="/categories/testallresources"
                component={TestAllResources}
                title="This is a test"
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        <Footer />
        </BrowserRouter>
        
      </div>
      
    </>
  );
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

import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Register from "./components/Register";

// To remove 
import RessourceTest from "./components/RessourceTest";
import TestProtectedRoute from "./components/TestProtectedRoute";
import Footer from "./components/Footer";
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import ContentContainer from "./components/ContentContainer";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Container>
            <Navigation />
          </Container>

          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/home' component={Home} />
            <ProtectedRoute exact path='/categories' component={Categories} />
            <ProtectedRoute exact path='/register' component={Register} />
            <ProtectedRoute exact path='/ressourcetest' component={RessourceTest} />
            <ProtectedRoute exact path='/testprotectedroute' component={TestProtectedRoute} />
            <Route path="*" component={NotFound} />
          </Switch>
          

          <ContentContainer>
            <Container>
              <Footer />
            </Container>
          </ContentContainer>
        </Router>
      </BrowserRouter>
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

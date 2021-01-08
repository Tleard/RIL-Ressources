import React from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Register from "./components/Register";
import RessourceTest from "./components/RessourceTest";
import Footer from "./components/Footer";
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContentContainer from "./components/ContentContainer";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Container>
          <Navigation />
        </Container>

        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/categories' component={Categories} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/ressourcetest' component={RessourceTest} />
        </Switch>
        

        <ContentContainer>
          <Container>
            <Footer />
          </Container>
        </ContentContainer>
      </Router>
    </>
  );
}

export default App;

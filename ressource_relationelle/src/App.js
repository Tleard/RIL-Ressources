import React from "react";

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
import {useEffect, useState} from "react";
import {BrowserRouter as Router, BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import "./App.css";

// Material UI Import
import Container from "@material-ui/core/Container"
export function getRole() {

    return   fetch(`${global.api}/api/user/getRoles`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${auth.getToken()}`,
        },

    })
        .then(res => res.json())


}

function App() {
    const [roleTab, setRoleTab] = useState(
        null
    )
    useEffect(() => {
        if (localStorage.auth_token !== undefined) {
            getRole().then(({roles}) => setRoleTab(roles))
        }
    }, [])

        if (roleTab === 'admin') {
            return (
                <>
                    <BrowserRouter>
                        <Router>
                            <Navigation role={roleTab}/>
                            <Container maxWidth="lg">
                                <Switch>
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

            )
        } else if (roleTab === 'user') {
            return (
                <>
                    <BrowserRouter>
                        <Router>
                            <Navigation role={roleTab}/>
                            <Container maxWidth="lg">
                                <Switch>
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
        }
        else {
            return(

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

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
import Loader from "react-loader-spinner";
import BlockedUserList from "./components/BlockedUserList";
import BlockedResList from "./components/BlockedResList";
import ResRepList from "./components/ResRepList";

import "./App.css";

// Material UI Import
import Container from "@material-ui/core/Container"
import CategTools from "./components/CategTools";
import UserRepList from "./components/UserRepList";
import WarnList from "./components/WarnList";

export  const loaderStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
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
        'undef'
    )
    useEffect(() => {
        if (localStorage.auth_token !== undefined) {
            getRole().then(({roles}) => setRoleTab(roles))
        } else {
            setRoleTab(null);
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
                                <ProtectedRoute exact path="/categTools" component={CategTools}/>
                                <ProtectedRoute exact path="/home" component={Home}/>
                                <ProtectedRoute exact path='/blockedUser' component={BlockedUserList}/>
                                <ProtectedRoute exact path='/blockedRes' component={BlockedResList}/>
                                <ProtectedRoute exact path='/repResList' component={ResRepList}/>
                                <ProtectedRoute exact path='/repUserList' component={UserRepList}/>
                                <ProtectedRoute exact path='/warnList' component={WarnList} />
                                <Route path="*" component={Home}/>
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
                                    path="/category"
                                    component={Category}
                                />
                                <ProtectedRoute
                                    exact
                                    path="/resource"
                                    component={Resource}
                                />


                                <Route path="*" component={Home}/>
                            </Switch>
                        </Container>
                    </Router>
                </BrowserRouter>
            </>

        );
    }
    else if (roleTab == null){

        return(

            <BrowserRouter>
                <Router>
                    <Navigation/>
                    <Container maxWidth="lg">
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route path="*" component={Login}/>

                        </Switch>
                    </Container>
                </Router>
            </BrowserRouter>

        )
    } else {

        return(
            <Loader
                style={loaderStyle}
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
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
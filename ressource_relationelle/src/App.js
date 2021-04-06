import React from "react";
import {useEffect, useState} from "react";
import {BrowserRouter as Router, BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

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
import Loader from "react-loader-spinner";
import BlockedUserList from "./components/BlockedUserList";
import BlockedResList from "./components/BlockedResList";
import ResRepList from "./components/ResRepList";

import Profile from "./components/Profile"
import MyResources from "./components/MyResources";

import UserLibrary from "./components/UserLibrary";
import Publication from "./components/Publication";


import "./App.css";

// Material UI Import
import Container from "@material-ui/core/Container"
import CategTools from "./components/CategTools";
import UserRepList from "./components/UserRepList";
import WarnList from "./components/WarnList";
// cThe following import are used to customize Material UI Theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

const theme = createMuiTheme({
    palette: {

        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#404E88'
        }
    }
})



function App() {
    console.log(sessionStorage.getItem('idUser'))
    const [roleTab, setRoleTab] = useState(
        ''
    )
    useEffect(() => {

        if (sessionStorage.getItem('auth_token') !== null) {
         return getRole().then(({roles}) => setRoleTab(roles))
        } else {
            setRoleTab(null);
        }
    }, [])

    if (roleTab === 'admin') {
        return (
            <>

                <ThemeProvider theme={theme}>
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
                                    <ProtectedRoute exact path='/resource' component={Resource} />
                                    <ProtectedRoute exact path='/profile' component={Profile} />

                                    <Route path="*" component={Home}/>
                                </Switch>
                            </Container>
                        </Router>
                    </BrowserRouter>
                </ThemeProvider>
            </>

        )
    } else if (roleTab === 'user') {
        return (
          <>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <Router>
                  <Navigation role={roleTab} />
                  <Container maxWidth="lg">
                    <Switch>
                      <ProtectedRoute exact path="/home" component={Home} />
                      <ProtectedRoute
                        exact
                        path="/categories"
                        component={Categories}
                      />
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
                      <ProtectedRoute
                        exact
                        path="/userlibrary"
                        component={UserLibrary}
                      />
                      <ProtectedRoute
                        exact
                        path="/publication"
                        component={Publication}
                      />
                      <ProtectedRoute
                        exact
                        path="/me"
                        component={MyResources}
                      />
                      <ProtectedRoute
                        exact
                        path="/profile"
                        component={Profile}
                      />
                      <Route path="*" component={Home} />
                    </Switch>
                  </Container>
                </Router>
              </BrowserRouter>
            </ThemeProvider>
          </>
        );
    }
    else if (roleTab == null){

        return(

            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
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
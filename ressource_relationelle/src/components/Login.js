import React, {useState} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import '../global';
import auth from '../auth';
import './Login.css';
import {getRole} from "../App";

// Material UI Import
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

// Material UI lab Imprt
import Alert from "@material-ui/lab/Alert";

const Login  = (props) => {
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    const payload = {
        username:`${usernameState}`,
        password:`${passwordState}`
    }

    function login() {
        fetch(`${global.api}/log-in`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((data)=>{

            storeTokenInLocalStorage(data.token);
            storeIdInLocalStorage(data.user.id);

            auth.loggedin();

        })
        .then(() => {
            //props.history.push('home');
            // return <Redirect to="home"/>
            // !!! The window.location.href is bad. But I couldn't find any fix yet. !!! The page need to be refresh to be logged. 
           window.location.href = "http://localhost:3000/home";
        });
    }

    // Store in localstorage
    function storeTokenInLocalStorage(token) {
        localStorage.removeItem('auth_token');
        localStorage.setItem('auth_token', JSON.stringify(token));
    }

    // Store Id in localstorage
    function storeIdInLocalStorage(idUser) {
      localStorage.removeItem('idUser');
      localStorage.setItem('idUser', JSON.stringify(idUser));
    }

    if (localStorage.auth_token !== undefined) {
        return (
          <>
            <Container component="main" maxWidth="xs">
              <Box my={3}>
                <Typography component="h1" variant="h3">
                  Connexion
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Box my={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="login"
                      variant="outlined"
                      required
                      id="login"
                      label="Nom d'Utilisateur"
                      autoFocus
                      onChange={(e) => {
                        setUsernameState(e.target.value);
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>
              <Grid container spacing={2}>
                <Box my={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="password"
                      variant="outlined"
                      required
                      id="password"
                      label="Mot de passe"
                      autoFocus
                      type="password"
                      onChange={(e) => {
                        setPasswordState(e.target.value);
                      }}
                    />
                  </Grid>
                </Box>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={login}
                  >
                    Connexion
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </>
        );
    }
}
 
export default withRouter(Login);
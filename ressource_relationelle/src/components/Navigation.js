import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth';
import { withRouter } from 'react-router-dom';
import {getRole} from "../App";
import NavDrawer from "./NavDrawer"


// Import from MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {getRoles} from "@testing-library/dom";

// Import for responsive Navbar
import { useMediaQuery, useTheme } from '@material-ui/core'

const Navigation = (props) => {

// MaterialUI logic
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


  const classes = useStyles();

<<<<<<< HEAD
console.log(props)
=======
// Breakpoints
const theme = useTheme();

const isMatch = useMediaQuery(theme.breakpoints.down('md'));


>>>>>>> origin/develop

if (props.role === 'admin') {
      return (
          <AppBar position="static">
            <Toolbar>
              <Typography component={Link} to="/" variant="h6" className={classes.title}>
                Aide
              </Typography>
                    <Typography component={Link} to="/home" variant="h6" className={classes.title}>
                Panneau d'administration
              </Typography>


              <Button color="inherit" onClick={() => {
                auth.loggedout(() => {
                  console.log('callback in test');
                    window.location.assign("http://localhost:3000/login");
                });
              }}>Logout</Button>
            </Toolbar>
          </AppBar>
      )
    } else if (props.role === 'user') {
      return (
<<<<<<< HEAD

          <>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon/>
                </IconButton>
                <Typography component={Link} to="/home" variant="h6" className={classes.title}>
                  Accueil
                </Typography>
                <Typography component={Link} to="/" variant="h6" className={classes.title}>
                  Fil d'actualité
                </Typography>
                <Typography component={Link} to="/categories" variant="h6" className={classes.title}>
                  Catégories
                </Typography>
                <Typography component={Link} to="/" variant="h6" className={classes.title}>
                  Publier
                </Typography>
                  <Typography component={Link} to="/me" variant="h6" className={classes.title}>
                      Mes Ressources
                  </Typography>
                <Typography component={Link} to="/" variant="h6" className={classes.title}>
                  Aide
                </Typography>

                  <Button color="inherit" onClick={() => {
=======
        <>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton> */}

              {isMatch ? (
                <NavDrawer />
              ) : (
                <>
                  <Typography
                    color="secondary"
                    component={Link}
                    to="/home"
                    variant="h6"
                    className={classes.title}
                  >
                    Accueil
                  </Typography>
                  <Typography
                    color="secondary"
                    component={Link}
                    to="/categories"
                    variant="h6"
                    className={classes.title}
                  >
                    Catégories
                  </Typography>
                  <Typography
                    color="secondary"
                    component={Link}
                    to="/publication"
                    variant="h6"
                    className={classes.title}
                  >
                    Publier
                  </Typography>
                  <Typography
                    color="secondary"
                    component={Link}
                    to="/userlibrary"
                    variant="h6"
                    className={classes.title}
                  >
                    Ma Bibliothèque
                  </Typography>

                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
>>>>>>> origin/develop
                      auth.loggedout(() => {
                        console.log("callback in test");
                        window.location.assign("http://localhost:3000/login");
                      });
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </>
      );
    }
    else {
      return (

          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon/>
              </IconButton>
              <Button variant="outlined" color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">S'inscrire</Button>
            </Toolbar>
          </AppBar>
      )
    }

}

export default withRouter(Navigation);

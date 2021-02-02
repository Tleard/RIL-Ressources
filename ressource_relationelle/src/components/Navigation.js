import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth';
import { withRouter } from 'react-router-dom';

// Import from MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  if (localStorage.auth_token !== undefined) {
  return (

    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
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
          <Typography component={Link} to="/" variant="h6" className={classes.title}>
            Aide
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" onClick={() => {
                      auth.loggedout(() => {
                          console.log('callback in test');
                          props.history.push('/login');
                      });
            }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
} else  {
    return(
    <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">S'inscrire</Button>
      </Toolbar>
    </AppBar>
  </>)
  }
}

export default withRouter(Navigation);

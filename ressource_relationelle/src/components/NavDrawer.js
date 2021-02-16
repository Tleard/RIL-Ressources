import React from 'react'
import { useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import auth from '../auth';
import { Link } from 'react-router-dom';

// Material UI import
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Import from MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

function NavDrawer() {
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
        menuIconContainer : {
            marginLeft: 'auto',
        },
        paper: {
          background: "#009688",
        }
    }));


  const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(true);

    return (
        <>
            <Drawer
                anchor="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                classes={{ paper: classes.paper }}
            >
                <div style={{
                    display:"flex", 
                    flexDirection:"column",
                    justifyContent:"space-between",
                    backgroundColor:"#009688",           
                    }}>
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
                    to="/"
                    variant="h6"
                    className={classes.title}
                  >
                    Aide
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
                    color="inherit"
                    onClick={() => {
                      auth.loggedout(() => {
                        console.log("callback in test");
                        window.location.assign("http://localhost:3000/login");
                      });
                    }}
                  >
                    Logout
                  </Button>
                </div>
            </Drawer>
            <IconButton className={classes.menuIconContainer} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default NavDrawer

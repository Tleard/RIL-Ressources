import React, {useEffect, useState} from "react";


import auth from "../auth.js";

import "./Home.css";
import {getRole, loaderStyle} from "../App";
import Loader from "react-loader-spinner";
import AdminDash from "./AdminDash";

// Material UI import
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

// Components import
import HomeCarousel from "./HomeCarousel";

// CSS used inside the component
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});



function Home() {


    const [resources, setResources] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            const getResources = async () => {
                const resourcesFromServer = await fetchResources();
                // Careful, we use the reverse() method to have a desc order list
                setResources(resourcesFromServer.reverse());
            };

            getResources();

        }
    }, []);
    const fetchResources = async () => {
        const res = await fetch(`${global.api}/api/resources/`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`,
            },
        });
        return await res.json();
    };
//console.log(resources);
    const lastResources = resources.slice(0, 3);
    console.log(lastResources);

    const [roleTab, setRoleTab] = useState(
        null
    )
    useEffect(() => {

            getRole().then(({roles}) => setRoleTab(roles))
        }
        , [])
    if (localStorage.auth_token !== undefined) {

        if (roleTab === 'admin'){

            return (

                <>
                    <AdminDash>


                    </AdminDash>

                </>
            );
        } else if (roleTab === 'user') {

            return (
                <>
                    <HomeCarousel />
                    <Typography variant="h2" component="h2">
                        Dernières ressources
                    </Typography>
                    <Grid container spacing={5}>
                        {lastResources.map((resource) => (
                            <Grid item xs={12} sm={3} key={resource.id}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {resource.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                            >
                                                {resource.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Consulter
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            );
        } else  {
            return (
                <Loader
                    style={loaderStyle}
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            );

        }
    }




    // Fetch Resources



}

export default Home;
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
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
import Box from '@material-ui/core/Box'
// Material UI import for Form Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Components import
import HomeCarousel from "./HomeCarousel";

// CSS used inside the component
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function Home() {


    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [resources, setResources] = useState([]);
    const classes = useStyles();


    const handleChange = (event) => {
        //setCategories(event.target.value);
        setSelectedCategory(event.target.value);
    };


    useEffect(() => {
        if (sessionStorage.getItem("auth_token") !== null) {
            const getCategories = async () => {
                const categoriesFromServer = await fetchCategories();
                setCategories(categoriesFromServer);
            };

            const getResources = async () => {
                const resourcesFromServer = await fetchResources();
                // Careful, we use the reverse() method to have a desc order list
                setResources(resourcesFromServer.reverse());
            };

            getCategories();

            getResources();
        }
    }, []);

    const fetchCategories = async () => {
        const res = await fetch(`${global.api}/api/resources_category`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`,
            },
        });
        return await res.json();
    };

    const fetchResources = async () => {
        const res = await fetch(`${global.api}/api/resources/`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`,
            },
        });
        return await res.json()
    };

    const lastResources = resources.slice(0, 3);

    const [roleTab, setRoleTab] = useState(null);
    useEffect(() => {
        getRole().then(({ roles }) => setRoleTab(roles));
    }, []);

    if (sessionStorage.getItem("auth_token") !== null) {
        if (roleTab === "admin") {
            return (
                <>
                    <AdminDash></AdminDash>
                </>
            );
        } else if (roleTab === "user") {
            return (
                <>
                    <HomeCarousel />
                    <Box my={3}>
                        <Typography
                            variant="h2"
                            component="h2"
                            style={{ textAlign: "center" }}
                        >
                            Dernières ressources
                        </Typography>
                    </Box>
                    <Grid container spacing={5} alignContent="center">
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
                                            <Link
                                                key={resource.id}
                                                to={{

                                                    pathname: "resource",
                                                    state : {
                                                        role : ''
                                                    },
                                                    hash: `${resource.id}`,
                                                }}
                                            >
                                                Consulter
                                            </Link>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Choisissez une catégorie à consulter
                                    </Typography>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">
                                            Catégorie
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categories.name}
                                            onChange={handleChange}
                                        >
                                            {categories.map((category) => {
                                                return (
                                                    <MenuItem value={category.name}>
                                                        {category.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">
                                        <Link
                                            to={{ pathname: "category", hash: `${selectedCategory}` }}
                                        >
                                            Voir la catégorie
                                        </Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </>
            );
        } else {
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

        // Fetch Resources
    }


}

export default Home;
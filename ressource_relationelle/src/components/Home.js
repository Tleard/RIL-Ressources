import React from "react";
import { useState, useEffect } from "react";
import auth from "../auth.js";
import "./Home.css";

// Material UI import
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

  // Fetch Resources
  const fetchResources = async () => {
    const res = await fetch(`${global.api}/api/resources/`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
    const data = await res.json();

    return data;
  };
  //console.log(resources);
  const mostRecentResources = resources.splice(3, resources.length);
  console.log(mostRecentResources);
  
  return (
    <>
      <HomeCarousel />


      <Typography variant="h2" component="h2">
        Dernières ressources
      </Typography>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Home;

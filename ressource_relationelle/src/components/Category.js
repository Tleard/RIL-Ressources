// This compenent contains the resources of ONE chosen category 
import React from 'react';
import auth from '../auth';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// MaterialUI import
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


// MaterialUI Icon Import
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ReportIcon from '@material-ui/icons/Report';

// MaterialUI Lab 
import { Alert, AlertTitle } from "@material-ui/lab";

function Category(props) {
  // The category name is passed through the hash props in Categories.js
  const categoryName = props.location.hash.substring(1);

  const [resources, setResources] = useState([]);
  //const [categoryTitle, setCategoryTitle] = useState([]);


  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResources = async () => {
        const resourcesFromServer = await fetchResources();
        setResources(resourcesFromServer);
      };

      getResources();
      
    }
  }, []);

  // Fetch Resources
  const fetchResources = async () => {
    const res = await fetch(`${global.api}/api/resources/category/${categoryName}`, {
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
  
  return (
    
    <>
      <Typography variant="h2" component="h1" style={{margin:"4% 0 4% 0"}}>
        Ressources pour : {categoryName}
      </Typography>
      <Grid container spacing={3}>
          {typeof resources[0] !== "string" ?
              resources.map((resource) => {
                // To format the Date to dd/mm/YYYY
                const date = new Date(resource.createdAt);
                const day = date.getDate();
                const month = ("0" + date.getMonth()).slice(-1) + 1;
                const year = date.getFullYear();

                return (
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardHeader
                        title={resource.title}
                        subheader={`${resource.author.username} - ${day}/${month}/${year}`}
                        
                      />
                      <CardContent>
                        {resource.description}
                      </CardContent>
                      <CardActions style={{justifyContent:'flex-end'}}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="report">
                          <ReportIcon />
                        </IconButton>
                        <Button size="medium" color="primary">
                          <Link
                            key={resource.id}
                            //to={{pathname: "category/resource", state: {id: resource.id}}}
                            to={{pathname: "resource", hash:`${resource.id}`}}
                          >
                            Consulter
                          </Link> 
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
                      
              })
              : <Alert severity="info">
                  <AlertTitle>Attention</AlertTitle>
                  Cette catégorie n'a pas encore de ressource
                </Alert>
            }
      </Grid>
    </>
  );
}

export default Category

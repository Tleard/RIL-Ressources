// Component containing a chosen ressource
import React from 'react'
import { useState, useEffect } from 'react'
import "./Resource"
import auth from '../auth'

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


import ResourceCardDetail from './ResourceCardDetail'

function Resource(props) {
    const {id}  = props.location.state;
    console.log(id);

    const [resource, setResource] = useState();

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
          const getResources = async () => {
            const resourcesFromServer = await fetchResource();
            setResource(resourcesFromServer);
          };
    
          getResources();
          
        }
      }, []);

    // Fetch One Ressource
    const fetchResource = async () => {
        const res = await fetch(`${global.api}/api/resources/${id}`, {
            method: "get",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: `Bearer ${auth.getToken()}`,
            },
        })
        const data = await res.json();
    
        return data;
    }
    console.log(resource);
    //console.log(resource[0].id);

    // To format the Date to dd/mm/YYYY
    // const date = new Date(resource.createdAt);
    // const day = date.getDate();
    // const month = ("0" + date.getMonth()).slice(-1) + 1;
    // const year = date.getFullYear();

    return (
      <>
        <h1>This is only ONE resource.</h1>
        <Card variant="outlined">
          <CardHeader
            //title={resource[0].title}
            // subheader={`${resource.author.username} - ${day}/${month}/${year}`}
          />
          {/* <CardContent>{resource[0].description}</CardContent> */}
          <CardActions style={{ justifyContent: "flex-end" }}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>

        {/* <ResourceCardDetail {...resource[0]}/> */}
      </>
    );
}

export default Resource

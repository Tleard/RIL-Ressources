// Component containing a chosen ressource
import React from "react";
import { useState, useEffect } from "react";
import "./Resource";
import auth from "../auth";
import userlib from "../userLibraryFunctions";

// MaterialUI import
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

// MaterialUI Icon Import
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";

function Resource(props) {
  //const {id}  = props.location.state;
  const id = props.location.hash.substring(1);

  const [resource, setResource] = useState([]);
  const [libResources, setLibResources] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResource = async () => {
        const resourceFromServer = await fetchResource();
        setResource(resourceFromServer);
      };

      const getUserLibrary = async () => {
        const resourcesFromServer = await fetchLibResources();
        setLibResources(resourcesFromServer);
      };

      getResource();
      getUserLibrary();
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
    });
    const data = await res.json();

    return data;
  };

  // Fetch User's saved resources
  const fetchLibResources = async () => {
    const res = await fetch(`${global.api}/api/user/getLib`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
    const data = await res.json();

    return data;
  };

  // The condition check if the User has something in his library.
  if (libResources.length > 0) {
    resource.forEach((resource) => {
      resource["inLibrary"] = false;
      for (let libResource of libResources) {
        if (libResource.id === resource.id) {
          resource["inLibrary"] = true;
          break;
        }
      }
    });
  }

  console.log(resource);

  return (
    <>
      <Box my={3}>
        <Typography component="h1" variant="h2">
          {resource.map((resource) => {
            return (
              <Typography component="h2" variant="h3">
                Resource : {resource.title}
              </Typography>
            );
          })}
        </Typography>
      </Box>
      {resource.map((resource) => {
        // To format the Date to dd/mm/YYYY
        const date = new Date(resource.createdAt);
        const day = date.getDate();
        const month = ("0" + date.getMonth()).slice(-1) + 1;
        const year = date.getFullYear();
        return (
          <Card variant="outlined">
            <CardHeader
              key={resource.id}
              title={resource.title}
              subheader={`${resource.author.username} - ${day}/${month}/${year}`}
            />
            <CardContent>{resource.description}</CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <IconButton aria-label="add to favorites">
                {resource.inLibrary === true ? (
                  <FavoriteIcon
                    color="primary"
                    onClick={() => {
                      userlib.removeFromLibrary(resource.id);
                      const getResources = async () => {
                        const libResources = await fetchLibResources();
                        if (libResources.length > 0) {
                          setLibResources(libResources);
                        } else {
                          setLibResources([0]);
                        }
                      };

                      getResources();
                    }}
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() => {
                      userlib.saveInLibrary(resource.id);
                      const getResources = async () => {
                        const libResources = await fetchLibResources();
                        setLibResources(libResources);
                      };

                      getResources();
                    }}
                  />
                )}
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="report">
                <ReportIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default Resource;

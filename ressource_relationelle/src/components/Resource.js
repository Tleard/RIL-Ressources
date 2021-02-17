// Component containing a chosen ressource
import React from "react";
import { useState, useEffect } from "react";
import "./Resource";
import auth from "../auth";
import userlib from "../userLibraryFunctions";
import moment from 'moment';
import 'moment/locale/fr';

// MaterialUI import
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// MaterialUI Icon Import
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReportIcon from "@material-ui/icons/Report";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Badge from '@material-ui/core/Badge';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

function Resource(props) {
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

  //Fetch User's saved resources
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


  //The condition check if the User has something in his library.
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

  let localStorageId = localStorage.idUser.substring(1, localStorage.idUser.length - 1);
  
  // Checking if a resource was already "liked" or not
  let hasLiked = false;
  for(let object of resource) {
    for(let prop of object.reactions) {
      if(prop.user === localStorageId){
        hasLiked = true;
      }
    }
  }

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
        const date = new Date(resource.createdAt);

        return (
          <Card variant="outlined">
            <CardHeader
              key={resource.id}
              title={resource.title}
              subheader={`${resource.author.username} - ${moment(date).format('L')}`}
            />
            <CardContent>{resource.description}</CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <IconButton aria-label="add to favorites">
                {resource.inLibrary === true ? (
                  <FavoriteIcon
                    color="primary"
                    onClick={async () => {
                      const removeFromLibrary = () => {
                        return new Promise((resolve,reject) => {
                          resolve(userlib.removeFromLibrary(resource.id))
                        })
                      }
                      const getResources = async () => {
                        const libResources = await fetchLibResources();
                        if (libResources.length > 0) {
                          setLibResources(libResources);
                        } else {
                          setLibResources([0]);
                        }
                      };
                      await removeFromLibrary();
                      await getResources();
                    }}
                  />
                ) : (
                  resource.author.id !== localStorageId ?
                  <FavoriteIcon
                    onClick={async () => {
                      const saveFavorite = () => {
                        return new Promise((resolve, reject) => {
                          resolve(userlib.saveInLibrary(resource.id))
                        })
                      }
                      const getResources = async () => {
                        
                        const libResources = await fetchLibResources();
                        setLibResources(libResources);
                      };
                      await saveFavorite();
                      await getResources();
                    }}
                  />
                  :
                  <NotInterestedIcon/>
                )}
              </IconButton>
              <IconButton aria-label="like">
              <Badge badgeContent={resource.reactions.length} color="primary">
                {hasLiked ? (
                  <ThumbUpIcon 
                  color="primary"
                />
                ) : (
                  <ThumbUpIcon 
                  onClick={async () => {
                    const saveReaction = () => {
                      return new Promise((resolve,reject) => {
                        resolve(userlib.postReactionLike(resource.id));
                      })
                    }
                    const getResources = async () => {                      
                      const resource = await fetchResource();
                      setResource(resource);
                    };
                    await saveReaction();
                    await getResources();
                  }}
                />
                )}
              </Badge>
              </IconButton>
              <IconButton aria-label="report">
                <ReportIcon 
                  onClick={() => {
                    userlib.reportResource(resource.id);
                    const getResources = async () => {
                      const resource = await fetchResource();
                      setResource(resource);
                    }

                    getResources();
                  }}
                />
              </IconButton>
              <IconButton>
                      {resource.author.id !== localStorageId ? 
                        <ReportProblemIcon 
                        onClick={() => {
                          userlib.reportUser(resource.author.id);
                          const getResources = async () => {
                            const resource = await fetchResource();
                            setResource(resource);
                          }
      
                          getResources();
                        }}
                      />
                      : 
                        <NotInterestedIcon/>
                      }                      
                    </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default Resource;

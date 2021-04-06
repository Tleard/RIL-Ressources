// This compenent contains the resources of ONE chosen category

import React from "react";
import auth from "../auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userlib from "../userLibraryFunctions";
import moment from 'moment';
import 'moment/locale/fr';


// MaterialUI import
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// MaterialUI Icon Import
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReportIcon from "@material-ui/icons/Report";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Badge from '@material-ui/core/Badge';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// MaterialUI Lab

import {Alert, AlertTitle} from "@material-ui/lab";


function Category(props) {
  // The category name is passed through the hash props in Categories.js
  const categoryName = props.location.hash.substring(1);

  const [resources, setResources] = useState([]);
  const [libResources, setLibResources] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getResources = async () => {
        const resourcesFromServer = await fetchResources();
        setResources(resourcesFromServer);
      };

      const getUserLibrary = async () => {
        const resourcesFromServer = await fetchLibResources();
        setLibResources(resourcesFromServer);
      };

      getResources();
      getUserLibrary();
    }
  }, []);

  // Fetch Resources
  const fetchResources = async () => {
    const res = await fetch(
        `${global.api}/api/resources/category/${categoryName}^createdAt=ASC`,
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${auth.getToken()}`,
          },
        }
    );
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
    return await res.json();
  };

  // The condition check if the User has something in his library.
  if (libResources.length > 0) {
    resources.forEach((resource) => {
      if(typeof resource !== "string"){
        resource["inLibrary"] = false;
        for (let libResource of libResources) {
          if (libResource.id === resource.id) {
            resource["inLibrary"] = true;
            break;
          }
        }
      }
    });
  }

  let localStorageId = localStorage.idUser.substring(1, localStorage.idUser.length - 1);
  // Loop and Conditional to check if a resource was already "liked" or not by the current user
  for(let object of resources) {
    if(typeof object !== "string"){
      object["hasLiked"] = false;
      for(let prop of object.reactions) {
        if(prop.user === localStorageId) {
          object["hasLiked"] = true;
          break;
        }
      }
    }
  }

  return (
      <>
        <Typography variant="h2" component="h1" style={{ margin: "4% 0 4% 0" }}>
          Ressources pour : {categoryName}
        </Typography>
        <Grid container spacing={3}>
          {typeof resources[0] !== "string" ? (
              resources.map((resource) => {
                if(resource.isBlocked !== true) {
                  const date = new Date(resource.createdAt);

                  return (
                      <Grid item xs={12}>
                        <Card variant="outlined">
                          <CardHeader
                              title={resource.title}
                              subheader={`${resource.author.username} - ${moment(date).format('L')}`}
                          />
                          <CardContent>{resource.description}</CardContent>
                          <CardActions style={{ justifyContent: "flex-end" }}>
                            <IconButton aria-label="add to favorites">
                              {resource.inLibrary === true ? (
                                  <FavoriteIcon
                                      color="primary"
                                      onClick={ async () => {
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
                              <Badge
                                  badgeContent={resource.reactions.length}
                                  color="primary"
                              >
                                {resource.hasLiked ? (
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

                                            const resources = await fetchResources();
                                            setResources(resources);
                                          };
                                          await saveReaction();
                                          await getResources();
                                        }}
                                    />
                                )
                                }
                              </Badge>
                            </IconButton>
                            <IconButton aria-label="report">
                              <ReportIcon
                                  onClick={() => {
                                    userlib.reportResource(resource.id);
                                    const getResources = async () => {
                                      const resource = await fetchResources();
                                      setResources(resource);
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
                                          const resource = await fetchResources();
                                          setResources(resource);
                                        }

                                        getResources();
                                      }}
                                  />
                                  :
                                  <NotInterestedIcon/>
                              }
                            </IconButton>
                            <IconButton aria-label="profile">
                              {/* <AccountCircleIcon>
                        <Link
                          key={resource.id}
                          to={{
                            pathname: "profile",
                            state : {
                              role : ''
                            },
                            hash: `${resource.author.id}`
                          }}
                        />
                      </AccountCircleIcon> */}
                              <Link
                                  key={resource.id}
                                  to={{
                                    pathname: "profile",
                                    state : {
                                      role : ''
                                    },
                                    hash: `${resource.author.id}`
                                  }}
                              >
                                <AccountCircleIcon/>
                              </Link>
                            </IconButton>
                            <Button size="medium" color="primary">
                              <Link
                                  key={resource.id}
                                  //to={{pathname: "category/resource", state: {id: resource.id}}}
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
                  );
                }

              })
          ) : (
              <Alert severity="info">
                <AlertTitle>Attention</AlertTitle>
                Cette catégorie n'a pas encore de ressource
              </Alert>
          )}
        </Grid>
      </>
  );
}

export default Category;
// Component containing a chosen ressource

import React, {useEffect, useState} from "react";
import "./Resource";
import auth from "../auth";
import userlib from "../userLibraryFunctions";
import moment from 'moment';
import 'moment/locale/fr';
// MaterialUI import
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// MaterialUI Icon Import
import ShareIcon from "@material-ui/icons/Share"
import {Input} from "@material-ui/core";
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


//const {id}  = props.location.state;


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
      return await res.json();
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
      return await res.json();
  };




    // Fetch One Ressource
    if (props.location.state.role !== 'admin'){
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
     } else if (props.location.state.option === "deblock"){
        const btnStyleDes = {
            backgroundColor : 'green',

            borderRadius : '0%',

            width : '10rem',
            color : "white",
            boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            fontWeight: "500",
            lineHeight: "1.75",
            letterSpacing: "0.02857em",



        }

        const cardBtn = {
            display : "flex",
            justifyContent : "flex-end",
            marginBottom : '2rem',
            marginRight : '1rem'
        }

        const deblockRes = (e) => {
            console.log(e)
            const name = e.target.name

            const playload = {
                r : name
            }
            fetch(
                `${global.api}/api/admin/deblockRes`,{
                    method : 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.getToken()}`

                    },
                    body: JSON.stringify(playload),
                }).then((res) => {

                window.location.assign("http://localhost:3000/blockedRes");
            })
        }
        return (

            <>
                <h1>This is only ONE resource.</h1>
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
                            <div style={cardBtn}>
                                <Input type={"submit"} onClick={(e) => deblockRes(e)} name={resource.id}  style={btnStyleDes}  value={'DEBLOQUER'}/>
                            </div>
                        </Card>
                    );
                })}
            </>
        )


    }

    else {
        const btnStyleBlock = {
            backgroundColor : 'red',

            borderRadius : '0%',

            width : '10rem',
            color : "white",
            boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            fontWeight: "500",
            lineHeight: "1.75",
            letterSpacing: "0.02857em",

        }
        const btnStyleClose = {
            backgroundColor : '#FFB833',

            borderRadius : '0%',

            width : '10rem',
            color : "white",
            boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            fontWeight: "500",
            marginLeft : "2rem",
            lineHeight: "1.75",
            letterSpacing: "0.02857em",

        }

        const cardBtn = {
            display : "flex",
            justifyContent : "flex-end",
            marginBottom : '2rem',
            marginRight : '1rem'
        }

        const blockRes = (e) => {

            const name = e.target.name

            const playload = {
                r : name

            }
            fetch(
                `${global.api}/api/admin/closeandblockres`,{
                    method : 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.getToken()}`

                    },
                    body: JSON.stringify(playload),
                }).then((res) => {

                window.location.assign("http://localhost:3000/repResList");
            })
        }

        const closeReport = (e) => {

            const name = e.target.name

            const playload = {
                r : name

            }
            fetch(
                `${global.api}/api/admin/closeReport`,{
                    method : 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.getToken()}`

                    },
                    body: JSON.stringify(playload),
                }).then((res) => {

                window.location.assign("http://localhost:3000/repResList");
            })
        }
        return (
            <>
                <h1>This is only ONE resource.</h1>
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
                            <div style={cardBtn}>

                            </div>
                            </Card>
                    );
                })}
            </>
        )
    }




}

export default Resource;

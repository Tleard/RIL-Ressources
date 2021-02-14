import auth from "../auth";
import React, {useEffect, useState} from "react";
import {Container, List, ListItem, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import userlib from "../userLibraryFunctions";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import {Link} from "react-router-dom";


function Profile(props){
    const picProfile = {
        borderRadius : '100%',
        backgroundColor : 'white',
        height : '10rem',
        width : '10rem',
        marginRight : 'auto',
        marginLeft : 'auto',

    }

    const jumbo = {
        display : 'block',
        justifyContent : 'center',
        backgroundColor : 'grey',
        paddingTop : '3rem',
        paddingBottom : '3rem',
    }
    const centerText = {
       textAlign : 'center'

    }
    const id = props.location.hash.substring(1);
    const [user, setUser] = useState([])
    useEffect( () => {
        const getUser = async () => {
            const userFromApi = await fetchUser();
            setUser(userFromApi)
        };
        getUser()
    }, [])
    const fetchUser = async () => {
        const res = await fetch(
            `${global.api}/api/user/${id}`, {
                method : 'get',
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            }
        )
        return await res.json()
    }
    const [res, setRes] = useState([])
    useEffect( () => {
        const getRes = async () => {
            const ResFromApi = await fetchRes();
            setRes(ResFromApi)
        };
        getRes()
    }, [])
    const fetchRes = async () => {
        const res = await fetch(
            `${global.api}/api/resources/user/${id}`, {
                method : 'get',
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            }
        )
        return await res.json()
    }
    const marginCard = {
        marginTop : '1rem',
        marginBottom : '1rem'
    }
    user.password = "";

    console.log(res)
    console.log(user)
    if (props.location.state.role !== 'admin') {
        return (


            <>
                <Container style={jumbo}>
                    <div style={picProfile}>

                    </div>
                    <h3 style={centerText}> {user.username} </h3>
                </Container>
                <Container>
                    <List>
                        <ListItem>
                            <Typography>
                                Ressources publiées : {res.length}
                            </Typography>
                        </ListItem>
                    </List>
                </Container>

            {res.map((r) => {
                // To format the Date to dd/mm/YYYY
                const date = new Date(r.createdAt);
                const day = date.getDate();
                const month = ("0" + date.getMonth()).slice(-1) + 1;
                const year = date.getFullYear();
                return (
                    <Card variant="outlined">
                        <CardHeader
                            key={r.id}
                            title={r.title}
                            subheader={`${r.author.username} - ${day}/${month}/${year}`}
                        />
                        <CardContent>{r.description}</CardContent>
                        <CardActions style={{ justifyContent: "flex-end" }}>

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
    )
    } else {

        return (


            <>
            <Container style={jumbo}>
                <div style={picProfile}>

                </div>
                <h3 style={centerText}> {user.username} </h3>
            </Container>
            <Container>
                <List>
                    <ListItem>
                        <Typography>
                            Ressources publiées : {res.length}
                        </Typography>
                    </ListItem>
                </List>
            </Container>
                {res.map((r) => {
                        const date = new Date(r.createdAt);
                        const day = date.getDate();
                        const month = ("0" + date.getMonth()).slice(-1) + 1;
                        const year = date.getFullYear();
                        const end = {
                            display : 'flex',
                            justifyContent : 'flex-end'
                        }
                        return (
                        <Card style={marginCard} variant="outlined">
                            <CardHeader
                                key={r.id}
                                title={r.title}
                                subheader={`${day}/${month}/${year}`}
                            />
                            <CardContent>{r.description}</CardContent>
                            <CardActions style={end}>
                                <Link
                                      key={r.id}
                                    //   params={{ role : "admin" }}
                                    //to={{pathname: "category/resource", state: {id: resource.id}}}
                                      to={{
                                          pathname: "resource",
                                          state: {
                                              role: 'admin',
                                              rep : r.id
                                          },
                                          hash: `${r.id}`,
                                      }}
                                > VOIR </Link>
                            </CardActions>
                        </Card>
                        )
                    }
                )}
            </>
                ) }
}

export default Profile
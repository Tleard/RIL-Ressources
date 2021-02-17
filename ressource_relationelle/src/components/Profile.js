import auth from "../auth";
import React, {useEffect, useState} from "react";
import {Container, Input, List, ListItem, Typography} from "@material-ui/core";
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
import Picture from '../assets/nopicture.png';
import Moment from "moment";
import Button from "@material-ui/core/Button";



function Profile(props){
    const picProfile = {
        borderRadius : '100%',
        backgroundColor : 'white',
        height : '15rem',
        width : '15rem',
        marginRight : 'auto',
        marginLeft : 'auto',
        display: 'flex',
        justifyContent: 'center',
        paddingTop : "3rem"

    }

    const imgprofile = {
        height : '9rem',
            width : '9rem',
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

    const dFlexAround = {
        display : 'flex',
        justifyContent : 'space-around'
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
    const btnStyleWarn = {
        backgroundColor : 'purple',

        borderRadius : '0%',

        width : '10rem',
        color : "white",
        boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        fontWeight: "500",
        marginLeft : "2rem",
        lineHeight: "1.75",
        letterSpacing: "0.02857em",

    }
    const btnStyleLink = {
        backgroundColor : 'blue',
        textAlign : 'center',
        borderRadius : '0%',

        width : '10rem',
        color : "white",
        boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        fontWeight: "500",
        lineHeight: "1.75",
        letterSpacing: "0.02857em",
        marginRight : "2rem",
        marginLeft : "2rem",
        height : '2rem',
        paddingTop : '0.45rem'



    }

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

    const signalUser = (e) => {

        const name = e.target.name

        const playload = {
            id : name
        }
        fetch(
            `${global.api}/api/user/report_user`, {
                method : 'POST',
                header : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                },
                body : JSON.stringify(playload),
        }
        ).then((res) => {
            window.location.assign("http://localhost:3000/warnList")
        })

    }
    const blockUser = (e) => {

        const name = e.target.name

        const playload = {
            r : name
        }
        fetch(
            `${global.api}/api/admin/closeAndBlockUser`,{
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`

                },
                body: JSON.stringify(playload),
            }).then((res) => {

            window.location.assign("http://localhost:3000/repUserList");
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

            window.location.assign("http://localhost:3000/repUserList");
        })
    }

    const warnUser = (e) => {
        const name = e.target.name

        const playload = {
            r : name

        }
        fetch(
            `${global.api}/api/admin/closeAndWarnUser`,{
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`

                },
                body: JSON.stringify(playload),
            }).then((res) => {

            window.location.assign("http://localhost:3000/repUserList");
        })
    }
    let asset = ""

    if (user.id !== undefined) {

        if (user.profilePicture !== null) {

            let profilePic = `${global.api}/asset/file/${user.profilePicture}`
        }

    }


  //  console.log(user.profilePicture)

    if (props.location.state.role !== 'admin') {
        return (


            <>
                <Container style={jumbo}>
                    <div style={picProfile}>
                        <img style={imgprofile} src={user.profilePicture ? `${global.api}/asset/file/${user.profilePicture.id}` : Picture} />
                    </div>
                    <h3 style={centerText}> {user.username} </h3>
                </Container>
                <Container>
                    <div style={dFlexAround}>
                        <List>
                            <ListItem>
                                <Typography>
                                    Ressources publiées : {res.length}
                                </Typography>
                            </ListItem>
                            <Input name={user.id} type={"submit"} onClick={(e) => signalUser(e)} style={btnStyleBlock}  value={'Signaler'}/>


                        </List>
                    </div>
                </Container>
            {res.map((r) => {
                // To format the Date to dd/mm/YYYY
                return (
                  <Card variant="outlined">
                    <CardHeader
                      key={r.id}
                      title={r.title}
                      subheader={`${
                        r.author.username
                      } - date de publication: ${Moment(r.createdAt).format(
                        "L"
                      )}`}
                    />
                    <CardContent>{r.description}</CardContent>
                    <CardActions style={{ justifyContent: "flex-end" }}>
                      <Button size="medium" color="primary">
                        <Link
                          key={r.id}
                          //to={{pathname: "category/resource", state: {id: resource.id}}}
                          to={{
                            pathname: "resource",
                            state: {
                              role: "",
                            },
                            hash: `${r.id}`,
                          }}
                        >
                          Consulter
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                );
            })}
        </>
    )} else if (props.location.state.option === "deblock"){
        const deblockUser = (e) => {
            const name = e.target.name

            const playload = {
                u : name
            }
            fetch(
                `${global.api}/api/admin/deblockUser`,{
                    method : 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        Authorization: `Bearer ${auth.getToken()}`

                    },
                    body: JSON.stringify(playload),
                }).then((res) => {

                window.location.assign("http://localhost:3000/blockedUser");
            })
        }

        return (
            <>
                <Container style={jumbo}>
                    <div style={picProfile}>
                        <img style={imgprofile} src={user.profilePicture ? `${global.api}/asset/file/${user.profilePicture.id}` : Picture} />
                    </div>
                    <h3 style={centerText}> {user.username} </h3>
                </Container>
                <Container>
                    <div style={dFlexAround}>
                    <List>
                        <ListItem>
                            <Typography>
                                Ressources publiées : {res.length}
                            </Typography>
                        </ListItem>
                        <Input type={"submit"} onClick={(e) => deblockUser(e)} name={user.id}  style={btnStyleDes}  value={'DEBLOQUER'}/>

                    </List>
                    </div>
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
     else {
         console.log(user)

        return (


            <>
            <Container style={jumbo}>
                <div style={picProfile}>
                    <img style={imgprofile} src={user.profilePicture ? `${global.api}/asset/file/${user.profilePicture.id}` : Picture} />
                </div>
                <h3 style={centerText}> {user.username} </h3>
            </Container>
                <Container>
                    <div style={dFlexAround}>
                        <List>
                            <ListItem>
                                <Typography>
                                    Ressources publiées : {res.length}
                                </Typography>
                            </ListItem>
                            <Input type={"submit"} onClick={(e) => blockUser(e)} name={props.location.state.rep}  style={btnStyleBlock}  value={'BLOQUER'}/>
                            <Input type={"submit"} onClick={(e) => warnUser(e)} name={props.location.state.rep} style={btnStyleWarn}  value={'AVERTIR'}/>

                        </List>
                    </div>
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
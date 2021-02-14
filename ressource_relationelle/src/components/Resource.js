// Component containing a chosen ressource
import React, {useEffect, useState} from 'react'
import "./Resource"
import auth from '../auth'
import userlib from '../userLibraryFunctions'

// MaterialUI import
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"


// MaterialUI Icon Import
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ReportIcon from '@material-ui/icons/Report';
import {Input, ListItem} from "@material-ui/core";

function Resource(props) {

    //const {id}  = props.location.state;
    const id = props.location.hash.substring(1);
        console.log(props.location.state);
    const [resource, setResource] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("auth_token")) {
            const getResource = async () => {
                const resourceFromServer = await fetchResource();
                setResource(resourceFromServer);
            };

            getResource();

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
        return await res.json();
    }
    if (props.location.state.role !== 'admin'){

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
                        <CardActions style={{ justifyContent: "flex-end" }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon
                                    onClick={() => {
                                        userlib.saveInLibrary(resource.id);
                                    }}
                                />
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
    ) } else if (props.location.state.option === "deblock"){
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


    } else {
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
                            <Input onClick={(e) => blockRes(e)}  name={props.location.state.rep}  type={"submit"}  style={btnStyleBlock}  value={'BLOQUER'}/>

                            <Input onClick={(e) => closeReport(e)} name={props.location.state.rep}  type={"submit"} style={btnStyleClose}  value={'CLOTURER'}/>
                            </div>
                            </Card>
                    );
                })}
            </>
        )
    };
}

export default Resource
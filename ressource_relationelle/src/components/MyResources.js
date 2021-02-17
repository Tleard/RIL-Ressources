import React, {useEffect, useState} from "react";
import auth from "../auth";
import {Container, Input, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import userlib from "../userLibraryFunctions";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import Moment from 'moment'
import {Link} from "react-router-dom";
import Picture from "../assets/nopicture.png";

function MyResources() {
    const stylesContainer = {
        marginTop: '10%',
    }
    const spaceCard = {
        marginTop : '5%',
        marginBottom : '5%'
    }
    Moment.locale('fr');
    const [res, setRes] = useState([])
    useEffect(() => {
        const getRes = async () => {
            const ResFromApi = await fetchRes();
            setRes(ResFromApi)
        };
        getRes()
    }, [])
    const fetchRes = async () => {
        const res = await fetch(
            `${global.api}/api/user/me`, {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            }
        )
        return await res.json()
    }

    function delRes(e) {
        const name = e.target.name

        const playload = {
            r : name
        }
        fetch(
            `${global.api}/api/user/delRes`,{
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`

                },
                body: JSON.stringify(playload),
            }).then((res) => {

            window.location.assign("http://localhost:3000/me");
        })
    }

    if (res.length === 0){
        return (
            <Container style={stylesContainer}>
                <h1> Gestion de vos ressources  </h1>
                <Typography> Vous n'avez aucune ressources publiées</Typography>
            </Container>
        )
    } else {
        return (


            <>
            <Container style={stylesContainer}>
                <h1> Gestion de vos ressources  </h1>
            </Container>
                {res.map((r) => {
                    // To format the Date to dd/mm/YYYY
                    const btnStyleBlock = {
                        backgroundColor : 'red',

                        borderRadius : '0%',

                        width : '10rem',
                        color : "white",
                        boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                        fontWeight: "500",
                        lineHeight: "1.75",
                        letterSpacing: "0.02857em",
                        marginLeft: "2rem",

                    }
                    return (
                        <Card variant="outlined" style={spaceCard}>
                            <CardHeader
                                key={r.id}
                                title={r.title}
                                subheader={`${r.author.username} - date de publication: ${Moment(r.createdAt).format('L')}`}
                            />
                            <CardContent>{r.description}</CardContent>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                                <Input name={r.id} type={"submit"} onClick={(e) => delRes(e)}  style={btnStyleBlock}  value={'SUPPRIMER'}/>
                            </CardActions>
                        </Card>
                    );
                })}

            </>
        )}
}
export default MyResources
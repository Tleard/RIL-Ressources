import React, {useEffect, useState} from "react";
import auth from "../auth";
import Container from "@material-ui/core/Container";
import {Input, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom'
import Moment from 'moment'
import CardActions from "@material-ui/core/CardActions";

function WarnList () {
    Moment.locale('fr');
    const [warnList, setWarnList] = useState([])
    useEffect(
        () => {
            const getList = async () => {
                const listFromApi = await fetchList();
                setWarnList(listFromApi)
            };
            getList()
        }, [])
    const stylesContainer = {
        marginTop: '10%',
    }
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

    const end = {
        textAlign: 'end'
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
    const fetchList = async () => {
        const res = await fetch(
            `${global.api}/api/admin/getWarnList`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            }
        )
        return await res.json()
    }

    const delWarn = (e) => {
        const name = e.target.name

        const playload = {
            w : name
        }
        fetch(
            `${global.api}/api/admin/delWarn`,{
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`

                },
                body: JSON.stringify(playload),
            }).then((res) => {

            window.location.assign("http://localhost:3000/warnList");
        })
    }

    console.log(warnList);
    if (warnList.length > 0){
    return (
        <Container style={stylesContainer}>
            <h1> Gestion des averissements</h1>
            <List subheader={<ListSubheader> Liste des Avertissements </ListSubheader>}>
                {warnList.map((l) =>
                    <ListItem>
                        <ListItemText primary={l.userWarned.username} />
                        <ListItemText style={end} primary={"date du signalement: "+Moment(l.createdAt).format('L')} />

                        <Input name={l.id} type={"submit"} onClick={(e) => delWarn(e)}  style={btnStyleBlock}  value={'SUPPRIMER'}/>


                    </ListItem>

                )}
            </List>
        </Container>
    ) } else {
        return(
            <Container style={stylesContainer}>
                <h1> Gestion des averissements</h1>
                <Typography variant={'p'}>
                    Aucun avertissement pour le moment
                </Typography>
            </Container>
        )
    }

}
export default WarnList
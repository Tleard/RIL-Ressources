import auth from "../auth";
import {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import {Input, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";


function BlockedResList(){


    const [blockedList, setBlockedList] = useState([])
    useEffect(() => {
        const getList = async () => {
            const listFromAPi = await fetchList();
            setBlockedList(listFromAPi)
        };
        getList()
    }, [])
    const fetchList = async () => {
        const res = await fetch(
            `${global.api}/api/admin/getResBlockedList`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            });
        return await res.json()
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



    const stylesContainer = {
        marginTop: '10%',
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

    console.log(blockedList)
    if (blockedList.length === 0) {
        return (
            <Container style={stylesContainer}>
                <h1> Gestion des ressources bloquées</h1>
                <Typography variant={'p'}>
                    Aucune ressource n'a été bloquée pour le moment
                </Typography>
            </Container>

        )
    } else {
        return (
            <Container style={stylesContainer}>
                <h1> Gestion des ressources bloquées</h1>
                <List subheader={<ListSubheader> Liste des utilisateurs bloqués</ListSubheader>}>
                    {blockedList.map((l) =>
                        <ListItem>
                            <ListItemText primary={l.title} />

                            <Input type={"submit"} onClick={(e) => deblockRes(e)} name={l.id}  style={btnStyleDes}  value={'DEBLOQUER'}/>

                        </ListItem>
                    )}
                </List>
            </Container>
        )
    }
}


export default BlockedResList

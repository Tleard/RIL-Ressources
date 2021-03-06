import auth from "../auth";
import {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import {Input, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";


function BlockedUserList(){
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
            `${global.api}/api/admin/getUserBlockedList`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            });
        return await res.json()
    }

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
                <h1> Gestion des utilisateurs bloqués</h1>
                <Typography variant={'p'}>
                    Aucun utilisateur n'a été bloqué pour le moment
                </Typography>
            </Container>

        )
    } else {
        return (
        <Container style={stylesContainer}>
            <h1> Gestion des utilisateurs bloqués</h1>
            <List subheader={<ListSubheader> Liste des utilisateurs bloqués</ListSubheader>}>
                {blockedList.map((l) =>
                <ListItem>
                    <ListItemText primary={l.username} />
                    <ListItemText primary={l.email} />
                   <Input type={"submit"} onClick={(e) => deblockUser(e)} name={l.id}  style={btnStyleDes}  value={'DEBLOQUER'}/>
                    <Link style={btnStyleLink}
                          key={l.id}
                        //   params={{ role : "admin" }}
                        //to={{pathname: "category/resource", state: {id: resource.id}}}
                          to={{
                              pathname: "profile",
                              state: {
                                  role: 'admin',
                                  option: 'deblock',
                                  rep : l.id
                              },
                              hash: `${l.id}`,
                          }}
                    > VOIR </Link>
                </ListItem>
                )}
        </List>
        </Container>
        )
    }
}


export default BlockedUserList

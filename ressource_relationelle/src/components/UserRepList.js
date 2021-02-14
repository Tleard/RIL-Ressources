import {useEffect, useState} from "react";
import auth from "../auth";
import Container from "@material-ui/core/Container";
import {Input, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom'


function UserRepList(){



    const [repList, setRepList] = useState([])
    useEffect(() => {
        const getList = async () => {
            const listFromAPi = await fetchList();
            setRepList(listFromAPi)
        };
        getList()
    }, [])
    const fetchList = async () => {
        const res = await fetch(
            `${global.api}/api/admin/getReportUserUnClosed`, {
                method : 'POST',
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`
                }
            }
        )
        return await res.json()
    }
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


    console.log(repList);
    if (repList.length === 0){
        return (
            <Container style={stylesContainer}>
                <h1> Gestion des utilisateurs signalés </h1>
                <Typography variant={'p'}>
                    Aucun utilisateur n'a été signalé
                </Typography>
            </Container>
        )
    } else {
        return (
            <Container style={stylesContainer}>
                <h1> Gestion des utilisateurs signalés</h1>
                <List subheader={<ListSubheader> Liste des utilisateurs signalés</ListSubheader>}>
                    {repList.map((l) =>
                        <ListItem>
                            <ListItemText primary={l.reportedUser.username} />

                            <Input name={l.id} type={"submit"} onClick={(e) => blockUser(e)} style={btnStyleBlock}  value={'BLOQUER'}/>
                            <Input name={l.id} type={"submit"} onClick={(e) => warnUser(e)} style={btnStyleWarn}  value={'AVERTIR'}/>
                            <Input name={l.id} type={"submit"} onClick={(e) => closeReport(e)} style={btnStyleClose}  value={'CLOTURER'}/>

                            <Link style={btnStyleLink}
                                  key={l.reportedUser.id}
                                //   params={{ role : "admin" }}
                                //to={{pathname: "category/resource", state: {id: resource.id}}}
                                  to={{
                                      pathname: "profile",
                                      state: {
                                          role: 'admin',
                                          rep : l.id
                                      },
                                      hash: `${l.reportedUser.id}`,
                                  }}
                            > VOIR </Link>
                        </ListItem>

                    )}
                </List>
            </Container>
        )

    }
}
export default UserRepList


import {useEffect, useState} from "react";
import auth from "../auth";
import Container from "@material-ui/core/Container";
import {Input, List, ListItem, ListItemText, ListSubheader, Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";

function ResRepList(){



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
            `${global.api}/api/admin/getReportResUnClosed`, {
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


    console.log(repList);
    if (repList.length === 0){
        return (
            <Container style={stylesContainer}>
                <h1> Gestion des ressources signalées </h1>
                <Typography variant={'p'}>
                    Aucune Ressources n'a été signalée
                </Typography>
            </Container>
        )
    } else {
        return (
            <Container style={stylesContainer}>
                <h1> Gestion des ressources signalées</h1>
                <List subheader={<ListSubheader> Liste des ressources signalées</ListSubheader>}>
                    {repList.map((l) =>
                        <ListItem>
                            <ListItemText primary={l.reportRessource.title} />

                            <Input name={l.id} type={"submit"} onClick={(e) => blockRes(e)} style={btnStyleBlock}  value={'BLOQUER'}/>

                            <Input name={l.id} type={"submit"} onClick={(e) => closeReport(e)} style={btnStyleClose}  value={'CLOTURER'}/>
                            <Link style={btnStyleLink} href="#" color="inherit">
                                VOIR
                            </Link>
                        </ListItem>

                    )}
                </List>
            </Container>
        )

    }
}
export default ResRepList


import auth from "../auth";
import {Component, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
    CardActions,
    FormControl, FormControlLabel,
    FormHelperText,
    Input,
    InputLabel,
    List,
    ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    ListSubheader, Switch
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";

const stylesContainer = {
    marginTop: '10%',
}

const mt4 =  {
    marginTop: '4%'
}

const dFlexAround = {
    display: 'flex',
    justifyContent: 'space-around'
}

const submitBtn = {
    backgroundColor : 'blue',
    borderColor : 'white',
    borderRadius : '0%',
    borderStyle : 'solid',
    width : '10rem',
    color : "white",

}




function CategTools() {


    const addCategory = (e) => {
        const {name} = e.target.elements
        const playload = {
            name : name.value
        }
        fetch(`${global.api}/api/admin/addCategory`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`

            },
            body: JSON.stringify(playload),
        }).then(() => {
            console.log(playload)
            //  window.location.href('window.location.assign("http://localhost:3000/categTools");')
        })
    }

    const displayBtn = {
        textAlign: 'center',

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

    const btnStyleAct = {
        backgroundColor : 'red',
        borderRadius : '0%',

        width : '10rem',
        color : "white",
        boxShadow : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        fontWeight: "500",
        lineHeight: "1.75",
        letterSpacing: "0.02857em",



    }

    const desactiveCateg = (idSe) =>{

       // console.log(idSe.target.name)
        const name = idSe.target.name

       const playload = {
           c : name
       }
       fetch(
           `${global.api}/api/admin/delete_category`,{
               method : 'POST',
               headers: {
                   Accept: "application/json",
                   "Content-type": "application/json",
                   Authorization: `Bearer ${auth.getToken()}`

               },
               body: JSON.stringify(playload),
           }).then((res) => {

        window.location.assign("http://localhost:3000/categTools");
       })
    }

    const activeCateg = (idSe) => {
        const name = idSe.target.name

        const playload = {
            c : name
        }
        fetch(
            `${global.api}/api/admin/active_category`,{
                method : 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth.getToken()}`

                },
                body: JSON.stringify(playload),
            }).then((res) => {

               window.location.assign("http://localhost:3000/categTools");
        })
    }

    const [categories, setCategories] = useState([])
    useEffect(() => {
        const getCategory = async () => {
            const categoriesFromApi = await fetchCategories();
            setCategories(categoriesFromApi);
        };
        getCategory();
    }, [])
    const fetchCategories = async () => {
        const res = await fetch(`${global.api}/api/resources_category`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${auth.getToken()}`,
            },
        });
        return await res.json()
    }
    let status = ""
    console.log(categories);
    return (
        <Container style={stylesContainer}>
            <h1> Gestion des catégories</h1>
            <h3 style={mt4}> Ajouter une catégories</h3>
            <form  onSubmit={addCategory}>
                <div style={dFlexAround}>
                <Input name={'name'} type={'text'} placeholder={'Nom de la Catégorie'}/>
                <Input style={submitBtn} type={"submit"} value={'ajouter'}/>
                </div>
            </form>
            <div style={mt4}>
                <h3> Supprimer, Activer des catégories </h3>
                <List subheader={<ListSubheader>Liste des catégories</ListSubheader>}>
                    {categories.map((c, i = 0) =>

                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary={c.name} />
                        <ListItemSecondaryAction>

                               {
                                            (() => {
                                                switch (c.status) {
                                                    case true:   return <Input type={"submit"} onClick={(e) => desactiveCateg(e)} name={c.id}  style={btnStyleDes}  value={'DESACTIVER'}/>


                                                    case false:      return <Input type={"submit"}  onClick={(e) => activeCateg(e)} name={c.id}  style={btnStyleAct} variant="contained" color="primary" href="#contained-buttons" value={'ACTIVER'}/>

                                                }
                                            })()}


                        </ListItemSecondaryAction>

                    </ListItem>
                     )}
                </List>
            </div>
        </Container>


    )
}
export default CategTools;


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
    boxShadow : '1px',
    width : '10rem',
    color : "white",

}


class BluetoothIcon extends Component {
    render() {
        return null;
    }
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
            window.location.href('window.location.assign("http://localhost:3000/categTools");')
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
                    {categories.map((c) =>
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary={c.name} />
                        <ListItemSecondaryAction>
                            {(() => {
                                switch (c.status) {
                                    case true:   return status =   <FormControlLabel
                                        control={
                                            <Switch
                                                checked={true}
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label=""
                                    />;
                                    case false: return status =   <FormControlLabel
                                        control={
                                            <Switch
                                                checked={false}
                                                name="checkedB"
                                                color="disabled"
                                            />
                                        }
                                        label=""
                                    />
                                    default:  return status =   <FormControlLabel
                                        control={
                                            <Switch
                                                name="checkedB"
                                                color="disabled"
                                            />
                                        }
                                        label=""
                                    />;
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


import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import auth from '../auth'
import { Link } from 'react-router-dom'

// Material UI import 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
// Material UI import for Form Select
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Publication(props) {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState,
    errors,
    setError,
    watch,
    control,
  } = useForm();


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      const getCategories = async () => {
        const categoriesFromServer = await fetchCategories();
        setCategories(categoriesFromServer);
      };

      getCategories();

    }

  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${global.api}/api/resources_category`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
    return await res.json();
  };

  const onSubmit = (data) => {
    let selectedCategories = [];
    for (const [key, value] of Object.entries(data)) {
      //console.log(`${key}: ${value}`);
      if(value === true) {
        selectedCategories.push(key);
      }
    }

    const payload = {
      title: `${data.title}`,
      description: `${data.description}`,
      categories: `${selectedCategories}`,
      type: "text"
    }
    console.log(payload);

    fetch(`${global.api}/api/resources`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "BearerToken" : `${auth.accessToken}`
      },
      body: JSON.stringify(payload),
    }).then(() => {
      //props.history.push("Home");
    });
  };

  return (
    <>
      <h1>Publier une nouvelle ressource</h1>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="title"
            name="title"
            label="Titre"
            placeholder="Titre"
            multiline
            rowsMax={4}
            variant="filled"
            inputRef={register}
          />
        </Grid>

        <Grid item xs={6}>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Choisissez une ou des catégories</FormLabel>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              control={
                <Checkbox 
                  name={category.name}
                  inputRef={register}
                />}
              label={category.name}
            />
          ))}
        </FormGroup>
      </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            variant="filled"
            inputRef={register}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Publier
      </Button>
      </form>
    </>
  );
}

export default Publication;

// Title , Catégorie, Description, Type
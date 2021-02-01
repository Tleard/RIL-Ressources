import React, { useState, useRef } from "react";
import {useForm, Controller} from 'react-hook-form';
import { Redirect } from 'react-router-dom';
//import { Container, Button, Form, FormGroup, Label, Input, FormText, Alert } from "reactstrap";
import "./Register.css";

// Material UI Import
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Register = (props) => {
  const classes = useStyles();

  const {register, handleSubmit, formState, errors, setError, watch, control} = useForm();
  const {isSubmitting, isSubmitted, isSubmitSuccessful} = formState;

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = data => {
    console.log(data);
    const payload = {
      username:`${data.username}`,
      first_name:`${data.firstName}`,
      last_name:`${data.lastName}`,
      email:`${data.email}`,
      password:`${data.password}`,
      retyped_password:`${data.retyped_password}`
    }
    
    fetch(`${global.api}/register`, {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
      props.history.push('Login');
    });

  }

  return (
    <>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                innerRef={register({
                  required: true, 
                  pattern:{value: /^([^0-9]*)$/, message: 'Les chiffes sont interdits'}})}
                control={control}
                as={<TextField />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                innerRef={register({required: true, pattern:{value: /^([^0-9]*)$/, message: 'Les chiffes sont interdits'}})}
                control={control}
                as={<TextField />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                innerRef={register({required: 'Vous devez entrez votre nom d\'utilisateur'})}
                control={control}
                as={<TextField />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                innerRef={register({
                  required: true, 
                  pattern:{value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email invalide'}})}
                control={control}
                as={<TextField />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                innerRef={register({required: true})}
                control={control}
                as={<TextField />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                variant="outlined"
                required
                fullWidth
                name="retyped_password"
                label="Retyped Password"
                type="password"
                id="retyped_password"
                autoComplete="current-password"
                innerRef={register({required: true, validate:value => value === password.current || "Les mots de passe ne correspondent pas"})}
                control={control}
                as={<TextField />}
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
            Je m'inscris
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Déjà un compte ? Je me connecte
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
      {/* Below the Reactstrap version that is working */}
      {/* <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <FormGroup>
            <Label for="username">Nom d'utilisateur</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Nom d'utilisateur"
              innerRef={register({required: 'Vous devez entrez votre nom d\'utilisateur'})}
            />
            {errors.username && <Alert color="danger">{errors.username.message}</Alert>}
          </FormGroup>
          
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              innerRef={register({
                required: true, 
                pattern:{value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email invalide'}})}
            />
            {errors.email && <Alert color="danger">{errors.email.message}</Alert>}
          </FormGroup>

          <FormGroup>
            <Label for="first_name">Prénom</Label>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Prénom"
              innerRef={register({
                required: true, 
                pattern:{value: /^([^0-9]*)$/, message: 'Les chiffes sont interdits'}})}
            />
            {errors.first_name && <Alert color="danger">{errors.first_name.message}</Alert>}
          </FormGroup>

          <FormGroup>
            <Label for="last_name">Nom</Label>
            <Input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Nom"
              innerRef={register({required: true, pattern:{value: /^([^0-9]*)$/, message: 'Les chiffes sont interdits'}})}
            />
            {errors.last_name && <Alert color="danger">{errors.last_name.message}</Alert>}
          </FormGroup>

          <FormGroup>
            <Label for="password">Mot de passe</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Mot de passe"
              innerRef={register({required: true})}
            />
          </FormGroup>

          <FormGroup>
            <Label for="retyped_password">Confirmez votre mot de passe</Label>
            <Input
              type="password"
              name="retyped_password"
              id="retyped_password"
              placeholder="Retapez votre mot de passe"
              innerRef={register({required: true, validate:value => value === password.current || "Les mots de passe ne correspondent pas"})}
            />
            {errors.retyped_password && <Alert color="danger">{errors.retyped_password.message}</Alert>}
          </FormGroup>

          <Button disabled={isSubmitting} type="submit">S'inscrire</Button>

        </Form>
      </Container> */}
    </>
  );
};

export default Register;

import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
//import { Container, Button, Form, FormGroup, Label, Input, FormText, Alert } from "reactstrap";
import "./Register.css";

// Material UI Import
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Material UI lab Imprt
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
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
  const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      username: `${data.username}`,
      first_name: `${data.firstName}`,
      last_name: `${data.lastName}`,
      email: `${data.email}`,
      password: `${data.password}`,
      retyped_password: `${data.retyped_password}`,
    };

    fetch(`${global.api}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => {
      props.history.push("Login");
    });
  };

  console.log(errors);

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
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  inputRef={register({
                    required: "Entrez un prénom",
                    pattern: {
                      value: /^([^0-9]*)$/,
                      message: "Les chiffes sont interdits",
                    },
                  })}
                />
                {errors.firstName && (
                  <Alert severity="warning">{errors.firstName.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                  inputRef={register({
                    required: "Entrez un nom",
                    pattern: {
                      value: /^([^0-9]*)$/,
                      message: "Les chiffes sont interdits",
                    },
                  })}
                />
                {errors.lastName && (
                  <Alert severity="warning">{errors.lastName.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Nom Utilisateur"
                  name="username"
                  autoComplete="username"
                  inputRef={register({
                    required: "Vous devez entrez votre nom d'utilisateur",
                  })}
                />
                {errors.username && (
                  <Alert severity="warning">{errors.username.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  inputRef={register({
                    required: "Email obligatoire",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email invalide",
                    },
                  })}
                />
                {errors.email && (
                  <Alert severity="warning">{errors.email.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={register({ required: "Mot de passe obligatoire" })}
                />
                {errors.password && (
                  <Alert severity="warning">{errors.password.message}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="retyped_password"
                  label="Confirmation mot de passe"
                  type="password"
                  id="retyped_password"
                  autoComplete="current-password"
                  inputRef={register({
                    required: "Confirmez votre mot de passe",
                    validate: (value) =>
                      value === password.current ||
                      "Les mots de passe ne correspondent pas",
                  })}
                />
                {errors.retyped_password && (
                  <Alert severity="warning">
                    {errors.retyped_password.message}
                  </Alert>
                )}
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
    </>
  );
};

export default Register;

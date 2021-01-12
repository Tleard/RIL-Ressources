import React, { useState, useRef } from "react";
import {useForm} from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Label, Input, FormText, Alert } from "reactstrap";
import "./Register.css";


const Register = (props) => {
  const {register, handleSubmit, formState, errors, setError, watch} = useForm();
  const {isSubmitting, isSubmitted, isSubmitSuccessful} = formState;

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = data => {
    const payload = {
      username:`${data.username}`,
      first_name:`${data.first_name}`,
      last_name:`${data.last_name}`,
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
      <Container>
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
      </Container>
    </>
  );
};

export default Register;

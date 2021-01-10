import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { Container, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./Register.css";

const Register = (props) => {
  const [usernameState, setUsernameState] = useState('');
  const [first_nameState, setFirst_nameState] = useState('');
  const [last_nameState, setLast_nameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [retyped_passwordState, setRetyped_passwordState] = useState('');

  const payload = {
    username:`${usernameState}`,
    first_name:`${first_nameState}`,
    last_name:`${last_nameState}`,
    email:`${emailState}`,
    password:`${passwordState}`,
    retyped_password:`${retyped_passwordState}`
  }

  function register() {
    fetch('http://localhost:8000/register', {
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
        <Form>

          <FormGroup>
            <Label for="username">Nom d'utilisateur</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Nom d'utilisateur"
              onChange={(e) => {
                setUsernameState(e.target.value);
              }}
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailState(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="first_name">Prénom</Label>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Prénom"
              onChange={(e) => {
                setFirst_nameState(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="last_name">Nom</Label>
            <Input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Nom"
              onChange={(e) => {
                setLast_nameState(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Mot de passe</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Mot de passe"
              onChange={(e) => {
                setPasswordState(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="retyped_password">Confirmez votre mot de passe</Label>
            <Input
              type="password"
              name="retyped_password"
              id="retyped_password"
              placeholder="Retapez votre mot de passe"
              onChange={(e) => {
                setRetyped_passwordState(e.target.value);
              }}
            />
          </FormGroup>

          <Button onClick={() => register()}>S'inscrire</Button>

        </Form>
      </Container>
    </>
  );
};

export default Register;

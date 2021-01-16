import React, {useState, useEffect, Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../global';
import auth from '../auth';
import './Login.css';


const Login  = (props) => {
    
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    const payload = {
        username:`${usernameState}`,
        password:`${passwordState}`
    }
    // console.log(payload);

    function login() {
        fetch(`${global.api}/log-in`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((data)=>{
            storeTokenInLocalStorage(data.token);
            auth.loggedin();
            console.log(props);
            props.history.push('ressourcetest');
        });
    }

    // Store in localstorage
    function storeTokenInLocalStorage(token) {
        localStorage.removeItem('auth_token');
        localStorage.setItem('auth_token', JSON.stringify(token));
    }


    return (  
        <div class="login">
            <h1>Login</h1>
            <label>Nom d'utilisateur
                <input type="text" onChange={(e) => {
                    setUsernameState(e.target.value);
                }} />
            </label>
            <label>Mot de passe
                <input type="password" onChange={(e) => {
                    setPasswordState(e.target.value);               
                }}/>
            </label>
            <button onClick={login}>Submit</button>
        </div>
    );
}
 
export default withRouter(Login);
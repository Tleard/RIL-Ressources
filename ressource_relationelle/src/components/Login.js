import React, {useState} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
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
        })
        .then(() => {


            //props.history.push('home');
            // return <Redirect to="home"/>
            // !!! The window.location.href is bad. But I couldn't find any fix yet. !!! The page need to be refresh to be logged. 
           window.location.href = "http://localhost:3000/home";
        });
    }

    // Store in localstorage
    function storeTokenInLocalStorage(token) {
        localStorage.removeItem('auth_token');
        localStorage.setItem('auth_token', JSON.stringify(token));
    }


    return (  
        <div className="login">
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
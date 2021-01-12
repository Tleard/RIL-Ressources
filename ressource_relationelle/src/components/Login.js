import React, {useState, useEffect, Component} from 'react';
import '../global';
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
            //console.log(data.token);
            storeTokenInLocalStorage(data.token);
            console.log('token is stored...maybe ?');
        })
        .then(() => {
            console.log('dernier then In');
            props.history.push('Home');
        });
    }

    // Store in localstorage
    function storeTokenInLocalStorage(token) {
        console.log('storeToken function');
        let local_storage_token;
        if(localStorage.getItem('auth_token') === null){
            local_storage_token = '';
        } else {
            local_storage_token = JSON.parse(localStorage.getItem('token'));
        }

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
 
export default Login;
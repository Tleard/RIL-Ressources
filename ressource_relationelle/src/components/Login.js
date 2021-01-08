import React, {useState, useEffect, Component} from 'react';
import './Login.css';


const Login  = () => {
    
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const payload = {
        username:`${usernameState}`,
        password:`${passwordState}`
    }

    function login() {
        fetch('http://localhost:8000/log-in', {
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
    }

    // Store in localstorage
    function storeTokenInLocalStorage(token) {
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
            <input type="text" onChange={(e) => {
                setUsernameState(e.target.value);
            }} />
            <input type="password" onChange={(e) => {
                setPasswordState(e.target.value);               
            }}/>
            <button onClick={login}>Submit</button>

            {loggedIn && (
                <h1>Logged In Cool</h1>
            )}
        </div>
    );
}
 
export default Login;
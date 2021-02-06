import auth from "../auth";
import {useState} from "react";
import {Form} from "reactstrap";

const LogAdmin = (props) => {
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    const payload = {
        username:`${usernameState}`,
        password:`${passwordState}`
    }

    function login() {

        fetch(`${global.api}/log-admin`, {
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
                window.location.href = "http://localhost:3000/adminDash";

            });
    }

    // Store in localstorage
    function storeTokenInLocalStorage(token) {
        localStorage.removeItem('auth_token');
        localStorage.setItem('auth_token', JSON.stringify(token));
    }


        return (
            <Form onSubmit={login}>
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
                <input type={'submit'} value={'se connecter'} />
            </Form>
        );
    }
export default LogAdmin
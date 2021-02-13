import {AsyncStorage} from 'react-native';
import {TokenHandler} from "./TokenHandler";
import Component from 'react-native';
import {UserHandler} from "./UserHandler";
import {getUrl} from "./RequestHandler";
import {View} from "react-native-web";


export function LoginAttempt(username, password) {
    let urlBase = getUrl();

    return fetch(urlBase +"/log-in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then((response) => response.json())
        .catch((error) => {
            alert('Mauvais Identifiants')
            console.error("Error Manual : " + error.message)
        })
}
import React from 'react'
import { AsyncStorage } from 'react-native';
import {getToken, TokenHandler} from "./TokenHandler";
import {getUrl} from "./RequestHandler";

export class UserHandler extends React.Component {

    static async getUser (id) {

        let urlBase = getUrl();
        let url = urlBase + "/api/users/" + id;
        return fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token,
            }),
        })
            .then((response) => response.json())
            .then((responseText) => {
                return JSON.stringify(responseText);
            })
            .catch((error) => {
                console.error(error.message)
            })
    }

    static async getCurrentUser () {
        try {
            AsyncStorage.getItem("user")
                .then((responseJson) => {
                    return responseJson;
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

}

//import AsyncStorage from 'react-native';
import React from 'react'
import {AsyncStorage} from 'react-native';

export class TokenHandler extends React.Component {

    /*constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }*/

    static async getToken() {
        try {
            AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    return responseJson;
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

    static async storeToken(token, user) {
        try {
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("user", user);
            //await AsyncStorage.setItem("userId", id);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

}
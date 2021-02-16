
import * as React from "react";
import  {useState, createRef} from 'react';

import {
    Button,
    View,
    StyleSheet,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
    FlatList
} from "react-native";
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {TokenHandler} from "../API/TokenHandler";
import {LoginAttempt} from "../API/LoginAttempt";
import {UserHandler} from "../API/UserHandler";
import {getUrl} from "../API/RequestHandler";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import ResourceItem from "./Components/ResourceItem";
import Loader from "./Components/Loader";

export class AllResourcesScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resources:[],
            resourcesLenght:'',
            token: '',
            id:'',
            error_message:'',
            postDataLib : '',
            loading : false
        }
    }

    componentDidMount() {
        this._fetchResources();
        this._fetchLib();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this._fetchResources();
            this._fetchLib();
        });
    }
   
    _DisplayDetails = (resourceId) => {
        this.props.navigation.navigate("Details", {resourceId: resourceId});
    }

    
    _fetchResources = async() => {
       this.state.loading = true;
        try {
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/resources/";
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + responseJson,
                            }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                this.setState({resources: responseText})
                                this.setState({resourcesLenght: responseText.length});
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })

                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        } catch (e) {
            console.error("Somenting went wrong" + e)
        }
    }

    _fetchLib = async() => {
        this.state.loading = true
        try {
            await AsyncStorage.multiGet(["userToken", "user"])
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/user/getLib";
                        return fetch(url, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson[0][1],
                            }),
                            body : JSON.stringify({'id' : responseJson[1][1]})
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                this.setState({postDataLib: responseText})
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    } catch (e) {
                        console.error("Something went wrong" + e);
                    }
                })
        }
        catch (e) {
            console.error("Something went wrong" + e)
        }
    }

    render() {
        return (
            <View>
                <Loader loading={this.state.loading}/>
                    <FlatList
                        data={this.state.resources}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <ResourceItem postData={item} postDataLib={this.state.postDataLib} DisplayDetails={this._DisplayDetails}/>}
                    />
            </View>
        )
    }
}

export default AllResourcesScreen

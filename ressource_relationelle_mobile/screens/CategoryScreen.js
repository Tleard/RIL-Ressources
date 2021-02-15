
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
import CategoryItem from "./Components/CategoryItem";
import Loader from "./Components/Loader";

export class CategoryScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            category:[],
            categoryLength:'',
            token: '',
            id:'',
            error_message:'',
            loading : false
        }
    }

    UNSAFE_componentWillMount() {
        this._fetchCategory();
    }
   
    _DisplayDetails = (categoryName) => {
        this.props.navigation.navigate("CategoryResources", {categoryName: categoryName});
    }

    
    _fetchCategory = async() => {
        try {
            await AsyncStorage.getItem("userToken").then((responseJson) => {
              try {
                let url = getUrl() + "/api/resources_category";
                return fetch(url, {
                  method: "GET",
                  headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + responseJson,
                  }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.state.loading = false;
                                this.setState({category: responseText})
                                this.setState({categoryLength: responseText.length});
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

        render() {
        return (    <View>
            
                    <Loader loading={this.state.loading}/>
                        <FlatList
                            data={this.state.category}
                            keyExtractor={(item) => item.name.toString()}
                            renderItem={({item}) => <CategoryItem postData={item} DisplayDetails={this._DisplayDetails}/>}
                        />
                   </View>
                   
        )
    }
}

export default CategoryScreen

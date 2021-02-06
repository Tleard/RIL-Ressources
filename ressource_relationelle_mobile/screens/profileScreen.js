import * as React from "react";
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

class profileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userData:'',
            userResources:'',
            userResourcesLenght:'',
            profilePicture:'',
            token: '',
            id:'',
            error_message:'',
        }
    }

    UNSAFE_componentWillMount() {
        this._fetchUserInfo();
        this._fetchUserResources();
    }

    _fetchUserInfo = async() => {
        //Get User Info
        try {
            let userId = this.props.route.params['userId'];
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/user/" + userId;
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson,
                            }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                console.log("ResponseText : " + JSON.stringify(responseText))
                                this.setState({userData: responseText})
                                if (responseText.profilePicture !== null)
                                {
                                    this.setState({profilePicture : responseText.profilePicture.id})
                                    console.log(responseText.profilePicture.id)
                                }
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

    _fetchUserResources = async() => {
        try {
            let userId = this.props.route.params['userId'];
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/resources/user/" + userId;
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
                                this.setState({userResources: responseText});
                                this.setState({userResourcesLenght: responseText.length});
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

    TextList = [];

    render() {
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        const image = getUrl() + "/asset/file/" +this.state.profilePicture;
        return (
            <View>
                    <View style={{alignSelf : 'stretch', height: height / 3}}>
                        <Image source={{uri : image}} style={{flex : 1 , resizeMode: 'cover'}} />
                        <View style={{position: 'absolute', top: height / 4, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Title style={{color: 'white'}}>{this.state.userData.firstName} {this.state.userData.lastName}</Title>
                            <Title style={{color: 'white'}}>{this.state.userData.username}</Title>
                            <Title style={{color: 'white'}}>{this.state.userResources.title}</Title>
                            <Card style={{height : height / 9}}>
                                <Card.Content>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems : 'center'}}>
                                        <View style={{width : width /4, height : height/100}}>
                                            <Text style={{fontSize : 30}}>{this.state.userResourcesLenght} </Text>
                                            <Text style={{fontSize : 20}}>Posts</Text>
                                        </View>
                                        <View style={{width : width /4, height : height/100}}>
                                            <Text style={{fontSize : 30}}>{this.state.userResourcesLenght} </Text>
                                            <Text style={{fontSize : 20}}>Posts</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                    <View>
                    </View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    username: {
        fontSize: 18,
        paddingTop: 20,
        color: '#ffffff'
    },
    logo: {},
    email: {
        fontSize: 15,
        color: '#ffffff'
    },
    image_logo: {
        height: 150,
        resizeMode: 'contain',
        borderRadius: 100
    },
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});

export default profileScreen;
import * as React from "react";
import {
    Button,
    View,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
    FlatList,
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

class ImageCustom extends React.Component {

    render() {
            <Image source={require('../assets/default-picture.png')} style={{flex : 1 , resizeMode: 'cover'}} />
    }
}

class profileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userData:'',
            userResources:'',
            userResourcesLenght:'',
            userReactions : '',
            userReactionsLenght : '',
            profilePicture:'',
            postDataLib : '',
            token: '',
            id:'',
            error_message:'',
            loading : false
        }
    }

    componentDidMount() {
        this._fetchLib();
        this._fetchUserInfo();
        this._fetchUserResources();
        this._fetchUserReactions();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this._fetchLib();
            this._fetchUserInfo();
            this._fetchUserResources();
            this._fetchUserReactions();
        });
    }

    _fetchUserInfo = async() => {
        //Show Loading
        
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
                                this.setState({userData: responseText})
                                if (responseText.profilePicture !== null)
                                {
                                    this.setState({profilePicture : responseText.profilePicture.id});
                                } else {
                                    this.setState({profileScreen : 'default-picture'});
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
        this.state.loading = true
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
                                this.setState({userResources: responseText})
                                this.state.loading = false;
                                if (responseText[0] == "The user has no ressource")
                                {
                                    this.setState({userResourcesLenght: 0})
                                } else {
                                    this.setState({userResourcesLenght: responseText.length});
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

    _fetchUserReactions = async() => {
        try {
            let userId = this.props.route.params['userId'];
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = getUrl() +"/api/user/reaction/" + userId;
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
                                this.setState({userReactions: responseText});
                                // Hide Loader
                                
                                if (responseText[0] == "The user has no reactions")
                                {
                                    this.setState({userReactionsLenght: 0});
                                } else {
                                    this.setState({userReactionsLenght: responseText.length});
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

    _fetchLib = async() => {
        
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


    _DisplayDetails = (resourceId) => {
        this.props.navigation.navigate("Details", {resourceId: resourceId});
    }

    _DisplayResource = (userResource) => {
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        if (userResource[0] === "The user has no ressource")
        {
            return(
                <Paragraph style={{fontSize : 22, paddingTop: height/30, paddingBottom : height/70}}>L'utilisateur ne possède pas de ressources</Paragraph>
            )
        } else {
            return (
                <View>
                    <Paragraph style={{fontSize : 22, paddingTop: height/30, paddingBottom : height/70}}>Ressources :</Paragraph>
                        <FlatList
                            data={this.state.userResources}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({item}) => <ResourceItem postData={item} postDataLib={this.state.postDataLib} DisplayDetails={this._DisplayDetails}/>}
                        />
                </View>
            )
        }
    }


    render() {
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        if(this.state.userData.profilePicture !== null)
        {
            return(

                <View>
                    <Loader loading={this.state.loading}/>
                    <View style={{alignSelf : 'stretch', height: height / 3}}>
                        <Image source={{uri : getUrl() + "/asset/file/" +this.state.profilePicture}} style={{width : width, height :height /3 , resizeMode: 'stretch'}} />
                        <View style={{position: 'absolute', top: height / 3, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Card style={{height : height / 10}}>
                                <Card.Content>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems : 'center'}}>
                                        <View style={{width : width /2, height : height/40}}>
                                            <Text style={{fontSize : 25}}>{this.state.userData.firstName} {this.state.userData.lastName}</Text>
                                            <Text style={{fontSize : 25}}>{this.state.userData.username}</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                    <View style={{backgroundColor : '#CDCDCD'}}>
                        <Paragraph style={{fontSize : 20 ,marginTop: height/17}}>Ressources postée(s) : {this.state.userResourcesLenght}</Paragraph>
                        <Paragraph style={{fontSize : 20}}>Réactions postée(s) : {this.state.userReactionsLenght}</Paragraph>
                        {this._DisplayResource(this.state.userResources)}
                    </View>
                </View>
            );
        } else {
            return (

                <View>
                    <Loader loading={this.state.loading}/>
                    <View style={{alignSelf : 'stretch', height: height / 3}}>
                        <Image source={require('../assets/default-picture.png')} style={{width : width, height :height /3 , resizeMode: 'stretch'}} />
                        <View style={{position: 'absolute', top: height / 3, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Card style={{height : height / 10}}>
                                <Card.Content>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems : 'center'}}>
                                        <View style={{width : width /2, height : height/40}}>
                                            <Text style={{fontSize : 25}}>{this.state.userData.firstName} {this.state.userData.lastName}</Text>
                                            <Text style={{fontSize : 25}}>{this.state.userData.username}</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                    <View style={{backgroundColor : '#CDCDCD'}}>
                        <Paragraph style={{fontSize : 20 ,marginTop: height/17}}>Ressources postée(s) : {this.state.userResourcesLenght}</Paragraph>
                        <Paragraph style={{fontSize : 20}}>Réactions postée(s) : {this.state.userReactionsLenght}</Paragraph>
                        {this._DisplayResource(this.state.userResources)}
                    </View>
                </View>
            );
        }
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
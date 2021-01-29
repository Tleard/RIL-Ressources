import * as React from "react";
import {
    Button,
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {TokenHandler} from "../API/TokenHandler";
import {LoginAttempt} from "../API/LoginAttempt";
import {UserHandler} from "../API/UserHandler";
import {getUrl} from "../API/RequestHandler";

class profileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userData:'',
            profilePicture:'',
            token: '',
            id:'',
            error_message:'',
        }
    }

    UNSAFE_componentWillMount() {
        this._fetchUserInfo();
    }

    _fetchUserInfo = async() => {
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


    render() {
        const image = getUrl() + "/asset/file/" +this.state.profilePicture;
        return (
            <View>
                <View style={{alignItems: 'center', paddingTop: 80, backgroundColor: '#0F72AC'}}>
                    <View style={{alignItems : 'center', backgroundColor: '#0F72AC'}}>
                        <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                        <Text>{this.state.userData.username}</Text>
                        <Text>Hello There</Text>
                    </View>
                </View>
                <View>
                    <Text>{image}</Text>
                    <Image source={{uri : image}} style={styles.image_logo} />
                    <Text>Hello There</Text>
                </View>

                {/*<View style={{paddingTop: 80, paddingLeft: 30}}>
                    <Text style={{fontSize : 15}}> <FontAwesome name="comments" size={50} color="black"/> Nombre de messages envoyés : {this.state.userData.comments}</Text>
                    <Text style={{fontSize : 15, paddingTop: 15}}> <FontAwesome name="users" size={50} color="black"/> Rôle de l'utilisateur : {this.state.userData.userRole}</Text>
                    <Text style={{fontSize : 15, paddingTop: 15}}> <FontAwesome name="pencil-square-o" size={50} color="black"/> Nombre d'annonces postés : {this.state.userData.posts}</Text>
                </View>*/}
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
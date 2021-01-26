import * as React from "react";
import {
    Button,
    View,
    Text,
    StyleSheet,
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

class profileScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username : '',
            firstName : '',
            token :'',
            LastName : '',
            id:'',
            error_message:'',
        }
    }

    UNSAFE_componentWillMount() {
        this._fetchUserInfo();
    }

    _fetchUserInfo = async() => {
        try{
            await UserHandler.getCurrentUser()
                .then((responseJson) => {
                console.log(responseJson)
                })

        } catch (e) {
            console.error("Somenting went wrong" + e)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Pseudo..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) =>this.setState({username})}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginBtn}
                    title='Connexion'
                    onPress={this._login}
                >
                    <Text style={styles.loginText}>Connexion</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    //onPress={this._Create}>
                >
                    <Text style={styles.loginText}>Créer un compte</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
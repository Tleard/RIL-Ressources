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

class logInScreen extends React.Component {
    //Add Function


    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            token :'',
            user : '',
            id:'',
            error_message:'',
        }
    }

    _login = async() => {
        if  (this.state.username.length > 2 && this.state.password.length > 2)
        {
            //Get all data from connexion and register them as state
            await LoginAttempt(this.state.username, this.state.password).then(data =>
                this.setState({
                    token: data.token,
                    user: data.user,
                    error_message: JSON.stringify(data.message)
                })
            );
        } else if (typeof this.state.error_message !== 'undefined') {
            alert(this.state.error_message)
        }
        //Store Token & Current User
        await TokenHandler.storeToken(this.state.token, this.state.user);
        alert("Bienvenue " + this.state.user.username)
        this.props.navigation.navigate("profile", {userId: this.state.user.id})
    };


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {},
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default logInScreen;

import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Button, TextInput } from 'react-native-paper';
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
            token :null,
            user : '',
            id:'',
            error_message:'',
        }
    }

    _login = async() => {
        if  (this.state.username.length >= 1 && this.state.password.length >= 1)
        {
            //Get all data from connexion and register them as state
            await LoginAttempt(this.state.username, this.state.password).then(data =>
            {
                if (typeof data.token == 'undefined')
                {
                    alert('Mauvais identifiants')
                } else {
                    this.setState({
                        token: data.token,
                        user: data.user,
                        error_message: JSON.stringify(data.message)
                    })
                }
            });
        } else if (typeof this.state.error_message !== 'undefined') {
            alert("Merci de saisir vos identifiants")
        }
        //Store Token & Current User
        if (typeof this.state.token == 'string')
        {
            await TokenHandler.storeToken(this.state.token, this.state.user.id);
            alert("Bienvenue " + this.state.user.username)
            //this.props.navigation.navigate("profile", {userId: this.state.user.id})
            this.props.navigation.navigate('Root', {
                screen: 'Profile',
                params: {userId: this.state.user.id}
            });
        }
    };


    render() {
           return (
               <View style={styles.container}>
                 <Image style={styles.logo} source={require("../assets/logo.png")} />

                 <View style={styles.inputView}>
                   <TextInput
                       style={{backgroundColor : '#003f5c', color : '#833ec9'}}
                       theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                       label="Pseudo"
                       mode="outlined"
                       placeholder="Pseudo..."
                       placeholderTextColor="#ffffff"
                       onChangeText={(username) =>this.setState({username})}
                   />
                 </View>
                 <View style={styles.inputView}>
                   <TextInput
                       style={{backgroundColor : '#003f5c', color : '#833ec9'}}
                       mode="outlined"
                       label="Mot de passe"
                       placeholder="Password..."
                       theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                       placeholderTextColor="#ffffff"
                       secureTextEntry={true}
                       onChangeText={(password) => this.setState({password})}
                   />
                 </View>

                 <Button icon="account" mode="contained"
                     title='Connexion'
                     onPress={this._login}
                     style={styles.loginBtn}
                 >
                   <Text style={styles.loginText}>Connexion</Text>
                 </Button>

                 <Button
                     icon="account-plus"
                     mode="contained"
                     title="Créer un compte"
                     style={styles.loginBtn}
                     onPress={() => this.props.navigation.navigate('Register')}
                 >
                   <Text style={styles.loginText}>Créer un compte</Text>
                 </Button>
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
    width: "90%",
    marginBottom: 0,
    justifyContent: "center",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop : 10,
    paddingBottom : 10,
  },
  buttonForm: {
    backgroundColor: "#003f5c",
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
    backgroundColor: "#fb5b5a",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default logInScreen;

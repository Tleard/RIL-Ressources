import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
 import Loader from './Components/Loader';
 import{getUrl} from '../API/RequestHandler'



const RegisterScreen = (props) => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
      isRegistraionSuccess,
      setIsRegistraionSuccess
    ] = useState(false);
    const firstNameInputRef = createRef();
    const lastNameInputRef = createRef();
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const retypedPasswordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
          alert('Veuillez renseigner le pseudo');
          return;
        }
        if (!firstName) {
          alert('Veuillez renseigner le prénom');
          return;
        }
        if (!lastName) {
          alert('Veuillez renseigner le nom de famille');
          return;
        }
        if (!userEmail) {
          alert('Veuillez renseigner le courriel');
          return;
        }
        if (!userPassword) {
          alert('Veuillez renseigner le mot de passe');
          return;
        }
        if (!retypedPassword) {
          alert('Veuillez confirmer le mot de passe');
          return;
        }
        if ( retypedPassword!=  userPassword)  {
          alert('Les mot de passe ne correspondent pas');
          return;
        }

        //Show Loader
        setLoading(true);

        let urlBase = getUrl();

        fetch(urlBase +'/register', {
          method: 'POST',
          body: JSON.stringify({
          username: userName,
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
          password: userPassword,
          retyped_password:retypedPassword,
        }),

        }) .then((response) => response.json(),
           setIsRegistraionSuccess(true))
        .catch((error) => {
            console.error("Error Manual : " + error.message)
        })
      };
      if (isRegistraionSuccess) {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: '#003f5c',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/Success-PNG-Image.png')}
              style={{
                height: 150,
                resizeMode: 'contain',
                alignSelf: 'center'
              }}
            />
            <Text style={styles.successTextStyle}>
              Compte créer avec sucés
            </Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('login')}>
              <Text style={styles.buttonTextStyle}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View style={{flex: 1, backgroundColor: '#003f5c'}}>
          <Loader loading={loading} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                  <TextInput
                      style={styles.inputStyle}
                      theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                      label="Pseudo"
                      mode="outlined"
                      placeholder="Pseudo..."
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                          firstNameInputRef.current && firstNameInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      onChangeText={(UserName) => setUserName(UserName)}
                  />
              </View>
              <View style={styles.SectionStyle}>
                  <TextInput
                      style={styles.inputStyle}
                      theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                      label="Prénom"
                      mode="outlined"
                      placeholder="Prénom"
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                          firstNameInputRef.current && firstNameInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      onChangeText={(FirstName) => setFirstName(FirstName)}
                  />
              </View>
              <View style={styles.SectionStyle}>
                  <TextInput
                      style={styles.inputStyle}
                      theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                      label="Nom de famille"
                      mode="outlined"
                      placeholder="Nom de famille"
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                          lastNameInputRef.current && lastNameInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      onChangeText={(LastName) => setLastName(LastName)}
                  />
              </View>
              <View style={styles.SectionStyle}>
                  <TextInput
                      style={styles.inputStyle}
                      theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                      label="Courriel"
                      mode="outlined"
                      placeholder="Courriel"
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      onSubmitEditing={() =>
                          emailInputRef.current && emailInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  />
              </View>
              <View style={styles.SectionStyle}>
                  <TextInput
                      style={styles.inputStyle}
                      theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                      label="Mot de passe"
                      mode="outlined"
                      placeholder="Mot de passe"
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      secureTextEntry={true}
                      onSubmitEditing={() =>
                          passwordInputRef.current && passwordInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                  />
              </View>
              <View style={styles.SectionStyle}>
                  <TextInput
                      style={styles.inputStyle}
                      theme={{ colors: { placeholder: 'white', text: 'white', primary: '#833ec9',underlineColor:'transparent',background : '#003489'}}}
                      label="Confirmation du Mot de passe"
                      mode="outlined"
                      placeholder="Confirmation du Mot de passe"
                      placeholderTextColor="#ffffff"
                      returnKeyType="next"
                      secureTextEntry={true}
                      onSubmitEditing={() =>
                          passwordInputRef.current && passwordInputRef.current.focus()
                      }
                      blurOnSubmit={false}
                      onChangeText={(RetypedPassword) => setRetypedPassword(RetypedPassword)}
                  />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>Créer le compte</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      );
    };


    const styles = StyleSheet.create({
      SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 25,
        margin: 10,
      },
      buttonStyle: {
        backgroundColor: '#fb5b5a',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#fb5b5a',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },
      inputStyle: {
          backgroundColor : '#003f5c',
          color : '#833ec9',
          flex : 1
      },
      errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
      },
      successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
      },
    });
    export default RegisterScreen;


import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
          alert('Please fill Name');
          return;
        }
        if (!firstName) {
          alert('Please fill Name');
          return;
        }
        if (!lastName) {
          alert('Please fill Name');
          return;
        }
        if (!userEmail) {
          alert('Please fill Email');
          return;
        }
        if (!userPassword) {
          alert('Please fill Password');
          return;
        }
        if (!retypedPassword) {
          alert('Please fill Password');
          return;
        }
        if ( retypedPassword!=  userPassword)  {
          alert('Retyped password is not the same');
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
              Registration Successful
            </Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('LoginScreen')}>
              <Text style={styles.buttonTextStyle}>Login Now</Text>
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
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserName) => setUserName(UserName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter user name"
                  placeholderTextColor="#FFFF"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    firstNameInputRef.current && firstNameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(FirstName) => setFirstName(FirstName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter first name"
                  ref={firstNameInputRef}
                  placeholderTextColor="#FFFF"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    lastNameInputRef.current && lastNameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(LastName) => setLastName(LastName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter last name"
                  ref={lastNameInputRef}
                  placeholderTextColor="#FFFF"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter email"
                  placeholderTextColor="#FFFF"
                  keyboardType="email-address"
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  underlineColorAndroid="#f000"
                  placeholder="Enter password"
                  placeholderTextColor="#FFFF"
                  ref={passwordInputRef}
                  returnKeyType="next"
                  secureTextEntry={true}
                  onSubmitEditing={() =>
                    retypedPasswordInputRef.current &&
                    retypedPasswordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(RetypedPassword) =>
                    setRetypedPassword(RetypedPassword)
                  }
                  underlineColorAndroid="#f000"
                  placeholder="Retype password"
                  placeholderTextColor="#FFFF"
                  ref={retypedPasswordInputRef}
                  returnKeyType="next"
                  secureTextEntry={true}
                  blurOnSubmit={false}
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
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
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
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
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



import * as React from "react";
import  {useState, createRef , useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import {
    Button,
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
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
import DropDownPicker from 'react-native-dropdown-picker';


const CreateResource = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return ( <View style={styles.mainBody}>
  <ScrollView
    >
    <View>
      <KeyboardAvoidingView enabled>
        <View style={{alignItems: 'center'}}>
    <Text style={{fontSize : 25 ,marginTop: 20}}>Creation d'une resource</Text>
{/* 
// {
//   "title":"This is a title",
//   "categories": ["humor", "health"],
//   "description":"Lorem Ipsum",
//   "type": "video" 
// } */}


        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(title) =>
              setTitle(title)
            }
            placeholder="Titre"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            // onSubmitEditing={() =>
            //   passwordInputRef.current &&
            //   passwordInputRef.current.focus()
            // }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyleDescription}>
          <TextInput
           style={styles.inputStyleDescription}
           onChangeText={(title) =>
             setTitle(title)
           }
           multiline
           textAlignVertical = "top"
           placeholder="Description"
           placeholderTextColor="#8b9cb5"
           autoCapitalize="none"
          />
         
        </View>
        <View style={{ flex: 1, alignSelf: 'flex-start',flexDirection: 'column', justifyContent: 'space-between', marginLeft: 35, marginTop: 20}}>
      <Button title="Joindre une photo" onPress={pickImage} color= '#003f5c' borderRadius = '20'  />
    </View>
        <View style={styles.SectionStyleDropDown}>
          <DropDownPicker
          defaultNull
          placeholder="Sélectionner une catégorie"
          style={styles.DropDownPickerStyle}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          containerStyle={{width: 300, height: 70}}
          labelStyle={{fontSize: 14, color: '#000'}}
          activeLabelStyle={{color: 'green'}}
    items={[
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
        {label: 'Item 2', value: 'item2'},
        {label: 'Item 2', value: 'item2'},
        {label: 'Item 2', value: 'item2'},
        {label: 'Item 2', value: 'item2'},
        {label: 'Item 2', value: 'item2'},
    ]}
    defaultIndex={0}
    
    
    onChangeItem={item => console.log(item.label, item.value)}/>
</View>

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          //onPress={handleSubmitPress}
          >
          <Text style={styles.buttonTextStyle}>AJOUTER</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
   
  
  </ScrollView>
</View>
);
};

export default CreateResource;




const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  SectionStyleDropDown: {
    flexDirection: 'row',
    height: 145,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  DropDownPickerStyle: {
    paddingVertical: 25,
    
  },
  SectionStyleDescription: {
    flexDirection: 'row',
    height: 300,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#003f5c',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#003f5c',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: -50,
    marginBottom: 100,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  inputStyleDescription: {
    flex: 2,
    color: 'black',
    paddingTop:15,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
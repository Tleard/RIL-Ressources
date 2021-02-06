import * as React from "react";
import {Button, View, Text, TouchableOpacity, Image} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import logInScreen from "./screens/logInScreen";
import profileScreen from "./screens/profileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

import { BottomNavigation } from 'react-native-paper';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator(/*{
    Bars:{
        screen: Bars,
        navigationOptions:{
            tabBarIcon: ({focused}) =><Icon name="bars" size={20} color={focused ? '#FFF' : '#DACE91'}/>,
        }
    }
},{
    shifting: false,
    labeled: true,
    activeColor: '#FFF',
    inactiveColor: '#DACE91',
}*/);

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#009688",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="Root"
                    component={Root}
                    options={{ headerShown: true}}
                />
                <Stack.Screen
                    name="login"
                    component={logInScreen}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/** Add Tab Navigation*/
function Root() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Profile"
                component={profileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faUserAlt}/>,
                }}
            />
        </Tab.Navigator>
    );
}
export default App;

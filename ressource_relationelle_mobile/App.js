import * as React from "react";
import {Button, View, Text, TouchableOpacity, Image} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import logInScreen from "./screens/logInScreen";
import profileScreen from "./screens/profileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faUserAlt,
    faListAlt,
    faHeart,
    faCaretUp,
    faPenFancy,
    faPen,
    faPenAlt,
    faList
} from '@fortawesome/free-solid-svg-icons'
import{ AllResourcesScreen } from "./screens/AllResourcesScreen"
import { BottomNavigation } from 'react-native-paper';
import ResourceDetailsScreen from "./screens/ResourceDetailsScreen";
import CreateResourceScreen from "./screens/CreateResourceScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CategoryResourcesScreen from "./screens/CategoryResourcesScreen";
import FavoriteScreen from "./screens/FavoriteScreen";



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
                    name="Ressources"
                    component={AllResourcesScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                <Stack.Screen
                    name="Root"
                    component={Root}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                <Stack.Screen
                    name="login"
                    component={logInScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={ResourceDetailsScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                <Stack.Screen
                    name="CreateResource"
                    component={CreateResourceScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                <Stack.Screen
                    name="CategoryScreen"
                    component={CategoryScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
                />
                 <Stack.Screen
                    name="CategoryResources"
                    component={CategoryResourcesScreen}
                    unmountOnBlur={true}
                    options={{
                        headerShown: true,
                        unmountOnBlur: true
                    }}
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
                    unmountOnBlur: true,
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faUserAlt}/>,
                }}
            />
            <Tab.Screen
                name="CreateResource"
                component={CreateResourceScreen}
                options={{
                    unmountOnBlur: true,
                    title: 'Ressources',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faPenAlt}/>,
                }}
            />
            <Tab.Screen
                name="Ressources"
                component={AllResourcesScreen}
                options={{
                    unmountOnBlur: true,
                    title: 'Ressources',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faListAlt}/>,
                }}
            />
            <Tab.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    unmountOnBlur: true,
                    title: 'Category',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faList}/>,
                }}
            />
            <Tab.Screen
                name="Library"
                component={FavoriteScreen}
                options={{
                    unmountOnBlur: true,
                    title: 'Favoris',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faHeart}/>,
                }}
            />
        </Tab.Navigator>
    );
}
export default App;

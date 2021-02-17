import * as React from "react";
import {Button, View, Text, TouchableOpacity, Image} from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NavigationContainer, getFocusedRouteNameFromRoute} from "@react-navigation/native";
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


function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  
    switch (routeName) {
      case 'Ressources':
        return 'Ressources';
      case 'Profile':
        return 'Mon profil';
      case 'Register':
        return 'Register';
        case 'Details':
        return 'Details';
        case "CreateResource":
        return "Création ";
        case "CategoryScreen":
        return "Catégories ";
        case "Library":
        return "Favoris ";
        
    }
  }

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Connexion"
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
                    options={{ headerShown: true}}
                />
                <Stack.Screen
                    name="Root"
                    component={Root}
                    options={({ route }) => ({
                        headerTitle: getHeaderTitle(route),
                      })}
                />
                <Stack.Screen
                    name="Connexion"
                    component={logInScreen}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
                <Stack.Screen
                    name="Details"
                    component={ResourceDetailsScreen}
                />
                <Stack.Screen
                    name="CreateResource"
                    component={CreateResourceScreen}
                />
                <Stack.Screen
                    name="CategoryScreen"
                    component={CategoryScreen}
                />
                 <Stack.Screen
                    name="Ressources par categorie"
                    component={CategoryResourcesScreen}
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
            <Tab.Screen
                name="CreateResource"
                component={CreateResourceScreen}
                options={{
                    title: 'Ressources',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faPenAlt}/>,
                }}
            />
            <Tab.Screen
                name="Ressources"
                component={AllResourcesScreen}
                options={{
                    title: 'Ressources',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faListAlt}/>,
                }}
            />
            <Tab.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{
                    title: 'Category',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faList}/>,
                }}
            />
            <Tab.Screen
                name="Library"
                component={FavoriteScreen}
                options={{
                    title: 'Favoris',
                    tabBarIcon: ({ focused }) => <FontAwesomeIcon focused={focused} size={30} color="black" icon={faHeart}/>,
                }}
            />
        </Tab.Navigator>
    );
}
export default App;

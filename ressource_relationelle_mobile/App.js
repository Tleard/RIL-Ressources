import * as React from "react";
import { Button, View, Text, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import logInScreen from "./screens/logInScreen";
import RegisterScreen from "./screens/RegisterScreen";
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to LogIn"
        onPress={() => navigation.navigate("login")}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => alert("This is a button!")}>
                <Image
                  style={{ width: 35, height: 35, marginRight: 10 }}
                  source={require("./assets/PikPng.com_twitter-icons-png_2837538.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="login" component={logInScreen} />
        <Stack.Screen name="profile" component={profileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

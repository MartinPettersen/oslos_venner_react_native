import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Forum from "../components/(forum)/Forum";
import ForumContainer from "../screens/ForumContainer";
import ThreadPage from "../screens/ThreadPage";
import { Feather } from "@expo/vector-icons";
import Login from "../screens/Login";
import CreateForum from "../screens/CreateForum";
import CreateThreadPage from "../screens/CreateThreadPage";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { Button } from "react-native";
import SignOut from "./(login)/SignOut";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ForumContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forum"
        component={Forum}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateThreadPage"
        component={CreateThreadPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThreadPage"
        component={ThreadPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FCD3E9",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#27272a",
        },
        headerStyle: {
          backgroundColor: "#27272a",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: "#FCD3E9",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="coffee"
              size={25}
              color={focused ? "#FCD3E9" : "white"}
            />
          ),
        }}
      />
      {user ? (
        <Tab.Screen
          name="Logout"
          component={SignOut}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="log-out"
                size={25}
                color={focused ? "#FCD3E9" : "white"}
              />
            ),
          }}
        />
        
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="lock"
                size={25}
                color={focused ? "#FCD3E9" : "white"}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Min Side"
        component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={25}
              color={focused ? "#FCD3E9" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create Forum"
        component={CreateForum}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="droplet"
              size={25}
              color={focused ? "#FCD3E9" : "white"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

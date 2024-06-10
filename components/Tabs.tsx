import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Forum from "../components/(forum)/Forum";
import ForumContainer from "../screens/ForumContainer";
import ThreadPage from "../screens/ThreadPage";
import { Feather } from "@expo/vector-icons";
import List from '../screens/List';
import Login from '../screens/Login';
import CreateForum from '../screens/CreateForum';

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
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "pink",
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
          color: "pink",
        },
      }}
    >
      <Tab.Screen 
        name="Login" 
        component={Login} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="lock" size={25} color={focused ? 'pink' : 'white'} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="coffee" size={25} color={focused ? 'pink' : 'white'} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Min Side" 
        component={ThreadPage} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={25} color={focused ? 'pink' : 'white'} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Create Forum" 
        component={CreateForum} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="droplet" size={25} color={focused ? 'pink' : 'white'} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default Tabs;

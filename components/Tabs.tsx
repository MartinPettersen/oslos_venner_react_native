import React from 'react'
import Forum from "../components/(forum)/Forum";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ForumContainer from "../screens/ForumContainer";
import ThreadPage from "../screens/ThreadPage";
import { Feather } from "@expo/vector-icons"
import List from '../screens/List';
import Login from '../screens/Login';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{
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
      }}>
        
        <Tab.Screen name={'Forum'} component={Forum} options={{
          tabBarIcon: ({ focused }) => (<Feather name={'coffee'} size={25} color={focused ? 'pink' : 'white'}/>)
        }}/>
        <Tab.Screen name={'Login'} component={Login} options={{
          tabBarIcon: ({ focused }) => (<Feather name={'lock'} size={25} color={focused ? 'pink' : 'white'}/>)
        }}/>
        <Tab.Screen name={'Home'} component={ForumContainer} options={{
          tabBarIcon: ({ focused }) => (<Feather name={'lock'} size={25} color={focused ? 'pink' : 'white'}/>)
        }}/>
        <Tab.Screen name={'Min Side'} component={ThreadPage} options={{
          tabBarIcon: ({ focused }) => (<Feather name={'home'} size={25} color={focused ? 'pink' : 'white'}/>)
        }}/>
        <Tab.Screen name={'List'} component={List} options={{
          tabBarIcon: ({ focused }) => (<Feather name={'droplet'} size={25} color={focused ? 'pink' : 'white'}/>)
        }}/>

      </Tab.Navigator>
  )
}

export default Tabs
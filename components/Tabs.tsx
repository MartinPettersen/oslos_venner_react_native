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
import { User, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { Button } from "react-native";
import SignOut from "./(login)/SignOut";
import CreateUserPage from "../screens/CreateUserPage";
import PrivateUserPage from "../screens/PrivateUserPage";
import AdminPage from "../screens/AdminPage";
import AdminReportPage from "../screens/AdminReportPage";

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
        name="AdminReportPage"
        component={AdminReportPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThreadPage"
        component={ThreadPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateUserPage"
        component={CreateUserPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  const [user, setUser] = useState<User | null>();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);

      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
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
        name="Forum"
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
      {user ? (
        <Tab.Screen
          name="Min Side"
          component={PrivateUserPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={25}
                color={focused ? "#FCD3E9" : "white"}
              />
            ),
          }}
        />
      ) : 
      <Tab.Screen
          name="Min Side"
          component={Login}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={25}
                color={focused ? "#FCD3E9" : "white"}
              />
            ),
          }}
        />}
      {isAdmin ? 
    

      <Tab.Screen
        name="Admin"
        component={AdminPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="eye"
              size={25}
              color={focused ? "orange" : "red"}
            />
          ),
        }}
        />
        : null }
    </Tab.Navigator>
  );
};

export default Tabs;

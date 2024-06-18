import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Forums from "./components/(forum)/Forums";
import Logo from "./components/(logo)/Logo";
import Forum from "./components/(forum)/Forum";
import Thread from "./components/(thread)/Thread";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ForumContainer from "./screens/ForumContainer";
import ThreadPage from "./screens/ThreadPage";
import { Feather } from "@expo/vector-icons";
import Tabs from "./components/Tabs";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import * as ScreenOrientation from "expo-screen-orientation";

const Tab = createBottomTabNavigator();

/*

        <View style={styles.container}>
          <Forum />
        </View>
*/

export default function App() {
  const unlockOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };

  unlockOrientation();

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const lockToLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Logo />
      <Tabs />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
});

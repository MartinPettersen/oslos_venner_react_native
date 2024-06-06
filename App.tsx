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
import { Feather } from "@expo/vector-icons"
import Tabs from "./components/Tabs";


const Tab = createBottomTabNavigator();

/*

        <View style={styles.container}>
          <Forum />
        </View>
*/

export default function App() {
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

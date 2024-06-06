import React from "react";
//import  Alex_Brush  from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
//import { AlexBrush_400Regular } from '@expo-google-fonts/alex-brush';
import { useFonts, AlexBrush_400Regular } from "@expo-google-fonts/alex-brush";

import { Text, StyleSheet, View } from "react-native";

const Logo = () => {
  let [fontsLoaded] = useFonts({
    AlexBrush_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Oslo{"'"}s Venner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "AlexBrush_400Regular",
    fontSize: 70,
    paddingTop: 30,
    color: 'pink'
  },
});

export default Logo;

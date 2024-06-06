import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ForumDisplay from "./ForumDisplay";

const { width, height } = Dimensions.get("window");

const FORUMS = ["Robotics", "Books", "Sport"];

const Forums = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Forums</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {FORUMS.map((forum, index) => (
          <ForumDisplay key={index} forum={forum} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    height: height,
    paddingTop: 50,
  },
  headline: {
    fontSize: 30,
    marginBottom: 20,
  },
  display: {
    backgroundColor: "#27272a",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  displayText: {
    fontSize: 30,
    marginVertical: 10,
    color: "white",
  },
  scrollView: {
    flexGrow: 1,
    width: width,
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Forums;

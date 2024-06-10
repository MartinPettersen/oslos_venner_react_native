import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ForumDisplay from "./ForumDisplay";
import ThreadDisplay from "./ThreadDisplay";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ForumScreenParams } from "../../utils/ForumScreenParams";
const { width, height } = Dimensions.get("window");

const FORUMS = ["Robotics", "Books", "Sport"];
const THREADS = [
  {
    subject: "Robotics are cool",
    author: "Human",
    date: "10/10/2020",
    replies: "40",
  },
  {
    subject: "Robots are better",
    author: "NotaRobot",
    date: "12/10/2022",
    replies: "10",
  },
  {
    subject: "Evil robot Overlords",
    author: "Subterfuge",
    date: "10/09/2008",
    replies: "1",
  },
];

const Forum = () => {
  
  //const route = useRoute();
  //console.log(route.params)
  
  const route =
    useRoute<RouteProp<Record<string, ForumScreenParams>, string>>();
  const { forum, threads } = route.params;
  console.log(forum);
  
  if (!forum || !threads) {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Robotics {forum}</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Nytt Innlegg</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {THREADS.map((thread, index) => (
          <ThreadDisplay
            key={index}
            subject={thread.subject}
            author={thread.author}
            date={thread.date}
            replies={thread.replies}
          />
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
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#27272a",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginBottom: 0,
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
  buttonText: {
    fontSize: 20,
    marginVertical: 10,
    color: "white",
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
    paddingVertical: 10,
  },
});

export default Forum;

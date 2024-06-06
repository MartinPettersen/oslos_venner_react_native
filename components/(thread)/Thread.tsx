import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ReplyDisplay from "./ReplyDisplay";

const { width, height } = Dimensions.get("window");

const FORUMS = ["Robotics", "Books", "Sport"];
const THREADS = [{subject: "Robotics are cool", author: "Human", date: "10/10/2020", replies: "40"}, {subject: "Robots are better", author: "NotaRobot", date: "12/10/2022", replies: "10"}, {subject: "Evil robot Overlords", author: "Subterfuge", date: "10/09/2008", replies: "1"}];
const REPLIES = [{message: "Robotics are cool", author: "Human", date: "10/10/2020", replies: "40",}, {message: "Robots are better", author: "NotaRobot", date: "12/10/2022", replies: "10"}, {message: "Evil robot Overlords", author: "Subterfuge", date: "10/09/2008", replies: "1"}];


const Thread = () => {
  return (
    <View style={styles.container}>
      <View style={styles.thread}>
          <Text style={styles.threadText}>Headline</Text>
          <Text style={styles.threadText}>Author</Text>
          <Text style={styles.threadText}>Dette var da veldig relevant for vår hverdag. Utrolig interesangt</Text>
        <View style={styles.footer}>
          <Text style={styles.threadText}>Svar</Text>
          <Text style={styles.threadText}>#8</Text>
          <Text style={styles.threadText}>Edited</Text>
          <Text style={styles.threadText}>08/09/2010</Text>
            
        </View>

      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {REPLIES.map((reply, index) => (
          <ReplyDisplay key={index} message={reply.message} author={reply.author} date={reply.date} replies={reply.replies} />
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  thread: {
    backgroundColor: "#27272a",
    width: "90%",
    padding: 8,
    height: "40%",
    justifyContent: 'space-between', 
    marginBottom: 40,

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
  threadText: {
    fontSize: 20,
    marginVertical: 10,
    color: 'white'
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
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Thread;

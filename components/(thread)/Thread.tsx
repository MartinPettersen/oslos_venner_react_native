import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ReplyDisplay from "./ReplyDisplay";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const REPLIES = [
  {
    message: "Robotics are cool",
    author: "Human",
    date: "10/10/2020",
    replies: "40",
  },
  {
    message: "Robots are better",
    author: "NotaRobot",
    date: "12/10/2022",
    replies: "10",
  },
  {
    message: "Evil robot Overlords",
    author: "Subterfuge",
    date: "10/09/2008",
    replies: "1",
  },
];

const Thread = () => {
  const [thread, setThread] = useState(null);

  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(query(forumRef, where("id", "==", id)), {
      next: (snapshot) => {
        const threads: any[] = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          threads.push({
            id: doc.data().id,
            headline: doc.data().headline,
            userName: doc.data().userName,
            content: doc.data().content,
            forumLabel: doc.data().forumLabel,
            replies: doc.data().replies,
            createdBy: doc.data().createdBy,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          });
        });
        setThread(threads[0]);
        console.log(threads);
      },
    });
  }, []);

  if (!thread) {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.thread}>
        <Text style={styles.threadText}>{thread.headline}</Text>
        <Text style={styles.threadText}>{thread.userName}</Text>
        <Text style={styles.threadText}>
        {thread.content}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.threadText}>Svar</Text>
          <Text style={styles.threadText}>#{thread.replies.length}</Text>
          <View >{thread.createdAt != thread.updatedAt? <Text style={styles.threadText}>Edited</Text>: null}</View>
          <Text style={styles.threadText}>{`${thread.createdAt.slice(8, 10)}.${thread.createdAt.slice(4, 7)}.${thread.createdAt.slice(11, 15)}`}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {REPLIES.map((reply, index) => (
          <ReplyDisplay
            key={index}
            message={reply.message}
            author={reply.author}
            date={reply.date}
            replies={reply.replies}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCD3E9",
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
  thread: {
    backgroundColor: "#27272a",
    width: "90%",
    padding: 8,
    height: "40%",
    justifyContent: "space-between",
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Thread;

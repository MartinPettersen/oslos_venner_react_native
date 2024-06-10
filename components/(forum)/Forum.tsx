import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ForumDisplay from "./ForumDisplay";
import ThreadDisplay from "./ThreadDisplay";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ForumScreenParams } from "../../utils/ForumScreenParams";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
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
  const navigation = useNavigation();

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(forumRef, {
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
            updatedAt: doc.data().updatedAt,
          });
        });
        setThreads(threads);
        console.log(threads);
      },
    });
  }, []);

  const route =
    useRoute<RouteProp<Record<string, ForumScreenParams>, string>>();
  const { forum } = route.params;
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
      <Text style={styles.headline}>{forum}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateThreadPage", { forum })}
      >
        <Text style={styles.buttonText}>Nytt Innlegg</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {threads.map((thread, index) => (
          <ThreadDisplay
            key={index}
            subject={thread.headline}
            author={thread.userName}
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

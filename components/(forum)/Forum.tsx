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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
const { width, height } = Dimensions.get("window");
import { Thread as ThreadType } from "../../utils/Types";


const Forum = () => {
  const navigation = useNavigation();

  const route =
    useRoute<RouteProp<Record<string, ForumScreenParams>, string>>();
  const { forum } = route.params;

  const [threads, setThreads] = useState<ThreadType[]>([]);

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(
      query(forumRef, where("forumLabel", "==", forum)),
      {
        next: (snapshot) => {
          const threads: ThreadType[] = [];
          snapshot.docs.forEach((doc) => {
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
          setThreads(threads);
        },
      }
    );
  }, []);

  if (!forum || !threads) {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Loading...</Text>
      </View>
    );
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{forum}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          user
            ? navigation.navigate("CreateThreadPage", { forum })
            : navigation.navigate("Login")
        }
      >
        <Text style={styles.buttonText}>Nytt Innlegg</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {threads.map((thread, index) => (
          <ThreadDisplay
            key={index}
            subject={thread.headline}
            author={thread.userName}
            date={thread.createdAt}
            parentId={thread.forumLabel}
            id={thread.id}
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

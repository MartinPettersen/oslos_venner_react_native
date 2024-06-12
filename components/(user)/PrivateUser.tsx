import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ForumDisplay from "../(forum)/ForumDisplay";
import ThreadDisplay from "../(forum)/ThreadDisplay";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import ReplyDisplay from "../(thread)/ReplyDisplay";

const { width, height } = Dimensions.get("window");

const PrivateUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      getThreads(user?.displayName);
      getReplies(user?.displayName);

    });
  }, []);

  const [threads, setThreads] = useState([]);

  const getThreads = (userName: string) => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(
      query(forumRef, where("userName", "==", userName)),
      {
        next: (snapshot) => {
          const threads: any[] = [];
          snapshot.docs.forEach((doc) => {
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
        },
      }
    );
  };

  const [replies, setReplies] = useState<Replie[]>([]);
  const getReplies = (userName: string) => {
    const forumRef = collection(FIRESTORE_DB, "replies");

    const subscriber = onSnapshot(
      query(forumRef, where("userName", "==", userName)),
      {
        next: (snapshot) => {
          const replies: any[] = [];
          snapshot.docs.forEach((doc) => {
            replies.push({
              postId: doc.data().postId,
              parentId: doc.data().parentId,
              userName: doc.data().userName,
              reply: doc.data().reply,
              children: doc.data().children,
              createdAt: doc.data().createdAt,
              updatedAt: doc.data().updatedAt,
            });
          });
          setReplies(replies);
          console.log(replies)
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Aktivitet</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {threads.length > 0
          ? threads.map((thread, index) => (
              <ThreadDisplay
                key={index}
                subject={thread.headline}
                author={thread.userName}
                date={thread.date}
                replies={thread.replies.length}
                id={thread.id}
              />
            ))
          : null}
        {replies.length > 0
          ? replies.map((reply, index) => (
              <View style={styles.borderline}>
                <Text>{reply.reply}</Text>
                <ReplyDisplay key={index} reply={reply} />
              </View>
            ))
          : null}
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
  borderline: {
    width: "90%",
    borderLeftWidth: 2,
    borderLeftColor: "black",
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

export default PrivateUser;

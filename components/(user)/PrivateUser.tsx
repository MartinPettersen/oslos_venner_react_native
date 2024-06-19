import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ForumDisplay from "../(forum)/ForumDisplay";
import ThreadDisplay from "../(forum)/ThreadDisplay";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { User, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import ReplyDisplay from "../(thread)/ReplyDisplay";
import { Replie, Thread } from "../../utils/Types";

const { width, height } = Dimensions.get("window");

const PrivateUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);
      if (user?.displayName) {
        getThreads(user.displayName);
        getReplies(user.displayName);
      }

      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const [threads, setThreads] = useState<Thread[]>([]);

  const getThreads = (userName: string) => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(
      query(forumRef, where("userName", "==", userName)),
      {
        next: (snapshot) => {
          const threads: Thread[] = [];
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
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}></Text>
      <Text style={styles.headline}>{user?.displayName} Aktivitet:</Text>
      <View style={styles.headline}>{isAdmin ?  <Text style={styles.headline}>Logget in som admin</Text>: null
}</View>


      <ScrollView contentContainerStyle={styles.scrollView}>
        {threads.length > 0
          ? threads.map((thread, index) => (
              <ThreadDisplay
                key={index}
                subject={thread.headline}
                author={thread.userName}
                date={thread.createdAt}
                parentId={"0"}
                id={thread.id}
              />
            ))
          : null}
        {replies.length > 0
          ? replies.map((reply, index) => (
            <ReplyDisplay
              key={index}
              reply={reply}
            />
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default PrivateUser;

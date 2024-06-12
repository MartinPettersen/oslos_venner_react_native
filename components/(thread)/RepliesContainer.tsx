import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import ReplyDisplay from "./ReplyDisplay";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const { width, height } = Dimensions.get("window");

type Props = {
    parentId: string
}

function RepliesContainer({parentId}: Props) {
  const [replies, setReplies] = useState<Replie[]>([]);

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "replies");

    const subscriber = onSnapshot(
      query(forumRef, where("parentId", "==", parentId)),
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
  }, []);

  return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {replies.map((reply, index) => (
            <View style={styles.borderline}>
            
          <ReplyDisplay key={index} reply={reply} />
            </View>
        ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: width,
    alignItems: "center",
    paddingVertical: 10,
    flex: 1,
    height: "100%",
  },
  borderline: {
    width: "90%",
    borderLeftWidth: 2,
    borderLeftColor: 'black', 
  },
});

export default RepliesContainer;

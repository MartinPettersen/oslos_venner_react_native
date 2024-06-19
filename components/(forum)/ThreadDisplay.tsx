import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

type Props = {
  subject: string;
  author: string;
  date: string;
  parentId: string;
  id: string;
};

const ThreadDisplay = ({ subject, author, date, parentId, id }: Props) => {
  const navigation = useNavigation();


  const [replies, setReplies] = useState(0);
  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "replies");

    const subscriber = onSnapshot(
      query(forumRef, where("parentId", "==", id)),
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
          setReplies(replies.length);
        },
      }
    );
  }, []);

  return (
    <TouchableOpacity
      
      onPress={() => navigation.navigate("ThreadPage", { id })}
    >
      <View style={styles.display}>
        <Text style={styles.displayText}>{subject}</Text>
        <Text style={styles.displayText}>{author}</Text>
        <Text style={styles.displayText}>{date.slice(4, 15)}</Text>
        <Text style={styles.displayText}>{`#${replies}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  display: {
    backgroundColor: "#27272a",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginBottom: 20,
    flexDirection: "row",
  },
  displayText: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 6,

    color: "white",
  },
});

export default ThreadDisplay;

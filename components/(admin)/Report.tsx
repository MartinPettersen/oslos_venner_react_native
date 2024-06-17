import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ReportPost from "./ReportPost";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import ReportThread from "./ReportThread";
const { width, height } = Dimensions.get("window");

type Props = {
  report: any;
};

const Report = ({ report }: Props) => {

    const [replies, setReplies] = useState<Replie[]>([]);

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "replies");

    const subscriber = onSnapshot(
      query(forumRef, where("postId", "==", report.subjectId)),
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


  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const forumRef = collection(FIRESTORE_DB, "threads");

    const subscriber = onSnapshot(
      query(forumRef, where("id", "==", report.subjectId)),
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
  }, []);

  return (
    <View style={styles.display}>
      <Text style={styles.displayText}>Rapportert av: {report.userName}</Text>
      <Text style={styles.displayText}>Grunn for rapport: {report.report}</Text>
      { replies.length > 0 ? 
      
      <ReportPost reply={replies[0]} reportId={report.reportId} />
    : null}
    { threads.length > 0 ? 
      
      <ReportThread thread={threads[0]} />
    : null}
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
        marginBottom: 20,
      },
      text: {
        fontSize: 20,
        marginVertical: 10,
      },
      displayText: {
        fontSize: 20,
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
})

export default Report;

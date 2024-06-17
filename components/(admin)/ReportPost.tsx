import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AdminReportPage from "../../screens/AdminReportPage";
import AdminDeletePost from "./AdminDeletePost";
const { width, height } = Dimensions.get("window");

type Props = {
  reply: Replie;
  reportId: string;
};

const ReportPost = ({ reply, reportId }: Props) => {

  console.log(`reportId in ReportPost is: ${reportId}`)
  const [deleteReplyModalVisible, setDeleteReplyModalVisible] =
    useState<boolean>(false);
  return (
    <View style={styles.display}>
      <View
        style={{
          borderWidth: 2,
          borderColor: "pink",
          padding: 14,
          width: "90%",
        }}
      >
        <Text style={styles.displayText}>{reply.userName}</Text>
        <Text style={styles.displayText}>{reply.reply}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDeleteReplyModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <AdminDeletePost
        reportId={reportId}
        id={reply.postId}
        deleteReplyModalVisible={deleteReplyModalVisible}
        setDeleteReplyModalVisible={setDeleteReplyModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 6,
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  displayText: {
    fontSize: 10,
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
  button: {
    backgroundColor: "red",
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    marginVertical: 10,
  },
});

export default ReportPost;

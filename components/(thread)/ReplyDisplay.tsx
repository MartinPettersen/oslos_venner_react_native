import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  message: string;
  author: string;
  date: string;
  replies: string;
};

const ReplyDisplay = ({ message, author, date, replies }: Props) => {
  return (
    <View style={styles.display}>
      <Text style={styles.displayText}>{author}</Text>
      <Text style={styles.displayText}>{message}</Text>
      <View style={styles.footer}>
          <Text style={styles.displayText}>Svar</Text>
            <Text style={styles.displayText}>Edited</Text>

        <Text style={styles.displayText}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    backgroundColor: "#27272a",
    width: "90%",
    justifyContent: "space-between",
    height: 100,
    marginBottom: 20,
    flexDirection: "column",
  },
  displayText: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 6,

    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ReplyDisplay;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  subject: string;
  author: string;
  date: string;
  replies: string;
  id: string;
};

const ThreadDisplay = ({ subject, author, date, replies, id }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      
      onPress={() => navigation.navigate("ThreadPage", { id })}
    >
      <View style={styles.display}>
        <Text style={styles.displayText}>{subject}</Text>
        <Text style={styles.displayText}>{author}</Text>
        <Text style={styles.displayText}>{date}</Text>
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

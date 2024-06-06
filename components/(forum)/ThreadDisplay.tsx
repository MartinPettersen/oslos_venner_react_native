import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    subject: string,
    author: string,
    date: string,
    replies: string
}

const ThreadDisplay = ({subject, author, date, replies}: Props) => {
  return (
    <View  style={styles.display}>
      <Text style={styles.displayText}>{subject}</Text>
      <Text style={styles.displayText}>{author}</Text>
      <Text style={styles.displayText}>{date}</Text>
      <Text style={styles.displayText}>{`#${replies}`}</Text>
    </View>
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
      flexDirection: 'row'
    },
    displayText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginVertical: 10,
      marginHorizontal: 6,

      color: "white",
    },
  });

export default ThreadDisplay;

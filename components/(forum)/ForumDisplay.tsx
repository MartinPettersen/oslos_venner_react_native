import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    forum: string,
}

const ForumDisplay = ({forum}: Props) => {
  return (
    <View  style={styles.display}>
      <Text style={styles.displayText}>{forum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    
    display: {
      backgroundColor: "#27272a",
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      height: 60,
      marginBottom: 20,
    },
    displayText: {
      fontSize: 30,
      marginVertical: 10,
      color: "white",
    },
  });

export default ForumDisplay;
